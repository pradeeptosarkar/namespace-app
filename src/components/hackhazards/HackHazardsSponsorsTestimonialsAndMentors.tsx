import { ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const sponsors = [
  {
    name: "Groq",
    logo: "/lovable-uploads/f400820a-6bf7-414b-83f8-3fe46fe8ae7b.png",
  },
  {
    name: "Base",
    logo: "/lovable-uploads/511a29ea-e469-42d1-8722-e8bce0b0b938.png",
  },
  {
    name: "Stellar",
    logo: "/lovable-uploads/be12e445-da80-4c80-9e82-0c7541bbb935.png",
  },
  {
    name: "Screenpipe",
    logo: "/lovable-uploads/494b3733-d738-4c2d-8932-f6c4619d7590.png",
  },
  {
    name: "Monad",
    logo: "/lovable-uploads/1711468c-c79a-4158-b499-3ba736136325.png",
  },
  {
    name: "InfinyOn",
    logo: "/lovable-uploads/ac9a36b0-4c29-4cc8-9624-0e002e4005e9.png",
  },
  {
    name: "Orkes",
    logo: "/lovable-uploads/184e5f47-87e0-49aa-b537-7bde42f2b970.png",
  },
  {
    name: "Sprint.dev",
    logo: "/lovable-uploads/9b94fe11-d6bf-4de0-bd24-315ca7e3f4fc.png",
  },
  {
    name: "Polygon",
    logo: "/lovable-uploads/59d38d75-d0be-445c-ba37-f0fdca56bc0d.png",
  },
  {
    name: "Tezos",
    logo: "/lovable-uploads/f3f6164e-6d46-41d0-ae19-b96ab854517e.png",
  },
  {
    name: "QuillAudits",
    logo: "/lovable-uploads/458cc2c0-eb65-4838-87ba-661230e0d633.png",
  },
  {
    name: "Push",
    logo: "/lovable-uploads/24a5e0df-c7b2-45e4-b6e0-2da3774c74c4.png",
  },
  {
    name: "TechGig",
    logo: "/lovable-uploads/f364908e-4af2-4389-80be-99ae0d3b7e25.png",
  },
  {
    name: "Solana",
    logo: "/lovable-uploads/715c756a-1816-4190-a426-510ba7748f09.png",
  },
  {
    name: "GeeksforGeeks",
    logo: "/lovable-uploads/9a96ab5c-b8f5-4046-9aef-af8888b8317f.png",
  },
  {
    name: "CSSBattle",
    logo: "/lovable-uploads/56a25318-36cf-4610-a597-d30c46d32559.png",
  },
  {
    name: "Reskill",
    logo: "/lovable-uploads/af05f95c-f551-4603-9134-6fa6f9f4ce07.png",
  },
  {
    name: "Commudle",
    logo: "/lovable-uploads/1390fc94-6aca-4995-a3dc-5d00b6be10c6.png",
  },
  {
    name: "Where U Elevate",
    logo: "/lovable-uploads/4731d691-9795-4ccf-9e1a-fd0adf7360ce.png",
  },
  {
    name: "Bobble",
    logo: "/lovable-uploads/a4127b4c-c23e-42a1-89bd-06092ab4a4e3.png",
  },
  {
    name: "XNetwork",
    logo: "/lovable-uploads/23c4670e-c747-4d94-aed1-28add4d830f6.png",
  },
  {
    name: "Router",
    logo: "/lovable-uploads/2ad404c6-093e-44a6-9665-1e91f8dbd5d5.png",
  },
  {
    name: "Slido",
    logo: "/lovable-uploads/ff097a2d-3a21-446e-9cf7-2829fd4a60f7.png",
  },
  {
    name: "Axure",
    logo: "/lovable-uploads/72cdc346-8fe1-4ca5-8313-e406b566b556.png",
  },
  {
    name: "QuickNode",
    logo: "/lovable-uploads/4c85da3f-3bdc-48fc-91c3-71dd9eada12c.png",
  },
  {
    name: "Cybrancee",
    logo: "/lovable-uploads/6f3c34f5-08ad-4e6a-adea-d40408e0f098.png",
  },
];

const testimonials = [
  {
    quote:
      "HACKHAZARDS gave me the platform to showcase my AI project. Six months later, I'm leading ML at a unicorn startup.",
    author: "Priya Sharma",
    role: "ML Engineer, TechCorp",
  },
  {
    quote:
      "The mentorship and networking opportunities at HACKHAZARDS are unmatched. It's where careers are made.",
    author: "Rahul Gupta",
    role: "Founder, BlockchainStartup",
  },
  {
    quote:
      "From hackathon participant to funded entrepreneur—HACKHAZARDS made it possible.",
    author: "Anjali Patel",
    role: "CEO, InnovateAI",
  },
];

const mentors = [
  {
    name: "Adarsh Gautam",
    photo: "https://i.ibb.co/4w7BjKbL/Adarsh-Gautam.jpg",
    url: "https://www.linkedin.com/in/connect-adarsh/",
  },
  {
    name: "Aditya Aryan",
    photo: "https://i.ibb.co/Kpdz9KZh/Aditya-Aryan.jpg",
    url: "https://www.linkedin.com/in/aditya-aryan-3aa235249/",
  },
  {
    name: "Akshat Majila",
    photo: "https://i.ibb.co/ndCFt67/Akshat-Majila.jpg",
    url: "https://www.linkedin.com/in/akshatmajila/",
  },
  {
    name: "Aqsa Parveen",
    photo: "https://i.ibb.co/1t1NvHMP/Aqsa-Parveen.jpg",
    url: "https://www.linkedin.com/in/aqsa-parveen-0366322a1/",
  },
  {
    name: "Ashim Upadhaya",
    photo: "https://i.ibb.co/mVNxKPPm/Ashim-Upadhaya.jpg",
    url: "https://www.linkedin.com/in/ashimupadhaya/",
  },
  {
    name: "Datta Snehith D.",
    photo: "https://i.ibb.co/BHkv4Fs5/Datta-Snehith.jpg",
    url: "https://www.linkedin.com/in/snehith1011/",
  },
  {
    name: "Devendra Parihar",
    photo: "https://i.ibb.co/mC6yPcC8/Devendra-Parihar.png",
    url: "https://www.linkedin.com/in/devendra-parihar/",
  },
  {
    name: "Ekta Agrawal",
    photo: "https://i.ibb.co/5XpYxCZL/Ekta-Agrawal.png",
    url: "https://www.linkedin.com/in/theektaagrawal/",
  },
  {
    name: "Gaurav Mehta",
    photo: "https://i.ibb.co/1J4WL3pR/Gaurav-Mehta.jpg",
    url: "https://www.linkedin.com/in/gnmehta/",
  },
  {
    name: "Harsh Tyagi",
    photo: "https://i.ibb.co/VY3fYP0g/Harsh-Tyagi.jpg",
    url: "https://www.linkedin.com/in/harsh-tyagi-4b1a3223b/",
  },
  {
    name: "Harshvardhan Bajoria",
    photo: "https://i.ibb.co/Hp4QdJsV/Harshvardhan-Bajoria.jpg",
    url: "https://www.linkedin.com/in/harshavardhan-bajoria/",
  },
  {
    name: "Jaskirat Singh",
    photo: "https://i.ibb.co/799c49v/Jaskirat-Singh.jpg",
    url: "https://www.linkedin.com/in/coderjaskirat/",
  },
  {
    name: "Krishnendu Dasgupta",
    photo: "https://i.ibb.co/HLQP67tj/Krishnendu-Dasgupta.jpg",
    url: "https://www.linkedin.com/in/krishnendudg/",
  },
  {
    name: "Mohammad Ehshan",
    photo: "https://i.ibb.co/TMNw8B3N/Mohammad-Ehshan.jpg",
    url: "https://www.linkedin.com/in/mohammad-ehshan-4362a0298/",
  },
  {
    name: "Pratik Kale",
    photo: "https://i.ibb.co/SwNtD85n/Pratik-Kale.jpg",
    url: "https://www.linkedin.com/in/pratikkale26/",
  },
  {
    name: "Rajeeb Kumar Malik",
    photo: "https://i.ibb.co/rKz9rZww/Rajeeb-Kumar-Malik.jpg",
    url: "https://www.linkedin.com/in/rajeebkm/",
  },
  {
    name: "Sajal Batra",
    photo: "https://i.ibb.co/GfrgghZz/Sajal-Batra.jpg",
    url: "https://www.linkedin.com/in/sajal-batra/",
  },
  {
    name: "Sourav Das",
    photo: "https://i.ibb.co/p605JgK8/Sourav-Das.jpg",
    url: "https://www.linkedin.com/in/sourav-prod/",
  },
  {
    name: "Tushar Gupta",
    photo: "https://i.ibb.co/1Y2XPQB5/Tushar-Gupta.png",
    url: "https://www.linkedin.com/in/tushar1504/",
  },
  {
    name: "Vinit Vijal",
    photo: "https://i.ibb.co/pr5K4XkL/Vinit-Vijal.jpg",
    url: "https://www.linkedin.com/in/vinitvijal/",
  },
  {
    name: "Sarthak Jain",
    photo: "PastPeoplePhotos/j1.jpg",
    url: "https://www.linkedin.com/in/dotsarthak/",
  },
  {
    name: "Sanya Duggal",
    photo: "PastPeoplePhotos/j2.jpg",
    url: "https://www.linkedin.com/in/sanya-duggal/",
  },
  {
    name: "Santosh Maurya",
    photo: "PastPeoplePhotos/j3.jpg",
    url: "https://www.linkedin.com/in/santoshm93/",
  },
  {
    name: "Dibyasom Puhan",
    photo: "PastPeoplePhotos/j4.jpg",
    url: "https://www.linkedin.com/in/dibyasompuhan/",
  },
  {
    name: "Rishab Bansal",
    photo: "PastPeoplePhotos/j5.jpg",
    url: "https://www.linkedin.com/in/imrishabhbansal/",
  },
  {
    name: "Roopal Mittal",
    photo: "PastPeoplePhotos/j6.jpg",
    url: "https://www.linkedin.com/in/roopalmittal/",
  },
  {
    name: "Riza Farheen",
    photo: "PastPeoplePhotos/riza.jpeg",
    url: "https://www.linkedin.com/in/riza-farheen/",
  },
  {
    name: "David Chaum",
    photo: "PastPeoplePhotos/david-chaum.jpeg",
    url: "https://www.linkedin.com/in/david-chaum-3b219b183/",
  },
  {
    name: "Shyaamal Tripathi",
    photo: "PastPeoplePhotos/shyaamal.jpeg",
    url: "https://www.linkedin.com/in/shyaamal-tripathi-a389051b3/",
  },
  {
    name: "Priyansh Agarwal",
    photo: "PastPeoplePhotos/techx21.jpeg",
    url: "https://www.linkedin.com/in/priyansh-agarwal/",
  },
  {
    name: "Yash Sharma",
    photo: "PastPeoplePhotos/techx22.jpeg",
    url: "https://www.linkedin.com/in/yash-sharma-4276b61b5/",
  },
  {
    name: "Ansh Bhawnani",
    photo: "PastPeoplePhotos/techx23.jpeg",
    url: "https://www.linkedin.com/in/ansh-bhawnani/",
  },
  {
    name: "Abhishek Mishra",
    photo: "PastPeoplePhotos/techx24.jpeg",
    url: "https://www.linkedin.com/in/mishra5047/",
  },
  {
    name: "Kanishk Khurana",
    photo: "PastPeoplePhotos/techx25.jpeg",
    url: "https://www.linkedin.com/in/kanishkkhurana/",
  },
  {
    name: "Raihan Khan",
    photo: "PastPeoplePhotos/techx26.jpeg",
    url: "https://www.linkedin.com/in/raihankhan-rk/",
  },
  {
    name: "Jatin K Malik",
    photo: "PastPeoplePhotos/techx27.jpeg",
    url: "https://www.linkedin.com/in/jatinkrmalik/",
  },
  {
    name: "Vani Chitkara",
    photo: "PastPeoplePhotos/reveal1.png",
    url: "https://www.linkedin.com/in/vani-chitkara/",
  },
  {
    name: "Puspanjali Sarma",
    photo: "PastPeoplePhotos/reveal2.jpeg",
    url: "https://www.linkedin.com/in/puspanjalisarma",
  },
  {
    name: "Dipanshu Parashar",
    photo: "PastPeoplePhotos/reveal3.jpeg",
    url: "https://www.linkedin.com/in/dipanshu-parashar",
  },
  {
    name: "Palak Awasthi",
    photo: "PastPeoplePhotos/reveal4.jpeg",
    url: "https://www.linkedin.com/in/palakawasthi",
  },
  {
    name: "Sumit Shukla",
    photo: "PastPeoplePhotos/reveal6.jpeg",
    url: "https://www.linkedin.com/in/ssumitshukla",
  },
  {
    name: "Priyanshu Mundra",
    photo: "PastPeoplePhotos/reveal7.jpeg",
    url: "https://www.linkedin.com/in/priyanshu-mundra",
  },
  {
    name: "Chhavi Garg",
    photo: "PastPeoplePhotos/reveal8.jpeg",
    url: "https://www.linkedin.com/in/chhavigg",
  },
  {
    name: "Piyush Sachdeva",
    photo: "PastPeoplePhotos/reveal9.jpeg",
    url: "https://www.linkedin.com/in/piyush-sachdeva",
  },
  {
    name: "Jay Sadana",
    photo: "PastPeoplePhotos/reveal10.jpeg",
    url: "https://www.linkedin.com/in/jaysaadana",
  },
  {
    name: "Abhinav Rai",
    photo: "PastPeoplePhotos/m1.jpeg",
    url: "https://www.linkedin.com/in/abhinav-rai-6a7119154/",
  },
  {
    name: "Unnati Chhabra",
    photo: "PastPeoplePhotos/m2.jpeg",
    url: "https://www.linkedin.com/in/unnati-chhabra-/",
  },
  {
    name: "Shruti Arora",
    photo: "PastPeoplePhotos/m3.jpeg",
    url: "https://www.linkedin.com/in/shrutiiaroraaa/",
  },
  {
    name: "Saksham Verma",
    photo: "PastPeoplePhotos/m4.jpeg",
    url: "https://www.linkedin.com/in/saksham-verma-a9390b256/",
  },
  {
    name: "Vani Mittal",
    photo: "PastPeoplePhotos/m5.jpeg",
    url: "https://www.linkedin.com/in/vani-mi-ttal/",
  },
  {
    name: "Somya Maheshwari",
    photo: "PastPeoplePhotos/m7.jpeg",
    url: "https://www.linkedin.com/in/somya-maheshwari-0b5305243/",
  },
  {
    name: "Yash Kataria",
    photo: "PastPeoplePhotos/m8.jpeg",
    url: "https://www.linkedin.com/in/kataria-yash/",
  },
  {
    name: "Abdal Lalit",
    photo: "PastPeoplePhotos/m9.jpg",
    url: "https://www.linkedin.com/in/abdal-lalit/",
  },
  {
    name: "Rohan Kumar",
    photo: "PastPeoplePhotos/m10.jpg",
    url: "https://www.linkedin.com/in/rohan-kumar-a65a87175/",
  },
  {
    name: "Arnav Gupta",
    photo: "PastPeoplePhotos/m11.jpg",
    url: "https://www.linkedin.com/in/arnav-gupta-437a66256/",
  },
  {
    name: "Kanishak Chaurasia",
    photo: "PastPeoplePhotos/m12.jpg",
    url: "https://linkedin.com/in/kanishak-chaurasia-1101/",
  },
  {
    name: "Tanmay Arora",
    photo: "PastPeoplePhotos/m13.jpg",
    url: "https://www.linkedin.com/in/tanmaycode1/",
  },
  {
    name: "Harshita Gupta",
    photo: "PastPeoplePhotos/m15.jpg",
    url: "https://www.linkedin.com/in/harshita-gupta-03b6b125b/",
  },
  {
    name: "Mohit Arora",
    photo: "PastPeoplePhotos/m16.jpg",
    url: "https://www.linkedin.com/in/mohit8181/",
  },
  {
    name: "Mridul Saggi",
    photo: "PastPeoplePhotos/m17.jpg",
    url: "https://linkedin.com/in/mridulsaggi/",
  },
  {
    name: "Ayush Chauhan",
    photo: "PastPeoplePhotos/m18.jpg",
    url: "https://www.linkedin.com/in/ayush-singh-chauhan-22945722b/",
  },
  {
    name: "Shivam Saini",
    photo: "PastPeoplePhotos/m19.jpg",
    url: "https://www.linkedin.com/in/shvmsaini/",
  },
  {
    name: "Himanshu Jaidka",
    photo: "PastPeoplePhotos/m20.jpg",
    url: "https://www.linkedin.com/in/himanshu-jaidka-b39b191a4/",
  },
  {
    name: "Harshit Arora",
    photo: "PastPeoplePhotos/m21.jpg",
    url: "https://www.linkedin.com/in/harshit-arora-in/",
  },
  {
    name: "Shivam Goyal",
    photo: "PastPeoplePhotos/M22.jpg",
    url: "https://www.linkedin.com/in/shivamgoyall/",
  },
];

export const HackHazardsSponsorsTestimonialsAndMentors = () => {
  return (
    <>
      {/* Sponsors and Testimonials Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          {/* Past Sponsors Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-sora font-bold text-foreground mb-6">
                Past{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">
                  Sponsors
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Industry leaders who believe in the future we're building
                together.
              </p>
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {sponsors.map((sponsor, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-2 md:pl-4 basis-1/2"
                    >
                      <div className="flex items-center justify-center p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 grayscale hover:grayscale-0">
                        <img
                          src={sponsor.logo}
                          alt={`${sponsor.name} logo`}
                          className="max-w-full max-h-10 object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {sponsors.map((sponsor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 grayscale hover:grayscale-0"
                >
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className="max-w-full max-h-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Past Mentors Section */}
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-sora font-bold text-foreground mb-6">
                Past{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">
                  Judges, Speakers & Mentors
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Learn from the industry's finest minds who have guided our
                community through their expertise and insights.
              </p>
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden">
              <Carousel className="w-full">
                <CarouselContent className="-ml-2 md:-ml-4">
                  {mentors.map((mentor, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3"
                    >
                      <a
                        href={mentor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <div className="bg-card rounded-xl p-4 border border-border hover:border-namespace-purple/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-namespace-purple/10 h-52 flex flex-col">
                          <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted flex-shrink-0">
                            <img
                              src={mentor.photo}
                              alt={`${mentor.name} - Judge, Speaker & Mentor`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => {
                                e.currentTarget.src =
                                  "https://via.placeholder.com/150/9333ea/ffffff?text=" +
                                  mentor.name.charAt(0);
                              }}
                            />
                          </div>
                          <div className="text-center flex-1 flex flex-col justify-between">
                            <h3 className="font-sora font-semibold text-foreground text-sm mb-1 line-clamp-2">
                              {mentor.name}
                            </h3>
                            <div className="flex items-center justify-center text-namespace-purple group-hover:text-namespace-blue transition-colors">
                              <ExternalLink size={12} />
                            </div>
                          </div>
                        </div>
                      </a>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            {/* Desktop Grid */}
            <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
              {mentors.map((mentor, index) => (
                <a
                  key={index}
                  href={mentor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="bg-card rounded-xl p-4 border border-border hover:border-namespace-purple/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-namespace-purple/10 h-52 flex flex-col">
                    <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted flex-shrink-0">
                      <img
                        src={mentor.photo}
                        alt={`${mentor.name} - Judge, Speaker & Mentor`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/150/9333ea/ffffff?text=" +
                            mentor.name.charAt(0);
                        }}
                      />
                    </div>
                    <div className="text-center flex-1 flex flex-col justify-between">
                      <h3 className="font-sora font-semibold text-foreground text-sm mb-1 line-clamp-2">
                        {mentor.name}
                      </h3>
                      <div className="flex items-center justify-center text-namespace-purple group-hover:text-namespace-blue transition-colors">
                        <ExternalLink size={12} />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          {/* <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-sora font-bold text-foreground mb-6">
                Success{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">
                  Stories
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Real stories from participants who transformed their careers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="p-8 rounded-2xl bg-card border border-border hover:border-namespace-purple/50 transition-all duration-300 hover:scale-105"
                >
                  <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </blockquote>

                  <div>
                    <cite className="text-foreground font-semibold not-italic">
                      {testimonial.author}
                    </cite>
                    <p className="text-sm text-muted-foreground mt-1">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};
