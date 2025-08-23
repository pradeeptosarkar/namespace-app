import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Mail, Linkedin, Instagram, X, Github, Youtube, Users, Hash, Send, Building2, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Custom brand icons as SVG components
const TwitterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
  </svg>
);

const DiscordIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0188 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/>
  </svg>
);

const TelegramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const YouTubeIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const SocialMediaIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    <circle cx="7" cy="7" r="2"/>
    <circle cx="17" cy="7" r="2"/>
    <circle cx="7" cy="17" r="2"/>
    <circle cx="17" cy="17" r="2"/>
  </svg>
);

const CommunityIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.997 2.997 0 0 0 17.06 7H16.94c-1.05 0-2.02.55-2.58 1.37L12.82 11H9v2h5l-1.94 9H16z"/>
    <circle cx="12.5" cy="11.5" r="2.5"/>
    <path d="M5.32 13.5L7 21h1.94l-1.94-9H9v-2H5.32z"/>
    <circle cx="7" cy="4" r="2"/>
  </svg>
);

const NewsletterIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    <path d="M12 13l-2-1.5v3l2-1.5zm0 0l2-1.5v3l-2-1.5z"/>
  </svg>
);

const BusinessIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
  </svg>
);

const ContactSection = () => {
  const [openDialog, setOpenDialog] = useState(null);

  const ctaSections = [
    {
      title: "Follow Us",
      description: "Stay updated with our latest news and announcements",
      icon: <SocialMediaIcon className="w-8 h-8" />,
      action: {
        type: "social",
        label: "Social Media",
        platforms: [
          { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, url: "https://www.linkedin.com/company/namespaceworld/", stats: "2.5K+ followers" },
          { name: "Instagram", icon: <Instagram className="w-5 h-5" />, url: "https://www.instagram.com/namespaceworld/", stats: "1.8K+ followers" },
          { name: "X", icon: <TwitterIcon className="w-5 h-5" />, url: "https://x.com/namespaceworld", stats: "900+ followers" },
          { name: "WhatsApp", icon: <WhatsAppIcon className="w-5 h-5" />, url: "https://www.whatsapp.com/channel/0029VabtgrVKLaHjzSXEL52f", stats: "500+ subscribers" },
          { name: "GitHub", icon: <Github className="w-5 h-5" />, url: "https://github.com/namespacecomm", stats: "350+ stars" },
          { name: "YouTube", icon: <YouTubeIcon className="w-5 h-5" />, url: "https://www.youtube.com/@namespaceworld", stats: "750+ subscribers" }
        ]
      }
    },
    {
      title: "Join Our Community",
      description: "Connect with fellow students and professionals in tech",
      icon: <CommunityIcon className="w-8 h-8" />,
      action: {
        type: "community",
        label: "Join Community",
        platforms: [
          { name: "Discord", icon: <DiscordIcon className="w-5 h-5" />, url: "https://discord.com/invite/z2fTnXjKMm", stats: "1.2K+ members" },
          { name: "Telegram", icon: <TelegramIcon className="w-5 h-5" />, url: "#", stats: "800+ members" }
        ]
      }
    },
    {
      title: "Partnerships & Business",
      description: "For partnerships, sales inquiries, and institutional collaborations",
      icon: <BusinessIcon className="w-8 h-8" />,
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
      icon: <NewsletterIcon className="w-8 h-8" />,
      action: {
        type: "newsletter",
        label: "Subscribe to Newsletter",
        value: "https://namespacecomm.substack.com/",
        buttonText: "Subscribe Now",
        stats: "3.5K+ subscribers"
      }
    }
  ];

  return (
    <section id="contact" className="scroll-section bg-namespace-black text-namespace-white relative overflow-hidden section-transition">
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
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 progressive-reveal">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-sora font-bold leading-tight mb-4">
              Ready to
              <br />
              <span className="text-purple-400">Connect?</span>
            </h2>
            
            <p className="text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Choose how you'd like to engage with the NAMESPACE Ecosystem. 
              Whether you're looking to partner, join our community, or stay updated.
            </p>
          </div>

          {/* Compact CTA Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            {ctaSections.map((section, index) => (
              <Dialog key={index} open={openDialog === index} onOpenChange={(open) => setOpenDialog(open ? index : null)}>
                <DialogTrigger asChild>
                  <div className="bg-namespace-black/60 border border-namespace-white/20 rounded-2xl p-4 progressive-reveal hover:border-namespace-purple/40 transition-all duration-300 group cursor-pointer hover:bg-namespace-black/80 aspect-square flex flex-col items-center justify-center text-center scale-75 md:scale-50 origin-center">
                    <div className="w-8 h-8 bg-namespace-purple/20 border border-namespace-purple/30 rounded-lg flex items-center justify-center text-namespace-purple group-hover:bg-namespace-purple/30 transition-colors mb-2">
                      {section.icon}
                    </div>
                    <h3 className="text-sm font-sora font-bold text-namespace-white leading-tight">
                      {section.title}
                    </h3>
                  </div>
                </DialogTrigger>
                
                <DialogContent className="bg-namespace-black border-namespace-white/20 text-namespace-white max-w-md">
                  <div className="p-2">
                    {/* Icon and Title */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="flex-shrink-0 w-14 h-14 bg-namespace-purple/20 border border-namespace-purple/30 rounded-xl flex items-center justify-center text-namespace-purple">
                        {section.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-sora font-bold text-namespace-white mb-2">
                          {section.title}
                        </h3>
                        <p className="text-base text-gray-300 leading-relaxed">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      {section.action.type === 'email' && (
                        <div className="space-y-3">
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
                          <div className="grid grid-cols-1 gap-3">
                            {section.action.platforms?.map((platform, idx) => (
                              <Button 
                                key={idx}
                                variant="outline"
                                className="flex items-center justify-between bg-namespace-white/5 border-namespace-white/20 text-namespace-white hover:bg-namespace-purple/20 hover:border-namespace-purple p-4 h-auto"
                                onClick={() => window.open(platform.url, '_blank')}
                              >
                                <div className="flex items-center space-x-3">
                                  {platform.icon}
                                  <span className="font-medium">{platform.name}</span>
                                </div>
                                <span className="text-sm text-namespace-purple font-semibold">{platform.stats}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {section.action.type === 'social' && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 gap-2">
                            {section.action.platforms?.map((platform, idx) => (
                              <Button 
                                key={idx}
                                variant="outline"
                                className="flex items-center justify-between bg-namespace-white/5 border-namespace-white/20 text-namespace-white hover:bg-namespace-purple/20 hover:border-namespace-purple p-3 h-auto"
                                onClick={() => window.open(platform.url, '_blank')}
                              >
                                <div className="flex items-center space-x-3">
                                  {platform.icon}
                                  <span className="font-medium">{platform.name}</span>
                                </div>
                                <span className="text-sm text-namespace-purple font-semibold">{platform.stats}</span>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      {section.action.type === 'newsletter' && (
                        <div className="space-y-3">
                          <div className="bg-namespace-white/5 border border-namespace-white/10 rounded-lg p-3 mb-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-300">Subscribers</span>
                              <span className="text-lg font-bold text-namespace-purple">{section.action.stats}</span>
                            </div>
                          </div>
                          <Button 
                            className="w-full bg-namespace-purple hover:bg-namespace-purple/90 text-white font-semibold"
                            onClick={() => window.open(section.action.value, '_blank')}
                          >
                            {section.action.buttonText}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-namespace-white/10 pt-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <img 
              src="/lovable-uploads/a80506ea-ea01-43a9-88a5-04fad9724985.png"
              alt="NAMESPACE"
              className="h-5"
            />
          </div>
          
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-2">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-namespace-purple text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-use" className="text-gray-400 hover:text-namespace-purple text-sm transition-colors">
              Terms of Use
            </Link>
            <Link to="/branding" className="text-gray-400 hover:text-namespace-purple text-sm transition-colors">
              Brand Guidelines
            </Link>
          </div>
          
          <p className="text-gray-400 text-sm">
            © 2025 Namespace Ecosystem India Pvt. Ltd.. Building the Global Ecosystem for Humans and Organizations in Tech.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;