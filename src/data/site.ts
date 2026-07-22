export type HeroStat = { value: string; superscript?: string; label: string };
export type HeroBadge = { icon: "dot" | "award"; text: string };

export const HERO = {
  eyebrow: "Dermatology · Aesthetics · Trichology",
  // HTML allowed — <em> for the italic highlights, <br/> for line breaks.
  headline:
    "Skin that knows the<br/>difference between <em>care</em><br/>and <em>cosmetics.</em>",
  subhead:
    "Dwarka's trusted dermatology practice, calibrated for Indian skin, grounded in clinical evidence, and built around the kind of unhurried care that produces real, lasting results.",
  primaryCta: "Book a consultation",
  secondaryCta: "Explore treatments",
  stats: [
    { value: "27", superscript: "+", label: "ADVANCED TREATMENTS" },
    { value: "3", label: "SKIN SPECIALISTS" },
    { value: "14", superscript: "yrs", label: "CARING FOR INDIAN SKIN" },
  ] as HeroStat[],
  badges: [
    { icon: "award", text: "Dermatologist led" },
  ] as HeroBadge[],
  imageMainLabel: "Treatment Suite, Dwarka",
  imageSubLabel: "Consultation Room",
};

export type BookSlotCard = {
  time: string;
  doctor: string;
  detail: string;
  availability: string;
  highlight?: boolean;
};

export const BOOK = {
  eyebrow: "Book Appointment",
  heading: "Talk to a dermatologist this week.",
  body: "A one-on-one consultation with a skin specialist. A written plan, on the spot. Honest, unhurried, and built for your skin.",
  ctaLabel: "Book Appointment",
  meta: [
    "Same-day slots",
    "Mon to Sat 10 AM to 7:30 PM",
  ],
  cards: [
    { time: "Today · 4:30 PM", doctor: "Dr. Navjot Singh Arora", detail: "Dwarka Clinic · Skin Consultation", availability: "2 slots left", highlight: false },
    { time: "Tomorrow · 11:00 AM", doctor: "Dr. Jasmine Kohli", detail: "Dwarka Clinic · Aesthetics Review", availability: "Open", highlight: true },
    { time: "Saturday · 2:00 PM", doctor: "Dr. Sonika Soni", detail: "Dwarka Clinic · Laser Plan", availability: "3 slots left", highlight: false },
  ] as BookSlotCard[],
};

export const WHY = {
  eyebrow: "The Dermaheal standard · EEAT",
  heading: "Four pillars behind every treatment we perform.",
  statValue: "97",
  statSuperscript: "%",
  statLabel: "Would refer a friend",
  imageLabel: "Procedure Room, Dwarka Clinic",
};

export const EEAT = [
  { letter: "E", title: "Experience You Can See", desc: "Three dermatology specialists with a combined 29+ years of clinical experience treating Indian skin and hair." },
  { letter: "E", title: "Expertise That's Earned", desc: "Every procedure (injectables, lasers, hair restoration, surgery) is performed personally by a qualified dermatologist." },
  { letter: "A", title: "Authoritative Protocols", desc: "Treatments calibrated for Indian skin types. Cosmelan, MNRF, HIFU and laser protocols rooted in clinical evidence." },
  { letter: "T", title: "Trust & Transparency", desc: "Honest written plans. Realistic outcomes. No high-pressure upselling, ever. Long-term skin health, not quick fixes." },
];

export type Result = {
  id: string;
  name: string;
  cat: string;
  weeks: string;
  sessions: string;
  patient: string;
  concern: string;
  img: string;
};

export const RESULTS: Result[] = [
  { id: "r1", name: "Acne Scar Reduction (MNRF)", cat: "Acne Scars", weeks: "16 weeks", sessions: "3 sessions, 4 wks apart", patient: "Adult patient", concern: "Rolling + box scars", img: "https://dermaheal.co.in/assets/DermaHeal/Acne%20Scar%20(2).jpg" },
  { id: "r2", name: "Cosmelan for Melasma", cat: "Pigmentation", weeks: "12 weeks", sessions: "1 mask + home care", patient: "Adult patient", concern: "Hyperpigmentation", img: "https://dermaheal.co.in/assets/DermaHeal/hyperpig%20(6).jpg" },
  { id: "r3", name: "Hair PRP Protocol", cat: "Hair Loss", weeks: "24 weeks", sessions: "6 sessions monthly", patient: "Adult patient", concern: "Diffuse thinning crown", img: "https://dermaheal.co.in/assets/DermaHeal/hair%20loss%20(8).jpg" },
  { id: "r4", name: "Anti-wrinkle Therapy (Botox)", cat: "Anti-Ageing", weeks: "2 weeks", sessions: "Single visit", patient: "Adult patient", concern: "Forehead lines + glabella", img: "https://dermaheal.co.in/assets/DermaHeal/Botox.jpg" },
];

