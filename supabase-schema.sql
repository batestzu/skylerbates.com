-- Run this in the Supabase SQL editor to create the subscribers table

CREATE TABLE IF NOT EXISTS subscribers (
  id               UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  email            TEXT          NOT NULL,
  amount_paid      NUMERIC(10,2) DEFAULT 0.00,
  song_title       TEXT,
  stripe_session_id TEXT,
  created_at       TIMESTAMPTZ   DEFAULT NOW()
);

-- Optional: index for email lookups / deduplication checks
CREATE INDEX IF NOT EXISTS subscribers_email_idx ON subscribers (email);

-- Optional: enable Row Level Security (recommended for Supabase projects)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Only the service role can read/write (no public access)
-- (Service-role key bypasses RLS automatically)
