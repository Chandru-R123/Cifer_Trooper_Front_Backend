import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { useEffect, useState } from "react";  // 🔌 un-comment for API mode
// import { apiGet } from "@/lib/api";            // 🔌 un-comment for API mode

/* ─── local image imports (copied from cifertrooper-clone) ─── */
import heroTeam from "@/assets/images/about-us/hero-team.webp";
import heroWorkspace from "@/assets/images/about-us/hero-workspace.webp";
import bannerImg from "@/assets/images/about-us/banner.jpg";
import serviceApp from "@/assets/images/about-us/service-app.jpg";
import serviceWeb from "@/assets/images/about-us/service-web.jpg";
import serviceUi from "@/assets/images/about-us/service-ui.jpg";
import serviceEcom from "@/assets/images/about-us/service-ecom.jpg";
import whyDesign from "@/assets/images/about-us/why-design.jpg";
import whyUser from "@/assets/images/about-us/why-user.jpg";
import whyClient from "@/assets/images/about-us/why-client.jpg";
import teamCollab from "@/assets/images/about-us/team-collab.webp";

/* ─── API response type  (matches all STATIC_* arrays below) ───
   Un-comment this block when switching to API mode.

type StatItem        = { number: string; label: string };
type ServiceItem     = { title: string; desc: string; img: string; stat: string; unit: string };
type ValueItem       = { icon: string; title: string; desc: string };
type TestimonialItem = { quote: string; name: string; role: string };
type CollageItem     = { img: string; alt: string; tall: boolean };

type AboutPageData = {
  stats?:        StatItem[];
  services?:     ServiceItem[];
  values?:       ValueItem[];
  testimonials?: TestimonialItem[];
  whyList?:      string[];
  collage?:      CollageItem[];
};
─────────────────────────────────────────────────────────────── */

/* ─── route ─────────────────────────────────────────────────── */
export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us — CiferTrooper" },
      {
        name: "description",
        content:
          "Technology moves fast. You need a team that moves faster. Cifer Trooper was founded on the principle of technical agility — 3+ years helping businesses transform through cutting-edge digital solutions.",
      },
    ],
  }),
  component: AboutPage,
});

/* ─── animation preset ───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: i * 0.09 },
  }),
};

/* ─── static content ─────────────────────────────────────────── */
const STATS = [
  { number: "3+", label: "Years of Excellence" },
  { number: "200+", label: "Projects Delivered" },
  { number: "50+", label: "Happy Clients" },
  { number: "10+", label: "Expert Team Members" },
];

const SERVICES = [
  {
    title: "Clone App Development",
    slug: "custom-app-development",
    desc: "Launch your own feature-rich clone of top apps — Uber, Airbnb, Swiggy and more — production-ready and fully customised for your brand.",
    img: serviceApp,
    stat: "200+",
    unit: "Apps Built",
  },
  {
    title: "Website Development",
    slug: "website-development",
    desc: "Blazing-fast, SEO-optimised websites on modern stacks — from landing pages to complex portals and SaaS dashboards.",
    img: serviceWeb,
    stat: "150+",
    unit: "Sites Launched",
  },
  {
    title: "UI / UX Design",
    slug: "ui-ux-design",
    desc: "Interfaces that earn trust on first touch — wireframes, interactive prototypes, and pixel-perfect delivery.",
    img: serviceUi,
    stat: "100+",
    unit: "Screens Crafted",
  },
  {
    title: "E-Commerce Solutions",
    slug: "e-commerce-development",
    desc: "End-to-end online stores with Razorpay, Stripe, and multi-vendor support baked in from day one.",
    img: serviceEcom,
    stat: "80+",
    unit: "Stores Live",
  },
];

