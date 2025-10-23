import { useState } from "react";
import { ChevronDown } from "lucide-react";

const ProblemSection = () => {
  const [expandedProblem, setExpandedProblem] = useState(null);

  const problems = [
    {
      title: "Tech Isn't Built for Humans",
      description:
        "Most platforms and ecosystems prioritize products, not people. The human experience of learning, building, and connecting often takes a back seat."
    },
    {
      title: "Talent Is Everywhere, Support Is Not",
      description:
        "Brilliant minds exist across small towns, tier-2/3 cities, and underrepresented groups — but lack access to real opportunities and support systems."
    },
    {
      title: "Communities Operate in Silos",
      description:
        "Tech communities, startups, students, and professionals work in isolation — missing out on the network effects of a connected ecosystem."
    },
    {
      title: "Events Are One-Off, Not Transformational",
      description:
        "Hackathons and programs often end in a weekend with no long-term impact, mentorship, or continuity for teams and ideas."
    },
    {
      title: "Gatekeeping Limits Growth",
      description:
        "Tech ecosystems are full of invisible walls — from closed networks to inaccessible hiring pipelines — making it hard for outsiders to break in."
    },
    {
      title: "What You Learn ≠ What You Need",
      description:
        "There's still a major gap between academic learning and the dynamic, real-world skills needed in modern tech."
    }
  ];

  const toggleProblem = (index) => {
    setExpandedProblem(expandedProblem === index ? null : index);
  };

  return (
    <section id="problem" className="scroll-section bg-background text-foreground relative overflow-hidden h-screen py-12 section-transition">
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 border border-namespace-purple/30 rounded-full animate-pulse opacity-20" />
        <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-namespace-purple/30 rounded-full animate-pulse opacity-30" style={{ animationDelay: '2s' }} />
        
        {/* Additional geometric patterns */}
        <div className="absolute top-10 right-1/4 w-16 h-16 border-2 border-namespace-purple/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-namespace-purple/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-namespace-purple/10 rotate-12 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-16 w-8 h-8 border-2 border-namespace-purple/40 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        
        {/* Hexagon patterns */}
        <div className="absolute top-16 left-1/3 w-14 h-14 border border-namespace-purple/25 rotate-30" style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          animation: 'pulse 6s ease-in-out infinite'
        }} />
        <div className="absolute bottom-32 right-1/3 w-10 h-10 border border-namespace-purple/20 rotate-60" style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          animation: 'pulse 4s ease-in-out infinite reverse'
        }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 px-4 progressive-reveal">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold mb-3 sm:mb-4">
              The <span className="text-primary">Current</span> Reality
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl text-muted-foreground max-w-3xl mx-auto">
              The tech ecosystem is broken. Talent is wasted, opportunities are missed, and innovation is stifled by outdated systems.
            </p>
          </div>
          
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-4">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => toggleProblem(index)}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-primary rounded-full animate-pulse" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-foreground hover:text-primary transition-colors leading-tight">
                        {problem.title}
                      </h3>
                    </div>
                    <ChevronDown 
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                        expandedProblem === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  
                  <div className={`transition-all duration-300 overflow-hidden ${
                    expandedProblem === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed pl-8 sm:pl-12 lg:pl-16">
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