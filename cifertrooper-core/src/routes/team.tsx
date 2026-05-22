import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { apiGet } from "../lib/api"; // Assuming this helper exists from previous tasks
import { Instagram, Linkedin, MessageCircle, Github } from "lucide-react";

export const Route = createFileRoute("/team")({
  component: Team,
});

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
    github?: string;
  };
}

interface TeamData {
  hero: {
    title: string;
    subtitle: string;
  };
  members: TeamMember[];
}

const initialData: TeamData = {
  hero: {
    title: "Meet Our Team",
    subtitle: "The visionary minds and dedicated experts driving innovation at Cifer Trooper.",
  },
  members: [
    {
      id: "1",
      name: "Sanjeev",
      role: "FOUNDER & CEO",
      image: "/src/assets/images/team/sanjeev.png",
      bio: "Leading the charge in on-demand service solutions and digital transformation.",
      socials: {
        instagram: "https://instagram.com/_ethical_coder_?igshid=MjEwN2IyYWYwYw==",
        linkedin: "https://www.linkedin.com/in/sanjeevk04/",
        whatsapp: "https://api.whatsapp.com/send?phone=917339611575",
      },
    },
    {
      id: "2",
      name: "Nowful",
      role: "MD",
      image: "/src/assets/images/team/nowful.png",
      bio: "Overseeing operations and ensuring the highest standards of delivery and client satisfaction.",
      socials: {
        instagram: "https://instagram.com/_ethical_coder_?igshid=MjEwN2IyYWYwYw==",
        linkedin: "https://www.linkedin.com/in/sanjeevk04/",
        whatsapp: "https://api.whatsapp.com/send?phone=917339611575",
      },
    },
  ],
};

function Team() {
  const [data, setData] = useState<TeamData>(initialData);

  /* 
  // API Integration Placeholder
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiGet<TeamData>("/api/pages/team");
        if (response) setData(response);
      } catch (error) {
        console.error("Failed to fetch team data:", error);
      }
    };
    fetchData();
  }, []);
  */

  return (
    <div className="min-h-screen bg-surface pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">{data.hero.title}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {data.hero.subtitle}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-12">
          {data.members.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-card rounded-[2.5rem] p-10 border border-border shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 w-full max-w-[400px] flex flex-col items-center text-center overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors duration-500" />

              {/* Profile Image with Ring */}
              <div className="relative mb-8">
                <div className="absolute -inset-1 bg-gradient-to-tr from-blue-600 via-purple-500 to-blue-400 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative w-44 h-44 rounded-full overflow-hidden border-[6px] border-white shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Info Container */}
              <div className="relative z-10 w-full">
                <h3 className="text-3xl font-bold text-foreground mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {member.name}
                </h3>

                <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
                  {member.role}
                </div>

                <p className="text-slate-500 leading-relaxed mb-10 text-sm md:text-base px-2">
                  {member.bio}
                </p>

                {/* Socials - Premium Layout */}
                <div className="flex items-center justify-center gap-4">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/icon p-3.5 bg-surface text-muted-foreground rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-200"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin
                        size={22}
                        className="group-hover/icon:scale-110 transition-transform"
                      />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/icon p-3.5 bg-surface text-muted-foreground rounded-2xl hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-500 hover:to-orange-400 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-pink-200"
                      aria-label={`${member.name}'s Instagram`}
                    >
                      <Instagram
                        size={22}
                        className="group-hover/icon:scale-110 transition-transform"
                      />
                    </a>
                  )}
                  {member.socials.whatsapp && (
                    <a
                      href={member.socials.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/icon p-3.5 bg-surface text-muted-foreground rounded-2xl hover:bg-green-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-green-200"
                      aria-label={`${member.name}'s WhatsApp`}
                    >
                      <MessageCircle
                        size={22}
                        className="group-hover/icon:scale-110 transition-transform"
                      />
                    </a>
                  )}
                </div>
              </div>

              {/* Bottom Decorative Line */}
              <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-blue-600 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
            </motion.div>
          ))}
        </div>

        {/* Join Us CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center p-12 bg-card rounded-[3rem] border border-border shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -ml-32 -mb-32 opacity-50" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Join Our Journey
            </h2>
            <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
              We're always looking for passionate "Troopers" to join our ranks and build the future
              of on-demand services.
            </p>
            <a
              href="/contact-us"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-200"
            >
              Become a Trooper
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
