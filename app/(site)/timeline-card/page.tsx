"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Clock,
  Calendar,
  CheckCircle,
  Circle,
  ArrowRight,
  Star,
  MapPin,
} from "lucide-react";

const installCommand = `npx component-library@latest add timeline-card`;

const usageCode = `import { TimelineCard } from "@/components/timeline-card";

<TimelineCard
  title="Project Started"
  date="Jan 15, 2024"
  description="Initial planning phase"
  status="completed"
/>`;

function TimelineItem() {
  const events = [
    { title: "Project Kickoff", date: "Jan 15, 2024", status: "completed" },
    { title: "Design Review", date: "Feb 3, 2024", status: "completed" },
    { title: "Sprint Planning", date: "Feb 20, 2024", status: "current" },
    { title: "Release v2.0", date: "Mar 15, 2024", status: "upcoming" },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="relative max-w-md space-y-4 pl-8">
        <div className="absolute left-3 top-2 bottom-2 w-px bg-border" />
        {events.map((e, i) => (
          <div key={i} className="relative flex items-start gap-4">
            <div className="absolute -left-5 top-1.5 z-10">
              {e.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500" />}
              {e.status === "current" && <div className="h-3 w-3 rounded-full border-2 border-primary bg-background" />}
              {e.status === "upcoming" && <Circle className="h-4 w-4 text-muted-foreground" />}
            </div>
            <div className="flex-1 rounded-lg border bg-card p-3">
              <p className="text-sm font-medium">{e.title}</p>
              <p className="text-xs text-muted-foreground">{e.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepProgress() {
  const [currentStep, setCurrentStep] = useState(2);
  const steps = ["Account", "Profile", "Preferences", "Confirm"];

  return (
    <div className="flex flex-col items-center py-8">
      <div className="flex items-center">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors ${
                  i < currentStep
                    ? "border-green-500 bg-green-500 text-white"
                    : i === currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30 bg-background text-muted-foreground"
                }`}
              >
                {i < currentStep ? <CheckCircle className="h-5 w-5" /> : i + 1}
              </div>
              <span className="mt-2 text-xs font-medium text-muted-foreground">{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`mx-2 h-0.5 w-16 ${i < currentStep ? "bg-green-500" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="rounded-md border px-3 py-1.5 text-sm hover:bg-accent disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
          disabled={currentStep === steps.length}
          className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function EventTimeline() {
  const events = [
    { time: "09:00", title: "Daily Standup", location: "Zoom", icon: Clock },
    { time: "11:30", title: "Design Review", location: "Figma", icon: Star },
    { time: "14:00", title: "Sprint Planning", location: "Conference Room A", icon: MapPin },
    { time: "16:30", title: "Code Review", location: "GitHub", icon: Calendar },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-md space-y-3">
        {events.map((e, i) => (
          <div key={i} className="flex items-center gap-4 rounded-lg border bg-card p-3 transition-colors hover:bg-accent/50">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <e.icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{e.title}</p>
              <p className="text-xs text-muted-foreground">{e.location}</p>
            </div>
            <span className="text-xs font-mono text-muted-foreground">{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HistoryCard() {
  const history = [
    { action: "Updated profile picture", time: "2 minutes ago", icon: Star },
    { action: "Changed password", time: "1 hour ago", icon: CheckCircle },
    { action: "Enabled 2FA", time: "3 hours ago", icon: CheckCircle },
    { action: "Logged in from new device", time: "Yesterday", icon: ArrowRight },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-sm rounded-lg border bg-card p-4">
        <h3 className="mb-3 text-sm font-semibold">Recent Activity</h3>
        <div className="space-y-3">
          {history.map((h, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                <h.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm">{h.action}</p>
                <p className="text-xs text-muted-foreground">{h.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MilestoneMarker() {
  const milestones = [
    { label: "Alpha", progress: 100 },
    { label: "Beta", progress: 100 },
    { label: "RC", progress: 60 },
    { label: "Stable", progress: 0 },
  ];

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-md">
        <div className="mb-4 flex justify-between text-xs text-muted-foreground">
          <span>Start</span>
          <span>Launch</span>
        </div>
        <div className="relative h-2 rounded-full bg-muted">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
            style={{ width: "72%" }}
          />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {milestones.map((m, i) => (
            <div key={i} className="text-center">
              <div
                className={`mx-auto mb-1 flex h-4 w-4 items-center justify-center rounded-full ${
                  m.progress === 100 ? "bg-green-500" : m.progress > 0 ? "bg-primary" : "bg-muted"
                }`}
              >
                {m.progress === 100 && <CheckCircle className="h-3 w-3 text-white" />}
              </div>
              <p className="text-xs font-medium">{m.label}</p>
              <p className="text-xs text-muted-foreground">{m.progress}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActivityFeed() {
  const [filter, setFilter] = useState("all");
  const activities = [
    { user: "Alice", action: "committed to", target: "main", type: "code" },
    { user: "Bob", action: "reviewed", target: "PR #142", type: "review" },
    { user: "Carol", action: "deployed", target: "v2.1.0", type: "deploy" },
    { user: "Dave", action: "opened issue", target: "#89", type: "issue" },
    { user: "Eve", action: "merged", target: "PR #138", type: "code" },
  ];

  const filtered = filter === "all" ? activities : activities.filter((a) => a.type === filter);

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <div className="flex gap-2">
        {["all", "code", "review", "deploy", "issue"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
              filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="w-full max-w-sm space-y-2">
        {filtered.map((a, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg border bg-card p-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {a.user[0]}
            </div>
            <p className="text-sm">
              <span className="font-medium">{a.user}</span>{" "}
              <span className="text-muted-foreground">{a.action}</span>{" "}
              <span className="font-medium">{a.target}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectTimeline() {
  const phases = [
    { name: "Discovery", weeks: 2, color: "bg-blue-500" },
    { name: "Design", weeks: 3, color: "bg-purple-500" },
    { name: "Development", weeks: 6, color: "bg-emerald-500" },
    { name: "Testing", weeks: 2, color: "bg-amber-500" },
    { name: "Launch", weeks: 1, color: "bg-rose-500" },
  ];
  const totalWeeks = phases.reduce((sum, p) => sum + p.weeks, 0);

  return (
    <div className="flex justify-center py-8">
      <div className="w-full max-w-lg">
        <div className="flex gap-0.5">
          {phases.map((p, i) => (
            <div
              key={i}
              className={`h-8 ${p.color} first:rounded-l-lg last:rounded-r-lg transition-all hover:opacity-80`}
              style={{ width: `${(p.weeks / totalWeeks) * 100}%` }}
              title={`${p.name}: ${p.weeks} weeks`}
            />
          ))}
        </div>
        <div className="mt-3 flex gap-4">
          {phases.map((p, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`h-2.5 w-2.5 rounded-full ${p.color}`} />
              <span className="text-xs text-muted-foreground">{p.name} ({p.weeks}w)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TimelineCardPage() {
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    { name: "Timeline Item", component: TimelineItem },
    { name: "Step Progress", component: StepProgress },
    { name: "Event Timeline", component: EventTimeline },
    { name: "History Card", component: HistoryCard },
    { name: "Milestone Marker", component: MilestoneMarker },
    { name: "Activity Feed", component: ActivityFeed },
    { name: "Project Timeline", component: ProjectTimeline },
  ];

  const ActiveComponent = demos[activeDemo].component;

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Timeline Card
          </h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Chronological event timelines, step progress indicators, and activity feeds.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
          <p className="mt-1 text-sm text-muted-foreground">Interactive timeline layouts.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {demos.map((demo, i) => (
            <button
              key={i}
              onClick={() => setActiveDemo(i)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                activeDemo === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {demo.name}
            </button>
          ))}
        </div>
        <ComponentPreview id={`timeline-card-${demos[activeDemo].name.toLowerCase().replace(/ /g, "-")}`}>
          <div className="w-full">
            <ActiveComponent />
          </div>
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
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">date</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">status</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;completed&quot; | &quot;current&quot; | &quot;upcoming&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;upcoming&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot; | &quot;horizontal&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;vertical&quot;</td>
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
