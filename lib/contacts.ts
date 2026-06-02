export async function addContact(email: string): Promise<void> {
  const key = process.env.SENDGRID_API_KEY;
  if (!key) {
    console.error("[sendgrid contacts] SENDGRID_API_KEY not set — skipping contact add");
    return;
  }

  const body: Record<string, unknown> = { contacts: [{ email }] };
  const listId = process.env.SENDGRID_LIST_ID;
  if (listId) body.list_ids = [listId];

  try {
    const res = await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.error("[sendgrid contacts] error:", await res.text());
      // non-critical — don't throw, let email send proceed
    }
  } catch (err) {
    console.error("[sendgrid contacts] unexpected error:", err);
    // non-critical — don't throw
  }
}
