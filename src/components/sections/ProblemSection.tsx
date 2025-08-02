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
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-32 h-32 border border-namespace-purple-glow rounded-full animate-orbital-float opacity-20" />
        <div className="absolute bottom-1/4 right-10 w-24 h-24 border border-namespace-purple-glow rounded-full animate-orbital-float opacity-30" style={{ animationDelay: '2s' }} />
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
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {problems.map((problem, index) => (
                <div 
                  key={index}
                  className="group bg-namespace-white/5 backdrop-blur-sm border border-namespace-white/10 rounded-2xl p-8 hover:bg-namespace-white/10 hover:border-namespace-purple-glow/50 transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-namespace-purple-glow/20 rounded-full flex items-center justify-center group-hover:bg-namespace-purple-glow/30 transition-colors">
                      <div className="w-6 h-6 bg-namespace-purple-glow rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-sora font-semibold mb-4 text-namespace-white group-hover:text-namespace-purple-glow transition-colors">
                        {problem.title}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {problem.description}
                      </p>
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

export default ProblemSection;