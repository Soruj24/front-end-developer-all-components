import Image from "next/image";
import { activityFeed } from "../constants/pm-data";
import { SectionCard } from "./SectionCard";

const typeColors: Record<string, string> = {
  done: "bg-green-500",
  comment: "bg-blue-500",
  pr: "bg-purple-500",
  file: "bg-amber-500",
  bug: "bg-red-500",
  deploy: "bg-cyan-500",
  sprint: "bg-indigo-500",
  update: "bg-zinc-400",
};

export function ActivityFeedList() {
  return (
    <SectionCard title="Activity Feed" icon="⚡">
      <div className="relative space-y-0">
        {activityFeed.map((e, i) => (
          <div key={e.id} className="relative flex gap-4 pb-5">
            {i < activityFeed.length - 1 && <div className="absolute left-[11px] top-5 h-full w-0.5 bg-zinc-100 dark:bg-zinc-800" />}
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${typeColors[e.type]}`}>
              <div className="h-2 w-2 rounded-full bg-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Image src={e.user.image} alt={e.user.name} width={20} height={20} className="rounded-full object-cover" />
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{e.user.name}</span> {e.action} <span className="font-medium text-zinc-900 dark:text-zinc-100">{e.target}</span>
                </p>
              </div>
              <p className="mt-0.5 text-xs text-zinc-400">{e.time}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