export const RESULT_CATS = ["All", "Acne Scars", "Pigmentation", "Hair Loss", "Anti-Ageing"];

export const TESTIMONIALS = [
  { q: "I had tried multiple clinics for my melasma before Dermaheal. Dr. Arora actually explained what was happening to my skin and built a plan around it. Three months in, the difference is undeniable.", name: "Meera Sharma", detail: "Cosmelan Program · Dwarka" },
  { q: "What stood out was the honesty in the consultation. They talked me out of one treatment I'd asked for because it wasn't right for me. That kind of integrity is rare in aesthetics.", name: "Karthik Verma", detail: "Acne Management · Dwarka" },
  { q: "Six sessions of Hair PRP and the regrowth speaks for itself. The team genuinely cares, every follow-up was unhurried and detailed.", name: "Ananya Singh", detail: "Hair PRP · Dwarka" },
];

export const FAQS = [
  { q: "Are your treatments safe for Indian skin tones?", a: "Yes. Every laser, peel and injectable we offer is calibrated for higher-melanin skin. Our protocols are developed in-house and our dermatologists are trained specifically on Indian skin types. If a treatment isn't safe for your skin, we'll tell you and recommend a better-suited alternative." },
  { q: "What does a first consultation include?", a: "A one-on-one session with one of our dermatologists. We assess your skin or hair concern, discuss medical history, and share a written treatment plan with realistic timelines. There is no obligation to book any procedure." },
  { q: "How is the cost of a treatment determined?", a: "Your dermatologist shares a complete, itemised plan during your consultation once your skin has been assessed. Plans are shared before any treatment begins, never high-pressure, never surprise-billed. We are happy to share an estimate range on WhatsApp before you book." },
  { q: "Where is Dermaheal located?", a: "Dermaheal Skin & Hair Clinic is at C-712, Ramphal Chowk, Block D, Sector 7 Dwarka, near Shiksha Bharti School, New Delhi 110075. We are easily reachable from across West Delhi and Gurgaon." },
  { q: "What are your clinic hours?", a: "Monday to Saturday, 10:00 AM to 7:30 PM. Sunday, 10:00 AM to 7:00 PM. Same-day slots are usually available, call +91 80809 10191 or WhatsApp us to check availability." },
  { q: "What is the typical downtime after a treatment?", a: "Most of our treatments, medifacials, chemical peels, laser toning, IPL, have zero downtime. MNRF, thread lifts and certain laser procedures have 3 to 7 days of social downtime. We always tell you what to expect and plan the procedure around your schedule." },
];

export const TRUST_ITEMS = [
  { icon: "award", text: "Dermatologist-led" },
  { icon: "sparkle", text: "Calibrated for Indian skin" },
  { icon: "calendar", text: "6-month outcome support" },
];

export const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Treatments: [
    { label: "Hair Transplant", href: "/treatments/hair-transplant" },
    { label: "Chemical Peel", href: "/treatments/chemical-peeling" },
    { label: "MNRF Treatment", href: "/treatments/mnrf" },
    { label: "Cosmelan", href: "/treatments/cosmelan" },
    { label: "Acne Scar Reduction", href: "/treatments/acne-scar-reduction" },
    { label: "All Treatments", href: "/treatments" },
  ],
  Concerns: [
    { label: "Acne & Scars", href: "/concerns/acne" },
    { label: "Pigmentation & Melasma", href: "/concerns/pigmentation-melasma" },
    { label: "Hair Loss", href: "/concerns/hair-loss-thinning" },
    { label: "Anti-Ageing", href: "/concerns/anti-ageing-wrinkles" },
    { label: "Unwanted Hair", href: "/concerns/unwanted-hair" },
  ],
  Clinic: [
    { label: "Our Doctors", href: "/doctors" },
    { label: "Patient Results", href: "/results" },
    { label: "Patient Stories", href: "/#testimonials" },
    { label: "FAQs", href: "/#faq" },
    { label: "Contact", href: "/#contact" },
  ],
  Resources: [
    { label: "Book a Consultation", href: "/#book" },
    { label: "Shop", href: "https://dermaheal.co.in/shop" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};
