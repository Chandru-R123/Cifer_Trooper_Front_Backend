import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { motion } from "framer-motion";

// Asset Imports
import cloneImg from "@/assets/images/services/tinder-openai-game-inc.webp";
import brandingImg from "@/assets/images/services/pwd.jpg";
import uiuxImg from "@/assets/images/services/ui.jpg";
import webImg from "@/assets/images/services/web.jpg";
import ecomImg from "@/assets/images/services/ecom.jpg";
import customImg from "@/assets/images/services/app.jpg";
import marketingImg from "@/assets/images/services/seo.jpg";
import aiImg from "@/assets/images/services/ai.jpg";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { name: "description", content: "Comprehensive digital solutions: Clone App Development, UI/UX, Website Engineering, and AI Automation." }
    ],
  }),
  component: ServicesPage,
});

interface ServiceItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

interface ServicesData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  services: ServiceItem[];
  promise: {
    title: string;
    description: string;
  };
}

const fallbackData: ServicesData = {
  hero: {
    title: "Everything we <span class=\"text-gradient\">Develop</span>",
    subtitle: "Our Services",
    description: "Cifer Trooper turns ideas into stunning apps, websites, and brands — from clone solutions to captivating UI/UX, e-commerce, and global marketing magic."
  },
  services: [
    {
      id: 1,
      title: "Clone App Development",
      description: "Build your own version of popular apps like Uber, Gojek, Netflix, OnlyFans, Zomato, and more customized for your brand.",
      image: cloneImg,
      link: "/services/custom-app-development"
    },
    {
      id: 2,
      title: "Logo & Branding Design",
      description: "Create a strong identity with professional logo design and complete brand kits that stand out in the marketplace.",
      image: brandingImg,
      link: "/services/logo-branding-design"
    },
    {
      id: 3,
      title: "UI / UX Design",
      description: "Modern, user-friendly interfaces for mobile apps and websites designed for maximum engagement and retention.",
      image: uiuxImg,
      link: "/services/ui-ux-design"
    },
    {
      id: 4,
      title: "Website Development",
      description: "SEO-friendly, responsive websites built with the latest technologies to ensure performance and scalability.",
      image: webImg,
      link: "/services/website-development"
    },
    {
      id: 5,
      title: "E-Commerce Development",
      description: "Launch an online store with seamless payment gateway integration and mobile-first shopping experiences.",
      image: ecomImg,
      link: "/services/e-commerce-development"
    },
    {
      id: 6,
      title: "Custom App Development",
      description: "Turn unique ideas into powerful apps for iOS and Android, fully custom-built to match your business vision.",
      image: customImg,
      link: "/services/custom-app-development"
    },
    {
      id: 7,
      title: "Online Marketing",
      description: "SEO, social media marketing, and high-conversion ad campaigns to grow your business globally.",
      image: marketingImg,
      link: "/services/online-marketing"
    },
    {
      id: 8,
      title: "AI Automation & Chatbots",
      description: "Work smarter with intelligent chatbots and AI-driven automation to reduce manual tasks and improve CX.",
      image: aiImg,
      link: "/services/ai-automation-chatbot-solutions"
    }
  ],
  promise: {
    title: "Our Promise",
    description: "We’re not just a service provider — we’re your growth partner. Trusted by innovative startups and industry leaders worldwide."
  }
};

const gradientText = "bg-clip-text text-transparent bg-gradient-to-r from-accent via-amber-500 to-purple-600";

function ServicesPage() {
  const [data, setData] = useState<ServicesData>(fallbackData);

  useEffect(() => {
    /* 
    // API Mode: Uncomment to fetch from backend
    apiGet<ServicesData>("/api/pages/services")
      .then(setData)
      .catch((err) => {
        console.error("Failed to fetch services data:", err);
        setData(fallbackData);
      });
    */
  }, []);

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
            {data.hero.subtitle}
          </span>
          <h1 
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: data.hero.title }}
          />
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            {data.hero.description}
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="container-page pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group bg-card rounded-3xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                   <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-accent">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                   </div>
                </div>
                <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl bg-card/90 backdrop-blur-sm border border-border flex items-center justify-center font-bold text-foreground shadow-sm">
                  0{service.id}
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
                   <Link to={service.link} className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-widest text-muted-foreground group-hover:text-accent transition-colors">
                      Learn More
                      <div className="w-6 h-[1px] bg-muted group-hover:bg-accent group-hover:w-10 transition-all duration-300" />
                   </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
              {data.promise.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground leading-relaxed"
            >
              {data.promise.description}
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
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Marquee (Reused from logic, but distinct) */}
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
