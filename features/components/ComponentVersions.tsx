import type { RegistryComponent } from "@/features/registry";
import { formatDate } from "@/features/registry";
import { cn } from "@/lib/cn";

const kindTone: Record<string, string> = {
  major: "bg-danger-soft text-danger",
  minor: "bg-info-soft text-info",
  patch: "bg-success-soft text-success",
};

export function ComponentVersions({ component }: { component: RegistryComponent }) {
  return (
    <ol className="relative flex flex-col gap-5 border-l border-border pl-5">
      {component.releases.map((release) => (
        <li key={release.version} className="relative">
          <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-primary ring-1 ring-border" />
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-semibold text-foreground">
              v{release.version}
            </span>
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-medium", kindTone[release.kind])}>
              {release.kind}
            </span>
            <span className="text-xs text-muted-foreground">{formatDate(release.date)}</span>
          </div>
          <ul className="mt-1.5 flex list-disc flex-col gap-1 pl-4 text-[13px] text-muted-foreground">
            {release.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
