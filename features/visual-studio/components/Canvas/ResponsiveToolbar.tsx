"use client";

import { cn } from "@/lib/cn";
import { useStudio } from "../../context/StudioContext";
import type { ResponsiveBreakpoint } from "../../types/canvas";

interface DevicePreset {
  id: ResponsiveBreakpoint | null;
  label: string;
  width: number;
  icon: string;
}

const DEVICES: DevicePreset[] = [
  { id: null, label: "Free", width: 0, icon: "自由" },
  { id: "sm", label: "Mobile", width: 640, icon: "📱" },
  { id: "md", label: "Tablet", width: 768, icon: "📱" },
  { id: "lg", label: "Laptop", width: 1024, icon: "💻" },
  { id: "xl", label: "Desktop", width: 1280, icon: "🖥" },
  { id: "2xl", label: "Ultra Wide", width: 1536, icon: "🖥" },
];

export function ResponsiveToolbar() {
  const { canvas, setViewport } = useStudio();
  const current = canvas.viewport.responsiveMode;

  const setMode = (mode: ResponsiveBreakpoint | null) => {
    setViewport({ responsiveMode: mode });
  };

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-background p-1">
      {DEVICES.map((device) => (
        <button
          key={device.label}
          onClick={() => setMode(device.id)}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
            current === device.id
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
          title={`${device.label}${device.width ? ` (${device.width}px)` : ""}`}
        >
          <span className="text-sm">{device.icon}</span>
          <span className="hidden sm:inline">{device.label}</span>
        </button>
      ))}
      {current && (
        <div className="ml-2 border-l border-border pl-2 text-[10px] text-muted-foreground">
          {DEVICES.find((d) => d.id === current)?.width}px
        </div>
      )}
    </div>
  );
}
