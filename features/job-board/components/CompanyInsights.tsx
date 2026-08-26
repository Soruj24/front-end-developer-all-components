import { COMPANY_INSIGHTS_DATA } from "../constants/insights-data";

interface CompanyInsightsProps {
  companyName?: string;
}

export function CompanyInsights({ companyName }: CompanyInsightsProps) {
  const data = companyName
    ? COMPANY_INSIGHTS_DATA.filter((c) => c.name.toLowerCase().includes(companyName.toLowerCase()))
    : COMPANY_INSIGHTS_DATA;

  if (data.length === 0) return null;

  const renderBar = (value: number, max = 5) => (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div className="h-full rounded-full bg-zinc-900 dark:bg-white" style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <span className="w-6 text-right text-xs font-medium text-zinc-600 dark:text-zinc-400">{value}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      {data.slice(0, 2).map((company) => (
        <div key={company.name} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-4 flex items-center gap-3">
            <img src={company.logo} alt={company.name} className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{company.name}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{company.totalReviews.toLocaleString()} reviews</p>
            </div>
          </div>

          <div className="mb-4 space-y-2.5">
            <div className="flex items-center justify-between"><span className="text-xs text-zinc-500 dark:text-zinc-400">Work-Life Balance</span><div className="w-32">{renderBar(company.workLifeBalance)}</div></div>
            <div className="flex items-center justify-between"><span className="text-xs text-zinc-500 dark:text-zinc-400">Compensation</span><div className="w-32">{renderBar(company.compensation)}</div></div>
            <div className="flex items-center justify-between"><span className="text-xs text-zinc-500 dark:text-zinc-400">Culture</span><div className="w-32">{renderBar(company.culture)}</div></div>
            <div className="flex items-center justify-between"><span className="text-xs text-zinc-500 dark:text-zinc-400">Career Growth</span><div className="w-32">{renderBar(company.careerGrowth)}</div></div>
            <div className="flex items-center justify-between"><span className="text-xs text-zinc-500 dark:text-zinc-400">Diversity</span><div className="w-32">{renderBar(company.diversity)}</div></div>
          </div>

          <div className="mb-4 flex items-center gap-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
            <div className="text-center">
              <p className="text-lg font-bold text-zinc-900 dark:text-white">{company.recommendToFriend}%</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">Recommend</p>
            </div>
            <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-700" />
            <div>
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">CEO: {company.ceo}</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{company.ceoApproval}% approval</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">Pros</p>
              <ul className="space-y-1">
                {company.pros.map((p) => (
                  <li key={p} className="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <svg className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-red-600 dark:text-red-400">Cons</p>
              <ul className="space-y-1">
                {company.cons.map((c) => (
                  <li key={c} className="flex items-start gap-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    <svg className="mt-0.5 h-3 w-3 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
