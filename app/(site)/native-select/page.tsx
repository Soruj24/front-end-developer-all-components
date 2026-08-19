"use client";

import { useState } from "react";
import { NativeSelect } from "@/components/ui/NativeSelect";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const NATIVESLECT_SOURCE = `"use client";

import { cn } from "@/lib/cn";
import type { NativeSelectProps } from "./NativeSelect.types";

export function NativeSelect({
  value,
  onValueChange,
  options,
  placeholder,
  disabled = false,
  className,
}: NativeSelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      disabled={disabled}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border bg-white px-3 py-2 text-sm dark:bg-zinc-900",
        "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2371717a%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem] bg-[right_0.5rem_center] bg-no-repeat pr-8",
        "focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:focus:ring-zinc-500",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}`;

const BASIC_CODE = `import { NativeSelect } from "@/components/ui/NativeSelect";

<NativeSelect
  placeholder="Select a framework"
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
  ]}
/>`;

const WITH_VALUE_CODE = `import { useState } from "react";
import { NativeSelect } from "@/components/ui/NativeSelect";

function ControlledExample() {
  const [value, setValue] = useState("react");

  return (
    <NativeSelect
      value={value}
      onValueChange={setValue}
      options={[
        { value: "react", label: "React" },
        { value: "vue", label: "Vue" },
      ]}
    />
  );
}`;

const DISABLED_CODE = `import { NativeSelect } from "@/components/ui/NativeSelect";

<NativeSelect
  disabled
  placeholder="Cannot select"
  options={[{ value: "a", label: "Option A" }]}
/>`;

const OPTIONS_WITH_DISABLED_CODE = `import { NativeSelect } from "@/components/ui/NativeSelect";

<NativeSelect
  placeholder="Choose one"
  options={[
    { value: "a", label: "Available" },
    { value: "b", label: "Unavailable", disabled: true },
    { value: "c", label: "Available" },
  ]}
/>`;

export default function NativeSelectPage() {
  const [value, setValue] = useState("react");

  return (
    <ComponentDocPage
      name="Native Select"
      category="Forms"
      description="A native HTML select element with options array, placeholder, controlled value, and disabled states."
    >
      <PreviewPanel filename="native-select-demo.tsx">
        <div className="w-full max-w-xs">
          <NativeSelect
            placeholder="Select a framework"
            value={value}
            onValueChange={setValue}
            options={[
              { value: "react", label: "React" },
              { value: "vue", label: "Vue" },
              { value: "angular", label: "Angular" },
              { value: "svelte", label: "Svelte" },
            ]}
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={NATIVESLECT_SOURCE}
        filename="NativeSelect.tsx"
        defaultExpanded
      />

      <ExampleBlock title="Basic" code={BASIC_CODE}>
        <div className="w-full max-w-xs">
          <NativeSelect
            placeholder="Select a framework"
            options={[
              { value: "react", label: "React" },
              { value: "vue", label: "Vue" },
              { value: "angular", label: "Angular" },
            ]}
          />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Controlled" code={WITH_VALUE_CODE}>
        <div className="w-full max-w-xs">
          <NativeSelect
            value={value}
            onValueChange={setValue}
            options={[
              { value: "react", label: "React" },
              { value: "vue", label: "Vue" },
            ]}
          />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Disabled" code={DISABLED_CODE}>
        <div className="w-full max-w-xs">
          <NativeSelect
            disabled
            placeholder="Cannot select"
            options={[{ value: "a", label: "Option A" }]}
          />
        </div>
      </ExampleBlock>

      <ExampleBlock
        title="Disabled Options"
        code={OPTIONS_WITH_DISABLED_CODE}
      >
        <div className="w-full max-w-xs">
          <NativeSelect
            placeholder="Choose one"
            options={[
              { value: "a", label: "Available" },
              { value: "b", label: "Unavailable", disabled: true },
              { value: "c", label: "Available" },
            ]}
          />
        </div>
      </ExampleBlock>
    </ComponentDocPage>
  );
}
