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
    <div className={`fixed top-6 right-6 z-40 ${logoColor} transition-colors duration-300`}>
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-purple rounded-full flex items-center justify-center">
          <div className="w-3 h-3 border-2 border-namespace-white rounded-full animate-orbital-float" />
        </div>
        <span className="font-sora font-bold text-2xl">NAMESPACE</span>
      </div>
    </div>
  );
};

export default Logo;