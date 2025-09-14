const sponsors = [
  { name: 'Google', logo: '/logos/partners/google-logo.svg' },
  { name: 'Microsoft', logo: '/logos/partners/microsoft-logo.svg' },
  { name: 'Amazon', logo: '/logos/partners/amazon-logo.svg' },
  { name: 'Meta', logo: '/logos/partners/meta-logo.svg' },
  { name: 'Apple', logo: '/logos/partners/apple-logo.svg' },
  { name: 'Netflix', logo: '/logos/partners/netflix-logo.svg' },
];

const testimonials = [
  {
    quote: "HACKHAZARDS gave me the platform to showcase my AI project. Six months later, I'm leading ML at a unicorn startup.",
    author: "Priya Sharma",
    role: "ML Engineer, TechCorp"
  },
  {
    quote: "The mentorship and networking opportunities at HACKHAZARDS are unmatched. It's where careers are made.",
    author: "Rahul Gupta",
    role: "Founder, BlockchainStartup"
  },
  {
    quote: "From hackathon participant to funded entrepreneur—HACKHAZARDS made it possible.",
    author: "Anjali Patel",
    role: "CEO, InnovateAI"
  }
];

export const HackHazardsSponsorsTestimonials = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Sponsors Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-sora font-bold text-foreground mb-6">
              Past{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">
                Sponsors
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Industry leaders who believe in the future we're building together.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {sponsors.map((sponsor, index) => (
              <div 
                key={index}
                className="flex items-center justify-center p-6 rounded-lg bg-card border border-border hover:border-namespace-purple/50 transition-all duration-300 hover:scale-105 grayscale hover:grayscale-0"
              >
                <img 
                  src={sponsor.logo} 
                  alt={`${sponsor.name} logo`}
                  className="max-w-full max-h-12 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-sora font-bold text-foreground mb-6">
              Success{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">
                Stories
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Real stories from participants who transformed their careers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-8 rounded-2xl bg-card border border-border hover:border-namespace-purple/50 transition-all duration-300 hover:scale-105"
              >
                {/* Quote */}
                <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div>
                  <cite className="text-foreground font-semibold not-italic">
                    {testimonial.author}
                  </cite>
                  <p className="text-sm text-muted-foreground mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};