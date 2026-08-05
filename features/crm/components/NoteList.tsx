import { notes } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function NoteList() {
  return (
    <SectionCard title="Notes Section" description="Pinned and recent notes">
      <div className="space-y-3">
        {notes.map((n) => (
          <div key={n.id} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{n.title}</h3>
                {n.pinned && <span className="text-xs">📌</span>}
              </div>
              <span className="text-xs text-zinc-400">{n.date}</span>
            </div>
            <p className="mt-2 text-sm text-zinc-500">{n.content}</p>
            <p className="mt-2 text-xs text-zinc-400">By {n.author}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
