import { useState } from "react";
import { CAREER_PATHS } from "../constants/insights-data";

export function CareerPathPlanner() {
  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const getNodeById = (id: number) => CAREER_PATHS.find((n) => n.id === id);
  const selected = selectedNode ? getNodeById(selectedNode) : null;

  const branches = [
    { label: "IC Track", nodes: [1, 2, 4, 6, 8] },
    { label: "Specialist Track", nodes: [1, 3, 5, 7, 8] },
  ];

  const getNodeColor = (level: string) => {
    switch (level) {
      case "Entry": return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
      case "Mid": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Senior": return "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400";
      case "Staff": case "Manager": return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "Principal": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      default: return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
    }
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-white">Career Path Planner</h3>

      <div className="mb-4 space-y-4">
        {branches.map((branch) => (
          <div key={branch.label}>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{branch.label}</p>
            <div className="flex flex-wrap items-center gap-2">
              {branch.nodes.map((nodeId, i) => {
                const node = getNodeById(nodeId);
                if (!node) return null;
                return (
                  <div key={nodeId} className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedNode(selectedNode === nodeId ? null : nodeId)}
                      className={`rounded-lg px-3 py-2 text-xs font-medium transition-all ${getNodeColor(node.level)} ${selectedNode === nodeId ? "ring-2 ring-zinc-900 dark:ring-white" : ""}`}
                    >
                      {node.title}
                    </button>
                    {i < branch.nodes.length - 1 && (
                      <svg className="h-4 w-4 shrink-0 text-zinc-300 dark:text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">{selected.title}</h4>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${getNodeColor(selected.level)}`}>{selected.level}</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div><p className="text-zinc-400 dark:text-zinc-500">Salary Range</p><p className="font-medium text-zinc-900 dark:text-white">{selected.salaryRange}</p></div>
            <div><p className="text-zinc-400 dark:text-zinc-500">Experience</p><p className="font-medium text-zinc-900 dark:text-white">{selected.yearsExp}</p></div>
          </div>
          <div className="mt-3">
            <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Key Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {selected.skills.map((s) => (
                <span key={s} className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400">{s}</span>
              ))}
            </div>
          </div>
          {selected.next.length > 0 && (
            <div className="mt-3">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Next Steps</p>
              <div className="flex flex-wrap gap-1.5">
                {selected.next.map((nId) => {
                  const next = getNodeById(nId);
                  return next ? <span key={nId} className="text-xs text-blue-600 dark:text-blue-400">{next.title}</span> : null;
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
