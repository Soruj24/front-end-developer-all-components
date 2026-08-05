import { STATUS_COLORS } from "../constants/ui-data";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[status] || "bg-muted text-muted-foreground"}`}>{status}</span>
  );
}
