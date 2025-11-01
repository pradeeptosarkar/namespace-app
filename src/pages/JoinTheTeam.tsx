import { ArrowLeft, Rocket, ChevronDown, Calendar, Briefcase, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import jobOpenings from "@/data/jobOpenings.json";

const JoinTheTeam = () => {

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-4 pb-0">
        <Link to="/">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* SEO Meta Tags */}
      <head>
        <title>Join the Team - NAMESPACE | Careers in Tech Ecosystem Building</title>
        <meta name="description" content="Join NAMESPACE and help build the future of tech education and collaboration. Work on high-impact projects with a global team of innovators and creators." />
        <meta name="keywords" content="NAMESPACE careers, tech jobs, startup jobs, developer jobs, community builder, tech ecosystem, remote work" />
        <link rel="canonical" href="https://namespace.world/join-the-team" />
      </head>

      {/* Hero Section */}
      <section className="relative py-10 overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-primary/5 rounded-full animate-pulse" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/3 rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-primary/20 rotate-45 animate-spin" style={{ animationDuration: "20s" }} />
        </div>

        <div className="relative z-10 container mx-auto px-6 py-8 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 px-6 py-3 rounded-full mb-8">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">We're Hiring</span>
            </div> */}

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-sora font-bold text-foreground leading-tight">
              Join the Team
              <br />
              <span className="text-primary">
                Building the Future
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-inter max-w-3xl mx-auto leading-relaxed">
              Help us create a global tech ecosystem where humans and organizations thrive together. We're looking for passionate builders, creators, and visionaries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" asChild>
                <a href="#open-roles">
                  View Open Roles
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:contact@namespacecomm.in">
                  Get in Touch
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      {/* <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-3xl md:text-5xl font-sora font-bold text-foreground">
              Why Join NAMESPACE?
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            <p className="text-lg md:text-xl text-muted-foreground font-inter max-w-3xl mx-auto">
              We're not just building products—we're creating an ecosystem that empowers millions of developers, innovators, and organizations worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="p-6 border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="flex flex-col items-start space-y-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-sora font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground font-inter leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section> */}

      {/* Our Values */}
      {/* <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-3xl md:text-5xl font-sora font-bold text-foreground">
                Our Values
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
              <p className="text-lg md:text-xl text-muted-foreground font-inter max-w-3xl mx-auto">
                These principles guide everything we do and shape the culture we're building together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-background border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300">
                  <h3 className="text-2xl font-sora font-bold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-lg text-muted-foreground font-inter leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Life at NAMESPACE */}
      {/* <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-3xl md:text-5xl font-sora font-bold text-foreground">
                Life at NAMESPACE
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-sora font-semibold text-foreground mb-2">
                      Remote-First Culture
                    </h3>
                    <p className="text-muted-foreground font-inter">
                      Work from anywhere in the world. We believe in flexibility and trust.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-sora font-semibold text-foreground mb-2">
                      Continuous Learning
                    </h3>
                    <p className="text-muted-foreground font-inter">
                      Access to courses, conferences, and mentorship opportunities to fuel your growth.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-sora font-semibold text-foreground mb-2">
                      Ownership & Autonomy
                    </h3>
                    <p className="text-muted-foreground font-inter">
                      Take ownership of your projects and make meaningful decisions that shape the company.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-sora font-semibold text-foreground mb-2">
                      Community Connection
                    </h3>
                    <p className="text-muted-foreground font-inter">
                      Engage directly with our global community and see the impact of your work firsthand.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                  <Code className="w-32 h-32 text-primary/60" />
                </div>
                
                <div className="absolute top-8 right-8 w-4 h-4 bg-primary/40 rounded-full animate-ping" />
                <div className="absolute bottom-12 left-8 w-3 h-3 bg-primary/30 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-24 left-12 w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "2s" }} />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Open Roles */}
      <section id="open-roles" className="py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-3xl md:text-5xl font-sora font-bold text-foreground">
                Open Roles
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
              <p className="text-lg md:text-xl text-muted-foreground font-inter">
                We're always looking for talented individuals to join our mission. Check out our current openings or reach out if you think you'd be a great fit.
              </p>
            </div>

            <div className="space-y-4">
              {jobOpenings.length === 0 ? (
                <Card className="p-8 md:p-12 border border-border bg-card text-center">
                  <div className="space-y-6">
                    <h3 className="text-2xl md:text-3xl font-sora font-bold text-foreground">
                      No Open Positions Currently
                    </h3>
                    <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
                      We're not actively hiring at the moment, but we'd still love to hear from passionate individuals who want to join our mission.
                    </p>
                    <Button size="lg" asChild>
                      <a href="mailto:careers@namespacecomm.in">
                        Send Us Your Resume
                      </a>
                    </Button>
                  </div>
                </Card>
              ) : (
                jobOpenings
                  .filter(job => job.id !== "template")
                  .map((job) => (
                  <Collapsible key={job.id}>
                    <Card className="border border-border bg-card overflow-hidden hover:border-primary/50 transition-all">
                      <CollapsibleTrigger className="w-full">
                        <div className="p-6 flex items-center justify-between gap-4 text-left hover:bg-muted/50 transition-colors">
                          <div className="flex-1 space-y-2">
                            <h3 className="text-xl md:text-2xl font-sora font-bold text-foreground">
                              {job.title}
                            </h3>
                            <Badge variant="secondary" className="font-inter">
                              {job.vertical}
                            </Badge>
                          </div>
                          <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                        </div>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <div className="px-6 pb-6 space-y-6 border-t border-border pt-6">
                          <div>
                            <h4 className="text-lg font-sora font-semibold text-foreground mb-3">
                              About the Role
                            </h4>
                            <p className="text-muted-foreground font-inter leading-relaxed">
                              {job.description}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-lg font-sora font-semibold text-foreground mb-3">
                              What We Expect
                            </h4>
                            <ul className="space-y-2">
                              {job.expectations.map((expectation, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-muted-foreground font-inter leading-relaxed">
                                    {expectation}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>Apply by: {new Date(job.applicationDeadline).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Briefcase className="w-4 h-4" />
                              <span>Starts: {new Date(job.startDate).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {job.applicationStatus === "open" ? (
                            <Button size="lg" className="w-full sm:w-auto" asChild>
                              <a href={job.applicationLink} target="_blank" rel="noopener noreferrer">
                                Apply Now
                                <ExternalLink className="w-4 h-4 ml-2" />
                              </a>
                            </Button>
                          ) : (
                            <Button 
                              size="lg" 
                              className="w-full sm:w-auto" 
                              variant="secondary"
                              disabled
                            >
                              {job.applicationStatus === "closed" 
                                ? "Currently not accepting applications" 
                                : "Applications open soon"}
                            </Button>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Card>
                  </Collapsible>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-background via-muted/10 to-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <Rocket className="w-10 h-10 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-sora font-bold text-foreground leading-tight">
              Ready to Make an Impact?
            </h2>

            <p className="text-xl text-muted-foreground font-inter max-w-2xl mx-auto">
              Whether you're a developer, designer, marketer, or community builder — if you're passionate about building the future of tech, we want to hear from you.
            </p>

            <Button size="lg" asChild>
              <a href="mailto:contact@namespacecomm.in">
                Get in Touch
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinTheTeam;
