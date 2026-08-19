"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const TEXTAREA_SOURCE = `import { TextareaHTMLAttributes, forwardRef, useId, useState } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  showCount?: boolean;
  maxLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", label, error, showCount, maxLength, ...props }, ref) => {
    const uid = useId();
    const textareaId = props.id ?? uid;
    const [charCount, setCharCount] = useState(
      typeof props.defaultValue === "string" ? props.defaultValue.length : 0
    );

    const displayCount = props.value !== undefined ? String(props.value).length : charCount;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          maxLength={maxLength}
          className={\`flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-subtle transition-colors focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 \${
            error
              ? "border-danger focus:border-danger focus:ring-danger"
              : "border-input focus:border-ring focus:ring-ring"
          } \${className}\`}
          onChange={handleChange}
          {...props}
        />
        <div className="flex items-center justify-between">
          {error ? (
            <p className="text-sm text-danger">{error}</p>
          ) : (
            <div />
          )}
          {showCount && (
            <p className="ml-auto text-xs text-muted-foreground">
              {displayCount}{maxLength ? \` / \${maxLength}\` : ""}
            </p>
          )}
        </div>
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export default Textarea;
export { Textarea };`;

const SIZES_SOURCE = `import Textarea from "@/components/ui/Textarea";

<div className="flex flex-col gap-4 w-full">
  <Textarea label="Small" placeholder="Small textarea" className="min-h-[60px]" />
  <Textarea label="Medium" placeholder="Medium textarea" />
  <Textarea label="Large" placeholder="Large textarea" className="min-h-[120px]" />
</div>`;

const HELPER_SOURCE = `import Textarea from "@/components/ui/Textarea";

<div className="flex flex-col gap-4 w-full">
  <Textarea label="Bio" placeholder="Tell us about yourself..." />
  <Textarea label="Description" error="This field is required" placeholder="Enter description..." />
</div>`;

const COUNT_SOURCE = `import Textarea from "@/components/ui/Textarea";

<Textarea
  label="Feedback"
  placeholder="Share your thoughts..."
  showCount
  maxLength={200}
/>`;

function T({
  label,
  error,
  placeholder,
  showCount,
  maxLength,
  className,
}: {
  label?: string;
  error?: string;
  placeholder?: string;
  showCount?: boolean;
  maxLength?: number;
  className?: string;
}) {
  const [value, setValue] = useState("");
  const count = value.length;
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-subtle transition-colors focus:outline-none focus:ring-1 ${
          error
            ? "border-danger focus:border-danger focus:ring-danger"
            : "border-input focus:border-ring focus:ring-ring"
        } ${className ?? ""}`}
      />
      <div className="flex items-center justify-between">
        {error ? <p className="text-sm text-danger">{error}</p> : <div />}
        {showCount && (
          <p className="ml-auto text-xs text-muted-foreground">
            {count}{maxLength ? ` / ${maxLength}` : ""}
          </p>
        )}
      </div>
    </div>
  );
}

export default function TextareaPage() {
  return (
    <ComponentDocPage
      name="Textarea"
      category="Forms"
      description="A multi-line text input with label, error states, helper text, and character count."
    >
      <PreviewPanel filename="textarea-preview.tsx">
        <div className="w-full max-w-md">
          <T label="Message" placeholder="Type your message..." />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={TEXTAREA_SOURCE} filename="components/ui/Textarea.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Sizes"
          description="Adjust height with className for different use cases."
          code={SIZES_SOURCE}
          filename="sizes.tsx"
        >
          <div className="flex w-full max-w-md flex-col gap-4">
            <T label="Small" placeholder="Small textarea" className="min-h-[60px]" />
            <T label="Medium" placeholder="Medium textarea" />
            <T label="Large" placeholder="Large textarea" className="min-h-[120px]" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Helper Text & Errors"
          description="Display helper text or validation errors below the textarea."
          code={HELPER_SOURCE}
          filename="helper.tsx"
        >
          <div className="flex w-full max-w-md flex-col gap-4">
            <T label="Bio" placeholder="Tell us about yourself..." />
            <T label="Description" error="This field is required" placeholder="Enter description..." />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Character Count"
          description="Show a live character counter with a maximum length."
          code={COUNT_SOURCE}
          filename="character-count.tsx"
        >
          <div className="w-full max-w-md">
            <T label="Feedback" placeholder="Share your thoughts..." showCount maxLength={200} />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
