import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const formPlanSelection: RegistryEntry = entry({
    id: "form-plan-selection",
    title: "Plan Selection",
    description: "Interactive pricing plan cards.",
    source: `import { useState } from "react";

const plans = [
  { id: "basic", name: "Basic", price: "$9/mo", features: ["1 user", "5GB storage"] },
  { id: "pro", name: "Pro", price: "$29/mo", features: ["10 users", "50GB storage", "Priority support"] },
  { id: "enterprise", name: "Enterprise", price: "$99/mo", features: ["Unlimited", "500GB", "24/7 support"] },
];

export default function FormPlanSelection() {
  const [selectedPlan, setSelectedPlan] = useState("pro");

  return (
    <div className="grid w-full gap-3 sm:grid-cols-3">
      {plans.map((p) => (
        <div
          key={p.id}
          onClick={() => setSelectedPlan(p.id)}
          className={\`cursor-pointer rounded-xl border p-4 transition-colors \${selectedPlan === p.id ? "border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-900" : "border-zinc-200 dark:border-zinc-800"}\`}
        >
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">{p.name}</div>
            {selectedPlan === p.id && <span className="text-xs text-success">Selected</span>}
          </div>
          <div className="mt-1 text-2xl font-bold">{p.price}</div>
          <ul className="mt-3 space-y-1">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-xs text-zinc-500">
                <svg className="h-3 w-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}`,
  });
