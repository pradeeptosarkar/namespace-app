import { Button } from "@/components/ui/button";

const SecondHeroSection = () => {
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
              <span className="relative inline-block bg-gradient-purple bg-clip-text text-transparent">
                {/* Animated hand-drawn oval */}
                <svg className="absolute inset-0 -m-8 w-full h-full pointer-events-none" viewBox="0 0 200 80" style={{ transform: 'scale(1.3)' }}>
                  <ellipse
                    cx="100" 
                    cy="40" 
                    rx="80" 
                    ry="30"
                    fill="none"
                    stroke="rgb(139, 92, 246)"
                    strokeWidth="2.5"
                    opacity="0.6"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: '400',
                      strokeDashoffset: '400',
                      transform: 'rotate(-3deg)',
                      transformOrigin: 'center',
                      animation: 'drawOval 2s ease-out 1s forwards'
                    }}
                  />
                </svg>
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
                className="group relative h-20 sm:h-24 lg:h-28 rounded-2xl border border-border bg-gradient-to-br from-namespace-white to-gray-50 hover:border-namespace-purple/50 hover:shadow-elegant transition-all duration-500 animate-scale-in overflow-hidden cursor-pointer"
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