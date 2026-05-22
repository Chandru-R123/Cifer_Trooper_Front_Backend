export function TagList({ tags }: { tags: string[] }) {
  if (!tags?.length) return null;
  return (
    <ul className="flex flex-wrap gap-2 my-8 container-page max-w-3xl" aria-label="Tags">
      {tags.map((t) => (
        <li
          key={t}
          className="px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
