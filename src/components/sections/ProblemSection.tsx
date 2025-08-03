import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronDown } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      title: "Fragmented Learning",
      description: "Tech education is scattered across disconnected platforms, making it hard to build comprehensive skills."
    },
    {
      title: "Limited Opportunities",
      description: "Students and professionals struggle to find meaningful projects and networking opportunities."
    },
    {
      title: "Industry Gap",
      description: "There's a massive disconnect between what's taught and what the industry actually needs."
    },
    {
      title: "Community Isolation",
      description: "Talented individuals work in silos, missing out on collaboration and collective growth."
    }
  ];

  return (
    <section className="scroll-section bg-namespace-black text-namespace-white relative overflow-hidden">
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 border border-namespace-purple-glow rounded-full animate-orbital-float opacity-20" />
        <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-namespace-purple-glow rounded-full animate-orbital-float opacity-30" style={{ animationDelay: '2s' }} />
        
        {/* Additional geometric patterns */}
        <div className="absolute top-10 right-1/4 w-16 h-16 border-2 border-namespace-purple-glow/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-namespace-purple-glow/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-namespace-purple-glow/10 rotate-12 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-16 w-8 h-8 border-2 border-namespace-purple-glow/40 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        
        {/* Hexagon patterns */}
        <div className="absolute top-16 left-1/3 w-14 h-14 border border-namespace-purple-glow/25 rotate-30" style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div className="absolute bottom-32 right-1/3 w-10 h-10 border border-namespace-purple-glow/20 rotate-60" style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          animation: 'float 4s ease-in-out infinite reverse'
        }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-5xl md:text-7xl font-sora font-bold mb-6">
                The <span className="text-namespace-purple-glow">Current</span> Reality
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                The tech ecosystem is broken. Talent is wasted, opportunities are missed, and innovation is stifled by outdated systems.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-6">
                {problems.map((problem, index) => (
                  <AccordionItem 
                    key={index}
                    value={`problem-${index}`}
                    className="bg-namespace-white/5 backdrop-blur-sm border border-namespace-white/10 rounded-2xl overflow-hidden hover:bg-namespace-white/10 hover:border-namespace-purple-glow/50 transition-all duration-300 animate-scale-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <AccordionTrigger className="px-8 py-6 hover:no-underline group">
                      <div className="flex items-center space-x-4 w-full">
                        <div className="flex-shrink-0 w-12 h-12 bg-namespace-purple-glow/20 rounded-full flex items-center justify-center group-hover:bg-namespace-purple-glow/30 transition-colors">
                          <div className="w-6 h-6 bg-namespace-purple-glow rounded-full" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-xl md:text-2xl font-sora font-semibold text-namespace-white group-hover:text-namespace-purple-glow transition-colors">
                            {problem.title}
                          </h3>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6">
                      <div className="ml-16 pt-2">
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {problem.description}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;