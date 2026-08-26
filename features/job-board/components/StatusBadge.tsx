import { STATUS_COLORS } from "../constants/ui-data";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_COLORS[status] || "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}`}>
      {status}
    </span>
  );
}
