"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { KeyInput } from "@/components/ui/key-input";

const KEY_INPUT_SOURCE = `import * as React from "react";
import { cn } from "@/lib/cn";

interface KeyInputProps extends React.HTMLAttributes<HTMLDivElement> {
  keys: string[];
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
}

function KeyInput({ keys, size = "md", variant = "default", className, ...props }: KeyInputProps) {
  const sizeClasses = {
    sm: "h-5 min-w-[20px] px-1 text-[10px]",
    md: "h-6 min-w-[24px] px-1.5 text-xs",
    lg: "h-8 min-w-[32px] px-2 text-sm",
  };

  const variantClasses = {
    default: "bg-muted border border-border text-foreground shadow-sm",
    outline: "bg-background border border-border text-foreground",
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)} {...props}>
      {keys.map((key, i) => (
        <kbd
          key={\`\${key}-\${i}\`}
          className={cn(
            "inline-flex items-center justify-center rounded-md font-mono font-medium",
            sizeClasses[size],
            variantClasses[variant]
          )}
        >
          {key}
        </kbd>
      ))}
    </div>
  );
}

export { KeyInput };
export type { KeyInputProps };`;

const BASIC_EXAMPLE = `<KeyInput keys={["Ctrl", "S"]} />`;

const VARIANTS_EXAMPLE = `<KeyInput keys={["Ctrl", "C"]} variant="default" />
<KeyInput keys={["Ctrl", "V"]} variant="outline" />`;

const SIZES_EXAMPLE = `<KeyInput keys={["Enter"]} size="sm" />
<KeyInput keys={["Enter"]} size="md" />
<KeyInput keys={["Enter"]} size="lg" />`;

const VSCODE_SHORTCUTS = [
  { keys: ["Ctrl", "P"], label: "Quick Open File" },
  { keys: ["Ctrl", "Shift", "P"], label: "Command Palette" },
  { keys: ["Ctrl", "/"], label: "Toggle Comment" },
  { keys: ["Ctrl", "Space"], label: "Trigger Suggest" },
  { keys: ["F12"], label: "Go to Definition" },
  { keys: ["Ctrl", "G"], label: "Go to Line" },
];

const BROWSER_SHORTCUTS = [
  { keys: ["Ctrl", "T"], label: "New Tab" },
  { keys: ["Ctrl", "W"], label: "Close Tab" },
  { keys: ["Ctrl", "Shift", "T"], label: "Reopen Tab" },
  { keys: ["Ctrl", "L"], label: "Focus Address Bar" },
  { keys: ["Ctrl", "R"], label: "Reload Page" },
  { keys: ["F12"], label: "DevTools" },
];

const ShortcutList = ({ shortcuts }: { shortcuts: { keys: string[]; label: string }[] }) => (
  <div className="grid gap-3">
    {shortcuts.map((s) => (
      <div key={s.label} className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2.5">
        <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
        <KeyInput keys={s.keys} size="sm" />
      </div>
    ))}
  </div>
);

export default function KeyInputPage() {
  return (
    <ComponentDocPage
      name="Key Input"
      category="Data Display"
      description="A component for displaying keyboard shortcuts and key combinations with a clean, developer-focused aesthetic. Ideal for cheat sheets, shortcut references, and help dialogs."
    >
      <PreviewPanel filename="key-input-preview.tsx">
        <div className="flex flex-wrap gap-3">
          <KeyInput keys={["Ctrl", "S"]} />
          <KeyInput keys={["Ctrl", "Shift", "P"]} />
          <KeyInput keys={["Alt", "F12"]} />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={KEY_INPUT_SOURCE}
        filename="components/ui/key-input.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="A simple key combination." code={BASIC_EXAMPLE}>
          <KeyInput keys={["Ctrl", "S"]} />
        </ExampleBlock>

        <ExampleBlock
          title="Variants"
          description="Two visual styles: default and outline."
          code={VARIANTS_EXAMPLE}
        >
          <div className="flex items-center gap-3">
            <KeyInput keys={["Ctrl", "C"]} variant="default" />
            <KeyInput keys={["Ctrl", "V"]} variant="outline" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Sizes" description="Three size options: sm, md, and lg." code={SIZES_EXAMPLE}>
          <div className="flex items-center gap-3">
            <KeyInput keys={["Enter"]} size="sm" />
            <KeyInput keys={["Enter"]} size="md" />
            <KeyInput keys={["Enter"]} size="lg" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="VS Code Shortcuts"
          description="Reference for common VS Code keyboard shortcuts."
          code={`"use client";
import { KeyInput } from "@/components/ui/key-input";

function VSCodeShortcutsDemo() {
  const shortcuts = [
    { keys: ["Ctrl", "P"], label: "Quick Open File" },
    { keys: ["Ctrl", "Shift", "P"], label: "Command Palette" },
    { keys: ["Ctrl", "/"], label: "Toggle Comment" },
    { keys: ["Ctrl", "Space"], label: "Trigger Suggest" },
    { keys: ["F12"], label: "Go to Definition" },
    { keys: ["Ctrl", "G"], label: "Go to Line" },
  ];
  return (
    <div className="grid gap-3">
      {shortcuts.map((s) => (
        <div key={s.label} className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2.5">
          <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
          <KeyInput keys={s.keys} size="sm" />
        </div>
      ))}
    </div>
  );
}`}
        >
          <ShortcutList shortcuts={VSCODE_SHORTCUTS} />
        </ExampleBlock>

        <ExampleBlock
          title="Browser Shortcuts"
          description="Reference for common browser keyboard shortcuts."
          code={`"use client";
import { KeyInput } from "@/components/ui/key-input";

function BrowserShortcutsDemo() {
  const shortcuts = [
    { keys: ["Ctrl", "T"], label: "New Tab" },
    { keys: ["Ctrl", "W"], label: "Close Tab" },
    { keys: ["Ctrl", "Shift", "T"], label: "Reopen Tab" },
    { keys: ["Ctrl", "L"], label: "Focus Address Bar" },
    { keys: ["Ctrl", "R"], label: "Reload Page" },
    { keys: ["F12"], label: "DevTools" },
  ];
  return (
    <div className="grid gap-3">
      {shortcuts.map((s) => (
        <div key={s.label} className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2.5">
          <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
          <KeyInput keys={s.keys} size="sm" />
        </div>
      ))}
    </div>
  );
}`}
        >
          <ShortcutList shortcuts={BROWSER_SHORTCUTS} />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
