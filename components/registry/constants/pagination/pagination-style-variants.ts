import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationStyleVariants: RegistryEntry = entry({
    id: "pagination-style-variants",
    title: "Style Variants",
    description: "Default, pill, square, and outline active-page styles.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationStyleVariants() {
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(3);
  const [p3, setP3] = useState(5);
  const [p4, setP4] = useState(1);

  return (
    <div className="grid gap-6">
      {[
        { label: "Default (Rounded)", v: "default", s: [p1, setP1] as const },
        { label: "Pill (Fully Rounded)", v: "pill", s: [p2, setP2] as const },
        { label: "Square (No Radius)", v: "square", s: [p3, setP3] as const },
        { label: "Outline Active", v: "outline", s: [p4, setP4] as const },
      ].map((item) => (
        <div key={item.label} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
          <p className="mb-3 text-sm font-medium">{item.label}</p>
          <PaginationBar current={item.s[0]} total={10} onChange={item.s[1]} variant={item.v} />
        </div>
      ))}
    </div>
  );
}`,
  });
