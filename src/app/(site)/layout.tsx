import { BookingProvider } from "@/components/BookingContext";
import Announcement from "@/components/Announcement";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FabStack from "@/components/FabStack";
import BookingModal from "@/components/BookingModal";
import RevealInit from "@/components/RevealInit";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema } from "@/lib/schema";

/**
 * Safety-net revalidation: every page under (site)/ re-renders at most once
 * per 60 seconds, picking up Sanity edits automatically. For instant updates,
 * Sanity's webhook hits /api/revalidate which calls revalidateTag("sanity").
 */
export const revalidate = 60;

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <BookingProvider>
        <Announcement />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FabStack />
        <BookingModal />
      </BookingProvider>
      <RevealInit />
    </>
  );
}
