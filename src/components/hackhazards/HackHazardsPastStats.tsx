import { CTAButton } from './CTAButton';

const stats = [
  { number: '17,000+', label: 'Hackers' },
  { number: '3,000+', label: 'Proposals' },
  { number: '780+', label: 'Builds' },
  { number: '$10,000+', label: 'Cash Prize Pool' },
  { number: '25+', label: 'Countries' },
  { number: '500+', label: 'Indian Cities and Towns' },
  { number: '1500+', label: 'Institutions' },
  { number: '200+', label: 'Outreach Partners' },
  { number: '2mn+', label: 'Social Media Impressions' },
  { number: '35%', label: 'Women' },
  { number: '35%', label: 'First-timers' },
  { number: '25%', label: 'Participants from Rural Areas' },
];

export const HackHazardsPastStats = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sora font-bold text-foreground mb-6">
            HACKHAZARDS '25{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">
              Impact
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Last year's numbers speak for themselves - and 2026 is going to be even bigger.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg bg-gradient-to-br from-muted/50 to-muted/20 border border-border hover:border-namespace-purple/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl md:text-4xl font-sora font-bold text-foreground mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <CTAButton 
            href="https://hackhazards25.devfolio.co/projects"
            variant="secondary"
          >
            Explore Past Projects
          </CTAButton>
        </div>
      </div>
    </section>
  );
};