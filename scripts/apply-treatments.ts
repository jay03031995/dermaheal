/* Targeted treatment changes. Dry-run by default; pass --apply to write.
   npx tsx --env-file=.env.local scripts/apply-treatments.ts [--apply] */
import { writeClient } from "@/sanity/lib/client";

const ORDER: Record<string, number> = {
  "treatment-hair-transplant": 1,
  "treatment-hair-loss-treatment": 2,
  "treatment-hair-prp": 3, // Hair GFC (PRP)
};
const RENAME: Record<string, string> = {
  "treatment-chemical-peeling": "Chemical Peel",
  "treatment-carbon-laser-facial": "Carbon Laser",
};
const DELETE = [
  "treatment-botox", // Anti-Wrinkle Therapy (Botox)
  "092ecc5f-44b7-46af-896e-048e059bdf0a", // Regenera Activa
];
const CONCERN_WITH_BOTOX = "concern-anti-ageing-wrinkles";

async function main() {
  const apply = process.argv.includes("--apply");
  const client = writeClient(process.env.SANITY_API_TOKEN!);

  console.log(apply ? "*** APPLYING ***\n" : "*** DRY RUN (no writes) ***\n");
  console.log("Set order:");
  for (const [id, n] of Object.entries(ORDER)) console.log(`  ${id} -> order=${n}`);
  console.log("Rename:");
  for (const [id, name] of Object.entries(RENAME)) console.log(`  ${id} -> name="${name}"`);
  console.log("Remove botox reference from concern:", CONCERN_WITH_BOTOX);
  console.log("Delete docs:", DELETE.join(", "));

  if (!apply) {
    console.log("\nRe-run with --apply to execute.");
    return;
  }

  const tx = client.transaction();
  for (const [id, n] of Object.entries(ORDER)) tx.patch(id, (p) => p.set({ order: n }));
  for (const [id, name] of Object.entries(RENAME)) tx.patch(id, (p) => p.set({ name }));
  // Remove the botox reference first so the strong reference doesn't block deletion.
  tx.patch(CONCERN_WITH_BOTOX, (p) =>
    p.unset(['treatments[_ref=="treatment-botox"]']),
  );
  for (const id of DELETE) {
    tx.delete(id);
    tx.delete(`drafts.${id}`);
  }
  const res = await tx.commit();
  console.log("\nDone. Transaction id:", res.transactionId);
}

main().catch((e) => {
  console.error("\nERROR:", e.message || e);
  process.exit(1);
});
