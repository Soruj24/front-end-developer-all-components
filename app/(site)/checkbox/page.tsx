"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const CHECKBOX_SOURCE = `"use client";

import { useCallback, useId } from "react";
import { cn } from "@/lib/cn";
import type { CheckboxProps } from "./Checkbox.types";

export function Checkbox({
  checked = false,
  onCheckedChange,
  label,
  disabled = false,
  id: idProp,
  className,
}: CheckboxProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const toggle = useCallback(() => {
    if (!disabled && onCheckedChange) onCheckedChange(!checked);
  }, [checked, disabled, onCheckedChange]);

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2 text-sm",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <button
        id={id}
        role="checkbox"
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors",
          checked
            ? "border-blue-600 bg-blue-600"
            : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-900",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        )}
      >
        {checked && (
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      {label && <span>{label}</span>}
    </label>
  );
}`;

const BASIC_CODE = `import { Checkbox } from "@/components/ui/Checkbox";

<Checkbox />`;

const WITH_LABEL_CODE = `import { Checkbox } from "@/components/ui/Checkbox";

<Checkbox label="Accept terms" />`;

const DISABLED_CODE = `import { Checkbox } from "@/components/ui/Checkbox";

<Checkbox disabled />
<Checkbox disabled label="Disabled with label" />`;

const GROUP_CODE = `import { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";

function CheckboxGroup() {
  const [items, setItems] = useState({ a: true, b: false, c: true });

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(items).map(([key, value]) => (
        <Checkbox
          key={key}
          checked={value}
          onCheckedChange={(v) =>
            setItems((prev) => ({ ...prev, [key]: v }))
          }
          label={key.toUpperCase()}
        />
      ))}
    </div>
  );
}`;

export default function CheckboxPage() {
  const [group, setGroup] = useState({ a: true, b: false, c: true });

  return (
    <ComponentDocPage
      name="Checkbox"
      category="Forms"
      description="A control that allows the user to toggle between checked and not checked. Use checkboxes for binary on/off options or to select multiple items from a list."
    >
      <PreviewPanel filename="checkbox-demo.tsx">
        <div className="flex flex-col gap-3">
          <Checkbox label="Accept terms and conditions" />
          <Checkbox label="Send me marketing emails" />
          <Checkbox disabled label="Disabled option" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={CHECKBOX_SOURCE}
        filename="Checkbox.tsx"
        defaultExpanded
      />

      <ExampleBlock title="Basic" code={BASIC_CODE}>
        <Checkbox />
      </ExampleBlock>

      <ExampleBlock title="With Label" code={WITH_LABEL_CODE}>
        <Checkbox label="Accept terms" />
      </ExampleBlock>

      <ExampleBlock title="Disabled" code={DISABLED_CODE}>
        <div className="flex flex-col gap-2">
          <Checkbox disabled />
          <Checkbox disabled label="Disabled with label" />
        </div>
      </ExampleBlock>

      <ExampleBlock title="Group" code={GROUP_CODE}>
        <div className="flex flex-col gap-2">
          {Object.entries(group).map(([key, value]) => (
            <Checkbox
              key={key}
              checked={value}
              onCheckedChange={(v) =>
                setGroup((prev) => ({ ...prev, [key]: v }))
              }
              label={key.toUpperCase()}
            />
          ))}
        </div>
      </ExampleBlock>
    </ComponentDocPage>
  );
}
