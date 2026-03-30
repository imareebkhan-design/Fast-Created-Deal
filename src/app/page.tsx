import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import TickerStrip from "@/components/TickerStrip";
import ProblemSection from "@/components/ProblemSection";
import CaseStudies from "@/components/CaseStudies";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import EMICalculator from "@/components/EMICalculator";
import LeadForm from "@/components/LeadForm";
import WhyUsSection from "@/components/WhyUsSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileStickyBar from "@/components/MobileStickyBar";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: "#FAFAFA" }}>
      <Navbar />
      <Hero />
      <StatsStrip />
      <TickerStrip />
      <ProblemSection />
      <CaseStudies />
      <WhyChooseUs />
      <HowItWorks />
      <EMICalculator />
      <LeadForm />
      <WhyUsSection />
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
      <ScrollToTop />
    </main>
  );
}
