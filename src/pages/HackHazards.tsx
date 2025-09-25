import { useEffect } from 'react';
import { HackHazardsNavbar } from '@/components/hackhazards/HackHazardsNavbar';
import { HackHazardsHero } from '@/components/hackhazards/HackHazardsHero';
import { HackHazardsVision } from '@/components/hackhazards/HackHazardsVision';
import { HackHazardsPastStats } from '@/components/hackhazards/HackHazardsPastStats';
import { HackHazardsPillars } from '@/components/hackhazards/HackHazardsPillars';
import { HackHazardsThemes } from '@/components/hackhazards/HackHazardsThemes';
import { HackHazardsOpportunities } from '@/components/hackhazards/HackHazardsOpportunities';
import { HackHazardsPrizes } from '@/components/hackhazards/HackHazardsPrizes';
import { HackHazardsSponsorsTestimonialsAndMentors } from '@/components/hackhazards/HackHazardsSponsorsTestimonialsAndMentors';
import { HackHazardsFAQs } from '@/components/hackhazards/HackHazardsFAQs';
import { HackHazardsFooter } from '@/components/hackhazards/HackHazardsFooter';

const HackHazards = () => {
  useEffect(() => {
    document.title = "HACKHAZARDS '26 - India's Hackathon. Global Scale. | NAMESPACE";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Join HACKHAZARDS 2026 - World\'s largest community-run hackathon and India\'s premier global hackathon. Build innovative solutions in AI, Web3, and Software Engineering. Win prizes, get funding, and launch your career.'
      );
    }
    
    // Add structured data for the event
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "HACKHAZARDS '26",
      "description": "India's premier global hackathon featuring AI, Web3, and Software Engineering challenges",
      "startDate": "2026-02",
      "location": {
        "@type": "VirtualLocation",
        "url": "https://hackhazards.com"
      },
      "organizer": {
        "@type": "Organization",
        "name": "NAMESPACE",
        "url": "https://namespacecomm.in"
      }
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="hackhazards-theme min-h-screen bg-background">
      <HackHazardsNavbar />
      
      <main>
        <section id="hero">
          <HackHazardsHero />
        </section>
        
        <section id="vision">
          <HackHazardsVision />
        </section>
        
        <section id="past-stats">
          <HackHazardsPastStats />
        </section>
        
        <section id="pillars">
          <HackHazardsPillars />
        </section>
        
        <section id="themes">
          <HackHazardsThemes />
        </section>
        
        <section id="opportunities">
          <HackHazardsOpportunities />
        </section>
        
        <section id="prizes">
          <HackHazardsPrizes />
        </section>
        
        <section id="sponsors-and-mentors">
          <HackHazardsSponsorsTestimonialsAndMentors />
        </section>
        
        {/* <section id="faqs">
          <HackHazardsFAQs />
        </section> */}
      </main>
      
      <footer id="footer">
        <HackHazardsFooter />
      </footer>
    </div>
  );
};

export default HackHazards;