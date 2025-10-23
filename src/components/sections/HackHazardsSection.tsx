import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, Zap, Globe, Building, School, Eye, UserCheck, MapPin, UsersRound } from "lucide-react";

const HackHazardsSection = () => {
  const stats = [
    { number: "17,000+", label: "Hackers" },
    { number: "3,000+", label: "Proposals" },
    { number: "780+", label: "Builds" },
    { number: "6", label: "Global Partners" },
    { number: "25+", label: "Countries" },
    { number: "500+", label: "Indian Cities and Towns" },
    { number: "1500+", label: "Institutions" },
    { number: "200+", label: "Outreach Partners" }, 
    { number: "2mn+", label: "Social media impressions" },
    { number: "35%", label: "Women" },
    { number: "35%", label: "First-timers" },
    { number: "25%", label: "Participants from Rural Areas" }
  ];

  return (
    <section id="hackhazards" className="scroll-section bg-background text-foreground relative overflow-hidden section-transition">
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-namespace-purple-light/30 to-transparent" />
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-namespace-purple-glow/20 rounded-full blur-3xl animate-orbital-float" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-namespace-purple-light rounded-full blur-2xl animate-orbital-float" style={{ animationDelay: '3s' }} />
        
        {/* Additional geometric patterns */}
        <div className="absolute top-20 left-1/4 w-12 h-12 border-2 border-namespace-purple/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-28 right-1/3 w-16 h-16 border border-namespace-purple/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-20 w-8 h-8 bg-namespace-purple/10 rotate-12 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-16 w-6 h-6 border-2 border-namespace-purple/40 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        
        {/* Lightning patterns */}
        <div className="absolute top-32 right-16 w-10 h-10 border border-namespace-purple/25" style={{
          clipPath: 'polygon(30% 0%, 60% 40%, 100% 35%, 70% 100%, 40% 60%, 0% 65%)',
          animation: 'float 5s ease-in-out infinite'
        }} />
        <div className="absolute bottom-36 left-1/3 w-8 h-8 border border-namespace-purple/20" style={{
          clipPath: 'polygon(30% 0%, 60% 40%, 100% 35%, 70% 100%, 40% 60%, 0% 65%)',
          animation: 'float 3s ease-in-out infinite reverse'
        }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center px-4">
            {/* Content */}
            <div className="space-y-6 sm:space-y-8 progressive-reveal">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 glassmorphism bg-gradient-purple px-6 py-3 rounded-full magnetic-element glass-glow">
                  <Zap className="w-5 h-5 text-namespace-white animate-pulse" />
                  <span className="font-bold text-namespace-white text-lg">World's largest independent community-run hackathon</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sora font-bold leading-tight">
                  HACK
                  <span className="bg-gradient-purple bg-clip-text text-transparent shimmer-effect">HAZARDS</span>
                  '25
                </h2>
                
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  Our flagship hackathon where brilliant minds converge to solve real-world challenges. 
                  3 weeks of intense innovation, mentorship, and community building.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-namespace-purple hover:bg-primary-hover text-namespace-white px-8 py-6 text-lg font-semibold shadow-elegant hover:shadow-orbital transition-all duration-300 magnetic-element glass-glow"
                  onClick={() => window.open('https://hackhazards.namespace.world', '_blank')}
                >
                  Visit website
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="glassmorphism border-2 border-namespace-purple text-namespace-purple hover:bg-namespace-purple hover:text-namespace-white px-8 py-6 text-lg font-semibold transition-all duration-300 magnetic-element"
                  onClick={() => window.open('https://hackhazards25.devfolio.co/projects', '_blank')}
                >
                  View projects
                </Button>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="group glassmorphism border border-border rounded-lg p-2 sm:p-3 hover:border-namespace-purple hover:shadow-elegant transition-all duration-300 progressive-reveal magnetic-element micro-float"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center space-y-1 sm:space-y-2">
                    <div className="text-sm sm:text-base lg:text-lg font-sora font-bold text-namespace-black group-hover:text-namespace-purple transition-colors">
                      {stat.number}
                    </div>
                    <div className="text-muted-foreground font-medium text-xs sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HackHazardsSection;