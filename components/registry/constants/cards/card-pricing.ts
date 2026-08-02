import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const cardPricing: RegistryEntry = entry({
    id: "card-pricing",
    title: "Pricing Cards",
    description: "Feature comparison with a highlighted popular tier.",
    source: `const plans = [
  { name: "Starter", price: "$19", period: "/mo", features: ["5 projects", "10GB storage", "Basic support"], popular: false },
  { name: "Pro", price: "$49", period: "/mo", features: ["Unlimited projects", "100GB storage", "Priority support"], popular: true },
  { name: "Enterprise", price: "$99", period: "/mo", features: ["Everything in Pro", "1TB storage", "24/7 support"], popular: false },
];

export default function CardPricing() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={
            plan.popular
              ? "rounded-lg border border-blue-500 bg-blue-50 p-5 dark:border-blue-400 dark:bg-blue-950"
              : "rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]"
          }
        >
          {plan.popular && <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-medium text-white">Popular</span>}
          <h3 className="mt-2 font-semibold">{plan.name}</h3>
          <p className="mt-1 text-3xl font-bold">
            {plan.price}<span className="text-sm font-normal text-zinc-500">{plan.period}</span>
          </p>
          <ul className="mt-4 space-y-2">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                <svg className="h-4 w-4 shrink-0 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {f}
              </li>
            ))}
          </ul>
          <button
            className={
              plan.popular
                ? "mt-6 w-full rounded-md bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
                : "mt-6 w-full rounded-md bg-zinc-900 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900"
            }
          >
            Choose {plan.name}
          </button>
        </div>
      ))}
    </div>
  );
}`,
  });
