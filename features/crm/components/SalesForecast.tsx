import { cn } from "@/lib/cn";
import { salesData } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function SalesForecast() {
  return (
    <SectionCard title="Sales Forecast" description="Actual vs forecasted revenue">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground">
              {salesData.map((d) => (
                <th scope="col" key={d.month} className="pb-2 pr-2 font-medium">{d.month}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/60">
              {salesData.map((d) => (
                <td key={d.month} className="py-2 pr-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{d.actual ? `$${(d.actual / 1000).toFixed(0)}K` : "—"}</span>
                    <div className="mt-1 h-12 w-full rounded-t border border-border/60" style={{ alignSelf: "flex-end" }}>
                      <div className="h-full rounded-t bg-blue-500" style={{ height: `${(d.forecast / 6000) * 100}%` }} />
                    </div>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              {salesData.map((d) => (
                <td key={d.month} className="pt-2 pr-2 text-xs text-muted-foreground/70">Forecast: ${(d.forecast / 1000).toFixed(0)}K</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}