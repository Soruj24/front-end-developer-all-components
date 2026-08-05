import type { Assignment } from "../types";

interface AssignmentSectionProps {
  assignments: Assignment[];
}

export function AssignmentSection({ assignments }: AssignmentSectionProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 dark:border-border dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Assignments</h2>
        <span className="text-xs text-muted-foreground dark:text-muted-foreground/70">{assignments.filter((a) => a.status !== "Graded").length} pending</span>
      </div>
      <div className="space-y-3">
        {assignments.map((asgn) => (
          <div key={asgn.id} className="flex items-center gap-4 rounded-xl border border-border px-4 py-3 dark:border-border">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted dark:bg-muted">
              <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{asgn.title}</p>
              <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">Due: {asgn.due} · {asgn.submissions} submissions</p>
            </div>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${asgn.status === "Graded" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" : asgn.status === "Pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"}`}>{asgn.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
