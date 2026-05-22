import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { COMMERCE_DATA, Product } from "@/lib/commerce-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, LayoutGrid, List, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      cat: (search.cat as string) || "All",
    };
  },
  head: () => ({
    meta: [
      { name: "description", content: "Explore our collection of professional security tools, gadgets, and DIY kits for penetration testing and network auditing." }
    ]
  }),
  component: ShopPage,
});

function ShopPage() {
  const { cat } = Route.useSearch();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(COMMERCE_DATA);
  const [selectedCategory, setSelectedCategory] = useState<string>(cat);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSelectedCategory(cat);
  }, [cat]);

  useEffect(() => {
    // Simulate loading for static fallback
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Gadgets", "Kits"];
  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="size-10 border-4 border-accent border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-24 pb-20 px-6">
      <div className="container-page">
        {/* Header Section */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display tracking-tight mb-4"
          >
            The <span className="text-accent italic font-medium underline decoration-accent/30 underline-offset-8">Arsenal</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl"
          >
            Professional-grade hardware for security researchers and hardware hackers. 
            Engineered for precision, reliability, and impact.
          </motion.p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-secondary/30 p-4 rounded-3xl border border-border/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => navigate({ search: (prev: any) => ({ ...prev, cat: c }) })}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                  selectedCategory === c 
                    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20" 
                    : "hover:bg-accent/10 text-muted-foreground"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-1 bg-background/50 rounded-full p-1 border border-border/60">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-full transition-all",
                  viewMode === "grid" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-full transition-all",
                  viewMode === "list" ? "bg-accent text-accent-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="size-4" />
              </button>
            </div>
            
            <Badge variant="outline" className="ml-auto md:ml-0 bg-background/50 border-border/60 text-muted-foreground font-mono">
              {filteredProducts.length} ITEMS
            </Badge>
          </div>
        </div>

        {/* Products Grid */}
        <div className={cn(
          "grid gap-8",
          viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        )}>
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <ProductCard product={product} viewMode={viewMode} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, viewMode }: { product: Product; viewMode: "grid" | "list" }) {
  const isGrid = viewMode === "grid";
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <Link 
      to={`/product/${product.slug}`}
      className={cn(
        "group relative overflow-hidden bg-card border border-border/60 hover:border-accent/40 transition-all duration-500",
        isGrid ? "rounded-3xl flex flex-col" : "rounded-2xl flex flex-row items-center p-4 gap-6"
      )}
    >
      {/* Image Container */}
      <div className={cn(
        "relative overflow-hidden bg-muted/30",
        isGrid ? "aspect-[4/3] w-full" : "size-24 md:size-32 rounded-xl shrink-0"
      )}>
        <img 
          src={product.image} 
          alt={product.name}
          className="size-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {isGrid && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none text-[10px] tracking-widest uppercase font-bold px-3 py-1">
              {product.category}
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className={cn(
        "p-6 flex flex-col grow",
        !isGrid && "p-0"
      )}>
        <div className="mb-4">
          <h3 className="font-display text-xl leading-tight group-hover:text-accent transition-colors mb-2">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Price</span>
            <span className="text-2xl font-mono font-medium">
              ₹{product.price.toLocaleString()}
            </span>
          </div>

          <Button
            id={`add-to-cart-${product.id}`}
            size="icon"
            onClick={handleAddToCart}
            className={cn(
              "rounded-full transition-all shrink-0",
              added
                ? "bg-emerald-500 text-white hover:bg-emerald-500 scale-110"
                : "bg-secondary text-foreground group-hover:bg-accent group-hover:text-accent-foreground"
            )}
          >
            {added ? <Check className="size-4" /> : <ShoppingBag className="size-4" />}
          </Button>
        </div>
      </div>
    </Link>
  );
}
