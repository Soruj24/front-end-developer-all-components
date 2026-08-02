import { cn } from "@/lib/cn";
import { statusLabel } from "@/features/registry";

export function ComponentStatusBadge({ status }: { status: string }) {
  const tones: Record<string, string> = {
    stable: "bg-success-soft text-success",
    beta: "bg-info-soft text-info",
    new: "bg-warning-soft text-warning",
    deprecated: "bg-danger-soft text-danger",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
        tones[status] ?? "bg-muted text-muted-foreground"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {statusLabel[status as keyof typeof statusLabel] ?? status}
    </span>
  );
}
