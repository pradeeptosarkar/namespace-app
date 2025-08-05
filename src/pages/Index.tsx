import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

      {/* Navigation */}
      <Navbar />
      
      {/* Sections with anchor IDs */}
      <div className="w-full">
        <section id="home">
          <HeroSection />
        </section>
        <section id="problem">
          <ProblemSection />
        </section>
        <section id="solution">
          <SecondHeroSection />
        </section>
        <section id="who-we-serve">
          <WhoWeServeSection />
        </section>
        <section id="hackhazards">
          <HackHazardsSection />
        </section>
        <section id="programs">
          <ProgramsSection />
        </section>
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </div>
    </>
  );
};

export default Index;
