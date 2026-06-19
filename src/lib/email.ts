import { CLINIC } from "@/data/clinic";

/**
 * Sends the booking confirmation email to the patient (with a copy to the
 * clinic) via the Resend HTTP API — no SDK dependency needed.
 *
 * Best-effort: returns { sent: false, reason } instead of throwing, so a
 * mis-configured mailer never blocks a booking from being saved.
 *
 * Required env: RESEND_API_KEY.
 * Optional env: BOOKING_FROM_EMAIL (must be on a Resend-verified domain),
 *               BOOKING_NOTIFY_EMAIL (clinic inbox that gets a copy).
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export type BookingEmailData = {
  name: string;
  email?: string;
  phone: string;
  concern?: string;
  city?: string;
  date?: string;
  time?: string;
};

type SendResult = { sent: boolean; reason?: string };

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) =>
    c === "&" ? "&amp;" : c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&quot;",
  );

function renderRows(rows: [string, string | undefined][]) {
  return rows
    .filter(([, v]) => Boolean(v))
    .map(
      ([label, v]) =>
        `<tr>
          <td style="padding:8px 0;color:#6B5848;font-size:13px;">${esc(label)}</td>
          <td style="padding:8px 0;color:#2A1810;font-size:14px;font-weight:600;text-align:right;">${esc(v as string)}</td>
        </tr>`,
    )
    .join("");
}

export async function sendBookingConfirmation(
  d: BookingEmailData,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, reason: "RESEND_API_KEY not configured" };
  if (!d.email) return { sent: false, reason: "no patient email provided" };

  const from =
    process.env.BOOKING_FROM_EMAIL ||
    "Dermaheal Skin & Hair Clinic <appointments@dermaheal.co.in>";
  const clinicEmail = process.env.BOOKING_NOTIFY_EMAIL || CLINIC.email;

  const firstName = d.name.split(" ")[0] || "there";
  const when = [d.date, d.time].filter(Boolean).join(" · ") || "we'll confirm shortly";

  const rows = renderRows([
    ["Concern", d.concern],
    ["Clinic", d.city],
    ["Preferred slot", when],
    ["Name", d.name],
    ["Phone", d.phone],
  ]);

  const html = `<!doctype html>
<html><body style="margin:0;background:#FBF6EE;font-family:Helvetica,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <div style="background:#FFFDF8;border:1px solid #E6D8C2;border-radius:16px;padding:32px;">
      <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#798B5B;margin-bottom:10px;">Consultation request received</div>
      <h1 style="font-size:22px;color:#2A1810;margin:0 0 12px;">Thank you, ${esc(firstName)}.</h1>
      <p style="font-size:15px;line-height:1.6;color:#6B5848;margin:0 0 22px;">
        We've received your request for a consultation at Dermaheal Skin &amp; Hair Clinic, Dwarka.
        Our care team will reach out on WhatsApp shortly to confirm your slot. Here's a copy of your details:
      </p>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid #E6D8C2;border-bottom:1px solid #E6D8C2;">
        ${rows}
      </table>
      <p style="font-size:14px;line-height:1.6;color:#6B5848;margin:22px 0 0;">
        Need to reach us sooner? Call <a href="tel:${esc(CLINIC.phone.replace(/\s/g, ""))}" style="color:#422217;font-weight:600;">${esc(CLINIC.phone)}</a>.
      </p>
    </div>
    <p style="text-align:center;font-size:12px;color:#8C6E54;margin:18px 0 0;">
      ${esc(CLINIC.name)} · ${esc(CLINIC.address)}
    </p>
  </div>
</body></html>`;

  const text = `Thank you, ${firstName}.

We've received your consultation request at ${CLINIC.name}, Dwarka. Our care team will reach out on WhatsApp shortly to confirm your slot.

Concern: ${d.concern || "-"}
Clinic: ${d.city || "-"}
Preferred slot: ${when}
Name: ${d.name}
Phone: ${d.phone}

Need us sooner? Call ${CLINIC.phone}.
${CLINIC.name} · ${CLINIC.address}`;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [d.email],
        cc: clinicEmail ? [clinicEmail] : undefined,
        reply_to: clinicEmail || undefined,
        subject: "Your Dermaheal consultation request — confirmation",
        html,
        text,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { sent: false, reason: `Resend ${res.status}: ${body.slice(0, 200)}` };
    }
    return { sent: true };
  } catch (err) {
    return {
      sent: false,
      reason: err instanceof Error ? err.message : "email request failed",
    };
  }
}
