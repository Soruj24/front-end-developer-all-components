import Image from "next/image";
import { issues } from "../constants/pm-data";
import { Badge } from "./Badge";
import { SectionCard } from "./SectionCard";

export function IssueTracker() {
  return (
    <SectionCard title="Issue Tracker" icon="🐛">
      <div className="space-y-2">
        {issues.map((issue) => (
          <div key={issue.id} className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-zinc-400">{issue.id}</span>
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{issue.title}</p>
                <div className="mt-0.5 flex items-center gap-2">
                  <Badge variant={issue.severity}>{issue.severity}</Badge>
                  <Badge variant={issue.status}>{issue.status}</Badge>
                </div>
              </div>
            </div>
            <Image src={issue.image} alt={issue.assignee} width={28} height={28} className="rounded-full object-cover" />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
