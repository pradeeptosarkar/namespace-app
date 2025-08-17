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
      suffix: '+',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      key: 'events', 
      value: counts.events,
      target: targetValues.events,
      label: 'Events Conducted',
      suffix: '+',
      color: 'from-green-500 to-emerald-500'
    },
    {
      key: 'institutions',
      value: counts.institutions, 
      target: targetValues.institutions,
      label: 'Institutions Represented',
      suffix: '+',
      color: 'from-purple-500 to-pink-500'
    },
    {
      key: 'partners',
      value: counts.partners,
      target: targetValues.partners,
      label: 'Global Partners',
      suffix: '+', 
      color: 'from-orange-500 to-red-500'
    },
    {
      key: 'hours',
      value: counts.hours,
      target: targetValues.hours,
      label: 'Hours of Learning Delivered',
      suffix: '+',
      color: 'from-indigo-500 to-purple-500'
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

  // Better positioning that avoids the center text area
  const getStatPositions = () => {
    // Desktop positions - avoiding center area
    const desktopPositions = [
      { top: '10%', left: '8%' },      // Top left
      { top: '15%', right: '8%' },     // Top right
      { top: '65%', left: '5%' },      // Bottom left
      { top: '70%', right: '10%' },    // Bottom right
      { top: '35%', left: '2%' }       // Middle left
    ];
    
    // Mobile positions - better organized to avoid center text
    const mobilePositions = [
      { top: '12%', left: '5%' },      // Top left
      { top: '15%', right: '5%' },     // Top right  
      { bottom: '25%', left: '8%' },   // Bottom left
      { bottom: '22%', right: '8%' },  // Bottom right
      { bottom: '8%', left: '50%', transform: 'translateX(-50%)' } // Bottom center
    ];
    
    return window.innerWidth < 768 ? mobilePositions : desktopPositions;
  };

  return (
    <section 
      ref={ref}
      className="scroll-section min-h-screen w-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Geometric patterns */}
        <div className="absolute top-16 left-16 w-64 h-64 border border-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-16 w-32 h-32 border border-white/10 rounded-full animate-pulse delay-500"></div>
        
        {/* Floating dots */}
        <div className="absolute top-24 left-1/3 w-3 h-3 bg-white/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-white/20 rounded-full animate-bounce delay-700"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex flex-col">
        {/* Centered Title */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-4xl">
            <h2 className={`text-4xl md:text-5xl lg:text-7xl font-bold transition-all duration-1000 leading-tight ${
              hasIntersected 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>
              <span className="text-purple-400">Impact</span> <span className="text-white">Created Till Now</span>
            </h2>
          </div>
        </div>

        {/* Strategically Positioned Stats */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {stats.map((stat, index) => {
            const positions = getStatPositions();
            const position = positions[index];
            
            return (
              <div
                key={stat.key}
                className={`absolute group transition-all duration-1000 transform hover:scale-110 pointer-events-auto ${
                  hasIntersected 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-20'
                }`}
                style={{ 
                  ...position,
                  transitionDelay: `${index * 400}ms`
                }}
              >
                <div className="text-center group hover:scale-110 transition-all duration-300">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold mb-1 md:mb-2 text-white">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base font-medium text-white/70 leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Call to Action */}
        <div className={`text-center pb-8 md:pb-12 transition-all duration-1000 delay-1500 ${
          hasIntersected 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10'
        }`}>
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 text-white">
            This is just the beginning
          </h3>
          <p className="text-lg md:text-xl text-white/80">
            Join us as we scale to reach millions of learners worldwide
          </p>
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