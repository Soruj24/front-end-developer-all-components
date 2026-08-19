"use client";

import { useState, useEffect } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Check } from "lucide-react";
import {
  PROGRESSRING_SOURCE,
  BASIC_EXAMPLE,
  ANIMATED_EXAMPLE,
  SKILLS_EXAMPLE,
  TASKS_EXAMPLE,
  STEPS_EXAMPLE,
} from "./progress-ring-source";

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
    <ComponentDocPage name="Progress Ring" category="Data Display" description="Circular progress indicators with animated fills, color variants, and percentage labels. Great for dashboards and skill displays.">
      <PreviewPanel filename="progress-ring.tsx">
        <div className="flex flex-wrap items-center justify-center gap-8">
          <Ring value={25} />
          <Ring value={50} color="info" />
          <Ring value={75} color="success" />
          <Ring value={90} color="warning" />
          <Ring value={100} color="danger" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={PROGRESSRING_SOURCE} filename="components/ui/ProgressRing/ProgressRing.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Animated" description="Value transitions smoothly to the target over 1 second." code={ANIMATED_EXAMPLE}>
          <div className="flex items-center justify-center">
            <Ring value={animatedValue} size={160} strokeWidth={12} color="primary" label="Overall Score" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Skills" description="Compact rings with labels for skill or score displays." code={SKILLS_EXAMPLE}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="flex flex-col items-center gap-2">
                <Ring value={skill.value} size={100} strokeWidth={8} color={skill.color} />
                <span className="text-sm font-medium text-foreground">{skill.name}</span>
              </div>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Task Progress" description="Combine rings with progress bars for task lists." code={TASKS_EXAMPLE}>
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
        </ExampleBlock>

        <ExampleBlock title="Steps" description="Indicate completed, current, and upcoming steps." code={STEPS_EXAMPLE}>
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
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
