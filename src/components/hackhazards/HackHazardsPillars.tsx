import { Code, DollarSign, Users, GraduationCap } from 'lucide-react';

const pillars = [
  {
    icon: GraduationCap,
    title: 'Learning',
    description: 'Comprehensive bootcamps and workshops to upskill participants and enhance their technical expertise',
    gradient: 'from-namespace-purple to-namespace-pink'
  },
  {
    icon: Code,
    title: 'Hacking',
    description: 'Global digital hackathon bringing together the brightest minds to solve real-world challenges',
    gradient: 'from-namespace-purple to-namespace-blue'
  },
  {
    icon: DollarSign,
    title: 'Funding',
    description: 'Direct access to VCs, incubators, and investors ready to fund your next big idea',
    gradient: 'from-namespace-blue to-namespace-pink'
  },
  {
    icon: Users,
    title: 'Hiring',
    description: 'Top companies actively scouting and recruiting talent from our participant pool',
    gradient: 'from-namespace-pink to-namespace-purple'
  }
];

export const HackHazardsPillars = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sora font-bold text-foreground mb-6">
            What Makes HACKHAZARDS '26{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">
              Different?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Four core pillars that set us apart from every other hackathon.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-namespace-purple/50 transition-all duration-300 hover:scale-105"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-5 rounded-2xl group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6`}>
                  <pillar.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-sora font-bold text-foreground mb-4">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};