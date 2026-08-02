import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";
import { paginationBarSource } from "./shared";

export const paginationSizeVariants: RegistryEntry = entry({
    id: "pagination-size-variants",
    title: "Size Variants",
    description: "Small, medium, and large bars, plus a side-by-side comparison.",
    source: `import { useMemo, useState } from "react";

${paginationBarSource}

export default function PaginationSizes() {
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(2);
  const [p3, setP3] = useState(4);
  const [p4, setP4] = useState(5);
  const [p5, setP5] = useState(1);
  const [p6, setP6] = useState(2);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4">
        {[
          { label: "Small (sm)", z: "sm", s: [p1, setP1] as const },
          { label: "Medium (md, default)", z: "md", s: [p2, setP2] as const },
          { label: "Large (lg)", z: "lg", s: [p3, setP3] as const },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
            <p className="mb-3 text-sm font-medium">{item.label}</p>
            <PaginationBar current={item.s[0]} total={10} onChange={item.s[1]} size={item.z} />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-800">
        <p className="mb-3 text-sm font-medium">Sizes Comparison</p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4"><span className="w-16 text-xs text-zinc-500">Small</span><PaginationBar current={p4} total={10} onChange={setP4} size="sm" /></div>
          <div className="flex items-center gap-4"><span className="w-16 text-xs text-zinc-500">Medium</span><PaginationBar current={p5} total={10} onChange={setP5} size="md" /></div>
          <div className="flex items-center gap-4"><span className="w-16 text-xs text-zinc-500">Large</span><PaginationBar current={p6} total={10} onChange={setP6} size="lg" /></div>
        </div>
      </div>
    </div>
  );
}`,
  });
