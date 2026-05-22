import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { COMMERCE_DATA, Product } from "@/lib/commerce-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowLeft, ShieldCheck, Zap, Package, RefreshCw, Check, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/product/$slug")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = useParams({ from: "/product/$slug" });
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  useEffect(() => {
    // DUAL MODE: API Fetching
    /*
    apiGet<Product>(`/api/commerce/products/${slug}`)
      .then((res) => {
        setProduct(res);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to fetch product details:", err);
        // Fallback to local data
        const local = COMMERCE_DATA.find(p => p.slug === slug);
        setProduct(local || null);
        setIsLoaded(true);
      });
    */

    // Static fallback
    const local = COMMERCE_DATA.find(p => p.slug === slug);
    setProduct(local || null);
    setIsLoaded(true);
  }, [slug]);

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-display mb-4">Product not found</h2>
        <Link to="/shop">
          <Button variant="outline" className="rounded-full">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-24 pb-20">
      <div className="container-page px-6">
        {/* Breadcrumbs / Back Link */}
        <Link to="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group">
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Shop</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted/30 border border-border/60">
              <img 
                src={product.image} 
                alt={product.name}
                className="size-full object-cover"
              />
              <div className="absolute top-6 right-6">
                <Badge className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full shadow-lg text-[10px] tracking-widest uppercase font-bold">
                  {product.category}
                </Badge>
              </div>
            </div>
            
            {/* Mock Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className={cn(
                   "aspect-square rounded-2xl overflow-hidden border transition-all cursor-pointer",
                   i === 1 ? "border-accent ring-2 ring-accent/20" : "border-border/60 hover:border-accent/40"
                 )}>
                   <img src={product.image} className={cn("size-full object-cover", i !== 1 && "opacity-60 grayscale-[50%]")} alt="Thumbnail" />
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-display leading-tight mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="size-4 text-emerald-500" />
                  <span>Quality Assured</span>
                </div>
                <div className="size-1 rounded-full bg-border" />
                <div className="flex items-center gap-1.5">
                  <Zap className="size-4 text-amber-500" />
                  <span>In Stock</span>
                </div>
              </div>
              <div className="text-4xl font-mono font-medium">₹{product.price.toLocaleString()}</div>
            </div>

            <div className="space-y-8 mb-10">
              <div>
                <h4 className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-3">Description</h4>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {product.description} This {product.category.toLowerCase().slice(0, -1)} has been meticulously designed for the modern security researcher. 
                  Featuring high-quality components and a robust interface, it stands as a reliable tool in your offensive security toolkit.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 rounded-2xl border border-border/60 bg-secondary/20">
                   <Package className="size-5 mb-2 text-accent" />
                   <h5 className="font-medium text-sm">Discreet Packaging</h5>
                   <p className="text-xs text-muted-foreground">Ships in plain, secure box</p>
                 </div>
                 <div className="p-4 rounded-2xl border border-border/60 bg-secondary/20">
                   <RefreshCw className="size-5 mb-2 text-accent" />
                   <h5 className="font-medium text-sm">Tech Support</h5>
                   <p className="text-xs text-muted-foreground">Lifetime community access</p>
                 </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <div className="flex items-center gap-1 bg-secondary/50 rounded-full p-1 border border-border/60">
                 <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="size-10 flex items-center justify-center rounded-full hover:bg-background transition-colors"
                 >—</button>
                 <span className="w-12 text-center font-mono font-bold text-lg">{quantity}</span>
                 <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="size-10 flex items-center justify-center rounded-full hover:bg-background transition-colors"
                 >+</button>
              </div>
              <Button
                id="product-add-to-cart-btn"
                onClick={handleAddToCart}
                className={cn(
                  "flex-1 rounded-full h-12 text-lg font-bold transition-all shadow-xl",
                  added
                    ? "bg-emerald-500 hover:bg-emerald-500 text-white shadow-emerald-500/20"
                    : "bg-accent text-accent-foreground hover:scale-[1.02] shadow-accent/20"
                )}
              >
                {added ? (
                  <>
                    <Check className="size-5 mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-5 mr-2" />
                    Add to Cart — ₹{(product.price * quantity).toLocaleString()}
                  </>
                )}
              </Button>
            </div>
            {added && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-3 flex items-center justify-center"
              >
                <Link to="/cart" className="text-sm text-accent underline underline-offset-4 hover:text-accent/80 transition-colors">
                  View Cart →
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Technical Specs Mockup */}
        <section className="mt-24 pt-20 border-t border-border/60">
          <h2 className="text-3xl font-display mb-12">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
            {[
              { label: "Connectivity", value: product.name.includes("WIFI") ? "WiFi 802.11 b/g/n" : "Bluetooth 5.0 / USB-C" },
              { label: "Processor", value: "High-performance ESP32-S2" },
              { label: "Storage", value: "16MB Internal Flash + MicroSD Slot" },
              { label: "Battery", value: "3.7V 500mAh Li-Po (Integrated)" },
              { label: "Material", value: "ABS Industrial Grade Polymer" },
              { label: "Dimensions", value: "65mm x 45mm x 25mm" }
            ].map((spec) => (
              <div key={spec.label} className="border-b border-border/40 pb-4">
                <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">{spec.label}</div>
                <div className="text-lg font-medium">{spec.value}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
