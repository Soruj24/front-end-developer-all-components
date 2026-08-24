"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Circle, PieChart, TrendingUp, Activity, Gauge, Target, Zap, Cpu } from "lucide-react";

const installCommand = `npx component-library@latest add half-circle`;
const usageCode = `import { HalfCircle } from "@/components/half-circle";

<HalfCircle value={75} size={150} color="#3b82f6" />
`;

function HalfGauge() {
  const [value, setValue] = useState(72);
  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-48 h-24 overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />
          <path d="M 10 100 A 90 90 0 0 1 155 35" fill="none" stroke="#3b82f6" strokeWidth="12" strokeLinecap="round" className="transition-all duration-1000" />
        </svg>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl font-bold text-foreground">{value}%</span>
      </div>
      <div className="flex flex-col gap-2 ml-6">
        <button onClick={() => setValue(Math.min(100, value + 10))} className="rounded-md bg-primary/10 px-3 py-1 text-xs text-primary hover:bg-primary/20">+10</button>
        <button onClick={() => setValue(Math.max(0, value - 10))} className="rounded-md bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-muted/80">-10</button>
      </div>
    </div>
  );
}

function ProgressArc() {
  const items = [
    { label: "Design", value: 85, color: "#8b5cf6" },
    { label: "Dev", value: 60, color: "#3b82f6" },
    { label: "Test", value: 40, color: "#22c55e" },
  ];
  return (
    <div className="w-full flex items-center justify-center gap-6 p-4">
      {items.map((item, i) => {
        const angle = (item.value / 100) * 180;
        const rad = (angle * Math.PI) / 180;
        const x = 10 + 90 * (1 - Math.cos(rad));
        const y = 100 - 90 * Math.sin(rad);
        return (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="relative w-24 h-12 overflow-hidden">
              <svg viewBox="0 0 200 100" className="w-full h-full">
                <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#e5e7eb" strokeWidth="8" strokeLinecap="round" />
                <path d={`M 10 100 A 90 90 0 0 1 ${x} ${y}`} fill="none" stroke={item.color} strokeWidth="8" strokeLinecap="round" />
              </svg>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-sm font-bold" style={{ color: item.color }}>{item.value}%</span>
            </div>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function Speedometer() {
  const [speed, setSpeed] = useState(65);
  const getColor = (s: number) => s < 30 ? "#22c55e" : s < 70 ? "#f59e0b" : "#ef4444";
  const angle = (speed / 100) * 180;
  const rad = (angle * Math.PI) / 180;
  const x = 10 + 90 * (1 - Math.cos(rad));
  const y = 100 - 90 * Math.sin(rad);
  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <div className="relative w-48 h-24 overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />
          <path d={`M 10 100 A 90 90 0 0 1 ${x} ${y}`} fill="none" stroke={getColor(speed)} strokeWidth="12" strokeLinecap="round" className="transition-all duration-300" />
          <circle cx={x} cy={y} r="4" fill={getColor(speed)} className="transition-all duration-300" />
        </svg>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl font-bold text-foreground">{speed}</span>
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground">km/h</span>
      </div>
      <input type="range" min="0" max="100" value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-40" />
    </div>
  );
}

function MeterGauge() {
  const metrics = [
    { label: "CPU", value: 78, icon: Cpu },
    { label: "Memory", value: 54, icon: Activity },
    { label: "Disk", value: 92, icon: Gauge },
  ];
  return (
    <div className="w-full grid grid-cols-3 gap-4 p-4">
      {metrics.map((m, i) => {
        const angle = (m.value / 100) * 180;
        const rad = (angle * Math.PI) / 180;
        const x = 10 + 90 * (1 - Math.cos(rad));
        const y = 100 - 90 * Math.sin(rad);
        const color = m.value > 80 ? "#ef4444" : m.value > 60 ? "#f59e0b" : "#22c55e";
        return (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="relative w-full h-16 overflow-hidden">
              <svg viewBox="0 0 200 100" className="w-full h-full">
                <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#e5e7eb" strokeWidth="8" strokeLinecap="round" />
                <path d={`M 10 100 A 90 90 0 0 1 ${x} ${y}`} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
              </svg>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-bold text-foreground">{m.value}%</span>
            </div>
            <m.icon className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground">{m.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function SemiCircle() {
  const [value, setValue] = useState(65);
  const labels = ["Poor", "Fair", "Good", "Great", "Excellent"];
  const labelIndex = Math.min(4, Math.floor(value / 20));
  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <div className="relative w-56 h-28 overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <defs>
            <linearGradient id="semiGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="25%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#eab308" />
              <stop offset="75%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#e5e7eb" strokeWidth="16" strokeLinecap="round" />
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="url(#semiGrad)" strokeWidth="16" strokeLinecap="round" strokeDasharray={`${(value / 100) * 283} 283`} className="transition-all duration-500" />
        </svg>
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-3xl font-bold text-foreground">{value}</span>
      </div>
      <span className="text-sm font-medium text-primary">{labels[labelIndex]}</span>
      <input type="range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-48" />
    </div>
  );
}

function DonutHalf() {
  const segments = [
    { label: "Active", value: 45, color: "#3b82f6" },
    { label: "Idle", value: 30, color: "#e5e7eb" },
    { label: "Error", value: 25, color: "#ef4444" },
  ];
  return (
    <div className="w-full flex items-center justify-center gap-8 p-4">
      <div className="relative w-40 h-20 overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#e5e7eb" strokeWidth="20" strokeLinecap="round" />
          <path d="M 10 100 A 90 90 0 0 1 80 30" fill="none" stroke="#3b82f6" strokeWidth="20" strokeLinecap="round" />
          <path d="M 80 30 A 90 90 0 0 1 140 40" fill="none" stroke="#e5e7eb" strokeWidth="20" strokeLinecap="round" />
          <path d="M 140 40 A 90 90 0 0 1 190 100" fill="none" stroke="#ef4444" strokeWidth="20" strokeLinecap="round" />
        </svg>
      </div>
      <div className="flex flex-col gap-2">
        {segments.map((s, i) => (
          <div key={i} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-muted-foreground">{s.label}:</span>
            <span className="font-medium text-foreground">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RatingArc() {
  const [rating, setRating] = useState(4);
  const maxRating = 5;
  return (
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <div className="relative w-40 h-20 overflow-hidden">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="#e5e7eb" strokeWidth="12" strokeLinecap="round" />
          <path d={`M 10 100 A 90 90 0 0 1 ${10 + 180 * (rating / maxRating)} ${100 - 90 * Math.sin((rating / maxRating) * Math.PI)}`} fill="none" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" className="transition-all duration-300" />
        </svg>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl font-bold text-foreground">{rating}<span className="text-sm text-muted-foreground">/{maxRating}</span></span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: maxRating }, (_, i) => (
          <button
            key={i}
            onClick={() => setRating(i + 1)}
            className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
              i < rating ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HalfCirclePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Half Circle</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Semicircular gauge components for displaying progress, ratings, and metrics with animated fills.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Half Gauge</h2>
          <p className="mt-1 text-sm text-muted-foreground">Interactive gauge with increment/decrement controls.</p>
        </div>
        <ComponentPreview id="half-gauge">
          <HalfGauge />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Progress Arc</h2>
          <p className="mt-1 text-sm text-muted-foreground">Multiple progress arcs with different colors.</p>
        </div>
        <ComponentPreview id="progress-arc">
          <ProgressArc />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Speedometer</h2>
          <p className="mt-1 text-sm text-muted-foreground">Speedometer with slider control and color coding.</p>
        </div>
        <ComponentPreview id="speedometer">
          <Speedometer />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Meter Gauge</h2>
          <p className="mt-1 text-sm text-muted-foreground">System metrics displayed as half-circle meters.</p>
        </div>
        <ComponentPreview id="meter-gauge">
          <MeterGauge />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Semi Circle</h2>
          <p className="mt-1 text-sm text-muted-foreground">Gradient-filled semicircle with quality labels.</p>
        </div>
        <ComponentPreview id="semi-circle">
          <SemiCircle />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Donut Half</h2>
          <p className="mt-1 text-sm text-muted-foreground">Segmented half-donut chart with legend.</p>
        </div>
        <ComponentPreview id="donut-half">
          <DonutHalf />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Rating Arc</h2>
          <p className="mt-1 text-sm text-muted-foreground">Interactive rating displayed as arc gauge.</p>
        </div>
        <ComponentPreview id="rating-arc">
          <RatingArc />
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
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">150</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">strokeWidth</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">10</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">"#3b82f6"</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
