import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Who can participate in HACKHAZARDS \'26?',
    answer: 'HACKHAZARDS is open to developers, designers, entrepreneurs, and innovators of all skill levels from around the world. Whether you\'re a student, professional, or seasoned entrepreneur, you\'re welcome to join.'
  },
  {
    question: 'Is there any cost to participate?',
    answer: 'No, participation in HACKHAZARDS \'26 is completely free. All you need is your passion for innovation and a willingness to build something amazing.'
  },
  {
    question: 'What is the timeline for HACKHAZARDS \'26?',
    answer: 'HACKHAZARDS \'26 will take place in February 2026. The exact dates will be announced soon. The hackathon typically runs for 48 hours of non-stop hacking.'
  },
  {
    question: 'How do I participate?',
    answer: 'Registration will open soon. Once applications are live, you can register individually or as a team. We\'ll provide all the details about submission requirements, judging criteria, and event schedule.'
  },
  {
    question: 'Can I participate remotely?',
    answer: 'Yes! HACKHAZARDS \'26 is a global digital hackathon, which means you can participate from anywhere in the world. All events, mentoring sessions, and submissions will be conducted online.'
  },
  {
    question: 'What kind of projects can I build?',
    answer: 'You can build projects in any of our three main themes: Artificial Intelligence, Web3 & Blockchain, or Software Engineering. Projects should be original work created during the hackathon period.'
  },
  {
    question: 'What support will be provided during the hackathon?',
    answer: 'Participants will have access to expert mentors, technical workshops, sponsor APIs, cloud credits, and 24/7 support throughout the event. We also provide networking opportunities with industry professionals.'
  },
  {
    question: 'What are the prizes?',
    answer: 'We offer substantial cash prizes, the latest gadgets, exclusive swag, and most importantly, opportunities for funding and hiring. Top projects also get showcased to our partner VCs and companies.'
  }
];

export const HackHazardsFAQs = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sora font-bold text-foreground mb-6">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">
              Questions
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Got questions? We've got answers. Here's everything you need to know about HACKHAZARDS '26.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg bg-card px-6"
              >
                <AccordionTrigger className="text-left font-sora font-semibold text-foreground hover:text-namespace-purple">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};