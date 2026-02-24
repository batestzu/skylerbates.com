import sgMail from "@sendgrid/mail";

function configureClient(): void {
  const key = process.env.SENDGRID_API_KEY;
  if (!key) throw new Error("SENDGRID_API_KEY is not configured.");
  sgMail.setApiKey(key);
}

/**
 * Send the song download email with the file attached from SONG_FILE_URL.
 */
export async function sendSongEmail(toEmail: string): Promise<void> {
  configureClient();

  const songUrl = process.env.SONG_FILE_URL;
  const from = process.env.SENDGRID_FROM_EMAIL;
  const songTitle = process.env.SONG_TITLE || "Your download";

  if (!songUrl) throw new Error("SONG_FILE_URL is not configured.");
  if (!from) throw new Error("SENDGRID_FROM_EMAIL is not configured.");

  // Fetch the file and encode as base64 for SendGrid attachment
  const fileRes = await fetch(songUrl);
  if (!fileRes.ok) throw new Error(`Could not fetch song file: ${fileRes.status}`);
  const buffer = await fileRes.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  // Determine file extension from URL
  const ext = songUrl.split(".").pop()?.toLowerCase() || "mp3";
  const mimeType = ext === "wav" ? "audio/wav" : "audio/mpeg";
  const filename = `${songTitle.replace(/[^a-z0-9]/gi, "_")}.${ext}`;

  await sgMail.send({
    to: toEmail,
    from,
    subject: `Your download: ${songTitle}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; color: #1a1a1a;">
        <h1 style="font-weight: 300; font-size: 28px; margin-bottom: 8px;">Thank you.</h1>
        <p style="color: #555; line-height: 1.7; margin-bottom: 20px;">
          Your download of <strong>${songTitle}</strong> is attached to this email.
          I hope it means something to you.
        </p>
        <p style="color: #555; line-height: 1.7; margin-bottom: 20px;">
          — Skyler
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="font-size: 11px; color: #999;">
          You joined the mailing list when you downloaded this track.
          To unsubscribe, reply to this email with "unsubscribe" in the subject.
        </p>
      </div>
    `,
    attachments: [
      {
        content: base64,
        filename,
        type: mimeType,
        disposition: "attachment",
      },
    ],
  });
}

/**
 * Send a booking inquiry alert to the artist's email.
 */
export async function sendBookingAlert(data: Record<string, string>): Promise<void> {
  configureClient();

  const artistEmail = process.env.ARTIST_EMAIL;
  const from = process.env.SENDGRID_FROM_EMAIL;

  if (!artistEmail) throw new Error("ARTIST_EMAIL is not configured.");
  if (!from) throw new Error("SENDGRID_FROM_EMAIL is not configured.");

  const rows = Object.entries(data)
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding: 6px 12px; color: #888; text-transform: capitalize; white-space: nowrap;">${k.replace(/_/g, " ")}</td><td style="padding: 6px 12px; color: #222;">${v}</td></tr>`
    )
    .join("");

  await sgMail.send({
    to: artistEmail,
    from,
    replyTo: data.email || from,
    subject: `New booking inquiry from ${data.name || "unknown"}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
        <h2 style="font-weight: 300; font-size: 22px; margin-bottom: 16px;">New Booking Inquiry</h2>
        <table style="border-collapse: collapse; width: 100%; font-size: 14px;">
          ${rows}
        </table>
      </div>
    `,
  });
}
