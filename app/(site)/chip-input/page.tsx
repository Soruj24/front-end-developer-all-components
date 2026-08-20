"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const CHIP_SOURCE = `import { ButtonHTMLAttributes, forwardRef, useCallback } from "react";
import { cn } from "@/lib/cn";

type ChipVariant = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "outline";
type ChipSize = "sm" | "md" | "lg";

const variantClasses: Record<ChipVariant, string> = {
  default: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  primary: "bg-primary/10 text-primary hover:bg-primary/20",
  secondary: "bg-primary text-primary-foreground hover:bg-primary/90",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900",
  error: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900",
  outline: "border border-border bg-transparent text-foreground hover:bg-muted",
};

const sizeClasses: Record<ChipSize, string> = {
  sm: "h-6 px-2 text-xs gap-1",
  md: "h-7 px-2.5 text-xs gap-1.5",
  lg: "h-8 px-3 text-sm gap-2",
};

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipVariant;
  size?: ChipSize;
  removable?: boolean;
  onRemove?: () => void;
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant = "default", size = "md", removable, onRemove, children, disabled, ...props }, ref) => {
    const handleRemove = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      onRemove?.();
    }, [onRemove]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); onRemove?.(); }
    }, [onRemove]);

    return (
      <button ref={ref} type="button" disabled={disabled}
        className={cn(
          "inline-flex shrink-0 items-center rounded-full font-medium transition-colors duration-150",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "active:scale-[0.97]",
          disabled && "pointer-events-none opacity-50",
          variantClasses[variant], sizeClasses[size], className,
        )}
        onKeyDown={removable ? handleKeyDown : undefined} {...props}
      >
        {children}
        {removable && (
          <button type="button" aria-label="Remove" onClick={handleRemove}
            className={cn("ml-0.5 -mr-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors duration-150",
              "hover:bg-black/10 dark:hover:bg-white/15 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring")}>
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </button>
    );
  }
);
Chip.displayName = "Chip";

export default Chip;`;

const VARIANTS_SRC = `import { Chip } from "@/components/ui/Chip";

<div className="flex flex-wrap items-center gap-2">
  <Chip variant="default">Default</Chip>
  <Chip variant="primary">Primary</Chip>
  <Chip variant="secondary">Secondary</Chip>
  <Chip variant="success">Success</Chip>
  <Chip variant="warning">Warning</Chip>
  <Chip variant="error">Error</Chip>
  <Chip variant="outline">Outline</Chip>
</div>`;

const SIZES_SRC = `import { Chip } from "@/components/ui/Chip";

<div className="flex flex-wrap items-center gap-2">
  <Chip size="sm">Small</Chip>
  <Chip size="md">Medium</Chip>
  <Chip size="lg">Large</Chip>
</div>`;

const REMOVABLE_SRC = `"use client";
import { useState } from "react";
import { Chip } from "@/components/ui/Chip";

function RemovableShowcase() {
  const [chips, setChips] = useState(["Draft", "Published", "Archived"]);
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <Chip key={c} removable onRemove={() => setChips(chips.filter((x) => x !== c))}>
          {c}
        </Chip>
      ))}
    </div>
  );
}`;

const INPUT_SRC = `"use client";
import { useState } from "react";
import { Chip } from "@/components/ui/Chip";

function ChipInputDemo() {
  const [chips, setChips] = useState(["React", "TypeScript"]);
  const [input, setInput] = useState("");
  const add = () => { if (input.trim() && !chips.includes(input.trim())) { setChips([...chips, input.trim()]); setInput(""); } };
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
      {chips.map((c, i) => (
        <Chip key={c} removable onRemove={() => setChips(chips.filter((_, j) => j !== i))}>{c}</Chip>
      ))}
      <input value={input} onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
        placeholder="Add tag..."
        className="w-24 bg-transparent px-1 py-0.5 text-sm outline-none placeholder:text-muted-foreground" />
    </div>
  );
}`;

const SUGGESTIONS_SRC = `"use client";
import { useState } from "react";
import { Chip } from "@/components/ui/Chip";

