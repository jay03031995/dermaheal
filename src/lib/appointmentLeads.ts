"use client";

export type AppointmentLeadPayload = {
  channel: "call" | "whatsapp";
  label: string;
  location: string;
  targetPhone?: string;
  source?: string;
  name?: string;
  phone?: string;
  email?: string;
  age?: string;
  concern?: string;
  city?: string;
  doctor?: string;
  doctorName?: string;
};

export function trackAppointmentLead(payload: AppointmentLeadPayload) {
  const body = JSON.stringify({
    ...payload,
    pageUrl: window.location.href,
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/appointment-leads", blob);
    return;
  }

  void fetch("/api/appointment-leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}
