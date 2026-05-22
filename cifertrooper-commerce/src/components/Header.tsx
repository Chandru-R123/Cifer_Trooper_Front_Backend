import { Link, useNavigate } from "@tanstack/react-router";
import {
  Moon, Sun, Menu, X, ChevronDown, ShoppingBag, User,
  LogOut, LayoutDashboard, Package, Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { CartDrawer } from "./CartDrawer";

const navLinks = [
  { to: "http://localhost:7862", label: "↖ Back", external: true },
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  {
    label: "Products",
    children: [
      { to: "/shop?cat=Gadgets", label: "Gadgets" },
      { to: "/shop?cat=Kits", label: "Kits" },
    ],
  },
] as any[];

export function Header() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          scrolled
            ? "backdrop-blur-2xl bg-background/80 border-b border-border/60 shadow-[0_4px_30px_-12px_oklch(0_0_0/0.12)]"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <nav aria-label="Main" className="container-page flex items-center justify-between h-16 px-4 md:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 font-display text-2xl tracking-tight shrink-0">
            <img src="/Cifer-Trooper-Logo.svg" alt="Cifer Trooper" className="size-9 rounded-lg" />
            <span>
              Cifer<span className="text-accent">Trooper</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-0.5 text-sm rounded-full border border-border/60 bg-background/40 backdrop-blur px-1.5 py-1.5">
            {navLinks.map((l: any) => (
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
                        <ChevronDown className={cn("size-3 transition-transform duration-200", activeDropdown === l.label && "rotate-180")} />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="center"
                        sideOffset={8}
                        className="bg-background/95 backdrop-blur-xl border-border/60 min-w-[180px] p-1.5 shadow-2xl rounded-2xl"
                        onMouseEnter={() => setActiveDropdown(l.label)}
                      >
                        {l.children.map((child: any) => (
                          <DropdownMenuItem key={child.label} asChild className="focus:bg-accent/10 focus:text-accent rounded-xl">
                            <Link
                              to={child.to}
                              className="flex items-center px-3 py-2 cursor-pointer font-medium"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </div>
                  </DropdownMenu>
                ) : l.external ? (
                  <a
                    href={l.to}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-accent bg-accent/10 font-medium transition-all duration-300",
                      "hover:text-foreground hover:bg-secondary/50 shadow-[0_2px_10px_-4px_oklch(0.72_0.18_55/0.2)]"
                    )}
                  >
                    {l.label}
                  </a>
                ) : l.to ? (
                  <Link
                    to={l.to}
                    activeOptions={{ exact: l.to === "/" }}
                    className="px-3.5 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                    activeProps={{ className: "text-foreground bg-secondary font-medium" }}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <span className="px-3.5 py-1.5 rounded-full text-muted-foreground select-none">
                    {l.label}
                  </span>
                )}
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} toggle={toggle} />

            {/* Cart Button */}
            <button
              id="cart-toggle-btn"
              onClick={() => setCartOpen(true)}
              className="relative size-9 flex items-center justify-center rounded-full hover:bg-secondary border border-border/60 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="size-4" />
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 size-4.5 min-w-[18px] h-[18px] rounded-full bg-accent text-accent-foreground text-[10px] font-bold flex items-center justify-center leading-none px-0.5"
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </motion.span>
              )}
            </button>

            {/* User / Auth */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  id="user-menu-btn"
                  className={cn(
                    "size-9 flex items-center justify-center rounded-full border transition-colors",
                    isAuthenticated
                      ? "bg-accent text-accent-foreground border-accent hover:bg-accent/90"
                      : "hover:bg-secondary border-border/60"
                  )}
                  aria-label="User menu"
                >
                  {isAuthenticated ? (
                    <span className="text-[11px] font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <User className="size-4" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="bg-background/95 backdrop-blur-xl border-border/60 min-w-[200px] p-1.5 shadow-2xl rounded-2xl"
              >
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2">
                      <p className="font-semibold text-sm truncate">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem asChild className="focus:bg-accent/10 focus:text-accent rounded-xl">
                      <Link to="/account" className="flex items-center gap-2.5 px-3 py-2 cursor-pointer">
                        <LayoutDashboard className="size-4" />
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="focus:bg-accent/10 focus:text-accent rounded-xl">
                      <Link to="/account" className="flex items-center gap-2.5 px-3 py-2 cursor-pointer">
                        <Package className="size-4" />
                        My Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 px-3 py-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10 rounded-xl"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild className="focus:bg-accent/10 focus:text-accent rounded-xl">
                      <Link to="/auth" className="flex items-center gap-2.5 px-3 py-2 cursor-pointer font-medium">
                        <User className="size-4" />
                        Login / Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/contact-us" className="hidden md:inline-flex">
              <Button
                size="sm"
                className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-transform shadow-[0_8px_24px_-8px_oklch(0.72_0.18_55/0.6)]"
              >
                Get a Quote
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
            >
              <ul className="container-page py-4 flex flex-col gap-1 text-sm px-4">
                {navLinks.map((l: any) => (
                  <li key={l.label}>
                    {l.children ? (
                      <div className="flex flex-col gap-1">
                        <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          {l.label}
                        </div>
                        {l.children.map((child: any) => (
                          <Link
                            key={child.label}
                            to={child.to}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center px-5 py-2.5 rounded-xl hover:bg-secondary transition-colors font-medium"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : l.external ? (
                      <a
                        href={l.to}
                        className="block px-3 py-2.5 rounded-xl bg-accent/10 text-accent font-medium"
                      >
                        {l.label}
                      </a>
                    ) : l.to ? (
                      <Link
                        to={l.to}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-2.5 rounded-xl hover:bg-secondary"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <span className="block px-3 py-2.5 rounded-xl text-muted-foreground">
                        {l.label}
                      </span>
                    )}
                  </li>
                ))}
                <div className="border-t border-border/60 mt-2 pt-2">
                  {isAuthenticated ? (
                    <>
                      <Link to="/account" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-secondary">
                        <LayoutDashboard className="size-4" /> My Account
                      </Link>
                      <button onClick={() => { handleLogout(); setMobileOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-destructive/10 text-destructive">
                        <LogOut className="size-4" /> Logout
                      </button>
                    </>
                  ) : (
                    <Link to="/auth" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full rounded-full bg-accent text-accent-foreground mt-1">Login / Register</Button>
                    </Link>
                  )}
                  <Link to="/contact-us" onClick={() => setMobileOpen(false)} className="mt-2 block">
                    <Button variant="secondary" className="w-full rounded-full border-accent/20 text-accent">Get a Quote</Button>
                  </Link>
                </div>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
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
