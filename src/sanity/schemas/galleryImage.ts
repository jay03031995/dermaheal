import { defineField, defineType } from "sanity";

export const galleryImageSchema = defineType({
  name: "galleryImage",
  title: "Gallery image",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Clinic", value: "clinic" },
          { title: "Equipments", value: "equipment" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Short description for accessibility and search engines.",
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Show on website",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    { name: "order", title: "Manual order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "image" },
  },
});
