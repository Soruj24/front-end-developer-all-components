"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Navigation, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Compass, Map } from "lucide-react";

const installCommand = `npx component-library@latest add navigation-arrow`;

const usageCode = `import { NavigationArrow } from "@/components/navigation-arrow";

export default function Page() {
  return <NavigationArrow direction="right" />;
}`;

function DirectionArrowDemo() {
  const [direction, setDirection] = useState("right");
  const arrows = [
    { id: "up", icon: ArrowUp, label: "Up" },
    { id: "right", icon: ArrowRight, label: "Right" },
    { id: "down", icon: ArrowDown, label: "Down" },
    { id: "left", icon: ArrowLeft, label: "Left" },
  ];
  const active = arrows.find((a) => a.id === direction)!;
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Navigation className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Direction Arrow</span>
      </div>
      <div className="flex h-32 items-center justify-center rounded-md bg-muted/30 mb-4">
        <div className={`transition-transform duration-300 ${direction === "up" ? "-rotate-90" : direction === "down" ? "rotate-90" : direction === "left" ? "rotate-180" : ""}`}>
          <ArrowRight className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="flex justify-center gap-2">
        {arrows.map((a) => (
          <button
            key={a.id}
            onClick={() => setDirection(a.id)}
            className={`flex h-9 w-9 items-center justify-center rounded-md border transition-colors ${direction === a.id ? "border-primary bg-primary/5 text-primary" : "border-transparent bg-muted text-muted-foreground hover:bg-muted/80"}`}
          >
            <a.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
}

function BreadcrumbNavDemo() {
  const [active, setActive] = useState(3);
  const items = ["Home", "Products", "Electronics", "Laptops", "MacBook Pro"];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Map className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Breadcrumb Nav</span>
      </div>
      <nav className="flex items-center gap-1">
        {items.map((item, i) => (
          <div key={item} className="flex items-center gap-1">
            <button
              onClick={() => setActive(i)}
              className={`rounded px-2 py-1 text-xs transition-colors ${i === active ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {item}
            </button>
            {i < items.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
          </div>
        ))}
      </nav>
    </div>
  );
}

function StepIndicatorDemo() {
  const [step, setStep] = useState(2);
  const steps = ["Account", "Shipping", "Payment", "Review"];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Compass className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Step Indicator</span>
      </div>
      <div className="flex items-center">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center">
            <button
              onClick={() => setStep(i)}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${i < step ? "bg-primary text-primary-foreground" : i === step ? "border-2 border-primary text-primary" : "border-2 border-muted text-muted-foreground"}`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span className={`text-[10px] ${i <= step ? "text-foreground font-medium" : "text-muted-foreground"}`}>{s}</span>
            </button>
            {i < steps.length - 1 && (
              <div className={`mx-2 mb-5 h-0.5 w-12 ${i < step ? "bg-primary" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressArrowDemo() {
  const [progress, setProgress] = useState(65);
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Progress Arrow</span>
      </div>
      <div className="relative h-8 rounded-full bg-muted overflow-hidden mb-3">
        <div className="absolute inset-y-0 left-0 flex items-center justify-end rounded-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-300" style={{ width: `${progress}%` }}>
          <ArrowRight className="mr-1 h-3 w-3 text-primary-foreground" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <input type="range" min={0} max={100} value={progress} onChange={(e) => setProgress(Number(e.target.value))} className="flex-1 accent-primary" />
        <span className="text-xs font-medium text-foreground w-10 text-right">{progress}%</span>
      </div>
    </div>
  );
}

function RouteGuideDemo() {
  const [activeStep, setActiveStep] = useState(0);
  const route = [
    { label: "Start", icon: Navigation, detail: "Entrance Gate" },
    { label: "Turn Right", icon: ArrowRight, detail: "Main Hall" },
    { label: "Go Straight", icon: ArrowUp, detail: "Corridor B" },
    { label: "Arrive", icon: Compass, detail: "Room 204" },
  ];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Compass className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Route Guide</span>
      </div>
      <div className="flex flex-col gap-2">
        {route.map((step, i) => (
          <button
            key={step.label}
            onClick={() => setActiveStep(i)}
            className={`flex items-center gap-3 rounded-md border p-3 text-left transition-all ${activeStep === i ? "border-primary bg-primary/5" : "border-transparent bg-muted/30 hover:bg-muted/50"}`}
          >
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${i <= activeStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              <step.icon className="h-3.5 w-3.5" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium">{step.label}</p>
              <p className="text-[10px] text-muted-foreground">{step.detail}</p>
            </div>
            {i < route.length - 1 && <ArrowDown className="h-3 w-3 text-muted-foreground" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function BackForwardDemo() {
  const [history, setHistory] = useState<string[]>(["Home"]);
  const [current, setCurrent] = useState(0);
  const pages = ["Home", "Settings", "Profile", "Dashboard", "Analytics"];
  const navigateTo = (page: string) => {
    setHistory((prev) => [...prev.slice(0, current + 1), page]);
    setCurrent((c) => c + 1);
  };
  const goBack = () => setCurrent((c) => Math.max(0, c - 1));
  const goForward = () => setCurrent((c) => Math.min(history.length - 1, c + 1));
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <ArrowLeft className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Back / Forward</span>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <button onClick={goBack} disabled={current === 0} className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-40">
          <ArrowLeft className="h-3.5 w-3.5" />
        </button>
        <button onClick={goForward} disabled={current === history.length - 1} className="flex h-8 w-8 items-center justify-center rounded-md bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-40">
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
        <span className="ml-2 text-xs font-medium text-foreground">{history[current]}</span>
      </div>
      <div className="flex gap-1">
        {pages.map((p) => (
          <button key={p} onClick={() => navigateTo(p)} className="rounded bg-muted/50 px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted">
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

function WaypointDemo() {
  const [activeWp, setActiveWp] = useState(0);
  const waypoints = [
    { name: "Park Entrance", dist: "0 km", time: "0 min" },
    { name: "Fountain", dist: "0.5 km", time: "6 min" },
    { name: "Bridge", dist: "1.2 km", time: "15 min" },
    { name: "Summit View", dist: "2.8 km", time: "35 min" },
  ];
  return (
    <div className="rounded-lg border bg-background p-6">
      <div className="mb-4 flex items-center gap-2">
        <Map className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Waypoint</span>
      </div>
      <div className="relative ml-4 border-l-2 border-muted pl-6">
        {waypoints.map((wp, i) => (
          <div key={wp.name} className="relative mb-4 last:mb-0">
            <button
              onClick={() => setActiveWp(i)}
              className={`absolute -left-8 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors ${i <= activeWp ? "border-primary bg-primary" : "border-muted bg-background"}`}
            >
              {i < activeWp && <span className="h-1.5 w-1.5 rounded-full bg-primary-foreground" />}
            </button>
            <button onClick={() => setActiveWp(i)} className="text-left">
              <p className={`text-xs font-medium ${i <= activeWp ? "text-foreground" : "text-muted-foreground"}`}>{wp.name}</p>
              <p className="text-[10px] text-muted-foreground">{wp.dist} · {wp.time}</p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NavigationArrowPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Navigation Arrow</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Direction arrows, breadcrumbs, step indicators, and route guides for wayfinding and progress navigation.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">DirectionArrow</h2>
        <DirectionArrowDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">BreadcrumbNav</h2>
        <BreadcrumbNavDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">StepIndicator</h2>
        <StepIndicatorDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">ProgressArrow</h2>
        <ProgressArrowDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">RouteGuide</h2>
        <RouteGuideDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">BackForward</h2>
        <BackForwardDemo />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Waypoint</h2>
        <WaypointDemo />
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
                <td className="px-4 py-3 font-mono text-xs">direction</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;up&quot; | &quot;down&quot; | &quot;left&quot; | &quot;right&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;right&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">animated</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
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
