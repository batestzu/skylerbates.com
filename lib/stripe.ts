import Stripe from "stripe";

// Lazy-initialize so missing env vars only fail at runtime, not at build time
function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured.");
  return new Stripe(key, { apiVersion: "2026-01-28.clover" });
}

interface CreateSessionOptions {
  email: string;
  amountCents: number; // amount in cents
  songTitle: string;
}

export async function createCheckoutSession({
  email,
  amountCents,
  songTitle,
}: CreateSessionOptions): Promise<{ url: string }> {
  const stripe = getStripe();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: email,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: amountCents,
          product_data: {
            name: songTitle,
            description: "Digital download — delivered via email",
          },
        },
      },
    ],
    metadata: {
      email,
      song_title: songTitle,
    },
    success_url: `${baseUrl}/shop?success=true`,
    cancel_url: `${baseUrl}/shop`,
  });

  if (!session.url) throw new Error("Stripe did not return a session URL.");
  return { url: session.url };
}

// Named export for use in webhook route
export function constructStripeEvent(
  payload: Buffer,
  sig: string,
  secret: string
) {
  const stripe = getStripe();
  return stripe.webhooks.constructEvent(payload, sig, secret);
}
