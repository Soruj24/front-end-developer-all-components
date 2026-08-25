import { cn } from "@/lib/cn";
import { SectionCard } from "./SectionCard";

export function ImportExport() {
  return (
    <SectionCard title="Import / Export UI" description="Data management tools">
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border-2 border-dashed border-border/60 p-6 text-center transition-colors hover:border-blue-400 dark:hover:border-blue-500">
          <p className="text-2xl">📁</p>
          <p className="mt-2 text-sm font-medium text-foreground">Drop CSV files here</p>
          <p className="mt-1 text-xs text-muted-foreground">or click to browse</p>
          <button
            className={cn(
              "mt-3 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white",
              "transition-all hover:bg-blue-700",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "active:scale-[0.97]"
            )}
          >
            Upload File
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className={cn(
              "flex-1 rounded-lg border border-border/60 px-4 py-2 text-sm font-medium text-muted-foreground",
              "bg-card transition-all hover:bg-muted/30",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "active:scale-[0.97]"
            )}
          >
            Export Contacts
          </button>
          <button
            className={cn(
              "flex-1 rounded-lg border border-border/60 px-4 py-2 text-sm font-medium text-muted-foreground",
              "bg-card transition-all hover:bg-muted/30",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "active:scale-[0.97]"
            )}
          >
            Export Deals
          </button>
          <button
            className={cn(
              "flex-1 rounded-lg border border-border/60 px-4 py-2 text-sm font-medium text-muted-foreground",
              "bg-card transition-all hover:bg-muted/30",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "active:scale-[0.97]"
            )}
          >
            Export All
          </button>
        </div>
      </div>
    </SectionCard>
  );
}