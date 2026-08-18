"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Check } from "lucide-react";

const installCommand = `npx component-library@latest add progress-ring`;

const usageCode = `import { ProgressRing } from "@/components/progress-ring";

<ProgressRing value={75} size={120} strokeWidth={8} />
<ProgressRing value={90} size={120} strokeWidth={8} color="success" />`;

function Ring({ value, size = 120, strokeWidth = 8, color = "primary", showLabel = true, label }: {
  value: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showLabel?: boolean;
  label?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const colorMap: Record<string, string> = {
    primary: "stroke-primary",
    success: "stroke-emerald-500",
    warning: "stroke-amber-500",
    danger: "stroke-red-500",
    info: "stroke-blue-500",
  };

  return (
    <div className="relative inline-flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${colorMap[color] || "stroke-primary"} transition-all duration-1000 ease-out`}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{value}%</span>
          {label && <span className="text-[10px] text-muted-foreground">{label}</span>}
        </div>
      )}
    </div>
  );
}

const skills = [
  { name: "React", value: 92, color: "info" },
  { name: "TypeScript", value: 88, color: "primary" },
  { name: "Node.js", value: 75, color: "success" },
  { name: "Python", value: 60, color: "warning" },
];

const tasks = [
  { name: "Design System", progress: 100, total: 12 },
  { name: "API Integration", progress: 8, total: 10 },
  { name: "Testing", progress: 3, total: 8 },
  { name: "Documentation", progress: 5, total: 6 },
];

export default function ProgressRingPage() {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(78), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Progress Ring</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Circular progress indicators with animated fills, color variants, and percentage labels. Great for dashboards and skill displays.
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

      <ComponentPreview id="progress-ring-basic">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <Ring value={25} />
          <Ring value={50} color="info" />
          <Ring value={75} color="success" />
          <Ring value={90} color="warning" />
          <Ring value={100} color="danger" />
        </div>
      </ComponentPreview>

      <ComponentPreview id="progress-ring-animated">
        <div className="flex items-center justify-center">
          <Ring value={animatedValue} size={160} strokeWidth={12} color="primary" label="Overall Score" />
        </div>
      </ComponentPreview>

      <ComponentPreview id="progress-ring-skills">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center gap-2">
              <Ring value={skill.value} size={100} strokeWidth={8} color={skill.color} />
              <span className="text-sm font-medium text-foreground">{skill.name}</span>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="progress-ring-tasks">
        <div className="w-full max-w-lg">
          <div className="flex flex-col gap-4">
            {tasks.map((task) => {
              const pct = Math.round((task.progress / task.total) * 100);
              const color = pct === 100 ? "success" : pct >= 50 ? "primary" : pct >= 25 ? "warning" : "danger";
              return (
                <div key={task.name} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                  <Ring value={pct} size={56} strokeWidth={5} color={color} showLabel={false} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{task.name}</p>
                      <p className="text-xs text-muted-foreground">{task.progress}/{task.total}</p>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          color === "success" ? "bg-emerald-500" : color === "primary" ? "bg-primary" : color === "warning" ? "bg-amber-500" : "bg-red-500"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="progress-ring-steps">
        <div className="flex items-center gap-4">
          {["Design", "Develop", "Test", "Deploy"].map((step, i) => {
            const isComplete = i < 2;
            const isCurrent = i === 2;
            return (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className="relative">
                  {isComplete ? (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <Check className="h-5 w-5" />
                    </div>
                  ) : (
                    <Ring
                      value={isCurrent ? 45 : 0}
                      size={48}
                      strokeWidth={4}
                      color={isCurrent ? "info" : "primary"}
                      showLabel={false}
                    />
                  )}
                </div>
                <span className={`text-xs font-medium ${isComplete ? "text-emerald-500" : isCurrent ? "text-primary" : "text-muted-foreground"}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </ComponentPreview>

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
                <td className="px-4 py-3 text-muted-foreground">number (0-100)</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">120</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">strokeWidth</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">8</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">color</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;primary&quot; | &quot;success&quot; | &quot;warning&quot; | &quot;danger&quot; | &quot;info&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;primary&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">showLabel</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
