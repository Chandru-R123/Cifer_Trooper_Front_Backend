import { motion } from "framer-motion";

export type TeamMember = { name: string; role: string; bio: string; photoUrl?: string };

export function TeamCardGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {members.map((m, i) => (
        <motion.article
          key={m.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="rounded-2xl bg-card border border-border overflow-hidden hover:shadow-[var(--shadow-soft)] transition-shadow"
        >
          <div className="aspect-[4/5] bg-gradient-to-br from-accent/30 to-primary/30 flex items-center justify-center text-5xl font-display text-foreground/40">
            {m.photoUrl ? <img src={m.photoUrl} alt={m.name} className="w-full h-full object-cover" /> : m.name.charAt(0)}
          </div>
          <div className="p-6">
            <h3 className="text-lg">{m.name}</h3>
            <p className="text-sm text-accent mb-2">{m.role}</p>
            <p className="text-sm text-muted-foreground">{m.bio}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
