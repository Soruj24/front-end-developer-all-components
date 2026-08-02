import type { PlaygroundFile } from "../types";

/**
 * Default multi-file project shown on first launch. Demonstrates a typed
 * React component, a Tailwind class builder, a CSS module, shared types and
 * helpers, a README, and the App entry that composes them.
 */
export const DEFAULT_PROJECT: PlaygroundFile[] = [
  {
    name: "types.ts",
    source: `export type Tone = "default" | "primary" | "ghost" | "danger";
export type Size = "sm" | "md" | "lg";

export interface ButtonProps {
  label: string;
  tone?: Tone;
  size?: Size;
  disabled?: boolean;
  onClick?: () => void;
}`,
  },
  {
    name: "utils.ts",
    source: `import type { ButtonProps } from "./types";

const TONES: Record<NonNullable<ButtonProps["tone"]>, string> = {
  default: "bg-zinc-100 text-zinc-800 hover:bg-zinc-200",
  primary: "bg-indigo-600 text-white hover:bg-indigo-500",
  ghost: "bg-transparent text-zinc-600 hover:bg-zinc-100",
  danger: "bg-rose-600 text-white hover:bg-rose-500",
};

const SIZES: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonClasses(props: ButtonProps): string {
  const tone = TONES[props.tone ?? "default"];
  const size = SIZES[props.size ?? "md"];
  return \`\${tone} \${size} inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50\`;
}`,
  },
  {
    name: "Button.tsx",
    source: `import { buttonClasses } from "./utils";
import type { ButtonProps } from "./types";
import "./button.css";

export default function Button({
  label,
  tone,
  size,
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={\`button-base \${buttonClasses({ label, tone, size, disabled, onClick })}\`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}`,
  },
  {
    name: "button.css",
    source: `/* Imported as a side-effect by Button.tsx. */
.button-base {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.button-base:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}`,
  },
  {
    name: "README.md",
    source: `# Button — Playground

A typed, multi-file component built in the browser.

- **types.ts** — shared prop types
- **utils.ts** — Tailwind class builder
- **Button.tsx** — the component
- **button.css** — plain CSS side-effect import

Edit any file; the preview recompiles automatically.`,
  },
  {
    name: "App.tsx",
    source: `import { useState } from "react";
import Button from "./Button";
import type { Size, Tone } from "./types";

const TONES: Tone[] = ["default", "primary", "ghost", "danger"];
const SIZES: Size[] = ["sm", "md", "lg"];

export default function App() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex w-full max-w-md flex-col gap-6 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Button Playground
        </h2>
        <p className="mt-1 text-sm text-zinc-500">
          Four tones × three sizes, with a CSS side-effect import.
        </p>
      </div>

      {TONES.map((tone) => (
        <div key={tone} className="flex flex-wrap items-center gap-3">
          <span className="w-20 text-xs uppercase tracking-wide text-zinc-400">
            {tone}
          </span>
          {SIZES.map((size) => (
            <Button
              key={size}
              label={tone === "primary" && pressed ? "✓ Done" : size}
              tone={tone}
              size={size}
              onClick={() => setPressed((v) => !v)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}`,
  },
];
