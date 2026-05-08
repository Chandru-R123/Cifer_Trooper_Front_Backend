import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export type BlogPostPreview = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  thumbnailUrl?: string;
};

export function BlogPostPreviewList({ posts }: { posts: BlogPostPreview[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p, i) => (
        <motion.article
          key={p.slug}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Link to="/blog/$slug" params={{ slug: p.slug }} className="group block">
            <div className="aspect-[16/10] rounded-xl overflow-hidden bg-muted mb-4">
              {p.thumbnailUrl ? (
                <img src={p.thumbnailUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20" />
              )}
            </div>
            <time className="text-xs text-muted-foreground uppercase tracking-wide">{new Date(p.date).toLocaleDateString()}</time>
            <h3 className="text-xl mt-2 mb-2 group-hover:text-accent transition-colors">{p.title}</h3>
            <p className="text-sm text-muted-foreground">{p.excerpt}</p>
          </Link>
        </motion.article>
      ))}
    </div>
  );
}
