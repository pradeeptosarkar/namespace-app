import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const SecondHeroSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });
  const features = [
    {
      title: "Borderless Ecosystem",
      description: "Break silos and collaborate across geographies and backgrounds."
    },
    {
      title: "Purposeful Collaboration",
      description: "From hackathons to programs, every interaction creates real-world value."
    },
    {
      title: "Momentum for Builders",
      description: "Fuel your growth with access, exposure, and opportunities that compound."
    },
    {
      title: "Precision GTM",
      description: "Launch and scale tech products with active developer communities."
    },
    {
      title: "Talent Discovery",
      description: "Find exceptional builders through performance-driven programs."
    },
    {
      title: "Authentic Engagement",
      description: "Run campaigns and hackathons that resonate deeply with tech audiences."
    },
    {
      title: "Infra for Tech Communities",
      description: "Support and supercharge your local or campus tech groups."
    },
    {
      title: "Modern Academia Connect",
      description: "Bridge universities with the global tech world via pipelines and programs."
    }
  ];

  return (
    <section ref={ref} className="scroll-section bg-namespace-white text-namespace-black relative overflow-hidden">
      {/* Subtle geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-namespace-purple/5 rounded-full" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-namespace-purple/3 rounded-full" />
        
        {/* Clean geometric patterns */}
        <div className="absolute top-16 left-20 w-12 h-12 border border-namespace-purple/15 rotate-45" />
        <div className="absolute bottom-32 right-16 w-16 h-16 border border-namespace-purple/20 rounded-full" />
        <div className="absolute top-1/2 left-10 w-8 h-8 bg-namespace-purple/5 rotate-12" />
        <div className="absolute bottom-20 right-1/3 w-6 h-6 border border-namespace-purple/25 rounded-full" />
        
        {/* Triangle patterns */}
        <div className="absolute top-20 right-1/4 w-10 h-10 border border-namespace-purple/20" style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }} />
        <div className="absolute bottom-40 left-1/3 w-8 h-8 border border-namespace-purple/15" style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-namespace-purple-light px-4 py-2 rounded-full mb-6">
              <div className="w-3 h-3 bg-namespace-purple rounded-full animate-pulse" />
              <span className="font-semibold text-namespace-purple">Our Solution</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sora font-bold mb-4 sm:mb-6 leading-tight">
              Building Tomorrow's
              <br />
              <span className="text-namespace-purple">
                Tech Ecosystem
              </span>
            </h2>
            
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-6 sm:mb-8 px-4">
              NAMESPACE is where ambitious technologists converge to learn, build, and scale. 
              We're creating the infrastructure that empowers the next generation of tech leaders.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative h-20 sm:h-24 lg:h-28 rounded-2xl border border-namespace-purple/20 bg-namespace-white hover:border-namespace-purple/40 hover:shadow-sm transition-all duration-300 overflow-hidden cursor-pointer"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Default state - Dot and Title */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 sm:p-4 transition-all duration-300 group-hover:opacity-0">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-namespace-purple rounded-full mb-2 sm:mb-3"></div>
                  <h3 className="text-xs sm:text-sm lg:text-base font-sora font-semibold text-center text-namespace-black leading-tight">
                    {feature.title}
                  </h3>
                </div>

                {/* Hover state - Description */}
                <div className="absolute inset-0 bg-namespace-purple rounded-2xl p-3 sm:p-4 flex flex-col justify-center transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-xs sm:text-sm font-sora font-bold text-center text-namespace-white mb-1 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-namespace-white/90 text-xs text-center leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondHeroSection;