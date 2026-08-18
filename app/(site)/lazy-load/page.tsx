"use client";
import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Image, Loader, Eye, Settings, Download, Zap, Clock } from "lucide-react";

const installCommand = `npx component-library@latest add lazy-load`;
const usageCode = `import { LazyLoad } from '@/components/lazy-load';

export default function Gallery() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <LazyLoad placeholder={<ImageSkeleton />}>
        <img src="/hero.jpg" alt="Hero" className="w-full h-64 object-cover rounded-xl" />
      </LazyLoad>
      <LazyLoad threshold={0.1} rootMargin="100px">
        <HeavyComponent />
      </LazyLoad>
    </div>
  );
}`;

  function ImageLazy() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Image className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">ImageLazy</h3>
          <Badge variant="outline" className="ml-auto">Demo 1</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Image className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">ImageLazy demonstration</p>
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
            {JSON.stringify({ component: 'ImageLazy', category: 'Media', icon: 'Image' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function ComponentLazy() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Loader className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">ComponentLazy</h3>
          <Badge variant="outline" className="ml-auto">Demo 2</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Loader className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">ComponentLazy demonstration</p>
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
            {JSON.stringify({ component: 'ComponentLazy', category: 'Media', icon: 'Loader' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function ListLazy() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Eye className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">ListLazy</h3>
          <Badge variant="outline" className="ml-auto">Demo 3</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Eye className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">ListLazy demonstration</p>
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
            {JSON.stringify({ component: 'ListLazy', category: 'Media', icon: 'Eye' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function IntersectionLazy() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">IntersectionLazy</h3>
          <Badge variant="outline" className="ml-auto">Demo 4</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Settings className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">IntersectionLazy demonstration</p>
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
            {JSON.stringify({ component: 'IntersectionLazy', category: 'Media', icon: 'Settings' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function PlaceholderLazy() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Download className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">PlaceholderLazy</h3>
          <Badge variant="outline" className="ml-auto">Demo 5</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Download className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">PlaceholderLazy demonstration</p>
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
            {JSON.stringify({ component: 'PlaceholderLazy', category: 'Media', icon: 'Download' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function BlurLazy() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">BlurLazy</h3>
          <Badge variant="outline" className="ml-auto">Demo 6</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Zap className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">BlurLazy demonstration</p>
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
            {JSON.stringify({ component: 'BlurLazy', category: 'Media', icon: 'Zap' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

  function PriorityLazy() {
    const [open, setOpen] = useState(false);
    return (
      <div className="rounded-xl border bg-background p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">PriorityLazy</h3>
          <Badge variant="outline" className="ml-auto">Demo 7</Badge>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">PriorityLazy demonstration</p>
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
            {JSON.stringify({ component: 'PriorityLazy', category: 'Media', icon: 'Clock' }, null, 2)}
          </div>
        )}
      </div>
    );
  }

export default function LazyLoadPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Lazy Load</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A lazy loading wrapper that defers rendering of off-screen content until it enters the viewport.</p>
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
          <p className="mt-1 text-sm text-muted-foreground">Interactive demonstrations of Lazy Load variants.</p>
        </div>
        <ComponentPreview id="lazy-load">
          <div className="w-full p-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ImageLazy />
        <ComponentLazy />
        <ListLazy />
        <IntersectionLazy />
        <PlaceholderLazy />
        <BlurLazy />
        <PriorityLazy />
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
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">children</td><td className="px-4 py-3 text-muted-foreground">ReactNode</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">threshold</td><td className="px-4 py-3 text-muted-foreground">number</td><td className="px-4 py-3 text-muted-foreground">0</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">rootMargin</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">0px</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">placeholder</td><td className="px-4 py-3 text-muted-foreground">ReactNode</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
