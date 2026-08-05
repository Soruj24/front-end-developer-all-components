export function LMSStats() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {[
        { label: "Active Students", value: "1,247", icon: "👥", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400" },
        { label: "Hours Watched", value: "15,680", icon: "⏱️", color: "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400" },
        { label: "Courses Available", value: "48", icon: "📚", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400" },
        { label: "Average Rating", value: "4.7", icon: "⭐", color: "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400" },
      ].map((s) => (
        <div key={s.label} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 dark:border-border dark:bg-zinc-900">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}><span className="text-lg">{s.icon}</span></div>
          <div><p className="text-xl font-bold text-foreground">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
        </div>
      ))}
    </div>
  );
}
