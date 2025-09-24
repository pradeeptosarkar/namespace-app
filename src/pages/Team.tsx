import { Linkedin, Users, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PartnerWithUsButton } from "@/components/PartnerWithUsButton";

// Custom X (Twitter) icon
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const Team = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-2 pb-0">
        <Link to="/#contact">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      {/* SEO Meta Tags */}
      <head>
        <title>Meet Our Team - NAMESPACE | Humans Behind the Tech Ecosystem</title>
        <meta name="description" content="Meet the team building NAMESPACE's global tech ecosystem. Led by founder Pradeepto Sarkar, we're creating space for humans in tech." />
        <meta name="keywords" content="NAMESPACE team, Pradeepto Sarkar, tech ecosystem founders, human-centered technology, startup team" />
        <link rel="canonical" href="https://namespace.world/team" />
      </head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 -mt-4">
        {/* Abstract Tech-Inspired Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Cosmic elements */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full animate-pulse" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-primary/3 rounded-full" />
          
          {/* Tech grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 gap-4 h-full">
              {Array.from({ length: 60 }).map((_, i) => (
                <div 
                  key={i} 
                  className="border border-primary/20 rounded" 
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    animation: "pulse 3s ease-in-out infinite"
                  }} 
                />
              ))}
            </div>
          </div>

          {/* Floating geometric shapes */}
          <div className="absolute top-1/4 right-1/3 w-32 h-32 border-2 border-primary/20 rotate-45 animate-spin" style={{ animationDuration: "20s" }} />
          <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-primary/10 rotate-12 animate-bounce" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/2 left-1/6 w-24 h-24 border border-primary/15 rounded-full animate-ping" style={{ animationDelay: "1s" }} />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-6 py-3 rounded-full mb-8">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Our Team</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold text-foreground leading-tight">
              Meet the Humans
              <br />
              Behind <span className="text-primary">NAMESPACE</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed">
              A growing team building the future of human-centered tech ecosystems.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Founder & CEO Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-sora font-bold text-foreground mb-4">
                Leadership
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </div>

            {/* Pradeepto Sarkar Profile */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
              {/* Profile Image Side */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  {/* Decorative background */}
                  <div className="absolute inset-0 w-80 h-80 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full" />
                  <div className="absolute top-4 left-4 w-72 h-72 border-2 border-primary/20 rounded-full animate-spin" style={{ animationDuration: "30s" }} />
                  
                  {/* Profile Image Container */}
                  <div className="relative w-64 h-64 bg-muted rounded-full overflow-hidden border-4 border-primary/20 mx-8 my-8">
                    <img 
                      src="/team/pradeepto-sarkar.png" 
                      alt="Pradeepto Sarkar - Founder & CEO of NAMESPACE"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay for styling */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-12 right-8 w-4 h-4 bg-primary/40 rounded-full animate-ping" />
                  <div className="absolute bottom-16 left-4 w-3 h-3 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
              </div>

              {/* Profile Content Side */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Founder & CEO</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-sora font-bold text-foreground">
                    Pradeepto Sarkar
                  </h3>
                </div>

                <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                  Pradeepto Sarkar is the founder of NAMESPACE and the driving force behind its vision of 'Space for Humans in Tech.' Starting from building college tech communities, he has led NAMESPACE into global hackathons, partnerships, and now into its journey as a startup. He is passionate about ecosystems, technology, and building opportunities for humans across the world.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4 pt-4">
                  <a 
                    href="https://www.linkedin.com/in/pradeeptosarkar/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-300 group"
                    aria-label="Pradeepto Sarkar's LinkedIn profile"
                  >
                    <Linkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="https://x.com/pradeepto_src" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-300 group"
                    aria-label="Pradeepto Sarkar's X (Twitter) profile"
                  >
                    <TwitterIcon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Diksha Sharma Profile */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Profile Image Side */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  {/* Decorative background */}
                  <div className="absolute inset-0 w-80 h-80 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full" />
                  <div className="absolute top-4 left-4 w-72 h-72 border-2 border-primary/20 rounded-full animate-spin" style={{ animationDuration: "30s" }} />
                  
                  {/* Profile Image Container */}
                  <div className="relative w-64 h-64 bg-muted rounded-full overflow-hidden border-4 border-primary/20 mx-8 my-8">
                    <img 
                      src="/team/diksha-sharma.png" 
                      alt="Diksha Sharma - Co-founder & COO of NAMESPACE"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay for styling */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-12 right-8 w-4 h-4 bg-primary/40 rounded-full animate-ping" style={{ animationDelay: "2s" }} />
                  <div className="absolute bottom-16 left-4 w-3 h-3 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: "3s" }} />
                </div>
              </div>

              {/* Profile Content Side */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Co-founder & COO</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-sora font-bold text-foreground">
                    Diksha Sharma
                  </h3>
                </div>

                <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                  Diksha Sharma is the Co-founder and COO of NAMESPACE, bringing operational excellence and strategic leadership to the team. She plays a crucial role in scaling NAMESPACE's operations and ensuring the smooth execution of initiatives that create meaningful spaces for humans in technology.
                </p>

                {/* Social Links */}
                <div className="flex space-x-4 pt-4">
                  <a 
                    href="https://www.linkedin.com/in/diksha-sharma-1650b1258/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-300 group"
                    aria-label="Diksha Sharma's LinkedIn profile"
                  >
                    <Linkedin className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </a>
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center transition-all duration-300 group"
                    aria-label="Diksha Sharma's X (Twitter) profile"
                  >
                    <TwitterIcon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Expansion Section */}
      <section className="py-20 bg-gradient-to-t from-muted/20 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Decorative Icon */}
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Users className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-sora font-bold text-foreground">
              We're Just Getting Started
            </h2>

            <p className="text-xl md:text-2xl text-muted-foreground font-inter leading-relaxed max-w-3xl mx-auto">
              Our growing team and collaborators are shaping the future of NAMESPACE. Want to build the future with us?
            </p>

            {/* Call to Action */}
            <div className="flex justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold group transition-all duration-300"
              >
                Join Our Team
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Decorative Elements */}
            <div className="flex justify-center pt-8">
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;