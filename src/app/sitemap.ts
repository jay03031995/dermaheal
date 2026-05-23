import type { MetadataRoute } from "next";
import { TREATMENT_DETAIL_SLUGS } from "@/data/treatments";
import { DOCTOR_SLUGS } from "@/data/doctors";
import { CONCERN_SLUGS } from "@/data/concerns";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dermaheal.co.in";
  const lastModified = new Date();

  const top = [
    { path: "", priority: 1 },
    { path: "/treatments", priority: 0.9 },
    { path: "/concerns", priority: 0.9 },
    { path: "/doctors", priority: 0.9 },
    { path: "/results", priority: 0.8 },
  ];

  const treatments = TREATMENT_DETAIL_SLUGS.map((slug) => ({
    path: `/treatments/${slug}`,
    priority: 0.8,
  }));

  const concerns = CONCERN_SLUGS.map((slug) => ({
    path: `/concerns/${slug}`,
    priority: 0.75,
  }));

  const doctors = DOCTOR_SLUGS.map((slug) => ({
    path: `/doctors/${slug}`,
    priority: 0.7,
  }));

  return [...top, ...treatments, ...concerns, ...doctors].map(
    ({ path, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority,
    }),
  );
}
