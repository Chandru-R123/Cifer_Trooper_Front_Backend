import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background border-l border-border/60 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/60">
              <div className="flex items-center gap-3">
                <ShoppingBag className="size-5 text-accent" />
                <h2 className="font-display text-xl font-semibold">
                  Your Cart
                  {totalItems > 0 && (
                    <span className="ml-2 text-sm font-mono text-muted-foreground">({totalItems} items)</span>
                  )}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="size-9 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto py-4 px-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="size-20 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                    <ShoppingBag className="size-8 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Add some gadgets to get started!
                  </p>
                  <Link to="/shop" onClick={onClose}>
                    <Button className="rounded-full bg-accent text-accent-foreground">
                      Browse Shop
                    </Button>
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  <AnimatePresence>
                    {items.map(({ product, quantity }) => (
                      <motion.li
                        key={product.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 p-3 rounded-2xl border border-border/60 bg-secondary/20 hover:bg-secondary/40 transition-colors"
                      >
                        {/* Image */}
                        <Link to={`/product/${product.slug}`} onClick={onClose}>
                          <div className="size-20 shrink-0 rounded-xl overflow-hidden bg-muted/40">
                            <img src={product.image} alt={product.name} className="size-full object-cover" />
                          </div>
                        </Link>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${product.slug}`} onClick={onClose}>
                            <h4 className="font-medium text-sm leading-tight hover:text-accent transition-colors line-clamp-2">
                              {product.name}
                            </h4>
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5">{product.category}</p>
                          <div className="flex items-center justify-between mt-2">
                            {/* Qty stepper */}
                            <div className="flex items-center gap-1 bg-background rounded-full border border-border/60 p-0.5">
                              <button
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                className="size-6 flex items-center justify-center rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                              >
                                <Minus className="size-3" />
                              </button>
                              <span className="w-6 text-center text-sm font-mono font-bold">{quantity}</span>
                              <button
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                className="size-6 flex items-center justify-center rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                              >
                                <Plus className="size-3" />
                              </button>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm">
                                ₹{(product.price * quantity).toLocaleString()}
                              </span>
                              <button
                                onClick={() => removeItem(product.id)}
                                className="size-6 flex items-center justify-center rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors text-muted-foreground"
                              >
                                <Trash2 className="size-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-border/60 space-y-4 bg-background">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal ({totalItems} items)</span>
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

                <div className="grid grid-cols-2 gap-3">
                  <Link to="/cart" onClick={onClose}>
                    <Button variant="outline" className="w-full rounded-full">
                      View Cart
                    </Button>
                  </Link>
                  <Link to="/checkout" onClick={onClose}>
                    <Button className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90 flex items-center gap-1">
                      Checkout
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
