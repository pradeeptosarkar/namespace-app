import { Star, Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Senior Developer at Google",
      content: "NAMESPACE transformed my understanding of what's possible in tech. The community here is unparalleled.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez", 
      role: "Startup Founder",
      content: "From concept to Series A in 18 months. The mentorship and resources at NAMESPACE made it possible.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "AI Research Scientist",
      content: "The technical depth and real-world applications I learned here directly led to my dream role in AI research.",
      rating: 5
    },
    {
      name: "Alex Thompson",
      role: "CTO at TechCorp",
      content: "The quality of developers and innovation coming out of NAMESPACE is exceptional. We've hired multiple graduates.",
      rating: 5
    },
    {
      name: "Maya Singh",
      role: "Product Manager at Microsoft",
      content: "NAMESPACE gave me the network and skills to transition from engineering to product management successfully.",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Venture Capitalist",
      content: "We've invested in three startups founded by NAMESPACE alumni. The quality of projects is consistently impressive.",
      rating: 5
    }
  ];

  const partners = [
    "Google", "Microsoft", "Amazon", "Meta", "Apple", "Spotify", "Uber", "Airbnb", 
    "Netflix", "Tesla", "PayPal", "Adobe", "Salesforce", "Oracle", "IBM", "Intel",
    "NVIDIA", "Dropbox", "Slack", "Zoom", "Figma", "GitHub"
  ];

  return (
    <section className="scroll-section bg-namespace-white text-namespace-black relative overflow-hidden section-transition">
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-orbital rounded-full blur-3xl opacity-30 animate-orbital-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-namespace-purple-light rounded-full blur-2xl opacity-50 animate-orbital-float" style={{ animationDelay: '3s' }} />
        
        {/* Additional geometric patterns */}
        <div className="absolute top-16 right-20 w-12 h-12 border-2 border-namespace-purple/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-24 left-1/4 w-16 h-16 border border-namespace-purple/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-20 w-8 h-8 bg-namespace-purple/10 rotate-12 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 right-16 w-6 h-6 border-2 border-namespace-purple/40 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        
        {/* Heart patterns for testimonials */}
        <div className="absolute top-28 left-1/3 w-10 h-10 border border-namespace-purple/25" style={{
          clipPath: 'polygon(50% 85%, 25% 65%, 0% 40%, 0% 25%, 15% 10%, 35% 10%, 50% 25%, 65% 10%, 85% 10%, 100% 25%, 100% 40%, 75% 65%)',
          animation: 'float 6s ease-in-out infinite'
        }} />
        <div className="absolute bottom-32 right-1/3 w-8 h-8 border border-namespace-purple/20" style={{
          clipPath: 'polygon(50% 85%, 25% 65%, 0% 40%, 0% 25%, 15% 10%, 35% 10%, 50% 25%, 65% 10%, 85% 10%, 100% 25%, 100% 40%, 75% 65%)',
          animation: 'float 4s ease-in-out infinite reverse'
        }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto">
          {/* Testimonials Section */}
          <div className="text-center mb-8 lg:mb-12 progressive-reveal px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-sora font-bold mb-4 sm:mb-6">
              Success <span className="bg-gradient-purple bg-clip-text text-transparent shimmer-effect">Stories</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto">
              Hear from our community members who are building the future of technology.
            </p>
          </div>
          
          {/* Testimonials Carousel */}
          <div className="mb-6 px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-6xl mx-auto"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="group glassmorphism border border-border rounded-xl p-2 sm:p-3 hover:border-namespace-purple hover:shadow-elegant transition-all duration-300 h-24 magnetic-element micro-float">
                      <div className="mb-2">
                        <Quote className="w-4 h-4 text-namespace-purple-glow mb-1" />
                        <p className="text-xs leading-relaxed text-namespace-black mb-2 line-clamp-2">
                          "{testimonial.content}"
                        </p>
                      </div>
                      
                      <div>
                        <div className="font-sora font-bold text-xs text-namespace-black group-hover:text-namespace-purple transition-colors">
                          {testimonial.name}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
          </div>
          
          {/* Partner Logos Section - Expanded */}
            <div className="text-center glassmorphism border border-namespace-white/10 rounded-2xl p-8 lg:p-12 glass-glow">
              <h3 className="text-3xl lg:text-4xl font-sora font-semibold mb-12 text-muted-foreground shimmer-effect">
                Trusted by teams at leading companies
              </h3>
            
            {/* Continuous scrolling logos - Larger */}
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-fast">
                {/* First set of logos */}
                {partners.map((partner, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0 text-2xl sm:text-3xl lg:text-4xl font-bold text-namespace-black hover:text-namespace-purple transition-colors cursor-pointer mx-8 lg:mx-12 magnetic-element"
                  >
                    {partner}
                  </div>
                ))}
                {/* Duplicate set for seamless loop */}
                {partners.map((partner, index) => (
                  <div 
                    key={`duplicate-${index}`}
                    className="flex-shrink-0 text-2xl sm:text-3xl lg:text-4xl font-bold text-namespace-black hover:text-namespace-purple transition-colors cursor-pointer mx-8 lg:mx-12"
                  >
                    {partner}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;