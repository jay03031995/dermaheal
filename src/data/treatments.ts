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
  { id: "t04", name: "Anti-Wrinkle Therapy (Botox)", cat: "Injectables", desc: "Precision botulinum toxin for forehead lines, crow's feet and frown lines, soft, natural movement.", dur: "20 min", img: "v4", tag: "Popular" },
  { id: "t05", name: "Dermal Fillers", cat: "Injectables", desc: "Hyaluronic acid fillers for cheek, lip, chin and under-eye contouring, subtle, refined results.", dur: "40 min", img: "v5" },
  { id: "t06", name: "Thread Lifting", cat: "Injectables", desc: "PDO thread lift for jawline definition and mid-face lift, with collagen stimulation over months.", dur: "60 min", img: "v2" },
  { id: "t07", name: "Lipolysis Injection", cat: "Injectables", desc: "Targeted injections that gradually reduce stubborn small fat pockets, chin, jowls, flanks.", dur: "30 min", img: "v4" },
  { id: "t08", name: "Exosomes Treatment", cat: "Regenerative", desc: "Next-generation regenerative therapy for skin rejuvenation, hair restoration and post-procedure healing.", dur: "45 min", img: "v3", tag: "New" },
  { id: "t09", name: "PDRN Treatment", cat: "Regenerative", desc: "Salmon-DNA polynucleotide therapy that repairs skin at the cellular level and improves elasticity.", dur: "40 min", img: "v5" },
  { id: "t10", name: "Face PRP", cat: "Regenerative", desc: "Autologous platelet-rich plasma for glow, texture refinement and acne-scar improvement.", dur: "45 min", img: "v1" },
  { id: "t11", name: "MNRF Treatment", cat: "Lasers", desc: "Microneedling RF for acne scars, pores and skin tightening, collagen remodelling with minimal downtime.", dur: "60 min", img: "v2", tag: "Signature" },
  { id: "t12", name: "Laser Hair Reduction", cat: "Lasers", desc: "Diode and Nd:YAG laser hair reduction calibrated for Indian skin tones across all body areas.", dur: "20 to 60 min", img: "v4" },
  { id: "t13", name: "IPL Treatment", cat: "Lasers", desc: "Intense pulsed light for pigmentation, redness and overall skin tone evening, minimal downtime.", dur: "30 min", img: "v6" },
  { id: "t14", name: "Carbon Laser Facial", cat: "Lasers", desc: "Carbon peel and Q-switch laser combination for pore refinement, oil control and instant glow.", dur: "45 min", img: "v6" },
  { id: "t15", name: "Tattoo Removal", cat: "Lasers", desc: "Q-Switch Nd:YAG laser fragmentation of tattoo pigment, scheduled over multiple sessions.", dur: "20 min", img: "v4" },
  { id: "t16", name: "HIFU & Wrinkle One", cat: "Lasers", desc: "High-intensity focused ultrasound to lift, firm and contour without downtime.", dur: "60 min", img: "v6" },
  { id: "t17", name: "Chemical Peeling", cat: "Peels", desc: "Glycolic, mandelic and salicylic peels for acne, pigmentation and dullness, graded for your skin.", dur: "30 min", img: "v1" },
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

// Maps a TREATMENTS id to its dedicated detail-page slug.
export const TREATMENT_SLUGS: Record<string, string> = {
  t01: "hair-transplant", t02: "hair-prp", t03: "hair-prp",
  t04: "botox", t05: "fillers", t06: "fillers", t07: "fillers",
  t08: "hair-prp", t09: "hair-prp", t10: "hair-prp",
  t11: "mnrf", t12: "laser-hair", t13: "laser-hair", t14: "laser-hair",
  t15: "laser-hair", t16: "mnrf",
  t17: "chemical-peel", t18: "cosmelan", t19: "cosmelan",
  t20: "mnrf", t21: "cosmelan",
  t22: "medifacial", t23: "medifacial", t24: "mnrf",
  t25: "medifacial", t26: "medifacial", t27: "medifacial",
};

export const slugFor = (t: Treatment) => TREATMENT_SLUGS[t.id] || "medifacial";

export type Category = { key: string; title: string; desc: string };

