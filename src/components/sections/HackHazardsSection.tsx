import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, Zap } from "lucide-react";

const HackHazardsSection = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "5,000+", label: "Participants" },
    { icon: <Trophy className="w-8 h-8" />, number: "48", label: "Hours" },
    { icon: <Zap className="w-8 h-8" />, number: "$50K", label: "Prizes" },
    { icon: <Calendar className="w-8 h-8" />, number: "2025", label: "Next Event" }
  ];

  return (
    <section className="scroll-section bg-namespace-white text-namespace-black relative overflow-hidden">
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
            <div className="space-y-6 sm:space-y-8 animate-fade-in-up order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 bg-gradient-purple px-6 py-3 rounded-full">
                  <Zap className="w-5 h-5 text-namespace-white" />
                  <span className="font-bold text-namespace-white text-lg">FLAGSHIP EVENT</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sora font-bold leading-tight">
                  HACK
                  <span className="bg-gradient-purple bg-clip-text text-transparent">HAZARDS</span>
                </h2>
                
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                  Our flagship hackathon where brilliant minds converge to solve real-world challenges. 
                  48 hours of intense innovation, mentorship, and community building.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-namespace-purple hover:bg-primary-hover text-namespace-white px-8 py-6 text-lg font-semibold shadow-elegant hover:shadow-orbital transition-all duration-300"
                >
                  Register Now
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-2 border-namespace-purple text-namespace-purple hover:bg-namespace-purple hover:text-namespace-white px-8 py-6 text-lg font-semibold transition-all duration-300"
                >
                  View Past Events
                </Button>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 order-1 lg:order-2">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="group bg-namespace-white border-2 border-border rounded-2xl p-4 sm:p-6 lg:p-8 hover:border-namespace-purple hover:shadow-elegant transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center space-y-3 sm:space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-namespace-purple-light rounded-full group-hover:bg-namespace-purple group-hover:text-namespace-white transition-all duration-300">
                      <div className="[&>svg]:w-5 [&>svg]:h-5 sm:[&>svg]:w-6 sm:[&>svg]:h-6 lg:[&>svg]:w-8 lg:[&>svg]:h-8">
                        {stat.icon}
                      </div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-sora font-bold text-namespace-black group-hover:text-namespace-purple transition-colors">
                        {stat.number}
                      </div>
                      <div className="text-muted-foreground font-medium text-sm sm:text-base">
                        {stat.label}
                      </div>
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