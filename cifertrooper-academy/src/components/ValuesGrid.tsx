import { motion } from "framer-motion";

export type Value = { title: string; description: string; icon?: string };

export function ValuesGrid({ values }: { values: Value[] }) {
  return (
    <section className="container-page py-24">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="p-7 rounded-2xl bg-card border border-border"
          >
            <div className="size-10 rounded-lg bg-accent/15 text-accent flex items-center justify-center text-lg mb-4">
              {v.icon ?? "✦"}
            </div>
            <h3 className="text-lg mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground">{v.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