export const CATEGORIES: Category[] = [
  { key: "Hair", title: "Hair Restoration", desc: "From regenerative protocols to FUE transplant, solutions for shedding, thinning and bald patches." },
  { key: "Injectables", title: "Injectables & Volume", desc: "Botox, fillers, threads and lipolysis, delivered with a natural Indian aesthetic." },
  { key: "Lasers", title: "Lasers & Energy Devices", desc: "FDA-approved devices calibrated specifically for Indian skin, pigmentation, hair, scars, contouring." },
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
  quick: { duration: string; sessions: string; downtime: string };
  keyPoints: string[];
  suitableFor: string[];
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
  "botox": {
    slug: "botox", name: "Anti-Wrinkle Therapy (Botox)", cat: "Injectables", img: "v4",
    headline: "Soften lines, preserve expression.",
    overview: "Botulinum toxin is a precision injectable that relaxes specific facial muscles to soften wrinkles caused by repeated expression. Done well, Botox refreshes the face without altering identity.",
    quick: { duration: "20 min", sessions: "Single visit", downtime: "Zero" },
    keyPoints: [
      "Forehead, frown lines and crow's feet",
      "Natural, soft results, never frozen",
      "Performed by MD dermatologist",
      "Genuine, FDA-approved products only",
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
  "fillers": {
    slug: "fillers", name: "Dermal Fillers", cat: "Injectables", img: "v5",
    headline: "Restore volume. Refine contours. Naturally.",
    overview: "Hyaluronic acid fillers add subtle volume and definition to areas that have lost youthful contour, cheeks, lips, chin, jawline and under-eyes. Reversible, modular, and tailored to your facial proportions.",
    quick: { duration: "40 min", sessions: "Single visit", downtime: "1 to 2 days" },
    keyPoints: [
      "FDA-approved HA fillers",
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
      { q: "Are they safe?", a: "We use only FDA-approved hyaluronic acid fillers. HA is naturally found in the body and is fully reversible with hyaluronidase if needed." },
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
  "laser-hair": {
    slug: "laser-hair", name: "Laser Hair Reduction", cat: "Lasers", img: "v4",
    headline: "Silky, fuss-free skin, calibrated for Indian tones.",
    overview: "FDA-approved diode and Nd:YAG laser hair reduction safely targets the pigment in hair follicles, gradually reducing growth over multiple sessions. Calibrated specifically for Indian skin tones.",
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
  "chemical-peel": {
    slug: "chemical-peel", name: "Chemical Peeling", cat: "Peels & Pigmentation", img: "v1",
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
  "medifacial": {
    slug: "medifacial", name: "Medifacial", cat: "Skin", img: "v1",
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

export const ALL_TREATMENTS_LIST: RelatedTreatment[] = [
  { slug: "hair-transplant", name: "Hair Transplant", cat: "Hair", img: "v3", desc: "FUE-based hair restoration with natural hairline design and lasting density." },
  { slug: "hair-prp", name: "Hair PRP", cat: "Hair", img: "v3", desc: "Platelet therapy that reduces shedding and stimulates new growth." },
  { slug: "botox", name: "Anti-Wrinkle (Botox)", cat: "Injectables", img: "v4", desc: "Precision botulinum toxin for soft, natural softening of dynamic lines." },
  { slug: "fillers", name: "Dermal Fillers", cat: "Injectables", img: "v5", desc: "HA fillers for cheek, lip, chin and under-eye contouring." },
  { slug: "mnrf", name: "MNRF", cat: "Lasers", img: "v2", desc: "Microneedling RF for acne scars, pores and skin tightening." },
  { slug: "laser-hair", name: "Laser Hair Reduction", cat: "Lasers", img: "v4", desc: "Long-term hair reduction calibrated for Indian skin tones." },
  { slug: "cosmelan", name: "Cosmelan", cat: "Peels", img: "v6", desc: "Clinical depigmentation for resistant melasma." },
  { slug: "chemical-peel", name: "Chemical Peeling", cat: "Peels", img: "v1", desc: "Customised acid peels for acne, pigmentation and dullness." },
  { slug: "medifacial", name: "Medifacial", cat: "Skin", img: "v1", desc: "Medical-grade facials customised to your skin." },
];
