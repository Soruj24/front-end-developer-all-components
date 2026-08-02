import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardList: RegistryEntry = entry({
    id: "card-list",
    title: "List Cards",
    description: "Feature checklists and activity feeds inside a card.",
    source: `const features = [
  "Unlimited projects",
  "Real-time collaboration",
  "Version control",
  "API access",
  "Priority support",
];

const notifications = [
  { icon: "📌", text: "New comment on your post", time: "2m ago" },
  { icon: "⭐", text: "You earned a new badge", time: "1h ago" },
  { icon: "👤", text: "Sarah followed you", time: "3h ago" },
];

export default function CardList() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
        <h3 className="font-semibold">Features List</h3>
        <ul className="mt-3 space-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <svg className="h-4 w-4 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
        <h3 className="font-semibold">Notification List</h3>
        <div className="mt-3 space-y-3">
          {notifications.map((n, i) => (
            <div key={i} className="flex items-start gap-3 border-b border-black/[.04] pb-3 last:border-0 last:pb-0 dark:border-white/[.06]">
              <span>{n.icon}</span>
              <div className="flex-1">
                <p className="text-sm">{n.text}</p>
                <p className="text-xs text-zinc-400">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  });
