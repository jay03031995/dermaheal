import { BookingProvider } from "@/components/BookingContext";
import Announcement from "@/components/Announcement";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FabStack from "@/components/FabStack";
import BookingModal from "@/components/BookingModal";
import RevealInit from "@/components/RevealInit";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema, websiteSchema } from "@/lib/schema";
import { getClinic, getDoctors } from "@/sanity/lib/fetchers";
import { createDoctorOptions } from "@/data/appointments";

/**
 * Safety-net revalidation: every page under (site)/ re-renders at most once
 * per hour. For instant updates, Sanity's webhook hits /api/revalidate which
 * calls revalidateTag("sanity").
 */
export const revalidate = 3600;

export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [clinic, doctors] = await Promise.all([getClinic(), getDoctors()]);
  const navDoctors = doctors.map(({ slug, name, title }) => ({
    slug,
    name,
    title,
  }));
  const bookingDoctors = createDoctorOptions(doctors);

  return (
    <>
      <JsonLd
        data={[
          {
            ...localBusinessSchema,
            logo: clinic.logoUrl ?? localBusinessSchema.logo,
          },
          websiteSchema,
        ]}
      />
      <BookingProvider>
        <Announcement />
        <Navbar clinic={clinic} doctors={navDoctors} />
        <main>{children}</main>
        <Footer clinic={clinic} />
        <FabStack clinic={clinic} />
        <BookingModal clinic={clinic} doctors={bookingDoctors} />
      </BookingProvider>
      <RevealInit />
    </>
  );
}
