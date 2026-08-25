import Image from "next/image";
import { cn } from "@/lib/cn";
import { emails } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function EmailInbox() {
  return (
    <SectionCard title="Email Inbox" description="Recent customer emails requiring response">
      <div className="space-y-3">
        {emails.map((e) => (
          <div
            key={e.subject}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-3",
              "transition-all duration-200",
              e.unread
                ? "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20"
                : "border-border/60 bg-card",
              "hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20",
              "hover:border-border hover:ring-black/[0.08] dark:hover:ring-white/[0.12]"
            )}
          >
            <Image src={e.image} alt={e.from} width={32} height={32} className="rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className={cn(
                  "text-sm",
                  e.unread ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
                )}>
                  {e.from}
                </p>
                <span className="text-xs text-muted-foreground/70">{e.time}</span>
              </div>
              <p className={cn(
                "text-sm",
                e.unread ? "text-foreground" : "text-muted-foreground"
              )}>
                {e.subject}
              </p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground/70">{e.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}