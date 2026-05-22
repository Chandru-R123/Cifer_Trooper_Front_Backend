import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — CiferTrooper" },
      { name: "description", content: "Frequently asked questions." },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  useEffect(() => {
    // GET /api/pages/faq → map each Q&A to an AccordionItem
    apiGet<FaqItem[]>("/api/pages/faq")
      .then(setItems)
      .catch(() => setItems(defaults));
  }, []);

  return (
    <section className="container-page py-24">
      <header className="max-w-2xl mx-auto text-center mb-16">
        <p className="text-sm text-accent uppercase tracking-widest font-medium mb-3">FAQ</p>
        <h1 className="text-4xl md:text-6xl">Questions, answered.</h1>
      </header>
      <FaqAccordion items={items.length ? items : defaults} />
    </section>
  );
}

const defaults: FaqItem[] = [
  {
    question: "How do engagements typically start?",
    answer:
      "We begin with a 30-minute scoping call, then send a fixed-scope proposal within 48 hours.",
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes — we sign your NDA before any sensitive material is shared.",
  },
  {
    question: "What's your typical timeline?",
    answer: "Most engagements run 6–12 weeks, with weekly demos throughout.",
  },
  {
    question: "Do you work with regulated industries?",
    answer: "Yes — fintech, healthtech, and govtech are core verticals for us.",
  },
];
