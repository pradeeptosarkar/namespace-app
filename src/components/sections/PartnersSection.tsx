import { ScrollArea } from "@/components/ui/scroll-area";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { PartnerWithUsButton } from "../PartnerWithUsButton";

const PartnersSection = () => {
  const { ref, hasIntersected } = useIntersectionObserver({ threshold: 0.3 });


  const partners = [
    { name: "Groq", logo: "/lovable-uploads/f400820a-6bf7-414b-83f8-3fe46fe8ae7b.png" },
    { name: "Base", logo: "/lovable-uploads/511a29ea-e469-42d1-8722-e8bce0b0b938.png" },
    { name: "Stellar", logo: "/lovable-uploads/be12e445-da80-4c80-9e82-0c7541bbb935.png" },
    { name: "Screenpipe", logo: "/lovable-uploads/494b3733-d738-4c2d-8932-f6c4619d7590.png" },
    { name: "Monad", logo: "/lovable-uploads/1711468c-c79a-4158-b499-3ba736136325.png" },
    { name: "InfinyOn", logo: "/lovable-uploads/ac9a36b0-4c29-4cc8-9624-0e002e4005e9.png" },
    { name: "Orkes", logo: "/lovable-uploads/184e5f47-87e0-49aa-b537-7bde42f2b970.png" },
    { name: "Sprint.dev", logo: "/lovable-uploads/9b94fe11-d6bf-4de0-bd24-315ca7e3f4fc.png" },
    { name: "Polygon", logo: "/lovable-uploads/59d38d75-d0be-445c-ba37-f0fdca56bc0d.png" },
    { name: "Tezos", logo: "/lovable-uploads/f3f6164e-6d46-41d0-ae19-b96ab854517e.png" },
    { name: "QuillAudits", logo: "/lovable-uploads/458cc2c0-eb65-4838-87ba-661230e0d633.png" },
    { name: "Push", logo: "/lovable-uploads/24a5e0df-c7b2-45e4-b6e0-2da3774c74c4.png" },
    { name: "TechGig", logo: "/lovable-uploads/f364908e-4af2-4389-80be-99ae0d3b7e25.png" },
    { name: "Solana", logo: "/lovable-uploads/715c756a-1816-4190-a426-510ba7748f09.png" },
    { name: "GeeksforGeeks", logo: "/lovable-uploads/9a96ab5c-b8f5-4046-9aef-af8888b8317f.png" },
    { name: "CSSBattle", logo: "/lovable-uploads/56a25318-36cf-4610-a597-d30c46d32559.png" },
    { name: "Reskill", logo: "/lovable-uploads/af05f95c-f551-4603-9134-6fa6f9f4ce07.png" },
    { name: "Commudle", logo: "/lovable-uploads/1390fc94-6aca-4995-a3dc-5d00b6be10c6.png" },
    { name: "Where U Elevate", logo: "/lovable-uploads/4731d691-9795-4ccf-9e1a-fd0adf7360ce.png" },
    { name: "Bobble", logo: "/lovable-uploads/a4127b4c-c23e-42a1-89bd-06092ab4a4e3.png" },
    { name: "XNetwork", logo: "/lovable-uploads/23c4670e-c747-4d94-aed1-28add4d830f6.png" },
    { name: "Router", logo: "/lovable-uploads/2ad404c6-093e-44a6-9665-1e91f8dbd5d5.png" },
    { name: "Slido", logo: "/lovable-uploads/ff097a2d-3a21-446e-9cf7-2829fd4a60f7.png" },
    { name: "Axure", logo: "/lovable-uploads/72cdc346-8fe1-4ca5-8313-e406b566b556.png" },
    { name: "QuickNode", logo: "/lovable-uploads/4c85da3f-3bdc-48fc-91c3-71dd9eada12c.png" },
    { name: "Cybrancee", logo: "/lovable-uploads/6f3c34f5-08ad-4e6a-adea-d40408e0f098.png" },
  ];

  return (
    <section id="partners" ref={ref} className="scroll-section bg-background text-foreground relative overflow-hidden section-transition">
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-orbital rounded-full blur-3xl opacity-30 animate-orbital-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-namespace-purple-light rounded-full blur-2xl opacity-50 animate-orbital-float" style={{ animationDelay: '3s' }} />
        
        {/* Additional geometric patterns */}
        <div className="absolute top-16 right-20 w-12 h-12 border-2 border-namespace-purple/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-24 left-1/4 w-16 h-16 border border-namespace-purple/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-20 w-8 h-8 bg-namespace-purple/10 rotate-12 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-16 w-6 h-6 border-2 border-namespace-purple/40 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          {/* Partners Section Header */}
          <div className="text-center mb-8 lg:mb-12 progressive-reveal px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sora font-bold mb-4 sm:mb-6">
              <span className="relative inline-block bg-gradient-purple bg-clip-text text-transparent shimmer-effect">
                Our Partners
                {/* Responsive animated hand-drawn dashes - 3 vertical stacked */}
                <svg 
                  className="absolute pointer-events-none" 
                  style={{ 
                    width: '100%', 
                    height: '25px',
                    left: '0',
                    top: '100%'
                  }}
                  viewBox="0 0 100 15" 
                  preserveAspectRatio="xMidYMin meet"
                >
                  {/* First dash - hand-drawn curve */}
                  <path
                    d="M12,3 Q30,2.5 50,3.2 Q70,4 88,3.5"
                    stroke="rgb(139, 92, 246)"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                    style={{
                      strokeDasharray: '80',
                      strokeDashoffset: hasIntersected ? '0' : '80',
                      transition: 'stroke-dashoffset 0.8s ease-out 1.5s'
                    }}
                  />
                  {/* Second dash - slightly wavy */}
                  <path
                    d="M16,7 Q35,6.8 52,7.3 Q68,7.8 84,7.2"
                    stroke="rgb(139, 92, 246)"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                    style={{
                      strokeDasharray: '70',
                      strokeDashoffset: hasIntersected ? '0' : '70',
                      transition: 'stroke-dashoffset 0.8s ease-out 2s'
                    }}
                  />
                  {/* Third dash - more organic curve */}
                  <path
                    d="M22,11 Q40,10.5 55,11.2 Q72,11.9 78,11.3"
                    stroke="rgb(139, 92, 246)"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                    style={{
                      strokeDasharray: '60',
                      strokeDashoffset: hasIntersected ? '0' : '60',
                      transition: 'stroke-dashoffset 0.8s ease-out 2.5s'
                    }}
                  />
                </svg>
              </span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto">
              Organizations that have trusted us to build the future of technology together.
            </p>
          </div>
          
          {/* Partner Logos Section */}
          <div className="text-center glassmorphism border border-namespace-white/10 rounded-2xl p-8 glass-glow mb-8">
            <h3 className="text-3xl lg:text-4xl font-sora font-semibold mb-6 text-muted-foreground shimmer-effect">
              Partners we are proud to have worked with
            </h3>
            
            {/* Enhanced scrolling logos - Larger, colored, and manually scrollable */}
            <ScrollArea className="relative h-32 w-full">
              <div className="flex animate-[scroll_120.000s_linear_infinite] items-center hover:[animation-play-state:paused] w-max">
                {/* First set of logos */}
                {partners.map((partner, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 mx-16 lg:mx-20 xl:mx-24 magnetic-element cursor-pointer hover:scale-110 transition-transform duration-300"
                  >
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="h-16 sm:h-20 lg:h-24 xl:h-28 w-auto object-contain hover:scale-110 transition-all duration-300"
                    />
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {partners.map((partner, index) => (
                  <div 
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 mx-16 lg:mx-20 xl:mx-24 cursor-pointer hover:scale-110 transition-transform duration-300"
                  >
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      loading="lazy"
                      decoding="async"
                      className="h-16 sm:h-20 lg:h-24 xl:h-28 w-auto object-contain hover:scale-110 transition-all duration-300"
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Partnership CTA */}
          <div className="text-center">
            <PartnerWithUsButton />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;