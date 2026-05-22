import { Link } from "@tanstack/react-router";
import { Moon, Sun, Menu, X, Shield, ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavLink {
  to?: string;
  label: string;
  children?: NavLink[];
}

const links: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/about-us", label: "About" },
  { to: "/services", label: "Services" },

  { to: "http://localhost:7860", label: "Courses ↗" },
  { to: "http://localhost:7861", label: "Shop ↗" },
  {
    label: "Play Ground",
    children: [
      { to: "/Play_Ground/Ip-Locator", label: "IP Locator" },
      { to: "/Play_Ground/Ip-Graber", label: "IP Grabber" },
    ],
  },
  { to: "/team", label: "Team" },
  { to: "/faq", label: "FAQ" },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-2xl bg-background/70 border-b border-border/60 shadow-[0_4px_30px_-12px_oklch(0_0_0/0.15)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <nav aria-label="Main" className="container-page flex items-center justify-between h-16">
        <Link to="/" className="group flex items-center gap-2 font-display text-3xl tracking-tight">
          <img src="/Cifer-Trooper-Logo.svg" alt="Cifer Trooper" className="size-10 rounded-lg" />
          <span>
            Cifer<span className="text-accent">Trooper</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1 text-sm rounded-full border border-border/60 bg-background/40 backdrop-blur px-1.5 py-1.5">
          {links.map((l: NavLink) => (
            <li key={l.label}>
              {l.children ? (
                <DropdownMenu
                  open={activeDropdown === l.label}
                  onOpenChange={(isOpen) => setActiveDropdown(isOpen ? l.label : null)}
                >
                  <div
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(l.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <DropdownMenuTrigger className="flex items-center gap-1 px-3.5 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors outline-none cursor-pointer">
                      {l.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-300",
                          activeDropdown === l.label && "rotate-180",
                        )}
                      />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="center"
                      sideOffset={8}
                      className="bg-background/95 backdrop-blur-xl border-border/60 min-w-[240px] p-2 shadow-2xl"
                      onMouseEnter={() => setActiveDropdown(l.label)}
                    >
                      {l.children?.map((child: NavLink) => (
                        <DropdownMenuItem
                          key={child.label}
                          asChild
                          className="focus:bg-accent/10 focus:text-accent rounded-lg"
                        >
                          <Link
                            to={child.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full cursor-pointer px-3 py-2.5 transition-all"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="font-medium">{child.label}</span>
                            <ChevronDown className="size-3 -rotate-90 opacity-30" />
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </div>
                </DropdownMenu>
              ) : l.to?.startsWith("http") ? (
                <a
                  href={l.to}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors",
                    (l.label.includes("Courses") || l.label.includes("Shop")) &&
                      "bg-accent/10 text-accent/90 font-medium",
                  )}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  className={cn(
                    "relative px-3.5 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors",
                    (l.label === "Courses" || l.label === "Shop") &&
                      "bg-accent/10 text-accent/90 font-medium",
                  )}
                  activeProps={{ className: "text-foreground bg-secondary" }}
                  onClick={(e) => {
                    if (l.to === "#") e.preventDefault();
                  }}
                >
                  {l.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} toggle={toggle} />
          <Link to="/contact-us" className="hidden md:inline-flex">
            <Button
              size="sm"
              className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-transform shadow-[0_8px_24px_-8px_oklch(0.72_0.18_55/0.6)]"
            >
              Get a Quote
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <ul className="container-page py-4 flex flex-col gap-1 text-sm">
              {links.map((l: NavLink) => (
                <li key={l.label}>
                  {l.children ? (
                    <div className="flex flex-col gap-1">
                      <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {l.label}
                      </div>
                      {l.children?.map((child: NavLink) => (
                        <Link
                          key={child.label}
                          to={child.to}
                          onClick={() => setOpen(false)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-6 py-3 rounded-xl hover:bg-secondary transition-colors"
                        >
                          <span className="font-medium">{child.label}</span>
                          <ChevronDown className="size-3 -rotate-90 opacity-50" />
                        </Link>
                      ))}
                    </div>
                  ) : l.to?.startsWith("http") ? (
                    <a
                      href={l.to}
                      className={cn(
                        "block px-3 py-2.5 rounded-lg hover:bg-secondary",
                        (l.label.includes("Courses") || l.label.includes("Shop")) &&
                          "bg-accent/10 text-accent/90 font-medium",
                      )}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      to={l.to}
                      onClick={(e) => {
                        if (l.to === "#") e.preventDefault();
                        setOpen(false);
                      }}
                      className={cn(
                        "block px-3 py-2.5 rounded-lg hover:bg-secondary",
                        (l.label === "Courses" || l.label === "Shop") &&
                          "bg-accent/10 text-accent/90 font-medium",
                      )}
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
              <Link to="/contact-us" onClick={() => setOpen(false)} className="mt-2">
                <Button className="w-full rounded-full bg-accent text-accent-foreground">
                  Get a Quote
                </Button>
              </Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ThemeToggle({ theme, toggle }: { theme: "light" | "dark"; toggle: () => void }) {
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "relative h-9 w-16 rounded-full border border-border/70 transition-colors duration-500 overflow-hidden",
        isDark ? "bg-[oklch(0.22_0.04_260)]" : "bg-[oklch(0.85_0.05_85)]",
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isDark ? 1 : 0,
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 70% 60%, white, transparent), radial-gradient(1px 1px at 45% 80%, white, transparent)",
        }}
      />
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "absolute top-1 grid place-items-center size-7 rounded-full shadow-md",
          isDark
            ? "right-1 bg-[oklch(0.96_0.02_90)] text-[oklch(0.2_0.04_260)]"
            : "left-1 bg-white text-[oklch(0.55_0.18_55)]",
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="grid place-items-center"
          >
            {isDark ? <Moon className="size-3.5" /> : <Sun className="size-3.5" />}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </button>
  );
}
