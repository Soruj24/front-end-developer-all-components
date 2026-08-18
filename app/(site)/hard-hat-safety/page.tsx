"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  HardHat,
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Phone,
  Users,
  ClipboardCheck,
} from "lucide-react";

const installCommand = `npx component-library@latest add hard-hat-safety`;
const usageCode = `import { HardHatSafety } from "@/components/hard-hat-safety";

<HardHatSafety status="safe" />`;

function SafetyStatusDemo() {
  const [status, setStatus] = useState<"safe" | "warning" | "danger">("safe");
  const statuses = {
    safe: { icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20", label: "Safe Zone" },
    warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20", label: "Caution" },
    danger: { icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20", label: "Danger Zone" },
  };

  return (
    <div className="w-full max-w-sm">
      <div className={`rounded-xl border p-5 dark:border-white/[.145] ${statuses[status].bg}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm`}>
            {(() => {
              const Icon = statuses[status].icon;
              return <Icon className={`h-6 w-6 ${statuses[status].color}`} />;
            })()}
          </div>
          <div>
            <p className="text-lg font-extrabold">{statuses[status].label}</p>
            <p className="text-xs text-muted-foreground">Current zone status</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(Object.keys(statuses) as Array<keyof typeof statuses>).map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                status === s ? "bg-foreground text-background" : "bg-background/50 text-muted-foreground hover:bg-background"
              }`}
            >
              {statuses[s].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function WorkerCheckinDemo() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [ppe, setPpe] = useState({ helmet: false, vest: false, goggles: false, boots: false });

  const togglePpe = (key: keyof typeof ppe) => {
    setPpe((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allPpe = Object.values(ppe).every(Boolean);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <HardHat className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Worker Check-in</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold">JD</div>
            <div>
              <p className="text-sm font-bold">John Doe</p>
              <p className="text-[10px] text-muted-foreground">Electrician - Zone A</p>
            </div>
          </div>
          <p className="text-xs font-medium mb-2">PPE Checklist</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { key: "helmet" as const, label: "Hard Hat", icon: "⛑️" },
              { key: "vest" as const, label: "Safety Vest", icon: "🦺" },
              { key: "goggles" as const, label: "Goggles", icon: "🥽" },
              { key: "boots" as const, label: "Steel Boots", icon: "👢" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => togglePpe(item.key)}
                className={`flex items-center gap-2 rounded-lg border p-2 text-left transition-all ${
                  ppe[item.key] ? "border-primary/30 bg-primary/5" : "border-black/[.08] dark:border-white/[.145]"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="text-[10px] font-medium">{item.label}</span>
                {ppe[item.key] && <CheckCircle className="ml-auto h-3 w-3 text-primary" />}
              </button>
            ))}
          </div>
          <button
            disabled={!allPpe}
            onClick={() => setCheckedIn(!checkedIn)}
            className={`w-full rounded-lg px-4 py-2 text-xs font-medium ${
              checkedIn ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" :
              allPpe ? "bg-foreground text-background hover:bg-foreground/90" : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {checkedIn ? "Checked In ✓" : "Check In"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SafetyEquipmentDemo() {
  const equipment = [
    { name: "Hard Hats", available: 24, inUse: 18, icon: "⛑️" },
    { name: "Safety Vests", available: 30, inUse: 22, icon: "🦺" },
    { name: "Gloves", available: 50, inUse: 35, icon: "🧤" },
    { name: "Goggles", available: 20, inUse: 12, icon: "🥽" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Safety Equipment</h3>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {equipment.map((item) => (
            <div key={item.name} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-bold">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(item.inUse / item.available) * 100}%` }} />
                  </div>
                  <span className="text-[9px] text-muted-foreground">{item.inUse}/{item.available}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IncidentTrackerDemo() {
  const incidents = [
    { id: "INC-001", type: "Near Miss", severity: "low", date: "Jan 15", status: "resolved" },
    { id: "INC-002", type: "Equipment Failure", severity: "medium", date: "Jan 18", status: "investigating" },
    { id: "INC-003", type: "Slip & Fall", severity: "high", date: "Jan 20", status: "open" },
  ];
  const severityColors = {
    low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400",
    high: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
  };
  const statusIcons = {
    resolved: <CheckCircle className="h-3 w-3 text-emerald-500" />,
    investigating: <AlertTriangle className="h-3 w-3 text-yellow-500" />,
    open: <XCircle className="h-3 w-3 text-red-500" />,
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Incident Tracker</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">{incidents.length} incidents</span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {incidents.map((inc) => (
            <div key={inc.id} className="flex items-center gap-3 rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-bold">{inc.type}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium capitalize ${severityColors[inc.severity as keyof typeof severityColors]}`}>
                    {inc.severity}
                  </span>
                </div>
                <p className="text-[9px] text-muted-foreground">{inc.id} · {inc.date}</p>
              </div>
              <div className="flex items-center gap-1">
                {statusIcons[inc.status as keyof typeof statusIcons]}
                <span className="text-[10px] capitalize text-muted-foreground">{inc.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SafetyTrainingDemo() {
  const [completed, setCompleted] = useState([true, true, false, false]);
  const trainings = [
    { name: "Site Induction", duration: "2 hrs", icon: "📋" },
    { name: "Fall Protection", duration: "4 hrs", icon: "🪜" },
    { name: "First Aid", duration: "8 hrs", icon: "🏥" },
    { name: "Fire Safety", duration: "3 hrs", icon: "🔥" },
  ];

  const toggle = (i: number) => {
    setCompleted((prev) => prev.map((c, idx) => idx === i ? !c : c));
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Safety Training</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">{completed.filter(Boolean).length}/{trainings.length}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="h-2 rounded-full bg-muted overflow-hidden mb-4">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(completed.filter(Boolean).length / trainings.length) * 100}%` }} />
          </div>
          <div className="space-y-2">
            {trainings.map((t, i) => (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
                  completed[i] ? "border-primary/30 bg-primary/5" : "border-black/[.08] dark:border-white/[.145]"
                }`}
              >
                <span className="text-xl">{t.icon}</span>
                <div className="flex-1">
                  <p className="text-xs font-bold">{t.name}</p>
                  <p className="text-[9px] text-muted-foreground">{t.duration}</p>
                </div>
                {completed[i] ? (
                  <CheckCircle className="h-4 w-4 text-primary" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SiteSafetyScoreDemo() {
  const [score, setScore] = useState(87);
  const metrics = [
    { label: "Days Without Incident", value: "142" },
    { label: "Training Compliance", value: "94%" },
    { label: "PPE Adherence", value: "98%" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Site Safety Score</h3>
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-center mb-4">
            <div className="relative h-24 w-24">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-primary" strokeDasharray={`${score * 2.51} 251`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-extrabold">{score}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {metrics.map((m) => (
              <div key={m.label} className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span className="text-[10px] text-muted-foreground">{m.label}</span>
                <span className="text-xs font-bold">{m.value}</span>
              </div>
            ))}
          </div>
          <button onClick={() => setScore((s) => Math.min(100, s + 1))} className="mt-3 w-full rounded-lg bg-foreground px-4 py-2 text-xs font-medium text-background hover:bg-foreground/90">
            Update Score
          </button>
        </div>
      </div>
    </div>
  );
}

function EmergencyContactsDemo() {
  const contacts = [
    { name: "Site Manager", phone: "+1 (555) 123-4567", role: "Primary Contact" },
    { name: "Safety Officer", phone: "+1 (555) 234-5678", role: "Safety Issues" },
    { name: "Emergency Services", phone: "911", role: "Emergencies" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Emergency Contacts</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {contacts.map((c) => (
            <div key={c.name} className="flex items-center gap-3 rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/30">
                <Phone className="h-4 w-4 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold">{c.name}</p>
                <p className="text-[9px] text-muted-foreground">{c.role}</p>
              </div>
              <span className="text-xs font-mono font-bold">{c.phone}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HardHatSafetyPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Hard Hat Safety
          </h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A hard hat safety indicator for showing safety status and warnings.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Safety Status</h3>
          <p className="text-sm text-muted-foreground">
            Different safety zone indicators.
          </p>
          <ComponentPreview id="hardhat-status">
            <SafetyStatusDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Worker Check-in</h3>
          <p className="text-sm text-muted-foreground">
            PPE compliance check-in form.
          </p>
          <ComponentPreview id="hardhat-checkin">
            <WorkerCheckinDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Safety Equipment</h3>
          <p className="text-sm text-muted-foreground">
            Equipment availability tracker.
          </p>
          <ComponentPreview id="hardhat-equipment">
            <SafetyEquipmentDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Incident Tracker</h3>
          <p className="text-sm text-muted-foreground">
            Safety incident log with severity.
          </p>
          <ComponentPreview id="hardhat-incident">
            <IncidentTrackerDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Safety Training</h3>
          <p className="text-sm text-muted-foreground">
            Training completion checklist.
          </p>
          <ComponentPreview id="hardhat-training">
            <SafetyTrainingDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Site Safety Score</h3>
          <p className="text-sm text-muted-foreground">
            Overall safety metrics display.
          </p>
          <ComponentPreview id="hardhat-score">
            <SiteSafetyScoreDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Emergency Contacts</h3>
          <p className="text-sm text-muted-foreground">
            Safety contact list.
          </p>
          <ComponentPreview id="hardhat-contacts">
            <EmergencyContactsDemo />
          </ComponentPreview>
        </div>
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
                <td className="px-4 py-3 font-mono text-xs">status</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"safe\" | \"warning\" | \"danger\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"safe\""}</td>
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
