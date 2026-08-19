"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const INPUT_SOURCE = `import { InputHTMLAttributes, forwardRef, useId, useState } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
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

    const leftPad = icon && iconPosition === "left" ? "pl-10" : "";
    const rightPad = (icon && iconPosition === "right") || clearable ? "pr-10" : "";

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
            className={\`flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-subtle transition-colors focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 \${
              error
                ? "border-danger focus:border-danger focus:ring-danger"
                : "border-input focus:border-ring focus:ring-ring"
            } \${leftPad} \${rightPad} \${className}\`}
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
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
              onClick={handleClear}
              tabIndex={-1}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {error && (
          <p id={errorId} className="text-sm text-danger">{error}</p>
        )}
        {helperText && !error && (
          <p id={helperId} className="text-sm text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;`;

const SEARCH_INPUT_SOURCE = `import { Input } from "@/components/ui";

function SearchIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

export default function SearchInput() {
  return <Input icon={<SearchIcon />} placeholder="Search..." clearable />;
}`;

const PASSWORD_INPUT_SOURCE = `import { useState } from "react";
import { Input } from "@/components/ui";

export default function PasswordInput() {
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
}`;

const ERROR_STATE_SOURCE = `import { Input } from "@/components/ui";

export default function ErrorInput() {
  return (
    <Input
      label="Email"
      type="email"
      placeholder="you@example.com"
      error="Please enter a valid email address"
    />
  );
}`;

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

export default Textarea;`;

function SearchIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

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

function XIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

const inputBase = "flex h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-subtle transition-colors focus:outline-none focus:ring-1 focus:border-ring focus:ring-ring";

export default function InputsPage() {
  const [textValue, setTextValue] = useState("");
  const [charCount, setCharCount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <ComponentDocPage
      name="Inputs"
      category="Forms"
      description="Various input types styled with Tailwind CSS — text, search, password, number, textarea, and more."
    >
      <PreviewPanel filename="Input.tsx">
        <div className="flex w-full max-w-md flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className={inputBase}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter password"
              className={inputBase}
            />
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={INPUT_SOURCE}
        filename="Input.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock title="Search Input" code={SEARCH_INPUT_SOURCE}>
          <div className="w-full max-w-sm">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className={`${inputBase} pl-10 pr-10`}
              />
              <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground">
                <XIcon />
              </button>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Icons" code={`import { Input } from "@/components/ui";

<Input icon={<MailIcon />} iconPosition="left" placeholder="Email" />
<Input icon={<UserIcon />} iconPosition="left" placeholder="Username" />`}>
          <div className="flex w-full max-w-md flex-col gap-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MailIcon />
              </div>
              <input type="email" placeholder="Email" className={`${inputBase} pl-10`} />
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <UserIcon />
              </div>
              <input type="text" placeholder="Username" className={`${inputBase} pl-10`} />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Error State" code={ERROR_STATE_SOURCE}>
          <div className="w-full max-w-sm">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="flex h-10 w-full rounded-lg border border-danger bg-background px-3 text-sm text-foreground placeholder:text-subtle transition-colors focus:outline-none focus:ring-1 focus:border-danger focus:ring-danger"
              />
              <p className="text-sm text-danger">Please enter a valid email address</p>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Number Input" code={`const [quantity, setQuantity] = useState(1);

<div className="flex items-center gap-3">
  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
  <input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
  <button onClick={() => setQuantity((q) => q + 1)}>+</button>
</div>`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-sm hover:bg-muted"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className={`${inputBase} w-20 text-center`}
            />
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-sm hover:bg-muted"
            >
              +
            </button>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Textarea" code={TEXTAREA_SOURCE}>
          <div className="w-full max-w-sm">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">Message</label>
              <textarea
                placeholder="Type your message..."
                className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-subtle transition-colors focus:outline-none focus:ring-1 focus:border-ring focus:ring-ring"
              />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Textarea with Character Count" code={`const [charCount, setCharCount] = useState("");

<textarea
  maxLength={200}
  value={charCount}
  onChange={(e) => setCharCount(e.target.value)}
  placeholder="Max 200 characters"
/>
<p>{charCount.length} / 200</p>`}>
          <div className="w-full max-w-sm">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-foreground">
                Bio
              </label>
              <textarea
                maxLength={200}
                value={charCount}
                onChange={(e) => setCharCount(e.target.value)}
                placeholder="Tell us about yourself..."
                className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-subtle transition-colors focus:outline-none focus:ring-1 focus:border-ring focus:ring-ring"
              />
              <p className="ml-auto text-xs text-muted-foreground">
                {charCount.length} / 200
              </p>
            </div>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
