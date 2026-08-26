import { useState } from "react";
import { COMPANY_DIRECTORY } from "../constants/insights-data";

export function CompanyDirectory() {
  const [search, setSearch] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("All");

  const industries = ["All", ...Array.from(new Set(COMPANY_DIRECTORY.map((c) => c.industry)))];

  const filtered = COMPANY_DIRECTORY.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedIndustry !== "All" && c.industry !== selectedIndustry) return false;
    return true;
  });

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Company Directory</h3>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">{COMPANY_DIRECTORY.length} companies</span>
      </div>

      <div className="mb-4 space-y-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search companies..."
          className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder:text-zinc-500"
        />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setSelectedIndustry(ind)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedIndustry === ind
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
              }`}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((company) => (
          <div key={company.name} className="flex items-center gap-3 rounded-lg border border-zinc-100 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
            <img src={company.logo} alt={company.name} className="h-10 w-10 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">{company.name}</p>
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">{company.industry}</span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">{company.headquarters} &middot; {company.size} employees</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{company.openRoles} roles</p>
              <div className="flex items-center gap-1">
                <svg className="h-3 w-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{company.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
