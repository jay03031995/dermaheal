import {
  benefitObject,
  credentialObject,
  doctorTreatmentObject,
  faqItemObject,
  footerColumnObject,
  footerLinkObject,
  patientQuoteObject,
  processStepObject,
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
  benefitObject,
  faqItemObject,
  credentialObject,
  timelineEntryObject,
  patientQuoteObject,
  statObject,
  doctorTreatmentObject,
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
