import { createClient } from "@supabase/supabase-js";

// Lazy-initialize so missing env vars only fail at runtime, not at build time
function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase env vars are not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }
  return createClient(url, key);
}

export interface SubscriberRow {
  email: string;
  amount_paid: number;
  song_title?: string;
  stripe_session_id?: string;
}

export async function addSubscriber(row: SubscriberRow): Promise<void> {
  const supabase = getClient();
  const { error } = await supabase.from("subscribers").insert(row);
  if (error) {
    console.error("[supabase] addSubscriber error:", error.message);
    throw new Error("Failed to save subscriber.");
  }
}
