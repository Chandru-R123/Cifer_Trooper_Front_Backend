type Client = { name: string; logoUrl?: string };

export function ClientLogoCarousel({ clients }: { clients: Client[] }) {
  const items: Client[] = clients.length
    ? clients
    : Array.from({ length: 8 }, (_, i) => ({ name: `Client ${i + 1}` }));
  const doubled = [...items, ...items];
  return (
    <section className="py-16 border-y border-border bg-surface overflow-hidden">
      <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8">
        Trusted by teams worldwide
      </p>
      <div className="relative">
        <div className="flex gap-16 animate-[marquee_30s_linear_infinite] w-max">
          {doubled.map((c, i) => (
            <div
              key={i}
              className="flex items-center justify-center min-w-[140px] text-lg font-display text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              {c.logoUrl ? <img src={c.logoUrl} alt={c.name} className="h-8 opacity-70" /> : c.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
