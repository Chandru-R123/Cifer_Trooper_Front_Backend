import { useState } from "react";
import { apiPost } from "@/lib/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      // POST /api/contact { name, email, phone, message }
      await apiPost("/api/contact", form);
      setStatus("ok");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("err");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" aria-label="Contact form">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          required
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
        />
      </div>
      <Button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-[1.02] transition-transform"
      >
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>
      {status === "ok" && (
        <p className="text-sm text-accent" role="status">
          Thanks — we'll be in touch within 24 hours.
        </p>
      )}
      {status === "err" && (
        <p className="text-sm text-destructive" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
