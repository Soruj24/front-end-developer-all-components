"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Target, Crosshair, Bullseye, TrendingUp, Award, Star, CheckCircle } from "lucide-react";

const installCommand = `npx component-library@latest add target-goal`;
const usageCode = `<TargetGoal progress={75} label="Sales Target" />`;

function TargetCard() {
  const [target, setTarget] = useState(1000);
  const [current, setCurrent] = useState(750);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Target className="h-5 w-5 text-red-500" />
        <h3 className="font-medium">Target Card</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Target</span>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            className="w-24 rounded-md border bg-background px-3 py-2 text-sm text-right"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Current</span>
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(Number(e.target.value))}
            className="w-24 rounded-md border bg-background px-3 py-2 text-sm text-right"
          />
        </div>
        <div className="h-3 rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all ${
              (current / target) >= 1 ? "bg-green-500" : (current / target) >= 0.75 ? "bg-blue-500" : "bg-orange-500"
            }`}
            style={{ width: `${Math.min(100, (current / target) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span>{current.toLocaleString()}</span>
          <span className="font-medium">{Math.round((current / target) * 100)}%</span>
          <span>{target.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function GoalTracker() {
  const [goals, setGoals] = useState([
    { name: "Exercise", progress: 80, target: "5x/week" },
    { name: "Reading", progress: 60, target: "4 books" },
    { name: "Savings", progress: 45, target: "$10k" },
  ]);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Crosshair className="h-5 w-5 text-blue-500" />
        <h3 className="font-medium">Goal Tracker</h3>
      </div>
      <div className="space-y-4">
        {goals.map((goal, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{goal.name}</span>
              <span className="text-sm text-muted-foreground">{goal.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Target: {goal.target}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressRing() {
  const [progress, setProgress] = useState(72);

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Bullseye className="h-5 w-5 text-green-500" />
        <h3 className="font-medium">Progress Ring</h3>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <svg className="h-36 w-36 -rotate-90">
            <circle cx="68" cy="68" r="54" fill="none" stroke="currentColor" strokeWidth="12" className="text-muted" />
            <circle
              cx="68"
              cy="68"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="text-green-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold">{progress}%</span>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="w-full max-w-xs accent-green-500"
        />
      </div>
    </div>
  );
}

function AchievementBadge() {
  const [earned, setEarned] = useState([true, true, false, false, false]);

  const badges = [
    { name: "Starter", icon: Star, color: "text-yellow-500" },
    { name: "Week 1", icon: Award, color: "text-blue-500" },
    { name: "Month 1", icon: Award, color: "text-purple-500" },
    { name: "Quarter", icon: Award, color: "text-green-500" },
    { name: "Annual", icon: Award, color: "text-red-500" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Award className="h-5 w-5 text-yellow-500" />
        <h3 className="font-medium">Achievement Badge</h3>
      </div>
      <div className="flex justify-center gap-4">
        {badges.map((badge, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-2 cursor-pointer transition-opacity ${
              earned[i] ? "opacity-100" : "opacity-30"
            }`}
            onClick={() => setEarned(earned.map((e, j) => j === i ? !e : e))}
          >
            <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
              earned[i] ? "bg-yellow-100 dark:bg-yellow-900" : "bg-muted"
            }`}>
              <badge.icon className={`h-6 w-6 ${earned[i] ? badge.color : "text-muted-foreground"}`} />
            </div>
            <span className="text-xs font-medium">{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MilestoneMarker() {
  const [milestones, setMilestones] = useState([
    { name: "Launch", done: true },
    { name: "100 Users", done: true },
    { name: "500 Users", done: false },
    { name: "1000 Users", done: false },
    { name: "Profit", done: false },
  ]);

  const toggleMilestone = (index: number) => {
    setMilestones(milestones.map((m, i) => i === index ? { ...m, done: !m.done } : m));
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="h-5 w-5 text-emerald-500" />
        <h3 className="font-medium">Milestone Marker</h3>
      </div>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted" />
        <div className="space-y-4">
          {milestones.map((milestone, i) => (
            <div
              key={i}
              onClick={() => toggleMilestone(i)}
              className="relative flex items-center gap-4 cursor-pointer"
            >
              <div className={`z-10 h-12 w-12 rounded-full flex items-center justify-center border-2 ${
                milestone.done
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-background border-muted"
              }`}>
                {milestone.done ? (
                  <CheckCircle className="h-6 w-6" />
                ) : (
                  <span className="text-sm font-medium">{i + 1}</span>
                )}
              </div>
              <div className="flex-1 rounded-lg bg-muted/50 p-3">
                <p className="font-medium">{milestone.name}</p>
                <p className="text-sm text-muted-foreground">
                  {milestone.done ? "Completed" : "Pending"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ObjectiveList() {
  const [objectives, setObjectives] = useState([
    { text: "Complete project proposal", priority: "high", done: false },
    { text: "Review pull requests", priority: "medium", done: true },
    { text: "Update documentation", priority: "low", done: false },
    { text: "Fix critical bugs", priority: "high", done: false },
  ]);

  const toggleObjective = (index: number) => {
    setObjectives(objectives.map((o, i) => i === index ? { ...o, done: !o.done } : o));
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle className="h-5 w-5 text-teal-500" />
        <h3 className="font-medium">Objective List</h3>
      </div>
      <div className="space-y-2">
        {objectives.map((obj, i) => (
          <div
            key={i}
            onClick={() => toggleObjective(i)}
            className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
              obj.done ? "bg-green-50 dark:bg-green-950" : "bg-muted/50 hover:bg-muted"
            }`}
          >
            <CheckCircle className={`h-5 w-5 ${obj.done ? "text-green-500" : "text-muted-foreground"}`} />
            <div className="flex-1">
              <p className={`${obj.done ? "line-through text-muted-foreground" : ""}`}>{obj.text}</p>
            </div>
            <Badge variant={
              obj.priority === "high" ? "danger" :
              obj.priority === "medium" ? "warning" : "secondary"
            }>
              {obj.priority}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuccessRate() {
  const [total, setTotal] = useState(100);
  const [success, setSuccess] = useState(87);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Star className="h-5 w-5 text-amber-500" />
        <h3 className="font-medium">Success Rate</h3>
      </div>
      <div className="space-y-4">
        <div className="text-center">
          <p className="text-5xl font-bold text-amber-500">
            {Math.round((success / total) * 100)}%
          </p>
          <p className="text-sm text-muted-foreground">Success Rate</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-green-50 dark:bg-green-950 p-3 text-center">
            <p className="text-2xl font-bold text-green-600">{success}</p>
            <p className="text-xs text-muted-foreground">Successful</p>
          </div>
          <div className="rounded-lg bg-red-50 dark:bg-red-950 p-3 text-center">
            <p className="text-2xl font-bold text-red-600">{total - success}</p>
            <p className="text-xs text-muted-foreground">Failed</p>
          </div>
        </div>
        <div className="h-4 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all"
            style={{ width: `${(success / total) * 100}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSuccess(Math.min(total, success + 1))}
            className="flex-1 rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600"
          >
            + Success
          </button>
          <button
            onClick={() => setTotal(total + 1)}
            className="flex-1 rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
          >
            + Total
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TargetGoalPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Target Goal</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A feedback component for displaying target goals with progress rings, milestones, and achievement celebrations.
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
        <div className="grid gap-6 md:grid-cols-2">
          <ComponentPreview component="TargetGoalTargetCard" />
          <ComponentPreview component="TargetGoalTracker" />
          <ComponentPreview component="TargetGoalProgressRing" />
          <ComponentPreview component="TargetGoalAchievement" />
        </div>
        <ComponentPreview component="TargetGoalMilestone" />
        <div className="grid gap-6 md:grid-cols-2">
          <ComponentPreview component="TargetGoalObjectiveList" />
          <ComponentPreview component="TargetGoalSuccessRate" />
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
                <td className="px-4 py-3 font-mono text-xs">progress</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{'""'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{'"sm" | "md" | "lg"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"md"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showLabel</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
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
