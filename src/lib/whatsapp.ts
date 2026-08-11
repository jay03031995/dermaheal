import { CLINIC } from "@/data/clinic";

type WhatsAppAppointment = {
  name?: string;
  phone?: string;
  doctorName?: string;
  preferredDate?: string;
  preferredTime?: string;
};

type SendResult = { sent: boolean; reason?: string };

function normalizePhone(phone?: string) {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

function formatDate(date?: string) {
  if (!date) return "the selected date";
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function renderAppointmentWhatsAppMessage(appointment: WhatsAppAppointment) {
  const firstName = appointment.name?.split(" ")[0] || "there";
  return [
    `Hello ${firstName}, your Dermaheal appointment is confirmed.`,
    "",
    `Doctor: ${appointment.doctorName || "Dermaheal doctor"}`,
    `Date: ${formatDate(appointment.preferredDate)}`,
    `Time: ${appointment.preferredTime || "as discussed"}`,
    "",
    `Please reach ${CLINIC.name}, ${CLINIC.address}. For changes, call ${CLINIC.phone}.`,
  ].join("\n");
}

export async function sendAppointmentWhatsAppConfirmation(
  appointment: WhatsAppAppointment,
): Promise<SendResult> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) {
    return {
      sent: false,
      reason: "WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID not configured",
    };
  }

  const to = normalizePhone(appointment.phone);
  if (!to) return { sent: false, reason: "patient phone missing" };

  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: {
          preview_url: false,
          body: renderAppointmentWhatsAppMessage(appointment),
        },
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { sent: false, reason: `WhatsApp ${res.status}: ${body.slice(0, 200)}` };
    }
    return { sent: true };
  } catch (err) {
    return {
      sent: false,
      reason: err instanceof Error ? err.message : "WhatsApp request failed",
    };
  }
}
