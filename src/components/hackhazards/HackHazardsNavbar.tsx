import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import hh26Logo from '@/assets/hh26-logo-green.png';
import { CTAButton } from './CTAButton';
import { RegistrationTimer } from './RegistrationTimer';

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
  const [isSecondaryOpen, setIsSecondaryOpen] = useState(false);
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
    setIsSecondaryOpen(false);
  };

  return (
    <>
      {/* Main Navbar - Always Visible */}
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

          {/* Timer - Desktop Only */}
          <div className="hidden md:flex items-center flex-1 justify-center">
            <RegistrationTimer />
          </div>

          {/* Desktop: CTA Buttons + Hamburger */}
          <div className="hidden md:flex items-center gap-4">
            <CTAButton variant="secondary" size="default">
              Register Interest
            </CTAButton>
            <CTAButton variant="primary" size="default">
              Join Community
            </CTAButton>
            <button
              onClick={() => setIsSecondaryOpen(!isSecondaryOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 hover:bg-muted rounded-md transition-colors"
            >
              {isSecondaryOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile: Only Hamburger */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
            onClick={() => setIsSecondaryOpen(!isSecondaryOpen)}
            aria-label="Toggle navigation menu"
          >
            {isSecondaryOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </nav>
      </header>

      {/* Secondary Collapsible Navbar */}
      {isSecondaryOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Timer */}
            <div className="md:hidden mb-4 flex justify-center">
              <RegistrationTimer />
            </div>

            {/* Navigation Items */}
            <div className="grid grid-cols-2 md:flex md:justify-center gap-2 mb-4">
              {navItems.map(({ label, href }) => (
                <button
                  key={href}
                  onClick={() => scrollToSection(href)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md transition-colors text-center",
                    activeSection === href.slice(1)
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile CTA Buttons */}
            <div className="md:hidden flex flex-col gap-3">
              <CTAButton 
                variant="secondary" 
                size="default"
                className="w-full justify-center"
              >
                Register Interest
              </CTAButton>
              <CTAButton 
                variant="primary" 
                size="default"
                className="w-full justify-center"
              >
                Join Community
              </CTAButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
};