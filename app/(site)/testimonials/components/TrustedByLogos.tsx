import { companies } from "../data";

export function TrustedByLogos() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {companies.map((c, i) => (
        <div key={i} className="flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 shadow-sm transition hover:shadow-md dark:border-border dark:bg-zinc-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 text-xs font-bold text-muted-foreground dark:from-zinc-800 dark:to-zinc-700">
            {c.charAt(0)}
          </div>
          <span className="text-sm font-medium text-muted-foreground">{c}</span>
        </div>
      ))}
    </div>
  );
}
