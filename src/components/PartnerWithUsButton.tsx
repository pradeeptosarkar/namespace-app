import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, Handshake, Target, Users, Mail } from "lucide-react";

interface PartnerWithUsButtonProps {
  variant?: "default" | "outline";
  size?: "default" | "lg";
  className?: string;
}

export const PartnerWithUsButton = ({ 
  variant = "default", 
  size = "lg",
  className = ""
}: PartnerWithUsButtonProps) => {
  const partnershipOpportunities = [
    {
      icon: Target,
      title: "Custom Hackathons & Activations",
      description: "Launch custom hackathons, business development activities and developer community activations"
    },
    {
      icon: Handshake,
      title: "Flagship Event Sponsorship",
      description: "Sponsor flagship events of NAMESPACE"
    },
    {
      icon: Building2,
      title: "Educational Institution Programs",
      description: "For educational institutions - launch new age skill-based learning programs"
    },
    {
      icon: Users,
      title: "Hiring & Recruitment",
      description: "For companies - hire better with us with end to end support"
    },
    {
      icon: Users,
      title: "Community Partnerships",
      description: "For communities - Partner with us to create bigger impact"
    }
  ];

  const buttonClasses = variant === "outline" 
    ? "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
    : "bg-gradient-purple hover:bg-gradient-purple/90 text-white shadow-elegant hover:shadow-glow";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          size={size}
          className={`font-sora font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 magnetic-element ${buttonClasses} ${className}`}
        >
          Partner With Us
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-sora font-bold text-center mb-2">
            Partnership Opportunities
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Discover how we can collaborate to build the future of technology together.
          </DialogDescription>
        </DialogHeader>
        
        {/* Mobile: Single column, Desktop: Two columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {partnershipOpportunities.map((opportunity, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 rounded-lg border border-border hover:border-namespace-purple/50 transition-colors">
              <opportunity.icon className="w-6 h-6 text-namespace-purple mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm mb-2">{opportunity.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{opportunity.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-3">
            Ready to explore partnership opportunities?
          </p>
          <a 
            href="mailto:contact@namespacecomm.in"
            className="inline-flex items-center space-x-2 bg-gradient-purple hover:bg-gradient-purple/90 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium"
          >
            <Mail className="w-4 h-4" />
            <span>contact@namespacecomm.in</span>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};