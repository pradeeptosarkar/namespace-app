import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Instagram, X, Github, Youtube, Users, Hash, Send, Building2, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const ContactSection = () => {
  const ctaSections = [
    {
      title: "Follow Us",
      description: "Stay updated with our latest news and announcements",
      icon: <X className="w-8 h-8" />,
      action: {
        type: "social",
        label: "Social Media",
        platforms: [
          { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, url: "#" },
          { name: "Instagram", icon: <Instagram className="w-5 h-5" />, url: "#" },
          { name: "X", icon: <X className="w-5 h-5" />, url: "#" },
          { name: "WhatsApp", icon: <Phone className="w-5 h-5" />, url: "#" },
          { name: "GitHub", icon: <Github className="w-5 h-5" />, url: "#" },
          { name: "YouTube", icon: <Youtube className="w-5 h-5" />, url: "#" }
        ]
      }
    },
    {
      title: "Join Our Community",
      description: "Connect with fellow students and professionals in tech",
      icon: <Users className="w-8 h-8" />,
      action: {
        type: "community",
        label: "Join Community",
        platforms: [
          { name: "Discord", icon: <Hash className="w-5 h-5" />, url: "#" },
          { name: "Telegram", icon: <Send className="w-5 h-5" />, url: "#" }
        ]
      }
    },
    {
      title: "Partnerships & Business",
      description: "For partnerships, sales inquiries, and institutional collaborations",
      icon: <Building2 className="w-8 h-8" />,
      action: {
        type: "email",
        label: "Contact Us",
        value: "contact@namespacecomm.in",
        buttonText: "Send Email"
      }
    },
    {
      title: "Newsletter",
      description: "Get weekly insights and updates from the Namespace ecosystem",
      icon: <Mail className="w-8 h-8" />,
      action: {
        type: "newsletter",
        label: "Subscribe to Newsletter",
        buttonText: "Subscribe Now"
      }
    }
  ];

  return (
    <section className="scroll-section bg-namespace-black text-namespace-white relative overflow-hidden section-transition">
      {/* Subtle geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 border border-namespace-purple/20 rounded-full opacity-30" />
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-namespace-purple/20 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-namespace-purple/30 rounded-full" />
        
        {/* Clean geometric patterns */}
        <div className="absolute top-16 left-1/4 w-14 h-14 border border-namespace-purple/15 rotate-45" />
        <div className="absolute bottom-32 right-1/4 w-18 h-18 border border-namespace-purple/20 rounded-full" />
        <div className="absolute top-1/2 right-16 w-10 h-10 bg-namespace-purple/5 rotate-12" />
        <div className="absolute bottom-1/3 left-16 w-6 h-6 border border-namespace-purple/25 rounded-full" />
        
        {/* Arrow patterns for contact */}
        <div className="absolute top-24 right-1/3 w-12 h-12 border border-namespace-purple/20" style={{
          clipPath: 'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)'
        }} />
        <div className="absolute bottom-28 left-1/3 w-10 h-10 border border-namespace-purple/15" style={{
          clipPath: 'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)'
        }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 progressive-reveal">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-bold leading-tight mb-6">
              Ready to
              <br />
              <span className="text-purple-400">Connect?</span>
            </h2>
            
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Choose how you'd like to engage with the Namespace ecosystem. 
              Whether you're looking to partner, join our community, or stay updated.
            </p>
          </div>

          {/* CTA Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {ctaSections.map((section, index) => (
              <div 
                key={index}
                className="bg-namespace-black/60 border border-namespace-white/20 rounded-2xl p-6 lg:p-6 progressive-reveal hover:border-namespace-purple/40 transition-all duration-300 group"
              >
                {/* Icon and Title */}
                <div className="flex items-start space-x-4 mb-4 lg:mb-4">
                  <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 bg-namespace-purple/20 border border-namespace-purple/30 rounded-xl flex items-center justify-center text-namespace-purple group-hover:bg-namespace-purple/30 transition-colors">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-xl lg:text-xl font-sora font-bold text-namespace-white mb-2">
                      {section.title}
                    </h3>
                    <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                      {section.description}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 lg:space-y-3">
                  {section.action.type === 'email' && (
                    <div className="space-y-3">
                      {/* <div className="flex items-center space-x-3 text-gray-300 bg-namespace-white/5 rounded-lg p-4">
                        <Mail className="w-5 h-5 text-namespace-purple" />
                        <span className="font-medium">{section.action.value}</span>
                      </div> */}
                      <Button 
                        className="w-full bg-namespace-purple hover:bg-namespace-purple/90 text-white font-semibold"
                        onClick={() => window.location.href = `mailto:${section.action.value}`}
                      >
                        {section.action.buttonText}
                      </Button>
                    </div>
                  )}

                  {section.action.type === 'community' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {section.action.platforms?.map((platform, idx) => (
                          <Button 
                            key={idx}
                            variant="outline"
                            className="flex items-center space-x-2 bg-namespace-white/5 border-namespace-white/20 text-namespace-white hover:bg-namespace-purple/20 hover:border-namespace-purple"
                            onClick={() => window.open(platform.url, '_blank')}
                          >
                            {platform.icon}
                            <span>{platform.name}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.action.type === 'social' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-6 gap-3">
                        {section.action.platforms?.map((platform, idx) => (
                          <Button 
                            key={idx}
                            variant="outline"
                            size="icon"
                            className="bg-namespace-white/5 border-namespace-white/20 text-namespace-white hover:bg-namespace-purple/20 hover:border-namespace-purple aspect-square"
                            onClick={() => window.open(platform.url, '_blank')}
                            title={platform.name}
                          >
                            {platform.icon}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.action.type === 'newsletter' && (
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-namespace-purple hover:bg-namespace-purple/90 text-white font-semibold"
                        onClick={() => {/* Newsletter signup logic */}}
                      >
                        {section.action.buttonText}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-namespace-white/10 mt-6 pt-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <img 
              src="/lovable-uploads/a80506ea-ea01-43a9-88a5-04fad9724985.png"
              alt="NAMESPACE"
              className="h-6"
            />
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-3">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-namespace-purple text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-use" className="text-gray-400 hover:text-namespace-purple text-sm transition-colors">
              Terms of Use
            </Link>
            <a href="#" className="text-gray-400 hover:text-namespace-purple text-sm transition-colors">
              Corporate Information
            </a>
            <Link to="/branding" className="text-gray-400 hover:text-namespace-purple text-sm transition-colors">
              Brand Guidelines
            </Link>
          </div>
          
          <p className="text-gray-400">
            © 2025 Namespace Ecosystem India Pvt. Ltd.. Building the Global Ecosystem for Humans and Organizations in Tech.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;