import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Concerns from "@/components/home/Concerns";
import Treatments from "@/components/home/Treatments";
import WhyUs from "@/components/home/WhyUs";
import DoctorsSection from "@/components/home/DoctorsSection";
import Results from "@/components/home/Results";
import Testimonials from "@/components/home/Testimonials";
import Insights from "@/components/home/Insights";
import Faq from "@/components/home/Faq";
import SimpleBook from "@/components/home/SimpleBook";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Concerns />
      <Treatments />
      <WhyUs />
      <DoctorsSection />
      <Results />
      <Testimonials />
      <Insights />
      <Faq />
      <SimpleBook />
      <Contact />
    </>
  );
}
