import { GraduationCap, Briefcase, Building, Heart, Users } from "lucide-react";

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
      icon: <Heart className="w-12 h-12" />,
      title: "Communities",
      description: "Tech groups and communities focused on collective growth and impact",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Building className="w-12 h-12" />,
      title: "Institutions",
      description: "Educational institutions and research organizations driving innovation",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Companies",
      description: "Forward-thinking organizations seeking to build and nurture tech talent",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="scroll-section bg-namespace-black text-namespace-white relative overflow-hidden">
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>
        
        {/* Floating orbital elements */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-namespace-purple-glow rounded-full animate-orbital-float" />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-namespace-purple-glow rounded-full animate-orbital-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-namespace-purple-glow rounded-full animate-orbital-float" style={{ animationDelay: '4s' }} />
        
        {/* Additional geometric patterns */}
        <div className="absolute top-16 left-1/4 w-12 h-12 border-2 border-namespace-purple-glow/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-32 right-20 w-16 h-16 border border-namespace-purple-glow/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-16 w-8 h-8 bg-namespace-purple-glow/10 rotate-12 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-20 right-1/4 w-6 h-6 border-2 border-namespace-purple-glow/40 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        
        {/* Diamond patterns */}
        <div className="absolute top-24 right-1/3 w-10 h-10 border border-namespace-purple-glow/25 rotate-45" style={{
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div className="absolute bottom-40 left-20 w-8 h-8 border border-namespace-purple-glow/20 rotate-45" style={{
          animation: 'float 4s ease-in-out infinite reverse'
        }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 lg:mb-10 animate-fade-in-up px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sora font-bold mb-4 sm:mb-6">
              Who We <span className="text-namespace-purple-glow">Serve</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto">
              NAMESPACE is designed for everyone in the tech ecosystem — from curious beginners to seasoned leaders driving innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 px-4">
            {audiences.map((audience, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden bg-namespace-white/5 backdrop-blur-sm border border-namespace-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 hover:bg-namespace-white/10 hover:border-namespace-purple-glow/50 transition-all duration-500 animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${audience.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-namespace-white/10 rounded-full group-hover:bg-namespace-purple-glow/20 transition-all duration-300">
                      <div className="text-namespace-white group-hover:text-namespace-purple-glow transition-colors [&>svg]:w-6 [&>svg]:h-6 sm:[&>svg]:w-8 sm:[&>svg]:h-8 lg:[&>svg]:w-12 lg:[&>svg]:h-12">
                        {audience.icon}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-sora font-bold mb-2 sm:mb-4 text-center text-namespace-white group-hover:text-namespace-purple-glow transition-colors">
                    {audience.title}
                  </h3>
                  
                  <p className="text-gray-300 text-center leading-relaxed text-sm sm:text-base">
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