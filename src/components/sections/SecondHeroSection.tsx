import { Button } from "@/components/ui/button";
import { Rocket, Users, Zap } from "lucide-react";

const SecondHeroSection = () => {
  const features = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Innovation Labs",
      description: "Real-world projects that matter"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Global Community",
      description: "Connect with like-minded builders"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Rapid Growth",
      description: "Accelerate your technical journey"
    }
  ];

  return (
    <section className="scroll-section bg-namespace-white text-namespace-black relative overflow-hidden">
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-orbital rounded-full blur-3xl opacity-60 animate-orbital-float" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-namespace-purple-light rounded-full blur-2xl opacity-40 animate-orbital-float" style={{ animationDelay: '4s' }} />
        
        {/* Additional geometric patterns */}
        <div className="absolute top-16 left-20 w-12 h-12 border-2 border-namespace-purple/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-32 right-16 w-16 h-16 border border-namespace-purple/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-namespace-purple/10 rotate-12 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 right-1/3 w-6 h-6 border-2 border-namespace-purple/40 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        
        {/* Triangle patterns */}
        <div className="absolute top-20 right-1/4 w-10 h-10 border border-namespace-purple/25" style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          animation: 'float 5s ease-in-out infinite'
        }} />
        <div className="absolute bottom-40 left-1/3 w-8 h-8 border border-namespace-purple/20" style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          animation: 'float 3s ease-in-out infinite reverse'
        }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center lg:px-[clamp(2rem,4vw,6rem)]">
        <div className="w-full max-w-6xl mx-auto lg:max-w-[clamp(60rem,80vw,90rem)]">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-namespace-purple-light px-6 py-3 rounded-full mb-8">
              <div className="w-3 h-3 bg-namespace-purple rounded-full animate-pulse" />
              <span className="font-semibold text-namespace-purple">Our Solution</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[clamp(3rem,4.5vw,5.5rem)] xl:text-[clamp(4rem,5.5vw,7rem)] font-sora font-bold mb-6 sm:mb-8 lg:mb-[clamp(2rem,3vw,4rem)] leading-tight">
              Building Tomorrow's
              <br />
              <span className="bg-gradient-purple bg-clip-text text-transparent">Tech Ecosystem</span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-[clamp(1.25rem,1.5vw,2rem)] xl:text-[clamp(1.5rem,1.8vw,2.5rem)] text-muted-foreground max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-[clamp(2rem,3vw,4rem)] px-4">
              NAMESPACE is where ambitious technologists converge to learn, build, and scale. 
              We're creating the infrastructure that empowers the next generation of tech leaders.
            </p>
            
            <Button 
              size="lg"
              className="bg-namespace-purple hover:bg-primary-hover text-namespace-white px-8 py-6 text-lg font-semibold shadow-elegant hover:shadow-orbital transition-all duration-300"
            >
              Join Our Community
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-[clamp(1.5rem,2.5vw,3rem)]">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group text-center p-4 sm:p-6 lg:p-[clamp(1.5rem,2.5vw,3rem)] rounded-2xl bg-namespace-white border border-border hover:border-namespace-purple/30 hover:shadow-elegant transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-[clamp(3rem,4vw,5rem)] lg:h-[clamp(3rem,4vw,5rem)] bg-namespace-purple-light rounded-full mb-4 sm:mb-6 lg:mb-[clamp(1rem,1.5vw,2rem)] group-hover:bg-namespace-purple group-hover:text-namespace-white transition-all duration-300">
                  <div className="lg:[&>svg]:w-[clamp(1.5rem,2vw,2.5rem)] lg:[&>svg]:h-[clamp(1.5rem,2vw,2.5rem)]">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-[clamp(1.25rem,1.5vw,2rem)] font-sora font-semibold mb-2 sm:mb-4 lg:mb-[clamp(0.75rem,1vw,1.5rem)] text-namespace-black">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-[clamp(0.875rem,1vw,1.25rem)]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondHeroSection;