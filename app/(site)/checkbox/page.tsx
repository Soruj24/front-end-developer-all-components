"use client";

import { useState, useCallback } from "react";
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

type CheckboxSize = "sm" | "md" | "lg";

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
  size?: CheckboxSize;
  className?: string;
}

const sizeClasses: Record<CheckboxSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const iconSizeClasses: Record<CheckboxSize, string> = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-3.5 w-3.5",
};

const labelSizeClasses: Record<CheckboxSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function Checkbox({
  checked = false,
  onCheckedChange,
  label,
  disabled = false,
  id: idProp,
  size = "md",
  className,
}: CheckboxProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const toggle = useCallback(() => {
    if (!disabled && onCheckedChange) onCheckedChange(!checked);
  }, [checked, disabled, onCheckedChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  return (
    <label
      htmlFor={id}
      className={cn(
        "inline-flex cursor-pointer items-center gap-2.5 select-none",
        labelSizeClasses[size],
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      <button
        id={id}
        role="checkbox"
        type="button"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        className={cn(
          "relative flex shrink-0 items-center justify-center rounded-md border transition-all duration-150",
          sizeClasses[size],
          checked
            ? "border-primary bg-primary text-primary-foreground shadow-sm shadow-primary/20"
            : "border-border bg-background hover:border-primary/50 hover:bg-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-95",
          disabled && "pointer-events-none",
        )}
      >
        {checked && (
          <svg className={cn("text-current", iconSizeClasses[size])} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      {label && <span className="text-foreground">{label}</span>}
    </label>
  );
}`;

const BASIC_CODE = `import { Checkbox } from "@/components/ui/Checkbox";

<Checkbox />`;

const WITH_LABEL_CODE = `import { Checkbox } from "@/components/ui/Checkbox";

<Checkbox label="Accept terms" />`;

const SIZES_CODE = `import { Checkbox } from "@/components/ui/Checkbox";

<div className="flex items-center gap-4">
  <Checkbox size="sm" label="Small" />
  <Checkbox size="md" label="Medium" />
  <Checkbox size="lg" label="Large" />
</div>`;

const DISABLED_CODE = `import { Checkbox } from "@/components/ui/Checkbox";

<Checkbox disabled />
<Checkbox disabled label="Disabled with label" />`;

const GROUP_CODE = `import { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";

function CheckboxGroup() {
  const [items, setItems] = useState({ a: true, b: false, c: true });

  return (
    <div className="flex flex-col gap-2.5">
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

const CHECKED_ALL_CODE = `import { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";

function SelectAll() {
  const [all, setAll] = useState(false);
  const [items, setItems] = useState({ a: false, b: false, c: false });

  const toggleAll = (v: boolean) => {
    setAll(v);
    setItems({ a: v, b: v, c: v });
  };

  return (
    <div className="flex flex-col gap-2.5">
      <Checkbox checked={all} onCheckedChange={toggleAll} label="Select all" />
      <div className="ml-5 flex flex-col gap-2.5">
        {Object.entries(items).map(([key, value]) => (
          <Checkbox
            key={key}
            checked={value}
            onCheckedChange={(v) => {
              setItems((prev) => ({ ...prev, [key]: v }));
              setAll(Object.values({ ...items, [key]: v }).every(Boolean));
            }}
            label={key.toUpperCase()}
          />
        ))}
      </div>
    </div>
  );
}`;

const FORM_VALIDATION_CODE = `import { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";

function AcceptanceForm() {
  const [accepted, setAccepted] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!accepted) { setError("You must accept the terms"); return; }
    setError("");
    // submit...
  };

  return (
    <div className="flex flex-col gap-3">
      <div>
        <Checkbox checked={accepted} onCheckedChange={setAccepted} label="I accept the terms" />
        {error && <p className="ml-7 mt-1 text-xs text-destructive">{error}</p>}
      </div>
      <Checkbox checked={marketing} onCheckedChange={setMarketing} label="Subscribe to newsletter (optional)" />
      <button onClick={handleSubmit} className="mt-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
        Submit
      </button>
    </div>
  );
}`;

export default function CheckboxPage() {
  const [group, setGroup] = useState({ a: true, b: false, c: true });
  const [all, setAll] = useState(false);
  const [items, setItems] = useState({ a: false, b: false, c: false });
  const [accepted, setAccepted] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [error, setError] = useState("");

  const toggleAll = useCallback((v: boolean) => {
    setAll(v);
    setItems({ a: v, b: v, c: v });
  }, []);

  const handleItemChange = useCallback(
    (key: string, v: boolean) => {
      setItems((prev) => {
        const next = { ...prev, [key]: v };
        setAll(Object.values(next).every(Boolean));
        return next;
      });
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    if (!accepted) {
      setError("You must accept the terms");
      return;
    }
    setError("");
  }, [accepted]);

  return (
    <ComponentDocPage
      name="Checkbox"
      category="Forms"
      description="A control that allows the user to toggle between checked and not checked. Supports sizes, keyboard navigation, labels, and group selection patterns."
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
        filename="components/ui/Checkbox/Checkbox.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock title="Basic" code={BASIC_CODE} filename="basic.tsx">
          <Checkbox />
        </ExampleBlock>

        <ExampleBlock title="With Label" code={WITH_LABEL_CODE} filename="with-label.tsx">
          <Checkbox label="Accept terms" />
        </ExampleBlock>

        <ExampleBlock title="Sizes" code={SIZES_CODE} filename="sizes.tsx">
          <div className="flex items-center gap-6">
            <Checkbox size="sm" label="Small" />
            <Checkbox size="md" label="Medium" />
            <Checkbox size="lg" label="Large" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Disabled" code={DISABLED_CODE} filename="disabled.tsx">
          <div className="flex flex-col gap-2.5">
            <Checkbox disabled />
            <Checkbox disabled label="Disabled with label" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Group" code={GROUP_CODE} filename="group.tsx">
          <div className="flex flex-col gap-2.5">
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

        <ExampleBlock title="Select All" code={CHECKED_ALL_CODE} filename="select-all.tsx">
          <div className="flex flex-col gap-2.5">
            <Checkbox checked={all} onCheckedChange={toggleAll} label="Select all" />
            <div className="ml-6 flex flex-col gap-2.5 border-l-2 border-border pl-4">
              {Object.entries(items).map(([key, value]) => (
                <Checkbox
                  key={key}
                  checked={value}
                  onCheckedChange={(v) => handleItemChange(key, v)}
                  label={key.toUpperCase()}
                />
              ))}
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Form Validation" code={FORM_VALIDATION_CODE} filename="form-validation.tsx">
          <div className="flex w-full max-w-sm flex-col gap-3">
            <div>
              <Checkbox checked={accepted} onCheckedChange={(v) => { setAccepted(v); setError(""); }} label="I accept the terms" />
              {error && <p className="ml-7 mt-1 text-xs text-red-500">{error}</p>}
            </div>
            <Checkbox checked={marketing} onCheckedChange={setMarketing} label="Subscribe to newsletter (optional)" />
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm shadow-primary/20 transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.97]"
            >
              Submit
            </button>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
