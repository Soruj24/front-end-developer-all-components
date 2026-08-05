import { salesData } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function SalesForecast() {
  return (
    <SectionCard title="Sales Forecast" description="Actual vs forecasted revenue">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-xs uppercase tracking-wider text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              {salesData.map((d) => (
                <th scope="col" key={d.month} className="pb-2 pr-2 font-medium">{d.month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              {salesData.map((d) => (
                <td key={d.month} className="py-2 pr-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{d.actual ? `$${(d.actual / 1000).toFixed(0)}K` : "—"}</span>
                    <div className="mt-1 h-12 w-full rounded-t border border-zinc-200 dark:border-zinc-800" style={{ alignSelf: "flex-end" }}>
                      <div className="h-full rounded-t bg-blue-500" style={{ height: `${(d.forecast / 6000) * 100}%` }} />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              {salesData.map((d) => (
                <td key={d.month} className="pt-2 pr-2 text-xs text-zinc-400">Forecast: ${(d.forecast / 1000).toFixed(0)}K</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
