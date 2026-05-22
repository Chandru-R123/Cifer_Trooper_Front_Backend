import { createFileRoute } from "@tanstack/react-router";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MapEmbed } from "@/components/MapEmbed";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Clock, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "@/lib/api";
import heroBg from "@/assets/images/contact-us/hero-bg.png";
import type { ReactNode } from "react";

export const Route = createFileRoute("/contact-us")({
  head: () => ({ 
    meta: [
      { name: "description", content: "Reach out to the CiferTrooper team for app development, UI/UX design, or digital marketing inquiries." }
    ] 
  }),
  component: ContactPage,
});

interface ContactPageContent {
  heading?: string;
  subheading?: string;
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
  socials?: { facebook?: string; instagram?: string; twitter?: string; linkedin?: string };
}

function ContactPage() {
  const { data: content, isLoading } = useQuery({
    queryKey: ["page", "contact-us"],
    queryFn: () => getPage<ContactPageContent>("contact-us"),
  });

  const email   = content?.email   ?? "cifertrooper@gmail.com";
  const phone   = content?.phone   ?? "+91 80155 77055";
  const address = content?.address ?? "No: 04, Kathir IT Park, Wisdom Tree, Avinashi Rd, Neelambur, Tamil Nadu 641062";
  const hours   = content?.hours   ?? "Mon - Sat: 9:00 AM - 7:00 PM";
  const subtitle = content?.subheading ?? "Tell us about your project and we'll reply within 24 hours.";
  const socials  = content?.socials ?? { facebook: "https://www.facebook.com/share/16THVpMj6s/", instagram: "https://www.instagram.com/cifertrooper", twitter: "https://x.com/CiferTrooper" };

  return (
    <div className="min-h-screen bg-surface/60 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <img src={heroBg} alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="container-page relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Let's Talk About <span className="text-gradient">Your Project</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
          </motion.div>
        </div>
      </section>

      <section className="container-page pb-24 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-foreground">Get in Touch</h2>
              <p className="text-slate-500">Have a question or ready to start? We're here to help you navigate your digital transformation.</p>
            </div>
            <div className="grid gap-6">
              <ContactInfoCard icon={<Mail className="text-blue-600" size={24} />} title="Email Us" content={email} link={`mailto:${email}`} />
              <ContactInfoCard icon={<Phone className="text-purple-600" size={24} />} title="Call Us" content={phone} link={`tel:${phone.replace(/\s/g, "")}`} />
              <ContactInfoCard icon={<MapPin className="text-orange-500" size={24} />} title="Visit Us" content={address} link="https://maps.google.com" />
              <ContactInfoCard icon={<Clock className="text-emerald-600" size={24} />} title="Working Hours" content={hours} />
            </div>
            <div className="p-8 rounded-[2rem] bg-card border border-border shadow-sm">
              <h3 className="text-lg font-bold mb-6">Follow Our Journey</h3>
              <div className="flex gap-4">
                {socials.facebook && <SocialCircleLink href={socials.facebook} icon={<Facebook size={20} />} brand="facebook" />}
                {socials.instagram && <SocialCircleLink href={socials.instagram} icon={<Instagram size={20} />} brand="instagram" />}
                {socials.twitter && <SocialCircleLink href={socials.twitter} icon={<Twitter size={20} />} brand="twitter" />}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="lg:col-span-7">
            <div className="bg-card rounded-[2.5rem] p-8 md:p-12 border border-border shadow-xl shadow-blue-500/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-full blur-3xl -mr-32 -mt-32 transition-colors duration-500 group-hover:bg-blue-100/50" />
              <div className="relative z-10">
                <div className="mb-10">
                  <h3 className="text-3xl font-bold mb-3">Send a Message</h3>
                  <p className="text-slate-500">Fill out the form below and our team will get back to you shortly.</p>
                </div>
                <ContactForm />
                <div className="mt-12 pt-10 border-t border-border">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                    <div className="size-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                      <MessageSquare size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">Immediate Support?</h4>
                      <WhatsAppButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-page pb-24">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[3rem] overflow-hidden border border-border shadow-2xl h-[450px] relative group">
          <MapEmbed />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </section>
    </div>
  );
}

function ContactInfoCard({ icon, title, content, link }: { icon: ReactNode; title: string; content: string; link?: string }) {
  const CardContent = (
    <div className="flex gap-5">
      <div className="size-14 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-1">{title}</h4>
        <p className="text-foreground font-medium leading-relaxed">{content}</p>
      </div>
    </div>
  );

  return (
    <motion.div 
      whileHover={{ x: 10 }}
      className="group p-6 rounded-3xl bg-card border border-border shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-md"
    >
      {link ? (
        <a href={link} target={link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
          {CardContent}
        </a>
      ) : (
        CardContent
      )}
    </motion.div>
  );
}

function SocialCircleLink({ href, icon, brand }: { href: string; icon: ReactNode; brand: "facebook" | "instagram" | "twitter" | "linkedin" }) {
  const brandColors: Record<string, string> = {
    facebook: "hover:bg-[#1877F2]",
    instagram: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888]",
    twitter: "hover:bg-black",
    linkedin: "hover:bg-[#0077b5]",
  };

  const hoverColor = brandColors[brand] || "hover:bg-accent";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`size-12 rounded-full bg-surface border border-border flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:shadow-lg ${hoverColor}`}
      aria-label={`Follow us on ${brand}`}
    >
      {icon}
    </a>
  );
}
