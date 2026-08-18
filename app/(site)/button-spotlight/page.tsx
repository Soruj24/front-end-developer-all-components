"use client";

import { useState, useRef } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Button } from "@/components/ui";

const installCommand = "npx component-library@latest add button-spotlight";

const usageCode = `import { ButtonSpotlight } from "@/components/ui";

export default function Example() {
  return <ButtonSpotlight>Hover me</ButtonSpotlight>;
}`;

function SpotlightButton({ children, className = "", variant = "default" }: { children: React.ReactNode; className?: string; variant?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const base = variant === "outline" ? "border border-border bg-background hover:bg-muted" : "bg-primary text-primary-foreground hover:bg-primary/90";

  return (
    <button ref={ref} className={`relative overflow-hidden rounded-lg px-6 py-3 font-medium transition-all ${base} ${className}`} onMouseMove={handleMouseMove} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {show && <span className="pointer-events-none absolute rounded-full bg-white/20 blur-xl" style={{ left: pos.x - 50, top: pos.y - 50, width: 100, height: 100 }} />}
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export default function ButtonSpotlightPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Button Spotlight</h1>
          <Badge variant="primary">Interactive</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Buttons with spotlight hover effect that follows the cursor, creating dynamic illumination on interactive elements.
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
          <h3 className="text-lg font-medium text-foreground">Default</h3>
          <ComponentPreview id="button-spotlight-default">
            <div className="flex w-full items-center justify-center py-10">
              <SpotlightButton>Hover Me</SpotlightButton>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Variants</h3>
          <ComponentPreview id="button-spotlight-variants">
            <div className="flex w-full items-center justify-center gap-4 py-10">
              <SpotlightButton variant="default">Primary</SpotlightButton>
              <SpotlightButton variant="outline">Outline</SpotlightButton>
            </div>
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Card Spotlight</h3>
          <ComponentPreview id="button-spotlight-interactive">
            <div className="flex w-full items-center justify-center py-10">
              <div className="grid grid-cols-2 gap-4">
                <SpotlightButton>Get Started</SpotlightButton>
                <SpotlightButton variant="outline">Learn More</SpotlightButton>
                <SpotlightButton>Sign Up</SpotlightButton>
                <SpotlightButton variant="outline">Documentation</SpotlightButton>
              </div>
            </div>
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Default</th>
                <th className="px-4 py-3 text-left font-medium text-foreground">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">children</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">Yes</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">variant</td>
                <td className="px-4 py-3 text-muted-foreground">"default" | "outline"</td>
                <td className="px-4 py-3 text-muted-foreground">"default"</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">undefined</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}