"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Radio } from "lucide-react";

const installCommand = `npx component-library@latest add radio-tune`;
const usageCode = `import { RadioTune } from "@/components/radio-tune";

<RadioTune
  stations={radioStations}
  onTune={(station) => handleStation(station)}
/>`;

export default function RadioTunePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Radio Tune</h1>
          <Badge variant="primary">Media</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A radio tuner component for selecting stations, adjusting frequency, and displaying radio playback information.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Radio</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="flex items-center gap-3">
              <Radio className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium">FM 98.5</p>
                <p className="text-xs text-muted-foreground">Jazz FM</p>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Station List</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm space-y-2">
            {[
              { freq: "98.5", name: "Jazz FM", active: true },
              { freq: "101.3", name: "Rock Radio", active: false },
              { freq: "104.7", name: "Pop Hits", active: false },
            ].map((station) => (
              <div key={station.freq} className={`flex items-center gap-3 rounded-lg border p-3 ${station.active ? "border-primary bg-primary/5" : ""}`}>
                <Radio className={`h-4 w-4 ${station.active ? "text-primary" : "text-muted-foreground"}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">FM {station.freq}</p>
                  <p className="text-xs text-muted-foreground">{station.name}</p>
                </div>
                {station.active && <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />}
              </div>
            ))}
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Frequency Dial</h2>
        <ComponentPreview>
          <div className="flex items-center justify-center p-8">
            <div className="relative h-24 w-48 rounded-lg border bg-card">
              <div className="absolute bottom-2 left-0 right-0 h-px bg-muted" />
              {[88, 92, 96, 100, 104, 108].map((freq) => (
                <div key={freq} className="absolute bottom-0 flex flex-col items-center" style={{ left: `${((freq - 88) / 20) * 100}%` }}>
                  <div className="h-2 w-px bg-muted" />
                  <span className="mt-1 text-[8px] text-muted-foreground">{freq}</span>
                </div>
              ))}
              <div className="absolute bottom-4 left-[50%] h-4 w-px bg-primary" />
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
                <td className="px-4 py-3 font-mono text-xs">stations</td>
                <td className="px-4 py-3 text-muted-foreground">RadioStation[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onTune</td>
                <td className="px-4 py-3 text-muted-foreground">(station: RadioStation) =&gt; void</td>
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
