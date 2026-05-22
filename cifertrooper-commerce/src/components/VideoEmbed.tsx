export function VideoEmbed({ videoId, title = "Featured video" }: { videoId?: string; title?: string }) {
  const id = videoId ?? "dQw4w9WgXcQ";
  return (
    <section className="container-page py-24">
      <div className="max-w-4xl mx-auto">
        <div className="aspect-video rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-soft)]">
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}
