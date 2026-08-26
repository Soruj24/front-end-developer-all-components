import { useState } from "react";
import { COMPANY_INSIGHTS_DATA } from "../constants/insights-data";

export function CompanyCompare() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleCompany = (name: string) => {
    setSelected((prev) => {
      if (prev.includes(name)) return prev.filter((n) => n !== name);
      if (prev.length >= 3) return prev;
      return [...prev, name];
    });
  };

  const companies = COMPANY_INSIGHTS_DATA.filter((c) => selected.includes(c.name));

  const renderBar = (value: number, max = 5) => (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div className="h-full rounded-full bg-zinc-900 dark:bg-white" style={{ width: `${(value / max) * 100}%` }} />
      </div>
      <span className="w-5 text-right text-[10px] font-medium text-zinc-500 dark:text-zinc-400">{value}</span>
    </div>
  );

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Compare Companies</h3>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">{selected.length}/3 selected</span>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {COMPANY_INSIGHTS_DATA.map((c) => (
          <button
            key={c.name}
            onClick={() => toggleCompany(c.name)}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              selected.includes(c.name)
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            <img src={c.logo} alt={c.name} className="h-4 w-4 rounded-sm object-cover" />
            {c.name}
          </button>
        ))}
      </div>

      {companies.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Metric</th>
                {companies.map((c) => (
                  <th key={c.name} className="pb-2 pl-4 text-left">
                    <div className="flex items-center gap-2">
                      <img src={c.logo} alt={c.name} className="h-6 w-6 rounded object-cover" />
                      <span className="text-xs font-medium text-zinc-900 dark:text-white">{c.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              <tr><td className="py-2.5 text-xs text-zinc-500 dark:text-zinc-400">Work-Life Balance</td>{companies.map((c) => <td key={c.name} className="py-2.5 pl-4">{renderBar(c.workLifeBalance)}</td>)}</tr>
              <tr><td className="py-2.5 text-xs text-zinc-500 dark:text-zinc-400">Compensation</td>{companies.map((c) => <td key={c.name} className="py-2.5 pl-4">{renderBar(c.compensation)}</td>)}</tr>
              <tr><td className="py-2.5 text-xs text-zinc-500 dark:text-zinc-400">Culture</td>{companies.map((c) => <td key={c.name} className="py-2.5 pl-4">{renderBar(c.culture)}</td>)}</tr>
              <tr><td className="py-2.5 text-xs text-zinc-500 dark:text-zinc-400">Career Growth</td>{companies.map((c) => <td key={c.name} className="py-2.5 pl-4">{renderBar(c.careerGrowth)}</td>)}</tr>
              <tr><td className="py-2.5 text-xs text-zinc-500 dark:text-zinc-400">Diversity</td>{companies.map((c) => <td key={c.name} className="py-2.5 pl-4">{renderBar(c.diversity)}</td>)}</tr>
              <tr><td className="py-2.5 text-xs text-zinc-500 dark:text-zinc-400">Recommend %</td>{companies.map((c) => <td key={c.name} className="py-2.5 pl-4 text-xs font-semibold text-zinc-900 dark:text-white">{c.recommendToFriend}%</td>)}</tr>
              <tr><td className="py-2.5 text-xs text-zinc-500 dark:text-zinc-400">Total Reviews</td>{companies.map((c) => <td key={c.name} className="py-2.5 pl-4 text-xs text-zinc-600 dark:text-zinc-400">{c.totalReviews.toLocaleString()}</td>)}</tr>
              <tr><td className="py-2.5 text-xs text-zinc-500 dark:text-zinc-400">CEO Approval</td>{companies.map((c) => <td key={c.name} className="py-2.5 pl-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">{c.ceo} ({c.ceoApproval}%)</td>)}</tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
