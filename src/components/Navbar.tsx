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
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection(0)}
              className="text-sm font-medium text-namespace-black hover:text-namespace-purple transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection(1)}
              className="text-sm font-medium text-namespace-black hover:text-namespace-purple transition-colors"
            >
              Problem
            </button>
            <button 
              onClick={() => scrollToSection(4)}
              className="text-sm font-medium text-namespace-black hover:text-namespace-purple transition-colors"
            >
              HACKHAZARDS
            </button>
            <button 
              onClick={() => scrollToSection(7)}
              className="text-sm font-medium text-namespace-black hover:text-namespace-purple transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-namespace-black/90 backdrop-blur-md md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button 
              onClick={() => scrollToSection(0)}
              className="text-2xl font-medium text-namespace-white hover:text-namespace-purple-glow transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection(1)}
              className="text-2xl font-medium text-namespace-white hover:text-namespace-purple-glow transition-colors"
            >
              Problem
            </button>
            <button 
              onClick={() => scrollToSection(4)}
              className="text-2xl font-medium text-namespace-white hover:text-namespace-purple-glow transition-colors"
            >
              HACKHAZARDS
            </button>
            <button 
              onClick={() => scrollToSection(7)}
              className="text-2xl font-medium text-namespace-white hover:text-namespace-purple-glow transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;