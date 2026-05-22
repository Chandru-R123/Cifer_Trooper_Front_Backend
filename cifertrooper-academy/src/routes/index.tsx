import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shield, GraduationCap, Users, Award, BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseGrid } from "@/components/CourseCard";
import { getCourses, getPage } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

// Assets
import whyChooseImg from "@/assets/images/home/agape-why-choose.png";
import testimonialImg from "@/assets/images/home/home-testimonial.webp";
import smileIcon from "@/assets/images/home/smile.webp";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: courses, isLoading, error } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const { data: homeContent } = useQuery({
    queryKey: ["page", "home"],
    queryFn: () => getPage<{
      hero?: { heading: string; subheading: string; cta: string };
      stats?: { label: string; value: string }[];
      whyChoose?: { title: string; desc: string }[];
      testimonials?: { name: string; role: string; quote: string }[];
    }>("home"),
  });

  const stats = homeContent?.stats ?? [
    { label: "Expert Instructors", value: "10+" },
    { label: "Hands-on Modules", value: "500+" },
    { label: "Students Certified", value: "2000+" },
    { label: "Success Rate", value: "98%" },
  ];
  const statIcons = [Users, BookOpen, Award, Shield];

  const whyChoose = homeContent?.whyChoose ?? [
    { title: "Practical Labs", desc: "Every module includes intensive practical sessions using industry tools." },
    { title: "Real-world Projects", desc: "Build tools and perform penetration tests that reflect real-world scenarios." },
    { title: "Lifetime Mentorship", desc: "Our instructors guide you even after you complete your course." },
  ];

  const testimonial = homeContent?.testimonials?.[0] ?? {
    name: "Kavimugil R.", role: "Alumni - 2024",
    quote: "The Red Team Field course was a game-changer. Hands-on modules gave me skills I could not find anywhere else.",
  };

  const hero = homeContent?.hero;
  const gradientText = "bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent";

  return (
    <div className="bg-card text-foreground selection:bg-accent selection:text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 px-6 text-center overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_70%)]" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-6 border border-accent/20">
            <Sparkles className="size-3" />
            Welcome to CiferTrooper Academy
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">
            Your Gateway to <br />
            <span className={gradientText}>{hero?.heading ?? "Cyber Excellence."}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed mb-12 px-4">
            {hero?.subheading ?? "Master the most advanced security techniques with our industry-standard programs. From beginner fundamentals to elite red teaming."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#catalog">
              <Button size="lg" className="rounded-full px-10 py-7 text-lg group bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl shadow-accent/20">
                {hero?.cta ?? "Explore Courses"}
                <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </motion.div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-accent/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />
      </section>

      {/* Trust Stats */}
      <section className="py-12 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const Icon = statIcons[i % statIcons.length];
            return (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center gap-2">
                <Icon className="size-6 text-accent mb-2" />
                <h4 className="text-3xl font-bold">{stat.value}</h4>
                <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Course Catalog Section */}
      <section id="catalog" className="py-24 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Academy <span className={gradientText}>Catalog</span></h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore our specialized programs designed for the next generation of security researchers and developers.</p>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-20"><div className="animate-pulse w-16 h-1 bg-accent" /></div>
        ) : error ? (
          <div className="text-center py-20"><p className="text-destructive">Failed to load courses.</p></div>
        ) : (
          <CourseGrid courses={courses || []} />
        )}
      </section>

      {/* Why Choose Academy Section */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="container-page">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
              <div className="relative">
                <img src={whyChooseImg} alt="Training" className="rounded-3xl shadow-2xl relative z-10" />
                <div className="absolute -inset-4 bg-accent/20 blur-3xl -z-10 rounded-full" />
              </div>
            </motion.div>
            <div className="space-y-8">
              <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                Why Study at <br /><span className={gradientText}>CiferTrooper Academy?</span>
              </h3>
              <div className="space-y-6">
                {whyChoose.map((item, i) => (
                  <motion.div key={i} className="flex gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-accent transition-colors shadow-sm" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <div className="size-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="size-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container-page grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src={testimonialImg} alt="Success Stories" className="rounded-full max-w-sm mx-auto border-8 border-surface shadow-2xl" />
            <motion.img src={smileIcon} alt="" className="absolute -top-4 -right-4 w-24 drop-shadow-lg" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} />
          </div>
          <div>
            <div className="text-accent text-6xl mb-6 opacity-30">"</div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed mb-8 italic">"{testimonial.quote}"</p>
            <div>
              <h4 className="text-xl font-bold">{testimonial.name}</h4>
              <p className="text-accent text-sm font-bold uppercase tracking-widest">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
