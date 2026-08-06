export function TestimonialRow() {
  const testimonials = [
    { text: "Switching to Pro was the best decision for our team. The priority support alone is worth it.", name: "Sarah Chen", role: "CTO, TechStart" },
    { text: "We've been using the Free plan for a year, and it's been great. When we needed more, upgrading was seamless.", name: "Marcus Johnson", role: "Founder, BuildCo" },
    { text: "Enterprise support is incredible. Our dedicated account manager responds within minutes.", name: "Emily Park", role: "VP Eng, DataFlow" },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t, i) => (
        <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm dark:border-border dark:bg-zinc-900">
          <div className="flex gap-1 text-amber-400">
            {[...Array(5)].map((_, s) => <span key={s}>&#9733;</span>)}
          </div>
          <p className="mt-3 text-sm italic text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-200">{t.name.charAt(0)}</div>
            <div>
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
