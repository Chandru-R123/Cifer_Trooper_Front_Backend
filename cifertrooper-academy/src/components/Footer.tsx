import { Link } from "@tanstack/react-router";
import { NewsletterInlineForm } from "./NewsletterInlineForm";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-surface">
      <div className="container-page py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-5">

        {/* Brand */}
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src="/Cifer-Trooper-Logo.svg" alt="CiferTrooper" className="size-9 rounded-lg" />
            <span className="font-bold text-xl">Cifer<span className="text-accent">Trooper</span></span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs mb-6 leading-relaxed">
            Building secure, modern digital experiences for ambitious teams. Agency + Academy under one roof.
          </p>
          <NewsletterInlineForm />
          <div className="flex gap-3 mt-6">
            <SocialLink href="https://www.facebook.com/share/16THVpMj6s/" icon={<Facebook className="size-4" />} label="Facebook" />
            <SocialLink href="https://www.instagram.com/cifertrooper" icon={<Instagram className="size-4" />} label="Instagram" />
            <SocialLink href="https://x.com/CiferTrooper" icon={<Twitter className="size-4" />} label="Twitter" />
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-sm font-semibold mb-5 uppercase tracking-wider">Company</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
            <li><Link to="/about-us" className="hover:text-foreground transition-colors">About Us</Link></li>
            <li><a href="/team" className="hover:text-foreground transition-colors">Our Team</a></li>
            <li><a href="/faq" className="hover:text-foreground transition-colors">FAQ</a></li>
            <li><Link to="/contact-us" className="hover:text-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-sm font-semibold mb-5 uppercase tracking-wider">Services</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><a href="/services/website-development" className="hover:text-foreground transition-colors">Web Development</a></li>
            <li><a href="/services/mobile-app-development" className="hover:text-foreground transition-colors">Mobile Apps</a></li>
            <li><a href="/services/ui-ux-design" className="hover:text-foreground transition-colors">UI / UX Design</a></li>
            <li><a href="/services/e-commerce-development" className="hover:text-foreground transition-colors">E-Commerce</a></li>
            <li><a href="/services/ai-automation-chatbot-solutions" className="hover:text-foreground transition-colors">AI & Automation</a></li>
            <li><a href="/services/cybersecurity-services" className="hover:text-foreground transition-colors">Cybersecurity</a></li>
          </ul>
        </div>

        {/* Academy + Contact */}
        <div>
          <h4 className="text-sm font-semibold mb-5 uppercase tracking-wider">Academy</h4>
          <ul className="space-y-3 text-sm text-muted-foreground mb-8">
            <li><a href="/courses/ethical-hacking" className="hover:text-foreground transition-colors">Ethical Hacking</a></li>
            <li><a href="/courses/full-stack-web-development" className="hover:text-foreground transition-colors">Full Stack Dev</a></li>
            <li><a href="/courses/ai-machine-learning" className="hover:text-foreground transition-colors">AI & ML</a></li>
            <li><a href="/courses/mobile-app-development" className="hover:text-foreground transition-colors">Mobile Dev</a></li>
            <li><a href="/courses/cloud-aws-devops" className="hover:text-foreground transition-colors">Cloud & DevOps</a></li>
          </ul>
          <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="size-3.5 shrink-0" /><a href="mailto:cifertrooper@gmail.com" className="hover:text-foreground transition-colors">cifertrooper@gmail.com</a></li>
            <li className="flex items-center gap-2"><Phone className="size-3.5 shrink-0" /><a href="tel:+918015577055" className="hover:text-foreground transition-colors">+91 80155 77055</a></li>
            <li className="flex items-start gap-2"><MapPin className="size-3.5 shrink-0 mt-0.5" /><span>Neelambur, Tamil Nadu 641062</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6">
        <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} CiferTrooper. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="/faq" className="hover:text-foreground transition-colors">FAQ</a>
            <Link to="/contact-us" className="hover:text-foreground transition-colors">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="size-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/40 transition-colors"
    >
      {icon}
    </a>
  );
}
