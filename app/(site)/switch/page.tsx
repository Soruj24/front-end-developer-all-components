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

import { InputHTMLAttributes, forwardRef } from "react";

export interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className = "", label, description, ...props }, ref) => {
    return (
      <label className={\`flex items-start gap-3 \${className}\`}>
        <div className="relative mt-0.5 inline-flex h-6 w-11 flex-shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-ring-offset">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            className="peer sr-only"
            {...props}
          />
          <span className="absolute inset-0 rounded-full bg-muted peer-checked:bg-foreground" />
          <span className="absolute left-0.5 h-5 w-5 rounded-full bg-background shadow-sm transition-transform duration-200 ease-in-out peer-checked:translate-x-5" />
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-medium text-foreground">
                {label}
              </span>
            )}
            {description && (
              <span className="text-sm text-muted-foreground">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);
Switch.displayName = "Switch";

export default Switch;
export { Switch };`;

const BASIC_CODE = `import { Switch } from "@/components/ui/Switch";

<Switch />`;

const WITH_LABEL_CODE = `import { Switch } from "@/components/ui/Switch";

<Switch label="Enable notifications" />`;

const WITH_DESCRIPTION_CODE = `import { Switch } from "@/components/ui/Switch";

<Switch
  label="Dark mode"
  description="Toggle dark mode across the application"
/>`;

const DISABLED_CODE = `import { Switch } from "@/components/ui/Switch";

<Switch disabled />
<Switch disabled label="Disabled option" />`;

const CONTROLLED_CODE = `import { useState } from "react";
import { Switch } from "@/components/ui/Switch";

function ControlledSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
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
  );
}`;

export default function SwitchPage() {
  const [enabled, setEnabled] = useState(false);

  return (
    <ComponentDocPage
      name="Switch"
      category="Forms"
      description="A toggle switch that lets the user switch between two states. Ideal for on/off settings and boolean preferences."
    >
      <PreviewPanel filename="switch-demo.tsx">
        <div className="flex flex-col gap-4">
          <Switch label="Enable notifications" />
          <Switch
            label="Dark mode"
            description="Toggle dark mode across the application"
          />
          <Switch disabled label="Disabled option" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={SWITCH_SOURCE}
        filename="Switch.tsx"
        defaultExpanded
      />

      <ExampleBlock title="Basic" code={BASIC_CODE}>
        <Switch />
      </ExampleBlock>

      <ExampleBlock title="With Label" code={WITH_LABEL_CODE}>
        <Switch label="Enable notifications" />
      </ExampleBlock>

      <ExampleBlock title="With Description" code={WITH_DESCRIPTION_CODE}>
        <Switch
          label="Dark mode"
          description="Toggle dark mode across the application"
        />
      </ExampleBlock>

      <ExampleBlock title="Disabled" code={DISABLED_CODE}>
        <div className="flex flex-col gap-3">
          <Switch disabled />
          <Switch disabled label="Disabled option" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Controlled" code={CONTROLLED_CODE}>
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
    </ComponentDocPage>
  );
}
