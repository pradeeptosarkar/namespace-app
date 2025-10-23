import { Trophy, Award, Medal, Crown } from 'lucide-react';

const HackHazardsPrizes = () => {
  const topPrizes = [
    { rank: 1, amount: "50,000", icon: Crown },
    { rank: 2, amount: "40,000", icon: Trophy },
    { rank: 3, amount: "30,000", icon: Medal },
    { rank: 4, amount: "20,000", icon: Award },
    { rank: 5, amount: "10,000", icon: Award },
  ];

  const rankPrizes = [
    { ranks: "6 - 25", amount: "5,000", count: "20 teams" },
    { ranks: "26 - 50", amount: "2,000", count: "25 teams" },
    { ranks: "51 - 100", amount: "1,000", count: "50 teams" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-muted/10">
      <div className="container mx-auto px-4">
        {/* Main Headlines */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-8">
            <Trophy className="h-8 w-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              PRIZES & REWARDS
            </h2>
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">Cash Prizes</h3>
              <p className="text-3xl md:text-4xl font-black text-foreground">USD 15,000+</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">Total Perks & Benefits</h3>
              <p className="text-3xl md:text-4xl font-black text-foreground">USD 500,000+</p>
            </div>
          </div>
        </div>

        {/* Main Prizes Section */}
        <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
            Main Prizes
            <span className="block text-lg font-normal text-muted-foreground mt-2">
              All participants are eligible
            </span>
          </h3>

          {/* Top 5 Teams */}
          <div className="mb-12">
            <h4 className="text-xl font-semibold mb-6 text-foreground text-center">Top 5 Teams/Projects</h4>
            <div className="grid md:grid-cols-5 gap-4 max-w-5xl mx-auto">
              {topPrizes.map((prize, index) => {
                const IconComponent = prize.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 text-center hover:scale-105 transition-transform duration-300"
                  >
                    <div className="flex justify-center mb-3">
                      <IconComponent className={`h-8 w-8 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-amber-600' : 'text-primary'}`} />
                    </div>
                    <div className="text-lg font-bold text-foreground mb-1">Rank {prize.rank}</div>
                    <div className="text-xl font-black text-primary">₹{prize.amount} Cash</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Other Ranks */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {rankPrizes.map((prize, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-br from-muted/5 to-muted/10 border border-border text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-lg font-bold text-foreground mb-2">Rank {prize.ranks}</div>
                <div className="text-xl font-black text-primary mb-1">₹{prize.amount} Cash</div>
                <div className="text-sm text-muted-foreground">each ({prize.count})</div>
              </div>
            ))}
          </div>
        </div>

        {/* Track Prizes */}
        <div className="mb-16">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 text-center max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Track Prizes for Sponsored Tracks
            </h3>
            <p className="text-xl font-semibold text-primary mb-2">Over USD 10,000+ in cash prizes</p>
            <p className="text-muted-foreground">
              Across multiple tracks (all tracks to be announced closer to the hackathon date)
            </p>
          </div>
        </div>

        {/* Total Perks */}
        <div className="text-center">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Total Perks and Benefits
            </h3>
            <p className="text-xl font-semibold text-primary mb-2">
              Including Vouchers and Credits - USD 500,000+ for all participants
            </p>
            <p className="text-muted-foreground">
              Exact details will be revealed closer to the hackathon date
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { HackHazardsPrizes };
