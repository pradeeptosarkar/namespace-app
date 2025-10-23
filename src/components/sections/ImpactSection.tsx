import React, { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const ImpactSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });
  const [counts, setCounts] = useState({
    participants: 0,
    events: 0, 
    institutions: 0,
    partners: 0,
    hours: 0
  });

  const targetValues = {
    participants: 50000,
    events: 100,
    institutions: 2000,
    partners: 50,
    hours: 1000
  };

  const stats = [
    {
      key: 'participants',
      value: counts.participants,
      target: targetValues.participants,
      label: 'Participants Reached',
      suffix: '+'
    },
    {
      key: 'events', 
      value: counts.events,
      target: targetValues.events,
      label: 'Events Conducted',
      suffix: '+'
    },
    {
      key: 'institutions',
      value: counts.institutions, 
      target: targetValues.institutions,
      label: 'Institutions Represented',
      suffix: '+'
    },
    {
      key: 'partners',
      value: counts.partners,
      target: targetValues.partners,
      label: 'Global Partners',
      suffix: '+'
    },
    {
      key: 'hours',
      value: counts.hours,
      target: targetValues.hours,
      label: 'Hours of Learning Delivered',
      suffix: '+'
    }
  ];

  useEffect(() => {
    if (!hasIntersected) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const interval = duration / steps;

    const timers = Object.keys(targetValues).map((key) => {
      const target = targetValues[key as keyof typeof targetValues];
      const increment = target / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const currentValue = Math.min(Math.floor(increment * currentStep), target);
        
        setCounts(prev => ({
          ...prev,
          [key]: currentValue
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);

      return timer;
    });

    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [hasIntersected]);

  return (
    <section 
      id="impact"
      ref={ref}
      className="scroll-section min-h-screen w-screen flex items-center justify-center relative overflow-hidden bg-background"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Geometric patterns */}
        <div className="absolute top-16 left-16 w-64 h-64 border border-namespace-purple/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-namespace-purple/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-16 w-32 h-32 border border-namespace-purple/10 rounded-full animate-pulse delay-500"></div>
        
        {/* Floating dots */}
        <div className="absolute top-24 left-1/3 w-3 h-3 bg-namespace-purple/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-namespace-purple/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-namespace-purple/20 rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex flex-col justify-center items-center">
        {/* Main Content Container */}
        <div className="text-center max-w-6xl mx-auto">
          {/* Title */}
          <h2 className={`text-4xl md:text-5xl lg:text-7xl font-bold mb-16 md:mb-20 transition-all duration-1000 leading-tight ${
            hasIntersected 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <span className="text-primary">Impact</span> <span className="text-foreground">Created Till Now</span>
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-6 lg:gap-8 mb-16 md:mb-20">
            {stats.map((stat, index) => (
              <div
                key={stat.key}
                className={`group transition-all duration-1000 transform hover:scale-110 ${
                  hasIntersected 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ 
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="bg-card border border-border rounded-2xl p-4 md:p-8 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 h-20 md:h-36 flex items-center justify-center">
                  <div className="flex flex-row md:flex-col items-center justify-between md:justify-center w-full h-full">
                    <div className="text-2xl md:text-2xl lg:text-3xl font-bold md:mb-3 text-foreground flex items-center justify-center w-1/2 md:w-full h-full border-r md:border-r-0 border-border">
                      {stat.value.toLocaleString()}{stat.suffix}
                    </div>
                    <div className="text-sm md:text-sm font-medium text-muted-foreground leading-tight flex items-center justify-center w-1/2 md:w-full h-full md:text-center px-3 md:px-0">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className={`text-center transition-all duration-1000 delay-1000 ${
            hasIntersected 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-foreground">
              This is just the beginning
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground">
              Join us as we scale to reach millions of learners worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ImpactSection;