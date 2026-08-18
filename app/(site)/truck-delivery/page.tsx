"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Truck } from "lucide-react";

const installCommand = `npx component-library@latest add truck-delivery`;
const usageCode = `import { TruckDelivery } from "@/components/_truck-delivery";

<TruckDelivery status="in-transit" trackingId="TRK-29481" />`;

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-warning/10 text-warning",
    "in-transit": "bg-primary/10 text-primary",
    delivered: "bg-success/10 text-success",
    failed: "bg-danger/10 text-danger",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[status] || colors.pending}`}>
      {status}
    </span>
  );
}

function TrackingCard({ id, status, origin, dest, eta }: { id: string; status: string; origin: string; dest: string; eta: string }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{id}</span>
        </div>
        <StatusBadge status={status} />
      </div>
      <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
        <div><span className="block font-medium text-foreground">From</span>{origin}</div>
        <div><span className="block font-medium text-foreground">To</span>{dest}</div>
        <div><span className="block font-medium text-foreground">ETA</span>{eta}</div>
      </div>
    </div>
  );
}

function TimelineStep({ label, time, done }: { label: string; time: string; done: boolean }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`mt-1 h-3 w-3 rounded-full ${done ? "bg-success" : "bg-muted"}`} />
      <div>
        <p className={`text-sm ${done ? "font-medium text-foreground" : "text-muted-foreground"}`}>{label}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}

export default function TruckDeliveryPage() {
  const shipments = [
    { id: "TRK-29481", status: "in-transit", origin: "New York", dest: "Boston", eta: "2h 15m" },
    { id: "TRK-29482", status: "delivered", origin: "Chicago", dest: "Detroit", eta: "Delivered" },
    { id: "TRK-29483", status: "pending", origin: "LA", dest: "SF", eta: "Pending" },
  ];

  const timeline = [
    { label: "Order Placed", time: "Jan 15, 9:00 AM", done: true },
    { label: "Picked Up", time: "Jan 15, 2:30 PM", done: true },
    { label: "In Transit", time: "Jan 16, 8:00 AM", done: true },
    { label: "Out for Delivery", time: "Jan 17, 10:00 AM", done: false },
    { label: "Delivered", time: "—", done: false },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Truck Delivery</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Track and display delivery shipments with status badges, timeline steps, and tracking cards.
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

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Tracking Cards</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {shipments.map((s) => (
            <TrackingCard key={s.id} {...s} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Delivery Timeline</h2>
        <div className="rounded-lg border border-border p-4">
          <div className="flex flex-col gap-4">
            {timeline.map((t) => (
              <TimelineStep key={t.label} {...t} />
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Status Variants</h2>
        <div className="flex flex-wrap gap-2">
          {["pending", "in-transit", "delivered", "failed"].map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
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
                <td className="px-4 py-3 font-mono text-xs">status</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;pending&quot; | &quot;in-transit&quot; | &quot;delivered&quot; | &quot;failed&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;pending&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">trackingId</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">origin</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">destination</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
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
