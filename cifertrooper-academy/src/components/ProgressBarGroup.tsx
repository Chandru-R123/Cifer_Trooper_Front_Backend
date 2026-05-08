import { motion } from "framer-motion";

export type ProgressItem = { label: string; value: number };

export function ProgressBarGroup({ items }: { items: ProgressItem[] }) {
  return (
    <section className="container-page py-16">
      <div className="grid gap-8 max-w-3xl">
        {items.map((item, i) => (
          <div key={item.label}>
            <div className="flex justify-between mb-2 text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="text-muted-foreground">{item.value}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--gradient-accent)" }}
                initial={{ width: 0 }}
                whileInView={{ width: `${item.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
