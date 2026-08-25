"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/Switch";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const SWITCH_SOURCE = `"use client";

import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: SwitchSize;
  label?: string;
  description?: string;
  error?: boolean | string;
}

const TRACK_SIZES: Record<SwitchSize, string> = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-13",
};

const THUMB_SIZES: Record<SwitchSize, string> = {
  sm: "h-4 w-4 peer-checked:translate-x-4",
  md: "h-5 w-5 peer-checked:translate-x-5",
  lg: "h-6 w-6 peer-checked:translate-x-6",
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, size = "md", label, description, error, disabled, id, ...props }, ref) => {
    const switchId = id ?? (label ? \`switch-\${label.toLowerCase().replace(/\\s+/g, "-")}\` : undefined);
    return (
      <label htmlFor={switchId} className={cn("flex items-start gap-3", disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer", className)}>
        <div className={cn("relative mt-0.5 inline-flex shrink-0 items-center rounded-full border-2 transition-all duration-200 ease-in-out", TRACK_SIZES[size], error ? "border-rose-400 bg-rose-100 peer-checked:bg-rose-500" : "border-transparent bg-muted peer-checked:bg-primary", "focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/50 focus-within:ring-offset-2 focus-within:ring-offset-background")}>
          <input ref={ref} id={switchId} type="checkbox" role="switch" aria-invalid={!!error || undefined} className="peer sr-only" disabled={disabled} {...props} />
          <span className={cn("absolute inset-0 rounded-full transition-colors duration-200", error ? "bg-rose-100 peer-checked:bg-rose-500" : "bg-muted peer-checked:bg-primary")} />
          <span className={cn("absolute left-0.5 rounded-full bg-white shadow-sm transition-all duration-200 ease-in-out peer-checked:shadow-md", THUMB_SIZES[size])} />
        </div>
        {(label || description || error) && (
          <div className="flex flex-1 flex-col gap-0.5">
            {label && <span className="text-sm font-medium text-foreground">{label}</span>}
            {description && <span className="text-xs text-muted-foreground">{description}</span>}
            {typeof error === "string" && <span className="text-xs text-rose-500">{error}</span>}
          </div>
        )}
      </label>
    );
  },
);
Switch.displayName = "Switch";

export { Switch };`;

export default function SwitchPage() {
  const [enabled, setEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <ComponentDocPage
      name="Switch"
      category="Forms"
      description="A toggle switch for on/off settings with support for sizes, error states, and labels."
    >
      <PreviewPanel filename="switch-demo.tsx">
        <div className="flex flex-col gap-4">
          <Switch label="Enable notifications" checked={notifications} onCheckedChange={setNotifications} />
          <Switch
            label="Dark mode"
            description="Toggle dark mode across the application"
            checked={darkMode}
            onCheckedChange={setDarkMode}
          />
          <Switch disabled label="Disabled option" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={SWITCH_SOURCE}
        filename="components/ui/Switch.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Sizes"
          description="Three sizes: sm, md (default), and lg."
          code={`import { Switch } from "@/components/ui/Switch";\n\n<Switch size="sm" label="Small" />\n<Switch size="md" label="Medium" />\n<Switch size="lg" label="Large" />`}
          filename="sizes.tsx"
        >
          <div className="flex flex-col gap-4">
            <Switch size="sm" label="Small" />
            <Switch size="md" label="Medium (default)" />
            <Switch size="lg" label="Large" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Label and Description"
          description="Switch with text label and helper description."
          code={`import { Switch } from "@/components/ui/Switch";\n\n<Switch\n  label="Airplane mode"\n  description="Disables all wireless connections"\n/>`}
          filename="label-description.tsx"
        >
          <div className="flex flex-col gap-4">
            <Switch label="Enable notifications" />
            <Switch
              label="Dark mode"
              description="Toggle dark mode across the application"
            />
            <Switch
              label="Airplane mode"
              description="Disables all wireless connections"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Error State"
          description="Switch with error message for validation feedback."
          code={`import { Switch } from "@/components/ui/Switch";\n\n<Switch\n  error="This setting requires admin access"\n  label="Admin mode"\n/>`}
          filename="error.tsx"
        >
          <div className="flex flex-col gap-4">
            <Switch error="This setting requires admin access" label="Admin mode" />
            <Switch error label="Compact error" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Switch in disabled state."
          code={`import { Switch } from "@/components/ui/Switch";\n\n<Switch disabled />\n<Switch disabled label="Disabled option" />`}
          filename="disabled.tsx"
        >
          <div className="flex flex-col gap-4">
            <Switch disabled />
            <Switch disabled label="Disabled option" />
            <Switch
              disabled
              label="Locked setting"
              description="Contact admin to change"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Controlled"
          description="Controlled switch with state."
          code={`import { useState } from "react";\nimport { Switch } from "@/components/ui/Switch";\n\nfunction ControlledSwitch() {\n  const [enabled, setEnabled] = useState(false);\n  return (\n    <div className="flex flex-col gap-3">\n      <Switch\n        label="Airplane mode"\n        description={enabled ? "Wi-Fi and Bluetooth are off" : "Connected"}\n        checked={enabled}\n        onCheckedChange={setEnabled}\n      />\n      <p className="text-sm text-muted-foreground">\n        Status: {enabled ? "On" : "Off"}\n      </p>\n    </div>\n  );\n}`}
          filename="controlled.tsx"
        >
          <div className="flex flex-col gap-3">
            <Switch
              label="Airplane mode"
              description={enabled ? "Wi-Fi and Bluetooth are off" : "Connected"}
              checked={enabled}
              onCheckedChange={setEnabled}
            />
            <p className="text-sm text-muted-foreground">
              Status: {enabled ? "On" : "Off"}
            </p>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Group"
          description="Multiple switches in a settings group."
          code={`import { Switch } from "@/components/ui/Switch";\n\n<div className="space-y-4">\n  <Switch label="Push notifications" description="Receive push alerts" />\n  <Switch label="Email digest" description="Weekly summary email" />\n  <Switch label="SMS alerts" description="Critical alerts via SMS" />\n</div>`}
          filename="group.tsx"
        >
          <div className="space-y-4">
            <Switch label="Push notifications" description="Receive push alerts on your device" checked />
            <Switch label="Email digest" description="Weekly summary email" />
            <Switch label="SMS alerts" description="Critical alerts via SMS" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Inline"
          description="Switches used inline with other content."
          code={`import { Switch } from "@/components/ui/Switch";\n\n<div className="flex items-center justify-between rounded-xl border border-border bg-background p-4">\n  <div>\n    <p className="text-sm font-medium">Enable feature</p>\n    <p className="text-xs text-muted-foreground">Description text</p>\n  </div>\n  <Switch />\n</div>`}
          filename="inline.tsx"
        >
          <div className="flex flex-col gap-3">
            {[
              { label: "Analytics", description: "Collect usage data" },
              { label: "Beta features", description: "Try new features early" },
              { label: "Auto-save", description: "Save changes automatically" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
                <Switch size="sm" />
              </div>
            ))}
          </div>
        </ExampleBlock>
      </section>


    </ComponentDocPage>
  );
}
