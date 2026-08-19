"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Coffee, Zap, Heart, Shield, Users, Calendar, Moon, Sun, Palette, Settings, Mail, BookOpen, Folder, CheckCircle, XCircle, AlertCircle, RefreshCcw, Layout, LayoutGrid, LayoutList, LayoutDashboard } from "lucide-react";

const CUP_SODA_SOURCE = "use client";

function CupSodaDemo() {
  const [flavor, setFlavor] = useState("cola");
  const flavors = ["cola", "lemon", "lime", "orange", "root beer", "cream soda"];

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-medium text-foreground">Select Flavor</h3>
        <select
          value={flavor}
          onChange={(e) => setFlavor(e.target.value)}
          className="rounded-border border-border w-48 px-3 py-2 text-sm focus:ring-1"
        >
          {flavors.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#{flavor === 'cola' ? '#ff6b6b' : '#a3a3a3'}] to-[#{flavor === 'lemon' ? '#fbbf24' : '#a3a3a3'}] to-[#{flavor === 'lime' ? '#84cc16' : '#a3a3a3'}] opacity-90 ring-4 ring-[color:#{flavor === 'cola' ? '#ff6b6b' : '#a3a3a3'}] flex items-center justify-center">
          <Zap className="h-10 w-10 text-yellow-400" />
        </div>
        <p className="text-xl font-medium text-foreground">{flavor}</p>
        <p className="text-sm text-muted-foreground">Cup Soda</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {flavors.map((f) => (
          <button
            key={f}
            onClick={() => setFlavor(f)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              flavor === f ? "bg-foreground text-background" : "hover:bg-muted/80"
            )}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CupSodaPage() {
  return (
    <ComponentDocPage
      name="Cup Soda"
      category="Data Display"
      description="A flavor selector with gradient visual feedback and preset soda options."
    >
      <PreviewPanel filename="cup-soda.tsx">
        <CupSodaDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CUP_SODA_SOURCE}
        filename="components/ui/CupSoda/CupSoda.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-4">
        <ExampleBlock title="Selector" description="Choose a soda flavor." code={CUP_SODA_SOURCE}>
          <CupSodaDemo />
        </ExampleBlock>

        <ExampleBlock title="Flavor Grid" description="Grid of flavor buttons." code={CUP_SODA_SOURCE}>
          <CupSodaDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}