import { ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ProgramsSection = () => {
  const programs = [
    {
      title: "HACKHAZARDS",
      description: "India's largest and premier digital hackathon",
      category: "Hackathon",
    },
    {
      title: "NAMESPACE Fellowship",
      description: "3 month-long paid fellowship in AI and Web3",
      category: "Fellowship",
    },
    {
      title: "TechXcelerate",
      description: "A month-long knowledge accelerators for beginners in tech",
      category: "Education",
    },
    {
      title: "Algorena",
      description: "Multi-round national programming competition",
      category: "Competitive Coding",
    },
    {
      title: "Developer Bootcamps",
      description: "Intensive full-stack development and DSA programs",
      category: "Education",
    },
    {
      title: "OpenCode",
      description:
        "Open source festival connecting open-source projects with contributors",
      category: "Open Source",
    },
    {
      title: "NAMESPACE Talks",
      description: "A tech-focused podcast series",
      category: "Community",
    },
    {
      title: "NS Hacks",
      description: "Members-only hackathon for college chapters",
      category: "Hackathon",
    },
  ];

  return (
    <section
      id="programs"
      className="scroll-section bg-background text-foreground relative overflow-hidden section-transition"
    >
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.3)_0%,transparent_50%)] bg-[size:200px_200px]" />
        </div>

        {/* Additional geometric patterns */}
        <div className="absolute top-20 right-1/4 w-14 h-14 border-2 border-namespace-purple-glow/20 rotate-45 animate-pulse" />
        <div
          className="absolute bottom-24 left-1/4 w-18 h-18 border border-namespace-purple-glow/30 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 right-16 w-10 h-10 bg-namespace-purple-glow/10 rotate-12 animate-spin"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-1/3 left-20 w-6 h-6 border-2 border-namespace-purple-glow/40 rounded-full animate-ping"
          style={{ animationDelay: "3s" }}
        />

        {/* Star patterns */}
        <div
          className="absolute top-32 left-1/3 w-12 h-12 border border-namespace-purple-glow/25"
          style={{
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            animation: "float 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-28 right-1/3 w-8 h-8 border border-namespace-purple-glow/20"
          style={{
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            animation: "float 4s ease-in-out infinite reverse",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 progressive-reveal px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sora font-bold mb-4 sm:mb-6">
              Flagship <span className="text-primary">Programs</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto">
              Comprehensive learning experiences designed to accelerate your
              growth in the ever-evolving tech landscape.
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
                  <CarouselItem
                    key={index}
                    className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="group relative overflow-hidden rounded-3xl p-6 cursor-pointer h-64 transition-all duration-500 bg-card border border-border hover:bg-primary/5 hover:border-primary/40 backdrop-blur-sm">
                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-6 right-8 w-1 h-1 bg-primary/70 rounded-full opacity-30 group-hover:opacity-70 transition-opacity" />

                      <div className="relative z-10 h-full flex flex-col">
                        <div className="flex-1">
                          <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs font-semibold text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                            {program.category}
                          </div>

                          <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                            {program.title}
                          </h3>

                          <p className="text-muted-foreground text-sm leading-relaxed mb-6 group-hover:text-foreground transition-colors">
                            {program.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground font-medium group-hover:text-primary transition-colors">
                            Learn More
                          </span>
                          <ExternalLink className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
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
