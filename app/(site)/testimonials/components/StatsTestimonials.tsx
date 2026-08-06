export function StatsTestimonials() {
  const stats = [
    { icon: "👥", value: "10,000+", label: "Customers" },
    { icon: "⭐", value: "4.9", label: "Avg Rating" },
    { icon: "✅", value: "99%", label: "Satisfaction" },
    { icon: "🌍", value: "50+", label: "Countries" },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white p-6 text-center shadow-sm dark:border-border dark:bg-zinc-900">
          <span className="text-3xl">{s.icon}</span>
          <span className="text-2xl font-bold tracking-tight">{s.value}</span>
          <span className="text-sm text-muted-foreground dark:text-muted-foreground/70">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
