"use client";

import { useState } from "react";
import { Input, Textarea } from "@/components/ui";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const INPUT_SOURCE = `import { InputHTMLAttributes, ReactNode, forwardRef, useId, useState } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  clearable?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, helperText, icon, iconPosition = "left", clearable, ...props }, ref) => {
    const uid = useId();
    const inputId = props.id ?? uid;
    const errorId = \`\${inputId}-error\`;
    const helperId = \`\${inputId}-helper\`;
    const [internalHasValue, setInternalHasValue] = useState(
      props.defaultValue !== undefined && props.defaultValue !== ""
    );

    const hasValue = props.value !== undefined ? props.value !== "" : internalHasValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    const handleClear = () => {
      setInternalHasValue(false);
      if (ref && typeof ref === "object" && ref.current) {
        const setter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype, "value"
        )?.set;
        setter?.call(ref.current, "");
        ref.current.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "flex h-10 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground",
              "placeholder:text-muted-foreground",
              "transition-colors duration-200",
              "hover:border-muted-foreground/30",
              "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "",
              icon && iconPosition === "left" ? "pl-10" : "",
              (icon && iconPosition === "right") || clearable ? "pr-10" : "",
              className,
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            onChange={handleChange}
            {...props}
          />
          {icon && iconPosition === "right" && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground">
              {icon}
            </div>
          )}
          {clearable && hasValue && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground transition-colors hover:text-foreground"
              onClick={handleClear}
              aria-label="Clear input"
              tabIndex={-1}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {error && <p id={errorId} className="text-sm text-destructive">{error}</p>}
        {helperText && !error && <p id={helperId} className="text-sm text-muted-foreground">{helperText}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;`;

function MailIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export default function InputsPage() {
  const [quantity, setQuantity] = useState(1);

  return (
    <ComponentDocPage
      name="Inputs"
      category="Forms"
      description="Various input types styled with Tailwind CSS — text, search, password, number, textarea, and more."
    >
      <PreviewPanel filename="Input.tsx">
        <div className="flex w-full max-w-md flex-col gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            icon={<MailIcon />}
            iconPosition="left"
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            icon={<LockIcon />}
            iconPosition="left"
          />
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={INPUT_SOURCE}
        filename="components/ui/Input.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic Input"
          description="Simple text input with placeholder."
          code={`<input
  type="text"
  placeholder="Enter your name"
  className="h-10 w-full rounded-xl border border-border bg-card px-3 text-sm"
/>`}
          filename="basic.tsx"
        >
          <div className="w-full max-w-sm">
            <input
              type="text"
              placeholder="Enter your name"
              className="flex h-10 w-full rounded-xl border border-border bg-card px-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors hover:border-muted-foreground/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Label"
          description="Input with a label for accessibility."
          code={`<Input label="Email" type="email" placeholder="you@example.com" />`}
          filename="with-label.tsx"
        >
          <div className="w-full max-w-sm">
            <Input label="Email" type="email" placeholder="you@example.com" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Icons"
          description="Left icon for visual context."
          code={`import { Input } from "@/components/ui";

<Input icon={<MailIcon />} iconPosition="left" placeholder="Email" />
<Input icon={<UserIcon />} iconPosition="left" placeholder="Username" />`}
          filename="with-icons.tsx"
        >
          <div className="flex w-full max-w-md flex-col gap-4">
            <Input icon={<MailIcon />} iconPosition="left" placeholder="Email" />
            <Input icon={<UserIcon />} iconPosition="left" placeholder="Username" />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Search Input"
          description="Search bar with icon and clear button."
          code={`import { Input } from "@/components/ui";

<Input icon={<SearchIcon />} placeholder="Search..." clearable />`}
          filename="search.tsx"
        >
          <div className="w-full max-w-sm">
            <Input icon={<SearchIcon />} placeholder="Search..." clearable />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Password Input"
          description="Password field with show/hide toggle."
          code={`import { useState } from "react";
import { Input } from "@/components/ui";

function PasswordInput() {
  const [visible, setVisible] = useState(false);
  return (
    <Input
      type={visible ? "text" : "password"}
      label="Password"
      placeholder="Enter password"
      icon={<LockIcon />}
      iconPosition="left"
    />
  );
}`}
          filename="password.tsx"
        >
          <div className="w-full max-w-sm">
            <Input
              type="password"
              label="Password"
              placeholder="Enter password"
              icon={<LockIcon />}
              iconPosition="left"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Error State"
          description="Input with validation error."
          code={`import { Input } from "@/components/ui";

<Input
  label="Email"
  type="email"
  placeholder="you@example.com"
  error="Please enter a valid email address"
/>`}
          filename="error.tsx"
        >
          <div className="w-full max-w-sm">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error="Please enter a valid email address"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Helper Text"
          description="Input with helper text below."
          code={`import { Input } from "@/components/ui";

<Input
  label="Username"
  placeholder="Choose a username"
  helperText="Must be at least 3 characters long"
/>`}
          filename="helper.tsx"
        >
          <div className="w-full max-w-sm">
            <Input
              label="Username"
              placeholder="Choose a username"
              helperText="Must be at least 3 characters long"
            />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Number Input"
          description="Quantity selector with increment/decrement."
          code={`const [quantity, setQuantity] = useState(1);

<div className="flex items-center gap-3">
  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
  <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
  <button onClick={() => setQuantity((q) => q + 1)}>+</button>
</div>`}
          filename="number.tsx"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="flex h-10 w-20 rounded-xl border border-border bg-card px-3 text-center text-sm text-foreground placeholder:text-muted-foreground transition-colors hover:border-muted-foreground/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              +
            </button>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Textarea"
          description="Multi-line text input."
          code={`import { Textarea } from "@/components/ui";

<Textarea label="Message" placeholder="Type your message..." />`}
          filename="textarea.tsx"
        >
          <div className="w-full max-w-sm">
            <Textarea label="Message" placeholder="Type your message..." />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Textarea with Character Count"
          description="Textarea with max length and character counter."
          code={`import { Textarea } from "@/components/ui";

<Textarea
  label="Bio"
  placeholder="Tell us about yourself..."
  maxLength={200}
  showCount
/>`}
          filename="textarea-count.tsx"
        >
          <div className="w-full max-w-sm">
            <Textarea
              label="Bio"
              placeholder="Tell us about yourself..."
              maxLength={200}
              showCount
            />
          </div>
        </ExampleBlock>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Prop
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Default
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Required
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  label
                </td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  error
                </td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  helperText
                </td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  icon
                </td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  iconPosition
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  &quot;left&quot; | &quot;right&quot;
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  &quot;left&quot;
                </td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  clearable
                </td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr className="border-b border-border">
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  className
                </td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-foreground">
                  ...props
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  InputHTMLAttributes
                </td>
                <td className="px-4 py-3 text-muted-foreground">—</td>
                <td className="px-4 py-3 text-muted-foreground">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </ComponentDocPage>
  );
}
