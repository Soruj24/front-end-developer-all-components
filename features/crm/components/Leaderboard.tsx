import Image from "next/image";
import { leaderboard } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function Leaderboard() {
  return (
    <SectionCard title="Team Leaderboard" description="Sales rep performance ranking">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            <th scope="col" className="pb-3 pr-2 font-medium">#</th>
            <th scope="col" className="pb-3 pr-2 font-medium">Rep</th>
            <th scope="col" className="pb-3 pr-2 font-medium">Deals</th>
            <th scope="col" className="pb-3 pr-2 font-medium">Revenue</th>
            <th scope="col" className="pb-3 text-right font-medium">Attainment</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((r) => (
            <tr key={r.rank} className="border-b border-zinc-100 last:border-0 dark:border-zinc-800">
              <td className="py-2.5 pr-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  r.rank === 1 ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" :
                  r.rank === 2 ? "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400" :
                  r.rank === 3 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" : "bg-zinc-50 text-zinc-400 dark:bg-zinc-900 dark:text-zinc-500"
                }`}>{r.rank}</span>
              </td>
              <td className="py-2.5 pr-2">
                <div className="flex items-center gap-2">
                  <Image src={r.image} alt={r.name} width={28} height={28} className="rounded-full object-cover" />
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">{r.name}</span>
                </div>
              </td>
              <td className="py-2.5 pr-2 text-zinc-500">{r.deals}</td>
              <td className="py-2.5 pr-2 font-medium text-zinc-900 dark:text-zinc-100">{r.revenue}</td>
              <td className="py-2.5 text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div className="h-full rounded-full bg-green-500" style={{ width: r.attainment }} />
                  </div>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">{r.attainment}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}
