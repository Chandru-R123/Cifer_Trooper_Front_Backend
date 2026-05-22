import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

type Hero = { title: string; subtitle: string; ctaLabel?: string };

export function HeroSection({ data }: { data?: Hero }) {
  const title = data?.title ?? "Digital security, beautifully engineered.";
  const subtitle =
    data?.subtitle ?? "We design, build and protect the platforms behind ambitious brands.";

  return (
    <section className="relative overflow-hidden bg-background">
      {/* Animated mesh background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-60 dark:opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(60rem 40rem at 15% 0%, var(--mesh-1, oklch(0.78 0.18 55 / 0.25)), transparent 60%), radial-gradient(50rem 35rem at 90% 20%, var(--mesh-2, oklch(0.55 0.2 280 / 0.25)), transparent 60%), radial-gradient(40rem 30rem at 50% 100%, var(--mesh-3, oklch(0.6 0.18 200 / 0.2)), transparent 60%)",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07] dark:opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          }}
        />
      </div>

      <div className="container-page relative pt-28 md:pt-40 pb-24 md:pb-32">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="relative flex size-2">
            <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
            <span className="relative rounded-full size-2 bg-accent" />
          </span>
          New — AI threat detection now in beta
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="mt-6 text-5xl md:text-7xl lg:text-[5.5rem] font-display max-w-5xl leading-[1.02] tracking-tight"
        >
          Digital security,{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-accent via-[oklch(0.7_0.2_35)] to-[oklch(0.6_0.2_280)] bg-clip-text text-transparent">
              beautifully
            </span>
          </span>{" "}
          engineered.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-7 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          {data
            ? subtitle
            : "We design, build and protect the platforms behind ambitious brands — with audit-grade security baked in from day one."}
          {!data && title === "Digital security, beautifully engineered." ? "" : ""}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Link to="/contact-us">
            <Button
              size="lg"
              className="group rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.03] transition-transform shadow-[0_10px_40px_-10px_oklch(0_0_0/0.4)] h-12 px-6"
            >
              {data?.ctaLabel ?? "Start a project"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/services">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-12 px-6 border-border bg-background/40 backdrop-blur hover:bg-background"
            >
              <Sparkles className="size-4 text-accent" />
              Explore services
            </Button>
          </Link>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border bg-border max-w-4xl"
        >
          {[
            { v: "200+", l: "Audits delivered" },
            { v: "99.99%", l: "Uptime SLA" },
            { v: "<8m", l: "Avg. response" },
            { v: "SOC 2", l: "Type II certified" },
          ].map((s) => (
            <div key={s.l} className="bg-background px-5 py-5">
              <div className="font-display text-2xl md:text-3xl">{s.v}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
