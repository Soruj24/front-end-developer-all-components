const DIETARY_COLORS: Record<string, string> = {
  Vegetarian: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  Vegan: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Gluten-Free": "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  Keto: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Halal: "bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300",
};

export function DietaryBadge({ label }: { label: string }) {
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${DIETARY_COLORS[label] || "bg-muted text-muted-foreground dark:bg-muted dark:text-muted-foreground/70"}`}>
      {label}
    </span>
  );
}
