import type { Resource } from "../types";

interface ResourceLibraryProps {
  resources: Resource[];
}

export function ResourceLibrary({ resources }: ResourceLibraryProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold text-foreground">Resource Library</h2>
      <div className="space-y-2">
        {resources.map((res) => (
          <div key={res.id} className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted text-xs font-bold text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">{res.type}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{res.title}</p>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{res.size}</p>
            </div>
            <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
