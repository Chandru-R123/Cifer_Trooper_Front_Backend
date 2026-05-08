import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "./ui/button";

export type Testimonial = { quote: string; author: string; role?: string };

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const items = testimonials.length ? testimonials : [
    { quote: "Exceptional team, exceptional outcomes.", author: "Demo Client", role: "CTO" },
  ];
  const [i, setI] = useState(0);
  const t = items[i];

  return (
    <section className="container-page py-24">
      <div className="max-w-3xl mx-auto text-center">
        <Quote className="mx-auto size-10 text-accent mb-6" />
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="font-display text-2xl md:text-3xl leading-snug"
          >
            "{t.quote}"
          </motion.blockquote>
        </AnimatePresence>
        <p className="mt-6 text-sm text-muted-foreground">
          <span className="text-foreground font-medium">{t.author}</span>
          {t.role && ` — ${t.role}`}
        </p>
        <div className="flex justify-center gap-2 mt-8">
          <Button variant="outline" size="icon" onClick={() => setI((p) => (p - 1 + items.length) % items.length)} aria-label="Previous">
            <ChevronLeft className="size-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setI((p) => (p + 1) % items.length)} aria-label="Next">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
