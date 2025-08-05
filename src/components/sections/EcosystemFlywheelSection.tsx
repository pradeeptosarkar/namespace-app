import React from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const EcosystemFlywheelSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });

  const flywheelElements = [
    {
      title: "Humans",
      description: "Gain skills, visibility, opportunities, network",
      position: "top",
      delay: "0s"
    },
    {
      title: "Organizations", 
      description: "Run events, hire talent, test products, teach better",
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
      title: "Events",
      description: "Become discovery + engagement channels",
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
        <div className="text-center mb-16">
          <h2 className={`text-6xl lg:text-8xl font-bold mb-6 transition-all duration-1000 ${
            hasIntersected 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            The Ecosystem{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Flywheel
            </span>
          </h2>
          <p className={`text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            hasIntersected 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            How It All Connects
          </p>
        </div>

        {/* Flywheel Visualization with Side Insights */}
        <div className="relative flex items-center justify-center mb-16">
          {/* Left Side Insights */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-32 space-y-8">
            {insights.slice(0, 2).map((insight, index) => (
              <div
                key={index}
                className={`text-left p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 transition-all duration-1000 hover:bg-card/80 w-64 ${
                  hasIntersected 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                <p className="text-sm font-medium text-muted-foreground italic">
                  "{insight}"
                </p>
              </div>
            ))}
          </div>

          {/* Right Side Insights */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-32 space-y-8">
            {insights.slice(2, 4).map((insight, index) => (
              <div
                key={index + 2}
                className={`text-right p-4 rounded-xl bg-card/60 backdrop-blur-sm border border-border/50 transition-all duration-1000 hover:bg-card/80 w-64 ${
                  hasIntersected 
                    ? 'opacity-100 translate-x-0' 
                    : 'opacity-0 translate-x-10'
                }`}
                style={{ transitionDelay: `${1000 + index * 200}ms` }}
              >
                <p className="text-sm font-medium text-muted-foreground italic">
                  "{insight}"
                </p>
              </div>
            ))}
          </div>

          {/* Enhanced Central Flywheel */}
          <div className={`relative w-96 h-96 lg:w-[28rem] lg:h-[28rem] transition-all duration-1000 delay-500 ${
            hasIntersected 
              ? 'opacity-100 scale-100 rotate-0' 
              : 'opacity-0 scale-75 rotate-45'
          }`}>
            
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-2xl"></div>
            
            {/* Main Circle with Gradient Border */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-r from-primary via-accent to-primary p-1">
              <div className="w-full h-full rounded-full bg-background">
                
                {/* Inner Rotating Rings */}
                <div className="absolute inset-4 rounded-full border-2 border-dashed border-primary/30 animate-spin-slow"></div>
                <div className="absolute inset-8 rounded-full border border-dotted border-accent/20 animate-spin-reverse"></div>
                
                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                      NAMESPACE
                    </div>
                    <div className="text-lg text-muted-foreground font-medium">
                      Ecosystem
                    </div>
                  </div>
                </div>

                {/* Enhanced Flywheel Elements */}
                {flywheelElements.map((element, index) => {
                  const positions = {
                    top: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    right: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2", 
                    bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
                    left: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
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
                          : `${positions[element.position as keyof typeof positions].split(' ').slice(1).join(' ')} scale(0.5)`
                      }}
                    >
                      <div className="group bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-lg border border-border/60 rounded-2xl p-6 w-56 text-center shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 hover:border-primary/50">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                          <h3 className="font-bold text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">{element.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{element.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Enhanced Connecting Arrows */}
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
                        transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateY(-180px)`,
                      }}
                    >
                      <div className="relative">
                        <div className="w-0 h-0 border-l-6 border-r-6 border-b-12 border-l-transparent border-r-transparent border-b-primary animate-pulse shadow-lg"></div>
                        <div className="absolute -inset-2 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-primary/20 blur-sm"></div>
                      </div>
                    </div>
                  ))}
                </div>
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
          <h3 className="text-2xl lg:text-3xl font-bold">
            Everything feeds everything.{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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