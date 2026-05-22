import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function CallToAction({
  title = "Ready to start?",
  subtitle = "Let's build something remarkable together.",
  to = "/contact-us" as const,
}: {
  title?: string;
  subtitle?: string;
  to?: "/contact-us";
}) {
  return (
    <section className="container-page py-24">
      <div className="rounded-3xl border border-border p-12 md:p-16 bg-surface text-center">
        <h2 className="text-3xl md:text-4xl mb-3">{title}</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{subtitle}</p>
        <Link to={to}>
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-transform"
          >
            Get in touch <ArrowRight className="size-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
