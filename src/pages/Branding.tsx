import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Download, Check, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const Branding = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const logoCategories = [
    {
      title: "Primary Logo",
      description: "Main NAMESPACE logo for official use",
      logos: [
        {
          id: "primary-dark",
          name: "Dark Background",
          preview: "/lovable-uploads/a80506ea-ea01-43a9-88a5-04fad9724985.png",
          pngUrl: "/lovable-uploads/a80506ea-ea01-43a9-88a5-04fad9724985.png",
          svgUrl: "#", // Will be provided later
        },
        {
          id: "primary-light", 
          name: "Light Background",
          preview: "/lovable-uploads/a80506ea-ea01-43a9-88a5-04fad9724985.png",
          pngUrl: "/lovable-uploads/a80506ea-ea01-43a9-88a5-04fad9724985.png",
          svgUrl: "#", // Will be provided later
        }
      ]
    },
    {
      title: "Monogram",
      description: "Simplified logo for small spaces and social media",
      logos: [
        {
          id: "mono-dark",
          name: "Dark Version",
          preview: "/lovable-uploads/a80506ea-ea01-43a9-88a5-04fad9724985.png",
          pngUrl: "/lovable-uploads/a80506ea-ea01-43a9-88a5-04fad9724985.png",
          svgUrl: "#", // Will be provided later
        }
      ]
    },
    {
      title: "Partner Logos",
      description: "Co-branded logos for partners and affiliates",
      logos: [
        {
          id: "partner-horizontal",
          name: "Horizontal Layout",
          preview: "/lovable-uploads/a80506ea-ea01-43a9-88a5-04fad9724985.png",
          pngUrl: "/lovable-uploads/a80506ea-ea01-43a9-88a5-04fad9724985.png",
          svgUrl: "#", // Will be provided later
        }
      ]
    }
  ];

  const copyToClipboard = async (url: string, name: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedItem(name);
      toast.success(`${name} URL copied to clipboard`);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${filename} downloaded`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold mb-6">
              <span className="text-purple-400">Brand</span> Guidelines
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Download official NAMESPACE logos and assets for your projects, presentations, and partnerships.
            </p>
            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Usage Guidelines</h3>
              <ul className="text-left text-muted-foreground space-y-2">
                <li>• Maintain minimum clear space around all logos</li>
                <li>• Do not alter colors, proportions, or typography</li>
                <li>• Use appropriate logo version for your background</li>
                <li>• Always use high-resolution files for print materials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Categories */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            {logoCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-16">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-sora font-bold mb-3">
                    {category.title}
                  </h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.logos.map((logo) => (
                    <Card key={logo.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                        <img 
                          src={logo.preview}
                          alt={logo.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      
                      <h3 className="font-semibold mb-4">{logo.name}</h3>
                      
                      <div className="space-y-3">
                        {/* PNG Download */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">PNG Format</span>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(logo.pngUrl, `${logo.name} PNG`)}
                            >
                              {copiedItem === `${logo.name} PNG` ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => downloadFile(logo.pngUrl, `${logo.name.toLowerCase().replace(' ', '-')}.png`)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* SVG Download */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">SVG Format</span>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(logo.svgUrl, `${logo.name} SVG`)}
                            >
                              {copiedItem === `${logo.name} SVG` ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => downloadFile(logo.svgUrl, `${logo.name.toLowerCase().replace(' ', '-')}.svg`)}
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-sora font-bold mb-4">
              Need Custom Assets?
            </h2>
            <p className="text-gray-600 mb-6">
              If you need custom logos, brand materials, or have questions about brand usage, 
              our team is here to help.
            </p>
            <Button size="lg" className="bg-namespace-purple hover:bg-primary-hover text-namespace-white">
              Contact Brand Team
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Branding;