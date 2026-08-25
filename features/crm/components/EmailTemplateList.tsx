import { cn } from "@/lib/cn";
import { emailTemplates } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function EmailTemplateList() {
  return (
    <SectionCard title="Email Templates" description="Performance metrics for sales templates">
      <div className="space-y-3">
        {emailTemplates.map((t) => (
          <div key={t.id} className={cn(
            "flex items-center justify-between rounded-lg border border-border/60 bg-card p-4",
            "shadow-sm ring-1 ring-black/[0.04] dark:ring-white/[0.08]",
            "transition-all",
            "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
            "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]",
          )}>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground">{t.name}</p>
              <p className="truncate text-xs text-muted-foreground">{t.subject}</p>
            </div>
            <div className="ml-4 flex items-center gap-6 text-xs">
              <div className="text-center">
                <p className="font-medium text-foreground">{t.opens}</p>
                <p className="text-muted-foreground">Opens</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">{t.clicks}</p>
                <p className="text-muted-foreground">Clicks</p>
              </div>
              <div className="text-center">
                <p className="text-muted-foreground">{t.lastUsed}</p>
              </div>
              <button className={cn(
                "rounded-lg bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground",
                "transition-all",
                "hover:bg-accent hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                "active:scale-[0.97]",
              )}>Use</button>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
