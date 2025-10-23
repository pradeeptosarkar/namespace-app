import { HackHazardsCTAButtons } from './HackHazardsCTAButtons';

export const HackHazardsHero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-namespace-purple/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-namespace-blue/20 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '-2s' }}></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-namespace-pink/20 rounded-full mix-blend-multiply filter blur-xl animate-float" style={{ animationDelay: '-4s' }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 pt-20">
        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-sora font-bold text-foreground mb-6 tracking-tight">
          HACK<span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">HAZARDS</span> '26
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl font-inter text-muted-foreground mb-8 max-w-3xl mx-auto">
          India's Largest Hackathon, now at a Global Scale.
        </p>

        {/* Date */}
        <div className="mb-12">
          <p className="text-lg md:text-xl font-sora font-semibold text-namespace-purple">
            February '26
          </p>
        </div>

        {/* CTA Buttons */}
        <HackHazardsCTAButtons size="lg" />

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2"></div>
          </div>
        </div> */}
      </div>
    </section>
  );
};