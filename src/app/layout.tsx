import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BookingProvider } from "@/components/BookingContext";
import Announcement from "@/components/Announcement";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FabStack from "@/components/FabStack";
import BookingModal from "@/components/BookingModal";
import RevealInit from "@/components/RevealInit";
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: CLINIC.name,
  description:
    "MD-led skin and hair clinic in Dwarka, New Delhi offering advanced dermatology, aesthetics and trichology treatments calibrated for Indian skin.",
  url: "https://dermaheal.co.in",
  telephone: ["+918080910191", "+917379464999"],
  email: CLINIC.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "C-712, Ramphal Chowk, Block D, Sector 7 Dwarka, Palam",
    addressLocality: "Dwarka",
    addressRegion: "New Delhi",
    postalCode: "110075",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: "28.5866", longitude: "77.0336" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "10:00",
      closes: "19:00",
    },
  ],
  medicalSpecialty: "Dermatology",
  priceRange: "$$",
  sameAs: [CLINIC.social.instagram, CLINIC.social.youtube, CLINIC.social.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${cormorant.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <BookingProvider>
          <Announcement />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FabStack />
          <BookingModal />
        </BookingProvider>
        <RevealInit />
      </body>
    </html>
  );
}
