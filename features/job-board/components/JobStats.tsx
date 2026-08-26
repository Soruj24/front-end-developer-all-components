export function JobStats() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        { label: "Active Jobs", value: "12,847", icon: "💼" },
        { label: "Companies", value: "3,421", icon: "🏢" },
        { label: "New This Week", value: "1,893", icon: "🆕" },
        { label: "Avg. Salary", value: "$132k", icon: "💰" },
      ].map((s) => (
        <div key={s.label} className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <span className="text-2xl">{s.icon}</span>
          <div>
            <p className="text-lg font-bold tabular-nums text-zinc-900 dark:text-white">{s.value}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