function SuggestionsDemo() {
  const [chips, setChips] = useState(["React"]);
  const [input, setInput] = useState("");
  const frameworks = ["Vue", "Angular", "Svelte", "Solid", "Qwik"];
  const available = frameworks.filter((s) => !chips.includes(s) && (!input || s.toLowerCase().includes(input.toLowerCase())));
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
        {chips.map((c) => <Chip key={c} removable onRemove={() => setChips(chips.filter((x) => x !== c))}>{c}</Chip>)}
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search..."
          className="flex-1 bg-transparent px-1 py-0.5 text-sm outline-none placeholder:text-muted-foreground" />
      </div>
      {available.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {available.map((s) => (
            <button key={s} onClick={() => { setChips([...chips, s]); setInput(""); }}
              className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted hover:text-foreground">
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}`;

const STATUS_MAP_SRC = `import { Chip } from "@/components/ui/Chip";

const statuses = [
  { label: "Active", variant: "success" },
  { label: "Pending", variant: "warning" },
  { label: "Error", variant: "error" },
  { label: "Draft", variant: "default" },
];

<div className="flex flex-wrap items-center gap-2">
  {statuses.map(({ label, variant }) => (
    <Chip key={label} variant={variant}>{label}</Chip>
  ))}
</div>`;

const WITH_ICONS_SRC = `import { Chip } from "@/components/ui/Chip";

function Dot({ className }: { className?: string }) {
  return <span className={cn("h-1.5 w-1.5 rounded-full", className)} />;
}

<div className="flex flex-wrap items-center gap-2">
  <Chip variant="success"><Dot className="bg-emerald-500" />Online</Chip>
  <Chip variant="warning"><Dot className="bg-amber-500" />Away</Chip>
  <Chip variant="error"><Dot className="bg-red-500" />Offline</Chip>
</div>`;

const DISABLED_SRC = `import { Chip } from "@/components/ui/Chip";

<div className="flex flex-wrap items-center gap-2">
  <Chip disabled>Disabled</Chip>
  <Chip variant="primary" disabled>Disabled</Chip>
</div>`;

export default function ChipPage() {
  const [chips, setChips] = useState(["React", "TypeScript", "Next.js"]);
  const [input, setInput] = useState("");
  const [removable, setRemovable] = useState(["Draft", "Published", "Archived"]);
  const [suggestChips, setSuggestChips] = useState(["React"]);
  const [suggestInput, setSuggestInput] = useState("");
  const frameworks = ["Vue", "Angular", "Svelte", "Solid", "Qwik"].filter(
    (s) => !suggestChips.includes(s),
  );
  const filtered = suggestInput
    ? frameworks.filter((s) =>
        s.toLowerCase().includes(suggestInput.toLowerCase()),
      )
    : frameworks;

  const addChip = () => {
    if (input.trim() && !chips.includes(input.trim())) {
      setChips([...chips, input.trim()]);
      setInput("");
    }
  };

  return (
    <ComponentDocPage
      name="Chip"
      category="Forms"
      description="A compact element for labels, tags, and filters. Supports 7 variants, 3 sizes, removable state, keyboard deletion, and autocomplete chip inputs."
    >
      <PreviewPanel filename="chip-preview.tsx">
        <div className="flex flex-wrap items-center gap-2">
          <Chip variant="default">Default</Chip>
          <Chip variant="primary">Primary</Chip>
          <Chip variant="secondary">Secondary</Chip>
          <Chip variant="success">Success</Chip>
          <Chip variant="warning">Warning</Chip>
          <Chip variant="error">Error</Chip>
          <Chip variant="outline">Outline</Chip>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={CHIP_SOURCE}
        filename="components/ui/Chip.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Variants"
          description="Seven built-in variants for different semantic contexts."
          code={VARIANTS_SRC}
          filename="variants.tsx"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Chip variant="default">Default</Chip>
            <Chip variant="primary">Primary</Chip>
            <Chip variant="secondary">Secondary</Chip>
            <Chip variant="success">Success</Chip>
            <Chip variant="warning">Warning</Chip>
            <Chip variant="error">Error</Chip>
            <Chip variant="outline">Outline</Chip>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Three size options: sm, md, and lg."
          code={SIZES_SRC}
          filename="sizes.tsx"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Chip size="sm">Small</Chip>
            <Chip size="md">Medium</Chip>
            <Chip size="lg">Large</Chip>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Removable"
          description="Chips with a close button. Press Delete/Backspace to remove when focused."
          code={REMOVABLE_SRC}
          filename="removable.tsx"
        >
          <div className="flex flex-wrap gap-2">
            {removable.map((c, i) => (
              <Chip
                key={c}
                removable
                onRemove={() => setRemovable(removable.filter((_, j) => j !== i))}
              >
                {c}
              </Chip>
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Chip Input"
          description="Type and press Enter to add chips. Click the close button or press Delete to remove."
          code={INPUT_SRC}
          filename="chip-input.tsx"
        >
          <div className="w-full max-w-md">
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
              {chips.map((c, i) => (
                <Chip
                  key={c}
                  removable
                  onRemove={() => setChips(chips.filter((_, j) => j !== i))}
                >
                  {c}
                </Chip>
              ))}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addChip();
                  }
                }}
                placeholder="Add tag..."
                className="w-24 bg-transparent px-1 py-0.5 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Suggestions"
          description="Autocomplete suggestions below the input area."
          code={SUGGESTIONS_SRC}
          filename="suggestions.tsx"
        >
          <div className="w-full max-w-md">
            <div className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
              {suggestChips.map((c) => (
                <Chip
                  key={c}
                  removable
                  onRemove={() =>
                    setSuggestChips(suggestChips.filter((x) => x !== c))
                  }
                >
                  {c}
                </Chip>
              ))}
              <input
                value={suggestInput}
                onChange={(e) => setSuggestInput(e.target.value)}
                placeholder="Search frameworks..."
                className="flex-1 bg-transparent px-1 py-0.5 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            {filtered.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {filtered.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setSuggestChips([...suggestChips, s]);
                      setSuggestInput("");
                    }}
                    className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted hover:text-foreground"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Status Map"
          description="Using variants to represent status states."
          code={STATUS_MAP_SRC}
          filename="status-map.tsx"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Chip variant="success">Active</Chip>
            <Chip variant="warning">Pending</Chip>
            <Chip variant="error">Error</Chip>
            <Chip variant="default">Draft</Chip>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Icons"
          description="Prepending a status dot icon to chip content."
          code={WITH_ICONS_SRC}
          filename="with-icons.tsx"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Chip variant="success">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online
            </Chip>
            <Chip variant="warning">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Away
            </Chip>
            <Chip variant="error">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Offline
            </Chip>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Disabled chips are non-interactive with reduced opacity."
          code={DISABLED_SRC}
          filename="disabled.tsx"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Chip disabled>Disabled</Chip>
            <Chip variant="primary" disabled>
              Disabled
            </Chip>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
