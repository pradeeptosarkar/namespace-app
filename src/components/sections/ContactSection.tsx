import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send, Linkedin, Instagram, Twitter, Github, Youtube } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "hello@namespace.tech"
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      url: "#"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      label: "Instagram", 
      url: "#"
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      label: "Twitter",
      url: "#"
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      url: "#"
    },
    {
      icon: <Youtube className="w-6 h-6" />,
      label: "YouTube",
      url: "#"
    }
  ];

  return (
    <section className="scroll-section bg-namespace-black text-namespace-white relative overflow-hidden section-transition">
      {/* Geometric patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 border border-namespace-purple-glow rounded-full animate-orbital-float opacity-30" />
        <div className="absolute bottom-20 left-20 w-24 h-24 border border-namespace-purple-glow rounded-full animate-orbital-float opacity-20" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-namespace-purple-glow rounded-full animate-orbital-float" style={{ animationDelay: '2s' }} />
        
        {/* Additional geometric patterns */}
        <div className="absolute top-16 left-1/4 w-14 h-14 border-2 border-namespace-purple-glow/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-32 right-1/4 w-18 h-18 border border-namespace-purple-glow/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-16 w-10 h-10 bg-namespace-purple-glow/10 rotate-12 animate-spin" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/3 left-16 w-6 h-6 border-2 border-namespace-purple-glow/40 rounded-full animate-ping" style={{ animationDelay: '3s' }} />
        
        {/* Arrow patterns for contact */}
        <div className="absolute top-24 right-1/3 w-12 h-12 border border-namespace-purple-glow/25" style={{
          clipPath: 'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)',
          animation: 'float 5s ease-in-out infinite'
        }} />
        <div className="absolute bottom-28 left-1/3 w-10 h-10 border border-namespace-purple-glow/20" style={{
          clipPath: 'polygon(40% 0%, 40% 20%, 100% 20%, 100% 80%, 40% 80%, 40% 100%, 0% 50%)',
          animation: 'float 3s ease-in-out infinite reverse'
        }} />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center px-4">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8 progressive-reveal order-2 lg:order-1">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-sora font-bold leading-tight">
                Ready to
                <br />
                <span className="text-namespace-purple-glow shimmer-effect">Join Us?</span>
              </h2>
              
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed">
                Whether you're a student, professional, or organization, we'd love to hear from you. 
                Let's build the future of tech together.
              </p>
            </div>
              
              {/* Contact Info */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-4 text-gray-300 hover:text-namespace-purple-glow transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-9 h-9 glassmorphism rounded-full flex items-center justify-center magnetic-element mini-bounce">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{info.label}</div>
                      <div className="text-base font-medium">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <h3 className="text-base font-sora font-semibold text-namespace-white mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      className="flex-shrink-0 w-9 h-9 glassmorphism rounded-full flex items-center justify-center text-gray-300 hover:text-namespace-purple-glow hover:bg-namespace-white/20 transition-all duration-300 magnetic-element mini-bounce"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
          {/* Contact Form */}
          <div className="glassmorphism-dark border border-namespace-white/10 rounded-2xl p-3 sm:p-4 lg:p-6 progressive-reveal glass-glow order-1 lg:order-2">
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      First Name
                    </label>
                    <Input 
                      placeholder="John"
                      className="bg-namespace-white/10 border-namespace-white/20 text-namespace-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Last Name
                    </label>
                    <Input 
                      placeholder="Doe"
                      className="bg-namespace-white/10 border-namespace-white/20 text-namespace-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <Input 
                    type="email"
                    placeholder="john@example.com"
                    className="bg-namespace-white/10 border-namespace-white/20 text-namespace-white placeholder:text-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us about your goals and how we can help..."
                    rows={3}
                    className="bg-namespace-white/10 border-namespace-white/20 text-namespace-white placeholder:text-gray-400 resize-none"
                  />
                </div>
                
                <Button 
                  type="submit"
                  size="default"
                  className="w-full bg-namespace-purple hover:bg-primary-hover text-namespace-white font-semibold group shadow-elegant hover:shadow-orbital transition-all duration-300 magnetic-element glass-glow"
                >
                  Send Message
                  <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
          
          {/* Footer */}
          <div className="border-t border-namespace-white/10 mt-12 pt-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <img 
                src="/lovable-uploads/a80506ea-ea01-43a9-88a5-04fad9724985.png"
                alt="NAMESPACE"
                className="h-6 image-mask-circle magnetic-element"
              />
            </div>
            
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-3">
              <a href="#" className="text-gray-400 hover:text-namespace-purple-glow text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-namespace-purple-glow text-sm transition-colors">
                Corporate Information
              </a>
              <a href="#" className="text-gray-400 hover:text-namespace-purple-glow text-sm transition-colors">
                Brand Guidelines
              </a>
            </div>
            
            <p className="text-gray-400">
              © 2025 NAMESPACE. Building the future of tech ecosystems.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;