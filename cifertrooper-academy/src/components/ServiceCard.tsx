import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export type Service = { slug: string; title: string; description: string; icon?: string };

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to="/services/$slug"
        params={{ slug: service.slug }}
        className="group block h-full p-7 rounded-2xl bg-card border border-border hover:border-accent transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
      >
        <div className="flex items-start justify-between mb-6">
          <div className="size-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-xl">
            {service.icon ?? "◆"}
          </div>
          <ArrowUpRight className="size-5 text-muted-foreground group-hover:text-accent group-hover:rotate-12 transition-all" />
        </div>
        <h3 className="text-xl mb-2">{service.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
      </Link>
    </motion.div>
  );
}

export function ServiceCardList({ services }: { services: Service[] }) {
  return (
    <section className="container-page py-24">
      <div className="max-w-2xl mb-12">
        <p className="text-sm text-accent font-medium tracking-wide uppercase mb-3">Services</p>
        <h2 className="text-4xl md:text-5xl">What we do best.</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
      </div>
    </section>
  );
}

export function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
    </div>
  );
}
