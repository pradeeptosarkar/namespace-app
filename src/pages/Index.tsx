import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import Logo from "@/components/Logo";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SecondHeroSection from "@/components/sections/SecondHeroSection";
import WhoWeServeSection from "@/components/sections/WhoWeServeSection";
import EcosystemFlywheelSection from "@/components/sections/EcosystemFlywheelSection";
import ImpactSection from "@/components/sections/ImpactSection";
import HackHazardsSection from "@/components/sections/HackHazardsSection";
import ProgramsSection from "@/components/sections/ProgramsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const progress = maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * 100 : 0;
      
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
      const sectionWidth = window.innerWidth;
      
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        container.scrollBy({ left: sectionWidth, behavior: "smooth" });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        container.scrollBy({ left: -sectionWidth, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only apply on desktop screens (width >= 1024px)
      if (window.innerWidth < 1024) return;
      
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      
      // Prevent default vertical scrolling
      e.preventDefault();
      
      // Convert vertical scroll to horizontal scroll with reduced speed
      // Reduce scroll sensitivity for touchpad and add smooth animation
      const scrollAmount = e.deltaY * 0.4; // Reduce speed by 60% total
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    // Add wheel event listener to the document
    document.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => document.removeEventListener("wheel", handleWheel);
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
        className="horizontal-scroll"
      >
        <HeroSection />
        <ProblemSection />
        <SecondHeroSection />
        <WhoWeServeSection />
        <EcosystemFlywheelSection />
        <ImpactSection />
        <HackHazardsSection />
        <ProgramsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </>
  );
};

export default Index;
