import { cn } from "@/lib/cn";
import { invoices } from "../constants/crm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function InvoiceList() {
  return (
    <SectionCard title="Invoice Preview" description="Recent invoices and payment status">
      <div className="space-y-3">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className={cn(
              "flex items-center justify-between rounded-lg border border-border/60 p-3",
              "bg-card shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
              "transition-all duration-200"
            )}
          >
            <div>
              <p className="text-xs font-mono text-muted-foreground/70">{inv.id}</p>
              <p className="text-sm font-medium text-foreground">{inv.client}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="font-semibold text-foreground">{inv.amount}</span>
              <Badge variant={inv.status}>{inv.status}</Badge>
              <button
                className={cn(
                  "rounded bg-muted/30 px-2 py-1 text-xs font-medium text-muted-foreground",
                  "dark:bg-zinc-800 dark:text-zinc-400",
                  "transition-all hover:bg-muted/50 dark:hover:bg-zinc-700",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  "active:scale-[0.97]"
                )}
              >
                PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}