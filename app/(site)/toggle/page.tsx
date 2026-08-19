"use client";

import { useState } from "react";
import { Toggle } from "@/components/ui/Toggle";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const TOGGLE_SOURCE = `"use client";

import { cn } from "@/lib/cn";
import { ToggleProps } from "./Toggle.types";

const sizeClasses = {
  default: "h-10 px-3",
  sm: "h-9 px-2",
  lg: "h-11 px-4",
};

export default function Toggle({
  pressed = false,
  onPressedChange,
  disabled = false,
  size = "default",
  className,
  children,
}: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      data-state={pressed ? "on" : "off"}
      onClick={() => onPressedChange?.(!pressed)}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors",
        "hover:bg-muted hover:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        pressed && "bg-accent text-accent-foreground",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  );
}`;

const BASIC_CODE = `import { Toggle } from "@/components/ui/Toggle";

<Toggle>Toggle</Toggle>`;

const WITH_ICON_CODE = `import { Toggle } from "@/components/ui/Toggle";

<Toggle>
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
  Watch
</Toggle>`;

const DISABLED_CODE = `import { Toggle } from "@/components/ui/Toggle";

<Toggle disabled>Disabled</Toggle>`;

export default function TogglePage() {
  const [pressed, setPressed] = useState(false);

  return (
    <ComponentDocPage
      name="Toggle"
      category="Forms"
      description="A two-state button that can be either on or off. Use toggles for boolean settings or to switch between two states."
    >
      <PreviewPanel filename="toggle-demo.tsx">
        <div className="flex items-center gap-4">
          <Toggle pressed={pressed} onPressedChange={setPressed}>
            {pressed ? "On" : "Off"}
          </Toggle>
          <Toggle pressed>Always On</Toggle>
          <Toggle disabled>Disabled</Toggle>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={TOGGLE_SOURCE}
        filename="Toggle.tsx"
        defaultExpanded
      />

      <ExampleBlock title="Basic" code={BASIC_CODE}>
        <Toggle>Toggle</Toggle>
      </ExampleBlock>

      <ExampleBlock title="With Icon" code={WITH_ICON_CODE}>
        <Toggle>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Watch
        </Toggle>
      </ExampleBlock>

      <ExampleBlock title="Disabled" code={DISABLED_CODE}>
        <Toggle disabled>Disabled</Toggle>
      </ExampleBlock>
    </ComponentDocPage>
  );
}
