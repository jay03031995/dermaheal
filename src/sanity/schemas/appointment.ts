import { defineType, defineField } from "sanity";
import AppointmentActionsInput from "../components/AppointmentActionsInput";

/**
 * One appointment lead submitted or triggered through the website.
 * Created by public API routes (server-side, with the editor token).
 * Editable in Studio so clinic staff can update status, add internal notes,
 * and follow up on form, call, and WhatsApp leads from one dashboard.
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
          { title: "Contacted (email / phone)", value: "contacted" },
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
      name: "leadType",
      title: "Lead type",
      type: "string",
      initialValue: "form",
      options: {
        list: [
          { title: "Appointment form", value: "form" },
          { title: "CTA click", value: "cta" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "leadChannel",
      title: "Lead channel",
      type: "string",
      initialValue: "form",
      options: {
        list: [
          { title: "Form", value: "form" },
          { title: "Call", value: "call" },
          { title: "WhatsApp", value: "whatsapp" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name",
      title: "Patient name",
      type: "string",
      validation: (r) =>
        r.custom((value, context) => {
          if (context.document?.leadType === "cta") return true;
          return value ? true : "Patient name is required for form submissions";
        }),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      validation: (r) =>
        r.custom((value, context) => {
          if (context.document?.leadType === "cta") return true;
          return value ? true : "Phone is required for form submissions";
        }),
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
      name: "ctaLabel",
      title: "CTA label",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "ctaLocation",
      title: "CTA location",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "targetPhone",
      title: "Target phone",
      type: "string",
      readOnly: true,
      description: "Clinic number used by the clicked call or WhatsApp CTA.",
    }),
    defineField({
      name: "pageUrl",
      title: "Page URL",
      type: "url",
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
      name: "emailConfirmationSent",
      title: "Email confirmation sent (system)",
      type: "boolean",
      readOnly: true,
      description:
        "This is updated automatically after using Approve & send email or Send confirmation email.",
    }),
    defineField({
      name: "emailConfirmationSentAt",
      title: "Email confirmation sent at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "emailConfirmationError",
      title: "Email confirmation error",
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
      leadType: "leadType",
      leadChannel: "leadChannel",
      ctaLabel: "ctaLabel",
      doctorName: "doctorName",
      date: "preferredDate",
      time: "preferredTime",
      phone: "phone",
      targetPhone: "targetPhone",
    },
    prepare({ name, concern, status, leadType, leadChannel, ctaLabel, doctorName, date, time, phone, targetPhone }) {
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
      const channelLabel: Record<string, string> = {
        form: "Form",
        call: "Call",
        whatsapp: "WhatsApp",
      };
      return {
        title: `${statusLabel[status] ?? status} — ${
          name ?? ctaLabel ?? "Website lead"
        }`,
        subtitle: [
          channelLabel[leadChannel] ?? leadType,
          phone ?? targetPhone,
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
