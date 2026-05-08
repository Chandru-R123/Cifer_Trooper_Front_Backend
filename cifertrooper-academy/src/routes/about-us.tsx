import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "@/lib/api";
import { CallToAction } from "@/components/CallToAction";
import { Users, Target, Eye, Award, Briefcase, Heart } from "lucide-react";

import bannerImg from "@/assets/images/about-us/banner.jpg";
import heroTeamImg from "@/assets/images/about-us/hero-team.webp";
import heroWorkspaceImg from "@/assets/images/about-us/hero-workspace.webp";
import teamCollabImg from "@/assets/images/about-us/team-collab.webp";
import whyClientImg from "@/assets/images/about-us/why-client.jpg";
import whyDesignImg from "@/assets/images/about-us/why-design.jpg";
import whyUserImg from "@/assets/images/about-us/why-user.jpg";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — CiferTrooper" },
      { name: "description", content: "Learn about CiferTrooper — our mission, vision, team, and the story behind our digital agency and academy." },
    ],
  }),
  component: AboutPage,
});

interface AboutContent {
  heading?: string;
  description?: string;
  mission?: string;
  vision?: string;
  values?: string[];
  stats?: { label: string; value: string }[];
  team?: { name: string; role: string; bio?: string; image?: string }[];
}

const fallback: AboutContent = {
  heading: "Who We Are",
  description: "Cifertrooper is a full-service digital agency and training academy specializing in web, mobile, cybersecurity, and AI solutions. Founded in 2018, we have helped 200+ businesses and trained 3000+ students.",
  mission: "Empowering businesses and individuals through cutting-edge technology and education.",
  vision: "To be the most trusted digital partner and cybersecurity training institute in South Asia.",
  values: ["Innovation", "Integrity", "Excellence", "Community"],
  stats: [
    { label: "Projects Delivered", value: "200+" },
    { label: "Happy Clients", value: "150+" },
    { label: "Team Members", value: "35+" },
    { label: "Years Experience", value: "6+" },
  ],
  team: [
    { name: "Chandru K.", role: "CEO & Founder", bio: "Cybersecurity expert with 10+ years in ethical hacking and digital strategy." },
    { name: "Alice Johnson", role: "CTO", bio: "Full-stack architect specializing in scalable cloud systems." },
    { name: "Bob Smith", role: "Head of Security", bio: "Certified ethical hacker and red team specialist." },
    { name: "Carol White", role: "Lead Designer", bio: "UI/UX expert with a passion for accessible, beautiful interfaces." },
  ],
};

const gradientText = "bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent";

const valueIcons = [Award, Target, Heart, Users, Briefcase, Eye];

function AboutPage() {
  const { data: content } = useQuery({
    queryKey: ["page", "about-us"],
    queryFn: () => getPage<AboutContent>("about-us"),
    retry: false,
  });

  const d: AboutContent = { ...fallback, ...content };

  return (
    <div className="bg-background text-foreground overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={bannerImg} alt="About CiferTrooper" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        </div>
        <div className="container-page relative z-10 pb-20 pt-40">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent mb-4">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              {d.heading?.split(" ").slice(0, 2).join(" ")}{" "}
              <span className={gradientText}>{d.heading?.split(" ").slice(2).join(" ") || "We Are"}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">{d.description}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="border-y border-border bg-card py-14">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-8">
          {(d.stats ?? fallback.stats!).map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mission & Vision ─────────────────────────────────────────── */}
      <section className="container-page py-24">
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-accent text-accent-foreground relative overflow-hidden group"
          >
            <div className="absolute -right-10 -bottom-10 size-48 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
            <Target className="size-10 mb-6 relative z-10" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Our Mission</h3>
            <p className="text-lg leading-relaxed opacity-90 relative z-10">{d.mission}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl border border-border bg-card relative overflow-hidden group hover:border-accent/40 transition-colors"
          >
            <div className="absolute -right-10 -bottom-10 size-48 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/10 transition-colors" />
            <Eye className="size-10 mb-6 text-accent relative z-10" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Our Vision</h3>
            <p className="text-lg text-muted-foreground leading-relaxed relative z-10">{d.vision}</p>
          </motion.div>
        </div>
      </section>

      {/* ── Story / Images ───────────────────────────────────────────── */}
      <section className="bg-surface py-24">
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <img src={heroWorkspaceImg} alt="Our workspace" className="rounded-2xl object-cover w-full h-56 col-span-2" />
              <img src={heroTeamImg} alt="Our team" className="rounded-2xl object-cover w-full h-40" />
              <img src={teamCollabImg} alt="Collaboration" className="rounded-2xl object-cover w-full h-40" />
            </motion.div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent mb-4 block">Our Approach</span>
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                Built on <span className={gradientText}>trust, craft,</span> and real results
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We don't just deliver projects — we build long-term partnerships. Every engagement starts with deep discovery, moves through iterative design and development, and ends with measurable outcomes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of engineers, designers, and security experts work together under one roof, ensuring every product we ship is fast, beautiful, and secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────── */}
      {d.values && d.values.length > 0 && (
        <section className="container-page py-24">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent mb-4 block">What Drives Us</span>
            <h2 className="text-4xl md:text-5xl font-bold">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {d.values.map((value, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <motion.div
                  key={value}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 rounded-3xl border border-border bg-card text-center hover:border-accent/40 hover:shadow-lg transition-all group"
                >
                  <div className="size-14 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <Icon className="size-6" />
                  </div>
                  <h4 className="font-bold text-lg">{value}</h4>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Why Choose Us ────────────────────────────────────────────── */}
      <section className="bg-surface py-24">
        <div className="container-page">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-accent mb-4 block">Why CiferTrooper</span>
            <h2 className="text-4xl md:text-5xl font-bold">What Sets Us Apart</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: whyClientImg, title: "Client-First Mindset", desc: "We treat every project as if it were our own business. Your success is our success." },
              { img: whyDesignImg, title: "Design Excellence", desc: "Every pixel matters. We craft interfaces that are not just functional but genuinely beautiful." },
              { img: whyUserImg, title: "User-Centered Thinking", desc: "We obsess over user experience, ensuring every product is intuitive and delightful to use." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-3xl overflow-hidden border border-border bg-card hover:border-accent/30 hover:shadow-xl transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CallToAction title="Ready to work with us?" subtitle="Let's build something remarkable together." />
    </div>
  );
}
