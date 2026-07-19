import { NextRequest, NextResponse } from "next/server";
import { generateW9Pdf, W9Data } from "@/lib/w9pdf";
import { sendW9Email } from "@/lib/sendgrid";

const SSN_RE = /^\d{3}-?\d{2}-?\d{4}$/;
const EIN_RE = /^\d{2}-?\d{7}$/;

const CLASSIFICATIONS = new Set([
  "individual",
  "ccorp",
  "scorp",
  "partnership",
  "trust",
  "llc",
  "other",
]);

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, string>;

    // Access code gate — this form triggers a physical print job, so only
    // contractors who were given the code can submit.
    const accessCode = process.env.W9_ACCESS_CODE;
    if (!accessCode) {
      return NextResponse.json({ error: "This form is not currently available." }, { status: 503 });
    }
    if (body.accessCode !== accessCode) {
      return NextResponse.json({ error: "Invalid access code." }, { status: 401 });
    }

    const { name, taxClassification, address, cityStateZip, tinType, tin, signature, certified } =
      body;

    if (!name || !address || !cityStateZip || !tin || !signature) {
      return NextResponse.json({ error: "Please fill out all required fields." }, { status: 400 });
    }
    if (!CLASSIFICATIONS.has(taxClassification)) {
      return NextResponse.json({ error: "Please select a federal tax classification." }, { status: 400 });
    }
    if (taxClassification === "llc" && !/^[csp]$/i.test(body.llcClassification || "")) {
      return NextResponse.json(
        { error: "Please select the LLC tax classification (C, S, or P)." },
        { status: 400 }
      );
    }
    if (tinType === "ssn" && !SSN_RE.test(tin)) {
      return NextResponse.json({ error: "SSN must be in the format XXX-XX-XXXX." }, { status: 400 });
    }
    if (tinType === "ein" && !EIN_RE.test(tin)) {
      return NextResponse.json({ error: "EIN must be in the format XX-XXXXXXX." }, { status: 400 });
    }
    if (tinType !== "ssn" && tinType !== "ein") {
      return NextResponse.json({ error: "Please choose SSN or EIN." }, { status: 400 });
    }
    if (certified !== "yes") {
      return NextResponse.json(
        { error: "You must certify the statements to submit a W-9." },
        { status: 400 }
      );
    }

    const date = new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      timeZone: "America/New_York",
    });

    // Fetch the blank IRS form from our own origin (same pattern as SONG_FILE_URL)
    const templateRes = await fetch(new URL("/fw9.pdf", req.nextUrl.origin));
    if (!templateRes.ok) throw new Error(`Could not load W-9 template: ${templateRes.status}`);
    const templateBytes = await templateRes.arrayBuffer();

    const pdfBytes = await generateW9Pdf(templateBytes, {
      name,
      businessName: body.businessName,
      taxClassification: taxClassification as W9Data["taxClassification"],
      llcClassification: body.llcClassification,
      otherClassification: body.otherClassification,
      exemptPayeeCode: body.exemptPayeeCode,
      fatcaCode: body.fatcaCode,
      address,
      cityStateZip,
      tinType,
      tin,
      signature,
      date,
    });

    await sendW9Email(Buffer.from(pdfBytes).toString("base64"), name);

    return NextResponse.json({ ok: true });
  } catch (err) {
    // SECURITY: never log the request body — it contains an SSN/EIN.
    // Only the error message is logged, no form data.
    console.error("[/api/docs]", err instanceof Error ? err.message : "unknown error");
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
