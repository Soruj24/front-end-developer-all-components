import type { Company } from "../types";
import { StarRating } from "./StarRating";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="group overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="relative h-20 overflow-hidden">
        <img src={company.coverImage} alt={company.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="flex flex-col items-center gap-2 p-5">
        <img src={company.logo} alt={company.name} className="-mt-10 h-14 w-14 rounded-xl border-2 border-white bg-white object-cover shadow-md dark:border-zinc-900" />
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{company.name}</h3>
        <StarRating rating={company.rating} />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{company.size} employees</p>
        <p className="text-xs text-zinc-400 dark:text-zinc-500">{company.industry}</p>
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{company.openRoles} open roles</p>
      </div>
    </div>
  );
}
