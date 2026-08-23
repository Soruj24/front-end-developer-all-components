export const ZINDEX_DEMO_SOURCE = `"use client";

import { useState } from "react";

export function BasicZindex() {
  return (
    <div className="relative h-48 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
      {[10, 20, 30, 40, 50].map((z, i) => (
        <div key={z} className="absolute flex items-center justify-center rounded-lg border border-white/20 font-mono text-xs font-semibold text-white shadow-md transition-all duration-300" style={{ left: \`\${i * 15}%\`, top: \`\${i * 12}%\`, width: "100px", height: "60px", backgroundColor: \`hsl(\${220 + i * 20}, 70%, \${50 - i * 5}%)\`, zIndex: z }}>
          z-{z}
        </div>
      ))}
    </div>
  );
}`;
