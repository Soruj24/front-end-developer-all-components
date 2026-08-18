"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Skull,
  AlertTriangle,
  AlertCircle,
  Shield,
  ShieldOff,
  Flame,
  Zap,
} from "lucide-react";

const installCommand = `npx component-library@latest add skull-danger`;

const usageCode = `import { DangerAlert } from "@/components/ui";

<DangerAlert message="Warning: Dangerous operation" />`;

function DangerAlertDemo() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return <p className="text-sm text-muted-foreground">Alert dismissed</p>;
  return (
    <div className="flex w-full items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30">
      <Skull className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
      <div className="flex-1">
        <p className="text-sm font-medium text-red-800 dark:text-red-200">Critical Error</p>
        <p className="mt-1 text-sm text-red-700 dark:text-red-300">System failure detected. Immediate action required.</p>
      </div>
      <button onClick={() => setDismissed(true)} className="text-red-600 hover:text-red-800">
        <AlertCircle className="h-4 w-4" />
      </button>
    </div>
  );
}

function WarningBadgeDemo() {
  const [level, setLevel] = useState<"low" | "medium" | "high" | "critical">("medium");
  const colors = {
    low: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
    medium: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    high: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    critical: "bg-red-600 text-white",
  };
  return (
    <div className="flex flex-col gap-2">
      <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${colors[level]}`}>
        <AlertTriangle className="h-3 w-3" />
        Risk Level: {level.toUpperCase()}
      </div>
      <div className="flex gap-1">
        {(["low", "medium", "high", "critical"] as const).map((l) => (
          <button key={l} onClick={() => setLevel(l)} className={`rounded-md px-2 py-1 text-xs ${level === l ? "bg-primary text-primary-foreground" : "border hover:bg-muted"}`}>
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

function HazardCardDemo() {
  const hazards = [
    { Icon: Flame, label: "Fire Hazard", level: "High", color: "text-orange-500" },
    { Icon: Zap, label: "Electrical", level: "Medium", color: "text-yellow-500" },
    { Icon: Skull, label: "Toxic", level: "Critical", color: "text-red-500" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {hazards.map((h) => (
        <div key={h.label} className="flex flex-col items-center gap-1 rounded-lg border border-red-200 p-3 dark:border-red-900/50">
          <h.Icon className={`h-6 w-6 ${h.color}`} />
          <span className="text-xs font-medium">{h.label}</span>
          <span className="text-[10px] text-muted-foreground">{h.level}</span>
        </div>
      ))}
    </div>
  );
}

function ToxicLabelDemo() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600">
        <Skull className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="font-medium">TOXIC</p>
        <p className="text-sm text-muted-foreground">Handle with extreme care. Wear protective equipment.</p>
      </div>
    </div>
  );
}

function EmergencyButtonDemo() {
  const [triggered, setTriggered] = useState(false);
  return (
    <button onClick={() => setTriggered(!triggered)} className={`flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors ${triggered ? "bg-red-600 text-white animate-pulse" : "border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"}`}>
      <AlertTriangle className="h-5 w-5" />
      {triggered ? "EMERGENCY ACTIVE" : "Trigger Emergency"}
    </button>
  );
}

function RiskIndicatorDemo() {
  const [risk, setRisk] = useState(65);
  const color = risk > 75 ? "bg-red-500" : risk > 50 ? "bg-orange-500" : risk > 25 ? "bg-yellow-500" : "bg-green-500";
  return (
    <div className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Risk Score</span>
        <span className="text-sm font-bold">{risk}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${risk}%` }} />
      </div>
      <input type="range" min={0} max={100} value={risk} onChange={(e) => setRisk(Number(e.target.value))} className="w-full" />
    </div>
  );
}

function CriticalNoticeDemo() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm">
        <ShieldOff className="h-4 w-4 text-red-600" />
        <span className="font-medium text-red-600">Protection disabled</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Shield className="h-4 w-4 text-emerald-600" />
        <span className="font-medium text-emerald-600">Protection enabled</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Zap className="h-4 w-4 text-yellow-500" />
        <span className="font-medium">Power surge detected</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <Flame className="h-4 w-4 text-orange-500" />
        <span className="font-medium">Overheating warning</span>
      </div>
    </div>
  );
}

export default function SkullDangerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Skull Danger</h1>
          <Badge variant="primary">Safety</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Critical safety components for displaying danger warnings, hazard alerts, emergency controls, and risk indicators in industrial and safety applications.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Danger Alert</h2>
        <ComponentPreview component="SkullDangerAlertDemo">
          <DangerAlertDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Warning Badge</h2>
        <ComponentPreview component="SkullDangerWarningBadgeDemo">
          <WarningBadgeDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Hazard Card</h2>
        <ComponentPreview component="SkullDangerHazardCardDemo">
          <HazardCardDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Toxic Label</h2>
        <ComponentPreview component="SkullDangerToxicLabelDemo">
          <ToxicLabelDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Emergency Button</h2>
        <ComponentPreview component="SkullDangerEmergencyButtonDemo">
          <EmergencyButtonDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Risk Indicator</h2>
        <ComponentPreview component="SkullDangerRiskIndicatorDemo">
          <RiskIndicatorDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Critical Notice</h2>
        <ComponentPreview component="SkullDangerCriticalNoticeDemo">
          <CriticalNoticeDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">level</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"low\" | \"medium\" | \"high\" | \"critical\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"medium\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">message</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">""</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">dismissible</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onConfirm</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showIcon</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
