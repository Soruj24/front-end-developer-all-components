interface SkillsMatchProps {
  requiredSkills: string[];
  userSkills: string[];
}

export function SkillsMatch({ requiredSkills, userSkills }: SkillsMatchProps) {
  const matched = requiredSkills.filter((s) => userSkills.includes(s));
  const missing = requiredSkills.filter((s) => !userSkills.includes(s));
  const percentage = requiredSkills.length > 0 ? Math.round((matched.length / requiredSkills.length) * 100) : 0;

  if (requiredSkills.length === 0) return null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Your Skills Match</h3>
        <span className={`text-lg font-bold ${percentage >= 70 ? "text-emerald-600 dark:text-emerald-400" : percentage >= 40 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400"}`}>
          {percentage}%
        </span>
      </div>
      <div className="mb-4 h-2.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${percentage >= 70 ? "bg-emerald-500" : percentage >= 40 ? "bg-amber-500" : "bg-red-500"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="space-y-3">
        {matched.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Matched ({matched.length})</p>
            <div className="flex flex-wrap gap-1.5">
              {matched.map((s) => (
                <span key={s} className="inline-flex items-center gap-1 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        {missing.length > 0 && (
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Missing ({missing.length})</p>
            <div className="flex flex-wrap gap-1.5">
              {missing.map((s) => (
                <span key={s} className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
