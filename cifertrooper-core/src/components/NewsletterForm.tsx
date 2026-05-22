import { useState } from "react";
import { apiPost } from "@/lib/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // POST /api/newsletter { email }
    await apiPost("/api/newsletter", { email }).catch(() => {});
    setDone(true);
    setEmail("");
  }

  return (
    <section className="container-page py-24">
      <div
        className="rounded-3xl bg-primary text-primary-foreground p-12 md:p-16 text-center"
        style={{ background: "var(--gradient-hero)" }}
      >
        <h2 className="text-3xl md:text-4xl mb-3">Stay in the loop</h2>
        <p className="opacity-75 mb-8 max-w-md mx-auto">
          Monthly insights on security, design, and engineering — no fluff.
        </p>
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
          />
          <Button
            type="submit"
            className="bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-transform"
          >
            Subscribe
          </Button>
        </form>
        {done && <p className="mt-4 text-sm text-accent">Thanks — you're on the list.</p>}
      </div>
    </section>
  );
}
