"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Type, AlignLeft, AlignCenter, AlignRight, MoreHorizontal, Eye, EyeOff } from "lucide-react";

const installCommand = `npx component-library@latest add line-clamp`;
const usageCode = `import { LineClamp } from '@/components/line-clamp';

export default function ArticlePreview() {
  const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="max-w-md space-y-4">
      <LineClamp lines={2} expandable>{longText}</LineClamp>
      <LineClamp lines={3} expandable expandText="Read more" collapseText="Show less">
        {longText}
      </LineClamp>
    </div>
  );
}`;

  function SingleLine() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Type className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">SingleLine</h3>
          <Badge variant="outline" className="ml-auto">Demo 1</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Type className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">SingleLine demonstration</p>
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
            {JSON.stringify({ component: 'SingleLine', category: 'Typography', icon: 'Type' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function TwoLines() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <AlignLeft className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">TwoLines</h3>
          <Badge variant="outline" className="ml-auto">Demo 2</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <AlignLeft className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">TwoLines demonstration</p>
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
            {JSON.stringify({ component: 'TwoLines', category: 'Typography', icon: 'AlignLeft' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function ThreeLines() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <AlignCenter className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">ThreeLines</h3>
          <Badge variant="outline" className="ml-auto">Demo 3</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <AlignCenter className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">ThreeLines demonstration</p>
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
            {JSON.stringify({ component: 'ThreeLines', category: 'Typography', icon: 'AlignCenter' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function FourLines() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <AlignRight className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">FourLines</h3>
          <Badge variant="outline" className="ml-auto">Demo 4</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <AlignRight className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">FourLines demonstration</p>
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
            {JSON.stringify({ component: 'FourLines', category: 'Typography', icon: 'AlignRight' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function WithEllipsis() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <MoreHorizontal className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">WithEllipsis</h3>
          <Badge variant="outline" className="ml-auto">Demo 5</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <MoreHorizontal className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">WithEllipsis demonstration</p>
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
            {JSON.stringify({ component: 'WithEllipsis', category: 'Typography', icon: 'MoreHorizontal' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function Expandable() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Expandable</h3>
          <Badge variant="outline" className="ml-auto">Demo 6</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Eye className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Expandable demonstration</p>
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
            {JSON.stringify({ component: 'Expandable', category: 'Typography', icon: 'Eye' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function ResponsiveClamp() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <EyeOff className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">ResponsiveClamp</h3>
          <Badge variant="outline" className="ml-auto">Demo 7</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <EyeOff className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">ResponsiveClamp demonstration</p>
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
            {JSON.stringify({ component: 'ResponsiveClamp', category: 'Typography', icon: 'EyeOff' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

export default function LineClampPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Line Clamp</h1>
          <Badge variant="primary">Typography</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A text truncation component that limits visible lines with a fade-out effect and expandable toggle.</p>
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
          <p className="mt-1 text-sm text-muted-foreground">Interactive demonstrations of Line Clamp variants.</p>
        </div>
        <ComponentPreview id="line-clamp">
          <div className="w-full p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SingleLine />
        <TwoLines />
        <ThreeLines />
        <FourLines />
        <WithEllipsis />
        <Expandable />
        <ResponsiveClamp />
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
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">children</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">lines</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">3</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">expandable</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">expandText</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">"Read more"</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">collapseText</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">"Show less"</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
