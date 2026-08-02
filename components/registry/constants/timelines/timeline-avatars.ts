import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineAvatars: RegistryEntry = entry({
    id: "timeline-avatars",
    title: "With Avatars, Icon Circles & Prices",
    description: "Emoji avatars, icon markers, and color-coded invoice amounts.",
    source: `export default function TimelineAvatars() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2">
      <div className="relative pl-10">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { name: "Alex Rivera", action: "created task", time: "2h ago", emoji: "👨💻" },
          { name: "Sarah Chen", action: "approved design", time: "4h ago", emoji: "👩🎨" },
          { name: "James Wilson", action: "merged PR", time: "6h ago", emoji: "👨🔧" },
        ].map((item, i) => (
          <div key={i} className="relative mb-4 last:mb-0">
            <span className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 text-[10px] dark:bg-zinc-800">{item.emoji}</span>
            <div className="text-xs"><span className="font-medium">{item.name}</span> {item.action}</div>
            <div className="text-[10px] text-zinc-400">{item.time}</div>
          </div>
        ))}
      </div>
      <div className="relative pl-10">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { icon: "📝", label: "Brief received" },
          { icon: "🎨", label: "Design sent" },
          { icon: "👍", label: "Client approved" },
          { icon: "🚀", label: "Project live" },
        ].map((item, i) => (
          <div key={i} className="relative mb-5 last:mb-0">
            <span className="absolute -left-6 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-100 text-[10px] dark:bg-zinc-800">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="relative pl-8">
        <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />
        {[
          { label: "Invoice #001", amount: "$1,200", status: "paid" },
          { label: "Invoice #002", amount: "$850", status: "paid" },
          { label: "Invoice #003", amount: "$2,100", status: "pending" },
          { label: "Invoice #004", amount: "$450", status: "overdue" },
        ].map((item, i) => (
          <div key={i} className="relative mb-4 last:mb-0">
            <span className={\`absolute -left-5 mt-1.5 h-2.5 w-2.5 rounded-full \${
              item.status === "paid" ? "bg-success-soft0" : item.status === "pending" ? "bg-amber-400" : "bg-danger"
            }\`} />
            <div className="flex items-center justify-between">
              <span className="text-xs">{item.label}</span>
              <span className={\`text-xs font-medium \${
                item.status === "paid" ? "text-success" : item.status === "pending" ? "text-warning" : "text-danger"
              }\`}>{item.amount}</span>
            </div>
            <span className="text-[10px] capitalize text-zinc-400">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}`,
  });
