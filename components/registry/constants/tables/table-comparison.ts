import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const tableComparison: RegistryEntry = entry({
    id: "table-comparison",
    title: "Comparison / Pricing Table",
    description: "Side-by-side feature comparison for product plans.",
    source: `const plans = [
  { feature: "Price", free: "$0", pro: "$19/mo", enterprise: "$99/mo", highlight: true },
  { feature: "Users", free: "Up to 3", pro: "Up to 20", enterprise: "Unlimited", highlight: false },
  { feature: "Storage", free: "1 GB", pro: "50 GB", enterprise: "1 TB", highlight: false },
  { feature: "API Access", free: "—", pro: "5,000 req/day", enterprise: "Unlimited", highlight: false },
  { feature: "Support", free: "Community", pro: "Email", enterprise: "24/7 Priority", highlight: false },
  { feature: "Analytics", free: "Basic", pro: "Advanced", enterprise: "Custom", highlight: false },
  { feature: "Custom Domains", free: "—", pro: "Yes", enterprise: "Yes", highlight: true },
  { feature: "SSO", free: "—", pro: "—", enterprise: "Yes", highlight: false },
  { feature: "SLA", free: "—", pro: "99.9%", enterprise: "99.99%", highlight: false },
];

export default function TableComparison() {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="min-w-full text-sm">
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">Feature</th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">Free</th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-primary dark:text-blue-400 bg-primary-soft">Pro</th>
            <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500">Enterprise</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {plans.map((row, i) => (
            <tr key={i} className={\`\${row.highlight ? "bg-zinc-50/50 dark:bg-zinc-900/30" : ""} hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30\`}>
              <td className={\`px-4 py-3 font-medium \${row.highlight ? "text-zinc-900 dark:text-zinc-100" : ""}\`}>{row.feature}</td>
              <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">{row.free}</td>
              <td className="px-4 py-3 text-center font-medium text-primary dark:text-blue-300 bg-blue-50/30 dark:bg-blue-900/10">{row.pro}</td>
              <td className="px-4 py-3 text-center text-zinc-600 dark:text-zinc-400">{row.enterprise}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`,
  });
