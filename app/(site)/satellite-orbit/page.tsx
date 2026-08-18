"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Orbit } from "lucide-react";

const installCommand = `npx component-library@latest add satellite-orbit`;
const usageCode = `import { SatelliteOrbit } from "@/components/satellite-orbit";

<SatelliteOrbit
  satellites={satelliteData}
  onSatSelect={(sat) => handleSelect(sat)}
/>`;

export default function SatelliteOrbitPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Satellite Orbit</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">An animated satellite orbit visualization for displaying orbiting objects, celestial paths, and circular motion effects.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Orbit</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-8">
            <div className="relative h-32 w-32">
              <div className="absolute inset-0 rounded-full border border-muted" />
              <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
              <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500" style={{ animation: "spin 4s linear infinite" }} />
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Multiple Orbits</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-8">
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 rounded-full border border-muted" />
              <div className="absolute inset-6 rounded-full border border-muted/60" />
              <div className="absolute inset-12 rounded-full border border-muted/30" />
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
              <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500" style={{ animation: "spin 4s linear infinite" }} />
              <div className="absolute left-[75%] top-[25%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500" style={{ animation: "spin 6s linear infinite" }} />
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Orbit Path</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-8">
            <div className="relative h-24 w-48">
              <div className="absolute bottom-0 left-0 right-0 h-px bg-muted" />
              <div className="absolute bottom-0 left-0 h-1 w-1 rounded-full bg-primary" style={{ animation: "moveX 3s linear infinite" }} />
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">satellites</td>
                <td className="px-4 py-3 text-muted-foreground">Satellite[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">speed</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">1</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onSatSelect</td>
                <td className="px-4 py-3 text-muted-foreground">(sat: Satellite) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
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
