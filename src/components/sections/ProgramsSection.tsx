import { ExternalLink } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ProgramsSection = () => {
  const programs = [
    {
      title: "Developer Bootcamp",
      description: "Intensive full-stack development program",
      category: "Education",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Startup Incubator",
      description: "From idea to MVP in 12 weeks",
      category: "Entrepreneurship", 
      color: "from-green-500 to-green-600"
    },
    {
      title: "AI/ML Workshop Series",
      description: "Hands-on machine learning projects",
      category: "Technology",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Design Thinking Lab",
      description: "Human-centered design methodology",
      category: "Innovation",
      color: "from-pink-500 to-pink-600"
    },
    {
      title: "Open Source Projects",
      description: "Contribute to meaningful codebases",
      category: "Community",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Tech Leadership Track",
      description: "Management and technical excellence",
      category: "Leadership",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Blockchain Academy",
      description: "Web3 and decentralized technologies",
      category: "Emerging Tech",
      color: "from-teal-500 to-teal-600"
    },
    {
      title: "Global Mentorship",
      description: "1-on-1 guidance from industry experts",
      category: "Mentorship",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <section className="scroll-section bg-namespace-black text-namespace-white relative overflow-hidden">
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.3)_0%,transparent_50%)] bg-[size:200px_200px]" />
        </div>
        
        {/* Additional geometric patterns */}
        <div className="absolute top-20 right-1/4 w-14 h-14 border-2 border-namespace-purple-glow/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-24 left-1/4 w-18 h-18 border border-namespace-purple-glow/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-16 w-10 h-10 bg-namespace-purple-glow/10 rotate-12 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-20 w-6 h-6 border-2 border-namespace-purple-glow/40 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        
        {/* Star patterns */}
        <div className="absolute top-32 left-1/3 w-12 h-12 border border-namespace-purple-glow/25" style={{
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'float 7s ease-in-out infinite'
        }} />
        <div className="absolute bottom-28 right-1/3 w-8 h-8 border border-namespace-purple-glow/20" style={{
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          animation: 'float 4s ease-in-out infinite reverse'
        }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 animate-fade-in-up px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sora font-bold mb-4 sm:mb-6">
              Flagship <span className="text-namespace-purple-glow">Programs</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto">
              Comprehensive learning experiences designed to accelerate your growth in the ever-evolving tech landscape.
            </p>
          </div>
          
          {/* Programs Carousel */}
          <div className="mb-6 px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {programs.map((program, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                    <div className="group relative overflow-hidden bg-namespace-white/5 backdrop-blur-sm border border-namespace-white/10 rounded-2xl p-6 hover:bg-namespace-white/10 hover:border-namespace-purple-glow/50 transition-all duration-500 cursor-pointer h-64">
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                      
                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex-1">
                          <div className="inline-block px-3 py-1 bg-namespace-purple-glow/20 rounded-full text-xs font-semibold text-namespace-purple-glow mb-4">
                            {program.category}
                          </div>
                          
                          <h3 className="text-xl font-sora font-bold mb-3 text-namespace-white group-hover:text-namespace-purple-glow transition-colors">
                            {program.title}
                          </h3>
                          
                          <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            {program.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400 font-medium">Learn More</span>
                          <ExternalLink className="w-4 h-4 text-namespace-purple-glow opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;