const VALUES = [
  {
    icon: "⚡",
    title: "Technical Agility",
    desc: "We keep pace with a fast-moving industry and ship updates continuously.",
  },
  {
    icon: "🎯",
    title: "Client-First",
    desc: "Your goals drive every decision we make — no fluff, just measurable results.",
  },
  {
    icon: "🛡",
    title: "Reliability",
    desc: "Audit-grade security and 99.9 % uptime commitments as a baseline, not an upsell.",
  },
  {
    icon: "✦",
    title: "Design Excellence",
    desc: "Beautiful products that feel inevitable to use and impossible to forget.",
  },
  {
    icon: "◉",
    title: "Innovation",
    desc: "We explore emerging tech so you can stay ahead of the curve.",
  },
  {
    icon: "▣",
    title: "Transparency",
    desc: "Plain answers, clear pricing, and weekly progress updates — always.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Cifer Trooper rebuilt our platform in record time. The clone app they delivered exceeded every expectation.",
    name: "Rahul Sharma",
    role: "Founder, RideEasy",
  },
  {
    quote:
      "Their UI/UX team is world-class. We saw a 40 % jump in conversions within the first month post-launch.",
    name: "Priya Menon",
    role: "CEO, ShopQuick",
  },
  {
    quote:
      "Transparent, fast, and genuinely passionate. Cifer Trooper is the only tech partner we'll ever need.",
    name: "Ankit Verma",
    role: "CTO, DeliverNow",
  },
];

const WHY_LIST = [
  "3+ years of proven industry experience",
  "Full-stack team under one roof",
  "Agile delivery with weekly sprint reviews",
  "Post-launch support & maintenance included",
  "Competitive, transparent pricing",
  "NDA & IP protection guaranteed",
];

const COLLAGE = [
  { img: whyDesign, alt: "Design process", tall: true },
  { img: whyUser, alt: "User research", tall: false },
  { img: whyClient, alt: "Client collaboration", tall: false },
  { img: teamCollab, alt: "Team at work", tall: false },
];

