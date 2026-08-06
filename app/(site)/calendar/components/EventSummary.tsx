export function EventSummary() {
  const stats = [
    { label: "Meetings", count: 12, color: "bg-blue-500" },
    { label: "Deadlines", count: 5, color: "bg-red-500" },
    { label: "Personal", count: 4, color: "bg-green-500" },
    { label: "Reminders", count: 3, color: "bg-amber-500" },
  ];

  return (
    <div className="rounded-xl border border-border p-6 dark:border-border">
      <h2 className="mb-4 text-lg font-semibold">Event Summary</h2>
      <div className="grid gap-4 sm:grid-cols-4">
        {stats.map(s => (
          <div key={s.label} className="rounded-lg border border-border p-4 text-center dark:border-border">
            <div className={`mx-auto mb-2 h-3 w-12 rounded-full ${s.color}`} />
            <p className="text-2xl font-bold">{s.count}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
