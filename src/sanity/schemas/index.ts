import {
  benefitObject,
  bookSlotCardObject,
  credentialObject,
  doctorTreatmentObject,
  faqItemObject,
  footerColumnObject,
  footerLinkObject,
  heroBadgeObject,
  patientQuoteObject,
  processStepObject,
  protocolOptionObject,
  seoObject,
  statObject,
  timelineEntryObject,
} from "./objects";
import {
  announcementBarSchema,
  clinicSettingsSchema,
  siteSettingsSchema,
} from "./singletons";
import { treatmentCategorySchema, treatmentSchema } from "./treatment";
import { concernSchema } from "./concern";
import { doctorSchema } from "./doctor";
import { galleryImageSchema } from "./galleryImage";
import { resultSchema } from "./result";
import {
  eeatPillarSchema,
  homepageFaqSchema,
  redirectSchema,
  testimonialSchema,
  trustItemSchema,
} from "./siteContent";
import { appointmentSchema } from "./appointment";

export const schemaTypes = [
  // Objects
  seoObject,
  processStepObject,
  protocolOptionObject,
  benefitObject,
  faqItemObject,
  credentialObject,
  timelineEntryObject,
  patientQuoteObject,
  statObject,
  doctorTreatmentObject,
  heroBadgeObject,
  bookSlotCardObject,
  footerLinkObject,
  footerColumnObject,
  // Singletons
  clinicSettingsSchema,
  siteSettingsSchema,
  announcementBarSchema,
  // Documents
  treatmentCategorySchema,
  treatmentSchema,
  concernSchema,
  doctorSchema,
  resultSchema,
  galleryImageSchema,
  testimonialSchema,
  homepageFaqSchema,
  eeatPillarSchema,
  trustItemSchema,
  redirectSchema,
  appointmentSchema,
];

export const singletonTypes = new Set([
  "clinicSettings",
  "siteSettings",
  "announcementBar",
]);
