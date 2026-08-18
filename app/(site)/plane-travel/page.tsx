"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Plane } from "lucide-react";

const installCommand = `npx component-library@latest add plane-travel`;
const usageCode = `import { PlaneTravel } from "@/components/plane-travel";

<PlaneTravel
  from="New York"
  to="London"
  status="On Time"
/>`;

export default function PlaneTravelPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Plane Travel</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A travel data display component for showing flight information, routes, and travel status with an airplane motif.</p>
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Flight Card</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">New York</p>
                <p className="text-xs text-muted-foreground">JFK</p>
              </div>
              <div className="flex flex-col items-center">
                <Plane className="h-5 w-5 text-primary" />
                <div className="mt-1 h-px w-20 bg-muted" />
                <p className="mt-1 text-xs text-muted-foreground">Direct</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">London</p>
                <p className="text-xs text-muted-foreground">LHR</p>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">With Status</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm rounded-lg border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm font-medium">On Time</span>
              </div>
              <span className="text-xs text-muted-foreground">Gate B12</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="font-mono text-lg font-semibold">08:30</p>
                <p className="text-xs text-muted-foreground">Departure</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg font-semibold">20:45</p>
                <p className="text-xs text-muted-foreground">Arrival</p>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Flight List</h2>
        <ComponentPreview>
          <div className="w-full max-w-sm space-y-2">
            {[
              { from: "JFK", to: "LHR", time: "08:30", status: "On Time" },
              { from: "SFO", to: "NRT", time: "11:15", status: "Delayed" },
              { from: "LAX", to: "CDG", time: "14:00", status: "Boarding" },
            ].map((flight) => (
              <div key={flight.time} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-2">
                  <Plane className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono text-sm">{flight.from} - {flight.to}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{flight.time}</span>
                  <span className={`text-xs ${flight.status === "On Time" ? "text-green-600" : flight.status === "Delayed" ? "text-red-600" : "text-blue-600"}`}>{flight.status}</span>
                </div>
              </div>
            ))}
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
                <td className="px-4 py-3 font-mono text-xs">from</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">to</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">status</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
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
