import { Brain, Coins, Terminal } from 'lucide-react';

const themes = [
  {
    icon: Brain,
    title: 'Artificial Intelligence',
    description: 'Machine Learning, Deep Learning, NLP, Computer Vision, and AI-powered solutions',
    color: 'namespace-purple'
  },
  {
    icon: Coins,
    title: 'Web3 & Blockchain',
    description: 'DeFi, NFTs, Smart Contracts, Cryptocurrency, and Decentralized Applications',
    color: 'namespace-blue'
  },
  {
    icon: Terminal,
    title: 'Software Engineering',
    description: 'Full-stack development, DevOps, Cloud Computing, and Developer Tools',
    color: 'namespace-pink'
  }
];

export const HackHazardsThemes = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sora font-bold text-foreground mb-6">
            Hacking{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">
              Themes
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose your battlefield. Build solutions that matter in these cutting-edge domains.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {themes.map((theme, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden p-8 rounded-2xl bg-card border border-border hover:border-namespace-purple/50 transition-all duration-500 hover:scale-105"
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-namespace-purple/5 to-namespace-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 text-center">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-namespace-purple to-namespace-blue flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <theme.icon className="w-10 h-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-sora font-bold text-foreground mb-4 group-hover:text-namespace-purple transition-colors duration-300">
                  {theme.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {theme.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};