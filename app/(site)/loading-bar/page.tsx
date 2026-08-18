"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Loader, BarChart3, Activity, Zap, Settings, Play, Pause } from "lucide-react";

const installCommand = `npx component-library@latest add loading-bar`;
const usageCode = `import { LoadingBar } from '@/components/loading-bar';

export default function AppLayout() {
  const [progress, setProgress] = useState(0);

  return (
    <>
      <LoadingBar value={progress} className="fixed top-0 left-0 right-0 z-50" />
      <LoadingBar variant="indeterminate" className="h-1" />
      <button onClick={() => setProgress(p => Math.min(p + 10, 100))}>
        Increment Progress
      </button>
    </>
  );
}`;

  function TopBar() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Loader className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">TopBar</h3>
          <Badge variant="outline" className="ml-auto">Demo 1</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Loader className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">TopBar demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'TopBar', category: 'Feedback', icon: 'Loader' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function InlineBar() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">InlineBar</h3>
          <Badge variant="outline" className="ml-auto">Demo 2</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">InlineBar demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'InlineBar', category: 'Feedback', icon: 'BarChart3' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function CircularBar() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">CircularBar</h3>
          <Badge variant="outline" className="ml-auto">Demo 3</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">CircularBar demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'CircularBar', category: 'Feedback', icon: 'Activity' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function StepBar() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">StepBar</h3>
          <Badge variant="outline" className="ml-auto">Demo 4</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Zap className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">StepBar demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'StepBar', category: 'Feedback', icon: 'Zap' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function ProgressBar() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">ProgressBar</h3>
          <Badge variant="outline" className="ml-auto">Demo 5</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Settings className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">ProgressBar demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'ProgressBar', category: 'Feedback', icon: 'Settings' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function IndeterminateBar() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Play className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">IndeterminateBar</h3>
          <Badge variant="outline" className="ml-auto">Demo 6</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Play className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">IndeterminateBar demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'IndeterminateBar', category: 'Feedback', icon: 'Play' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function ColorBar() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Pause className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">ColorBar</h3>
          <Badge variant="outline" className="ml-auto">Demo 7</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Pause className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">ColorBar demonstration</p>
            <button 
              onClick={() => setOpen(!open)}
              className="mt-2 text-xs text-primary hover:underline"
            >
              {open ? 'Hide' : 'Show'} Details
            </button>
          </div>
        </div>
        {open && (
          <div className="rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground font-mono">
            {JSON.stringify({ component: 'ColorBar', category: 'Feedback', icon: 'Pause' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

export default function LoadingBarPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Loading Bar</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An animated loading bar component with indeterminate and determinate modes for page or content loading states.</p>
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
          <p className="mt-1 text-sm text-muted-foreground">Interactive demonstrations of Loading Bar variants.</p>
        </div>
        <ComponentPreview id="loading-bar">
          <div className="w-full p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <TopBar />
        <InlineBar />
        <CircularBar />
        <StepBar />
        <ProgressBar />
        <IndeterminateBar />
        <ColorBar />
            </div>
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
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">value</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">indeterminate</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">variant</td><td className="px-4 py-3 text-muted-foreground">"default" | "gradient" | "striped"</td><td className="px-4 py-3 text-muted-foreground">"default"</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">size</td><td className="px-4 py-3 text-muted-foreground">"sm" | "md" | "lg"</td><td className="px-4 py-3 text-muted-foreground">"md"</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
