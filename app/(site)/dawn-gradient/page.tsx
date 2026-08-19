"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Zap, Sparkles, Moon, Sun, Palette, Layout, LayoutSplit, LayoutDashboard, LayoutGrid, LayoutList, LayoutText, LayoutWrap, LayoutSidebarClose } from "lucide-react";

const DAWN_GRADIENT_SOURCE = "use client";

function DawnGradientDemo() {
  const [angle, setAngle] = useState(0);
  const gradient = `conic-gradient(from ${angle}deg, #f97316, #ff8c4d, #fbbf24, #22c55e, #14b8a6, #6366f1, #a855f7, #ec4899, #f97316)`;
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setAngle((a) => a + 10), 50);
    return () => clearInterval(interval);
  }, [running]);

  return (
    <div className="min-h-96 flex items-center justify-center bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e293b] overflow-hidden">
      <div className="w-full h-full">
        <div
          className="absolute inset-0 bg-[linear-gradient(var(--gradient))]"
          style={{ backgroundImage: gradient }}
        />
        <div className="absolute inset-0 rounded-2xl border-2 border-white/20 opacity-30" />
      </div>
      <div className="relative z-10 text-center">
        <Zap className="h-12 w-12 text-yellow-400 mb-4" />
        <p className="text-xl font-medium text-foreground">Dawn Gradient</p>
        <p className="text-sm text-muted-foreground">conic-gradient animation</p>
        {running ? (
          <button onClick={() => setRunning(false)} className="mt-3 rounded-border border-border px-3 py-1 text-sm font-medium hover:bg-muted transition-colors">Stop</button>
        ) : (
          <button onClick={() => setRunning(true)} className="mt-3 rounded-border border-border px-3 py-1 text-sm font-medium hover:bg-muted transition-colors">Animate</button>
        )}
      </div>
    </div>
  );
}

export default function DawnGradientPage() {
  return (
    <ComponentDocPage
      name="Dawn Gradient"
      category="Data Display"
      description="A animated gradient background with conic-gradient and play/pause controls."
    >
      <PreviewPanel filename="dawn-gradient.tsx">
        <DawnGradientDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={DAWN_GRADIENT_SOURCE}
        filename="components/ui/DawnGradient/DawnGradient.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-4">
        <ExampleBlock title="Animated" description="Gradient with automatic rotation." code={DAWN_GRADIENT_SOURCE}>
          <DawnGradientDemo />
        </ExampleBlock>

        <ExampleBlock title="Static" description="Gradient without animation." code={DAWN_GRADIENT_SOURCE}>
          <DawnGradientDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}