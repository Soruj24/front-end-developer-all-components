import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineStatus: RegistryEntry = entry({
    id: "timeline-status",
    title: "Status Dots, Order Tracking & Checklist",
    description: "Done/active/pending dots, order states, and a strikethrough checklist.",
    source: `export default function TimelineStatus() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2">
      <div className="relative pl-10">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { label: "Order placed", status: "done", time: "2 hours ago" },
          { label: "Payment confirmed", status: "done", time: "1 hour ago" },
          { label: "Preparing shipment", status: "active", time: "30 min ago" },
          { label: "Out for delivery", status: "pending", time: "—" },
        ].map((item, i) => (
          <div key={i} className="relative mb-4 last:mb-0">
            <span className={\`absolute -left-6 mt-1 h-3 w-3 rounded-full \${
              item.status === "done" ? "bg-success-soft0" : item.status === "active" ? "bg-blue-500 ring-2 ring-blue-200 dark:ring-blue-800" : "border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black"
            }\`} />
            <div className="text-xs font-medium">{item.label}</div>
            <div className="text-[10px] text-zinc-400">{item.time}</div>
          </div>
        ))}
      </div>
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { label: "Order placed", done: true },
          { label: "Payment confirmed", done: true },
          { label: "Processing", done: true },
          { label: "Shipped", done: false, active: true },
          { label: "Delivered", done: false },
        ].map((item, i) => (
          <div key={i} className="relative mb-4 last:mb-0">
            <span className={\`absolute -left-5 mt-1 h-2.5 w-2.5 rounded-full \${
              item.done ? "bg-success-soft0" : item.active ? "bg-blue-500 ring-2 ring-blue-200 dark:ring-blue-800 animate-pulse" : "border-2 border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black"
            }\`} />
            <div className="flex items-center gap-2">
              <span className={\`text-xs \${item.done ? "font-medium text-zinc-950 dark:text-zinc-50" : item.active ? "font-medium text-primary" : "text-zinc-400"}\`}>{item.label}</span>
              {item.done && <span className="text-[10px] text-success">✓</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { label: "Choose template", done: true },
          { label: "Customize design", done: true },
          { label: "Add content", done: false },
          { label: "Publish", done: false },
        ].map((item, i) => (
          <div key={i} className="relative mb-4 last:mb-0">
            <span className={\`absolute -left-5 mt-0.5 flex h-3 w-3 items-center justify-center rounded-full border-2 \${
              item.done ? "border-success bg-success-soft0" : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black"
            }\`}>
              {item.done && <span className="text-[7px] text-white">✓</span>}
            </span>
            <span className={\`text-xs \${item.done ? "text-zinc-400 line-through" : "font-medium"}\`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  });
