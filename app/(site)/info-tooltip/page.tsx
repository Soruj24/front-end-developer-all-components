"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Info, HelpCircle, AlertCircle, CheckCircle, Lightbulb, MessageCircle, BookOpen } from "lucide-react";

const installCommand = `npx component-library@latest add info-tooltip`;
const usageCode = `import { InfoTooltip } from "@/components/ui/info-tooltip";

<InfoTooltip content="Your account settings">
  <button>Settings</button>
</InfoTooltip>`;

function InfoTip() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative group inline-flex">
        <button className="inline-flex items-center gap-1.5 rounded-md border bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors">
          <Info className="h-4 w-4 text-blue-500" />
          Hover for info
        </button>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-lg border bg-popover p-2 text-sm text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
          This provides additional context about the feature.
        </div>
      </div>
    </div>
  );
}

function HelpTip() {
  return (
    <div className="relative group inline-flex">
      <button className="inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-sm font-medium hover:bg-muted/80 transition-colors">
        <HelpCircle className="h-4 w-4 text-muted-foreground" />
        Need help?
      </button>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <p className="font-medium mb-1">Help Center</p>
        <p className="text-muted-foreground text-xs">Search our documentation or contact support for assistance.</p>
      </div>
    </div>
  );
}

function WarningTip() {
  return (
    <div className="relative group inline-flex">
      <span className="inline-flex items-center gap-1.5 rounded-md border border-yellow-200 bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
        <AlertCircle className="h-4 w-4" />
        Warning
      </span>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <p className="font-medium text-destructive mb-1">Caution Required</p>
        <p className="text-muted-foreground text-xs">This action cannot be undone. Please review before proceeding.</p>
      </div>
    </div>
  );
}

function SuccessTip() {
  return (
    <div className="relative group inline-flex">
      <span className="inline-flex items-center gap-1.5 rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
        <CheckCircle className="h-4 w-4" />
        Saved
      </span>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <p className="font-medium text-green-600 dark:text-green-400 mb-1">All Set!</p>
        <p className="text-muted-foreground text-xs">Your changes have been saved successfully.</p>
      </div>
    </div>
  );
}

function FormulaTip() {
  return (
    <div className="relative group inline-flex">
      <code className="inline-flex items-center gap-1.5 rounded-md bg-muted px-3 py-1.5 text-sm font-mono hover:bg-muted/80 transition-colors cursor-help">
        E = mc&sup2;
      </code>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <p className="font-medium mb-1">Mass-Energy Equivalence</p>
        <p className="text-muted-foreground text-xs">Einstein&apos;s famous equation relating energy (E) to mass (m) times the speed of light (c) squared.</p>
      </div>
    </div>
  );
}

function ContextTip() {
  return (
    <div className="relative group inline-flex">
      <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary cursor-help transition-colors">
        <MessageCircle className="h-4 w-4" />
        Context
      </span>
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="font-medium">Learn more</span>
        </div>
        <p className="text-muted-foreground text-xs">This component uses CSS transforms and transitions to create smooth tooltip animations.</p>
      </div>
    </div>
  );
}

function GuidedTip() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>Got it! Tooltip dismissed.</span>
      </div>
    );
  }

  return (
    <div className="relative inline-flex">
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-lg border bg-popover p-3 text-sm text-popover-foreground shadow-md z-50">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">Pro Tip</span>
          </div>
          <button onClick={() => setDismissed(true)} className="text-xs text-muted-foreground hover:text-foreground">Dismiss</button>
        </div>
        <p className="text-muted-foreground text-xs">Press <kbd className="rounded border bg-muted px-1 py-0.5 text-[10px] font-mono">Ctrl+K</kbd> to open the command palette anytime.</p>
      </div>
      <div className="h-8" />
    </div>
  );
}

export default function InfoTooltipPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Info Tooltip</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A contextual tooltip component that displays helpful information on hover with smooth fade animations.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2><p className="mt-1 text-sm text-muted-foreground">Different tooltip variants for various contexts.</p></div>
        <ComponentPreview id="info-tooltip"><div className="w-full p-4"><div className="flex items-center justify-center gap-12 py-8"><InfoTip /></div></div></ComponentPreview>
        <ComponentPreview id="info-tooltip-help"><div className="w-full p-4"><div className="flex items-center justify-center gap-12 py-8"><HelpTip /></div></div></ComponentPreview>
        <ComponentPreview id="info-tooltip-warning"><div className="w-full p-4"><div className="flex items-center justify-center gap-12 py-8"><WarningTip /></div></div></ComponentPreview>
        <ComponentPreview id="info-tooltip-success"><div className="w-full p-4"><div className="flex items-center justify-center gap-12 py-8"><SuccessTip /></div></div></ComponentPreview>
        <ComponentPreview id="info-tooltip-formula"><div className="w-full p-4"><div className="flex items-center justify-center gap-12 py-8"><FormulaTip /></div></div></ComponentPreview>
        <ComponentPreview id="info-tooltip-context"><div className="w-full p-4"><div className="flex items-center justify-center gap-12 py-8"><ContextTip /></div></div></ComponentPreview>
        <ComponentPreview id="info-tooltip-guided"><div className="w-full p-4"><div className="flex items-center justify-center gap-12 py-8"><GuidedTip /></div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">content</td><td className="px-4 py-3 text-muted-foreground">ReactNode</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">children</td><td className="px-4 py-3 text-muted-foreground">ReactNode</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">position</td><td className="px-4 py-3 text-muted-foreground">{"top"} | {"bottom"} | {"left"} | {"right"}</td><td className="px-4 py-3 text-muted-foreground">{"top"}</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">delay</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">200</td><td className="px-4 py-3">No</td></tr>
        <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
