import Image from "next/image";
import { territories } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function TerritoryMap() {
  return (
    <SectionCard title="Territory Map" description="Regional performance and quota attainment">
      <div className="space-y-3">
        {territories.map((t) => (
          <div key={t.region} className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t.region}</p>
              <div className="flex items-center gap-2">
                <Image src={t.image} alt={t.rep} width={24} height={24} className="rounded-full object-cover" />
                <span className="text-xs text-zinc-500">{t.rep}</span>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-4 text-xs text-zinc-500">
              <span>{t.deals} deals</span>
              <span>{t.revenue}</span>
              <span>Quota: {t.quota}</span>
              <div className="ml-auto flex items-center gap-2">
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
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
