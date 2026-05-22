import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ShoppingBag, Tag, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { name: "description", content: "Review your cart and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const shipping = 0; // Free shipping
  const discount = couponApplied ? Math.round(totalPrice * 0.1) : 0;
  const finalTotal = totalPrice - discount + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="size-28 rounded-full bg-muted/30 flex items-center justify-center mb-6"
        >
          <ShoppingBag className="size-12 text-muted-foreground/40" />
        </motion.div>
        <h1 className="text-3xl font-display mb-3">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-sm">
          Looks like you haven't added anything yet. Explore our gadgets and kits.
        </p>
        <Link to="/shop">
          <Button className="rounded-full bg-accent text-accent-foreground px-8">
            Browse Shop
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4">
      <div className="container-page max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group mb-3">
              <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
              Continue Shopping
            </Link>
            <h1 className="text-4xl font-display">
              Shopping Cart
              <span className="ml-3 text-xl text-muted-foreground font-normal font-mono">({totalItems})</span>
            </h1>
          </div>
          <button onClick={clearCart} className="text-sm text-destructive hover:text-destructive/80 transition-colors">
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map(({ product, quantity }, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex gap-5 p-5 rounded-3xl border border-border/60 bg-card hover:border-accent/30 transition-colors"
                >
                  <Link to={`/product/${product.slug}`}>
                    <div className="size-24 md:size-32 shrink-0 rounded-2xl overflow-hidden bg-muted/30">
                      <img src={product.image} alt={product.name} className="size-full object-cover" />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        <Link to={`/product/${product.slug}`}>
                          <h3 className="font-display text-lg leading-tight hover:text-accent transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-muted-foreground mt-0.5">{product.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="size-8 flex items-center justify-center rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors text-muted-foreground shrink-0"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-1.5 bg-background rounded-full border border-border/60 p-1">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="size-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center font-mono font-bold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="size-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-mono font-bold text-lg">
                          ₹{(product.price * quantity).toLocaleString()}
                        </div>
                        {quantity > 1 && (
                          <div className="text-xs text-muted-foreground">
                            ₹{product.price.toLocaleString()} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl border border-border/60 bg-card p-6 sticky top-24"
            >
              <h2 className="font-display text-2xl mb-6">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-6 p-4 rounded-2xl bg-secondary/30 border border-border/40">
                <label className="text-sm font-semibold mb-2 block flex items-center gap-2">
                  <Tag className="size-4 text-accent" />
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="CYBER10"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 text-sm rounded-xl border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                  <Button
                    size="sm"
                    variant={couponApplied ? "destructive" : "secondary"}
                    className="rounded-xl shrink-0"
                    onClick={() => {
                      if (couponApplied) {
                        setCouponApplied(false);
                        setCoupon("");
                      } else if (coupon) {
                        setCouponApplied(true);
                      }
                    }}
                  >
                    {couponApplied ? "Remove" : "Apply"}
                  </Button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-emerald-600 mt-2">✓ 10% discount applied!</p>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono">₹{totalPrice.toLocaleString()}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-sm text-emerald-600">
                    <span>Discount (10%)</span>
                    <span className="font-mono">-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="pt-3 border-t border-border/60">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span className="font-mono text-accent">₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full rounded-full h-12 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90 flex items-center justify-center gap-2 shadow-lg shadow-accent/20">
                  Proceed to Checkout
                  <ArrowRight className="size-4" />
                </Button>
              </Link>

              <p className="text-xs text-muted-foreground text-center mt-4">
                🔒 Secure checkout · Free shipping on all orders
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
