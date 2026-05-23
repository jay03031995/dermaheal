import { getTreatmentCards } from "@/sanity/lib/fetchers";
import { TREATMENT_CATS } from "@/data/treatments";
import TreatmentsClient from "./TreatmentsClient";

export default async function Treatments() {
  const treatments = await getTreatmentCards();
  return (
    <TreatmentsClient
      treatments={treatments}
      categories={TREATMENT_CATS as string[]}
    />
  );
}
