import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const errorSummaryCards: RegistryEntry = entry({
    id: "error-summary-cards",
    title: "Error Summary Cards",
    description: "Operational alert cards with severity chips, timestamps, and dismissal.",
    source: `export default function ErrorSummaryCards() {
  const cards = [
    { title: "Database Connection Failed", desc: "Could not establish connection to the primary database. Failover initiated.", severity: "Critical", time: "2m ago" },
    { title: "Payment Gateway Timeout", desc: "Stripe API request exceeded 30s timeout. Transaction rolled back.", severity: "High", time: "15m ago" },
    { title: "Cache Miss Rate High", desc: "Redis cache miss rate is above 20%. Consider increasing cache TTL.", severity: "Warning", time: "1h ago" },
    { title: "Disk Space Low", desc: "Primary volume has 5% remaining. Automated cleanup triggered.", severity: "Warning", time: "3h ago" },
    { title: "SSL Certificate Expiring", desc: "Certificate for *.example.com expires in 7 days.", severity: "Low", time: "1d ago" },
    { title: "API Rate Limit Near", desc: "You are at 85% of your API rate limit for the current hour.", severity: "Info", time: "2h ago" },
  ];

  const sevColor = (s: string) => {
    if (s === "Critical") return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    if (s === "High") return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
    if (s === "Warning") return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-warning";
    return "bg-primary-soft text-primary dark:bg-blue-900/30 dark:text-blue-400";
  };

  return (
    <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((e, i) => (
        <div key={i} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className={\`rounded-full px-2 py-0.5 text-[10px] font-medium \${sevColor(e.severity)}\`}>{e.severity}</span>
              <span className="text-[10px] text-zinc-400">{e.time}</span>
            </div>
            <button className="text-xs text-zinc-400 hover:text-zinc-600">&times;</button>
          </div>
          <div className="mt-2 text-sm font-medium">{e.title}</div>
          <p className="mt-0.5 text-xs text-zinc-500">{e.desc}</p>
        </div>
      ))}
    </div>
  );
}`,
  });
