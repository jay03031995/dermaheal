import type { StructureBuilder } from "sanity/structure";
import { singletonTypes } from "./schemas";

const SINGLETON_LABELS: Record<string, string> = {
  clinicSettings: "Clinic settings",
  siteSettings: "Site settings & SEO",
  announcementBar: "Announcement bar",
};

/**
 * Studio sidebar structure — singletons appear as a single document each
 * (not a list of one), and content collections are grouped logically.
 */
export const structure = (S: StructureBuilder) =>
  S.list()
    .title("Dermaheal Admin")
    .items([
      // Singletons
      ...Array.from(singletonTypes).map((type) =>
        S.listItem()
          .title(SINGLETON_LABELS[type] ?? type)
          .id(type)
          .child(S.document().schemaType(type).documentId(type)),
      ),
      S.divider(),
      // Collections
      S.listItem()
        .title("Treatments")
        .child(
          S.list()
            .title("Treatments")
            .items([
              S.listItem()
                .title("All treatments")
                .child(S.documentTypeList("treatment").title("All treatments")),
              S.listItem()
                .title("Categories")
                .child(
                  S.documentTypeList("treatmentCategory").title("Categories"),
                ),
            ]),
        ),
      S.documentTypeListItem("concern").title("Concerns"),
      S.documentTypeListItem("doctor").title("Doctors"),
      S.documentTypeListItem("result").title("Patient results"),
      S.divider(),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("homepageFaq").title("Homepage FAQs"),
      S.documentTypeListItem("eeatPillar").title("EEAT pillars"),
      S.documentTypeListItem("trustItem").title("Trust strip items"),
      S.divider(),
      S.documentTypeListItem("redirect").title("URL redirects"),
    ]);
