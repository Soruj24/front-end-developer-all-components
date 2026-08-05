export function CourseSchedule() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const schedule = ["Components & Props", "State & Events", "Hooks Workshop", "Project Lab", "Code Review", "Office Hours (Optional)"];

  return (
    <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Course Schedule</h2>
        <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">Week 4 of 12</span>
      </div>
      <div className="space-y-2">
        {days.map((day, i) => (
          <div key={day} className="flex items-center gap-3 rounded-xl border border-border px-3 py-2.5 text-sm dark:border-border">
            <span className="w-12 text-xs font-medium text-muted-foreground dark:text-muted-foreground/70">{day}</span>
            <span className="flex-1 text-muted-foreground">{schedule[i]}</span>
            {i < 2 ? <span className="text-xs text-green-600 dark:text-green-400">✓ Done</span> : <span className="text-xs text-blue-600 dark:text-blue-400">Upcoming</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
