import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const propsEditorFull: RegistryEntry = entry({
  id: "props-editor-full",
  title: "Visual Props Editor",
  description:
    "A no-code props editor with 15 control types — text, number, boolean, select, radio, color, slider, icon, image, padding, margin, border radius, shadow, width and height. Live preview, responsive values, undo/redo, and saveable presets.",
  source: `import { useState } from "react";
import { Button } from "@/components/ui";

export default function PropsEditorDemo() {
  const [radius, setRadius] = useState(16);
  const [accent, setAccent] = useState("#6366f1");
  const [theme, setTheme] = useState("light");

  const bg = theme === "dark" ? "#1e1e2f" : "#ffffff";
  const fg = theme === "dark" ? "#f3f4f6" : "#111827";

  return (
    <div className="flex w-full max-w-sm flex-col gap-5 p-4">
      <div className="flex flex-wrap gap-2">
        <input
          type="range"
          min={0}
          max={32}
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-muted accent-foreground"
        />
        <input
          type="color"
          value={accent}
          onChange={(e) => setAccent(e.target.value)}
          className="h-8 w-10 cursor-pointer rounded border border-border bg-background"
        />
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="h-8 rounded-md border border-border bg-background px-2 text-sm"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div
        className="flex flex-col gap-3 p-6 transition-all duration-200"
        style={{ backgroundColor: bg, color: fg, borderRadius: radius, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
      >
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold"
          style={{ backgroundColor: accent + "1a", color: accent }}
        >
          AM
        </div>
        <div>
          <h3 className="text-lg font-semibold">Alex Morgan</h3>
          <p className="text-sm font-medium" style={{ color: accent }}>
            Frontend Engineer
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Building delightful interfaces — one component at a time.
        </p>
        <Button onClick={() => setRadius((r) => (r === 0 ? 16 : 0))}>
          Toggle radius
        </Button>
      </div>
    </div>
  );
}`,
  dependencies: ["react", "@component-library/ui"],
});
