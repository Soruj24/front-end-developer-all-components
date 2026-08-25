import Image from "next/image";
import { cn } from "@/lib/cn";
import { commissions } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function CommissionTable() {
  return (
    <SectionCard title="Commission Calculator" description="Estimated commissions per rep">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground">
            <th scope="col" className="pb-3 pr-2 font-medium">Rep</th>
            <th scope="col" className="pb-3 pr-2 font-medium">Deals</th>
            <th scope="col" className="pb-3 pr-2 font-medium">Rate</th>
            <th scope="col" className="pb-3 text-right font-medium">Commission</th>
          </tr>
        </thead>
        <tbody>
          {commissions.map((c) => (
            <tr key={c.rep} className="border-b border-border/30 last:border-0">
              <td className="py-2.5 pr-2">
                <div className="flex items-center gap-2">
                  <Image src={c.image} alt={c.rep} width={28} height={28} className="rounded-full object-cover" />
                  <span className="font-medium text-foreground">{c.rep}</span>
                </div>
              </td>
              <td className="py-2.5 pr-2 text-muted-foreground">{c.deals}</td>
              <td className="py-2.5 pr-2"><Badge variant={c.tier}>{c.rate}</Badge></td>
              <td className="py-2.5 text-right font-semibold text-green-600 dark:text-green-400">{c.commission}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}