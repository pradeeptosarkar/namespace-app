import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SecondHeroSection from "@/components/sections/SecondHeroSection";
import WhoWeServeSection from "@/components/sections/WhoWeServeSection";
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
      
      if (e.key === "ArrowRight") {
        e.preventDefault();
        container.scrollBy({ left: sectionWidth, behavior: "smooth" });
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        container.scrollBy({ left: -sectionWidth, behavior: "smooth" });
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
      
      <div 
        ref={scrollContainerRef}
        className="horizontal-scroll"
      >
        <HeroSection />
        <ProblemSection />
        <SecondHeroSection />
        <WhoWeServeSection />
        <HackHazardsSection />
        <ProgramsSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </>
  );
};

export default Index;
