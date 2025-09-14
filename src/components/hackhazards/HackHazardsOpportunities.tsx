import { Trophy, Lightbulb, Globe, Target, Heart, Zap } from 'lucide-react';

const opportunities = [
  {
    icon: Trophy,
    title: 'Win Big Prizes',
    description: 'Cash prizes, gadgets, and exclusive swag for top performers'
  },
  {
    icon: Lightbulb,
    title: 'Expert Mentorship',
    description: 'Learn from industry leaders and experienced entrepreneurs'
  },
  {
    icon: Globe,
    title: 'Global Exposure',
    description: 'Showcase your work to an international audience'
  },
  {
    icon: Target,
    title: 'Funding Opportunities',
    description: 'Direct path to VCs and angel investors for your startup'
  },
  {
    icon: Heart,
    title: 'Hiring Pipeline',
    description: 'Get recruited by top tech companies actively scouting talent'
  },
  {
    icon: Zap,
    title: 'Career Launch',
    description: 'Transform your hackathon project into a full-time career'
  }
];

export const HackHazardsOpportunities = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sora font-bold text-foreground mb-6">
            Opportunities for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">
              Participants
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            More than just a competition—it's your gateway to the future.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl bg-card border border-border hover:border-namespace-purple/50 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-namespace-purple to-namespace-blue flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <opportunity.icon className="w-6 h-6 text-white" />
                </div>

                <div>
                  {/* Title */}
                  <h3 className="text-lg font-sora font-semibold text-foreground mb-2 group-hover:text-namespace-purple transition-colors duration-300">
                    {opportunity.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {opportunity.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};