export type ConcernSummary = {
  id: string;
  slug: string;
  name: string;
  count: string;
  icon: string;
};

export type ConcernDetail = ConcernSummary & {
  headline: string;
  summary: string;
  symptoms: string[];
  causes: string[];
  approach: string[];
  treatmentSlugs: string[];
  faqs: { q: string; a: string }[];
};

const define = <T extends ConcernDetail>(c: T) => c;

export const CONCERNS_FULL: ConcernDetail[] = [
  define({
    id: "acne",
    slug: "acne",
    name: "Acne & Acne Scars",
    count: "Chemical peels · MNRF",
    icon: "◍",
    headline: "Clear the breakout. Soften the scar.",
    summary:
      "From hormonal teenage acne to adult cystic flare-ups and the marks they leave behind, our acne programmes manage active breakouts first, then layer targeted protocols to reduce scars and dark spots.",
    symptoms: [
      "Persistent papules, pustules or cysts",
      "Post-acne pigmentation marks",
      "Rolling, boxcar or icepick scars",
      "Open pores and oily, congested skin",
    ],
    causes: [
      "Hormonal triggers (PCOS, androgens)",
      "Stress and lifestyle factors",
      "Comedogenic skincare or make-up",
      "Genetic predisposition",
    ],
    approach: [
      "We control active acne first using prescription topicals and oral therapy when needed, then layer in-clinic peels or MNRF to manage marks and scars.",
      "Skincare is calibrated to your skin type, and we coach you through the everyday triggers that quietly maintain breakouts.",
    ],
    treatmentSlugs: ["chemical-peeling", "mnrf", "acne-scar-reduction", "face-prp", "medifacial"],
    faqs: [
      { q: "Will my acne come back after treatment?", a: "Active acne is a chronic tendency. With the right routine, dietary awareness and maintenance therapy, most patients hold their results indefinitely. We coach you on staying clear once you are." },
      { q: "Can scars and active acne be treated together?", a: "Scar therapy is usually deferred until breakouts settle. We accelerate scar work the moment your skin is stable, so you don't lose time." },
    ],
  }),
  define({
    id: "pigment",
    slug: "pigmentation-melasma",
    name: "Pigmentation & Melasma",
    count: "Cosmelan · Dermamelan",
    icon: "◐",
    headline: "Even tone, calibrated for Indian skin.",
    summary:
      "Melasma, post-inflammatory marks and sun damage need a steady, layered protocol, not aggressive lasers. Our pigmentation pathway combines prescription topicals, gentle in-clinic therapy and serious SPF discipline.",
    symptoms: [
      "Patchy darker areas on cheeks, upper lip, forehead",
      "Dark marks left behind by old acne",
      "Sun-induced spots, lentigines",
      "Under-eye darkening",
    ],
    causes: [
      "Sun exposure (the biggest single trigger)",
      "Hormonal changes (pregnancy, contraceptives)",
      "Inflammation (acne, eczema, friction)",
      "Genetic and ethnic predisposition",
    ],
    approach: [
      "We start with a careful diagnosis, melasma, PIH and lentigines need different treatment, then layer prescription topicals with Cosmelan, Dermamelan, peels or Q-switch as appropriate.",
      "Daily broad-spectrum SPF is non-negotiable. We coach you on the only protocol that works forever.",
    ],
    treatmentSlugs: ["cosmelan", "dermamelan", "hyperpigmentation-reduction", "chemical-peeling", "ipl"],
    faqs: [
      { q: "Why is melasma so hard to treat?", a: "Melasma is a chronic, recurrence-prone condition driven by sun, hormones and inflammation. It can be controlled brilliantly with patience and discipline, but it is rarely cured." },
      { q: "Can lasers fix melasma?", a: "Aggressive lasers can worsen melasma in Indian skin. We prefer conservative protocols, Q-switch toning, peels or Cosmelan, layered with topicals." },
    ],
  }),
  define({
    id: "aging",
    slug: "anti-ageing-wrinkles",
    name: "Anti-Ageing & Wrinkles",
    count: "Botox · Fillers · HIFU",
    icon: "✺",
    headline: "Refresh, never alter.",
    summary:
      "Our anti-ageing pathway is built around conservative, layered care: Botox to soften lines, fillers to restore subtle volume, HIFU and threads to lift, and a skincare backbone that protects what we build.",
    symptoms: [
      "Forehead, frown and crow's-feet lines",
      "Mid-face volume loss",
      "Loss of jawline definition",
      "Tear-trough hollows and tired look",
    ],
    causes: [
      "Collagen and elastin decline with age",
      "Cumulative sun damage",
      "Bone and fat-pad rearrangement",
      "Repetitive expression",
    ],
    approach: [
      "We assess your face holistically, not by treatment. The right plan is rarely just one product; it often blends Botox, filler, energy devices and skincare.",
      "Our philosophy is conservative dosing and predictable outcomes. You look refreshed, not different.",
    ],
    treatmentSlugs: ["botox", "dermal-fillers", "hifu", "thread-lifting", "medifacial"],
    faqs: [
      { q: "When should I start anti-ageing treatment?", a: "Prevention starts in the late 20s with sunscreen, retinoids and antioxidants. Botox is most powerful when started early; fillers when volume loss appears." },
      { q: "Will people know I've had treatment?", a: "Done well, no. Our approach is conservative dosing, layered over multiple sessions if needed, to keep results subtle and natural." },
    ],
  }),
  define({
    id: "hairloss",
    slug: "hair-loss-thinning",
    name: "Hair Loss & Thinning",
    count: "PRP · Transplant · GFC",
    icon: "❋",
    headline: "Diagnose the cause. Build the right protocol.",
    summary:
      "Hair loss has many causes, hormonal, nutritional, genetic, stress-related, and each needs a different plan. We start with diagnostics, then layer medical therapy, in-clinic care and, when appropriate, transplant.",
    symptoms: [
      "Increased shedding when washing or combing",
      "Visible scalp on the crown or hairline",
      "Thinning ponytail or part",
      "Receding hairline (men) or widening part (women)",
    ],
    causes: [
      "Genetic / androgenetic alopecia",
      "Hormonal (PCOS, thyroid, post-partum)",
      "Nutrient deficiencies (iron, vitamin D)",
      "Stress and lifestyle triggers",
    ],
    approach: [
      "Trichoscopy and targeted blood work identify the cause before we choose a therapy. Layered protocols, topicals plus oral plus in-clinic PRP, outperform any single intervention.",
      "Once medical control is in place, we add regenerative therapy (PRP, GFC, exosomes). Transplant is reserved for stable, advanced cases.",
    ],
    treatmentSlugs: ["hair-loss-treatment", "hair-prp", "hair-transplant", "exosomes"],
    faqs: [
      { q: "How quickly will I see results?", a: "Reduced shedding within 2 to 3 months; visible regrowth from months 4 to 6 onwards. Hair grows in slow cycles, the programme requires patience." },
      { q: "Should I get a transplant straight away?", a: "Rarely. Most patients respond well to medical management plus PRP. Transplant is best reserved for stable, advanced patterns once hair loss is controlled." },
    ],
  }),
  define({
    id: "laser",
    slug: "unwanted-hair",
    name: "Unwanted Hair",
    count: "Laser hair reduction",
    icon: "⟡",
    headline: "Smooth skin, calibrated for Indian tones.",
    summary:
      "FDA-approved diode and Nd:YAG laser hair reduction safely reduces unwanted hair, with protocols specifically built for higher-melanin Indian skin. Six to eight sessions usually deliver 80 to 90 percent reduction.",
    symptoms: [
      "Coarse or dense facial or body hair",
      "Ingrown hairs from waxing or shaving",
      "Hirsutism (often hormonal)",
      "Post-shave irritation",
    ],
    causes: [
      "Genetic and ethnic factors",
      "Hormonal (PCOS, androgens)",
      "Medication side-effects",
      "Idiopathic",
    ],
    approach: [
      "We always screen for hormonal causes (especially PCOS) before starting, so the cause is addressed alongside the cosmetic concern.",
      "Calibrated diode or Nd:YAG sessions every 4 to 6 weeks deliver progressive reduction, with maintenance once or twice a year.",
    ],
    treatmentSlugs: ["laser-hair-reduction"],
    faqs: [
      { q: "Is laser hair reduction permanent?", a: "Laser provides long-term reduction, not 100 percent permanent removal. Most patients enjoy 80 to 90 percent reduction with occasional touch-ups thereafter." },
      { q: "Is it safe for darker Indian skin?", a: "Yes, with the right device and settings. We use Nd:YAG for the darkest skin tones and conservative protocols across the board." },
    ],
  }),
  define({
    id: "glow",
    slug: "dull-skin-brightening",
    name: "Dull Skin & Brightening",
    count: "Glutathione · Medifacial",
    icon: "✦",
    headline: "Radiance, the medical way.",
    summary:
      "Dullness has causes, oxidative stress, dehydration, sun damage, sluggish exfoliation. Our brightening protocols layer in-clinic radiance treatments with prescription topicals and lifestyle support.",
    symptoms: [
      "Tired, lacklustre complexion",
      "Uneven, patchy tone",
      "Dehydrated, rough texture",
      "Loss of pre-procedure glow",
    ],
    causes: [
      "Sun damage and oxidative stress",
      "Poor sleep and chronic stress",
      "Dehydration and inconsistent skincare",
      "Sluggish cell turnover with age",
    ],
    approach: [
      "Medifacials and carbon laser facials deliver instant radiance, while glutathione courses and medical-grade topicals build sustained improvement.",
      "We coach you on the daily habits, hydration, sleep, SPF, antioxidants, that protect what we build.",
    ],
    treatmentSlugs: ["medifacial", "glutathione-skin-lightening", "carbon-laser-facial", "chemical-peeling", "face-prp"],
    faqs: [
      { q: "Will my skin become noticeably lighter?", a: "Our brightening protocols restore radiance and even out tone. They do not promise dramatic skin colour change, and we never offer that as a goal." },
      { q: "Which is the best single treatment for glow?", a: "Medifacial for monthly maintenance; carbon laser facial pre-event; medical therapy for sustained change. The best plan combines several." },
    ],
  }),
  define({
    id: "fat",
    slug: "stubborn-fat-pockets",
    name: "Stubborn Fat Pockets",
    count: "Lipolysis injections",
    icon: "◊",
    headline: "Target what diet and exercise can't.",
    summary:
      "Small fat pockets, double chin, jowls, flanks, bra rolls, resist diet and exercise because of fixed receptor patterns. Injectable lipolysis dissolves these targeted pockets gradually over a few sessions.",
    symptoms: [
      "Persistent double-chin or jowl fullness",
      "Localised bra-roll or flank fat",
      "Stubborn pockets after weight loss",
      "Loss of jawline definition from local fat",
    ],
    causes: [
      "Genetic distribution of fat receptors",
      "Hormonal shifts (especially after pregnancy)",
      "Age-related fat redistribution",
      "Localised lifestyle factors",
    ],
    approach: [
      "We confirm a small, localised pocket is the right candidate (not generalised weight loss) before recommending lipolysis.",
      "Sessions are spaced 4 to 6 weeks apart; HIFU is often added to tighten the overlying skin for a sharper contour.",
    ],
    treatmentSlugs: ["lipolysis-injection", "hifu"],
    faqs: [
      { q: "Is this a weight loss solution?", a: "No. Injectable lipolysis is for small, stubborn pockets. For significant weight change we coach a medical and lifestyle plan first." },
      { q: "How much fat can be removed in one session?", a: "Per-session change is gradual and conservative. Visible contour change typically comes after 2 to 4 sessions." },
    ],
  }),
  define({
    id: "lift",
    slug: "facial-sagging",
    name: "Facial Sagging",
    count: "Thread lift · HIFU",
    icon: "✶",
    headline: "Lift the contour without surgery.",
    summary:
      "Early to moderate sagging responds well to non-surgical lift, HIFU to address the deeper SMAS layer, threads to reposition tissue, and fillers to restore the underlying scaffold.",
    symptoms: [
      "Softening of the jawline",
      "Drooping mid-face or jowls",
      "Marionette and nasolabial deepening",
      "Loss of cheek and brow projection",
    ],
    causes: [
      "Collagen, elastin and fat-pad decline",
      "Bone resorption with age",
      "Cumulative sun damage",
      "Genetics",
    ],
    approach: [
      "We assess the cause of the sagging, volume loss vs skin laxity vs bone change, and layer HIFU, threads and fillers accordingly.",
      "Severe sagging may still need surgical correction; we will tell you honestly.",
    ],
    treatmentSlugs: ["hifu", "thread-lifting", "dermal-fillers"],
    faqs: [
      { q: "Can I avoid a facelift?", a: "For early to moderate sagging, often yes. HIFU, threads and fillers combined offer meaningful lift with no surgical recovery. Severe laxity may still need surgery." },
      { q: "Which treatment lifts the jawline best?", a: "A combination usually outperforms any single therapy. HIFU lifts at depth; threads reposition; fillers add structural support." },
    ],
  }),
  define({
    id: "vitiligo",
    slug: "vitiligo",
    name: "Vitiligo",
    count: "Targeted protocols",
    icon: "◉",
    headline: "A long-term partnership, not a quick fix.",
    summary:
      "Vitiligo is an autoimmune condition that needs a layered, patient long-term plan. Topicals, phototherapy and selectively, cellular grafting offer real repigmentation for many patients.",
    symptoms: [
      "White or depigmented patches on skin",
      "Slow, progressive expansion of patches",
      "Loss of pigment in hair over a patch",
      "Sensitivity to sun in affected areas",
    ],
    causes: [
      "Autoimmune destruction of melanocytes",
      "Genetic predisposition",
      "Triggers like stress, sunburn, friction",
      "Associated autoimmune conditions",
    ],
    approach: [
      "We confirm vitiligo type and stability, then build a programme combining topicals, phototherapy and, when appropriate, cellular grafting.",
      "Honest forecasting matters. Faces respond best; hands and feet often less so. We never promise full repigmentation up front.",
    ],
    treatmentSlugs: ["vitiligo-treatment"],
    faqs: [
      { q: "Can vitiligo be cured?", a: "Vitiligo cannot be permanently cured, but it can be controlled and often substantially repigmented in many patients with the right protocol." },
      { q: "Is sun exposure helpful or harmful?", a: "Controlled, targeted phototherapy in clinic is therapeutic. Random sun exposure, especially sunburn, is harmful and can worsen vitiligo." },
    ],
  }),
  define({
    id: "tattoo",
    slug: "tattoo-removal",
    name: "Tattoo Removal",
    count: "Q-Switch laser",
    icon: "◬",
    headline: "Erase the ink, keep the skin.",
    summary:
      "Our Q-switch Nd:YAG laser fragments tattoo pigment into smaller particles the body clears naturally. Effective across most ink colours, with skin-safe settings for Indian skin tones.",
    symptoms: [
      "A regretted or outdated tattoo",
      "Cosmetic ink (microblading, eyeliner)",
      "Faded but visible old tattoo",
      "Partial removal needed before a cover-up",
    ],
    causes: [
      "Permanent ink deposition in the dermis",
      "Cosmetic tattooing reactions",
      "Older amateur tattoos requiring removal",
    ],
    approach: [
      "We start with a patch test, then run sessions spaced 4 to 8 weeks apart. Skin tone and ink colour determine the laser settings.",
      "Aftercare is critical: cool compresses, gentle cleansing and strict SPF protect the area between sessions.",
    ],
    treatmentSlugs: ["tattoo-removal"],
    faqs: [
      { q: "How many sessions will I need?", a: "Most tattoos need 6 to 12 sessions; older amateur tattoos often fewer, dense professional tattoos more. We will give an estimate after the patch test." },
      { q: "Will I be left with a scar?", a: "With Q-switch laser and proper aftercare, scarring is rare. Most patients heal cleanly back to normal skin tone." },
    ],
  }),
  define({
    id: "nails",
    slug: "nail-cyst-issues",
    name: "Nail & Cyst Issues",
    count: "Day-care surgery",
    icon: "○",
    headline: "Same-day surgical care from a trained dermato-surgeon.",
    summary:
      "Ingrown toenails, recurrent paronychia and cysts (sebaceous, lipoma, mole, wart) are best managed surgically in a clean day-care setting, with local anaesthesia and same-day discharge.",
    symptoms: [
      "Painful ingrown toenail with redness",
      "Recurrent infection around a nail",
      "Visible cyst or lipoma under the skin",
      "Suspicious mole or growing lesion",
    ],
    causes: [
      "Improper nail trimming or tight footwear",
      "Trauma to the nail unit",
      "Blocked sebaceous glands forming cysts",
      "Slow-growing fatty deposits (lipomas)",
    ],
    approach: [
      "We assess clinically, confirm with imaging or biopsy when needed, and offer outpatient surgical correction with layered closure for the best scar outcome.",
      "Histopathology is sent for analysis where clinically indicated, especially for suspicious moles.",
    ],
    treatmentSlugs: ["nail-surgery", "cyst-surgery"],
    faqs: [
      { q: "Is it really day-care?", a: "Yes. Both nail and cyst procedures are performed under local anaesthesia with same-day discharge. Most patients return to desk work in 1 to 3 days." },
      { q: "Will my mole be analysed after removal?", a: "Yes, when clinically indicated we send the specimen for histopathology to confirm the diagnosis and rule out concerning features." },
    ],
  }),
  define({
    id: "scars",
    slug: "scar-reduction",
    name: "Scar Reduction",
    count: "MNRF · Subcision",
    icon: "≋",
    headline: "Smoother skin, scar by scar.",
    summary:
      "From acne and surgical scars to stretch marks, our combination protocol of MNRF, subcision, TCA-CROSS and microneedling delivers visible, lasting improvement.",
    symptoms: [
      "Visible acne scars (rolling, boxcar, icepick)",
      "Surgical or trauma scars",
      "Hypertrophic or keloid scarring",
      "Stretch marks",
    ],
    causes: [
      "Inflammation from past acne",
      "Surgical or accidental trauma",
      "Genetic scarring tendency",
      "Rapid skin stretching (weight, growth, pregnancy)",
    ],
    approach: [
      "Each scar is classified by type and depth before we choose technique, MNRF, subcision, TCA-CROSS or microneedling, and combinations usually outperform any single method.",
      "Hypertrophic and keloid scars are managed with intralesional steroid, laser and silicone protocols.",
    ],
    treatmentSlugs: ["mnrf", "acne-scar-reduction", "drs-dermaroller", "chemical-peeling"],
    faqs: [
      { q: "How much improvement is realistic?", a: "Most patients see 50 to 80 percent improvement across a full course. Complete removal is rarely achievable, but most scars become inconspicuous." },
      { q: "When can I start scar treatment?", a: "Acne scars are tackled once breakouts are controlled. Surgical and traumatic scars are treated once the wound has fully healed, usually 6 to 12 months after the injury." },
    ],
  }),
];

// Concise list used by the homepage grid (keeps the existing shape).
export const CONCERNS: ConcernSummary[] = CONCERNS_FULL.map(
  ({ id, slug, name, count, icon }) => ({ id, slug, name, count, icon }),
);

export const CONCERN_SLUGS = CONCERNS_FULL.map((c) => c.slug);

export const getConcern = (slug: string): ConcernDetail | undefined =>
  CONCERNS_FULL.find((c) => c.slug === slug);
