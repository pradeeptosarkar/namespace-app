import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const taglines = [
    "Empowering students to learn better",
    "Innovating education delivery through technology",
    "Building bridges between professionals and opportunities",
    "Delivering better talent solutions for businesses",
    "Creating the future through collaborative innovation",
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

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
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
      setShowCursor((prev) => !prev);
    }, 1200); // Slower, more professional timing

    return () => clearInterval(interval);
  }, []);

  // Video hover effects
  const handleVideoHover = () => {
    if (videoRef.current && isPlaying) {
      videoRef.current.playbackRate = 0.5; // Slow motion on hover
    }
  };

  const handleVideoLeave = () => {
    if (videoRef.current && isPlaying) {
      videoRef.current.playbackRate = 1; // Normal speed
    }
  };

  // Play/Pause on click
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <section
      id="hero"
      className="scroll-section bg-background text-foreground relative overflow-hidden section-transition min-h-screen"
    >
      {/* Interactive gradient background with glassmorphism */}
      <div
        className="absolute inset-0 opacity-15 shimmer-effect"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--namespace-purple)) 0%, transparent 50%)`,
        }}
      />

      {/* Subtle overlay */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-namespace-purple/5 rounded-full" />

      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-namespace-purple/20 rotate-45 animate-pulse" />
        <div className="absolute top-40 right-40 w-24 h-24 border border-namespace-purple/30 rounded-full" />
        <div
          className="absolute bottom-32 left-32 w-16 h-16 bg-namespace-purple/10 rotate-12 animate-bounce"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-60 left-1/4 w-8 h-40 bg-gradient-to-b from-namespace-purple/20 to-transparent rotate-45" />
        <div className="absolute bottom-40 right-20 w-20 h-20 border-l-2 border-t-2 border-namespace-purple/25 rotate-45" />
      </div>

      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-namespace-purple/3 rounded-full" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-namespace-purple/2 rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="flex w-full items-center justify-between">
          {/* Left side content */}
          <div className="lg:pl-12 flex-1 text-center lg:text-left">
            <div className="space-y-6 progressive-reveal">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-background/80 border border-primary/20 px-6 py-3 rounded-full">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-base md:text-sm font-medium text-primary transition-all duration-500">
                    {taglines[currentTaglineIndex]}
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl font-sora font-bold leading-tight">
                  Welcome to
                  <br />
                  <span className="text-primary inline-flex items-center justify-center lg:justify-start">
                    {typedText}
                    <span
                      className={`ml-1 w-1 h-12 sm:h-16 md:h-14 lg:h-16 bg-primary transition-all duration-700 ease-in-out ${
                        showCursor ? "opacity-100" : "opacity-30"
                      }`}
                    />
                  </span>
                </h1>

                <p className="text-lg sm:text-xl md:text-xl lg:text-xl text-muted-foreground max-w-2xl font-inter mx-auto lg:mx-0">
                  Building the Ecosystem for Humans and Organizations in Tech
                </p>
              </div>

              {/* Two buttons commented out */}
              {/* <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-namespace-purple hover:bg-primary-hover text-namespace-white px-8 py-6 text-lg font-semibold group shadow-elegant hover:shadow-orbital transition-all duration-300 magnetic-element glass-glow"
                >
                  Explore Our Ecosystem
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="glassmorphism border-2 border-namespace-purple text-namespace-purple hover:bg-namespace-purple hover:text-namespace-white px-8 py-6 text-lg font-semibold transition-all duration-300 magnetic-element"
                >
                  Watch Our Story
                </Button>
              </div> */}
            </div>
          </div>

          {/* Right side - Animated Video Logo */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="relative">
              {/* Subtle geometric frame around video */}
              <div
                className="absolute inset-0 w-64 h-64 xl:w-80 xl:h-80 border border-namespace-purple/10 rounded-full animate-spin opacity-50"
                style={{ animationDuration: "40s" }}
              />
              <div
                className="absolute inset-4 w-56 h-56 xl:w-72 xl:h-72 border border-namespace-purple/15 rounded-full animate-spin opacity-30"
                style={{
                  animationDuration: "60s",
                  animationDirection: "reverse",
                }}
              />

              {/* Video element with enhanced effects */}
              <div className="relative w-48 h-48 xl:w-96 xl:h-96 rounded-full overflow-hidden magnetic-element">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onMouseEnter={handleVideoHover}
                  onMouseLeave={handleVideoLeave}
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-700 ease-in-out"
                  style={{
                    filter: "drop-shadow(0 0 30px rgba(147, 51, 234, 0.3))",
                  }}
                >
                  <source
                    src="/path-to-your-logo-video.webm"
                    type="video/webm"
                  />
                  <source
                    src="/lovable-uploads/logo-video.mp4"
                    type="video/mp4"
                  />
                  {/* Fallback image */}
                  <img
                    src="/lovable-uploads/44644046-4947-45b3-8da2-466f5e98beb9.png"
                    alt="NAMESPACE Logo - Building the ecosystem for humans and organizations in tech"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                </video>

                {/* Glow effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-namespace-purple/20 to-transparent opacity-40 pointer-events-none" />
              </div>

              {/* Subtle floating elements */}
              <div className="absolute top-12 right-12 w-2 h-2 bg-namespace-purple/40 rounded-full animate-[float_6s_ease-in-out_infinite]" />
              <div
                className="absolute bottom-16 left-8 w-1.5 h-1.5 bg-namespace-purple/30 rounded-full animate-[float_8s_ease-in-out_infinite]"
                style={{ animationDelay: "2s" }}
              />
              <div
                className="absolute top-28 left-12 w-1 h-1 bg-namespace-purple/25 rounded-full animate-[float_7s_ease-in-out_infinite]"
                style={{ animationDelay: "4s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
