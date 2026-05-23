export type Concern = {
  id: string;
  name: string;
  count: string;
  icon: string;
};

export const CONCERNS: Concern[] = [
  { id: "acne", name: "Acne & Acne Scars", count: "Chemical peels · MNRF", icon: "◍" },
  { id: "pigment", name: "Pigmentation & Melasma", count: "Cosmelan · Dermamelan", icon: "◐" },
  { id: "aging", name: "Anti-Ageing & Wrinkles", count: "Botox · Fillers · HIFU", icon: "✺" },
  { id: "hairloss", name: "Hair Loss & Thinning", count: "PRP · Transplant · GFC", icon: "❋" },
  { id: "laser", name: "Unwanted Hair", count: "Laser hair reduction", icon: "⟡" },
  { id: "glow", name: "Dull Skin & Brightening", count: "Glutathione · Medifacial", icon: "✦" },
  { id: "fat", name: "Stubborn Fat Pockets", count: "Lipolysis injections", icon: "◊" },
  { id: "lift", name: "Facial Sagging", count: "Thread lift · HIFU", icon: "✶" },
  { id: "vitiligo", name: "Vitiligo", count: "Targeted protocols", icon: "◉" },
  { id: "tattoo", name: "Tattoo Removal", count: "Q-Switch laser", icon: "◬" },
  { id: "nails", name: "Nail & Cyst Issues", count: "Day-care surgery", icon: "○" },
  { id: "scars", name: "Scar Reduction", count: "MNRF · Subcision", icon: "≋" },
];
