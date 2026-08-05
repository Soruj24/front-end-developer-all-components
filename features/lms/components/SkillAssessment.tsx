export function SkillAssessment() {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-zinc-900">
      <h3 className="mb-3 text-sm font-semibold text-foreground">Skill Assessment</h3>
      <div className="space-y-3 text-sm">
        {[{ skill: "React", level: 85 }, { skill: "TypeScript", level: 70 }, { skill: "CSS", level: 90 }, { skill: "Node.js", level: 45 }].map((s) => (
          <div key={s.skill}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-muted-foreground">{s.skill}</span>
              <span className="text-xs text-muted-foreground">{s.level}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className={`h-full rounded-full ${s.level >= 80 ? "bg-green-500" : s.level >= 60 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${s.level}%` }} />
            </div>
          </div>
        ))}
      </div>
      <button className="mt-3 w-full rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/40 dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Take Assessment</button>
    </div>
  );
}
