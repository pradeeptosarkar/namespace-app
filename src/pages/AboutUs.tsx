import { Rocket, Users, Target, Clock, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEOLazyImage from "@/components/SEOLazyImage";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-2 pb-1">
        <Link to="/#contact">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
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
                    <Users className="w-32 h-32 text-primary" />
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
                    <Users className="w-8 h-8 text-primary" />
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
                    <Rocket className="w-8 h-8 text-primary" />
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
                    <Sparkles className="w-8 h-8 text-primary" />
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
              <Clock className="w-10 h-10 text-primary" />
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