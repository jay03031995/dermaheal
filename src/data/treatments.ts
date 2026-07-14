export type Treatment = {
  id: string;
  name: string;
  cat: string;
  desc: string;
  dur: string;
  img: string;
  tag?: string;
};

export const TREATMENTS: Treatment[] = [
  { id: "t01", name: "Hair Transplant", cat: "Hair", desc: "FUE-based hair restoration with natural hairline design and long-term, lasting density.", dur: "Day procedure", img: "v3", tag: "Signature" },
  { id: "t02", name: "Hair PRP", cat: "Hair", desc: "Platelet-rich plasma therapy that nourishes follicles and reduces shedding over a multi-session protocol.", dur: "45 min", img: "v3" },
  { id: "t03", name: "Hair Loss Treatment", cat: "Hair", desc: "Comprehensive trichology programme combining diagnostics, topicals and in-clinic therapy.", dur: "60 min consult", img: "v3" },
  { id: "t05", name: "Dermal Fillers", cat: "Injectables", desc: "Hyaluronic acid fillers for cheek, lip, chin and under-eye contouring, subtle, refined results.", dur: "40 min", img: "v5" },
  { id: "t06", name: "Thread Lifting", cat: "Injectables", desc: "PDO thread lift for jawline definition and mid-face lift, with collagen stimulation over months.", dur: "60 min", img: "v2" },
  { id: "t07", name: "Lipolysis Injection", cat: "Injectables", desc: "Targeted injections that gradually reduce stubborn small fat pockets, chin, jowls, flanks.", dur: "30 min", img: "v4" },
  { id: "t08", name: "Exosomes Treatment", cat: "Regenerative", desc: "Next-generation regenerative therapy for skin rejuvenation, hair restoration and post-procedure healing.", dur: "45 min", img: "v3", tag: "New" },
  { id: "t09", name: "PDRN Treatment", cat: "Regenerative", desc: "Salmon-DNA polynucleotide therapy that repairs skin at the cellular level and improves elasticity.", dur: "40 min", img: "v5" },
  { id: "t10", name: "Face PRP", cat: "Regenerative", desc: "Autologous platelet-rich plasma for glow, texture refinement and acne-scar improvement.", dur: "45 min", img: "v1" },
  { id: "t11", name: "MNRF Treatment", cat: "Lasers", desc: "Microneedling RF for acne scars, pores and skin tightening, collagen remodelling with minimal downtime.", dur: "60 min", img: "v2", tag: "Signature" },
  { id: "t12", name: "Laser Hair Reduction", cat: "Lasers", desc: "Diode and Nd:YAG laser hair reduction calibrated for Indian skin tones across all body areas.", dur: "20 to 60 min", img: "v4" },
  { id: "t13", name: "IPL Treatment", cat: "Lasers", desc: "Intense pulsed light for pigmentation, redness and overall skin tone evening, minimal downtime.", dur: "30 min", img: "v6" },
  { id: "t14", name: "Carbon Laser", cat: "Lasers", desc: "Carbon peel and Q-switch laser combination for pore refinement, oil control and instant glow.", dur: "45 min", img: "v6" },
  { id: "t15", name: "Tattoo Removal", cat: "Lasers", desc: "Q-Switch Nd:YAG laser fragmentation of tattoo pigment, scheduled over multiple sessions.", dur: "20 min", img: "v4" },
  { id: "t16", name: "HIFU & Wrinkle One", cat: "Lasers", desc: "High-intensity focused ultrasound to lift, firm and contour without downtime.", dur: "60 min", img: "v6" },
  { id: "t17", name: "Chemical Peel", cat: "Peels", desc: "Glycolic, mandelic and salicylic peels for acne, pigmentation and dullness, graded for your skin.", dur: "30 min", img: "v1" },
  { id: "t18", name: "Cosmelan Treatment", cat: "Peels", desc: "Two-phase depigmentation system clinically proven for resistant melasma in Indian skin.", dur: "60 min", img: "v6", tag: "For Melasma" },
  { id: "t19", name: "Dermamelan Treatment", cat: "Peels", desc: "Stronger depigmentation protocol for severe melasma and persistent pigmentary disorders.", dur: "60 min", img: "v6" },
  { id: "t20", name: "Acne Scar Reduction", cat: "Peels", desc: "Combination protocol using MNRF, subcision and TCA-CROSS for visible, lasting scar improvement.", dur: "60 min", img: "v2" },
  { id: "t21", name: "Hyperpigmentation Reduction", cat: "Peels", desc: "Customised regimen for melasma, post-acne marks and sun damage, calibrated for higher melanin.", dur: "45 min", img: "v6" },
  { id: "t22", name: "Glutathione Skin Lightening", cat: "Skin", desc: "Doctor-supervised antioxidant therapy that brightens overall complexion over a structured course.", dur: "30 min", img: "v1" },
  { id: "t23", name: "Medifacial", cat: "Skin", desc: "Medical-grade facials customised to your skin type, hydration, anti-acne, brightening protocols.", dur: "60 min", img: "v1", tag: "Most Booked" },
  { id: "t24", name: "DRS (Dermaroller) Treatment", cat: "Skin", desc: "Microneedling derma-roller therapy that stimulates collagen for scars, stretch marks and texture.", dur: "45 min", img: "v2" },
  { id: "t25", name: "Vitiligo Treatment", cat: "Skin", desc: "Targeted phototherapy and topical protocols with cellular grafting for stable vitiligo.", dur: "Varies", img: "v5" },
  { id: "t26", name: "Nail Surgery", cat: "Surgery", desc: "Day-care surgical management of ingrown toenails and nail disorders by trained dermato-surgeons.", dur: "30 min", img: "v4" },
  { id: "t27", name: "Cyst Surgery", cat: "Surgery", desc: "Minor surgical excision of cysts, lipomas, warts and moles with minimal scarring.", dur: "30 to 45 min", img: "v4" },
];

export const TREATMENT_CATS = ["All", "Hair", "Injectables", "Lasers", "Peels", "Skin", "Regenerative", "Surgery"];

// Each treatment now has its own dedicated detail page.
export const TREATMENT_SLUGS: Record<string, string> = {
  t01: "hair-transplant",
  t02: "hair-prp",
  t03: "hair-loss-treatment",
  t04: "botox",
  t05: "dermal-fillers",
  t06: "thread-lifting",
  t07: "lipolysis-injection",
  t08: "exosomes",
  t09: "pdrn",
  t10: "face-prp",
  t11: "mnrf",
  t12: "laser-hair-reduction",
  t13: "ipl",
  t14: "carbon-laser-facial",
  t15: "tattoo-removal",
  t16: "hifu",
  t17: "chemical-peeling",
  t18: "cosmelan",
  t19: "dermamelan",
  t20: "acne-scar-reduction",
  t21: "hyperpigmentation-reduction",
  t22: "glutathione-skin-lightening",
  t23: "medifacial",
  t24: "drs-dermaroller",
  t25: "vitiligo-treatment",
  t26: "nail-surgery",
  t27: "cyst-surgery",
};

export const slugFor = (t: Treatment) =>
  TREATMENT_SLUGS[t.id] || t.name.toLowerCase().replace(/\W+/g, "-");

export type Category = { key: string; title: string; desc: string };

export const CATEGORIES: Category[] = [
  { key: "Hair", title: "Hair Restoration", desc: "From regenerative protocols to FUE transplant, solutions for shedding, thinning and bald patches." },
  { key: "Injectables", title: "Injectables & Volume", desc: "Botox, fillers, threads and lipolysis, delivered with a natural Indian aesthetic." },
  { key: "Lasers", title: "Lasers & Energy Devices", desc: "Advanced devices calibrated specifically for Indian skin, pigmentation, hair, scars, contouring." },
  { key: "Peels", title: "Peels & Pigmentation", desc: "Cosmelan, Dermamelan and graded chemical peels, the gold standard for melasma and acne marks." },
  { key: "Skin", title: "Skin & Glow", desc: "Medical-grade facials, brightening therapies, and protocols for dullness and vitiligo." },
  { key: "Regenerative", title: "Regenerative Medicine", desc: "Exosomes, PDRN and platelet therapies, next-generation healing at the cellular level." },
  { key: "Surgery", title: "Day-Care Surgery", desc: "Minor surgical procedures for cysts, lipomas, ingrown nails and skin lesions, minimal scarring." },
];

export type TreatmentDetail = {
  slug: string;
  name: string;
  cat: string;
  img: string;
  headline: string;
  overview: string;
  overviewExtra?: string;
  aboutCtaLabel?: string;
  aboutCtaHref?: string;
  quick: { duration: string; sessions: string; downtime: string };
  keyPoints: string[];
  suitableFor: string[];
  protocols?: { title: string; description: string }[];
  process: { t: string; d: string }[];
  benefits: { i: string; t: string; d: string }[];
  faqs: { q: string; a: string }[];
};

