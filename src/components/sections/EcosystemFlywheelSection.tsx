import React from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const EcosystemFlywheelSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  const flywheelElements = [
    {
      title: "Events",
      description: "Become discovery + engagement channels",
      position: "top",
      delay: "0s"
    },
    {
      title: "Humans",
      description: "Gain skills, visibility, opportunities, network",
      position: "right",
      delay: "0.5s"
    },
    {
      title: "Programs",
      description: "Built to serve both",
      position: "bottom",
      delay: "1s"
    },
    {
      title: "Organizations", 
      description: "Run events, hire talent, test products, teach better",
      position: "left",
      delay: "1.5s"
    }
  ];

  const insights = [
    "Skills unlocked by real-world projects",
    "Startups validate with real users", 
    "Communities drive adoption at scale",
    "Institutions get better learning outcomes"
  ];

  return (
    <section 
      ref={ref}
      className="scroll-section min-h-screen w-screen flex items-center justify-center relative overflow-hidden bg-background"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/5 animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full bg-accent/5 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 rounded-full bg-secondary/5 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-4 transition-all duration-1000 ${
            hasIntersected 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            The Ecosystem{' '}
            <span className="relative inline-block bg-gradient-purple bg-clip-text text-transparent">
              Flywheel
            </span>
          </h2>
          <p className={`text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
            hasIntersected 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            How It All Connects
          </p>
        </div>

        {/* Flywheel Visualization */}
        <div className="relative flex items-center justify-center mb-16 mt-8">

          {/* Redesigned Central Flywheel */}
          <div className={`relative w-60 h-60 lg:w-60 lg:h-60 transition-all duration-1000 delay-500 ${
            hasIntersected 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-75'
          }`}>
            
            {/* Outer Glow Effects */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 blur-3xl animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-gradient-to-tl from-accent/20 via-primary/20 to-accent/20 blur-2xl"></div>
            
            {/* Main Flywheel Container */}
            <div className="absolute inset-6 rounded-full border border-primary/20 bg-gradient-to-br from-background/95 via-background/90 to-background/95 backdrop-blur-2xl shadow-2xl">
              
              {/* Animated Rings */}
              <div className="absolute inset-3 rounded-full border-2 border-dashed border-primary/40 animate-spin-slow"></div>
              <div className="absolute inset-6 rounded-full border border-dotted border-accent/30 animate-spin-reverse opacity-60"></div>
              <div className="absolute inset-9 rounded-full border border-solid border-primary/20 animate-pulse"></div>
              
              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center z-10">
                  <div className="text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-sm">
                    NAMESPACE
                  </div>
                  <div className="text-sm text-muted-foreground font-medium opacity-80">
                    Ecosystem
                  </div>
                </div>
              </div>

              {/* Flywheel Elements - Redesigned */}
              {flywheelElements.map((element, index) => {
                const positions = {
                  top: "-top-20 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  right: "-right-40 top-1/2 translate-x-1/2 -translate-y-1/2", 
                  bottom: "-bottom-20 left-1/2 -translate-x-1/2 translate-y-1/2",
                  left: "-left-40 top-1/2 -translate-x-1/2 -translate-y-1/2"
                };

                return (
                  <div
                    key={index}
                    className={`absolute ${positions[element.position as keyof typeof positions]} transition-all duration-1000`}
                    style={{ 
                      animationDelay: element.delay,
                      opacity: hasIntersected ? 1 : 0,
                      transform: hasIntersected 
                        ? positions[element.position as keyof typeof positions].split(' ').slice(1).join(' ')
                        : `${positions[element.position as keyof typeof positions].split(' ').slice(1).join(' ')} scale(0.3)`
                    }}
                  >
                    <div className="group relative">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
                      
                      {/* Main Card */}
                      <div className="relative w-52 h-28 bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-xl border border-primary/15 rounded-xl p-4 w-42 text-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:border-primary/30">
                        
                        {/* Top Border Accent */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
                        
                        <div className="relative z-10">
                          <h3 className="font-bold text-base mb-2 text-foreground group-hover:text-primary transition-colors duration-300">{element.title}</h3>
                          <p className="text-xs text-muted-foreground leading-relaxed">{element.description}</p>
                        </div>

                        {/* Bottom Glow */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Connecting Flow Lines */}
              <div className="absolute inset-0">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className={`absolute transition-all duration-1000 delay-700 ${
                      hasIntersected ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateY(-135px)`,
                    }}
                  >
                    <div className="relative">
                      <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary/70 filter drop-shadow-lg"></div>
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-6 bg-gradient-to-t from-primary/70 to-transparent rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Anchor Statement */}
        <div className={`text-center transition-all duration-1000 delay-1000 ${
          hasIntersected 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-xl lg:text-2xl font-bold">
            Everything feeds everything.{' '}
            <span className="relative inline-block bg-gradient-purple bg-clip-text text-transparent">
              That's the flywheel.
            </span>
          </h3>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default EcosystemFlywheelSection;