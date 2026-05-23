import type { MetadataRoute } from "next";
import {
  getConcernSlugs,
  getDoctorSlugs,
  getTreatmentSlugs,
} from "@/sanity/lib/fetchers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://dermaheal.co.in";
  const lastModified = new Date();

  const [treatmentSlugs, concernSlugs, doctorSlugs] = await Promise.all([
    getTreatmentSlugs(),
    getConcernSlugs(),
    getDoctorSlugs(),
  ]);

  const top = [
    { path: "", priority: 1 },
    { path: "/treatments", priority: 0.9 },
    { path: "/concerns", priority: 0.9 },
    { path: "/doctors", priority: 0.9 },
    { path: "/results", priority: 0.8 },
  ];

  const treatments = treatmentSlugs.map((slug) => ({
    path: `/treatments/${slug}`,
    priority: 0.8,
  }));

  const concerns = concernSlugs.map((slug) => ({
    path: `/concerns/${slug}`,
    priority: 0.75,
  }));

  const doctors = doctorSlugs.map((slug) => ({
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
