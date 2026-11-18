import { defineField, defineType } from "sanity";

export const doctorSchema = defineType({
  name: "doctor",
  title: "Doctor",
  type: "document",
  groups: [
    { name: "main", title: "Main", default: true },
    { name: "homecard", title: "Home card" },
    { name: "listing", title: "Doctors listing" },
    { name: "booking", title: "Booking form" },
    { name: "detail", title: "Detail page" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // Main
    defineField({ name: "name", title: "Full name", type: "string", group: "main", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "main",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
      description: "The /doctors/<slug> URL.",
    }),
    defineField({ name: "title", title: "Title / role", type: "string", group: "main", validation: (r) => r.required() }),
    defineField({
      name: "portrait",
      title: "Portrait image",
      type: "image",
      options: { hotspot: true },
      group: "main",
      description: "Used on the home card, doctors listing and detail page.",
    }),
    defineField({
      name: "imageVariant",
      title: "Fallback gradient",
      type: "string",
      group: "main",
      options: { list: ["d1", "d2", "d3"].map((v) => ({ title: v, value: v })) },
      initialValue: "d1",
    }),
    defineField({ name: "years", title: "Years practising", type: "number", group: "main", validation: (r) => r.required() }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
      group: "main",
    }),
    defineField({
      name: "bookingUrl",
      title: "Booking URL",
      type: "url",
      group: "main",
      description:
        "Optional external booking link for this doctor. When set, this doctor's 'Book Appointment' buttons link here instead of opening the booking form.",
    }),
    defineField({
      name: "bookingMode",
      title: "Booking method",
      type: "string",
      group: "booking",
      options: {
        list: [
          { title: "Online time slots", value: "online" },
          { title: "Call only", value: "call-only" },
        ],
      },
      initialValue: "online",
    }),
    defineField({
      name: "bookingSchedule",
      title: "Weekly availability",
      type: "array",
      group: "booking",
      description:
        "Each entry applies the same hours to its selected days. The end time is exclusive; for example, 3:30 PM–7:30 PM with 30-minute slots offers starts through 7:00 PM.",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "days",
              title: "Days",
              type: "array",
              of: [
                {
                  type: "string",
                  options: {
                    list: [
                      { title: "Sunday", value: "sunday" },
                      { title: "Monday", value: "monday" },
                      { title: "Tuesday", value: "tuesday" },
                      { title: "Wednesday", value: "wednesday" },
                      { title: "Thursday", value: "thursday" },
                      { title: "Friday", value: "friday" },
                      { title: "Saturday", value: "saturday" },
                    ],
                  },
                },
              ],
              validation: (rule) => rule.required().min(1),
            }),
            defineField({
              name: "startTime",
              title: "Start time (24-hour HH:mm)",
              type: "string",
              validation: (rule) =>
                rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
            }),
            defineField({
              name: "endTime",
              title: "End time (24-hour HH:mm)",
              type: "string",
              validation: (rule) =>
                rule.required().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
            }),
            defineField({
              name: "slotIntervalMinutes",
              title: "Appointment start interval",
              type: "number",
              options: {
                list: [
                  { title: "Every 30 minutes", value: 30 },
                  { title: "Every 60 minutes", value: 60 },
                ],
              },
              initialValue: 30,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { days: "days", start: "startTime", end: "endTime" },
            prepare: ({ days, start, end }) => ({
              title: (days ?? []).join(", ") || "Availability",
              subtitle: start && end ? `${start}–${end}` : undefined,
            }),
          },
        },
      ],
    }),
    defineField({
      name: "bookingNote",
      title: "Booking note",
      type: "string",
      group: "booking",
      description: "Optional note shown beneath this doctor's booking schedule.",
    }),
    // Home card
    defineField({
      name: "focusLine",
      title: "Focus line",
      type: "string",
      group: "homecard",
      description: 'Shown on the homepage card under "Focus". e.g. "Skin · Hair · Nail".',
    }),
    defineField({
      name: "homeBio",
      title: "Homepage bio",
      type: "text",
      rows: 4,
      group: "homecard",
      description: "Shown on the homepage doctor card.",
    }),
    // Listing
    defineField({
      name: "shortLine",
      title: "Listing eyebrow line",
      type: "string",
      group: "listing",
      description: 'e.g. "Cosmetic dermatology · Acne & scars · Hair restoration"',
    }),
    defineField({ name: "listBio", title: "Listing bio", type: "text", rows: 5, group: "listing" }),
    defineField({
      name: "statCreds",
      title: "Stat badges (3 expected)",
      type: "array",
      of: [{ type: "statCred" }],
      group: "listing",
      validation: (r) => r.max(3),
    }),
    defineField({
      name: "listExpertise",
      title: "Quick expertise tags",
      type: "array",
      of: [{ type: "string" }],
      group: "listing",
    }),
    // Detail
    defineField({ name: "tagline", title: "Personal quote / tagline", type: "text", rows: 3, group: "detail" }),
    defineField({ name: "detailBio", title: "Full detail bio", type: "text", rows: 6, group: "detail" }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [{ type: "credential" }],
      group: "detail",
    }),
    defineField({
      name: "timeline",
      title: "Education & experience timeline",
      type: "array",
      of: [{ type: "timelineEntry" }],
      group: "detail",
    }),
    defineField({
      name: "expertise",
      title: "Areas of expertise",
      type: "array",
      of: [{ type: "string" }],
      group: "detail",
      description: "Shown as pills on the detail page.",
    }),
    defineField({
      name: "treatments",
      title: "Treatments performed",
      type: "array",
      of: [{ type: "doctorTreatment" }],
      group: "detail",
    }),
    defineField({
      name: "quotes",
      title: "Patient quotes",
      type: "array",
      of: [{ type: "patientQuote" }],
      group: "detail",
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  orderings: [
    { name: "order", title: "Manual order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: { select: { title: "name", subtitle: "title", media: "portrait" } },
});
