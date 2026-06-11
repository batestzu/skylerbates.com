import { NextRequest, NextResponse } from "next/server";
import { sendOpportunityAlert } from "@/lib/sendgrid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email } = body as { name?: string; email?: string };

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
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
