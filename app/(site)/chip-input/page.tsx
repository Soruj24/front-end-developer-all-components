"use client";

import { useState } from "react";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const CHIP_SOURCE = `import { ButtonHTMLAttributes, forwardRef } from "react";

type ChipVariant = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "outline";
type ChipSize = "sm" | "md" | "lg";

const variantClasses: Record<ChipVariant, string> = {
  default: "bg-muted text-foreground",
  primary: "bg-info-soft text-info",
  secondary: "bg-primary-soft text-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  error: "bg-danger-soft text-danger",
  outline: "border border-current bg-transparent text-foreground",
};

const sizeClasses: Record<ChipSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-sm",
};

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ChipVariant;
  size?: ChipSize;
  removable?: boolean;
  onRemove?: () => void;
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className = "", variant = "default", size = "md", removable, onRemove, children, ...props }, ref) => (
    <button ref={ref} className={\`inline-flex items-center gap-1.5 rounded-full font-medium \${variantClasses[variant]} \${sizeClasses[size]} \${className}\`} {...props}>
      {children}
      {removable && <span onClick={(e) => { e.stopPropagation(); onRemove?.(); }} className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-current opacity-60 hover:opacity-100">✕</span>}
    </button>
  )
);
Chip.displayName = "Chip";

export default Chip;`;

const VARIANTS_SRC = `<Chip variant="default">Default</Chip>
<Chip variant="primary">Primary</Chip>
<Chip variant="secondary">Secondary</Chip>
<Chip variant="success">Success</Chip>
<Chip variant="warning">Warning</Chip>
<Chip variant="error">Error</Chip>
<Chip variant="outline">Outline</Chip>`;

const SIZES_SRC = `<Chip size="sm">Small</Chip>
<Chip size="md">Medium</Chip>
<Chip size="lg">Large</Chip>`;

const REMOVABLE_SRC = `"use client";
import { useState } from "react";
import Chip from "@/components/ui/Chip";

function RemovableShowcase() {
  const [chips, setChips] = useState(["Draft", "Published", "Archived"]);
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <Chip key={c} removable onRemove={() => setChips(chips.filter((x) => x !== c))}>{c}</Chip>
      ))}
    </div>
  );
}`;

const INPUT_SRC = `"use client";
import { useState } from "react";
import Chip from "@/components/ui/Chip";

function ChipInputDemo() {
  const [chips, setChips] = useState(["React", "TypeScript"]);
  const [input, setInput] = useState("");
  const add = () => { if (input.trim() && !chips.includes(input.trim())) { setChips([...chips, input.trim()]); setInput(""); } };
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background p-2">
      {chips.map((c, i) => (
        <Chip key={c} removable onRemove={() => setChips(chips.filter((_, j) => j !== i))}>{c}</Chip>
      ))}
      <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} placeholder="Add tag..." className="w-24 bg-transparent px-2 py-1 text-sm outline-none" />
    </div>
  );
}`;

const SUGGESTIONS_SRC = `"use client";
import { useState } from "react";
import Chip from "@/components/ui/Chip";

function SuggestionsDemo() {
  const [chips, setChips] = useState(["React"]);
  const [input, setInput] = useState("");
  const frameworks = ["Vue", "Angular", "Svelte", "Solid", "Qwik"];
  const available = frameworks.filter((s) => !chips.includes(s) && (!input || s.toLowerCase().includes(input.toLowerCase())));
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background p-2">
        {chips.map((c) => <Chip key={c} removable onRemove={() => setChips(chips.filter((x) => x !== c))}>{c}</Chip>)}
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search..." className="flex-1 bg-transparent px-2 py-1 text-sm outline-none" />
      </div>
      {available.length > 0 && <div className="mt-2 flex flex-wrap gap-1">
        {available.map((s) => <button key={s} onClick={() => { setChips([...chips, s]); setInput(""); }} className="rounded-full border border-dashed border-border px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted">+ {s}</button>)}
      </div>}
    </div>
  );
}`;

