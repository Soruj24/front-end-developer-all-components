"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
} from "@/components/docs";
import {
  AllVariantsExample,
  AllSizesExample,
  WithIconsExample,
  IconOnlyExample,
  LoadingStateExample,
  DisabledStateExample,
  DestructiveConfirmExample,
  LinkButtonExample,
  FullWidthExample,
  FormActionsExample,
  WithBadgesExample,
  ToggleButtonExample,
  ButtonGroupExample,
  SocialButtonsExample,
  PremiumButtonsExample,
  CopyButtonExample,
  AnimationShowcaseExample,
  SoftVariantExample,
} from "@/components/ui/Button/examples";
import { InlineSelect } from "@/components/ui/InlineSelect";
import { cn } from "@/lib/cn";

const BUTTON_SOURCE = `import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "destructive-outline"
  | "link"
  | "soft";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "icon" | "icon-sm" | "icon-lg";

const variantClasses: Record<Variant, string> = {
  primary: [
    "bg-primary text-primary-foreground",
    "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
    "hover:bg-primary/90 hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]",
    "focus-visible:ring-primary/50",
  ].join(" "),
  secondary: [
    "bg-secondary text-secondary-foreground",
    "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
    "hover:bg-secondary/80 hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]",
    "focus-visible:ring-secondary/50",
  ].join(" "),
  outline: [
    "border border-input bg-background text-foreground",
    "shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]",
    "hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground/20",
    "hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.08)]",
    "focus-visible:ring-ring/50",
  ].join(" "),
  ghost: [
    "bg-transparent text-foreground",
    "hover:bg-accent hover:text-accent-foreground",
    "focus-visible:ring-ring/50",
  ].join(" "),
  destructive: [
    "bg-destructive text-destructive-foreground",
    "shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]",
    "hover:bg-destructive/90 hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15)]",
    "focus-visible:ring-destructive/50",
  ].join(" "),
  "destructive-outline": [
    "border border-destructive/30 bg-transparent text-destructive",
    "shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]",
    "hover:bg-destructive/5 hover:border-destructive/40",
    "hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]",
    "focus-visible:ring-destructive/50",
  ].join(" "),
  link: [
    "bg-transparent text-primary underline-offset-4",
    "hover:underline",
    "focus-visible:ring-primary/50",
    "p-0 h-auto",
  ].join(" "),
  soft: [
    "bg-primary/10 text-primary",
    "shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]",
    "hover:bg-primary/15 hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.06)]",
    "focus-visible:ring-primary/50",
  ].join(" "),
};

const sizeClasses: Record<Size, string> = {
  xs: "h-7 px-2.5 text-xs rounded-md gap-1 font-medium",
  sm: "h-8 px-3 text-sm rounded-md gap-1.5 font-medium",
  md: "h-9 px-4 text-sm rounded-md gap-2 font-medium",
  lg: "h-10 px-5 text-sm rounded-md gap-2 font-medium",
  xl: "h-11 px-6 text-base rounded-lg gap-2.5 font-medium",
  "icon-sm": "h-8 w-8 p-0 rounded-md",
  icon: "h-9 w-9 p-0 rounded-md",
  "icon-lg": "h-10 w-10 p-0 rounded-md",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium whitespace-nowrap",
          "transition-all duration-200 ease-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-[0.98]",
          "disabled:pointer-events-none disabled:opacity-50",
          "select-none",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };`;

