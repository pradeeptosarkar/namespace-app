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
      {/* Background orbital elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-orbital rounded-full blur-3xl opacity-60 animate-orbital-float" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-namespace-purple-light rounded-full blur-2xl opacity-40 animate-orbital-float" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-namespace-purple-light px-6 py-3 rounded-full mb-8">
              <div className="w-3 h-3 bg-namespace-purple rounded-full animate-pulse" />
              <span className="font-semibold text-namespace-purple">Our Solution</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-sora font-bold mb-8 leading-tight">
              Building Tomorrow's
              <br />
              <span className="bg-gradient-purple bg-clip-text text-transparent">Tech Ecosystem</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto mb-12">
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
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group text-center p-8 rounded-2xl bg-namespace-white border border-border hover:border-namespace-purple/30 hover:shadow-elegant transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-namespace-purple-light rounded-full mb-6 group-hover:bg-namespace-purple group-hover:text-namespace-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-sora font-semibold mb-4 text-namespace-black">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-lg">
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