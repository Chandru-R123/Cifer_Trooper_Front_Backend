import { motion } from "framer-motion";

type Story = { heading: string; body: string };

export function StorySection({ story }: { story?: Story }) {
  const data = story ?? {
    heading: "Crafted with intent.",
    body: "We started CiferTrooper to bridge the gap between security engineering and elegant design. Today we partner with teams who refuse to choose between safety and beauty.",
  };
  return (
    <section className="container-page py-24">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-accent uppercase tracking-widest font-medium mb-3">
            Our story
          </p>
          <h1 className="text-4xl md:text-6xl">{data.heading}</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground leading-relaxed prose prose-neutral dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
      </div>
    </section>
  );
}
