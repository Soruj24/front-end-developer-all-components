import Image from "next/image";
import { cn } from "@/lib/cn";
import { territories } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function TerritoryMap() {
  return (
    <SectionCard title="Territory Map" description="Regional performance and quota attainment">
      <div className="space-y-3">
        {territories.map((t) => (
          <div
            key={t.region}
            className={cn(
              "rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-foreground">{t.region}</p>
              <div className="flex items-center gap-2">
                <Image src={t.image} alt={t.rep} width={24} height={24} className="rounded-full object-cover" />
                <span className="text-xs text-muted-foreground">{t.rep}</span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
              <span>{t.deals} deals</span>
              <span>{t.revenue}</span>
              <span>Quota: {t.quota}</span>
              <div className="ml-auto flex items-center gap-2">
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted/30">
                  <div className="h-full rounded-full bg-green-500" style={{ width: t.attainment }} />
                </div>
                <span className="font-medium text-green-600 dark:text-green-400">{t.attainment}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}