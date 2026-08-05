import { companies } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function CompanyGrid() {
  return (
    <SectionCard title="Company Profiles" description="Key accounts overview">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {companies.map((c) => (
          <div key={c.id} className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              {c.name.charAt(0)}
            </div>
            <h3 className="mt-3 font-semibold text-zinc-900 dark:text-zinc-100">{c.name}</h3>
            <Badge variant={c.tier}>{c.tier}</Badge>
            <div className="mt-3 space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
              <p>{c.industry} · {c.employees} employees</p>
              <p>{c.revenue} revenue</p>
              <p>{c.location}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
