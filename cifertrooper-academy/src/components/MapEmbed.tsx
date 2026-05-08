export function MapEmbed({ src }: { src?: string }) {
  const url = src ?? "https://www.openstreetmap.org/export/embed.html?bbox=-0.137%2C51.507%2C-0.117%2C51.517&layer=mapnik";
  return (
    <div className="rounded-2xl overflow-hidden border border-border h-80">
      <iframe src={url} className="w-full h-full" loading="lazy" title="Office location" />
    </div>
  );
}