/* ─── page component ─────────────────────────────────────────── */
function AboutPage() {
  /* ════════════════════════════════════════════════════════════════
     🔌  API MODE  — un-comment this entire block when the backend
         endpoint  GET /api/pages/about-us  is ready.
         Also un-comment the two import lines at the top of this file
         and the AboutPageData type block above.
     ════════════════════════════════════════════════════════════════

  const [pageData, setPageData] = useState<AboutPageData | null>(null);

  useEffect(() => {
    // GET /api/pages/about-us  →  populates all six data arrays below.
    // On any error the fallback STATIC_* constants are used automatically.
    apiGet<AboutPageData>("/api/pages/about-us")
      .then(setPageData)
      .catch(() => {});
  }, []);

  // When API responds, merge with static defaults for any missing fields:
  const stats        = pageData?.stats        ?? STATS;
  const services     = pageData?.services     ?? SERVICES;
  const values       = pageData?.values       ?? VALUES;
  const testimonials = pageData?.testimonials ?? TESTIMONIALS;
  const whyList      = pageData?.whyList      ?? WHY_LIST;
  const collage      = pageData?.collage      ?? COLLAGE;

     ════════════════════════════════════════════════════════════════ */

  /* ════════════════════════════════════════════════════════════════
     📦  STATIC MODE  (active now — all data is hardcoded above).
         Comment out this entire block when switching to API MODE.
     ════════════════════════════════════════════════════════════════ */
  const stats = STATS;
  const services = SERVICES;
  const values = VALUES;
  const testimonials = TESTIMONIALS;
  const whyList = WHY_LIST;
  const collage = COLLAGE;
  /* ════════════════════════════════════════════════════════════════ */

  return (
    <main className="overflow-x-hidden">
      {/* ══════════════════════════════════════════════════
          HERO  — warm gradient background, NOT pitch-black
          ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-background">
        {/* mesh glow — same system as HeroSection */}
        <div aria-hidden className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 opacity-60 dark:opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(55rem 38rem at 5% 0%,  oklch(0.78 0.18 55 / 0.22), transparent 60%)," +
                "radial-gradient(45rem 32rem at 95% 15%, oklch(0.55 0.2 280 / 0.18), transparent 60%)," +
                "radial-gradient(38rem 28rem at 50% 110%,oklch(0.6 0.18 200 / 0.15), transparent 60%)",
            }}
          />
          {/* subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.06] dark:opacity-[0.10]"
            style={{
              backgroundImage:
                "linear-gradient(to right,currentColor 1px,transparent 1px)," +
                "linear-gradient(to bottom,currentColor 1px,transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%,black,transparent)",
            }}
          />
        </div>

        <div className="container-page relative pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* left — text */}
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              {/* eyebrow badge — same pattern as HeroSection */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-muted-foreground mb-6">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
                  <span className="relative rounded-full size-2 bg-accent" />
                </span>
                Design. Develop. Grow.
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-display leading-[1.03] tracking-tight mb-6">
                Technology moves fast.{" "}
                <span className="bg-gradient-to-r from-accent via-[oklch(0.7_0.2_35)] to-[oklch(0.6_0.2_280)] bg-clip-text text-transparent">
                  We move faster.
                </span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg mb-8">
                Cifer Trooper was founded on the principle of technical agility. Over 3+ years we
                have helped businesses transform through cutting-edge IT services — from clone apps
                to world-class digital design.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/contact-us">
                  <Button
                    size="lg"
                    className="group rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.03] transition-transform shadow-[0_10px_40px_-10px_oklch(0_0_0/0.4)] h-12 px-6"
                  >
                    Start a Project
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
                    Our Services
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* right — stacked photo collage */}
            <motion.div
              className="relative hidden md:block h-[400px]"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
            >
              <img
                src={heroTeam}
                alt="Cifer Trooper team"
                className="absolute right-0 top-0 w-[63%] h-[260px] rounded-2xl object-cover shadow-2xl"
              />
              <img
                src={heroWorkspace}
                alt="Cifer Trooper workspace"
                className="absolute left-0 bottom-4 w-[54%] h-[220px] rounded-2xl object-cover shadow-xl ring-4 ring-background"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          STATS STRIP  — accent amber bar
          ══════════════════════════════════════════════════ */}
      <section className="bg-accent/10 border-y border-accent/20">
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex flex-col items-center justify-center py-10 px-6 border-r last:border-r-0 border-accent/20 text-center"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.08}
              >
                <span className="font-display text-5xl md:text-6xl text-foreground leading-none">
                  {s.number}
                </span>
                <span className="mt-2 text-sm text-muted-foreground">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          OUR STORY
          ══════════════════════════════════════════════════ */}
      <section className="container-page py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* image with floating badge */}
          <motion.div
            className="relative"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <img
              src={bannerImg}
              alt="Cifer Trooper office"
              className="rounded-2xl w-full h-80 md:h-[420px] object-cover shadow-xl"
            />
            {/* floating stat badge */}
            <div className="absolute -bottom-5 right-4 sm:right-8 bg-foreground text-background rounded-2xl px-5 py-4 shadow-2xl">
              <div className="font-display text-3xl text-accent">3+</div>
              <div className="text-xs text-background/60 mt-0.5">Years building</div>
            </div>
          </motion.div>

          {/* text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
          >
            <span className="inline-block text-accent text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-display leading-tight mb-6">
              Built on the principle of <span className="text-accent">technical agility</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Cifer Trooper started with a simple belief — great technology should be accessible to
              every business, not just Fortune 500 companies. From day one we combined startup speed
              with enterprise-grade quality.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Today our multidisciplinary team of designers, developers, and strategists partners
              with founders, scale-ups, and enterprises across India and globally — turning
              ambitious ideas into production-ready digital products.
            </p>
            <ul className="space-y-3">
              {whyList.slice(0, 4).map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="size-5 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SERVICES GRID  — surface background (light grey)
          ══════════════════════════════════════════════════ */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-page">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span className="inline-block text-accent text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-display">Our Core Services</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm">
              Full-spectrum digital services — from ideation to launch and beyond.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s: (typeof SERVICES)[number], i) => (
              <Link key={s.title} to={`/services/${s.slug}`} className="group block">
                <motion.div
                  className="rounded-2xl overflow-hidden bg-card border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={i * 0.08}
                >
                  {/* image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* stat chip */}
                    <div className="absolute top-3 right-3 bg-accent/90 backdrop-blur text-foreground rounded-xl px-2.5 py-1.5 text-center shadow">
                      <div className="font-display text-xl font-semibold leading-none">
                        {s.stat}
                      </div>
                      <div className="text-[9px] mt-0.5 opacity-80">{s.unit}</div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-base font-semibold mb-2 group-hover:text-accent transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY CHOOSE US  — white bg, image collage right
          ══════════════════════════════════════════════════ */}
      <section className="container-page py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* text */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span className="inline-block text-accent text-xs uppercase tracking-[0.2em] font-semibold mb-4">
              Why Choose Us
            </span>
            <h2 className="text-4xl md:text-5xl font-display leading-tight mb-6">
              The Cifer Trooper <span className="text-accent">difference</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We don't just build products — we build long-term partnerships. Every engagement comes
              with dedicated support, open communication, and a relentless focus on your ROI.
            </p>
            <ul className="space-y-3">
              {whyList.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle className="size-5 text-accent shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 2×2 image collage */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
          >
            {collage.map((c, i) => (
              <div key={i} className={`rounded-2xl overflow-hidden ${i === 0 ? "row-span-2" : ""}`}>
                <img
                  src={c.img}
                  alt={c.alt}
                  className={`w-full object-cover ${i === 0 ? "h-full min-h-[260px]" : "h-36"}`}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          VALUES — soft surface bg with colored icon cards
          ══════════════════════════════════════════════════ */}
      <section className="bg-surface py-24 md:py-32">
        <div className="container-page">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <span className="inline-block text-accent text-xs uppercase tracking-[0.2em] font-semibold mb-3">
              Our Values
            </span>
            <h2 className="text-4xl md:text-5xl font-display">What drives us every day</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                className="group rounded-2xl border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-6"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.07}
              >
                {/* icon circle */}
                <div className="size-12 rounded-xl bg-accent/15 flex items-center justify-center text-2xl mb-4 group-hover:bg-accent/25 transition-colors">
                  {v.icon}
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TESTIMONIALS — white bg
          ══════════════════════════════════════════════════ */}
      <section className="container-page py-24 md:py-32">
        <motion.div
          className="text-center mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <span className="inline-block text-accent text-xs uppercase tracking-[0.2em] font-semibold mb-3">
            Client Love
          </span>
          <h2 className="text-4xl md:text-5xl font-display">What our clients say</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 gap-4 hover:shadow-lg transition-shadow"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i * 0.1}
            >
              <div className="font-display text-5xl text-accent leading-none select-none">
                &ldquo;
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground flex-1">{t.quote}</p>
              <div className="pt-2 border-t border-border">
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          CTA — warm accent gradient (NOT black)
          ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* gradient background — accent amber → muted purple */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "linear-gradient(135deg, oklch(0.78 0.18 55) 0%, oklch(0.7 0.2 35) 50%, oklch(0.6 0.2 280) 100%)",
          }}
        />
        {/* low-opacity photo texture */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.08]"
          style={{
            backgroundImage: `url(${bannerImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="container-page py-24 md:py-28 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display text-foreground mb-5 leading-tight">
              Ready to build something{" "}
              <span className="underline decoration-foreground/30 decoration-4 underline-offset-4">
                remarkable?
              </span>
            </h2>
            <p className="text-foreground/70 text-lg max-w-xl mx-auto mb-8">
              Let's turn your idea into a world-class product — from day one.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/contact-us">
                <Button
                  size="lg"
                  className="group rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-[1.03] transition-transform shadow-[0_10px_40px_-10px_oklch(0_0_0/0.35)] h-12 px-8"
                >
                  Get a Free Quote
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full h-12 px-8 border-foreground/25 bg-foreground/10 hover:bg-foreground/20 backdrop-blur text-foreground"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
