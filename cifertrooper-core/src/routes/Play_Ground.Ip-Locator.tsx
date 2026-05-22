import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Globe, Shield, Cpu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const Route = createFileRoute("/Play_Ground/Ip-Locator")({
  component: IpLocator,
});

interface IpLookupResult {
  ip: string;
  location: string;
  isp: string;
  timezone: string;
  coordinates: string;
  as: string;
}

function IpLocator() {
  const [ip, setIp] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<IpLookupResult | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ip) return;

    setLoading(true);

    /*
    // --- API MODE ---
    // Uncomment this block when the backend endpoint is ready
    try {
      const response = await fetch(`/api/tools/ip-lookup?ip=${ip}`);
      if (!response.ok) throw new Error('Lookup failed');
      const data = await response.ok ? await response.json() : null;
      if (data) {
        setResult(data);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.error("API Error, falling back to static/mock data:", err);
    }
    */

    // --- STATIC MODE (Default) ---
    // Placeholder for actual backend fetch
    setTimeout(() => {
      setResult({
        ip: ip || "8.8.8.8",
        location: "Mountain View, California, US",
        isp: "Google LLC",
        timezone: "UTC -07:00",
        coordinates: "37.4223, -122.0841",
        as: "AS15169 Google LLC",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container-page max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            IP <span className="text-accent">Locator</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Retrieve detailed geographical and network information for any IP address globally.
          </p>
        </motion.div>

        <Card className="border-border/60 bg-background/50 backdrop-blur-xl shadow-xl mb-8">
          <CardHeader>
            <CardTitle>Lookup IP Address</CardTitle>
            <CardDescription>Enter an IPv4 or IPv6 address to start the trace.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLookup} className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="e.g. 8.8.8.8"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  className="pl-10 h-12 rounded-xl bg-background/50"
                />
              </div>
              <Button type="submit" disabled={loading} size="lg" className="rounded-xl px-8">
                {loading ? (
                  <Zap className="size-4 animate-pulse mr-2" />
                ) : (
                  <MapPin className="size-4 mr-2" />
                )}
                {loading ? "Locating..." : "Locate IP"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <ResultCard
              icon={<Globe className="size-5 text-blue-500" />}
              label="IP Address"
              value={result.ip}
            />
            <ResultCard
              icon={<MapPin className="size-5 text-red-500" />}
              label="Location"
              value={result.location}
            />
            <ResultCard
              icon={<Shield className="size-5 text-green-500" />}
              label="ISP"
              value={result.isp}
            />
            <ResultCard
              icon={<Zap className="size-5 text-yellow-500" />}
              label="Timezone"
              value={result.timezone}
            />
            <ResultCard
              icon={<Cpu className="size-5 text-purple-500" />}
              label="AS Info"
              value={result.as}
            />
            <ResultCard
              icon={<MapPin className="size-5 text-orange-500" />}
              label="Coordinates"
              value={result.coordinates}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ResultCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="border-border/40 bg-secondary/20 hover:bg-secondary/30 transition-colors">
      <CardContent className="pt-6 flex items-start gap-4">
        <div className="p-2.5 rounded-lg bg-background shadow-sm border border-border/40">
          {icon}
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-lg font-semibold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
