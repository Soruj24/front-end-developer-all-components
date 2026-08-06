"use client";

import { useState } from "react";
import { featureComparisonData, CheckIcon, CrossIcon } from "../data";

export function FeatureComparisonTable() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const featureTooltips: Record<string, string> = {
    Projects: "Number of active projects you can run simultaneously.",
    "API access": "RESTful API access for programmatic control.",
    "SSO / SCIM": "Single Sign-On and System for Cross-domain Identity Management.",
    SLA: "Service Level Agreement guaranteeing uptime.",
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-white shadow-sm dark:border-border dark:bg-zinc-900">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border">
            <th scope="col" className="sticky left-0 bg-white px-6 py-4 font-semibold dark:bg-zinc-900">Feature</th>
            {featureComparisonData.plans.map((p, i) => (
              <th scope="col" key={p.name} className={`px-6 py-4 font-semibold ${i === 2 ? "bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200" : ""}`}>
                {p.name}
                {i === 2 && <span className="ml-2 rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">Best</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {featureComparisonData.features.map((feat, fi) => (
            <tr key={feat} className="border-b border-border last:border-0">
              <td
                className="sticky left-0 bg-white px-6 py-4 font-medium dark:bg-zinc-900"
                onMouseEnter={() => setHoveredFeature(feat)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <span className="relative cursor-help underline decoration-dotted underline-offset-2">
                  {feat}
                  {hoveredFeature === feat && featureTooltips[feat] && (
                    <span className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-zinc-900 px-3 py-1.5 text-xs text-white shadow-lg dark:bg-foreground dark:text-background">&#8593; {featureTooltips[feat]}</span>
                  )}
                </span>
              </td>
              {featureComparisonData.plans.map((p, pi) => {
                const val = p.values[fi];
                return (
                  <td key={p.name} className={`px-6 py-4 ${pi === 2 ? "bg-blue-50/50 dark:bg-blue-950/20" : ""}`}>
                    {typeof val === "boolean" ? val ? <CheckIcon className="h-5 w-5 text-emerald-500" /> : <CrossIcon className="h-5 w-5" /> : <span className="font-medium">{val}</span>}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
