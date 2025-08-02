import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
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
      <Navbar />
      
      {/* Horizontal Scroll Container */}
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
