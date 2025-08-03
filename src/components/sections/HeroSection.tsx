import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const taglines = [
    "Empowering the next generation of tech innovators",
    "Where brilliant minds converge to shape tomorrow",
    "Building bridges between potential and possibility", 
    "Transforming ideas into digital reality",
    "Creating the future through collaborative innovation"
  ];

  const targetText = "NAMESPACE";

  // Mouse tracking for interactive gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing animation
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (typedText.length < targetText.length) {
      timeout = setTimeout(() => {
        setTypedText(targetText.slice(0, typedText.length + 1));
      }, 150);
    }

    return () => clearTimeout(timeout);
  }, [typedText, targetText]);

  // Rotating taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [taglines.length]);

  // Cursor smooth fade animation
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 1200); // Slower, more professional timing

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="scroll-section bg-namespace-white text-namespace-black relative overflow-hidden">
      {/* Interactive gradient background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--namespace-purple)) 0%, transparent 50%)`
        }}
      />
      
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-namespace-purple/20 rotate-45 animate-pulse" />
        <div className="absolute top-40 right-40 w-24 h-24 border border-namespace-purple/30 rounded-full" />
        <div className="absolute bottom-32 left-32 w-16 h-16 bg-namespace-purple/10 rotate-12 animate-bounce" style={{ animationDelay: '2s' }} />
        <div className="absolute top-60 left-1/4 w-8 h-40 bg-gradient-to-b from-namespace-purple/20 to-transparent rotate-45" />
        <div className="absolute bottom-40 right-20 w-20 h-20 border-l-2 border-t-2 border-namespace-purple/25 rotate-45" />
      </div>
      
      {/* Background orbital elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-orbital rounded-full blur-3xl animate-orbital-float" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-namespace-purple-light rounded-full blur-2xl animate-orbital-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="flex w-full">
          {/* Left side content */}
          <div className="flex-1 max-w-4xl">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-namespace-purple-light px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-namespace-purple rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-namespace-purple transition-all duration-500">
                    {taglines[currentTaglineIndex]}
                  </span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-[clamp(3rem,5vw,6rem)] xl:text-[clamp(4rem,6vw,8rem)] font-sora font-bold leading-tight">
                  Welcome to
                  <br />
                  <span className="bg-gradient-purple bg-clip-text text-transparent inline-flex items-center">
                    {typedText}
                    <span className={`ml-1 w-1 h-8 sm:h-12 md:h-16 lg:h-[clamp(3rem,4vw,5rem)] xl:h-[clamp(4rem,5vw,6rem)] bg-namespace-purple transition-all duration-700 ease-in-out ${showCursor ? 'opacity-100' : 'opacity-30'}`} />
                  </span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-[clamp(1.25rem,1.5vw,2rem)] xl:text-[clamp(1.5rem,1.8vw,2.5rem)] text-muted-foreground max-w-2xl font-inter">
                  Where human potential meets technological innovation. We're building the infrastructure for tomorrow's tech leaders.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-namespace-purple hover:bg-primary-hover text-namespace-white px-8 py-6 text-lg font-semibold group shadow-elegant hover:shadow-orbital transition-all duration-300"
                >
                  Explore Our Ecosystem
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-namespace-purple text-namespace-purple hover:bg-namespace-purple hover:text-namespace-white px-8 py-6 text-lg font-semibold transition-all duration-300"
                >
                  Watch Our Story
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Animated Logo */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="relative">
              {/* Subtle geometric frame around logo */}
              <div className="absolute inset-0 lg:w-[clamp(16rem,20vw,24rem)] lg:h-[clamp(16rem,20vw,24rem)] xl:w-[clamp(20rem,25vw,30rem)] xl:h-[clamp(20rem,25vw,30rem)] border border-namespace-purple/10 rounded-full animate-spin opacity-50" style={{ animationDuration: '40s' }} />
              <div className="absolute inset-4 lg:w-[clamp(14rem,18vw,22rem)] lg:h-[clamp(14rem,18vw,22rem)] xl:w-[clamp(18rem,23vw,28rem)] xl:h-[clamp(18rem,23vw,28rem)] border border-namespace-purple/15 rounded-full animate-spin opacity-30" style={{ animationDuration: '60s', animationDirection: 'reverse' }} />
              
              {/* Main logo with subtle breathing animation */}
              <img 
                src="/lovable-uploads/44644046-4947-45b3-8da2-466f5e98beb9.png"
                alt="NAMESPACE Logo"
                className="lg:w-[clamp(14rem,18vw,22rem)] lg:h-[clamp(14rem,18vw,22rem)] xl:w-[clamp(18rem,23vw,28rem)] xl:h-[clamp(18rem,23vw,28rem)] hover:scale-105 transition-all duration-700 ease-in-out relative z-10 animate-[breathing_4s_ease-in-out_infinite]"
              />
              
              {/* Subtle floating elements */}
              <div className="absolute top-12 right-12 w-2 h-2 bg-namespace-purple/40 rounded-full animate-[float_6s_ease-in-out_infinite]" />
              <div className="absolute bottom-16 left-8 w-1.5 h-1.5 bg-namespace-purple/30 rounded-full animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
              <div className="absolute top-28 left-12 w-1 h-1 bg-namespace-purple/25 rounded-full animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '4s' }} />
            </div>
          </div>
        </div>
        
        {/* Scroll hint */}
        <div className="absolute bottom-8 right-8 hidden lg:flex items-center space-x-2 text-muted-foreground">
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronRight className="w-4 h-4 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;