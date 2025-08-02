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
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-namespace-purple-light/30 to-transparent" />
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-namespace-purple-glow/20 rounded-full blur-3xl animate-orbital-float" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-namespace-purple-light rounded-full blur-2xl animate-orbital-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-3 bg-gradient-purple px-6 py-3 rounded-full">
                  <Zap className="w-5 h-5 text-namespace-white" />
                  <span className="font-bold text-namespace-white text-lg">FLAGSHIP EVENT</span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-sora font-bold leading-tight">
                  HACK
                  <span className="bg-gradient-purple bg-clip-text text-transparent">HAZARDS</span>
                </h2>
                
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
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
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="group bg-namespace-white border-2 border-border rounded-2xl p-8 hover:border-namespace-purple hover:shadow-elegant transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-namespace-purple-light rounded-full group-hover:bg-namespace-purple group-hover:text-namespace-white transition-all duration-300">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-sora font-bold text-namespace-black group-hover:text-namespace-purple transition-colors">
                        {stat.number}
                      </div>
                      <div className="text-muted-foreground font-medium">
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