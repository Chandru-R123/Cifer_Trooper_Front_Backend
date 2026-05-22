import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, CreditCard, Smartphone, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiPost } from "@/lib/api";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { name: "description", content: "Complete your order securely." },
    ],
  }),
  component: CheckoutPage,
});

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi",
];

function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "cod">("upi");
  const [loading, setLoading] = useState(false);
  const [billing, setBilling] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address?.line1 || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "Tamil Nadu",
    pincode: user?.address?.pincode || "",
  });

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-display mb-4">Your cart is empty</h2>
        <Link to="/shop"><Button className="rounded-full bg-accent text-accent-foreground">Browse Shop</Button></Link>
      </div>
    );
  }

  const set = (key: keyof typeof billing) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setBilling((b) => ({ ...b, [key]: e.target.value }));

  const handlePlaceOrder = async () => {
    setLoading(true);

    // DUAL MODE: Submit order to backend (uncomment when backend is ready)
    /*
    await apiPost("/api/commerce/checkout", {
      items: items.map(i => ({ productId: i.product.id, quantity: i.quantity })),
      billing,
      paymentMethod,
    });
    */

    // Static: simulate order processing
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    navigate({ to: "/order-success" });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4">
      <div className="container-page max-w-6xl">
        {/* Header */}
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group mb-8">
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-display mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Billing Details */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border/60 rounded-3xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl mb-6 flex items-center gap-2">
                <span className="size-7 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
                Billing Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CheckoutInput label="Full Name" value={billing.name} onChange={set("name")} required />
                <CheckoutInput label="Email Address" type="email" value={billing.email} onChange={set("email")} required />
                <CheckoutInput label="Phone Number" type="tel" value={billing.phone} onChange={set("phone")} placeholder="+91 XXXXX XXXXX" required />
                <div>
                  <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">State</label>
                  <select
                    value={billing.state}
                    onChange={set("state")}
                    className="w-full px-4 py-3 rounded-2xl border border-border/60 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                  >
                    {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <CheckoutInput label="Street Address" value={billing.address} onChange={set("address")} placeholder="House number, Street name" required className="md:col-span-2" />
                <CheckoutInput label="City / Town" value={billing.city} onChange={set("city")} required />
                <CheckoutInput label="PIN Code" value={billing.pincode} onChange={set("pincode")} pattern="[0-9]{6}" placeholder="641XXX" required />
              </div>
            </motion.section>

            {/* Payment */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border/60 rounded-3xl p-6 md:p-8"
            >
              <h2 className="font-display text-xl mb-6 flex items-center gap-2">
                <span className="size-7 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
                Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: "upi", label: "UPI / Online", desc: "Pay via UPI, Cards, or Net Banking", icon: Smartphone },
                  { id: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives", icon: Package },
                ].map(({ id, label, desc, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setPaymentMethod(id as any)}
                    className={cn(
                      "flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all",
                      paymentMethod === id
                        ? "border-accent bg-accent/5"
                        : "border-border/60 hover:border-accent/40"
                    )}
                  >
                    <div className={cn("size-10 rounded-xl flex items-center justify-center shrink-0", paymentMethod === id ? "bg-accent text-accent-foreground" : "bg-secondary")}>
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
                    </div>
                    <div className={cn("size-5 rounded-full border-2 ml-auto mt-0.5 shrink-0 flex items-center justify-center", paymentMethod === id ? "border-accent" : "border-border")}>
                      {paymentMethod === id && <div className="size-2.5 rounded-full bg-accent" />}
                    </div>
                  </button>
                ))}
              </div>

              {paymentMethod === "upi" && (
                <div className="mt-4 p-4 rounded-2xl bg-secondary/30 border border-border/40 text-sm text-muted-foreground">
                  <CreditCard className="size-4 inline mr-2 text-accent" />
                  You'll be redirected to the payment gateway after placing your order.
                </div>
              )}
            </motion.section>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-card border border-border/60 rounded-3xl p-6 sticky top-24"
            >
              <h2 className="font-display text-xl mb-5 flex items-center gap-2">
                <span className="size-7 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">3</span>
                Order Review
              </h2>

              <ul className="space-y-3 mb-5 max-h-64 overflow-y-auto">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex gap-3 items-center">
                    <div className="size-12 rounded-xl overflow-hidden bg-muted/30 shrink-0">
                      <img src={product.image} alt={product.name} className="size-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-tight line-clamp-1">{product.name}</p>
                      <p className="text-xs text-muted-foreground">×{quantity}</p>
                    </div>
                    <span className="font-mono text-sm font-bold shrink-0">
                      ₹{(product.price * quantity).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2 pt-4 border-t border-border/60 mb-5">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border/40">
                  <span>Total</span>
                  <span className="font-mono text-accent">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <Button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full h-12 rounded-full bg-accent text-accent-foreground font-bold hover:bg-accent/90 flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
              >
                {loading ? (
                  <span className="size-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                ) : (
                  <>
                    <Shield className="size-4" />
                    Place Order
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                🔒 Your payment information is encrypted and secure.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutInput({
  label, className, ...props
}: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className="text-sm font-semibold text-muted-foreground mb-1.5 block">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-2xl border border-border/60 bg-background text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/50 transition-all placeholder:text-muted-foreground/60"
      />
    </div>
  );
}
