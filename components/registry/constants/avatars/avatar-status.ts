import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const avatarStatus: RegistryEntry = entry({
    id: "avatar-status",
    title: "Status Indicator",
    description: "Presence dot positioned on the avatar ring.",
    source: `import { useState } from "react";

const statuses = [
  { key: "online", label: "Online", className: "bg-green-500" },
  { key: "offline", label: "Offline", className: "bg-zinc-400" },
  { key: "away", label: "Away", className: "bg-yellow-500" },
  { key: "busy", label: "Busy", className: "bg-red-500" },
];

export default function AvatarStatus() {
  const [status, setStatus] = useState("online");
  const active = statuses.find((s) => s.key === status);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-8">
        {["sm", "md", "lg"].map((size, i) => (
          <div key={size} className="relative">
            <div
              className={
                i === 0
                  ? "flex h-8 w-8 items-center justify-center rounded-full bg-zinc-200 text-xs font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
                  : i === 1
                    ? "flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-sm font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
                    : "flex h-14 w-14 items-center justify-center rounded-full bg-zinc-200 text-lg font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
              }
            >
              JD
            </div>
            <span className={\`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white dark:ring-zinc-900 \${active?.className}\`} />
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {statuses.map((s) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setStatus(s.key)}
            className={
              status === s.key
                ? "rounded-full bg-zinc-900 px-3 py-1 text-sm text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "rounded-full bg-zinc-100 px-3 py-1 text-sm hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            }
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}`,
  });
