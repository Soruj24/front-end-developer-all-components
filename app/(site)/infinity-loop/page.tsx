"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import {
  RefreshCw,
  RotateCcw,
  Activity,
  Zap,
  Wifi,
  Music,
  Timer,
  TrendingUp,
  Loader,
  Loader2,
  Repeat,
  GitBranch,
  Workflow,
  BarChart3,
} from "lucide-react";

function LoadingSpinnerDemo() {
  const [speed, setSpeed] = useState(1);
  const speeds = [
    { label: "Slow", value: 0.3 },
    { label: "Normal", value: 1 },
    { label: "Fast", value: 2 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {speeds.map((s) => (
          <button
            key={s.label}
            onClick={() => setSpeed(s.value)}
            className={`px-3 py-1 text-sm rounded-md border transition-colors ${
              speed === s.value
                ? "bg-primary text-primary-foreground"
                : "bg-background hover:bg-muted"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center h-32 border rounded-lg">
        <Loader2
          className="w-8 h-8 text-primary"
          style={{ animationDuration: `${2 / speed}s` }}
        />
      </div>
    </div>
  );
}

function DataFlowDemo() {
  const [dataPoints, setDataPoints] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const next = [...prev, Math.random() * 100];
        return next.length > 20 ? next.slice(-20) : next;
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Activity className="w-4 h-4" />
        <span>Live data stream</span>
        <Badge variant="secondary">{dataPoints.length} points</Badge>
      </div>
      <div className="h-32 border rounded-lg p-2 overflow-hidden">
        <svg viewBox="0 0 200 50" className="w-full h-full">
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
            points={dataPoints
              .map((p, i) => `${(i / 20) * 200},${50 - (p / 100) * 50}`)
              .join(" ")}
          />
        </svg>
      </div>
    </div>
  );
}

function ProcessCycleDemo() {
  const steps = [
    { icon: RefreshCw, label: "Init" },
    { icon: Loader2, label: "Process" },
    { icon: Zap, label: "Execute" },
    { icon: RotateCcw, label: "Reset" },
  ];
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {steps.map((step, i) => (
          <div key={step.label} className="flex flex-col items-center gap-2">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                i === activeStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <step.icon className="w-5 h-5" />
            </div>
            <span className="text-xs">{step.label}</span>
          </div>
        ))}
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

function ConnectionStatusDemo() {
  const [ping, setPing] = useState(45);
  const [status, setStatus] = useState<"connected" | "reconnecting">("connected");

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 100) + 20);
      setStatus(Math.random() > 0.1 ? "connected" : "reconnecting");
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${
          status === "connected" ? "bg-green-500" : "bg-yellow-500 animate-pulse"
        }`} />
        <span className="text-sm capitalize">{status}</span>
        <Badge variant="outline">{ping}ms</Badge>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${Math.min(100, (1 / ping) * 1000)}%` }}
        />
      </div>
    </div>
  );
}

function SyncStatusDemo() {
  const [progress, setProgress] = useState(0);
  const [syncing, setSyncing] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setSyncing(false);
          setTimeout(() => {
            setSyncing(true);
            setProgress(0);
          }, 1000);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm">
        {syncing ? (
          <RefreshCw className="w-4 h-4 animate-spin text-primary" />
        ) : (
          <Wifi className="w-4 h-4 text-green-500" />
        )}
        <span>{syncing ? "Syncing..." : "Sync complete"}</span>
        <Badge variant={syncing ? "secondary" : "default"}>
          {progress}%
        </Badge>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function MusicLoopDemo() {
  const [playing, setPlaying] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const interval = setInterval(() => {
      setLoopCount((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [playing]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPlaying(!playing)}
          className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
        >
          {playing ? (
            <Music className="w-5 h-5" />
          ) : (
            <Repeat className="w-5 h-5" />
          )}
        </button>
        <div className="flex-1">
          <div className="text-sm font-medium">Loop Track</div>
          <div className="text-xs text-muted-foreground">
            Repeat {loopCount} times
          </div>
        </div>
        <Repeat className={`w-4 h-4 ${playing ? "text-primary animate-spin" : "text-muted-foreground"}`} />
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary"
          style={{
            width: playing ? "100%" : "0%",
            transition: playing ? "width 3s linear" : "none",
          }}
        />
      </div>
    </div>
  );
}

function PerformanceMeterDemo() {
  const [metrics, setMetrics] = useState({ cpu: 45, memory: 62, network: 28 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.min(100, Math.max(0, metrics.cpu + (Math.random() - 0.5) * 20)),
        memory: Math.min(100, Math.max(0, metrics.memory + (Math.random() - 0.5) * 10)),
        network: Math.min(100, Math.max(0, metrics.network + (Math.random() - 0.5) * 30)),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [metrics]);

  const items = [
    { label: "CPU", value: metrics.cpu, icon: BarChart3 },
    { label: "Memory", value: metrics.memory, icon: Activity },
    { label: "Network", value: metrics.network, icon: Wifi },
  ];

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <item.icon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm w-16">{item.label}</span>
          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                item.value > 80 ? "bg-red-500" : item.value > 50 ? "bg-yellow-500" : "bg-green-500"
              }`}
              style={{ width: `${item.value}%` }}
            />
          </div>
          <span className="text-sm w-12 text-right">{Math.round(item.value)}%</span>
        </div>
      ))}
    </div>
  );
}

const installCommand = `npx shadcn@latest add infinity-loop`;

const usageCode = `import { InfinityLoop } from "@/components/infinity-loop";

export function Example() {
  return (
    <InfinityLoop
      speed={20}
      color="#3b82f6"
      className="w-full h-32"
    />
  );
}`;

export default function InfinityLoopPage() {
  const demos = [
    { title: "Loading Spinner", component: LoadingSpinnerDemo },
    { title: "Data Flow", component: DataFlowDemo },
    { title: "Process Cycle", component: ProcessCycleDemo },
    { title: "Connection Status", component: ConnectionStatusDemo },
    { title: "Sync Status", component: SyncStatusDemo },
    { title: "Music Loop", component: MusicLoopDemo },
    { title: "Performance Meter", component: PerformanceMeterDemo },
  ];

  return (
    <div className="container max-w-4xl py-12 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Infinity Loop</h1>
        <p className="text-lg text-muted-foreground">
          A collection of continuous animation patterns for loading states,
          real-time data, and process indicators.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <div className="bg-muted p-4 rounded-lg font-mono text-sm">
          {installCommand}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <pre className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
          {usageCode}
        </pre>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <div className="grid gap-6">
          {demos.map((demo) => (
            <div key={demo.title} className="border rounded-lg p-6 space-y-4">
              <h3 className="font-medium">{demo.title}</h3>
              <demo.component />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted">
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono text-sm">speed</td>
                <td className="p-3">number</td>
                <td className="p-3">20</td>
                <td className="p-3">Animation speed in milliseconds</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-sm">color</td>
                <td className="p-3">string</td>
                <td className="p-3">#3b82f6</td>
                <td className="p-3">Color of the loop animation</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-sm">className</td>
                <td className="p-3">string</td>
                <td className="p-3">-</td>
                <td className="p-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
