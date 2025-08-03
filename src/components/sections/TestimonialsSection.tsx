import { Star, Quote } from "lucide-react";

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
    }
  ];

  const partners = [
    "Google", "Microsoft", "Amazon", "Meta", "Apple", "Spotify", "Uber", "Airbnb"
  ];

  return (
    <section className="scroll-section bg-namespace-white text-namespace-black relative overflow-hidden">
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
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-sora font-bold mb-8">
              Success <span className="bg-gradient-purple bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Hear from our community members who are building the future of technology.
            </p>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group bg-namespace-white border-2 border-border rounded-2xl p-8 hover:border-namespace-purple hover:shadow-elegant transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-namespace-purple-glow mb-4" />
                  <p className="text-lg leading-relaxed text-namespace-black mb-6">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Star Rating */}
                  <div className="flex space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="font-sora font-bold text-namespace-black group-hover:text-namespace-purple transition-colors">
                    {testimonial.name}
                  </div>
                  <div className="text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Partner Logos */}
          <div className="text-center">
            <h3 className="text-2xl font-sora font-semibold mb-8 text-muted-foreground">
              Trusted by teams at leading companies
            </h3>
            
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {partners.map((partner, index) => (
                <div 
                  key={index}
                  className="text-2xl font-bold text-namespace-black hover:text-namespace-purple transition-colors cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;