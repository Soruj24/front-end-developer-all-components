import Image from "next/image";
import { emails } from "../constants/crm-data";
import { SectionCard } from "./SectionCard";

export function EmailInbox() {
  return (
    <SectionCard title="Email Inbox" description="Recent customer emails requiring response">
      <div className="space-y-3">
        {emails.map((e) => (
          <div key={e.subject} className={`flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 ${e.unread ? "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20" : "border-zinc-200 dark:border-zinc-800"}`}>
            <Image src={e.image} alt={e.from} width={32} height={32} className="rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className={`text-sm ${e.unread ? "font-semibold text-zinc-900 dark:text-zinc-100" : "font-medium text-zinc-500"}`}>{e.from}</p>
                <span className="text-xs text-zinc-400">{e.time}</span>
              </div>
              <p className={`text-sm ${e.unread ? "text-zinc-800 dark:text-zinc-200" : "text-zinc-500 dark:text-zinc-400"}`}>{e.subject}</p>
              <p className="mt-0.5 truncate text-xs text-zinc-400">{e.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
