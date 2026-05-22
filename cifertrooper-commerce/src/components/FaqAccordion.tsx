import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export type FaqItem = { question: string; answer: string };

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion type="single" collapsible className="max-w-3xl mx-auto w-full">
      {items.map((item, i) => (
        <AccordionItem key={i} value={`item-${i}`}>
          <AccordionTrigger className="text-left text-lg font-display">{item.question}</AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
