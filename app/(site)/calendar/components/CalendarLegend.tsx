export function CalendarLegend() {
  const items = [
    { label: "Meeting", color: "bg-blue-500" },
    { label: "Deadline", color: "bg-red-500" },
    { label: "Personal", color: "bg-green-500" },
    { label: "Reminder", color: "bg-amber-500" },
    { label: "Today", color: "bg-foreground" },
    { label: "Selected", color: "bg-blue-500" },
  ];

  return (
    <div className="rounded-xl border border-border p-5 dark:border-border">
      <h2 className="mb-3 text-lg font-semibold">Legend</h2>
      <div className="flex flex-wrap gap-4">
        {items.map(l => (
          <div key={l.label} className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className={`h-3 w-3 rounded-full ${l.color}`} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}
