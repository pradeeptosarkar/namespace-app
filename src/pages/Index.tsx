import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Progress } from "@/components/ui/progress";
import Logo from "@/components/Logo";
import HeroSection from "@/components/sections/HeroSection";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollTop = container.scrollTop;
      const maxScrollTop = container.scrollHeight - container.clientHeight;
      const progress = maxScrollTop > 0 ? (scrollTop / maxScrollTop) * 100 : 0;
      
      setScrollProgress(progress);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial calculation
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const sectionHeight = window.innerHeight;
      
      if (e.key === "ArrowDown") {
        e.preventDefault();
        container.scrollBy({ top: sectionHeight, behavior: "smooth" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        container.scrollBy({ top: -sectionHeight, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);


  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Progress 
          value={scrollProgress} 
          className="h-1 rounded-none bg-transparent"
        />
      </div>

      {/* Logo */}
      <Logo />
      
      <div 
        ref={scrollContainerRef}
        className="vertical-scroll"
      >
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
        </Suspense>
      </div>
    </>
  );
};

export default Index;
