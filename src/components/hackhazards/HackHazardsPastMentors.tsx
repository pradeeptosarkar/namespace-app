import { ExternalLink } from 'lucide-react';

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
    photo: "./j1.jpg",
    url: "https://www.linkedin.com/in/dotsarthak/",
  },
  {
    name: "Sanya Duggal",
    photo: "./j2.jpg",
    url: "https://www.linkedin.com/in/sanya-duggal/",
  },
  {
    name: "Santosh Maurya",
    photo: "./j3.jpg",
    url: "https://www.linkedin.com/in/santoshm93/",
  },
  {
    name: "Dibyasom Puhan",
    photo: "./j4.jpg",
    url: "https://www.linkedin.com/in/dibyasompuhan/",
  },
  {
    name: "Rishab Bansal",
    photo: "./j5.jpg",
    url: "https://www.linkedin.com/in/imrishabhbansal/",
  },
  {
    name: "Roopal Mittal",
    photo: "./j6.jpg",
    url: "https://www.linkedin.com/in/roopalmittal/",
  },
  {
    name: "Riza Farheen",
    photo: "./riza.jpeg",
    url: "https://www.linkedin.com/in/riza-farheen/",
  },
  {
    name: "David Chaum",
    photo: "./david-chaum.jpeg",
    url: "https://www.linkedin.com/in/david-chaum-3b219b183/",
  },
  {
    name: "Shyaamal Tripathi",
    photo: "./shyaamal.jpeg",
    url: "https://www.linkedin.com/in/shyaamal-tripathi-a389051b3/",
  },
  {
    name: "Priyansh Agarwal",
    photo: "./techx21.jpeg",
    url: "https://www.linkedin.com/in/priyansh-agarwal/",
  },
  {
    name: "Yash Sharma",
    photo: "./techx22.jpeg",
    url: "https://www.linkedin.com/in/yash-sharma-4276b61b5/",
  },
  {
    name: "Ansh Bhawnani",
    photo: "./techx23.jpeg",
    url: "https://www.linkedin.com/in/ansh-bhawnani/",
  },
  {
    name: "Abhishek Mishra",
    photo: "./techx24.jpeg",
    url: "https://www.linkedin.com/in/mishra5047/",
  },
  {
    name: "Kanishk Khurana",
    photo: "./techx25.jpeg",
    url: "https://www.linkedin.com/in/kanishkkhurana/",
  },
  {
    name: "Raihan Khan",
    photo: "./techx26.jpeg",
    url: "https://www.linkedin.com/in/raihankhan-rk/",
  },
  {
    name: "Jatin K Malik",
    photo: "./techx27.jpeg",
    url: "https://www.linkedin.com/in/jatinkrmalik/",
  },
  {
    name: "Vani Chitkara",
    photo: "./reveal1.png",
    url: "https://www.linkedin.com/in/vani-chitkara/",
  },
  {
    name: "Puspanjali Sarma",
    photo: "./reveal2.jpeg",
    url: "https://www.linkedin.com/in/puspanjalisarma",
  },
  {
    name: "Dipanshu Parashar",
    photo: "./reveal3.jpeg",
    url: "https://www.linkedin.com/in/dipanshu-parashar",
  },
  {
    name: "Palak Awasthi",
    photo: "./reveal4.jpeg",
    url: "https://www.linkedin.com/in/palakawasthi",
  },
  {
    name: "Sumit Shukla",
    photo: "./reveal6.jpeg",
    url: "https://www.linkedin.com/in/ssumitshukla",
  },
  {
    name: "Priyanshu Mundra",
    photo: "./reveal7.jpeg",
    url: "https://www.linkedin.com/in/priyanshu-mundra",
  },
  {
    name: "Chhavi Garg",
    photo: "./reveal8.jpeg",
    url: "https://www.linkedin.com/in/chhavigg",
  },
  {
    name: "Piyush Sachdeva",
    photo: "./reveal9.jpeg",
    url: "https://www.linkedin.com/in/piyush-sachdeva",
  },
  {
    name: "Jay Sadana",
    photo: "./reveal10.jpeg",
    url: "https://www.linkedin.com/in/jaysaadana",
  },
  {
    name: "Abhinav Rai",
    photo: "./m1.jpeg",
    url: "https://www.linkedin.com/in/abhinav-rai-6a7119154/",
  },
  {
    name: "Unnati Chhabra",
    photo: "./m2.jpeg",
    url: "https://www.linkedin.com/in/unnati-chhabra-/",
  },
  {
    name: "Shruti Arora",
    photo: "./m3.jpeg",
    url: "https://www.linkedin.com/in/shrutiiaroraaa/",
  },
  {
    name: "Saksham Verma",
    photo: "./m4.jpeg",
    url: "https://www.linkedin.com/in/saksham-verma-a9390b256/",
  },
  {
    name: "Vani Mittal",
    photo: "./m5.jpeg",
    url: "https://www.linkedin.com/in/vani-mi-ttal/",
  },
  {
    name: "Somya Maheshwari",
    photo: "./m7.jpeg",
    url: "https://www.linkedin.com/in/somya-maheshwari-0b5305243/",
  },
  {
    name: "Yash Kataria",
    photo: "./m8.jpeg",
    url: "https://www.linkedin.com/in/kataria-yash/",
  },
  {
    name: "Abdal Lalit",
    photo: "./m9.jpg",
    url: "https://www.linkedin.com/in/abdal-lalit/",
  },
  {
    name: "Rohan Kumar",
    photo: "./m10.jpg",
    url: "https://www.linkedin.com/in/rohan-kumar-a65a87175/",
  },
  {
    name: "Arnav Gupta",
    photo: "./m11.jpg",
    url: "https://www.linkedin.com/in/arnav-gupta-437a66256/",
  },
  {
    name: "Kanishak Chaurasia",
    photo: "./m12.jpg",
    url: "https://linkedin.com/in/kanishak-chaurasia-1101/",
  },
  {
    name: "Tanmay Arora",
    photo: "./m13.jpg",
    url: "https://www.linkedin.com/in/tanmaycode1/",
  },
  {
    name: "Harshita Gupta",
    photo: "./m15.jpg",
    url: "https://www.linkedin.com/in/harshita-gupta-03b6b125b/",
  },
  {
    name: "Mohit Arora",
    photo: "./m16.jpg",
    url: "https://www.linkedin.com/in/mohit8181/",
  },
  {
    name: "Mridul Saggi",
    photo: "./m17.jpg",
    url: "https://linkedin.com/in/mridulsaggi/",
  },
  {
    name: "Ayush Chauhan",
    photo: "./m18.jpg",
    url: "https://www.linkedin.com/in/ayush-singh-chauhan-22945722b/",
  },
  {
    name: "Shivam Saini",
    photo: "./m19.jpg",
    url: "https://www.linkedin.com/in/shvmsaini/",
  },
  {
    name: "Himanshu Jaidka",
    photo: "./m20.jpg",
    url: "https://www.linkedin.com/in/himanshu-jaidka-b39b191a4/",
  },
  {
    name: "Harshit Arora",
    photo: "./m21.jpg",
    url: "https://www.linkedin.com/in/harshit-arora-in/",
  },
  {
    name: "Shivam Goyal",
    photo: "./M22.jpg",
    url: "https://www.linkedin.com/in/shivamgoyall/",
  }
];

export const HackHazardsPastMentors = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-sora font-bold text-foreground mb-6">
            Past{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-namespace-purple to-namespace-blue">
              Judges, Speakers & Mentors
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn from the industry's finest minds who have guided our community through their expertise and insights.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {mentors.map((mentor, index) => (
            <a
              key={index}
              href={mentor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="bg-card rounded-xl p-4 border border-border hover:border-namespace-purple/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-namespace-purple/10">
                <div className="aspect-square mb-3 overflow-hidden rounded-lg bg-muted">
                  <img 
                    src={mentor.photo}
                    alt={`${mentor.name} - Judge, Speaker & Mentor`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/150/9333ea/ffffff?text=' + mentor.name.charAt(0);
                    }}
                  />
                </div>
                <div className="text-center">
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
    </section>
  );
};