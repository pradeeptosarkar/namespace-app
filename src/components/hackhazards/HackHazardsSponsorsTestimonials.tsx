const sponsors = [
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
  { name: "Cybrancee", logo: "/lovable-uploads/6f3c34f5-08ad-4e6a-adea-d40408e0f098.png" }
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {sponsors.map((sponsor, index) => (
              <div 
                key={index}
                className="flex items-center justify-center p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 grayscale hover:grayscale-0"
              >
                <img 
                  src={sponsor.logo} 
                  alt={`${sponsor.name} logo`}
                  className="max-w-full max-h-10 object-contain"
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