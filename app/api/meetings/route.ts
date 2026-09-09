import { NextRequest, NextResponse } from "next/server";
import { sendMeetingAlert } from "@/lib/sendgrid";

function formatSlot(date?: string, time?: string): string {
  if (!date && !time) return "";
  if (date && time) {
    const parsed = new Date(`${date}T${time}`);
    if (!isNaN(parsed.getTime())) {
      const dateLabel = parsed.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const timeLabel = parsed.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
      return `${dateLabel} at ${timeLabel}`;
    }
    return `${date} at ${time}`;
  }
  return date || time || "";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      natureOfMeeting,
      option1Date,
      option1Time,
      option2Date,
      option2Time,
      option3Date,
      option3Time,
    } = body as Record<string, string | undefined>;

    if (!name || !email || !natureOfMeeting) {
      return NextResponse.json(
        { error: "Name, email, and nature of meeting are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const option1 = formatSlot(option1Date, option1Time);
    if (!option1) {
      return NextResponse.json(
        { error: "Please suggest at least one date and time." },
        { status: 400 }
      );
    }

    await sendMeetingAlert({
      name,
      email,
      phone: phone || "",
      natureOfMeeting,
      option1,
      option2: formatSlot(option2Date, option2Time),
      option3: formatSlot(option3Date, option3Time),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/meetings]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
