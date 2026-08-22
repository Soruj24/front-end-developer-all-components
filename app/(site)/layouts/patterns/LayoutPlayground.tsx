"use client";

import { useState } from "react";

const densities = {
  compact: "gap-1.5 p-1.5",
  cozy: "gap-2.5 p-2.5",
  spacious: "gap-4 p-4",
} as const;

const radii = { md: "rounded-lg", lg: "rounded-xl", xl: "rounded-2xl" } as const;

type Density = keyof typeof densities;
type Radius = keyof typeof radii;

function Switch({
  label,
  on,
  onToggle,
}: {
  label: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className="flex items-center gap-2 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-md"
    >
      <span
        aria-hidden="true"
        className={`relative h-4 w-7 shrink-0 rounded-full transition-colors duration-150 ${on ? "bg-primary" : "bg-muted-foreground/30"}`}
      >
        <span
          className={`absolute top-0.5 h-3 w-3 rounded-full bg-background shadow-xs transition-all duration-150 ${on ? "left-3.5" : "left-0.5"}`}
        />
      </span>
      {label}
    </button>
  );
}

function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (next: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
        {label}
      </span>
      <div role="radiogroup" aria-label={label} className="flex rounded-lg bg-muted p-0.5">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            onClick={() => onChange(option)}
            className={`rounded-md px-2 py-1 text-[11px] capitalize transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 ${
              value === option
                ? "bg-background font-medium shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Interactive controls that recompose a shell layout live. */
export function LayoutPlayground() {
  const [header, setHeader] = useState(true);
  const [sidebar, setSidebar] = useState(true);
  const [footer, setFooter] = useState(false);
  const [density, setDensity] = useState<Density>("cozy");
  const [radius, setRadius] = useState<Radius>("lg");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <Switch label="Header" on={header} onToggle={() => setHeader((v) => !v)} />
        <Switch label="Sidebar" on={sidebar} onToggle={() => setSidebar((v) => !v)} />
        <Switch label="Footer" on={footer} onToggle={() => setFooter((v) => !v)} />
        <Segmented label="Density" value={density} options={Object.keys(densities) as Density[]} onChange={setDensity} />
        <Segmented label="Radius" value={radius} options={Object.keys(radii) as Radius[]} onChange={setRadius} />
      </div>

      <p aria-live="polite" className="sr-only">
        Layout updated: header {header ? "on" : "off"}, sidebar {sidebar ? "on" : "off"}, footer{" "}
        {footer ? "on" : "off"}.
      </p>

      <div
        className={`flex h-64 w-full overflow-hidden border border-border bg-muted/20 shadow-xs dark:bg-muted/10 ${radii[radius]}`}
      >
        {sidebar ? (
          <div className={`hidden w-24 shrink-0 flex-col gap-2 border-r border-border bg-muted/40 sm:flex ${densities[density]}`}>
            {[16, 12, 12].map((h, i) => (
              <span key={i} className={`block rounded-md bg-muted ${i === 0 ? "" : "opacity-70"}`} style={{ height: h }} />
            ))}
          </div>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col">
          {header ? (
            <div className={`flex shrink-0 items-center justify-between border-b border-border bg-background ${densities[density]}`}>
              <span className="text-xs font-semibold tracking-tight">Header</span>
              <span className="h-4 w-10 rounded-full bg-muted" aria-hidden="true" />
            </div>
          ) : null}
          <div className={`grid flex-1 auto-rows-min grid-cols-2 ${densities[density]}`}>
            {[40, 56, 32, 48].map((h, i) => (
              <div key={i} className={`border-border bg-card shadow-xs ${radii[radius]} p-2`}>
                <span className="block rounded-sm bg-muted" style={{ height: h / 2 }} />
                <span className="mt-1.5 block h-1.5 w-2/3 rounded-full bg-muted" />
              </div>
            ))}
          </div>
          {footer ? (
            <div className={`flex shrink-0 items-center justify-between border-t border-border bg-background ${densities[density]}`}>
              <span className="text-[11px] text-muted-foreground">Footer</span>
              <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                Action
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <code className="w-fit rounded-md bg-muted px-2 py-1 font-mono text-[11px] text-muted-foreground">
        {`<AppShell sidebar={${String(sidebar)}} header={${String(header)}} footer={${String(footer)}} />`}
      </code>
    </div>
  );
}
