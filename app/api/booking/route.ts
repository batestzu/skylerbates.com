import { NextRequest, NextResponse } from "next/server";
import { sendBookingAlert } from "@/lib/sendgrid";

// Best-effort in-memory rate limiting (per warm serverless instance — resets on
// cold start, which is fine here since this just slows down bot floods, not a
// security boundary).
const submitTimes = new Map<string, number[]>();
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_SUBMITS_PER_IP = 5;
const MIN_FILL_MS = 1500; // real humans take longer than this to fill the form

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function prune(times: number[], windowMs: number): void {
  const cutoff = Date.now() - windowMs;
  while (times.length && times[0] < cutoff) times.shift();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message, company, elapsedMs } = body as {
      name?: string;
      email?: string;
      message?: string;
      company?: string;
      elapsedMs?: number;
    };
    const ip = clientIp(req);

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Bot heuristics: honeypot filled, or form submitted faster than a human could.
    if (company || (typeof elapsedMs === "number" && elapsedMs < MIN_FILL_MS)) {
      console.warn("[/api/booking] blocked likely bot submission", { ip, name, email, elapsedMs });
      return NextResponse.json({ ok: true });
    }

    const times = submitTimes.get(ip) ?? [];
    prune(times, RATE_WINDOW_MS);
    if (times.length >= MAX_SUBMITS_PER_IP) {
      console.warn("[/api/booking] rate limited", { ip });
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }
    times.push(Date.now());
    submitTimes.set(ip, times);

    console.log("[/api/booking] inquiry received", { ip, name, email });

    const { company: _company, elapsedMs: _elapsedMs, ...data } = body as Record<string, unknown>;
    await sendBookingAlert(data as Record<string, string>);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/booking]", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
