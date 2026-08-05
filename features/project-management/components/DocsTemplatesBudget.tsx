import { documents, templates, budgetItems } from "../constants/pm-data";
import { SectionCard } from "./SectionCard";

const docIcons: Record<string, string> = {
  pdf: "📄",
  doc: "📝",
  fig: "🎨",
  code: "💻",
  sheet: "📊",
};

export function DocumentList() {
  return (
    <SectionCard title="Documents" icon="📄">
      <div className="space-y-2">
        {documents.map((d) => (
          <div key={d.id} className="flex items-center justify-between rounded-lg border border-zinc-100 p-2.5 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
            <div className="flex items-center gap-2">
              <span className="text-lg">{docIcons[d.icon]}</span>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{d.name}</p>
                <p className="text-xs text-zinc-500">{d.author} · {d.size}</p>
              </div>
            </div>
            <span className="text-[10px] text-zinc-400">{d.updated}</span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function TemplateList() {
  return (
    <SectionCard title="Project Templates" icon="📋">
      <div className="space-y-2">
        {templates.map((t) => (
          <div key={t.id} className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t.name}</p>
              <p className="text-xs text-zinc-500">{t.tasks} tasks · {t.duration}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-zinc-400">{t.usedBy} uses</p>
              <button className="mt-1 rounded bg-blue-100 px-2 py-1 text-[10px] font-medium text-blue-700 transition-colors hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300">Use</button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

export function BudgetOverview() {
  const totalBudget = budgetItems.reduce((s, i) => s + i.budget, 0);
  const totalSpent = budgetItems.reduce((s, i) => s + i.spent, 0);

  return (
    <SectionCard title="Budget Overview" icon="💰">
      <div className="mb-4 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-zinc-500">Total Budget</span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">${totalBudget.toLocaleString()}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="text-zinc-500">Spent</span>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">${totalSpent.toLocaleString()}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div className="h-full rounded-full bg-blue-500" style={{ width: `${(totalSpent / totalBudget) * 100}%` }} />
        </div>
      </div>
      <div className="space-y-2">
        {budgetItems.map((b) => (
          <div key={b.id} className="flex items-center justify-between text-xs">
            <span className="text-zinc-500">{b.category}</span>
            <div className="flex items-center gap-3">
              <span className="text-zinc-400">${b.spent.toLocaleString()}/${b.budget.toLocaleString()}</span>
              <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${(b.spent / b.budget) * 100}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
