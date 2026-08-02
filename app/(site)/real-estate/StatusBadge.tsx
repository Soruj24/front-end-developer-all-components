export function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "For Sale": "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    "For Rent": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    Sold: "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70",
    New: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${colors[status] || "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70"}`}>
      {status}
    </span>
  );
}