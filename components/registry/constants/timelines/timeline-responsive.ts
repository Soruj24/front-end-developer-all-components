import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const timelineResponsive: RegistryEntry = entry({
    id: "timeline-responsive",
    title: "Responsive Timeline",
    description: "Toggle between a vertical mobile layout and a horizontal desktop strip.",
    source: `import { useState } from "react";

export default function TimelineResponsive() {
  const [mobile, setMobile] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={mobile} onChange={() => setMobile(!mobile)} className="h-3.5 w-3.5" />
        <span className="text-xs text-zinc-500">Mobile view</span>
      </label>
      <div className={\`relative \${mobile ? "pl-8" : ""}\`}>
        {mobile && <div className="absolute left-3 top-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-700" />}
        <div className={mobile ? "" : "flex gap-4"}>
          {["Sign up", "Profile", "Dashboard"].map((item, i) => (
            <div key={item} className={\`\${mobile ? "relative mb-4" : "flex-1"} flex \${mobile ? "" : "flex-col items-center"}\`}>
              {mobile && <span className={\`absolute -left-5 mt-1 h-2.5 w-2.5 rounded-full border-2 \${i === 2 ? "border-success bg-green-100 dark:bg-green-900" : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-black"}\`} />}
              <span className={\`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold \${i === 2 ? "bg-success-soft0 text-white" : "border-2 border-zinc-300 text-zinc-400 dark:border-zinc-600"}\`}>
                {i === 2 ? "✓" : i + 1}
              </span>
              <span className={\`\${mobile ? "ml-2" : "mt-1"} text-xs\`}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
  });