const examples = [
  { id: "variants", title: "Variants", description: "All visual variants — primary, secondary, outline, ghost, soft, destructive, destructive-outline, link", category: "basic" },
  { id: "sizes", title: "Sizes", description: "Extra small through extra large, plus icon-only sizes", category: "basic" },
  { id: "icons", title: "With Icons", description: "Leading and trailing icons in buttons", category: "basic" },
  { id: "icon-only", title: "Icon Only", description: "Icon-only buttons in sm, md, and lg sizes", category: "basic" },
  { id: "loading", title: "Loading State", description: "Spinner animation with text swap", category: "interactive" },
  { id: "disabled", title: "Disabled State", description: "All variants in disabled state", category: "interactive" },
  { id: "destructive-confirm", title: "Destructive Confirm", description: "Two-step delete confirmation pattern", category: "patterns" },
  { id: "link", title: "Link Buttons", description: "Inline link-style buttons with external link icons", category: "variants" },
  { id: "soft", title: "Soft Variant", description: "Light background tint with color", category: "variants" },
  { id: "full-width", title: "Full Width", description: "Full-width buttons for mobile and forms", category: "layout" },
  { id: "form-actions", title: "Form Actions", description: "Save / Cancel pattern inside a card form", category: "patterns" },
  { id: "badges", title: "With Badges", description: "Notification count badges on buttons", category: "patterns" },
  { id: "toggle", title: "Toggle Buttons", description: "State toggle — star, save, follow", category: "interactive" },
  { id: "button-group", title: "Button Groups", description: "Grouped segmented controls", category: "layout" },
  { id: "social", title: "Social Login", description: "GitHub, Google, Apple sign-in buttons", category: "patterns" },
  { id: "premium", title: "Gradient Buttons", description: "Premium gradient buttons with glow shadows", category: "variants" },
  { id: "copy", title: "Copy Button", description: "Clipboard copy-to-clipboard pattern", category: "patterns" },
  { id: "animation", title: "Animations", description: "Hover and active transition showcase", category: "interactive" },
];

const componentMap: Record<string, React.FC> = {
  variants: AllVariantsExample,
  sizes: AllSizesExample,
  icons: WithIconsExample,
  "icon-only": IconOnlyExample,
  loading: LoadingStateExample,
  disabled: DisabledStateExample,
  "destructive-confirm": DestructiveConfirmExample,
  link: LinkButtonExample,
  soft: SoftVariantExample,
  "full-width": FullWidthExample,
  "form-actions": FormActionsExample,
  badges: WithBadgesExample,
  toggle: ToggleButtonExample,
  "button-group": ButtonGroupExample,
  social: SocialButtonsExample,
  premium: PremiumButtonsExample,
  copy: CopyButtonExample,
  animation: AnimationShowcaseExample,
};

export default function ButtonsPage() {
  const [activeExample, setActiveExample] = useState("variants");
  const currentExample = examples.find((e) => e.id === activeExample);
  const ActiveComponent = componentMap[activeExample];

  return (
    <ComponentDocPage
      name="Buttons"
      category="Elements"
      description="Versatile button component with 8 variants, 8 sizes, loading states, icon support, and premium focus-visible ring system."
    >
      <PreviewPanel filename="ButtonVariants.tsx">
        <AllVariantsExample />
      </PreviewPanel>

      <SourceCodeViewer
        source={BUTTON_SOURCE}
        filename="components/ui/Button.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            Examples
          </h2>

          <div className="hidden gap-1 overflow-x-auto sm:flex">
            {examples.map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => setActiveExample(ex.id)}
                className={cn(
                  "inline-flex shrink-0 items-center rounded-md px-3 py-1.5",
                  "text-xs font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  activeExample === ex.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {ex.title}
              </button>
            ))}
          </div>

          <div className="sm:hidden">
            <InlineSelect
              options={examples.map((ex) => ({ value: ex.id, label: ex.title }))}
              value={activeExample}
              onChange={(val) => setActiveExample(val)}
              size="sm"
            />
          </div>
        </div>

        {currentExample && ActiveComponent && (
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                {currentExample.title}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {currentExample.description}
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-border bg-background">
              <div className="flex min-h-48 items-center justify-center bg-gradient-to-br from-muted/30 via-background to-muted/30 p-8">
                <ActiveComponent />
              </div>
            </div>
          </div>
        )}
      </section>
    </ComponentDocPage>
  );
}
