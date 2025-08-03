import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ProblemSection = () => {
  const [expandedProblem, setExpandedProblem] = useState(null);

  const problems = [
    {
      title: "Borderless Ecosystem",
      description:
        "Break silos and collaborate across geographies and backgrounds."
    },
    {
      title: "Purposeful Collaboration",
      description:
        "From hackathons to programs, every interaction creates real-world value."
    },
    {
      title: "Momentum for Builders",
      description:
        "Fuel your growth with access, exposure, and opportunities that compound."
    },
    {
      title: "Precision GTM",
      description:
        "Launch and scale tech products with active developer communities."
    },
    {
      title: "Talent Discovery",
      description:
        "Find exceptional builders through performance-driven programs."
    },
    {
      title: "Authentic Engagement",
      description:
        "Run campaigns and hackathons that resonate deeply with tech audiences."
    },
    {
      title: "Infra for Tech Communities",
      description:
        "Support and supercharge your local or campus tech groups."
    },
    {
      title: "Modern Academia Connect",
      description:
        "Bridge universities with the global tech world via pipelines and programs."
    }
  ];

  const toggleProblem = (index) => {
    setExpandedProblem(expandedProblem === index ? null : index);
  };

  return (
    <section className="scroll-section bg-black text-white relative overflow-hidden h-screen py-12">
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 border border-purple-500/30 rounded-full animate-pulse opacity-20" />
        <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-purple-500/30 rounded-full animate-pulse opacity-30" style={{ animationDelay: '2s' }} />
        
        {/* Additional geometric patterns */}
        <div className="absolute top-10 right-1/4 w-16 h-16 border-2 border-purple-500/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-purple-500/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-purple-500/10 rotate-12 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-16 w-8 h-8 border-2 border-purple-500/40 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        
        {/* Hexagon patterns */}
        <div className="absolute top-16 left-1/3 w-14 h-14 border border-purple-500/25 rotate-30" style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          animation: 'pulse 6s ease-in-out infinite'
        }} />
        <div className="absolute bottom-32 right-1/3 w-10 h-10 border border-purple-500/20 rotate-60" style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          animation: 'pulse 4s ease-in-out infinite reverse'
        }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold mb-3 sm:mb-4">
              Our <span className="text-purple-400">Features</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the core features that make NAMESPACE the ultimate platform for tech builders and innovators.
            </p>
          </div>
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
                onClick={() => toggleProblem(index)}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-purple-500/20 rounded-full flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-purple-400 rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white hover:text-purple-400 transition-colors leading-tight">
                        {problem.title}
                      </h3>
                    </div>
                    <ChevronDown 
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                        expandedProblem === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  
                  <div className={`transition-all duration-300 overflow-hidden ${
                    expandedProblem === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed pl-8 sm:pl-12 lg:pl-16">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;