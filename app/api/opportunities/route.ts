import { NextRequest, NextResponse } from "next/server";
import { sendOpportunityAlert } from "@/lib/sendgrid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, opportunity } = body as { name?: string; opportunity?: string };

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    await sendOpportunityAlert(body as Record<string, string>);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/opportunities]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
