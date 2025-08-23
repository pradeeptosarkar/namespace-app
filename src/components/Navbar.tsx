import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionIndex: number) => {
    const container = document.querySelector('.horizontal-scroll');
    if (container) {
      const sectionWidth = window.innerWidth;
      container.scrollTo({
        left: sectionIndex * sectionWidth,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const navigationItems = [
    { name: 'Home', index: 0, id: 'hero' },
    { name: 'Problem', index: 1, id: 'problem' },
    { name: 'Solution', index: 2, id: 'solution' },
    { name: 'Who We Serve', index: 3, id: 'who-we-serve' },
    { name: 'Ecosystem', index: 4, id: 'ecosystem' },
    { name: 'Impact', index: 5, id: 'impact' },
    { name: 'HackHazards', index: 6, id: 'hackhazards' },
    { name: 'Programs', index: 7, id: 'programs' },
    { name: 'Testimonials', index: 8, id: 'testimonials' },
    { name: 'Contact', index: 9, id: 'contact' }
  ];

  return (
    <>
      {/* Floating Navbar */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-namespace-white/90 backdrop-blur-md border border-border rounded-full px-6 py-3 shadow-elegant">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-purple rounded-full flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-namespace-white rounded-full animate-orbital-float" />
            </div>
            <span className="font-sora font-bold text-lg text-namespace-black">NAMESPACE</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navigationItems.slice(0, 5).map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.index)}
                className="text-sm font-medium text-namespace-black hover:text-namespace-purple transition-colors px-2 py-1 rounded-md hover:bg-namespace-purple/10"
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
              </button>
            ))}
            <div className="w-px h-4 bg-border" />
            <button 
              onClick={() => scrollToSection(9)}
              className="text-sm font-medium bg-namespace-purple text-namespace-white px-4 py-2 rounded-full hover:bg-namespace-purple/90 transition-colors"
              aria-label="Navigate to Contact section"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-namespace-black/90 backdrop-blur-md md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-6 px-6">
            {navigationItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.index)}
                className="text-xl font-medium text-namespace-white hover:text-namespace-purple-glow transition-colors text-center"
                aria-label={`Navigate to ${item.name} section`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;