function IC({ variant = "default", size = "md", removable, onRemove, children }: { variant?: string; size?: string; removable?: boolean; onRemove?: () => void; children: React.ReactNode }) {
  const vc: Record<string, string> = { default: "bg-muted text-foreground", primary: "bg-info-soft text-info", secondary: "bg-primary-soft text-primary", success: "bg-success-soft text-success", warning: "bg-warning-soft text-warning", error: "bg-danger-soft text-danger", outline: "border border-current bg-transparent text-foreground" };
  const sc: Record<string, string> = { sm: "px-2 py-0.5 text-xs", md: "px-2.5 py-0.5 text-sm", lg: "px-3 py-1 text-sm" };
  return (
    <button className={`inline-flex items-center gap-1.5 rounded-full font-medium ${vc[variant] || vc.default} ${sc[size] || sc.md}`}>
      {children}
      {removable && <span onClick={onRemove} className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full text-current opacity-60 hover:opacity-100">✕</span>}
    </button>
  );
}

export default function ChipPage() {
  const [chips, setChips] = useState(["React", "TypeScript", "Next.js"]);
  const [input, setInput] = useState("");
  const [removable, setRemovable] = useState(["Draft", "Published", "Archived"]);
  const [suggestChips, setSuggestChips] = useState(["React"]);
  const [suggestInput, setSuggestInput] = useState("");
  const frameworks = ["Vue", "Angular", "Svelte", "Solid", "Qwik"].filter((s) => !suggestChips.includes(s));
  const filtered = suggestInput ? frameworks.filter((s) => s.toLowerCase().includes(suggestInput.toLowerCase())) : frameworks;

  const addChip = () => { if (input.trim() && !chips.includes(input.trim())) { setChips([...chips, input.trim()]); setInput(""); } };

  return (
    <ComponentDocPage name="Chip" category="Forms" description="A compact element for labels, tags, and filters. Supports variants, sizes, removable state, and autocomplete chip inputs.">
      <PreviewPanel filename="chip-preview.tsx">
        <div className="flex flex-wrap items-center gap-3">
          <IC variant="default">Default</IC><IC variant="primary">Primary</IC><IC variant="secondary">Secondary</IC>
          <IC variant="success">Success</IC><IC variant="warning">Warning</IC><IC variant="error">Error</IC><IC variant="outline">Outline</IC>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={CHIP_SOURCE} filename="components/ui/Chip.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Variants" description="Seven built-in variants for different semantic contexts." code={VARIANTS_SRC} filename="variants.tsx">
          <div className="flex flex-wrap items-center gap-3">
            <IC variant="default">Default</IC><IC variant="primary">Primary</IC><IC variant="secondary">Secondary</IC>
            <IC variant="success">Success</IC><IC variant="warning">Warning</IC><IC variant="error">Error</IC><IC variant="outline">Outline</IC>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Sizes" description="Three size options: sm, md, and lg." code={SIZES_SRC} filename="sizes.tsx">
          <div className="flex flex-wrap items-center gap-3">
            <IC size="sm">Small</IC><IC size="md">Medium</IC><IC size="lg">Large</IC>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Removable" description="Chips that can be dismissed by the user." code={REMOVABLE_SRC} filename="removable.tsx">
          <div className="flex flex-wrap gap-2">
            {removable.map((c, i) => <IC key={c} removable onRemove={() => setRemovable(removable.filter((_, j) => j !== i))}>{c}</IC>)}
          </div>
        </ExampleBlock>

        <ExampleBlock title="Chip Input" description="Type and press Enter to add chips. Click ✕ to remove." code={INPUT_SRC} filename="chip-input.tsx">
          <div className="w-full max-w-md">
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background p-2">
              {chips.map((c, i) => <IC key={c} removable onRemove={() => setChips(chips.filter((_, j) => j !== i))}>{c}</IC>)}
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addChip(); } }} placeholder="Add tag..." className="w-24 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground" />
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Suggestions" description="Autocomplete suggestions below the input area." code={SUGGESTIONS_SRC} filename="suggestions.tsx">
          <div className="w-full max-w-md">
            <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background p-2">
              {suggestChips.map((c) => <IC key={c} removable onRemove={() => setSuggestChips(suggestChips.filter((x) => x !== c))}>{c}</IC>)}
              <input value={suggestInput} onChange={(e) => setSuggestInput(e.target.value)} placeholder="Search frameworks..." className="flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground" />
            </div>
            {filtered.length > 0 && <div className="mt-2 flex flex-wrap gap-1">
              {filtered.map((s) => <button key={s} onClick={() => { setSuggestChips([...suggestChips, s]); setSuggestInput(""); }} className="inline-flex items-center gap-1 rounded-full border border-dashed border-border px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted">+ {s}</button>)}
            </div>}
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
