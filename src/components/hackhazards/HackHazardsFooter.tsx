import { HackHazardsCTAButtons } from "./HackHazardsCTAButtons";
import hh26Logo from "@/assets/hh26-logo-green.png";

export const HackHazardsFooter = () => {
  return (
    <footer className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sora font-bold text-foreground mb-8">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">
              Change the World?
            </span>
          </h2>

          <div className="mb-12">
            <HackHazardsCTAButtons size="lg" />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8"></div>

        {/* Footer Links */}
        <div className="flex flex-col justify-between items-center text-center">
          <div className="mb-4 md:mb-0 flex flex-col items-center">
            <img
              src={hh26Logo}
              alt="HACKHAZARDS '26 Logo"
              className="h-32 w-auto mb-2"
            />
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-4">
              <a
                href="/privacy-policy"
                className="text-muted-foreground hover:text-namespace-purple transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="mailto:contact@namespacecomm.in"
                className="text-muted-foreground hover:text-namespace-purple transition-colors"
              >
                Contact Us
              </a>
            </div>
            <p className="text-muted-foreground text-sm">
              © 2026 Namespace Ecosystem India Pvt. Ltd.. Building the Global
              Ecosystem for Humans and Organizations in Tech. Organized by{" "}
              <a
                href="https://namespace.world"
                className="text-namespace-purple hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                NAMESPACE
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
