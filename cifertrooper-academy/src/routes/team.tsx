import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "@/lib/api";
import { CallToAction } from "@/components/CallToAction";
import { Linkedin, Twitter, Github } from "lucide-react";

import nowfulImg from "@/assets/images/team/nowful.png";
import sanjeevImg from "@/assets/images/team/sanjeev.png";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Our Team — CiferTrooper" },
      { name: "description", content: "Meet the talented team behind CiferTrooper — engineers, designers, and security experts." },
    ],
  }),
  component: TeamPage,
});

interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  linkedin?: string;
  twitter?: string;
}

interface TeamContent {
  heading?: string;
  subheading?: string;
  members?: TeamMember[];
}

// Local image map for known team members
const localImages: Record<string, string> = {
  "nowful": nowfulImg,
  "sanjeev": sanjeevImg,
};

function resolveAvatar(member: TeamMember, index: number): string | null {
  if (member.image) {
    const key = member.image.toLowerCase();
    for (const [k, v] of Object.entries(localImages)) {
      if (key.includes(k)) return v;
    }
    if (member.image.startsWith("http")) return member.image;
  }
  return null;
}

const fallbackMembers: TeamMember[] = [
  { name: "Chandru K.", role: "CEO & Founder", bio: "Cybersecurity expert with 10+ years in ethical hacking and digital strategy." },
  { name: "Alice Johnson", role: "CTO", bio: "Full-stack architect specializing in scalable cloud systems and microservices." },
  { name: "Bob Smith", role: "Head of Security", bio: "Certified ethical hacker and red team specialist with OSCP certification." },
  { name: "Carol White", role: "Lead Designer", bio: "UI/UX expert with a passion for accessible, beautiful, and conversion-focused interfaces." },
  { name: "David Lee", role: "AI Engineer", bio: "Machine learning researcher with expertise in NLP, computer vision, and LLM fine-tuning." },
  { name: "Meera Iyer", role: "Marketing Head", bio: "Digital marketing strategist with 8+ years of growth hacking and brand building experience." },
  { name: "Raj Patel", role: "Backend Engineer", bio: "Node.js and Python specialist focused on high-performance APIs and distributed systems." },
  { name: "Sneha Nair", role: "Mobile Developer", bio: "React Native and Flutter developer who has shipped 20+ apps to the App Store and Play Store." },
];

const gradientText = "bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent";

const avatarColors = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-amber-600",
  "from-pink-500 to-rose-600",
  "from-indigo-500 to-blue-600",
  "from-green-500 to-emerald-600",
  "from-red-500 to-orange-600",
];

function TeamPage() {
  const { data: content } = useQuery({
    queryKey: ["page", "team"],
    queryFn: () => getPage<TeamContent>("team"),
    retry: false,
  });

  const heading = content?.heading ?? "Meet the Team";
  const subheading = content?.subheading ?? "A diverse group of experts passionate about technology, security, and education.";
  const members: TeamMember[] = content?.members?.length ? content.members : fallbackMembers;

  return (
    <div className="bg-background text-foreground overflow-x-hidden">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(var(--accent-rgb),0.08),transparent)]" />
        <div className="container-page relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent mb-5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              The People
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              {heading.split(" ").slice(0, -1).join(" ")}{" "}
              <span className={gradientText}>{heading.split(" ").slice(-1)}</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{subheading}</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      {/* ── Team Grid ────────────────────────────────────────────────── */}
      <section className="container-page py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member, i) => {
            const avatar = resolveAvatar(member, i);
            const initials = member.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group rounded-3xl border border-border bg-card overflow-hidden hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500"
              >
                {/* Avatar */}
                <div className="relative aspect-square overflow-hidden">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center`}>
                      <span className="text-5xl font-bold text-white/90">{initials}</span>
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="flex gap-3">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                          className="size-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                          <Linkedin className="size-4" />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                          className="size-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/40 transition-colors">
                          <Twitter className="size-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-accent transition-colors">{member.name}</h3>
                  <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                  {member.bio && (
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{member.bio}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Join Us Banner ───────────────────────────────────────────── */}
      <section className="bg-surface py-24">
        <div className="container-page">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-foreground text-background p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[80px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 blur-[60px] rounded-full" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Want to join our team?</h2>
              <p className="text-lg opacity-70 max-w-xl mx-auto mb-8">
                We're always looking for talented engineers, designers, and security experts who share our passion for building great products.
              </p>
              <a
                href="mailto:cifertrooper@gmail.com?subject=Job Application"
                className="inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 rounded-full font-bold hover:bg-accent/90 transition-colors shadow-lg shadow-accent/30"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <CallToAction title="Let's build together." subtitle="Partner with a team that cares about your success as much as you do." />
    </div>
  );
}
