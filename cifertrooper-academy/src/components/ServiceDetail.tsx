import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "@tanstack/react-router";

export function ServiceDetailHeader({ title, subtitle, heroImageUrl }: { title: string; subtitle?: string; heroImageUrl?: string }) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-slate-950">
      {heroImageUrl && (
        <img src={heroImageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" aria-hidden />
      )}
      <div className="container-page relative py-24 md:py-36 text-white text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-7xl font-bold max-w-4xl mx-auto leading-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </header>
  );
}

export function ServiceAbout({ 
  title, 
  description, 
  ctaText, 
  imageUrl 
}: { 
  title: string; 
  description: string[]; 
  ctaText?: string; 
  imageUrl?: string 
}) {
  return (
    <section className="container-page py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">{title}</h2>
          {description.map((p, i) => (
            <p key={i} className="text-lg text-slate-600 mb-4 leading-relaxed">{p}</p>
          ))}
          {ctaText && (
            <Link 
              to="/contact-us" 
              className="inline-block mt-6 px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all transform hover:scale-105"
            >
              {ctaText}
            </Link>
          )}
        </div>
        {imageUrl && (
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src={imageUrl} alt={title} className="w-full h-auto" />
          </div>
        )}
      </div>
    </section>
  );
}

export function ServiceSection({ 
  subtitle, 
  title, 
  items 
}: { 
  subtitle?: string; 
  title: string; 
  items: { title: string; image?: string; description: string; list?: string[] }[] 
}) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="container-page">
        <div className="text-center mb-16">
          {subtitle && <span className="text-primary font-semibold tracking-wider uppercase text-sm">{subtitle}</span>}
          <h2 className="text-3xl md:text-5xl font-bold mt-2 text-slate-900 capitalize">{title}</h2>
        </div>
        <div className="grid gap-12">
          {items.map((item, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
              {item.image && (
                <div className="flex-1 w-full">
                  <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                    <img src={item.image} alt={item.title} className="w-full h-auto object-cover aspect-[4/3]" />
                  </div>
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 text-slate-800">{item.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{item.description}</p>
                {item.list && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {item.list.map((li, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-700">
                        <FaCheckCircle className="text-primary flex-shrink-0" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceFaqs({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="container-page py-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-slate-900">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto divide-y divide-slate-200">
        {faqs.map((faq, i) => (
          <div key={i} className="py-6">
            <h3 className="text-xl font-semibold mb-3 text-slate-800">{faq.question}</h3>
            <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BenefitList({ benefits }: { benefits: string[] }) {
  return (
    <section className="container-page py-16">
      <h2 className="text-3xl font-bold mb-8 text-slate-900">Key Benefits</h2>
      <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, i) => (
          <li key={i} className="flex flex-col gap-4 p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <span className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xl font-bold">
              {i + 1}
            </span>
            <span className="font-medium text-slate-700 leading-snug">{b}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export type CaseStudy = { title: string; summary: string; imageUrl?: string };

export function CaseStudyCarousel({ studies }: { studies: CaseStudy[] }) {
  if (!studies?.length) return null;
  return (
    <section className="bg-slate-950 py-24 text-white">
      <div className="container-page">
        <h2 className="text-3xl md:text-5xl font-bold mb-16">Related Case Studies</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((s, i) => (
            <article key={i} className="group cursor-pointer">
              <div className="aspect-[16/10] bg-slate-900 rounded-3xl overflow-hidden mb-6 relative">
                {s.imageUrl ? (
                  <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20" />
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">{s.title}</h3>
              <p className="text-slate-400 leading-relaxed">{s.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

