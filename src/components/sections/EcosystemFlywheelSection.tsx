import React, { useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const EcosystemFlywheelSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

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
      id="ecosystem"
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
            <span className="text-primary">
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
        <div className="relative flex items-center justify-center mb-12">

          {/* Redesigned Central Flywheel */}
          <div className={`relative w-40 h-40 lg:w-60 lg:h-60 my-8 transition-all duration-1000 delay-500 scale-50 md:scale-75`}>
            
            {/* Subtle background */}
            <div className="absolute inset-0 rounded-full bg-primary/5"></div>
            
            {/* Main Flywheel Container */}
            <div className="absolute inset-6 rounded-full border border-primary/20 bg-background shadow-lg">
              
              {/* Animated Rings */}
              <div className="absolute inset-3 rounded-full border-2 border-dashed border-primary/40 animate-spin-slow"></div>
              <div className="absolute inset-6 rounded-full border border-dotted border-accent/30 animate-spin-reverse opacity-60"></div>
              <div className="absolute inset-9 rounded-full border border-solid border-primary/20 animate-pulse"></div>
              
              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center z-10">
                  <div className="text-2xl lg:text-3xl font-bold mb-2 text-primary">
                    NAMESPACE
                  </div>
                  <div className="text-sm text-muted-foreground font-medium opacity-80">
                    Ecosystem
                  </div>
                </div>
              </div>

              {/* Flywheel Elements - Interactive Cards */}
              {flywheelElements.map((element, index) => {
                const positions = {
                  top: "-top-24 md:-top-20 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  right: "-right-36 md:-right-40 top-1/2 translate-x-1/2 -translate-y-1/2", 
                  bottom: "-bottom-24 md:-bottom-20 left-1/2 -translate-x-1/2 translate-y-1/2",
                  left: "-left-36 md:-left-40 top-1/2 -translate-x-1/2 -translate-y-1/2"
                };

                const isExpanded = expandedCard === index;

                return (
                  <div
                    key={index}
                    className={`absolute ${positions[element.position as keyof typeof positions]} transition-all duration-1000 ${
                      isExpanded ? 'z-50' : 'z-10'
                    }`}
                    style={{ 
                      animationDelay: element.delay,
                      opacity: hasIntersected ? 1 : 0,
                      transform: hasIntersected 
                        ? positions[element.position as keyof typeof positions].split(' ').slice(1).join(' ')
                        : `${positions[element.position as keyof typeof positions].split(' ').slice(1).join(' ')} scale(0.3)`
                    }}
                  >
                    <div className="group relative">
                      {/* Main Card */}
                      <div 
                        className={`relative cursor-pointer border rounded-xl text-center shadow-sm transition-all duration-500 ease-in-out ${
                          isExpanded 
                            ? 'w-[480px] h-[320px] md:w-[600px] md:h-[400px] border-primary/40 shadow-2xl z-50 bg-background/95 backdrop-blur-md' 
                            : 'w-48 h-28 md:w-52 md:h-20 lg:w-60 lg:h-24 border-primary/20 hover:border-primary/30 hover:shadow-md bg-card'
                        } ${
                          isExpanded ? 'p-8' : 'p-4'
                        }`}
                        onMouseEnter={() => {
                          // Only trigger on desktop (non-touch devices)
                          if (!('ontouchstart' in window)) {
                            setExpandedCard(index);
                          }
                        }}
                        onMouseLeave={() => {
                          // Only trigger on desktop (non-touch devices)
                          if (!('ontouchstart' in window)) {
                            setExpandedCard(null);
                          }
                        }}
                        onClick={() => {
                          // Handle mobile touch interactions
                          setExpandedCard(isExpanded ? null : index);
                        }}
                      >
                        {/* Top Border Accent */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
                        
                        <div className="relative z-10 h-full flex flex-col justify-center">
                          <h3 className={`font-bold text-foreground group-hover:text-primary transition-all duration-300 ${
                            isExpanded ? 'text-2xl md:text-3xl mb-6' : 'text-lg md:text-xl lg:text-2xl mb-2'
                          }`}>
                            {element.title}
                          </h3>
                          
                          {/* Description - only visible when expanded */}
                          <div className={`transition-all duration-500 overflow-hidden ${
                            isExpanded 
                              ? 'opacity-100 max-h-96 translate-y-0' 
                              : 'opacity-0 max-h-0 translate-y-4'
                          }`}>
                            <p className={`text-muted-foreground leading-relaxed ${
                              isExpanded ? 'text-lg md:text-xl' : 'text-xs'
                            }`}>
                              {element.description}
                            </p>
                            
                            {/* Expanded content placeholder for future detailed descriptions */}
                            {isExpanded && (
                              <div className="mt-6 space-y-4">
                                <div className="text-sm md:text-base text-muted-foreground opacity-75">
                                  {element.position === 'top' && "Discover new opportunities, connect with like-minded individuals, and showcase your skills through various engaging activities."}
                                  {element.position === 'right' && "Build valuable connections, develop expertise, and unlock career opportunities in our thriving community."}
                                  {element.position === 'bottom' && "Comprehensive programs designed to bridge the gap between learning and real-world application."}
                                  {element.position === 'left' && "Partner with us to discover talent, validate ideas, and contribute to the next generation of innovators."}
                                </div>
                                
                                {/* Close hint for mobile */}
                                <div className="text-xs text-primary/60 mt-4 md:hidden">
                                  Tap to close
                                </div>
                              </div>
                            )}
                          </div>
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
            <span className="text-primary">
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