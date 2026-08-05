import Image from "next/image";
import { teamMembers } from "../constants/pm-data";
import { SectionCard } from "./SectionCard";

export function TeamGrid() {
  return (
    <SectionCard title="Team Members" icon="👥">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((m) => (
          <div key={m.id} className="flex items-center gap-3 rounded-lg border border-zinc-100 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
            <div className="relative shrink-0">
              <Image src={m.image} alt={m.name} width={40} height={40} className="rounded-full object-cover" />
              {m.active && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-zinc-900" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{m.name}</p>
              <p className="text-xs text-zinc-500">{m.role}</p>
              <p className="text-[10px] text-zinc-400">{m.tasks} tasks assigned</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
