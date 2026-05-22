import { Link } from "@tanstack/react-router";
import { NewsletterInlineForm } from "./NewsletterInlineForm";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-surface">
      <div className="container-page py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-2xl mb-3">CiferTrooper</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            Building secure, modern digital experiences for ambitious teams.
          </p>
          <NewsletterInlineForm />
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/shop">Shop</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/contact-us">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} CiferTrooper. All rights reserved.
      </div>
    </footer>
  );
}
