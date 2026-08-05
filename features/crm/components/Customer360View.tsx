import Image from "next/image";
import { customer360 } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function Customer360View() {
  const c = customer360;

  return (
    <SectionCard title="Customer 360 View" description="Unified customer profile summary">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-1/3">
          <div className="flex flex-col items-center rounded-lg border border-zinc-200 p-6 text-center dark:border-zinc-800">
            <Image src={c.image} alt={c.name} width={64} height={64} className="rounded-full object-cover" />
            <h3 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">{c.name}</h3>
            <p className="text-sm text-zinc-500">{c.title}</p>
            <Badge variant="active">{c.tier}</Badge>
            <div className="mt-4 grid w-full grid-cols-2 gap-3 text-center text-sm">
              <div>
                <p className="font-bold text-zinc-900 dark:text-zinc-100">{c.annualValue}</p>
                <p className="text-xs text-zinc-500">Annual Value</p>
              </div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-zinc-100">{c.healthScore}</p>
                <p className="text-xs text-zinc-500">Health Score</p>
              </div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-zinc-100">{c.interactions}</p>
                <p className="text-xs text-zinc-500">Interactions</p>
              </div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-zinc-100">{c.openDeals}</p>
                <p className="text-xs text-zinc-500">Open Deals</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Email", value: c.email },
              { label: "Phone", value: c.phone },
              { label: "Last Contact", value: c.lastContact },
            ].map((f) => (
              <div key={f.label} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50">
                <p className="text-xs text-zinc-500">{f.label}</p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{f.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Recent Activity</p>
            <div className="mt-3 space-y-2 text-sm text-zinc-500">
              {c.activities.map((a) => (
                <p key={a}>• {a}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
