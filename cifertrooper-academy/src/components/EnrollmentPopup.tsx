import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { submitLead } from "@/lib/api";

interface EnrollmentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
}

export function EnrollmentPopup({ isOpen, onClose, courseTitle }: EnrollmentPopupProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    if (!isOpen) {
      setStatus("idle");
      setFormData({ name: "", phone: "", email: "", city: "" });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        courseInterest: courseTitle,
        message: formData.city ? `City: ${formData.city}` : undefined,
      });
      setStatus("success");
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 p-4 md:p-6"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl">
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <X className="size-5" />
              </button>

              {status === "success" ? (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="mb-6 rounded-full bg-accent/10 p-4 text-accent">
                    <CheckCircle2 className="size-12" />
                  </div>
                  <h3 className="mb-2 text-2xl font-display">Enrollment Received!</h3>
                  <p className="text-muted-foreground">
                    Thank you for your interest in {courseTitle || "our courses"}. 
                    Our team will contact you shortly with the details.
                  </p>
                  <Button className="mt-8 rounded-full px-8" onClick={onClose}>
                    Close
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-display mb-2">Enroll Now</h3>
                    <p className="text-muted-foreground text-sm">
                      Fill in your details to get started with <span className="text-accent font-medium">{courseTitle || "the course"}</span>.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        required
                        placeholder="e.g. John Doe"
                        className="rounded-xl"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <Input
                          required
                          type="tel"
                          placeholder="10-digit number"
                          pattern="[0-9]{10}"
                          className="rounded-xl"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your City</label>
                        <Input
                          required
                          placeholder="e.g. Coimbatore"
                          className="rounded-xl"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <Input
                        required
                        type="email"
                        placeholder="john@example.com"
                        className="rounded-xl"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full mt-6 rounded-xl h-12 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="size-4 animate-spin" />
                          Submitting...
                        </span>
                      ) : (
                        "Submit Enrollment"
                      )}
                    </Button>

                    {status === "error" && (
                      <div className="flex items-center gap-2 mt-4 text-destructive text-sm">
                        <AlertCircle className="size-4" />
                        <span>Something went wrong. Please try again.</span>
                      </div>
                    )}
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
