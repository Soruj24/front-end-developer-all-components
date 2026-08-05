import type { Company } from "../types";
import { StarRating } from "./StarRating";

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-white transition-all hover:shadow-lg dark:border-border dark:bg-zinc-900">
      <div className="relative h-20 overflow-hidden">
        <img src={company.coverImage} alt={company.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="flex flex-col items-center gap-2 p-5">
        <img src={company.logo} alt={company.name} className="-mt-10 h-14 w-14 rounded-2xl border-2 border-white bg-white object-cover shadow-md" />
        <h3 className="font-semibold text-foreground">{company.name}</h3>
        <StarRating rating={company.rating} />
        <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{company.size} employees</p>
        <p className="text-xs text-muted-foreground/70">{company.industry}</p>
        <p className="text-xs font-medium text-blue-600 dark:text-blue-400">{company.openRoles} open roles</p>
      </div>
    </div>
  );
}
