import { MessageCircle } from "lucide-react";

export function WhatsAppButton({
  phone = "1234567890",
  message = "Hi, I'd like a quote.",
}: {
  phone?: string;
  message?: string;
}) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[oklch(0.65_0.18_150)] text-white hover:scale-105 transition-transform shadow-[var(--shadow-soft)]"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="size-5" />
      Chat on WhatsApp
    </a>
  );
}
