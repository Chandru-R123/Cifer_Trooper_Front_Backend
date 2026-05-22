import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { apiGet } from "@/lib/api";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Assets

import serviceImg1 from "@/assets/images/home/Clone-app-development-2.jpg";
import serviceImg2 from "@/assets/images/home/web-development.jpg";
import serviceImg3 from "@/assets/images/home/ecom.jpg";
import serviceImg4 from "@/assets/images/home/Logo-Designing.jpg";
import serviceImg5 from "@/assets/images/home/UI-UX-Designing.jpg";
import serviceImg6 from "@/assets/images/home/Clone-app-development.jpg";
import whyChooseImg from "@/assets/images/home/agape-why-choose.png";
import starIcon from "@/assets/images/home/home1-star-title.webp";
import testimonialImg from "@/assets/images/home/home-testimonial.webp";
import smileIcon from "@/assets/images/home/smile.webp";
import cubeImg from "@/assets/images/home/home1-cube2.webp";

// Brand Logos
import brand1 from "@/assets/images/home/logo-5.png"; // Concepts Groups
import brand2 from "@/assets/images/home/logo-1.png"; // Taxi Coimbatore
import brand3 from "@/assets/images/home/logo-2.png"; // Coimbatore Taxi Booking
import brand4 from "@/assets/images/home/logo-3.png"; // Ooty Sam Tours & Travels
import brand5 from "@/assets/images/home/Vembas_190x_2x_2db3e1c2-fcfc-4761-85e1-d9d5a699fbf9.avif"; // Vembas Shoppie
import brand6 from "@/assets/images/home/logo-4.png"; // JS Promoters
import brand7 from "@/assets/images/home/bull-dog-logo.png"; // Bulldog Packers
import brand8 from "@/assets/images/home/cropped-Classic-Floors-final-logo-scaled-2.jpg"; // Classic Floors

interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  counter: string;
}

interface WhyChooseItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

interface Testimonial {
  id: string;
  text: string;
  name: string;
  position: string;
}

interface Brand {
  id: string;
  name: string;
  imageUrl: string;
}

interface HomeData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  services: Service[];
  whyChoose: WhyChooseItem[];
  about: {
    text1: string;
    text2: string;
    text3: string;
  };
  testimonials: Testimonial[];
  brands: Brand[];
}

