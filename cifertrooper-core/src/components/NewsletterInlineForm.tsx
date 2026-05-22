import { useState } from "react";
import { apiPost } from "@/lib/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function NewsletterInlineForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      // POST /api/newsletter { email } → confirmation
      await apiPost("/api/newsletter", { email });
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2 max-w-sm" aria-label="Newsletter signup">
      <Input
        type="email"
        required
        placeholder="you@company.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label="Email address"
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {status === "loading" ? "…" : "Subscribe"}
      </Button>
      {status === "ok" && <p className="sr-only">Subscribed</p>}
    </form>
  );
}
