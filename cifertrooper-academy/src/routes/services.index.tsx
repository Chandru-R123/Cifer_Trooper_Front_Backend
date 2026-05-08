import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getServices, type ServiceItem } from "@/lib/api";

// Fallback images for services that don't have a backend image
import cloneImg from "@/assets/images/services/tinder-openai-game-inc.webp";
import webImg from "@/assets/images/services/web.jpg";
import aiImg from "@/assets/images/services/ai.jpg";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { name: "description", content: "Comprehensive digital solutions: Clone App Development, UI/UX, Website Engineering, and AI Automation." }
    ],
  }),
  component: ServicesPage,
});

// Resolve image: backend returns a path like /images/services/... served from the frontend public folder
function resolveImage(img: string | undefined): string {
  if (!img) return cloneImg;
  if (img.startsWith("http")) return img;
  return img; // served from frontend /public
}

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-card rounded-3xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={resolveImage(service.image)}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
          <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-accent">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
        <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center font-bold text-foreground shadow-sm">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="p-8 flex-grow flex flex-col">
        <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
          {service.description}
        </p>
        <div className="pt-6 border-t border-border mt-auto">
          <Link
            to="/services/$slug"
            params={{ slug: service.slug }}
            className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors"
          >
            Learn More
            <div className="w-6 h-[1px] bg-muted group-hover:bg-accent group-hover:w-10 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function ServicesPage() {
  const { data: services, isLoading, error } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero Section */}
      <section className="container-page pt-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl"
        >
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-accent/80 mb-4 block">
            Our Services
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Everything we{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-amber-500 to-purple-600">
              Develop
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Cifer Trooper turns ideas into stunning apps, websites, and brands — from clone solutions to captivating UI/UX, e-commerce, and global marketing magic.
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="container-page pb-32">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse w-16 h-1 bg-accent" />
          </div>
        )}
        {error && (
          <p className="text-center text-destructive py-20">Failed to load services.</p>
        )}
        {services && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service._id} service={service} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* Promise Section */}
      <section className="bg-foreground text-background py-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 blur-[120px] rounded-full -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-purple-600/10 blur-[100px] rounded-full -ml-20 -mb-20" />
        <div className="container-page relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-8"
            >
              Our Promise
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
            >
              We're not just a service provider — we're your growth partner. Trusted by innovative startups and industry leaders worldwide.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <a
                href="/contact-us"
                className="inline-flex items-center gap-4 bg-card text-foreground px-10 py-5 rounded-full font-bold hover:bg-accent hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                Contact Us Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-20 bg-card border-y border-border overflow-hidden whitespace-nowrap flex select-none">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-12 px-6"
          >
            {["STRATEGY", "DESIGN", "DEVELOPMENT", "MARKETING", "AUTOMATION"].map((text) => (
              <div key={text} className="flex items-center gap-12">
                <span className="text-6xl md:text-8xl font-black text-slate-100 tracking-tighter uppercase">{text}</span>
                <span className="w-6 h-6 rounded-full bg-accent" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </main>
  );
}
