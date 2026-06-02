import sgMail from "@sendgrid/mail";

function getApiKey(): string {
  const key = process.env.SENDGRID_API_KEY;
  if (!key) throw new Error("SENDGRID_API_KEY is not configured.");
  return key;
}

export async function addContact(email: string): Promise<void> {
  const key = getApiKey();

  const body: Record<string, unknown> = {
    contacts: [{ email }],
  };

  const listId = process.env.SENDGRID_LIST_ID;
  if (listId) body.list_ids = [listId];

  const res = await fetch("https://api.sendgrid.com/v3/marketing/contacts", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[sendgrid contacts] error:", text);
    throw new Error("Failed to add contact.");
  }
}
