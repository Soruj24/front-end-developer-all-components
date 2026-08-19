"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const BUTTON_SOURCE = `import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
type Size = "sm" | "md" | "lg" | "icon";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline:
    "border border-border bg-background text-foreground hover:bg-muted",
  ghost:
    "bg-transparent text-foreground hover:bg-muted",
  destructive: "bg-danger text-danger-foreground shadow-sm hover:bg-danger/90 hover:shadow-md",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10 p-0",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={\`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 \${variantClasses[variant]} \${sizeClasses[size]} \${className}\`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;`;

const VARIANTS_SOURCE = `import { Button } from "@/components/ui";

export default function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}`;

const SIZES_SOURCE = `import { Button } from "@/components/ui";

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Settings">
        <SettingsIcon />
      </Button>
    </div>
  );
}`;

const LOADING_SOURCE = `import { useState } from "react";
import { Button } from "@/components/ui";

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function LoadingButton() {
  const [loading, setLoading] = useState(false);

  return (
    <Button onClick={() => setLoading(true)} disabled={loading}>
      {loading && <Spinner />}
      {loading ? "Saving..." : "Save"}
    </Button>
  );
}`;

const WITH_ICONS_SOURCE = `import { Button } from "@/components/ui";

function MailIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

export default function ButtonsWithIcons() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>
        <MailIcon />
        Email
      </Button>
      <Button variant="destructive">
        <TrashIcon />
        Delete
      </Button>
      <Button variant="outline">
        <CheckIcon />
        Confirm
      </Button>
    </div>
  );
}`;

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export default function ButtonsPage() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  return (
    <ComponentDocPage
      name="Buttons"
      category="Elements"
      description="A collection of button variants, sizes, and interactive states with Tailwind CSS styling."
    >
      <PreviewPanel filename="ButtonVariants.tsx">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={BUTTON_SOURCE}
        filename="Button.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock title="Variants" code={VARIANTS_SOURCE}>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Sizes" code={SIZES_SOURCE}>
          <div className="flex flex-wrap items-end gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Settings">
              <SettingsIcon />
            </Button>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Loading State" code={LOADING_SOURCE}>
          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setLoading(true)}
              disabled={loading}
            >
              {loading && <Spinner />}
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setLoading2(true)}
              disabled={loading2}
            >
              {loading2 && <Spinner />}
              {loading2 ? "Uploading..." : "Upload"}
            </Button>
            <Button variant="destructive" disabled>
              <Spinner />
              Deleting...
            </Button>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Icons" code={WITH_ICONS_SOURCE}>
          <div className="flex flex-wrap gap-3">
            <Button>
              <MailIcon />
              Email
            </Button>
            <Button variant="secondary">
              <SettingsIcon />
              Settings
            </Button>
            <Button variant="outline">
              <CheckIcon />
              Confirm
            </Button>
            <Button variant="destructive">
              <TrashIcon />
              Delete
            </Button>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
