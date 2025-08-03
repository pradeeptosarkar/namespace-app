import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "hello@namespace.tech"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+1 (555) 123-4567"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "San Francisco, CA"
    }
  ];

  return (
    <section className="scroll-section bg-namespace-black text-namespace-white relative overflow-hidden">
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
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-7xl font-sora font-bold leading-tight">
                  Ready to
                  <br />
                  <span className="text-namespace-purple-glow">Join Us?</span>
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
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
                    <div className="flex-shrink-0 w-12 h-12 bg-namespace-white/10 rounded-full flex items-center justify-center">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{info.label}</div>
                      <div className="text-lg font-medium">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-namespace-white/5 backdrop-blur-sm border border-namespace-white/10 rounded-2xl p-8 animate-scale-in">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <Input 
                      placeholder="John"
                      className="bg-namespace-white/10 border-namespace-white/20 text-namespace-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <Input 
                      placeholder="Doe"
                      className="bg-namespace-white/10 border-namespace-white/20 text-namespace-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <Input 
                    type="email"
                    placeholder="john@example.com"
                    className="bg-namespace-white/10 border-namespace-white/20 text-namespace-white placeholder:text-gray-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea 
                    placeholder="Tell us about your goals and how we can help..."
                    rows={4}
                    className="bg-namespace-white/10 border-namespace-white/20 text-namespace-white placeholder:text-gray-400 resize-none"
                  />
                </div>
                
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-namespace-purple hover:bg-primary-hover text-namespace-white font-semibold group shadow-elegant hover:shadow-orbital transition-all duration-300"
                >
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
          
          {/* Footer */}
          <div className="border-t border-namespace-white/10 mt-16 pt-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/lovable-uploads/a80506ea-ea01-43a9-88a5-04fad9724985.png"
                alt="NAMESPACE"
                className="h-8"
              />
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