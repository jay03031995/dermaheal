import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CLINIC } from "@/data/clinic";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dermaheal.co.in"),
  title: {
    default: "Dermaheal Skin & Hair Clinic — Top Dermatologist in Dwarka, Delhi",
    template: "%s — Dermaheal Skin & Hair Clinic",
  },
  description:
    "Dermaheal is Dwarka's MD-led skin and hair clinic. 27+ advanced treatments — hair transplant, Botox, MNRF, Cosmelan, laser hair reduction and more, calibrated for Indian skin.",
  keywords: [
    "dermatologist in Dwarka",
    "skin clinic Dwarka Delhi",
    "hair transplant Dwarka",
    "MNRF treatment Delhi",
    "Cosmelan melasma treatment",
    "laser hair reduction Dwarka",
    "Botox Dwarka",
    "acne scar treatment Delhi",
    "hair PRP Dwarka",
  ],
  authors: [{ name: CLINIC.name }],
  creator: CLINIC.name,
  publisher: CLINIC.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://dermaheal.co.in",
    siteName: CLINIC.name,
    title: "Dermaheal Skin & Hair Clinic — Top Dermatologist in Dwarka, Delhi",
    description:
      "MD-led dermatology, aesthetics and trichology in Dwarka, New Delhi. Calibrated for Indian skin, grounded in clinical evidence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dermaheal Skin & Hair Clinic — Dwarka, New Delhi",
    description:
      "MD-led dermatology, aesthetics and trichology. 27+ advanced treatments calibrated for Indian skin.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
