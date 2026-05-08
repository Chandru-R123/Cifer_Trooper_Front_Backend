export function BlogPostContent({ html, title, date, author }: { html: string; title: string; date: string; author?: string }) {
  return (
    <article className="container-page max-w-3xl py-16">
      <header className="mb-10">
        <time className="text-xs text-muted-foreground uppercase tracking-widest">{new Date(date).toLocaleDateString()}</time>
        <h1 className="text-4xl md:text-5xl mt-3 mb-4">{title}</h1>
        {author && <p className="text-sm text-muted-foreground">By {author}</p>}
      </header>
      <div
        className="prose prose-lg prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
