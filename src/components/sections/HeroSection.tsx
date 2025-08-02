import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="scroll-section bg-namespace-white text-namespace-black relative overflow-hidden">
      {/* Background orbital elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-orbital rounded-full blur-3xl animate-orbital-float" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-namespace-purple-light rounded-full blur-2xl animate-orbital-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="max-w-4xl">
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-namespace-purple-light px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-namespace-purple rounded-full animate-pulse" />
                <span className="text-sm font-medium text-namespace-purple">Building the future of tech ecosystems</span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-sora font-bold leading-tight">
                Welcome to
                <br />
                <span className="bg-gradient-purple bg-clip-text text-transparent">NAMESPACE</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-inter">
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