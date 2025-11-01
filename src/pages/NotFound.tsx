import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const NotFound = () => {
  const location = useLocation();
  const { setTheme } = useTheme();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        {/* Large 404 with gradient */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-sora font-bold text-primary mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-sora font-semibold text-foreground">
            Lost in the <span className="text-primary">NAMESPACE</span>?
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            The page you're looking for seems to have drifted into another dimension. 
            Don't worry, we'll help you find your way back to our universe.
          </p>

          <div className="text-sm text-muted-foreground/70 font-mono bg-muted/50 rounded-lg p-3 border border-border">
            <span className="text-primary">Route:</span> {location.pathname}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            className="bg-primary hover:bg-primary/90 font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <a href="/">
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()} 
            className="px-8 py-3 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Additional info */}
        <div className="mt-16 text-muted-foreground/60 text-sm">
          <p>Need help? Contact us or check our documentation</p>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary/30 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-primary/20 rounded-full animate-bounce delay-700"></div>
      <div className="absolute top-1/3 right-10 w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-500"></div>
    </div>
  );
};

export default NotFound;
