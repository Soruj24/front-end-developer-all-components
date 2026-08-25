import { cn } from "@/lib/cn";
import { notes } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function NoteList() {
  return (
    <SectionCard title="Notes Section" description="Pinned and recent notes">
      <div className="space-y-3">
        {notes.map((n) => (
          <div
            key={n.id}
            className={cn(
              "rounded-lg border border-border/60 p-4",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">{n.title}</h3>
                {n.pinned && <span className="text-xs">📌</span>}
              </div>
              <span className="text-xs text-muted-foreground/70">{n.date}</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{n.content}</p>
            <p className="mt-2 text-xs text-muted-foreground/70">By {n.author}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}