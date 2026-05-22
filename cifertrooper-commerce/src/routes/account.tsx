import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  User, Package, MapPin, LogOut, Edit3, Save, X,
  ShoppingBag, ChevronRight, Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { name: "description", content: "Manage your CiferTrooper account, orders, and profile." },
    ],
  }),
  component: AccountPage,
});

const MOCK_ORDERS = [
  { id: "CT-K8X3M2", date: "2024-03-15", status: "Delivered", total: 3500, items: ["Bluetooth Rubber Ducky", "Lazy Pad Kit"] },
  { id: "CT-P9Z1Q7", date: "2024-02-28", status: "Shipped", total: 5000, items: ["Remote Control Rubber Ducky"] },
  { id: "CT-R4W6N1", date: "2024-01-10", status: "Delivered", total: 2000, items: ["Wi Cap", "Wifi Analyzer"] },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  Shipped: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
  Processing: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  Cancelled: "bg-red-500/10 text-red-600 border border-red-500/20",
};

function AccountPage() {
  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"profile" | "orders" | "addresses">("profile");
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ name: user?.name || "", phone: user?.phone || "" });

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6">
        <div className="size-20 rounded-full bg-muted/30 flex items-center justify-center mb-6">
          <Shield className="size-10 text-muted-foreground/50" />
        </div>
        <h2 className="text-2xl font-display mb-3">Login Required</h2>
        <p className="text-muted-foreground mb-6">You need to be logged in to view your account.</p>
        <Link to="/auth">
          <Button className="rounded-full bg-accent text-accent-foreground px-8">Login / Register</Button>
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    updateProfile(draft);
    setEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4">
      <div className="container-page max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10"
        >
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground text-3xl font-display font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-display">{user?.name}</h1>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="rounded-full flex items-center gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 bg-secondary/40 rounded-2xl p-1.5 mb-8 border border-border/60 w-fit">
          {([
            { id: "profile", label: "Profile", icon: User },
            { id: "orders", label: "Orders", icon: Package },
            { id: "addresses", label: "Addresses", icon: MapPin },
          ] as const).map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                tab === id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {tab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border/60 rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl">Profile Information</h2>
              {!editing ? (
                <Button variant="outline" size="sm" className="rounded-full flex items-center gap-2" onClick={() => setEditing(true)}>
                  <Edit3 className="size-3.5" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="rounded-full" onClick={() => setEditing(false)}>
                    <X className="size-3.5 mr-1" /> Cancel
                  </Button>
                  <Button size="sm" className="rounded-full bg-accent text-accent-foreground" onClick={handleSave}>
                    <Save className="size-3.5 mr-1" /> Save
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Full Name", key: "name", value: draft.name, editable: true },
                { label: "Email Address", key: "email", value: user?.email, editable: false },
                { label: "Phone Number", key: "phone", value: draft.phone || "Not set", editable: true },
                { label: "Member Since", key: "", value: "May 2024", editable: false },
              ].map(({ label, key, value, editable }) => (
                <div key={label}>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1.5">{label}</p>
                  {editing && editable && key ? (
                    <input
                      value={draft[key as keyof typeof draft]}
                      onChange={(e) => setDraft(d => ({ ...d, [key]: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                    />
                  ) : (
                    <p className="text-base font-medium">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {tab === "orders" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {MOCK_ORDERS.length === 0 ? (
              <div className="bg-card border border-border/60 rounded-3xl p-12 text-center">
                <ShoppingBag className="size-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-display text-xl mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
                <Link to="/shop">
                  <Button className="rounded-full bg-accent text-accent-foreground">Browse Shop</Button>
                </Link>
              </div>
            ) : (
              MOCK_ORDERS.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-card border border-border/60 rounded-3xl p-5 hover:border-accent/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono font-bold">{order.id}</span>
                        <span className={cn("text-xs px-2.5 py-0.5 rounded-full font-semibold", STATUS_COLORS[order.status])}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                      <p className="text-xs text-muted-foreground mt-1">Ordered: {order.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-mono font-bold text-lg">₹{order.total.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                      </div>
                      <ChevronRight className="size-5 text-muted-foreground" />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Addresses Tab */}
        {tab === "addresses" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border/60 rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl">Saved Addresses</h2>
              <Button variant="outline" size="sm" className="rounded-full">+ Add Address</Button>
            </div>
            {user?.address ? (
              <div className="p-5 rounded-2xl border-2 border-accent/30 bg-accent/5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold mb-1">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.address.line1}</p>
                    <p className="text-sm text-muted-foreground">{user.address.city}, {user.address.state} - {user.address.pincode}</p>
                  </div>
                  <span className="text-xs bg-accent text-accent-foreground px-2.5 py-1 rounded-full font-bold">Default</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="size-10 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No saved addresses yet.</p>
                <p className="text-sm text-muted-foreground mt-1">Addresses added during checkout will appear here.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
