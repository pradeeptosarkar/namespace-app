import { GraduationCap, Briefcase, Building, Heart } from "lucide-react";

const WhoWeServeSection = () => {
  const audiences = [
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "Students",
      description: "Ambitious learners ready to bridge the gap between education and industry",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: "Professionals",
      description: "Experienced technologists looking to level up and lead innovation",
      color: "from-namespace-purple to-purple-600"
    },
    {
      icon: <Building className="w-12 h-12" />,
      title: "Organizations",
      description: "Forward-thinking companies seeking to build and nurture tech talent",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Communities",
      description: "Tech groups and communities focused on collective growth and impact",
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <section className="scroll-section bg-namespace-black text-namespace-white relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>
      
      {/* Floating orbital elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-namespace-purple-glow rounded-full animate-orbital-float" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-namespace-purple-glow rounded-full animate-orbital-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-namespace-purple-glow rounded-full animate-orbital-float" style={{ animationDelay: '4s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-sora font-bold mb-8">
              Who We <span className="text-namespace-purple-glow">Serve</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
              NAMESPACE is designed for everyone in the tech ecosystem — from curious beginners to seasoned leaders driving innovation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {audiences.map((audience, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden bg-namespace-white/5 backdrop-blur-sm border border-namespace-white/10 rounded-2xl p-8 hover:bg-namespace-white/10 hover:border-namespace-purple-glow/50 transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${audience.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-namespace-white/10 rounded-full group-hover:bg-namespace-purple-glow/20 transition-all duration-300">
                      <div className="text-namespace-white group-hover:text-namespace-purple-glow transition-colors">
                        {audience.icon}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-sora font-bold mb-4 text-center text-namespace-white group-hover:text-namespace-purple-glow transition-colors">
                    {audience.title}
                  </h3>
                  
                  <p className="text-gray-300 text-center leading-relaxed">
                    {audience.description}
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

export default WhoWeServeSection;