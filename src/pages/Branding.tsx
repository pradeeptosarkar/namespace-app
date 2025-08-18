import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, Download, Check, ArrowLeft, Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

const Branding = () => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const logoCategories = [
    {
      title: "Logomark",
      description: "The NAMESPACE symbol for compact brand representation",
      logos: [
        {
          id: "logomark-primary",
          name: "Primary",
          preview: "/logos/logomark/logomark-primary.png",
          pngUrl: "/logos/logomark/logomark-primary.png",
          svgUrl: "/logos/logomark/logomark-primary.svg",
        },
        {
          id: "logomark-white",
          name: "White",
          preview: "/logos/logomark/logomark-white.png",
          pngUrl: "/logos/logomark/logomark-white.png",
          svgUrl: "/logos/logomark/logomark-white.svg",
        },
        {
          id: "logomark-black",
          name: "Black",
          preview: "/logos/logomark/logomark-black.png",
          pngUrl: "/logos/logomark/logomark-black.png",
          svgUrl: "/logos/logomark/logomark-black.svg",
        }
      ]
    },
    {
      title: "Horizontal Logo",
      description: "Full NAMESPACE logo in horizontal format",
      logos: [
        {
          id: "horizontal-primary",
          name: "Primary",
          preview: "/logos/horizontal/horizontal-primary.png",
          pngUrl: "/logos/horizontal/horizontal-primary.png",
          svgUrl: "/logos/horizontal/horizontal-primary.svg",
        },
        {
          id: "horizontal-white",
          name: "White",
          preview: "/logos/horizontal/horizontal-white.png",
          pngUrl: "/logos/horizontal/horizontal-white.png",
          svgUrl: "/logos/horizontal/horizontal-white.svg",
        },
        {
          id: "horizontal-black",
          name: "Black",
          preview: "/logos/horizontal/horizontal-black.png",
          pngUrl: "/logos/horizontal/horizontal-black.png",
          svgUrl: "/logos/horizontal/horizontal-black.svg",
        }
      ]
    },
    {
      title: "Vertical Logo",
      description: "Full NAMESPACE logo in vertical format",
      logos: [
        {
          id: "vertical-primary",
          name: "Primary",
          preview: "/logos/vertical/vertical-primary.png",
          pngUrl: "/logos/vertical/vertical-primary.png",
          svgUrl: "/logos/vertical/vertical-primary.svg",
        },
        {
          id: "vertical-white",
          name: "White",
          preview: "/logos/vertical/vertical-white.png",
          pngUrl: "/logos/vertical/vertical-white.png",
          svgUrl: "/logos/vertical/vertical-white.svg",
        },
        {
          id: "vertical-black",
          name: "Black",
          preview: "/logos/vertical/vertical-black.png",
          pngUrl: "/logos/vertical/vertical-black.png",
          svgUrl: "/logos/vertical/vertical-black.svg",
        }
      ]
    },
    {
      title: "NAMESPACE Ecosystem Logo - Horizontal",
      description: "Ecosystem branding for community and partner initiatives",
      logos: [
        {
          id: "ecosystem-horizontal-primary",
          name: "Primary",
          preview: "/logos/ecosystem-horizontal/ecosystem-horizontal-primary.png",
          pngUrl: "/logos/ecosystem-horizontal/ecosystem-horizontal-primary.png",
          svgUrl: "/logos/ecosystem-horizontal/ecosystem-horizontal-primary.svg",
        },
        {
          id: "ecosystem-horizontal-white",
          name: "White",
          preview: "/logos/ecosystem-horizontal/ecosystem-horizontal-white.png",
          pngUrl: "/logos/ecosystem-horizontal/ecosystem-horizontal-white.png",
          svgUrl: "/logos/ecosystem-horizontal/ecosystem-horizontal-white.svg",
        },
        {
          id: "ecosystem-horizontal-black",
          name: "Black",
          preview: "/logos/ecosystem-horizontal/ecosystem-horizontal-black.png",
          pngUrl: "/logos/ecosystem-horizontal/ecosystem-horizontal-black.png",
          svgUrl: "/logos/ecosystem-horizontal/ecosystem-horizontal-black.svg",
        }
      ]
    },
    {
      title: "NAMESPACE Ecosystem Logo - Vertical",
      description: "Ecosystem branding in vertical layout for various applications",
      logos: [
        {
          id: "ecosystem-vertical-primary",
          name: "Primary",
          preview: "/logos/ecosystem-vertical/ecosystem-vertical-primary.png",
          pngUrl: "/logos/ecosystem-vertical/ecosystem-vertical-primary.png",
          svgUrl: "/logos/ecosystem-vertical/ecosystem-vertical-primary.svg",
        },
        {
          id: "ecosystem-vertical-white",
          name: "White",
          preview: "/logos/ecosystem-vertical/ecosystem-vertical-white.png",
          pngUrl: "/logos/ecosystem-vertical/ecosystem-vertical-white.png",
          svgUrl: "/logos/ecosystem-vertical/ecosystem-vertical-white.svg",
        },
        {
          id: "ecosystem-vertical-black",
          name: "Black",
          preview: "/logos/ecosystem-vertical/ecosystem-vertical-black.png",
          pngUrl: "/logos/ecosystem-vertical/ecosystem-vertical-black.png",
          svgUrl: "/logos/ecosystem-vertical/ecosystem-vertical-black.svg",
        }
      ]
    }
  ];

  // Copy image to clipboard (works for PNG images)
  const copyImageToClipboard = async (url: string, name: string, format: string) => {
    try {
      if (format === 'SVG') {
        // For SVG, copy the SVG content as text
        const response = await fetch(url);
        const svgText = await response.text();
        await navigator.clipboard.writeText(svgText);
        setCopiedItem(name);
        toast.success(`${name} SVG code copied to clipboard`);
      } else {
        // For PNG, copy the actual image
        const response = await fetch(url);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob
          })
        ]);
        setCopiedItem(name);
        toast.success(`${name} image copied to clipboard`);
      }
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      // Fallback to copying URL if image copy fails
      try {
        const fullUrl = window.location.origin + url;
        await navigator.clipboard.writeText(fullUrl);
        setCopiedItem(name);
        toast.success(`${name} URL copied to clipboard (image copy not supported)`);
        setTimeout(() => setCopiedItem(null), 2000);
      } catch (fallbackErr) {
        toast.error("Failed to copy to clipboard");
      }
    }
  };

  // Copy URL to clipboard
  const copyUrlToClipboard = async (url: string, name: string) => {
    try {
      const fullUrl = window.location.origin + url;
      await navigator.clipboard.writeText(fullUrl);
      setCopiedItem(`${name} URL`);
      toast.success(`${name} URL copied to clipboard`);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      toast.error("Failed to copy URL to clipboard");
    }
  };

  const downloadFile = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${filename} downloaded`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/#contact">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="bg-background">
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
                <li>• Maintain clear space around all logos</li>
                <li>• Do not alter colors, proportions, or typography</li>
                <li>• Use appropriate logo version for your background</li>
                <li>• Always use high-resolution files for print materials</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Categories */}
      <section className="py-4">
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
                          alt={`${category.title} - ${logo.name}`}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            e.currentTarget.src = "/lovable-uploads/a80506ea-ea01-43a9-88a5-04fad9724985.png";
                          }}
                        />
                      </div>
                      
                      <h3 className="font-semibold mb-4">{logo.name}</h3>
                      
                      <div className="space-y-3">
                        {/* PNG Actions */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">PNG Format</span>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyImageToClipboard(logo.pngUrl, `${logo.name} PNG`, 'PNG')}
                              title="Copy image to clipboard"
                            >
                              {copiedItem === `${logo.name} PNG` ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyUrlToClipboard(logo.pngUrl, `${logo.name} PNG`)}
                              title="Copy URL to clipboard"
                            >
                              {copiedItem === `${logo.name} PNG URL` ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <LinkIcon className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => downloadFile(logo.pngUrl, `${category.title.toLowerCase().replace(/\s+/g, '-')}-${logo.name.toLowerCase().replace(' ', '-')}.png`)}
                              title="Download file"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* SVG Actions */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">SVG Format</span>
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyImageToClipboard(logo.svgUrl, `${logo.name} SVG`, 'SVG')}
                              title="Copy SVG code to clipboard"
                            >
                              {copiedItem === `${logo.name} SVG` ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyUrlToClipboard(logo.svgUrl, `${logo.name} SVG`)}
                              title="Copy URL to clipboard"
                            >
                              {copiedItem === `${logo.name} SVG URL` ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <LinkIcon className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => downloadFile(logo.svgUrl, `${category.title.toLowerCase().replace(/\s+/g, '-')}-${logo.name.toLowerCase().replace(' ', '-')}.svg`)}
                              title="Download file"
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

      {/* Brand Colors Section */}
      <section className="py-4">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-sora font-bold mb-3">
                Brand Colors
              </h2>
              <p className="text-gray-600">
                Official NAMESPACE color palette for consistent brand representation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* NAMESPACE Purple */}
              <Card className="overflow-hidden">
                <div 
                  className="h-32 w-full"
                  style={{ backgroundColor: '#8100C4' }}
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-4">NAMESPACE Purple</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">HEX:</span>
                      <span className="font-mono">#8100C4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RGB:</span>
                      <span className="font-mono">129, 0, 196</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CMYK:</span>
                      <span className="font-mono">34, 100, 0, 23</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* NAMESPACE White */}
              <Card className="overflow-hidden">
                <div 
                  className="h-32 w-full border-b"
                  style={{ backgroundColor: '#E6E6E6' }}
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-4">NAMESPACE White</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">HEX:</span>
                      <span className="font-mono">#E6E6E6</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RGB:</span>
                      <span className="font-mono">230, 230, 230</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CMYK:</span>
                      <span className="font-mono">0, 0, 0, 10</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* NAMESPACE Black */}
              <Card className="overflow-hidden">
                <div 
                  className="h-32 w-full"
                  style={{ backgroundColor: '#2E2E2E' }}
                />
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-4">NAMESPACE Black</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">HEX:</span>
                      <span className="font-mono">#2E2E2E</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">RGB:</span>
                      <span className="font-mono">46, 46, 46</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CMYK:</span>
                      <span className="font-mono">0, 0, 0, 82</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section className="py-4 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-sora font-bold mb-3">
                Typography
              </h2>
              <p className="text-gray-600">
                Official NAMESPACE font families for consistent brand communication
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sora Font */}
              <Card className="p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Sora</h3>
                  <p className="text-sm text-gray-600 mb-4">Primary brand font for headings and emphasis</p>
                </div>
                
                <div className="space-y-4">
                  <div className="font-sora">
                    <div className="text-4xl font-bold mb-1">NAMESPACE</div>
                    <div className="text-xs text-gray-500">48px / Bold</div>
                  </div>
                  
                  <div className="font-sora">
                    <div className="text-2xl font-semibold mb-1">Heading Two</div>
                    <div className="text-xs text-gray-500">24px / Semibold</div>
                  </div>
                  
                  <div className="font-sora">
                    <div className="text-lg font-medium mb-1">Heading Three</div>
                    <div className="text-xs text-gray-500">18px / Medium</div>
                  </div>
                  
                  <div className="font-sora">
                    <div className="text-base mb-1">Regular Text</div>
                    <div className="text-xs text-gray-500">16px / Regular</div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Font Family:</span>
                      <span className="font-mono">Sora</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weights:</span>
                      <span>400, 500, 600, 700</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usage:</span>
                      <span>Headings, Logos, Emphasis</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Inter Font */}
              <Card className="p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Inter</h3>
                  <p className="text-sm text-gray-600 mb-4">Secondary font for body text and UI elements</p>
                </div>
                
                <div className="space-y-4 font-inter">
                  <div>
                    <div className="text-lg font-semibold mb-1">Large Body Text</div>
                    <div className="text-xs text-gray-500">18px / Semibold</div>
                  </div>
                  
                  <div>
                    <div className="text-base mb-1">Regular Body Text</div>
                    <div className="text-xs text-gray-500">16px / Regular</div>
                  </div>
                  
                  <div>
                    <div className="text-sm mb-1">Small Text</div>
                    <div className="text-xs text-gray-500">14px / Regular</div>
                  </div>
                  
                  <div>
                    <div className="text-xs mb-1">Caption Text</div>
                    <div className="text-xs text-gray-500">12px / Regular</div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm leading-relaxed">
                      This is how Inter looks in paragraph form. It's highly readable and works well for longer content, user interfaces, and detailed descriptions throughout the NAMESPACE ecosystem.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Font Family:</span>
                      <span className="font-mono">Inter</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weights:</span>
                      <span>400, 500, 600, 700</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Usage:</span>
                      <span>Body text, UI, Descriptions</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Typography Guidelines */}
            <Card className="mt-8 p-6">
              <h3 className="text-lg font-semibold mb-4">Typography Guidelines</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Hierarchy</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Use Sora for all headings and brand elements</li>
                    <li>• Use Inter for body text and UI components</li>
                    <li>• Maintain consistent font sizes across sections</li>
                    <li>• Use font weight to create visual hierarchy</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Best Practices</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Ensure adequate line spacing for readability</li>
                    <li>• Use appropriate contrast ratios for accessibility</li>
                    <li>• Limit font weights to maintain consistency</li>
                    <li>• Test readability across different screen sizes</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-background py-16">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-sora font-bold mb-4">
              Need Custom Assets?
            </h2>
            <p className="text-gray-600 mb-6">
              If you need custom logos, brand materials, or have questions about brand usage, 
              our team is here to help. Contact us at contact@namespacecomm.in
            </p>
            {/* <Button size="lg" className="bg-namespace-purple hover:bg-primary-hover text-namespace-white">
              Contact Brand Team
            </Button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Branding;