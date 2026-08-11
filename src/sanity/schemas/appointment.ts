import { defineType, defineField } from "sanity";
import AppointmentActionsInput from "../components/AppointmentActionsInput";

/**
 * One appointment request submitted through the website booking modal.
 * Created by the public POST /api/bookings route (server-side, with the
 * editor token). Editable in Studio so clinic staff can update status,
 * add internal notes, etc.
 */
export const appointmentSchema = defineType({
  name: "appointment",
  title: "Appointment",
  type: "document",
  fields: [
    defineField({
      name: "adminActions",
      title: "Admin actions",
      type: "string",
      readOnly: true,
      components: { input: AppointmentActionsInput },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "pending",
      options: {
        list: [
          { title: "Pending — needs admin approval", value: "pending" },
          { title: "New — needs follow-up", value: "new" },
          { title: "Contacted (WhatsApp / phone)", value: "contacted" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Rejected", value: "rejected" },
          { title: "Completed", value: "completed" },
          { title: "Cancelled by patient", value: "cancelled" },
          { title: "No-show", value: "noShow" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      title: "Patient name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "ageRange",
      title: "Age range",
      type: "string",
    }),
    defineField({
      name: "concern",
      title: "Primary concern",
      type: "string",
    }),
    defineField({
      name: "preferredClinic",
      title: "Preferred clinic",
      type: "string",
    }),
    defineField({
      name: "doctor",
      title: "Selected doctor",
      type: "string",
      options: {
        list: [
          { title: "Dr. Navjot Singh Arora", value: "navjot-arora" },
          { title: "Dr. Jasmine Kohli", value: "jasmine-kohli" },
          { title: "Dr. Sonika Soni", value: "sonika-soni" },
        ],
      },
    }),
    defineField({
      name: "doctorName",
      title: "Doctor name",
      type: "string",
      readOnly: true,
      description: "Stored at submission time so old records remain readable if doctor IDs change.",
    }),
    defineField({
      name: "preferredDate",
      title: "Preferred date",
      type: "date",
      options: { dateFormat: "ddd, DD MMM YYYY" },
    }),
    defineField({
      name: "preferredTime",
      title: "Preferred time",
      type: "string",
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "approvedAt",
      title: "Approved at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "rejectedAt",
      title: "Rejected at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "cancelledAt",
      title: "Cancelled at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "whatsappConfirmationSent",
      title: "WhatsApp confirmation sent (system)",
      type: "boolean",
      readOnly: true,
      description:
        "This is updated automatically after using Approve & send WhatsApp or Send WhatsApp confirmation.",
    }),
    defineField({
      name: "whatsappConfirmationSentAt",
      title: "WhatsApp confirmation sent at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "whatsappConfirmationError",
      title: "WhatsApp confirmation error",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      readOnly: true,
      description:
        "Where the request came from (e.g. website-booking-modal, homepage-simple).",
    }),
    defineField({
      name: "notes",
      title: "Internal notes",
      type: "text",
      rows: 4,
      description: "Staff-only — not visible to the patient.",
    }),
  ],
  preview: {
    select: {
      name: "name",
      concern: "concern",
      status: "status",
      doctorName: "doctorName",
      date: "preferredDate",
      time: "preferredTime",
      phone: "phone",
    },
    prepare({ name, concern, status, doctorName, date, time, phone }) {
      const statusLabel: Record<string, string> = {
        pending: "🟡 Pending",
        new: "🟠 New",
        contacted: "📞 Contacted",
        confirmed: "✅ Confirmed",
        rejected: "✗ Rejected",
        completed: "✓ Completed",
        cancelled: "✗ Cancelled",
        noShow: "⚠ No-show",
      };
      return {
        title: `${statusLabel[status] ?? status} — ${name ?? "Unnamed"}`,
        subtitle: [
          phone,
          doctorName,
          concern,
          date && time ? `${date} · ${time}` : date || time,
        ]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
  orderings: [
    {
      title: "Submitted (newest first)",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Preferred date (soonest first)",
      name: "preferredDateAsc",
      by: [{ field: "preferredDate", direction: "asc" }],
    },
  ],
});
