import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-namespace-black text-namespace-white flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-namespace-purple/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-namespace-purple-glow/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-purple opacity-5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto px-6">
        {/* Large 404 with gradient */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-sora font-bold bg-gradient-purple bg-clip-text text-transparent mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-purple mx-auto rounded-full"></div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-sora font-semibold">
            Lost in the <span className="text-namespace-purple">NAMESPACE</span>?
          </h2>
          
          <p className="text-lg text-namespace-white/70 leading-relaxed">
            The page you're looking for seems to have drifted into another dimension. 
            Don't worry, we'll help you find your way back to our universe.
          </p>

          <div className="text-sm text-namespace-white/50 font-mono bg-namespace-white/5 rounded-lg p-3 border border-namespace-white/10">
            <span className="text-namespace-purple">Route:</span> {location.pathname}
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            className="bg-gradient-purple hover:opacity-90 text-namespace-white font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <a href="/">
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()} 
            className="border-namespace-purple/30 text-namespace-white hover:bg-namespace-purple/10 px-8 py-3 rounded-lg transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Additional info */}
        <div className="mt-16 text-namespace-white/40 text-sm">
          <p>Need help? Contact us or check our documentation</p>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-namespace-purple/30 rounded-full animate-bounce delay-300"></div>
      <div className="absolute bottom-32 right-16 w-3 h-3 bg-namespace-purple-glow/40 rounded-full animate-bounce delay-700"></div>
      <div className="absolute top-1/3 right-10 w-2 h-2 bg-namespace-purple/50 rounded-full animate-bounce delay-500"></div>
    </div>
  );
};

export default NotFound;
