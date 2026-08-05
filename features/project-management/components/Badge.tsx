interface BadgeProps {
  variant: string;
  children: React.ReactNode;
}

const colors: Record<string, string> = {
  Critical: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  High: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Medium: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Low: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Trivial: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  Open: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  Review: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Completed: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Closed: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  Planning: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  "At Risk": "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  "On Track": "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Major: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Minor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
};

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${colors[variant] || "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"}`}>
      {children}
    </span>
  );
}
