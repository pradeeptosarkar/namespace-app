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
      className="min-h-screen w-screen flex items-center justify-center relative overflow-hidden bg-background"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary/5 animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full bg-accent/5 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 rounded-full bg-secondary/5 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-5xl lg:text-7xl font-bold mb-6 transition-all duration-1000 ${
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

        {/* Flywheel Visualization */}
        <div className="relative flex items-center justify-center mb-16">
          {/* Central Circle */}
          <div className={`relative w-80 h-80 lg:w-96 lg:h-96 rounded-full border-4 border-primary/20 transition-all duration-1000 delay-500 ${
            hasIntersected 
              ? 'opacity-100 scale-100 rotate-0' 
              : 'opacity-0 scale-75 rotate-45'
          }`}>
            
            {/* Rotating Animation Ring */}
            <div className="absolute inset-4 rounded-full border-2 border-dashed border-accent/30 animate-spin-slow"></div>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  NAMESPACE
                </div>
                <div className="text-sm lg:text-base text-muted-foreground">
                  Ecosystem
                </div>
              </div>
            </div>

            {/* Flywheel Elements */}
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
                  <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 w-48 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <h3 className="font-bold text-lg mb-2 text-foreground">{element.title}</h3>
                    <p className="text-sm text-muted-foreground">{element.description}</p>
                  </div>
                </div>
              );
            })}

            {/* Connecting Arrows */}
            <div className="absolute inset-0">
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`absolute w-8 h-8 transition-all duration-1000 delay-700 ${
                    hasIntersected ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${index * 90}deg) translateY(-150px)`,
                  }}
                >
                  <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-primary animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-1000 hover:bg-card/70 ${
                hasIntersected 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${800 + index * 200}ms` }}
            >
              <p className="text-sm lg:text-base font-medium text-muted-foreground italic">
                "{insight}"
              </p>
            </div>
          ))}
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
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default EcosystemFlywheelSection;