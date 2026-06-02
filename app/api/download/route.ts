import { NextRequest, NextResponse } from "next/server";
import { addContact } from "@/lib/contacts";
import { sendSongEmail } from "@/lib/sendgrid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, songTitle } = body as { email?: string; songTitle?: string };

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const title = songTitle || process.env.SONG_TITLE || "Download";

    await addContact(email);
    await sendSongEmail(email);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/download]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
