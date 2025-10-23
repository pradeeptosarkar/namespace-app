import studentsVector from "@/assets/students-vector-purple.png";
import professionalsVector from "@/assets/professionals-vector-purple.png";
import communitiesVector from "@/assets/communities-vector-purple.png";
import institutionsVector from "@/assets/institutions-vector-purple.png";
import companiesVector from "@/assets/companies-vector-purple.png";
import SEOLazyImage from "./SEOLazyImage";

const WhoWeServeSection = () => {
  const audiences = [
    {
      image: studentsVector,
      title: "Students",
      description: "Ambitious learners ready to bridge the gap between education and industry",
      color: "from-blue-500 to-blue-600"
    },
    {
      image: professionalsVector,
      title: "Professionals",
      description: "Experienced technologists looking to level up and lead innovation",
      color: "from-namespace-purple to-purple-600"
    },
    {
      image: communitiesVector,
      title: "Communities",
      description: "Tech groups and communities focused on collective growth and impact",
      color: "from-red-500 to-red-600"
    },
    {
      image: institutionsVector,
      title: "Institutions",
      description: "Educational institutions and research organizations driving innovation",
      color: "from-green-500 to-green-600"
    },
    {
      image: companiesVector,
      title: "Companies",
      description: "Forward-thinking organizations seeking to build and nurture tech talent",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="who-we-serve" className="scroll-section bg-background text-foreground relative overflow-hidden section-transition">
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-namespace-purple/30 rounded-full" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-namespace-purple/30 rounded-full" />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-namespace-purple/30 rounded-full" />
        
        {/* Clean geometric patterns */}
        <div className="absolute top-16 left-1/4 w-12 h-12 border border-namespace-purple/15 rotate-45" />
        <div className="absolute bottom-32 right-20 w-16 h-16 border border-namespace-purple/20 rounded-full" />
        <div className="absolute top-1/2 left-16 w-8 h-8 bg-namespace-purple/5 rotate-12" />
        <div className="absolute bottom-20 right-1/4 w-6 h-6 border border-namespace-purple/25 rounded-full" />
        
        {/* Diamond patterns */}
        <div className="absolute top-24 right-1/3 w-10 h-10 border border-namespace-purple/20 rotate-45" />
        <div className="absolute bottom-40 left-20 w-8 h-8 border border-namespace-purple/15 rotate-45" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 progressive-reveal px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sora font-bold mb-4 sm:mb-6">
              Who We <span className="text-primary">Serve</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto">
              NAMESPACE is designed for everyone in the tech ecosystem — from curious beginners to seasoned leaders driving innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 px-4">
            {audiences.map((audience, index) => (
              <div 
                key={index}
                className="group relative h-28 lg:h-48 sm:h-52 cursor-pointer overflow-hidden bg-card border border-border rounded-2xl transition-all duration-300 hover:border-primary/40"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Front content - horizontal on mobile, vertical on desktop */}
                <div className="absolute inset-0 p-4 sm:p-6 flex lg:flex-col flex-row items-center justify-center lg:justify-center gap-3 lg:gap-0 transition-opacity duration-300 group-hover:opacity-0">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 sm:w-20 sm:h-20 lg:mb-4 flex-shrink-0">
                    <SEOLazyImage 
                      src={audience.image} 
                      alt={`${audience.title} - NAMESPACE audience segment illustration`}
                      className="w-full h-full object-contain"
                      width={80}
                      height={80}
                    />
                  </div>
                  
                  <h3 className="text-base lg:text-lg sm:text-xl font-sora font-bold text-center lg:text-center text-left text-foreground flex-1 lg:flex-initial">
                    {audience.title}
                  </h3>
                </div>

                {/* Back content - visible on hover */}
                <div className="absolute inset-0 p-4 sm:p-6 flex items-center justify-center bg-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-sora font-bold text-primary-foreground mb-3">
                      {audience.title}
                    </h3>
                    <p className="text-primary-foreground/90 text-sm sm:text-base leading-relaxed">
                      {audience.description}
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

export default WhoWeServeSection;