export function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: string }) {
  const variants: Record<string, string> = {
    default: "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground",
    active: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    new: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    inactive: "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground",
    hot: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    warm: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    cold: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    paid: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    overdue: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    urgent: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    high: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    low: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    enterprise: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
}