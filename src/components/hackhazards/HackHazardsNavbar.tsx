import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import hh26Logo from '@/assets/hh26-logo-green.png';

const navItems = [
  { label: 'Hero', href: '#hero' },
  { label: 'Vision', href: '#vision' },
  { label: 'Past Stats', href: '#past-stats' },
  { label: 'Pillars', href: '#pillars' },
  { label: 'Themes', href: '#themes' },
  { label: 'Opportunities', href: '#opportunities' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'FAQs', href: '#faqs' },
];

export const HackHazardsNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    navItems.forEach(({ href }) => {
      const element = document.querySelector(href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src={hh26Logo} 
            alt="HACKHAZARDS '26 Logo" 
            className="h-8 w-auto"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollToSection(href)}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                activeSection === href.slice(1)
                  ? "text-namespace-purple bg-namespace-purple/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollToSection(href)}
                className={cn(
                  "block w-full text-left px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  activeSection === href.slice(1)
                    ? "text-namespace-purple bg-namespace-purple/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};