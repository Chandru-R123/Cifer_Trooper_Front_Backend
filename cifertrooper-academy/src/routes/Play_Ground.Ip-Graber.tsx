import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Terminal, Shield, List, RefreshCw, Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const Route = createFileRoute('/Play_Ground/Ip-Graber')({
  component: IpGrabber,
})

const sampleData = [
  {
    id: '1',
    ip: '192.168.1.1',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ...',
    timestamp: '2026-05-06 14:20:01',
    location: 'Chennai, TN, IN',
    link: 'cifer-token-x1',
  },
  {
    id: '2',
    ip: '103.44.52.12',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) ...',
    timestamp: '2026-05-06 14:18:45',
    location: 'Mumbai, MH, IN',
    link: 'cifer-token-x1',
  },
  {
    id: '3',
    ip: '45.12.145.8',
    userAgent: 'Mozilla/5.0 (Linux; Android 12; Pixel 6) ...',
    timestamp: '2026-05-06 14:15:22',
    location: 'New York, NY, US',
    link: 'tracker-alpha',
  },
  {
    id: '4',
    ip: '8.8.4.4',
    userAgent: 'Googlebot/2.1 (+http://www.google.com/bot.html)',
    timestamp: '2026-05-06 14:10:10',
    location: 'Mountain View, CA, US',
    link: 'tracker-alpha',
  },
]

/*
  BACKEND REQUIREMENTS:
  ---------------------
  Endpoint: GET /api/tools/ip-grabber/logs
  Purpose: Fetch list of all captured IP logs.
  
  Expected Response Schema:
  {
    "logs": [
      {
        "id": string,
        "ip": string,
        "userAgent": string,
        "timestamp": string,
        "location": string,
        "link": string
      }
    ]
  }

  Endpoint: POST /api/tools/ip-grabber/create-link
  Purpose: Create a new tracking link.
  Payload: { "title": string, "redirectUrl": string }
*/

function IpGrabber() {
  const [logs, setLogs] = useState(sampleData);

  /*
  // --- API MODE ---
  // Uncomment this block when the backend endpoint is ready
  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await fetch('/api/tools/ip-grabber/logs');
        const data = await response.json();
        if (data && data.logs) {
          setLogs(data.logs);
        }
      } catch (err) {
        console.error("API Error, falling back to static/mock data:", err);
      }
    }
    fetchLogs();
  }, []);
  */

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                <Shield className="size-6 text-accent" />
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                IP <span className="text-accent">Grabber</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Monitor and manage your active tracking links. View real-time logs of captured interactions.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl border-border/60">
              <RefreshCw className="size-4 mr-2" />
              Refresh
            </Button>
            <Button className="rounded-xl px-6">
              Create New Link
            </Button>
          </div>
        </motion.div>

        <Card className="border-border/60 bg-background/50 backdrop-blur-xl shadow-xl overflow-hidden">
          <CardHeader className="border-b border-border/60 bg-secondary/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Captured Logs</CardTitle>
                <CardDescription>Real-time data from your active tracking links.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Download className="size-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-border/60">
                    <TableHead className="w-[150px]">IP Address</TableHead>
                    <TableHead className="w-[180px]">Location</TableHead>
                    <TableHead>User Agent</TableHead>
                    <TableHead className="w-[120px]">Link Token</TableHead>
                    <TableHead className="text-right w-[180px]">Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id} className="border-border/40 hover:bg-secondary/20 transition-colors">
                      <TableCell className="font-mono font-medium text-accent">
                        {log.ip}
                      </TableCell>
                      <TableCell>{log.location}</TableCell>
                      <TableCell className="max-w-[300px] truncate text-muted-foreground text-xs font-mono">
                        {log.userAgent}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-secondary text-secondary-foreground border border-border/60">
                          {log.link}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground tabular-nums">
                        {log.timestamp}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Total Hits" value="1,284" subValue="+12% from yesterday" />
          <StatsCard title="Active Links" value="12" subValue="3 created this week" />
          <StatsCard title="Unique IPs" value="856" subValue="Across 42 countries" />
        </div>
      </div>
    </div>
  )
}

function StatsCard({ title, value, subValue }: { title: string; value: string; subValue: string }) {
  return (
    <Card className="border-border/40 bg-secondary/10">
      <CardContent className="pt-6">
        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
        <p className="text-3xl font-display font-bold">{value}</p>
        <p className="text-xs text-muted-foreground mt-1">{subValue}</p>
      </CardContent>
    </Card>
  )
}