export const TREATMENTS_FULL: Record<string, TreatmentDetail> = {
  "hair-transplant": {
    slug: "hair-transplant", name: "Hair Transplant", cat: "Hair Restoration", img: "v3",
    headline: "Restore your hairline with a natural, lasting result.",
    overview: "A surgical hair restoration procedure that relocates healthy follicles from a donor area to thinning or bald regions. At Dermaheal, our FUE-based hair transplant is designed for natural-looking density and a hairline that matches your face.",
    quick: { duration: "6 to 8 hours", sessions: "1 to 2 sittings", downtime: "5 to 7 days" },
    keyPoints: [
      "FUE technique, minimally invasive, no linear scar",
      "Natural hairline designed by an MD dermatologist",
      "Long-term, permanent transplanted follicles",
      "Performed under local anaesthesia",
    ],
    suitableFor: ["Male pattern baldness", "Receding hairline", "Crown thinning", "Eyebrow restoration", "Beard transplant"],
    process: [
      { t: "Consultation & planning", d: "Trichoscopic analysis, donor evaluation and graft-count planning." },
      { t: "Donor extraction", d: "Individual follicular units harvested with micro-punches from the back of the scalp." },
      { t: "Recipient implantation", d: "Each graft is placed at a precise angle and depth for natural growth direction." },
      { t: "Aftercare & follow-up", d: "Day-2 wash protocol, scheduled follow-ups and PRP support for graft survival." },
    ],
    benefits: [
      { i: "✦", t: "Permanent regrowth", d: "Transplanted follicles are genetically resistant to balding." },
      { i: "◐", t: "Natural hairline", d: "Designed to match facial structure and age." },
      { i: "◍", t: "Minimal downtime", d: "Most patients return to work in 5 to 7 days." },
      { i: "✶", t: "No visible scar", d: "FUE leaves only tiny dot-sized healed punctures." },
      { i: "❋", t: "Boosted confidence", d: "Lasting, dense growth that integrates naturally." },
      { i: "⟡", t: "Custom graft plan", d: "Tailored to your hair texture, density and goals." },
    ],
    faqs: [
      { q: "Will the result look natural?", a: "Yes. The hairline is designed individually by your dermatologist, with each graft placed at the correct angle and direction. Done well, an FUE transplant is undetectable." },
      { q: "When will the new hair grow?", a: "Shedding of transplanted hair is normal in the first 2 to 4 weeks. New growth begins around month 3, with visible density by months 6 to 9 and final results by month 12." },
      { q: "Is the procedure painful?", a: "No. The procedure is performed under local anaesthesia. Most patients report mild discomfort only during anaesthesia administration and remain comfortable throughout." },
    ],
  },
  "hair-prp": {
    slug: "hair-prp", name: "Hair PRP", cat: "Hair Restoration", img: "v3",
    headline: "Reawaken dormant follicles with your own platelets.",
    overview: "Platelet-Rich Plasma therapy uses growth factors from your own blood to stimulate hair follicles, reduce shedding, and improve density. A clinically proven, non-surgical option for early to moderate hair loss.",
    quick: { duration: "45 min", sessions: "4 to 6 sessions", downtime: "Zero" },
    keyPoints: [
      "Uses your own blood, zero risk of allergy",
      "Stimulates dormant follicles, slows hair fall",
      "Best paired with topical or oral therapy",
      "Visible improvement in 3 to 4 months",
    ],
    suitableFor: ["Diffuse thinning", "Female pattern hair loss", "Early male pattern baldness", "Post-pregnancy hair fall", "Stress-related shedding"],
    process: [
      { t: "Blood draw", d: "A small sample is drawn and processed in a centrifuge to isolate platelets." },
      { t: "Plasma activation", d: "Concentrated PRP is prepared and kept ready for injection." },
      { t: "Scalp injection", d: "PRP is injected into thinning areas using a fine-gauge mesotherapy needle." },
      { t: "Repeat & maintain", d: "Sessions every 4 weeks for 4 to 6 months, then maintenance every 3 to 6 months." },
    ],
    benefits: [
      { i: "❋", t: "Reduces shedding", d: "Visible decrease in hair fall after 2 to 3 sessions." },
      { i: "✦", t: "Stimulates growth", d: "Awakens follicles in their dormant phase." },
      { i: "◍", t: "Autologous", d: "Made from your own blood, no foreign substance." },
      { i: "✶", t: "Improves thickness", d: "Existing hair becomes denser and stronger." },
      { i: "◐", t: "Zero downtime", d: "Return to routine immediately after the session." },
      { i: "⟡", t: "Combines well", d: "Pairs beautifully with topicals and oral therapy." },
    ],
    faqs: [
      { q: "How many sessions do I need?", a: "Most patients need 4 to 6 monthly sessions to see significant improvement, followed by maintenance every 3 to 6 months." },
      { q: "Is PRP painful?", a: "There is mild discomfort during scalp injections. We use a numbing protocol and a vibratory device to minimise it." },
      { q: "Can PRP regrow completely bald areas?", a: "PRP works best on thinning areas with active follicles. Fully bald scalp without follicles is not responsive to PRP, hair transplant is the option there." },
    ],
  },
  "hair-loss-treatment": {
    slug: "hair-loss-treatment", name: "Hair Loss Treatment", cat: "Hair Restoration", img: "v3",
    headline: "A complete trichology programme, not just a prescription.",
    overview: "A structured hair-loss programme that begins with a trichoscopic assessment and blood workup, then layers topical, oral and in-clinic therapy into a plan calibrated to the cause of your hair loss.",
    quick: { duration: "60 min consultation", sessions: "Personalised protocol", downtime: "Zero" },
    keyPoints: [
      "Trichoscopic scalp analysis to identify the pattern",
      "Targeted blood work for hormones, ferritin, vitamin D and thyroid",
      "Layered protocol of topicals, oral therapy and in-clinic care",
      "Monthly photo-review to track measurable change",
    ],
    suitableFor: ["Diffuse thinning", "Telogen effluvium (sudden shedding)", "Female pattern hair loss", "Hormonal hair loss (PCOS, post-partum)", "Stress-related hair fall", "Early male pattern baldness"],
    process: [
      { t: "Diagnose the cause", d: "Trichoscopy, scalp examination and a focused medical history." },
      { t: "Investigate", d: "Blood work for hormones, nutrient deficiencies and underlying conditions." },
      { t: "Personalised plan", d: "A written protocol combining topicals, oral medication and clinic therapy." },
      { t: "Track & refine", d: "Monthly check-ins with measured trichoscopy and photo-review." },
    ],
    benefits: [
      { i: "✦", t: "Root-cause approach", d: "We treat the cause, not just the visible thinning." },
      { i: "◐", t: "Customised regimen", d: "Plans differ for hormonal, nutritional or genetic hair loss." },
      { i: "❋", t: "Measured progress", d: "Trichoscopy lets us see new growth before it's visible." },
      { i: "✶", t: "Layered therapy", d: "Topicals + oral + PRP often outperform single interventions." },
      { i: "⟡", t: "Doctor supervised", d: "Reviewed by an MD dermatologist every visit." },
      { i: "◍", t: "Honest expectations", d: "We tell you what's possible and what isn't, on day one." },
    ],
    faqs: [
      { q: "How long before I see results?", a: "Hair grows in slow cycles. Most patients see a measurable reduction in shedding by month 2 and visible regrowth by months 4 to 6." },
      { q: "Will I need medication long-term?", a: "Genetic hair loss is a chronic condition, so maintenance therapy is usually long-term. Reversible causes (nutrient, hormonal) often resolve after correction." },
      { q: "Can I combine this with PRP or a transplant?", a: "Yes. Many programmes layer PRP, GFC or exosome therapy on top of medical management, and a transplant is considered once the hair loss is stabilised." },
    ],
  },
  "botox": {
    slug: "botox", name: "Anti-Wrinkle Therapy (Botox)", cat: "Injectables", img: "v4",
    headline: "Soften lines, preserve expression.",
    overview: "Botulinum toxin is a precision injectable that relaxes specific facial muscles to soften wrinkles caused by repeated expression. Done well, Botox refreshes the face without altering identity.",
    quick: { duration: "20 min", sessions: "Single visit", downtime: "Zero" },
    keyPoints: [
      "Forehead, frown lines and crow's feet",
      "Natural, soft results, never frozen",
      "Performed by MD dermatologist",
      "Genuine, authentic products only",
    ],
    suitableFor: ["Forehead lines", "Frown lines (11s)", "Crow's feet", "Bunny lines", "Jaw slimming", "Excessive sweating (axillary)"],
    process: [
      { t: "Facial assessment", d: "Muscle dynamics are evaluated in motion to plan dose and points." },
      { t: "Site marking", d: "Injection sites are mapped with precision for symmetric results." },
      { t: "Micro-injections", d: "Ultra-fine needles deliver tiny doses to targeted muscles." },
      { t: "Result & review", d: "Onset in 5 to 7 days, full effect in 14 days; review at 2 weeks." },
    ],
    benefits: [
      { i: "✦", t: "Smoother skin", d: "Visible softening of dynamic lines in 1 to 2 weeks." },
      { i: "◐", t: "Preserves expression", d: "Soft, natural movement, not frozen." },
      { i: "✶", t: "Quick & lunchtime", d: "20-minute procedure with zero downtime." },
      { i: "❋", t: "Preventive ageing", d: "Slows formation of new wrinkles over time." },
      { i: "◍", t: "Customisable", d: "Dose tailored to your muscle strength and goals." },
      { i: "⟡", t: "Lasts 4 to 6 months", d: "Predictable, refreshable results." },
    ],
    faqs: [
      { q: "Will I look frozen or unnatural?", a: "No, when done correctly. Our injectors are dermatologists who dose conservatively for soft, natural movement. We always prefer a touch-up at 2 weeks over over-correction." },
      { q: "How long does it last?", a: "Effects last 4 to 6 months on average. With regular treatment, the muscle memory weakens and you may need fewer units over time." },
      { q: "Are there side effects?", a: "Minor pinpoint bruising is possible. Rare side effects such as transient eyelid heaviness are minimised by skilled injection technique." },
    ],
  },
  "dermal-fillers": {
    slug: "dermal-fillers", name: "Dermal Fillers", cat: "Injectables", img: "v5",
    headline: "Restore volume. Refine contours. Naturally.",
    overview: "Hyaluronic acid fillers add subtle volume and definition to areas that have lost youthful contour, cheeks, lips, chin, jawline and under-eyes. Reversible, modular, and tailored to your facial proportions.",
    quick: { duration: "40 min", sessions: "Single visit", downtime: "1 to 2 days" },
    keyPoints: [
      "Premium HA fillers",
      "Reversible and adjustable",
      "Subtle, ratio-driven enhancement",
      "Topical numbing for comfort",
    ],
    suitableFor: ["Cheek volume loss", "Lip definition", "Chin & jaw contour", "Under-eye hollows (tear trough)", "Nasolabial folds", "Marionette lines"],
    process: [
      { t: "Facial mapping", d: "Proportions and asymmetries are studied for a balanced plan." },
      { t: "Topical anaesthesia", d: "A numbing cream is applied for a comfortable experience." },
      { t: "Precise injection", d: "Filler is placed at the correct depth using cannulas or needles." },
      { t: "Massage & review", d: "Light massage shapes the filler, followed by a 2-week review." },
    ],
    benefits: [
      { i: "◐", t: "Instant volume", d: "See improvement the moment you walk out." },
      { i: "✶", t: "Lifts & contours", d: "Mid-face and jawline definition without surgery." },
      { i: "✦", t: "Reversible", d: "HA fillers can be dissolved if needed." },
      { i: "❋", t: "Hydrates skin", d: "Hyaluronic acid attracts moisture to the area." },
      { i: "⟡", t: "Lasts 9 to 18 months", d: "Depends on area and filler type used." },
      { i: "◍", t: "Customisable", d: "Built around your face, never one-size-fits-all." },
    ],
    faqs: [
      { q: "Will fillers make me look done?", a: "Not when conservatively dosed. Our approach is small volumes, multiple sessions if needed, to keep results subtle and proportional to your face." },
      { q: "How long do fillers last?", a: "Depending on the area and product, HA fillers last 9 to 18 months. Cheek and chin fillers tend to last longer than lip filler due to less muscle movement." },
      { q: "Are they safe?", a: "We use only premium hyaluronic acid fillers. HA is naturally found in the body and is fully reversible with hyaluronidase if needed." },
    ],
  },
  "thread-lifting": {
    slug: "thread-lifting", name: "Thread Lifting", cat: "Injectables", img: "v2",
    headline: "Lift the jawline. Refine the contour. Without surgery.",
    overview: "PDO thread lifts use absorbable suture material to reposition sagging tissue and stimulate collagen production from within. The result is a refreshed, lifted look that improves over several months.",
    quick: { duration: "60 min", sessions: "Single visit", downtime: "3 to 5 days" },
    keyPoints: [
      "PDO threads are fully absorbable and safe",
      "Immediate lift, plus collagen stimulation over months",
      "Best for early to moderate facial sagging",
      "No general anaesthesia, walk-in walk-out",
    ],
    suitableFor: ["Jawline definition", "Mid-face sagging", "Cheek lift", "Neck laxity", "Brow lift", "Marionette and nasolabial improvement"],
    process: [
      { t: "Facial mapping", d: "Vectors of lift are planned in front of a mirror with you." },
      { t: "Local anaesthesia", d: "Topical numbing plus tiny lidocaine wheals at entry points." },
      { t: "Thread insertion", d: "Threads are placed at the correct depth using fine cannulas." },
      { t: "Sculpt & recover", d: "Tissue is gently lifted, taped, and reviewed at the 2-week mark." },
    ],
    benefits: [
      { i: "✶", t: "Visible lift", d: "Tissue is repositioned during the procedure itself." },
      { i: "❋", t: "Collagen build", d: "Threads stimulate new collagen for 4 to 6 months." },
      { i: "◐", t: "Non-surgical", d: "No general anaesthesia, no incisions, no facelift recovery." },
      { i: "✦", t: "Absorbable", d: "PDO breaks down naturally; no foreign material long-term." },
      { i: "⟡", t: "Targeted", d: "Lift specific areas without affecting expression." },
      { i: "◍", t: "Pairs with fillers", d: "Often combined with HA fillers for layered rejuvenation." },
    ],
    faqs: [
      { q: "How long do thread lifts last?", a: "The lift itself lasts 12 to 18 months. The collagen built underneath continues to improve skin quality for longer." },
      { q: "Is there visible bruising?", a: "Most patients have minor bruising or tenderness at entry points for 3 to 5 days. We schedule around social calendars whenever possible." },
      { q: "Am I a candidate for threads or a facelift?", a: "Threads work best for early to moderate sagging. Significant skin laxity may need a surgical facelift, we will tell you honestly during your consultation." },
    ],
  },
  "lipolysis-injection": {
    slug: "lipolysis-injection", name: "Lipolysis Injection", cat: "Injectables", img: "v4",
    headline: "Dissolve stubborn fat pockets, one targeted dose at a time.",
    overview: "Injectable lipolysis uses a deoxycholic-acid-based compound to break down small, diet-resistant fat deposits. Ideal for the double chin, jowls, bra rolls and similar local pockets.",
    quick: { duration: "30 min", sessions: "2 to 4 sessions", downtime: "2 to 5 days swelling" },
    keyPoints: [
      "Targets stubborn fat that doesn't respond to diet or exercise",
      "Non-surgical alternative to liposuction for small areas",
      "Best for the double chin, jowls, flanks and bra rolls",
      "Results build gradually over weeks",
    ],
    suitableFor: ["Submental (double-chin) fat", "Jowl fat", "Bra-roll fat", "Flank fat", "Inner-thigh contouring", "Stubborn pockets after weight loss"],
    process: [
      { t: "Mark & assess", d: "The fat pocket is gently marked in a grid pattern." },
      { t: "Topical numbing", d: "A short numbing window reduces injection sensation." },
      { t: "Micro-injections", d: "Multiple small injections deliver the solution evenly through the pocket." },
      { t: "Review at 4 weeks", d: "Swelling settles, change is reviewed, and the next session is planned." },
    ],
    benefits: [
      { i: "✶", t: "Targeted reduction", d: "Treats only the pocket you choose, nothing else." },
      { i: "◐", t: "No surgery", d: "No incisions, no general anaesthesia, no compression garments." },
      { i: "✦", t: "Permanent fat loss", d: "Destroyed fat cells don't return; remaining cells can still enlarge." },
      { i: "❋", t: "Gradual & natural", d: "Change builds across sessions, never overnight." },
      { i: "⟡", t: "Pairs with HIFU", d: "Combining tightening protocols enhances contour." },
      { i: "◍", t: "Outpatient", d: "Quick session, return to most activities the same day." },
    ],
    faqs: [
      { q: "How many sessions will I need?", a: "Most pockets need 2 to 4 sessions spaced 4 to 6 weeks apart. Larger pockets may need more sessions." },
      { q: "Is the swelling severe?", a: "Mild to moderate swelling lasts 3 to 7 days, particularly under the chin. We schedule around your social plans." },
      { q: "Is it suitable for big weight loss?", a: "No. Lipolysis is for small, stubborn pockets. For significant weight loss we recommend a structured medical and lifestyle programme first." },
    ],
  },
  "exosomes": {
    slug: "exosomes", name: "Exosomes Treatment", cat: "Regenerative Medicine", img: "v3",
    headline: "Cellular signalling, harnessed for skin and hair.",
    overview: "Exosomes are nano-sized vesicles that carry growth factors and signalling molecules between cells. As a regenerative therapy, they accelerate healing, brighten skin, and support hair restoration.",
    quick: { duration: "45 min", sessions: "3 to 4 sessions", downtime: "Zero to 24 hours" },
    keyPoints: [
      "Cell-derived growth factor and signal delivery",
      "Used for skin rejuvenation and hair restoration",
      "Pairs beautifully with MNRF, lasers and PRP",
      "Quick, walk-in walk-out procedure",
    ],
    suitableFor: ["Dull, ageing skin", "Acne scars and post-procedure recovery", "Diffuse hair thinning", "Post-MNRF or post-laser support", "Sensitive skin not suited to aggressive therapy", "After hair transplant for graft support"],
    process: [
      { t: "Skin or scalp prep", d: "The area is cleansed and lightly numbed where needed." },
      { t: "Channels created", d: "MNRF, mesotherapy or microneedling opens delivery channels." },
      { t: "Exosome infusion", d: "Exosome solution is layered into the skin or scalp." },
      { t: "Calm & schedule", d: "Soothing mask, SPF protocol, and next visit booked." },
    ],
    benefits: [
      { i: "✦", t: "Cutting-edge", d: "Latest generation of regenerative aesthetic therapy." },
      { i: "❋", t: "Multi-purpose", d: "Skin glow, scar improvement and hair density in one platform." },
      { i: "◐", t: "Boosts other treatments", d: "Adds visible uplift when layered onto MNRF or laser." },
      { i: "✶", t: "Minimal downtime", d: "Most patients return to routine immediately." },
      { i: "⟡", t: "Speeds recovery", d: "Excellent post-procedure to settle redness and inflammation." },
      { i: "◍", t: "Doctor-supervised", d: "Performed only by an MD dermatologist." },
    ],
    faqs: [
      { q: "Are exosomes safe?", a: "When sourced from accredited labs and used by trained dermatologists, exosomes have a strong safety profile. We use products with documented sourcing only." },
      { q: "How is this different from PRP?", a: "PRP uses your own platelets. Exosomes are isolated signalling molecules from cell culture, often more concentrated and consistent than PRP." },
      { q: "When will I see results?", a: "Glow and texture improve within 2 to 3 weeks; hair density and scar improvement build over 3 to 6 months." },
    ],
  },
  "pdrn": {
    slug: "pdrn", name: "PDRN Treatment", cat: "Regenerative Medicine", img: "v5",
    headline: "Salmon-DNA polynucleotides. Real cellular repair.",
    overview: "PDRN (polydeoxyribonucleotide) is a regenerative therapy derived from salmon DNA. Delivered into the dermis, it stimulates cellular repair, improves elasticity, and softens fine lines and under-eye crepiness.",
    quick: { duration: "40 min", sessions: "3 to 4 sessions", downtime: "Minimal" },
    keyPoints: [
      "Stimulates fibroblasts and collagen synthesis",
      "Improves skin elasticity and hydration",
      "Excellent for the under-eye area and neck",
      "Pairs well with mesotherapy and PRP",
    ],
    suitableFor: ["Skin elasticity loss", "Under-eye crepiness", "Fine lines", "Neck and decolletage rejuvenation", "Post-procedure skin recovery", "Sensitive skin patients"],
    process: [
      { t: "Skin assessment", d: "Areas of laxity and texture concern are mapped." },
      { t: "Numbing", d: "Topical anaesthetic is applied to keep injections comfortable." },
      { t: "Micro-injection", d: "PDRN is delivered into the dermis with fine needles." },
      { t: "Recovery & series", d: "Mild redness for hours; sessions repeat every 3 to 4 weeks." },
    ],
    benefits: [
      { i: "✦", t: "Cellular repair", d: "Targets the building blocks of skin from within." },
      { i: "◐", t: "Subtle, real change", d: "Skin looks fresher, not different." },
      { i: "✶", t: "Great for delicate areas", d: "Especially effective around the eyes and on the neck." },
      { i: "❋", t: "Improves elasticity", d: "Patients notice firmer, springier skin within weeks." },
      { i: "⟡", t: "Pairs well", d: "Boosts the effect of MNRF, lasers and PRP." },
      { i: "◍", t: "Indian skin safe", d: "Low risk of pigmentation or downtime." },
    ],
    faqs: [
      { q: "Is salmon DNA safe?", a: "Yes. PDRN is highly purified, has been used clinically for decades, and is widely considered safe with a very low allergy profile." },
      { q: "What does it feel like?", a: "Like a series of small pricks. Topical numbing makes it well-tolerated for the under-eye and most facial areas." },
      { q: "When will I see results?", a: "Hydration and glow improve within 1 to 2 weeks; firmness and elasticity build over a 3 to 6 month course." },
    ],
  },
  "face-prp": {
    slug: "face-prp", name: "Face PRP", cat: "Regenerative Medicine", img: "v1",
    headline: "Your own platelets, smarter skin in four weeks.",
    overview: "Autologous platelet-rich plasma uses growth factors from your own blood to stimulate collagen, brighten tone and soften acne scarring. A versatile regenerative treatment with no foreign substance.",
    quick: { duration: "45 min", sessions: "3 to 4 sessions", downtime: "24 hours pinkness" },
    keyPoints: [
      "Made from your own blood, no allergy risk",
      "Stimulates collagen and skin renewal",
      "Improves tone, texture and acne marks",
      "Pairs beautifully with MNRF",
    ],
    suitableFor: ["Dull, tired skin", "Mild acne scars", "Open pores", "Fine lines", "Post-acne marks", "Sensitive skin types"],
    process: [
      { t: "Blood draw", d: "A small sample is taken and processed in a centrifuge." },
      { t: "PRP isolation", d: "Platelets are concentrated and prepared for injection." },
      { t: "MNRF + PRP delivery", d: "PRP is layered into the skin via micro-channels or injection." },
      { t: "Recovery & repeat", d: "Pinkness settles in a day; sessions repeat every 4 to 6 weeks." },
    ],
    benefits: [
      { i: "✦", t: "Autologous", d: "Made entirely from your own blood." },
      { i: "❋", t: "Texture refines", d: "Visible smoothing across the cheeks and forehead." },
      { i: "◐", t: "Tone brightens", d: "Overall complexion looks healthier in 2 to 3 weeks." },
      { i: "✶", t: "Improves scars", d: "Especially when combined with MNRF." },
      { i: "⟡", t: "Safe for Indian skin", d: "Very low risk of post-inflammatory pigmentation." },
      { i: "◍", t: "Outpatient", d: "Walk-in walk-out, return to routine the next day." },
    ],
    faqs: [
      { q: "How is this different from PRP for hair?", a: "Same biology, different target. Face PRP is delivered into the dermis with MNRF or fine injections; hair PRP goes into the scalp." },
      { q: "Will the results last?", a: "Visible change builds over a 3 to 6 month course. Maintenance sessions every 6 to 9 months keep the result fresh." },
      { q: "Is it painful?", a: "There is mild discomfort during MNRF delivery; topical numbing is applied 30 to 45 minutes in advance." },
    ],
  },
  "mnrf": {
    slug: "mnrf", name: "MNRF Treatment", cat: "Lasers", img: "v2",
    headline: "Microneedling RF: real scar reduction, real skin tightening.",
    overview: "Microneedling Radiofrequency combines fine needles with bipolar RF energy to remodel collagen deep within the dermis. The gold-standard treatment for acne scars, large pores, and skin laxity.",
    quick: { duration: "60 min", sessions: "3 to 6 sessions", downtime: "3 to 5 days" },
    keyPoints: [
      "Triggers collagen remodelling at depth",
      "Visible scar and pore improvement",
      "Safe across Indian skin tones",
      "Improves with each session",
    ],
    suitableFor: ["Acne scars (rolling, boxcar)", "Open pores", "Skin laxity", "Stretch marks", "Fine lines", "Surgical scars"],
    process: [
      { t: "Numbing protocol", d: "Topical anaesthesia applied for 30 to 45 minutes." },
      { t: "Device pass", d: "MNRF tip delivers needles and RF in a controlled pattern." },
      { t: "Cooling & serum", d: "Skin is cooled and treated with calming, growth-factor serums." },
      { t: "Recovery & series", d: "Mild redness for 1 to 2 days; repeat every 4 to 6 weeks." },
    ],
    benefits: [
      { i: "✶", t: "Smooths scars", d: "Rolling and boxcar scars improve session-on-session." },
      { i: "✦", t: "Tightens skin", d: "RF stimulates collagen for visibly firmer skin." },
      { i: "◐", t: "Refines pores", d: "Open pores look smaller over the course." },
      { i: "❋", t: "Safer than ablative", d: "Lower PIH risk for Indian skin tones." },
      { i: "⟡", t: "Cumulative effect", d: "Each session compounds the result." },
      { i: "◍", t: "Minimal downtime", d: "Pinkness fades within 24 to 72 hours." },
    ],
    faqs: [
      { q: "How many sessions will I need?", a: "Most patients see meaningful change after 3 to 6 sessions spaced 4 to 6 weeks apart. Deeper scars may need 6 or more sessions, often combined with subcision." },
      { q: "Is it painful?", a: "We apply numbing cream for 30 to 45 minutes before the procedure. The sensation is mild prickling, most patients describe it as a 6 out of 10 at worst." },
      { q: "When will I see results?", a: "Initial smoothness in 2 to 3 weeks; final collagen remodelling continues for 3 to 6 months after your last session." },
    ],
  },
  "laser-hair-reduction": {
    slug: "laser-hair-reduction", name: "Laser Hair Reduction", cat: "Lasers", img: "v4",
    headline: "Silky, fuss-free skin, calibrated for Indian tones.",
    overview: "Diode and Nd:YAG laser hair reduction safely targets the pigment in hair follicles, gradually reducing growth over multiple sessions. Calibrated specifically for Indian skin tones.",
    quick: { duration: "20 to 60 min", sessions: "6 to 8 sessions", downtime: "Zero" },
    keyPoints: [
      "Safe for Indian skin (Type IV to V)",
      "All body areas, face, underarms, legs, full body",
      "Performed under dermatologist supervision",
      "Long-term reduction, not temporary removal",
    ],
    suitableFor: ["Facial hair (upper lip, chin)", "Underarms", "Bikini line", "Legs & arms", "Back & chest (male)", "Full body packages"],
    process: [
      { t: "Patch test", d: "A small area is tested 48 hours before to confirm safe settings." },
      { t: "Cleanse & cool", d: "Area is shaved, cleaned, and cooling gel applied." },
      { t: "Laser pass", d: "Calibrated laser delivers pulses to follicle clusters." },
      { t: "Repeat in 4 to 6 wks", d: "Hairs grow in cycles; each session targets new follicles." },
    ],
    benefits: [
      { i: "✦", t: "Long-term reduction", d: "Up to 80 to 90 percent reduction after the recommended sessions." },
      { i: "◍", t: "No ingrowns", d: "Eliminates the problem that razors and waxing cause." },
      { i: "✶", t: "Skin-safe", d: "Cooling integration protects the surface skin." },
      { i: "⟡", t: "Time-saver", d: "No more weekly waxing or daily shaving." },
      { i: "◐", t: "Smoother skin", d: "Bonus: skin texture often improves in treated areas." },
      { i: "❋", t: "All skin tones", d: "Our protocols are specifically calibrated for Indian skin." },
    ],
    faqs: [
      { q: "Is it permanent?", a: "Laser provides long-term reduction, not 100 percent permanent removal. Most patients enjoy 80 to 90 percent reduction with occasional touch-ups (1 to 2 a year) thereafter." },
      { q: "How many sessions do I need?", a: "Typically 6 to 8 sessions, spaced 4 to 6 weeks apart for body and 4 weeks for face. Hair grows in cycles, so multiple sessions are essential." },
      { q: "Does it hurt?", a: "Modern lasers come with integrated cooling. Most patients describe the sensation as a quick warm snap, entirely tolerable." },
    ],
  },
  "ipl": {
    slug: "ipl", name: "IPL Treatment", cat: "Lasers", img: "v6",
    headline: "One device, multiple pigmentary concerns.",
    overview: "Intense Pulsed Light delivers a broad spectrum of light to address pigmentation, sun damage, redness and uneven tone in a single visit. A versatile, low-downtime brightening treatment.",
    quick: { duration: "30 min", sessions: "3 to 5 sessions", downtime: "Minimal" },
    keyPoints: [
      "Targets pigmentation, redness and uneven tone",
      "Broadband light, multiple wavelengths in one pass",
      "Minimal downtime, walk-in walk-out",
      "Calibrated specifically for Indian skin",
    ],
    suitableFor: ["Sun damage", "Freckles and lentigines", "Mild rosacea or facial redness", "Uneven skin tone", "Photofacial maintenance", "Decolletage rejuvenation"],
    process: [
      { t: "Skin assessment", d: "Pigmentation pattern and skin type guide IPL settings." },
      { t: "Cooling prep", d: "A cooling gel is applied across the treatment area." },
      { t: "IPL pulses", d: "Light pulses pass over the area in an even pattern." },
      { t: "Aftercare", d: "Strict SPF and a calming barrier-repair routine for a week." },
    ],
    benefits: [
      { i: "✦", t: "Even tone", d: "Visible reduction in spots and discolouration." },
      { i: "◐", t: "Calms redness", d: "Effective for vascular concerns and facial flushing." },
      { i: "✶", t: "Minimal downtime", d: "Most patients return to work the same day." },
      { i: "❋", t: "Anti-ageing bonus", d: "Stimulates mild collagen, improves overall radiance." },
      { i: "⟡", t: "Versatile", d: "One platform, multiple concerns in a single visit." },
      { i: "◍", t: "Maintenance friendly", d: "Easy to repeat once or twice a year." },
    ],
    faqs: [
      { q: "Is IPL the same as laser?", a: "Both use light, but IPL delivers a broader spectrum, making it better for multiple concerns at once. True lasers are single-wavelength and more targeted." },
      { q: "Is it safe for darker Indian skin?", a: "We use Indian-skin protocols and conservative settings. For very deep skin tones, we may recommend Q-switch or a peel instead." },
      { q: "Will the pigmentation come back?", a: "Sun exposure and hormones can trigger return. Strict SPF and one to two maintenance sessions a year usually keep results stable." },
    ],
  },
  "carbon-laser-facial": {
    slug: "carbon-laser-facial", name: "Carbon Laser Facial", cat: "Lasers", img: "v6",
    headline: "The instant-glow facial dermatologists actually recommend.",
    overview: "A two-step laser facial: a fine carbon mask is applied, then a Q-switch laser is passed over the area. The carbon binds to oil and dead cells, and the laser vaporises both for an immediate, exfoliated glow.",
    quick: { duration: "45 min", sessions: "Monthly or pre-event", downtime: "Zero" },
    keyPoints: [
      "Two-step carbon mask plus Q-switch laser",
      "Refines pores and controls excess oil",
      "Instant, visible glow with zero downtime",
      "Excellent pre-event or bridal protocol",
    ],
    suitableFor: ["Oily, congested skin", "Open pores", "Dull, tired complexion", "Pre-wedding or pre-event glow", "Combination skin", "Mild acne and post-acne marks"],
    process: [
      { t: "Cleanse & prime", d: "Skin is double-cleansed and degreased." },
      { t: "Carbon mask", d: "A thin carbon layer is applied and allowed to settle." },
      { t: "Q-switch pass", d: "Laser vaporises the carbon with bound oil and debris." },
      { t: "Hydrate & SPF", d: "A calming mask and broad-spectrum SPF finish the visit." },
    ],
    benefits: [
      { i: "✦", t: "Instant glow", d: "Skin looks brighter immediately after the session." },
      { i: "◐", t: "Refines pores", d: "Pore size and sebum production reduce over a course." },
      { i: "✶", t: "Oil control", d: "Particularly useful for oily, congested skin types." },
      { i: "❋", t: "Zero downtime", d: "Walk out looking your best, perfect before events." },
      { i: "⟡", t: "Gentle on skin", d: "Non-ablative and safe with regular spacing." },
      { i: "◍", t: "Indian-skin calibrated", d: "Conservative fluence settings for melanin-rich tones." },
    ],
    faqs: [
      { q: "How often can I do this?", a: "Monthly is ideal for ongoing skin care; a more concentrated 4 to 6 week protocol works well before weddings or events." },
      { q: "Will it help acne scars?", a: "It improves overall glow and texture, but for deep acne scars we recommend MNRF or chemical peels as the primary protocol." },
      { q: "Is it the same as a regular facial?", a: "No. A regular facial is mostly manual; carbon laser facial uses laser energy and is performed in a dermatologist's clinic." },
    ],
  },
  "tattoo-removal": {
    slug: "tattoo-removal", name: "Tattoo Removal", cat: "Lasers", img: "v4",
    headline: "Erase the ink. Save the skin.",
    overview: "Our Q-switch Nd:YAG laser fragments tattoo pigment into smaller particles that the body clears naturally over weeks. Effective across most ink colours, with skin-safe settings for Indian tones.",
    quick: { duration: "20 min per session", sessions: "6 to 12 sessions", downtime: "3 to 5 days" },
    keyPoints: [
      "Q-switch Nd:YAG for safe, effective pigment fragmentation",
      "Calibrated for Indian skin tones",
      "Works across most ink colours",
      "Gradual fading, session by session",
    ],
    suitableFor: ["Amateur tattoos", "Professional tattoos", "Microblading and eyeliner ink", "Cosmetic lip tattoos", "Faded older tattoos", "Touch-up after partial removal"],
    process: [
      { t: "Consult & patch test", d: "Ink, skin type and depth are assessed, with a small patch test." },
      { t: "Laser pulses", d: "Q-switch laser fragments the pigment at the correct wavelength." },
      { t: "Healing window", d: "Mild scabbing for 3 to 5 days; skin clears the ink over weeks." },
      { t: "Spaced sessions", d: "Visits are scheduled 4 to 8 weeks apart for safe fading." },
    ],
    benefits: [
      { i: "✦", t: "Skin-safe", d: "Conservative settings protect Indian skin from PIH." },
      { i: "◐", t: "Most colours", d: "Black, dark blue and most pigments respond reliably." },
      { i: "✶", t: "Gradual fade", d: "Each session fades the tattoo a little further." },
      { i: "❋", t: "No scar in most cases", d: "Done correctly, the area heals cleanly." },
      { i: "⟡", t: "Doctor-supervised", d: "Performed only by a trained dermatologist." },
      { i: "◍", t: "Reversible mistake", d: "Tattoos you regret no longer have to stay." },
    ],
    faqs: [
      { q: "How many sessions will I need?", a: "Most tattoos need 6 to 12 sessions, depending on age, ink density, colour and depth. Older amateur tattoos often need fewer; new professional tattoos need more." },
      { q: "Can all colours be removed?", a: "Black, dark blue, dark green and most red inks respond well. Yellow, light green and white can be more resistant and may need more sessions." },
      { q: "Will I be left with a scar?", a: "With Q-switch laser and proper aftercare, scarring is rare. Most patients heal cleanly back to normal skin tone." },
    ],
  },
  "hifu": {
    slug: "hifu", name: "HIFU & Wrinkle One", cat: "Lasers", img: "v6",
    headline: "Non-surgical lift. Without a single needle.",
    overview: "High-Intensity Focused Ultrasound (HIFU) delivers precisely targeted heat into deep skin layers, including the SMAS, to lift and tighten without breaking the skin. Wrinkle One adds focused energy for finer lines.",
    quick: { duration: "60 min", sessions: "1 to 2 sessions", downtime: "Zero" },
    keyPoints: [
      "Targets the deeper SMAS layer surgeons address in facelifts",
      "No needles, no incisions, no anaesthesia",
      "Visible lift in 8 to 12 weeks, continuing for 6 months",
      "Pairs well with Botox, fillers and threads",
    ],
    suitableFor: ["Mild to moderate facial sagging", "Jawline definition", "Brow lift", "Neck and decolletage tightening", "Early ageing prevention", "Non-surgical alternative to facelift"],
    process: [
      { t: "Skin mapping", d: "Areas of laxity are mapped, with depth chosen per region." },
      { t: "Topical comfort", d: "Numbing cream is applied; HIFU is generally well-tolerated." },
      { t: "Energy delivery", d: "Focused ultrasound is delivered at the correct depth." },
      { t: "Long-term review", d: "Initial firmness appears in weeks; full effect at 3 to 6 months." },
    ],
    benefits: [
      { i: "✦", t: "Lifts at depth", d: "Reaches the SMAS layer non-invasively." },
      { i: "◐", t: "No downtime", d: "Walk out and continue your day normally." },
      { i: "✶", t: "Long-lasting", d: "Results typically last 12 to 18 months." },
      { i: "❋", t: "Collagen stimulating", d: "Builds new collagen over weeks, not just instant firming." },
      { i: "⟡", t: "Layered care", d: "Combines well with injectables for full rejuvenation." },
      { i: "◍", t: "Single session", d: "Many patients see clear lift after just one well-planned visit." },
    ],
    faqs: [
      { q: "Will I see immediate results?", a: "There is a mild immediate firming, but the meaningful lift develops over 8 to 12 weeks as new collagen forms." },
      { q: "How long does it last?", a: "Most patients enjoy results for 12 to 18 months. An annual touch-up keeps the effect consistent." },
      { q: "Is it painful?", a: "Sensation varies, particularly along the jawline. Topical numbing and modern devices make it comfortable for most patients." },
    ],
  },
  "chemical-peeling": {
    slug: "chemical-peeling", name: "Chemical Peeling", cat: "Peels & Pigmentation", img: "v1",
    headline: "Refined skin, session by session.",
    overview: "A controlled application of acids (glycolic, mandelic, salicylic, TCA) that gently exfoliates damaged outer layers, revealing fresher, more even-toned skin underneath. Customised to your skin concern.",
    quick: { duration: "30 min", sessions: "4 to 6 sessions", downtime: "0 to 3 days" },
    keyPoints: [
      "Customised acid and strength for your skin",
      "Safe for Indian skin tones",
      "Quick lunchtime procedure",
      "Visible glow after the very first session",
    ],
    suitableFor: ["Active acne", "Acne scars", "Pigmentation", "Dull skin", "Open pores", "Uneven tone"],
    process: [
      { t: "Skin prep", d: "Cleansing and degreasing prepare the skin for uniform absorption." },
      { t: "Peel application", d: "Selected acid applied evenly with precise timing." },
      { t: "Neutralisation", d: "Peel is neutralised once endpoint is reached; cool soothing follows." },
      { t: "Aftercare regimen", d: "SPF and a gentle barrier-repair routine for 7 to 10 days." },
    ],
    benefits: [
      { i: "✦", t: "Brightens skin", d: "Visible glow from session one." },
      { i: "❋", t: "Clears acne", d: "Salicylic peels target active breakouts." },
      { i: "✶", t: "Improves texture", d: "Smoother skin and refined pores." },
      { i: "◐", t: "Even tone", d: "Reduces pigmentation gradually." },
      { i: "⟡", t: "Quick procedure", d: "30-minute lunchtime treatment." },
      { i: "◍", t: "Affordable", d: "Excellent value for skin maintenance." },
    ],
    faqs: [
      { q: "Will my skin peel visibly?", a: "Mild peels (glycolic, mandelic) cause only fine flaking. Stronger peels (TCA) may cause visible peeling for 3 to 5 days. We always discuss expected downtime before scheduling." },
      { q: "Are peels safe for darker skin?", a: "Yes, when the acid and strength are matched to your skin. Mandelic acid in particular is excellent for higher-melanin Indian skin." },
      { q: "How often should I do peels?", a: "Most protocols involve a series of 4 to 6 sessions 2 to 4 weeks apart, followed by maintenance every 6 to 8 weeks." },
    ],
  },
  "cosmelan": {
    slug: "cosmelan", name: "Cosmelan Treatment", cat: "Peels & Pigmentation", img: "v6",
    headline: "The benchmark protocol for resistant melasma.",
    overview: "Cosmelan is a two-phase clinical depigmentation system originally developed for resistant melasma. The in-clinic mask plus at-home topical regimen progressively suppresses melanin overproduction and reveals an even, brightened complexion.",
    quick: { duration: "60 min", sessions: "1 mask + home care", downtime: "5 to 7 days" },
    keyPoints: [
      "Gold standard for resistant melasma",
      "Effective on Indian skin tones",
      "Two-phase: in-clinic plus at-home",
      "Lasting results with maintenance",
    ],
    suitableFor: ["Melasma", "Post-inflammatory hyperpigmentation", "Sun damage", "Uneven skin tone", "Acne marks", "Stubborn pigmentation"],
    process: [
      { t: "Assessment & prep", d: "Dermatologist evaluates pigmentation and prepares your skin." },
      { t: "In-clinic mask", d: "Cosmelan-1 mask applied and left on for several hours." },
      { t: "Home maintenance", d: "Cosmelan-2 cream used at home for 6 or more months on a tapering schedule." },
      { t: "Reviews & touch-ups", d: "Photo reviews at 2 weeks, 6 weeks, 3 months, 6 months." },
    ],
    benefits: [
      { i: "✦", t: "Resistant melasma", d: "Works on cases other protocols can't crack." },
      { i: "✶", t: "Even tone", d: "Visible brightening across the entire face." },
      { i: "❋", t: "Long-term result", d: "With maintenance, lasting suppression of pigment." },
      { i: "◐", t: "Indian skin safe", d: "Proven outcomes in Type IV to V skin." },
      { i: "⟡", t: "Single in-clinic visit", d: "Only one mask session needed; rest is home care." },
      { i: "◍", t: "Improves texture", d: "Skin clarity and smoothness improve alongside." },
    ],
    faqs: [
      { q: "How long is the downtime?", a: "Peeling and pinkness for 5 to 7 days. Make-up can be applied with a healing balm from day 4. We schedule the mask around your social calendar." },
      { q: "Will the pigmentation come back?", a: "Cosmelan suppresses melanocyte over-activity but doesn't cure the underlying tendency. With our maintenance regimen and sun protection, results last well, usually years." },
      { q: "Is it safe for darker Indian skin?", a: "Yes. Cosmelan was specifically developed for higher-melanin skin and is safer than aggressive lasers for most pigmentary disorders in our population." },
    ],
  },
  "dermamelan": {
    slug: "dermamelan", name: "Dermamelan Treatment", cat: "Peels & Pigmentation", img: "v6",
    headline: "When Cosmelan isn't strong enough.",
    overview: "Dermamelan is the more intensive sibling of Cosmelan, formulated for severe or treatment-resistant melasma and other persistent pigmentary disorders. Faster acting, with a slightly longer recovery.",
    quick: { duration: "60 min", sessions: "1 mask + home care", downtime: "7 to 10 days" },
    keyPoints: [
      "Stronger than Cosmelan for severe melasma",
      "Reserved for treatment-resistant pigmentation",
      "Performed only by an MD dermatologist",
      "Structured 6 to 9 month aftercare protocol",
    ],
    suitableFor: ["Severe melasma", "Treatment-resistant pigmentation", "Deep dermal melasma", "Post-pregnancy hyperpigmentation", "Hormonal pigmentation", "Patients who have plateaued on Cosmelan"],
    process: [
      { t: "Detailed assessment", d: "We confirm Dermamelan is the right step versus Cosmelan." },
      { t: "In-clinic mask", d: "Dermamelan-1 mask applied; worn for the prescribed window." },
      { t: "Strict aftercare", d: "Topical maintenance protocol with SPF discipline." },
      { t: "Structured follow-ups", d: "Reviews at 2 weeks, 6 weeks, 3 months and 6 months." },
    ],
    benefits: [
      { i: "✦", t: "Resistant cases", d: "Effective where milder protocols stall." },
      { i: "✶", t: "Even, brighter tone", d: "Visible change across hyperpigmented areas." },
      { i: "❋", t: "Long-term suppression", d: "Multi-month tapering maintains gains." },
      { i: "◐", t: "Doctor-only", d: "Always performed and supervised by an MD dermatologist." },
      { i: "⟡", t: "Structured", d: "A clear plan: in-clinic mask, home care, scheduled reviews." },
      { i: "◍", t: "Combines well", d: "Layered with peels and lasers once pigment settles." },
    ],
    faqs: [
      { q: "How is this different from Cosmelan?", a: "Same family, stronger formulation. Dermamelan is reserved for severe or resistant cases and has a slightly longer recovery window." },
      { q: "Is it safe for Indian skin?", a: "Yes, with strict adherence to the aftercare protocol and daily SPF. We screen carefully before recommending it." },
      { q: "How long will the results last?", a: "With our maintenance regimen and disciplined sun protection, most patients hold results for years; occasional touch-ups may be needed." },
    ],
  },
  "acne-scar-reduction": {
    slug: "acne-scar-reduction", name: "Acne Scar Reduction", cat: "Peels & Pigmentation", img: "v2",
    headline: "A combination protocol for scars that refuse to fade.",
    overview: "Acne scars come in different shapes, and one device rarely treats them all. Our combination protocol layers MNRF, subcision and TCA-CROSS, calibrated to each scar type, for visible, lasting improvement.",
    quick: { duration: "60 min", sessions: "4 to 6 sessions", downtime: "3 to 5 days per session" },
    keyPoints: [
      "Each scar type gets its own technique",
      "MNRF for rolling and boxcar scars",
      "Subcision for tethered atrophic scars",
      "TCA-CROSS for icepick scars",
    ],
    suitableFor: ["Rolling acne scars", "Boxcar scars", "Icepick scars", "Atrophic post-acne scarring", "Surgical scars", "Stretch marks (similar protocol)"],
    process: [
      { t: "Scar mapping", d: "Each scar is classified and matched to the right technique." },
      { t: "MNRF + subcision", d: "Bipolar RF microneedling, with subcision where indicated." },
      { t: "TCA-CROSS", d: "Pinpoint TCA application for deep icepick scars." },
      { t: "Layered recovery", d: "Healing serums, SPF and a 4 to 6 week wait before the next session." },
    ],
    benefits: [
      { i: "✶", t: "Right tool per scar", d: "Each scar is treated with its best-evidence method." },
      { i: "✦", t: "Visible improvement", d: "Most patients see clear change after 3 to 4 sessions." },
      { i: "◐", t: "Long-term collagen", d: "Remodelling continues for 3 to 6 months after the course." },
      { i: "❋", t: "Indian skin safe", d: "Conservative settings reduce post-inflammatory pigment risk." },
      { i: "⟡", t: "Pairs with PRP", d: "Adding PRP or exosomes accelerates results." },
      { i: "◍", t: "Doctor-led", d: "Performed entirely by an MD dermatologist." },
    ],
    faqs: [
      { q: "How much improvement should I expect?", a: "Realistic expectations: 50 to 80 percent improvement in most cases over a complete course. Severe scarring may need ongoing maintenance." },
      { q: "When can I start treatment?", a: "Active acne should be controlled first. Once breakouts have stabilised, we can plan the scar protocol." },
      { q: "Will the scars come back?", a: "Treated scars don't return. New scars only form if new acne erupts, which is why we manage acne first." },
    ],
  },
  "hyperpigmentation-reduction": {
    slug: "hyperpigmentation-reduction", name: "Hyperpigmentation Reduction", cat: "Peels & Pigmentation", img: "v6",
    headline: "Even skin tone, calibrated for melanin-rich skin.",
    overview: "A layered programme for melasma, sun damage and post-inflammatory hyperpigmentation. Prescription topicals plus targeted in-clinic therapy, with strict SPF discipline at the centre.",
    quick: { duration: "45 min per session", sessions: "Monthly course", downtime: "Minimal" },
    keyPoints: [
      "Prescription topicals as the backbone",
      "In-clinic peels, IPL or Q-switch as needed",
      "Calibrated for Type IV to V Indian skin",
      "SPF discipline is non-negotiable",
    ],
    suitableFor: ["Melasma", "Post-inflammatory hyperpigmentation (PIH)", "Sun damage", "Acne marks", "Hormonal pigmentation", "Periorbital (under-eye) darkening"],
    process: [
      { t: "Skin assessment", d: "Pigmentation depth and triggers are mapped before treatment." },
      { t: "Prescription regimen", d: "Topicals layered for melanin suppression and skin repair." },
      { t: "In-clinic therapy", d: "Peels, IPL or Q-switch chosen per skin and concern." },
      { t: "SPF + reviews", d: "Daily SPF discipline plus monthly reviews keep results stable." },
    ],
    benefits: [
      { i: "✦", t: "Layered approach", d: "Topicals + in-clinic outperform either alone." },
      { i: "◐", t: "Indian-skin safe", d: "Protocols specifically built for higher melanin." },
      { i: "✶", t: "Realistic timelines", d: "Visible change over 8 to 12 weeks, gradual fade after." },
      { i: "❋", t: "Customisable", d: "Plan adapts to seasonal triggers and skin response." },
      { i: "⟡", t: "Sustainable", d: "Maintenance protocols keep pigment from returning." },
      { i: "◍", t: "SPF-led", d: "We coach you on the only treatment that works forever, sunscreen." },
    ],
    faqs: [
      { q: "Why does pigmentation keep coming back?", a: "Sun exposure, hormones and inflammation can reactivate melanocytes. Sustained results need ongoing SPF and trigger-management." },
      { q: "Will the pigmentation fully disappear?", a: "Most pigmentation fades significantly; complete disappearance depends on depth and cause. We will share an honest forecast at consultation." },
      { q: "Can I have lasers for melasma?", a: "Aggressive lasers can worsen melasma in Indian skin. We prefer conservative protocols, Q-switch toning, IPL or peels, layered with topicals." },
    ],
  },
  "glutathione-skin-lightening": {
    slug: "glutathione-skin-lightening", name: "Glutathione Skin Lightening", cat: "Skin & Glow", img: "v1",
    headline: "Doctor-supervised antioxidant therapy for overall radiance.",
    overview: "Glutathione is a master antioxidant that, in a structured course, supports skin clarity and complexion glow. Delivered under dermatologist supervision, with clear expectations on what it can and cannot do.",
    quick: { duration: "30 min", sessions: "Course-based, 6 to 12 sessions", downtime: "Zero" },
    keyPoints: [
      "Master antioxidant for skin and overall health",
      "Improves complexion clarity and glow",
      "Always performed under doctor supervision",
      "Set realistic expectations from day one",
    ],
    suitableFor: ["Overall dullness", "Uneven tone", "Anti-oxidant support during pigmentation therapy", "Maintenance after melasma protocols", "Combined glow programmes", "Anti-ageing support"],
    process: [
      { t: "Pre-screening", d: "Medical history, blood work and suitability are confirmed." },
      { t: "Structured course", d: "Weekly to biweekly sessions, depending on protocol." },
      { t: "Lifestyle support", d: "Topical antioxidants and SPF discipline are built in." },
      { t: "Maintenance plan", d: "Ongoing oral antioxidant support keeps results stable." },
    ],
    benefits: [
      { i: "✦", t: "Radiance", d: "Complexion looks clearer and brighter over a course." },
      { i: "◐", t: "Doctor supervised", d: "Carried out only by an MD dermatologist." },
      { i: "✶", t: "Honest expectations", d: "We are transparent about what is realistic." },
      { i: "❋", t: "Supports other therapy", d: "Useful alongside melasma and brightening protocols." },
      { i: "⟡", t: "Antioxidant load", d: "Broader systemic antioxidant support." },
      { i: "◍", t: "Safe in our hands", d: "Strict screening and sterile protocol every visit." },
    ],
    faqs: [
      { q: "Will I become several shades lighter?", a: "No. Glutathione supports clarity and glow, not dramatic skin colour change. We never promise unrealistic outcomes." },
      { q: "Is it safe?", a: "Yes, when carried out by a qualified dermatologist with proper screening. We do not offer at-home or salon-style protocols." },
      { q: "Will the effect last?", a: "Results hold with maintenance, lifestyle, SPF and topical antioxidants. Stopping all support sees gradual return to baseline." },
    ],
  },
  "medifacial": {
    slug: "medifacial", name: "Medifacial", cat: "Skin & Glow", img: "v1",
    headline: "Medical-grade glow, tailored to your skin.",
    overview: "More than a salon facial, a dermatologist-supervised medifacial combines deep cleansing, targeted actives, and device-assisted infusion of customised serums for your specific skin concern.",
    quick: { duration: "60 min", sessions: "Monthly", downtime: "Zero" },
    keyPoints: [
      "Customised to your skin's current need",
      "Performed under dermatologist guidance",
      "Active ingredients, medical-grade serums",
      "Instant, visible radiance",
    ],
    suitableFor: ["Dull skin", "Tired skin", "Acne-prone skin", "Pigmentation", "Anti-ageing", "Pre-event glow"],
    process: [
      { t: "Skin diagnosis", d: "Your skin is assessed and the right medifacial protocol is chosen." },
      { t: "Deep cleanse & exfoliate", d: "Pores are cleared and surface dullness is removed." },
      { t: "Active infusion", d: "Targeted serums delivered via device or mesotherapy." },
      { t: "Mask & SPF", d: "Calming mask, hydration, and SPF for the day ahead." },
    ],
    benefits: [
      { i: "✦", t: "Instant glow", d: "Visible radiance from the very first session." },
      { i: "◐", t: "Customised", d: "Serums chosen for your skin's exact need." },
      { i: "✶", t: "Zero downtime", d: "Walk out looking your best, perfect for events." },
      { i: "❋", t: "Improves over time", d: "Monthly sessions create cumulative improvement." },
      { i: "⟡", t: "Doctor-led", d: "Performed under dermatologist supervision." },
      { i: "◍", t: "All skin types", d: "Versions for oily, dry, acne-prone, mature skin." },
    ],
    faqs: [
      { q: "How is this different from a regular facial?", a: "A medifacial uses pharmaceutical-grade ingredients and devices, is customised by your dermatologist, and targets a specific concern, not just relaxation." },
      { q: "How often should I have one?", a: "Once a month is ideal for most skin types. Bridal protocols and event prep may include a more intensive 4 to 6 week countdown schedule." },
      { q: "Will I see results immediately?", a: "Yes, most patients see visible glow within hours. Cumulative results in texture, tone and clarity build over 3 to 6 monthly sessions." },
    ],
  },
  "drs-dermaroller": {
    slug: "drs-dermaroller", name: "DRS (Dermaroller) Treatment", cat: "Skin & Glow", img: "v2",
    headline: "Microneedling for collagen, texture and tone.",
    overview: "DRS is a controlled micro-injury technique that stimulates the skin's own healing response. The result is gradually smoother texture, softer fine lines, and improved appearance of stretch marks and shallow scars.",
    quick: { duration: "45 min", sessions: "4 to 6 sessions", downtime: "24 to 48 hours pinkness" },
    keyPoints: [
      "Mechanical microneedling for collagen induction",
      "Improves stretch marks and fine acne scars",
      "Affordable entry point into resurfacing",
      "Often paired with growth-factor serums or PRP",
    ],
    suitableFor: ["Stretch marks", "Fine acne scars", "Open pores", "Dull or rough texture", "Photo-ageing", "Body skin rejuvenation"],
    process: [
      { t: "Numb & prep", d: "Topical numbing for 30 minutes followed by gentle cleansing." },
      { t: "Microneedling pass", d: "Calibrated derma-roller used at the right depth for the concern." },
      { t: "Active infusion", d: "Growth-factor serum, PRP or peptide cocktail layered in." },
      { t: "Heal & repeat", d: "Pinkness for 24 to 48 hours; sessions every 4 to 6 weeks." },
    ],
    benefits: [
      { i: "✶", t: "Boosts collagen", d: "Skin builds new collagen over weeks." },
      { i: "✦", t: "Helps stretch marks", d: "One of the few effective options for stretch marks." },
      { i: "◐", t: "Texture refines", d: "Visible smoothing over a course." },
      { i: "❋", t: "Body-friendly", d: "Equally effective for body skin like thighs and abdomen." },
      { i: "⟡", t: "Affordable", d: "Strong value per visit compared to advanced energy devices." },
      { i: "◍", t: "Combines well", d: "Layered with PRP, exosomes or peels for stronger results." },
    ],
    faqs: [
      { q: "How is this different from MNRF?", a: "MNRF adds radiofrequency energy at depth; DRS is mechanical only. MNRF outperforms DRS for deep scars, while DRS remains useful for surface concerns and stretch marks." },
      { q: "Is the downtime significant?", a: "Mild pinkness for 24 to 48 hours, similar to a sunburn. Make-up is usually fine from the next day." },
      { q: "How long until I see results?", a: "Some immediate glow; structural changes (collagen) build over 3 to 6 months across a 4 to 6 session course." },
    ],
  },
  "vitiligo-treatment": {
    slug: "vitiligo-treatment", name: "Vitiligo Treatment", cat: "Skin & Glow", img: "v5",
    headline: "Targeted protocols. For stable vitiligo only.",
    overview: "Vitiligo management is a long-term, multi-pronged programme. We combine targeted phototherapy, prescription topicals and, when appropriate, cellular grafting, for stable vitiligo patches.",
    quick: { duration: "Varies", sessions: "Long-term programme", downtime: "Varies" },
    keyPoints: [
      "Excimer or narrow-band UVB phototherapy",
      "Calcineurin inhibitors and other topicals",
      "Cellular grafting for stable, segmental patches",
      "Strict surveillance to confirm stability",
    ],
    suitableFor: ["Stable vitiligo patches", "Segmental vitiligo", "Localised non-active patches", "Patients screened for autoimmune triggers", "Adults and adolescents (with care)", "Patients committed to a long-term plan"],
    process: [
      { t: "Diagnosis & screening", d: "Type and stability of vitiligo confirmed; autoimmune screen if needed." },
      { t: "Topical regimen", d: "Calcineurin inhibitors and other topicals as appropriate." },
      { t: "Phototherapy", d: "Excimer laser or NB-UVB sessions, targeted to active patches." },
      { t: "Grafting (selected cases)", d: "Cellular grafting offered only for stable, suitable patches." },
    ],
    benefits: [
      { i: "✦", t: "Multi-pronged", d: "Topicals + light + grafting (where indicated) gives the best chance of repigmentation." },
      { i: "◐", t: "Doctor-led", d: "Performed by an MD dermatologist who specialises in pigmentary disorders." },
      { i: "✶", t: "Honest forecasting", d: "We do not promise full repigmentation; we share realistic ranges." },
      { i: "❋", t: "Targeted phototherapy", d: "Excimer focuses light on patches only, sparing normal skin." },
      { i: "⟡", t: "Holistic", d: "Trigger review, autoimmune screen and lifestyle counselling included." },
      { i: "◍", t: "Long-term partnership", d: "We commit to a multi-year relationship with you." },
    ],
    faqs: [
      { q: "Will my vitiligo fully repigment?", a: "Repigmentation depends on type, location, stability and duration. Faces tend to respond best; hands and feet less so. We share realistic expectations from day one." },
      { q: "Is grafting always an option?", a: "Only for stable, segmental or localised patches that have not changed for at least 12 months. Active vitiligo is treated medically first." },
      { q: "How long does treatment take?", a: "Vitiligo is a chronic condition. Programmes run for months to years, with phototherapy spaced two to three times weekly." },
    ],
  },
  "nail-surgery": {
    slug: "nail-surgery", name: "Nail Surgery", cat: "Day-Care Surgery", img: "v4",
    headline: "Same-day procedures for ingrown nails and disorders.",
    overview: "Day-care surgical management of ingrown toenails, recurrent paronychia and selected nail disorders. Performed under local anaesthesia by a trained dermato-surgeon, with same-day discharge.",
    quick: { duration: "30 min", sessions: "Usually a single visit", downtime: "2 to 3 days" },
    keyPoints: [
      "Performed under local anaesthesia",
      "Same-day discharge, no hospitalisation",
      "Targeted partial or full nail-edge avulsion",
      "Carbol-fuchsin or phenol used to prevent regrowth where indicated",
    ],
    suitableFor: ["Ingrown toenails", "Recurrent paronychia", "Subungual haematoma", "Pincer nail deformity", "Nail biopsy", "Selected fungal nail surgery"],
    process: [
      { t: "Assessment", d: "Cause of the nail problem is identified and the right approach planned." },
      { t: "Local anaesthesia", d: "A small lidocaine block keeps the procedure painless." },
      { t: "Surgical correction", d: "Partial avulsion, matrix ablation or biopsy as required." },
      { t: "Dressing & follow-up", d: "Sterile dressing, oral antibiotic if needed, and review at 5 to 7 days." },
    ],
    benefits: [
      { i: "✦", t: "Curative", d: "Properly performed, ingrown-toenail surgery rarely recurs." },
      { i: "◐", t: "Outpatient", d: "Walk in, walk out, no hospital stay needed." },
      { i: "✶", t: "Low downtime", d: "Most patients return to desk work in 1 to 2 days." },
      { i: "❋", t: "Specialist-led", d: "Performed only by a trained dermato-surgeon." },
      { i: "⟡", t: "Diagnostic option", d: "Nail biopsy when a nail-unit tumour is suspected." },
      { i: "◍", t: "Sterile protocol", d: "Operated under strict aseptic conditions." },
    ],
    faqs: [
      { q: "Is the procedure painful?", a: "The anaesthetic injection has a brief sting; the procedure itself is painless. Mild ache is expected for a day or two afterwards." },
      { q: "Will the toenail look normal again?", a: "In most ingrown-toenail surgeries, only the offending edge is removed, the rest of the nail regrows normally. We will explain the cosmetic outcome before scheduling." },
      { q: "Are stitches needed?", a: "Most nail-edge surgeries do not need stitches. Larger procedures may need one or two sutures, removed at the follow-up visit." },
    ],
  },
  "cyst-surgery": {
    slug: "cyst-surgery", name: "Cyst Surgery", cat: "Day-Care Surgery", img: "v4",
    headline: "Minor excisions, cleanly, with minimal scarring.",
    overview: "Surgical excision of cysts, lipomas, warts, moles and similar lesions, performed in our day-care surgical suite under local anaesthesia. Histopathology is sent for analysis when clinically indicated.",
    quick: { duration: "30 to 45 min", sessions: "Single visit", downtime: "5 to 7 days" },
    keyPoints: [
      "Dermato-surgeon performed, sterile suite",
      "Local anaesthesia, no hospitalisation",
      "Histopathology when indicated for safety",
      "Closed with fine sutures for the best scar outcome",
    ],
    suitableFor: ["Sebaceous and epidermal cysts", "Lipomas", "Recalcitrant warts", "Selected moles (including suspicious lesions)", "Skin tags and dermatofibromas", "Lesion biopsy"],
    process: [
      { t: "Pre-op assessment", d: "Lesion is examined, photographed and consent is taken." },
      { t: "Sterile excision", d: "Under local anaesthesia, lesion is removed with safe margins." },
      { t: "Layered closure", d: "Fine sutures placed in layers for the best scar outcome." },
      { t: "Suture removal", d: "Reviewed at 5 to 7 days, with histopathology discussed when relevant." },
    ],
    benefits: [
      { i: "✦", t: "Clean removal", d: "Complete excision reduces the chance of recurrence." },
      { i: "◐", t: "Minimal scarring", d: "Layered closure and careful technique optimise scar appearance." },
      { i: "✶", t: "Same-day", d: "Walk in, walk out, no hospital admission." },
      { i: "❋", t: "Safety net", d: "Suspicious lesions go for histopathology automatically." },
      { i: "⟡", t: "Doctor-led", d: "Performed only by trained dermato-surgeons." },
      { i: "◍", t: "Aftercare guidance", d: "Clear written wound-care instructions and scheduled review." },
    ],
    faqs: [
      { q: "Will I have a scar?", a: "Any incision leaves some mark. We use fine, layered closure to minimise it; most scars become inconspicuous over months." },
      { q: "Will the cyst come back?", a: "Properly excised cysts rarely return because we remove the entire sac, not just drain its contents." },
      { q: "When are stitches removed?", a: "Usually at 5 to 7 days for the face, and 10 to 14 days for the body. The team explains scar care at the suture-removal visit." },
    ],
  },
};

export const TREATMENT_DETAIL_SLUGS = Object.keys(TREATMENTS_FULL);

export const getTreatmentDetail = (slug: string): TreatmentDetail | undefined =>
  TREATMENTS_FULL[slug];

export type RelatedTreatment = {
  slug: string;
  name: string;
  cat: string;
  img: string;
  desc: string;
};

// All 27 treatments available for related-treatment surfacing.
export const ALL_TREATMENTS_LIST: RelatedTreatment[] = TREATMENTS.map((t) => ({
  slug: TREATMENT_SLUGS[t.id],
  name: t.name,
  cat: t.cat,
  img: t.img,
  desc: t.desc,
}));
