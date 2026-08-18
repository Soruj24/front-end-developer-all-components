"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Lightbulb,
  Sparkles,
  Zap,
  Star,
  MessageCircle,
  BookOpen,
  Target,
} from "lucide-react";

const installCommand = `npm install lucide-react`;

const usageCode = `import { Lightbulb } from "lucide-react";

export function TipCard() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <Lightbulb className="h-5 w-5 text-yellow-500" />
      <p>Always write tests before implementation.</p>
    </div>
  );
}`;

function TipCardDemo() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-3">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h4 className="font-semibold text-sm">Pro Tip</h4>
        <Badge variant="secondary">Best Practice</Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        Always write tests before implementation. Test-driven development helps
        clarify requirements and reduces bugs in production code.
      </p>
    </div>
  );
}

function SuggestionAlertDemo() {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950 p-4 flex items-start gap-3">
      <Sparkles className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
      <div>
        <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100">
          Suggestion
        </h4>
        <p className="text-sm text-blue-700 dark:text-blue-300">
          Consider using a debounce hook for search inputs to reduce API calls
          and improve performance.
        </p>
      </div>
    </div>
  );
}

function IdeaGeneratorDemo() {
  const ideas = [
    { icon: Zap, text: "Build a component library with Storybook" },
    { icon: Target, text: "Create a reusable form validation hook" },
    { icon: Star, text: "Implement a theme switcher with system preference detection" },
    { icon: BookOpen, text: "Write an interactive tutorial for new contributors" },
  ];
  const [index, setIndex] = useState(0);

  const current = ideas[index];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h4 className="font-semibold text-sm">Idea Generator</h4>
      </div>
      <div className="flex items-center gap-3 p-4 rounded-md bg-muted">
        <current.icon className="h-5 w-5 text-primary shrink-0" />
        <p className="text-sm">{current.text}</p>
      </div>
      <button
        onClick={() => setIndex((i) => (i + 1) % ideas.length)}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        <Sparkles className="h-4 w-4" />
        Generate Idea
      </button>
    </div>
  );
}

function ProTipsListDemo() {
  const tips = [
    "Use semantic HTML elements for better accessibility.",
    "Extract reusable logic into custom hooks early.",
    "Keep components small and focused on a single responsibility.",
    "Use TypeScript strict mode from the start of your project.",
  ];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-3">
      <div className="flex items-center gap-2">
        <BookOpen className="h-5 w-5 text-indigo-500" />
        <h4 className="font-semibold text-sm">Pro Tips</h4>
      </div>
      <ul className="space-y-2">
        {tips.map((tip, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuickTipDemo() {
  return (
    <div className="inline-flex items-center gap-2 rounded-md bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 px-3 py-1.5">
      <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
      <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
        Quick Tip: Use CSS Grid for complex layouts.
      </span>
    </div>
  );
}

function InsightCardDemo() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-3">
      <div className="flex items-center gap-2">
        <Target className="h-5 w-5 text-emerald-500" />
        <h4 className="font-semibold text-sm">Insight</h4>
        <Badge variant="outline">Analytics</Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        Components used most frequently in production are typically simple,
        composable, and have a clear single purpose. Focus on building small
        building blocks rather than monolithic widgets.
      </p>
    </div>
  );
}

function CreativePromptDemo() {
  return (
    <div className="rounded-lg border bg-card p-6 space-y-3">
      <div className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-purple-500" />
        <h4 className="font-semibold text-sm">Creative Prompt</h4>
      </div>
      <div className="rounded-md bg-muted p-4">
        <p className="text-sm italic text-muted-foreground">
          "Design a dashboard widget that displays real-time system metrics with
          animated sparkline charts and configurable alert thresholds."
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Badge>Dashboard</Badge>
        <Badge>Charts</Badge>
        <Badge>Real-time</Badge>
        <Badge>Animation</Badge>
      </div>
    </div>
  );
}

export default function LightbulbIdeaPage() {
  return (
    <div className="container max-w-4xl py-10 space-y-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Lightbulb className="h-8 w-8 text-yellow-500" />
          Lightbulb & Idea
        </h1>
        <p className="text-muted-foreground">
          Display tips, suggestions, insights, and creative prompts with
          expressive icons and clear visual hierarchy.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold">Examples</h2>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Tip Card</h3>
          <ComponentPreview>
            <TipCardDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Suggestion Alert</h3>
          <ComponentPreview>
            <SuggestionAlertDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Idea Generator</h3>
          <ComponentPreview>
            <IdeaGeneratorDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Pro Tips List</h3>
          <ComponentPreview>
            <ProTipsListDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Quick Tip</h3>
          <ComponentPreview>
            <QuickTipDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Insight Card</h3>
          <ComponentPreview>
            <InsightCardDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Creative Prompt</h3>
          <ComponentPreview>
            <CreativePromptDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted">
                <th className="px-4 py-2 text-left font-medium">Prop</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Default</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono text-xs">variant</td>
                <td className="px-4 py-2 text-muted-foreground">string</td>
                <td className="px-4 py-2 text-muted-foreground">"default"</td>
                <td className="px-4 py-2 text-muted-foreground">Visual style of the component</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono text-xs">size</td>
                <td className="px-4 py-2 text-muted-foreground">string</td>
                <td className="px-4 py-2 text-muted-foreground">"md"</td>
                <td className="px-4 py-2 text-muted-foreground">Size of the component</td>
              </tr>
              <tr className="border-t">
                <td className="px-4 py-2 font-mono text-xs">className</td>
                <td className="px-4 py-2 text-muted-foreground">string</td>
                <td className="px-4 py-2 text-muted-foreground">""</td>
                <td className="px-4 py-2 text-muted-foreground">Additional CSS classes to apply</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
