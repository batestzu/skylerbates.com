import { NextRequest, NextResponse } from "next/server";
import { constructStripeEvent } from "@/lib/stripe";
import { addContact } from "@/lib/contacts";
import { sendSongEmail } from "@/lib/sendgrid";
import type Stripe from "stripe";

// In Next.js App Router, body parsing is not automatic — req.arrayBuffer() works natively.

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await req.arrayBuffer();
    const buf = Buffer.from(rawBody);
    event = constructStripeEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error("[webhook] signature verification failed:", err);
    return NextResponse.json({ error: "Webhook signature invalid." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session.customer_email || (session.metadata?.email ?? "");

    if (!email) {
      console.error("[webhook] No email found on session", session.id);
      return NextResponse.json({ error: "No email." }, { status: 400 });
    }

    try {
      await addContact(email);
      await sendSongEmail(email);
    } catch (err) {
      console.error("[webhook] post-payment fulfillment failed:", err);
      // Return 500 so Stripe retries the webhook
      return NextResponse.json({ error: "Fulfillment failed." }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
