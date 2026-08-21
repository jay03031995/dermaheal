import type { StructureBuilder } from "sanity/structure";
import { singletonTypes } from "./schemas";
import AppointmentsDashboard from "./dashboard/AppointmentsDashboard";

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
      // Dashboard — landing view with live lead counters for clinic staff.
      S.listItem()
        .title("📊 Appointment Leads")
        .id("appointmentsDashboard")
        .icon(() => "📊")
        .child(
          S.component(AppointmentsDashboard)
            .id("appointmentsDashboard")
            .title("Appointment Leads Dashboard"),
        ),
      S.divider(),
      // Appointment leads — pinned at top so staff see new leads first.
      S.listItem()
        .title("📅 Appointment Leads")
        .child(
          S.list()
            .title("Appointment Leads")
            .items([
              S.listItem()
                .title("🟡 New / pending leads")
                .child(
                  S.documentTypeList("appointment")
                    .title("New / pending leads")
                    .filter('_type == "appointment" && status in ["pending","new"] && coalesce(leadChannel, "form") != "call"')
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .title("📝 Form submissions")
                .child(
                  S.documentTypeList("appointment")
                    .title("Form submissions")
                    .filter('_type == "appointment" && coalesce(leadType, "form") == "form"')
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .title("📞 Call clicks")
                .child(
                  S.documentTypeList("appointment")
                    .title("Call clicks")
                    .filter('_type == "appointment" && leadChannel == "call"')
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .title("WhatsApp clicks")
                .child(
                  S.documentTypeList("appointment")
                    .title("WhatsApp clicks")
                    .filter('_type == "appointment" && leadChannel == "whatsapp"')
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ]),
                ),
              S.listItem()
                .title("✅ Confirmed")
                .child(
                  S.documentTypeList("appointment")
                    .title("Confirmed")
                    .filter('_type == "appointment" && status == "confirmed"')
                    .defaultOrdering([
                      { field: "preferredDate", direction: "asc" },
                    ]),
                ),
              S.listItem()
                .title("✗ Rejected / cancelled")
                .child(
                  S.documentTypeList("appointment")
                    .title("Rejected / cancelled")
                    .filter('_type == "appointment" && status in ["rejected","cancelled"]')
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ]),
                ),
              S.divider(),
              S.listItem()
                .title("All appointment leads")
                .child(
                  S.documentTypeList("appointment")
                    .title("All appointment leads")
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ]),
                ),
            ]),
        ),
      S.divider(),
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
      S.documentTypeListItem("galleryImage").title("Gallery images"),
      S.divider(),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("homepageFaq").title("Homepage FAQs"),
      S.documentTypeListItem("eeatPillar").title("EEAT pillars"),
      S.documentTypeListItem("trustItem").title("Trust strip items"),
      S.divider(),
      S.documentTypeListItem("redirect").title("URL redirects"),
    ]);
