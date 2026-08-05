import Image from "next/image";
import { projects } from "../constants/pm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function ProjectGrid() {
  return (
    <SectionCard title="Projects" icon="📁">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-lg border border-zinc-200 transition-colors hover:border-blue-200 dark:border-zinc-800 dark:hover:border-blue-800">
            <div className="relative h-32">
              <Image src={p.image} alt={p.name} fill className="object-cover" sizes="400px" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">{p.name}</h3>
                <Badge variant={p.status}>{p.status}</Badge>
              </div>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Deadline: {p.deadline}</span>
                <Badge variant={p.priority}>{p.priority}</Badge>
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">{p.completed}/{p.tasks} tasks</span>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{p.progress}%</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div className="h-full rounded-full bg-blue-500" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs text-zinc-500">
                <span>👥 {p.team} members</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
