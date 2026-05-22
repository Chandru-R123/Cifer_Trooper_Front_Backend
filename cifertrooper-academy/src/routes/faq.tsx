import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getPage } from "@/lib/api";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — CiferTrooper" },
      { name: "description", content: "Frequently asked questions about CiferTrooper services, courses, pricing, and support." },
    ],
  }),
  component: FaqPage,
});

interface FaqItem { q: string; a: string; }
interface FaqContent { heading?: string; items?: FaqItem[]; }

const fallbackItems: FaqItem[] = [
  { q: "What services do you offer?", a: "We offer web development, mobile apps, UI/UX design, SEO, cybersecurity, AI solutions, and digital marketing." },
  { q: "How long does a project take?", a: "Typically 4–12 weeks depending on scope and complexity. We'll give you a detailed timeline after the discovery call." },
  { q: "Do you offer support after launch?", a: "Yes, we offer ongoing maintenance and support plans for all projects. We're here for the long run." },
  { q: "What technologies do you use?", a: "React, Node.js, TypeScript, MongoDB, Python, TensorFlow, React Native, and more — always the right tool for the job." },
  { q: "Do you work with startups?", a: "Absolutely. We love working with early-stage startups and have special packages tailored for them." },
  { q: "Can I get a free consultation?", a: "Yes! Book a free 30-minute consultation call with our team. No strings attached." },
  { q: "Do you offer training programs?", a: "Yes, through CiferTrooper Academy we offer cybersecurity, full-stack, AI, and mobile development courses." },
  { q: "What is your pricing model?", a: "We offer fixed-price projects, hourly rates, and monthly retainer packages depending on your needs." },
  { q: "Do you sign NDAs?", a: "Yes, we're happy to sign an NDA before any project discussion. Your ideas are safe with us." },
  { q: "Can you work with our existing team?", a: "Absolutely. We integrate seamlessly with in-house teams as an extension of your engineering or design capacity." },
];

// Group FAQs into categories for better UX
const categories = [
  { label: "Services", icon: "🛠️", indices: [0, 1, 2, 3] },
  { label: "Working With Us", icon: "🤝", indices: [4, 5, 8, 9] },
  { label: "Academy & Training", icon: "🎓", indices: [6] },
  { label: "Pricing", icon: "💰", indices: [7] },
];

const gradientText = "bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent";

function FaqPage() {
  const { data: content, isLoading } = useQuery({
    queryKey: ["page", "faq"],
    queryFn: () => getPage<FaqContent>("faq"),
  });

  if (isLoading) return <div className="flex items-center justify-center min-h-[60vh]"><div className="animate-pulse w-16 h-1 bg-accent" /></div>;

  const heading = content?.heading ?? "Frequently Asked Questions";
  const items: FaqItem[] = content?.items ?? [];

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <section className="relative pt-32 pb-20 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(var(--accent-rgb),0.06),transparent)]" />
        <div className="container-page relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent mb-5 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20">Got Questions?</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent">Frequently</span> Asked
              <br />Questions
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about working with CiferTrooper. Can't find your answer? Reach out directly.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container-page py-24">
        <div className="max-w-4xl mx-auto">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">No FAQ items found.</p>
          ) : (
            <Accordion type="single" collapsible className="space-y-3">
              {items.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-2xl px-6 bg-card data-[state=open]:border-accent/50 data-[state=open]:shadow-lg transition-all">
                  <AccordionTrigger className="hover:no-underline py-5 text-left font-semibold text-base hover:text-accent transition-colors">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="container-page">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground text-lg">Our team is happy to help. Reach out through any of these channels.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: MessageSquare, title: "Live Chat", desc: "Chat with us on WhatsApp for instant answers.", href: "https://wa.me/918015577055", label: "Start Chat", color: "text-green-600" },
              { icon: Mail, title: "Email Us", desc: "Send us a detailed message and we'll reply within 24 hours.", href: "mailto:cifertrooper@gmail.com", label: "Send Email", color: "text-blue-600" },
              { icon: Phone, title: "Call Us", desc: "Speak directly with our team during business hours.", href: "tel:+918015577055", label: "Call Now", color: "text-purple-600" },
            ].map((item, i) => (
              <motion.a key={item.title} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group p-8 rounded-3xl border border-border bg-card hover:border-accent/30 hover:shadow-xl transition-all text-center">
                <div className={`size-14 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${item.color}`}>
                  <item.icon className="size-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{item.desc}</p>
                <span className="text-accent font-semibold text-sm group-hover:underline">{item.label} &rarr;</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
