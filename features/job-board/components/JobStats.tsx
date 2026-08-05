export function JobStats() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {[{ label: "Active Jobs", value: "12,847", icon: "💼" }, { label: "Companies", value: "3,421", icon: "🏢" }, { label: "New This Week", value: "1,893", icon: "🆕" }, { label: "Avg. Salary", value: "$132k", icon: "💰" }].map((s) => (
        <div key={s.label} className="flex items-center gap-3 rounded-2xl border border-border bg-white p-4 dark:border-border dark:bg-zinc-900">
          <span className="text-2xl">{s.icon}</span>
          <div><p className="text-lg font-bold text-foreground">{s.value}</p><p className="text-xs text-muted-foreground">{s.label}</p></div>
        </div>
      ))}
    </div>
  );
}
