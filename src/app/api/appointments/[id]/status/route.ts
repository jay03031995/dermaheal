import { NextResponse, type NextRequest } from "next/server";
import { getDoctorName } from "@/data/appointments";
import { projectId, dataset } from "@/sanity/env";
import { writeClient } from "@/sanity/lib/client";
import { sendAppointmentApprovedEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

type Body = {
  status?: "confirmed" | "rejected" | "cancelled";
};

type AppointmentDoc = {
  _id: string;
  name?: string;
  phone?: string;
  email?: string;
  concern?: string;
  preferredClinic?: string;
  doctor?: string;
  doctorName?: string;
  preferredDate?: string;
  preferredTime?: string;
};

function bad(message: string, status = 400) {
  return NextResponse.json({ ok: false, message }, { status });
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const token = process.env.SANITY_API_TOKEN;
  if (!projectId || projectId === "missing") return bad("Sanity project is not configured", 500);
  if (!dataset) return bad("Sanity dataset is not configured", 500);
  if (!token) return bad("SANITY_API_TOKEN is not configured", 500);

  const { id } = await context.params;
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return bad("Invalid JSON body");
  }

  if (!body.status || !["confirmed", "rejected", "cancelled"].includes(body.status)) {
    return bad("Invalid appointment status");
  }

  const client = writeClient(token);
  const appointment = await client.fetch<AppointmentDoc | null>(
    `*[_type == "appointment" && _id == $id][0]{
      _id, name, phone, email, concern, preferredClinic, doctor, doctorName, preferredDate, preferredTime
    }`,
    { id },
  );
  if (!appointment) return bad("Appointment not found", 404);

  const now = new Date().toISOString();
  const patch = client.patch(id).set({ status: body.status });
  if (body.status === "confirmed") patch.set({ approvedAt: now });
  if (body.status === "rejected") patch.set({ rejectedAt: now });
  if (body.status === "cancelled") patch.set({ cancelledAt: now });
  await patch.commit();

  let emailSent = false;
  let emailReason: string | undefined;
  if (body.status === "confirmed") {
    const result = await sendAppointmentApprovedEmail({
      name: appointment.name || "Patient",
      phone: appointment.phone || "",
      email: appointment.email,
      concern: appointment.concern,
      city: appointment.preferredClinic,
      doctorName: appointment.doctorName || getDoctorName(appointment.doctor),
      date: appointment.preferredDate,
      time: appointment.preferredTime,
    });
    emailSent = result.sent;
    emailReason = result.reason;
    const emailPatch: Record<string, string | boolean> = {
      emailConfirmationSent: result.sent,
    };
    if (result.sent) emailPatch.emailConfirmationSentAt = new Date().toISOString();
    if (result.reason) emailPatch.emailConfirmationError = result.reason;
    await client.patch(id).set(emailPatch).commit();
  }

  return NextResponse.json({
    ok: true,
    status: body.status,
    emailSent,
    emailReason,
  });
}
