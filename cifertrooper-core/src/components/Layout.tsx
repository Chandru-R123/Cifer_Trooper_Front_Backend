import { motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useLocation } from "@tanstack/react-router";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isPlayGroundTool = location.pathname.includes("/Play_Ground/");

  return (
    <div className="min-h-screen flex flex-col">
      {!isPlayGroundTool && <Header />}
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex-1"
      >
        {children}
      </motion.main>
      {!isPlayGroundTool && <Footer />}
    </div>
  );
}