const fallbackData: HomeData = {
  hero: {
    title: "Cifer Trooper",
    subtitle: "Design. Develop. Grow.",
    description:
      "Launch, grow, and stand out globally with Cifer Trooper – your complete partner for custom apps, clone apps, web design, branding, and digital marketing.",
  },
  services: [
    {
      id: "1",
      slug: "custom-app-development",
      title: "Clone App Development",
      counter: "[01]",
      imageUrl: serviceImg1,
      description:
        "Build your own version of popular apps like Uber, Gojek, Netflix, OnlyFans, Dream11, Tinder, Zomato, and more customized for your brand.",
    },
    {
      id: "2",
      slug: "website-development",
      title: "Website Development",
      counter: "[02]",
      imageUrl: serviceImg2,
      description: "SEO-friendly, responsive websites for any business.",
    },
    {
      id: "3",
      slug: "e-commerce-development",
      title: "E-Commerce Development",
      counter: "[03]",
      imageUrl: serviceImg3,
      description:
        "Launch an online store with payment gateway integration and mobile optimization.",
    },
    {
      id: "4",
      slug: "logo-branding-design",
      title: "Logo & Branding Design",
      counter: "[04]",
      imageUrl: serviceImg4,
      description:
        "Create a strong identity with professional logo design and complete brand kits.",
    },
    {
      id: "5",
      slug: "ui-ux-design",
      title: "UI / UX Designing",
      counter: "[05]",
      imageUrl: serviceImg5,
      description: "Modern, user-friendly interfaces for mobile apps and websites.",
    },
    {
      id: "6",
      slug: "custom-app-development",
      title: "Custom App Development",
      counter: "[06]",
      imageUrl: serviceImg6,
      description:
        "Turn your unique ideas into powerful apps for iOS, Android, or web — fully custom-built to match your vision, brand, and business goals from start to finish.",
    },
  ],
  whyChoose: [
    {
      id: "1",
      number: "01",
      title: "Global quality at competitive prices",
      description: "Get world-class app solutions without overpaying.",
    },
    {
      id: "2",
      number: "02",
      title: "100% white-label solutions",
      description: "Your brand, your identity, no hidden credits.",
    },
    {
      id: "3",
      number: "03",
      title: "End-to-end development & marketing",
      description: "From concept to customer acquisition, we handle it all.",
    },
    {
      id: "4",
      number: "04",
      title: "On-time delivery & dedicated support",
      description: "We value your deadlines and stand by you post-launch.",
    },
    {
      id: "5",
      number: "05",
      title: "Full source code ownership",
      description: "We deliver the complete source code, giving you total control.",
    },
    {
      id: "6",
      number: "06",
      title: "Custom-built with your ideas",
      description: "We adapt and enhance the clone with your unique features.",
    },
    {
      id: "7",
      number: "07",
      title: "Fast turnaround",
      description: "Launch-ready delivery within 20–30 days.",
    },
    {
      id: "8",
      number: "08",
      title: "3+ years of industry experience",
      description: "Proven track record across diverse industries.",
    },
  ],
  about: {
    text1:
      "Technology moves fast. You need a team that moves faster. Cifer Trooper was founded on the principle of technical agility. Over the last 3+ years, we have helped businesses transform their operations through cutting-edge IT services and proactive problem-solving.",
    text2:
      "At Cifer Trooper, we believe that technology should be an accelerator, not a bottleneck. With over three years of dedicated experience in the IT services sector, we have built a reputation for delivering robust, scalable, and secure digital solutions tailored to the modern enterprise.",
    text3:
      'Our team is built on the philosophy of the "Trooper"—resilient, disciplined, and always on the frontline of innovation. We don\'t just provide technical support; we act as your strategic partners, offering scalable solutions that grow alongside your business while maintaining a relentless focus on security and efficiency.',
  },
  testimonials: [
    {
      id: "1",
      text: "Temor fuvit calis zet monirulcen talisced rimum ferna torvat enique voleis vel dui vebulum",
      name: "Helena Wound",
      position: "Business Owner",
    },
    {
      id: "2",
      text: "Norbi lafet viro medist acurna selot pin fovart cranim ultris veum senolia manis ranmie",
      name: "Aidan Harper",
      position: "Photographer",
    },
    {
      id: "3",
      text: "Optra ipsum dolor sit amet suere interdum ac nisl fringilla ut arcu convallis suscipit leo",
      name: "Helena Wound",
      position: "Legal Advisor",
    },
  ],
  brands: [
    { id: "1", name: "Concepts Groups", imageUrl: brand1 },
    { id: "2", name: "Taxi Coimbatore", imageUrl: brand2 },
    { id: "3", name: "Coimbatore Taxi Booking", imageUrl: brand3 },
    { id: "4", name: "Ooty Sam Tours & Travels", imageUrl: brand4 },
    { id: "5", name: "Vembas Shoppie", imageUrl: brand5 },
    { id: "6", name: "JS Promoters", imageUrl: brand6 },
    { id: "7", name: "Bulldog Packers", imageUrl: brand7 },
    { id: "8", name: "Classic Floors", imageUrl: brand8 },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cifer Trooper – Design. Develop. Grow." },
      {
        name: "description",
        content:
          "Your complete partner for custom apps, clone apps, web design, branding, and digital marketing.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [data, setData] = useState<HomeData>(fallbackData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // API MODE: To enable, un-comment the lines below
    /*
    apiGet<HomeData>("/api/pages/home")
      .then((res) => {
        setData(res);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to fetch home data:", err);
        setIsLoaded(true);
      });
    */

    // For now, we simulate loading for the fallback
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-1 bg-accent"
        />
      </div>
    );
  }

  const gradientText =
    "bg-gradient-to-r from-accent via-[oklch(0.7_0.2_35)] to-[oklch(0.6_0.2_280)] bg-clip-text text-transparent";

  return (
    <div className="bg-card text-foreground selection:bg-accent selection:text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-10 px-6 text-center overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

        <motion.h1
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 relative z-10 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className={gradientText}>{data.hero.title}</span>
        </motion.h1>

        <motion.div
          className="text-2xl md:text-4xl text-slate-500 font-light mb-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Design. <span className={gradientText}>Develop</span>. Grow.
        </motion.div>

        <motion.p
          className="max-w-2xl text-lg text-muted-foreground leading-relaxed mb-12 relative z-10 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          Launch, grow, and stand out globally with <span className="font-bold">Cifer Trooper</span>{" "}
          – your complete partner for <span className={gradientText}>custom apps</span>, clone apps,
          web design, branding, and digital marketing.
        </motion.p>

        <Link to="/contact-us">
          <motion.button
            className="px-8 py-4 bg-foreground text-background font-semibold rounded-full hover:bg-foreground/85 transition-all relative z-10 flex items-center gap-2 group shadow-xl shadow-foreground/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            Get a Quote
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.button>
        </Link>
      </section>

      {/* Stats Hotspot Section */}
      <section className="relative overflow-hidden py-12 border-y border-border bg-card">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-white to-accent/5 opacity-50" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Years of Excellence", value: "3+" },
              { label: "Apps Built", value: "200+" },
              { label: "Happy Clients", value: "50+" },
              { label: "Team Members", value: "15+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h4 className={`text-4xl md:text-5xl font-bold mb-2 ${gradientText}`}>
                  {stat.value}
                </h4>
                <p className="text-slate-500 text-sm uppercase tracking-wider font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-card">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <motion.h5
              className="text-accent uppercase tracking-widest text-sm mb-2 font-bold"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Our Core
            </motion.h5>
            <motion.h2
              className="text-5xl md:text-7xl font-bold text-foreground"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className={gradientText}>Services</span>
            </motion.h2>
          </div>
          <Link to="/services">
            <motion.button
              className="px-6 py-3 border border-border rounded-full hover:bg-surface transition-all flex items-center gap-2 text-muted-foreground"
              whileHover={{ x: 5 }}
            >
              All Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((service, index) => (
            <Link
              key={service.id}
              to={`/services/${service.slug}`}
              className="group relative h-[450px] rounded-3xl overflow-hidden bg-muted shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="h-full w-full"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent z-10 group-hover:from-slate-900/90 transition-all" />
                <img
                  src={service.imageUrl}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 z-20 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-accent text-sm mb-4 block font-bold drop-shadow-md">
                    {service.counter}
                  </span>
                  <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-md">
                    {service.title}
                  </h3>
                  <p className="text-slate-200 text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 line-clamp-3">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row gap-16 items-center mb-20">
            <div className="md:w-1/2">
              <motion.h3
                className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-foreground"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                Why Choose <br /> <span className={gradientText}>Cifer Trooper</span>
              </motion.h3>
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl" />
                <img
                  src={whyChooseImg}
                  alt="Why Choose Us"
                  className="relative w-full rounded-2xl transition-all duration-700 shadow-2xl z-10"
                />
                <motion.img
                  src={cubeImg}
                  alt="Decorative"
                  className="absolute -bottom-10 -right-10 w-32 hidden md:block z-20"
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-12">
              {data.whyChoose.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative p-2 group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-accent/30 font-mono text-5xl font-bold absolute -top-4 -left-4 group-hover:text-accent/50 transition-colors">
                    {item.number}
                  </span>
                  <div className="relative z-10">
                    <h4 className="text-xl font-bold mb-2 text-foreground group-hover:translate-x-1 transition-transform">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-24 px-6 md:px-12 bg-card overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-start">
          <div className="md:w-1/2 relative">
            <motion.img
              src={starIcon}
              alt="About Us"
              className="w-32 mb-8"
              initial={{ rotate: 0 }}
              whileInView={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.h2
              className="text-4xl md:text-6xl font-bold mb-8 text-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Our Vision & <br /> <span className={gradientText}>Philosophy</span>
            </motion.h2>
          </div>
          <div className="md:w-1/2 space-y-8">
            <motion.p
              className="text-xl text-foreground/80 leading-relaxed font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Technology moves fast. You need a team that moves faster. Cifer Trooper was founded on
              the principle of <span className={gradientText}>Technical Agility</span>. Over the
              last 3+ years, we have helped businesses transform their operations through
              cutting-edge IT services and proactive problem-solving.
            </motion.p>
            <motion.p
              className="text-slate-500 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              At Cifer Trooper, we believe that technology should be an accelerator, not a
              bottleneck. With over three years of dedicated experience in the IT services sector,
              we have built a reputation for delivering robust, scalable, and secure digital
              solutions tailored to the modern enterprise.
            </motion.p>
            <motion.div
              className="p-8 bg-surface border-l-4 border-accent rounded-r-2xl shadow-inner"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-muted-foreground leading-relaxed italic">
                Our team is built on the philosophy of the "Trooper"—resilient, disciplined, and
                always on the frontline of <span className={gradientText}>innovation</span>. We
                don't just provide technical support; we act as your strategic partners, offering
                scalable solutions that grow alongside your business while maintaining a relentless
                focus on security and efficiency.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-surface relative overflow-hidden border-y border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(var(--accent-rgb),0.05),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-16 relative z-10">
          <div className="relative group mx-auto md:mx-0 max-w-md">
            <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            <img
              src={testimonialImg}
              alt="Testimonials"
              className="relative z-10 w-full rounded-full border-8 border-white shadow-2xl"
            />
            <motion.img
              src={smileIcon}
              alt="Smile"
              className="absolute -top-4 -right-4 w-24 z-20 drop-shadow-lg"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
          </div>
          <div className="text-foreground">
            <AnimatePresence mode="wait">
              <TestimonialSlider testimonials={data.testimonials} />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Brands Carousel */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <div className="mb-16">
            <h5 className="text-accent uppercase tracking-widest text-sm font-bold mb-4">
              Trusted By
            </h5>
            <h2 className="text-4xl md:text-6xl font-bold text-foreground">
              Brands We've <span className={gradientText}>Empowered</span>
            </h2>
          </div>
          <div className="relative overflow-hidden py-10 bg-surface/60 rounded-4xl border border-border">
            <div className="flex animate-marquee whitespace-nowrap gap-20 items-center">
              {[...data.brands, ...data.brands].map((brand, i) => (
                <img
                  key={`${brand.id}-${i}`}
                  src={brand.imageUrl}
                  alt={brand.name}
                  className="h-12 md:h-16 w-auto grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer object-contain"
                />
              ))}
            </div>
          </div>
          <div className="mt-16 p-8 border border-border rounded-3xl bg-card shadow-sm max-w-4xl mx-auto">
            <p className="text-slate-500 text-lg leading-relaxed">
              “Over the past <strong>3+ years, Cifer Trooper</strong> has been a trusted partner for
              businesses ranging from ambitious startups to established enterprises. We join forces
              with brands to solve their most complex technical challenges.”
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 bg-card text-center px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
        <motion.h2
          className="text-6xl md:text-8xl font-bold mb-12 relative z-10 tracking-tighter text-foreground"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Let's Build <br /> Something <span className={gradientText}>Great</span>
        </motion.h2>
        <motion.p
          className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          We provide powerful, ready-to-launch app solutions for clients across the globe — turning
          your vision into reality.
        </motion.p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
          <Link to="/contact-us">
            <motion.button
              className="px-12 py-5 bg-foreground text-background font-bold text-xl rounded-full hover:bg-foreground/85 transition-all shadow-xl shadow-foreground/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
            </motion.button>
          </Link>
          <motion.button
            className="px-12 py-5 border-2 border-border text-foreground/80 font-bold text-xl rounded-full hover:bg-surface transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Portfolio
          </motion.button>
        </div>
      </section>
    </div>
  );
}

function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const current = testimonials[index];

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-accent text-7xl font-serif leading-none h-8 opacity-40">“</div>
      <p className="text-2xl md:text-3xl leading-relaxed font-light text-foreground/80">
        {current.text}
      </p>
      <div className="pt-4">
        <h4 className="text-2xl font-bold text-foreground">{current.name}</h4>
        <span className="text-accent text-sm tracking-widest uppercase font-bold">
          {current.position}
        </span>
      </div>
      <div className="flex gap-3 mt-12">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-16 h-1.5 transition-all rounded-full ${i === index ? "bg-accent" : "bg-muted hover:bg-muted-foreground/30"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
