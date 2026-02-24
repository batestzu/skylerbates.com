import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, amount, songTitle } = body as {
      email?: string;
      amount?: number;
      songTitle?: string;
    };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const amountNum = Number(amount);
    if (!amountNum || amountNum <= 0) {
      return NextResponse.json({ error: "Amount must be greater than $0." }, { status: 400 });
    }

    const amountCents = Math.round(amountNum * 100);
    if (amountCents < 50) {
      return NextResponse.json(
        { error: "Minimum paid amount is $0.50." },
        { status: 400 }
      );
    }

    const title = songTitle || process.env.SONG_TITLE || "Download";
    const { url } = await createCheckoutSession({ email, amountCents, songTitle: title });

    return NextResponse.json({ url });
  } catch (err) {
    console.error("[/api/checkout]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
