import { Twitter, Linkedin, Facebook, Link as LinkIcon } from "lucide-react";
import { Button } from "./ui/button";

export function SocialShareBar({ url, title }: { url: string; title: string }) {
  const enc = encodeURIComponent;
  const links = [
    {
      Icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
      label: "Share on Twitter",
    },
    {
      Icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      label: "Share on LinkedIn",
    },
    {
      Icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      label: "Share on Facebook",
    },
  ];
  return (
    <div className="container-page max-w-3xl flex items-center gap-3 py-6 border-t border-border">
      <span className="text-sm text-muted-foreground">Share:</span>
      {links.map(({ Icon, href, label }) => (
        <Button key={label} variant="outline" size="icon" asChild>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
            <Icon className="size-4" />
          </a>
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigator.clipboard?.writeText(url)}
        aria-label="Copy link"
      >
        <LinkIcon className="size-4" />
      </Button>
    </div>
  );
}
