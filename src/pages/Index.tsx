import { useEffect, useState, lazy, Suspense } from "react";
import { Progress } from "@/components/ui/progress";
import HeroSection from "@/components/sections/HeroSection";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";

// Lazy load sections for better performance
const ProblemSection = lazy(() => import("@/components/sections/ProblemSection"));
const SecondHeroSection = lazy(() => import("@/components/sections/SecondHeroSection"));
const WhoWeServeSection = lazy(() => import("@/components/sections/WhoWeServeSection"));
const EcosystemFlywheelSection = lazy(() => import("@/components/sections/EcosystemFlywheelSection"));
const ImpactSection = lazy(() => import("@/components/sections/ImpactSection"));
const HackHazardsSection = lazy(() => import("@/components/sections/HackHazardsSection"));
const ProgramsSection = lazy(() => import("@/components/sections/ProgramsSection"));
const PartnersSection = lazy(() => import("@/components/sections/PartnersSection"));
const ContactSection = lazy(() => import("@/components/sections/ContactSection"));

const Index = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Progress 
          value={scrollProgress} 
          className="h-1 rounded-none bg-transparent"
        />
      </div>

      <div className="w-full snap-y snap-mandatory h-screen overflow-y-scroll">
        <HeroSection />
        <Suspense fallback={
          <div className="scroll-section min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <ProblemSection />
        </Suspense>
        <Suspense fallback={
          <div className="scroll-section min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <SecondHeroSection />
        </Suspense>
        <Suspense fallback={
          <div className="scroll-section min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <WhoWeServeSection />
        </Suspense>
        <Suspense fallback={
          <div className="scroll-section min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <EcosystemFlywheelSection />
        </Suspense>
        <Suspense fallback={
          <div className="scroll-section min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <ImpactSection />
        </Suspense>
        <Suspense fallback={
          <div className="scroll-section min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <HackHazardsSection />
        </Suspense>
        <Suspense fallback={
          <div className="scroll-section min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <ProgramsSection />
        </Suspense>
        <Suspense fallback={
          <div className="scroll-section min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <PartnersSection />
        </Suspense>
        <Suspense fallback={
          <div className="scroll-section min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <ContactSection />
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
