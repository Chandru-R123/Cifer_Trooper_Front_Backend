import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/order-success")({
  head: () => ({
    meta: [
      { name: "description", content: "Your order has been placed successfully." },
    ],
  }),
  component: OrderSuccessPage,
});

function OrderSuccessPage() {
  const [orderId] = useState(() => `CT-${Date.now().toString(36).toUpperCase()}`);
  const [particles] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.8,
      size: Math.random() * 8 + 4,
      color: ["#4241FF", "#22c55e", "#f59e0b", "#ec4899", "#06b6d4"][Math.floor(Math.random() * 5)],
    }))
  );

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 pt-24 pb-20 relative overflow-hidden">
      {/* Confetti particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: "-20px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [1, 1, 0],
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: p.delay,
            ease: "easeIn",
          }}
        />
      ))}

      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="size-28 mx-auto mb-6 rounded-full bg-emerald-500/10 border-4 border-emerald-500/30 flex items-center justify-center"
        >
          <CheckCircle2 className="size-14 text-emerald-500" />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-5xl font-display mb-3">
            Order Placed! 🎉
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Thank you for your order. We've received your payment and are preparing your package.
          </p>
          <div className="inline-flex items-center gap-2 bg-secondary/50 border border-border/60 rounded-full px-5 py-2 mt-1 mb-8">
            <Package className="size-4 text-accent" />
            <span className="font-mono font-bold text-sm">Order ID: {orderId}</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border/60 rounded-3xl p-6 mb-8 text-left"
        >
          <h2 className="font-display text-lg mb-4">What happens next?</h2>
          <div className="space-y-4">
            {[
              { step: "1", label: "Confirmation Email", desc: "You'll receive an order confirmation at your email.", done: true },
              { step: "2", label: "Processing", desc: "Our team is preparing your hardware kit.", done: false },
              { step: "3", label: "Shipping", desc: "Estimated delivery: 3–7 business days.", done: false },
              { step: "4", label: "Delivery", desc: "Your package will arrive in discreet packaging.", done: false },
            ].map(({ step, label, desc, done }, i) => (
              <div key={step} className="flex gap-4">
                <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 ${done ? "bg-emerald-500 text-white" : "bg-secondary text-muted-foreground"}`}>
                  {done ? "✓" : step}
                </div>
                <div>
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/account">
            <Button variant="outline" className="rounded-full px-8 w-full sm:w-auto flex items-center gap-2">
              <Package className="size-4" />
              Track Order
            </Button>
          </Link>
          <Link to="/shop">
            <Button className="rounded-full bg-accent text-accent-foreground px-8 w-full sm:w-auto flex items-center gap-2">
              <ShoppingBag className="size-4" />
              Continue Shopping
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
