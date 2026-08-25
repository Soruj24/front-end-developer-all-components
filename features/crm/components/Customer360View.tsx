import Image from "next/image";
import { cn } from "@/lib/cn";
import { customer360 } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function Customer360View() {
  const c = customer360;

  return (
    <SectionCard title="Customer 360 View" description="Unified customer profile summary">
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-1/3">
          <div className={cn(
            "flex flex-col items-center rounded-lg border border-border/60 p-6 text-center",
            "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
            "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
            "transition-all duration-200"
          )}>
            <Image src={c.image} alt={c.name} width={64} height={64} className="rounded-full object-cover" />
            <h3 className="mt-4 text-lg font-bold text-foreground">{c.name}</h3>
            <p className="text-sm text-muted-foreground">{c.title}</p>
            <Badge variant="active">{c.tier}</Badge>
            <div className="mt-4 grid w-full grid-cols-2 gap-3 text-center text-sm">
              <div>
                <p className="font-bold text-foreground">{c.annualValue}</p>
                <p className="text-xs text-muted-foreground">Annual Value</p>
              </div>
              <div>
                <p className="font-bold text-foreground">{c.healthScore}</p>
                <p className="text-xs text-muted-foreground">Health Score</p>
              </div>
              <div>
                <p className="font-bold text-foreground">{c.interactions}</p>
                <p className="text-xs text-muted-foreground">Interactions</p>
              </div>
              <div>
                <p className="font-bold text-foreground">{c.openDeals}</p>
                <p className="text-xs text-muted-foreground">Open Deals</p>
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
              <div
                key={f.label}
                className={cn(
                  "rounded-lg bg-muted/30 p-3",
                  "shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
                  "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
                  "transition-all duration-200"
                )}
              >
                <p className="text-xs text-muted-foreground">{f.label}</p>
                <p className="text-sm font-medium text-foreground">{f.value}</p>
              </div>
            ))}
          </div>
          <div
            className={cn(
              "rounded-lg border border-border/60 p-4",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <p className="text-sm font-medium text-foreground">Recent Activity</p>
            <div className="mt-3 space-y-2 text-sm text-muted-foreground">
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