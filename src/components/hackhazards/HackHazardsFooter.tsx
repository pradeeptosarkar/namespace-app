import { CTAButton } from './CTAButton';
import hh26Logo from '@/assets/hh26-logo-green.png';

export const HackHazardsFooter = () => {
  return (
    <footer className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main CTA Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sora font-bold text-foreground mb-8">
            Ready to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">
              Change the World?
            </span>
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <CTAButton variant="primary" size="lg">
              Applications Opening Soon
            </CTAButton>
            <CTAButton 
              variant="secondary" 
              size="lg" 
              href="mailto:contact@namespacecomm.in"
            >
              Partner with Us
            </CTAButton>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8"></div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0 flex flex-col items-center md:items-start">
            <img 
              src={hh26Logo} 
              alt="HACKHAZARDS '26 Logo" 
              className="h-12 w-auto mb-2"
            />
            <p className="text-muted-foreground text-sm">
              © 2026 HACKHAZARDS. Organized by{' '}
              <a 
                href="https://namespacecomm.in" 
                className="text-namespace-purple hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                NAMESPACE
              </a>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
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
        </div>
      </div>
    </footer>
  );
};