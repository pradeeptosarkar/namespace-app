import { useEffect, useState } from "react";

const Logo = () => {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.querySelector('.horizontal-scroll');
      if (!container) return;
      
      const scrollLeft = container.scrollLeft;
      const sectionWidth = window.innerWidth;
      const currentSectionIndex = Math.round(scrollLeft / sectionWidth);
      
      setCurrentSection(currentSectionIndex);
    };

    const container = document.querySelector('.horizontal-scroll');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial calculation
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Sections: Hero(0), Problem(1), SecondHero(2), WhoWeServe(3), HackHazards(4), Programs(5), Testimonials(6), Contact(7)
  // Black backgrounds (use white logo): sections 1, 3, 5, 7
  // White backgrounds (use purple logo): sections 0, 2, 4, 6
  const isWhiteBackground = [0, 2, 4, 6].includes(currentSection);
  const logoColor = isWhiteBackground ? 'text-namespace-purple' : 'text-namespace-white';

  return (
    <div className="fixed top-6 right-6 z-40 transition-opacity duration-300">
      <img 
        src={isWhiteBackground ? "/lovable-uploads/44644046-4947-45b3-8da2-466f5e98beb9.png" : "/lovable-uploads/27940758-e8d3-4460-b88e-21b8102f741f.png"}
        alt="NAMESPACE Logo"
        className="w-12 h-12 transition-opacity duration-300"
      />
    </div>
  );
};

export default Logo;