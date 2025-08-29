import { Rocket, Users, Target, Clock, Sparkles } from "lucide-react";
import SEOLazyImage from "@/components/SEOLazyImage";

// Custom SVG icons as components
const MissionIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="25" cy="30" r="4" />
    <circle cx="75" cy="30" r="4" />
    <circle cx="50" cy="60" r="4" />
    <circle cx="20" cy="70" r="4" />
    <circle cx="80" cy="70" r="4" />
    <path d="M25 30 L50 60" />
    <path d="M75 30 L50 60" />
    <path d="M50 60 L20 70" />
    <path d="M50 60 L80 70" />
    <path d="M25 30 L20 70" />
    <path d="M75 30 L80 70" />
    <rect x="35" y="15" width="8" height="12" />
    <rect x="57" y="15" width="8" height="12" />
    <path d="M35 27 L43 27" />
    <path d="M57 27 L65 27" />
    <circle cx="15" cy="45" r="1" />
    <circle cx="85" cy="45" r="1" />
    <circle cx="50" cy="20" r="1" />
  </svg>
);

const StudentCommunityIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="35" cy="35" r="8" />
    <path d="M20 50 L35 45 L50 50" />
    <path d="M35 45 L35 52" />
    <circle cx="65" cy="35" r="8" />
    <path d="M50 50 L65 45 L80 50" />
    <path d="M65 45 L65 52" />
    <rect x="25" y="65" width="6" height="8" />
    <rect x="32" y="63" width="6" height="8" />
    <rect x="39" y="65" width="6" height="8" />
    <path d="M55 65 Q65 60 75 65" />
    <path d="M55 70 Q65 65 75 70" />
    <path d="M55 75 Q65 70 75 75" />
    <path d="M43 40 L57 40" strokeDasharray="2,2" />
  </svg>
);

const EventsIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="30" y="50" width="40" height="20" />
    <rect x="35" y="45" width="30" height="5" />
    <circle cx="50" cy="35" r="4" />
    <path d="M50 39 L50 45" />
    <path d="M46 42 L54 42" />
    <circle cx="20" cy="75" r="3" />
    <circle cx="30" cy="78" r="3" />
    <circle cx="40" cy="75" r="3" />
    <circle cx="60" cy="75" r="3" />
    <circle cx="70" cy="78" r="3" />
    <circle cx="80" cy="75" r="3" />
    <rect x="15" y="20" width="20" height="15" />
    <path d="M20 25 L30 25" />
    <path d="M20 28 L28 28" />
    <path d="M20 31 L25 31" />
    <rect x="65" y="20" width="20" height="15" />
    <path d="M70 25 L75 30 L80 25" />
    <circle cx="75" cy="30" r="2" />
  </svg>
);

const GlobalMovementIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="50" cy="50" r="35" />
    <path d="M25 35 Q30 30 40 35 Q45 40 35 45 Q30 40 25 35" />
    <path d="M60 30 Q70 25 75 35 Q70 45 60 40 Q55 35 60 30" />
    <path d="M40 60 Q50 55 60 65 Q55 75 45 70 Q40 65 40 60" />
    <circle cx="25" cy="25" r="2" />
    <circle cx="75" cy="25" r="2" />
    <circle cx="85" cy="50" r="2" />
    <circle cx="75" cy="75" r="2" />
    <circle cx="25" cy="75" r="2" />
    <circle cx="15" cy="50" r="2" />
    <path d="M25 25 Q37.5 37.5 50 50" strokeDasharray="1,2" />
    <path d="M75 25 Q62.5 37.5 50 50" strokeDasharray="1,2" />
    <path d="M85 50 Q67.5 50 50 50" strokeDasharray="1,2" />
    <path d="M75 75 Q62.5 62.5 50 50" strokeDasharray="1,2" />
    <path d="M25 75 Q37.5 62.5 50 50" strokeDasharray="1,2" />
    <path d="M15 50 Q32.5 50 50 50" strokeDasharray="1,2" />
  </svg>
);

const HumanTechIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M50 75 C40 65, 20 45, 20 30 C20 20, 30 15, 40 20 C45 25, 50 30, 50 30 C50 30, 55 25, 60 20 C70 15, 80 20, 80 30 C80 45, 60 65, 50 75 Z" />
    <circle cx="40" cy="35" r="2" />
    <circle cx="60" cy="35" r="2" />
    <circle cx="50" cy="50" r="2" />
    <circle cx="35" cy="50" r="2" />
    <circle cx="65" cy="50" r="2" />
    <path d="M40 35 L50 50" />
    <path d="M60 35 L50 50" />
    <path d="M35 50 L50 50" />
    <path d="M65 50 L50 50" />
    <path d="M40 35 L35 50" />
    <path d="M60 35 L65 50" />
    <rect x="45" y="40" width="4" height="2" />
    <rect x="51" y="40" width="4" height="2" />
    <path d="M42 45 L48 45" />
    <path d="M52 45 L58 45" />
  </svg>
);

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags */}
      <head>
        <title>About NAMESPACE - Space for Humans and Organizations in Tech | Our Story & Mission</title>
        <meta name="description" content="Learn about NAMESPACE's mission to build a global tech ecosystem where humans and organizations thrive together. From student community to global movement." />
        <meta name="keywords" content="NAMESPACE about us, tech ecosystem, human-centric technology, HACKHAZARDS, tech community, innovation, collaboration" />
        <link rel="canonical" href="https://namespace.world/about-us" />
      </head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        {/* Cosmic Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary/3 rounded-full" />
          <div className="absolute top-1/3 right-1/4 w-32 h-32 border-2 border-primary/20 rotate-45 animate-spin" style={{ animationDuration: "20s" }} />
          <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-primary/10 rotate-12" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-6 py-3 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">About NAMESPACE</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold text-foreground leading-tight">
              Space for Humans 
              <br />
              <span className="text-primary">in Tech</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed">
              Building a global ecosystem where humans and organizations in tech thrive together.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-sora font-bold text-foreground">
                Our Vision
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-inter leading-relaxed">
              To create a truly human-centric global tech ecosystem where learning, innovation, and collaboration are accessible to all.
            </p>

            <div className="flex justify-center pt-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Icon/Illustration Side */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 text-primary">
                      <MissionIcon />
                    </div>
                  </div>
                  {/* Floating elements */}
                  <div className="absolute top-12 right-12 w-4 h-4 bg-primary/40 rounded-full animate-ping" />
                  <div className="absolute bottom-20 left-8 w-3 h-3 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                  <div className="absolute top-32 left-16 w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "2s" }} />
                </div>
              </div>

              {/* Text Side */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-5xl font-sora font-bold text-foreground">
                    Our Mission
                  </h2>
                  <div className="w-24 h-1 bg-primary rounded-full" />
                </div>
                
                <p className="text-lg md:text-xl text-muted-foreground font-inter leading-relaxed">
                  We connect humans and organizations in tech through communities, events, and programs that foster growth, collaboration, and meaningful impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-3xl md:text-5xl font-sora font-bold text-foreground">
                Our Story
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </div>

            {/* Timeline Cards */}
            <div className="space-y-12">
              {/* Timeline Item 1 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-8 text-primary">
                      <StudentCommunityIcon />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl md:text-2xl font-sora font-semibold text-foreground">
                      Student-Led Community
                    </h3>
                    <p className="text-muted-foreground font-inter">
                      NAMESPACE began as a student-led community from a single college (NAMESPACE BPIT), fostering collaboration and learning among tech enthusiasts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-8 text-primary">
                      <EventsIcon />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl md:text-2xl font-sora font-semibold text-foreground">
                      Flagship Events
                    </h3>
                    <p className="text-muted-foreground font-inter">
                      We grew through flagship events like HACKHAZARDS, TechXcelerate, OpenCode, Algorena etc. creating platforms for innovation and bringing together brilliant minds in tech.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-8 text-primary">
                      <GlobalMovementIcon />
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="text-xl md:text-2xl font-sora font-semibold text-foreground">
                      Global Movement
                    </h3>
                    <p className="text-muted-foreground font-inter">
                      In 2025, we incorporated as a company, Namespace Ecosystem — born from students, built for the world. A global movement connecting humans and organizations in tech.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Note */}
      <section className="py-20 bg-gradient-to-t from-muted/20 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <div className="w-10 h-10 text-primary">
                <HumanTechIcon />
              </div>
            </div>
            
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-sora font-medium text-foreground leading-relaxed">
              "At NAMESPACE, we believe technology should always be for the humans who create it, use it, and are empowered by it."
            </blockquote>

            <div className="flex justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;