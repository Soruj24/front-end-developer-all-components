"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Sun, Moon, Monitor, Grid, List, LayoutGrid } from "lucide-react";

const installCommand = `npx component-library@latest add segmented-control`;

const usageCode = `import { useState } from "react";

function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="inline-flex rounded-lg border bg-muted p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={\`rounded-md px-3 py-1.5 text-sm \${
            value === opt.value
              ? "bg-background shadow-sm font-medium"
              : "text-muted-foreground"
          }\`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}`;

type Option = { value: string; label: string; icon?: React.ReactNode };

function SegmentedControl({
  options,
  value,
  onChange,
  size = "md",
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = size === "sm" ? "h-8 text-xs" : size === "lg" ? "h-11 text-base" : "h-9 text-sm";

  return (
    <div className={`inline-flex rounded-lg border border-border bg-muted p-0.5`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`relative flex items-center justify-center gap-1.5 rounded-md px-3 font-medium transition-all ${
            sizeClass
          } ${
            value === opt.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {opt.icon}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function SegmentedControlPage() {
  const [view, setView] = useState("grid");
  const [period, setPeriod] = useState("monthly");
  const [theme, setTheme] = useState("system");
  const [size, setSize] = useState("md");
  const [tab, setTab] = useState("overview");
  const [align, setAlign] = useState("left");
  const [format, setFormat] = useState("json");
  const [density, setDensity] = useState("comfortable");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Segmented Control</h1>
          <Badge variant="primary">Navigation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A set of mutually exclusive buttons for switching between views or options. Used for toggling between related states like list/grid views, time periods, or settings.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default</h2>
          <p className="mt-1 text-sm text-muted-foreground">Basic segmented control with text labels.</p>
        </div>
        <ComponentPreview id="seg-default">
          <SegmentedControl
            options={[
              { value: "overview", label: "Overview" },
              { value: "analytics", label: "Analytics" },
              { value: "reports", label: "Reports" },
            ]}
            value={tab}
            onChange={setTab}
          />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Icons</h2>
          <p className="mt-1 text-sm text-muted-foreground">Segmented control with icons alongside labels.</p>
        </div>
        <ComponentPreview id="seg-icons">
          <SegmentedControl
            options={[
              { value: "light", label: "Light", icon: <Sun className="h-4 w-4" /> },
              { value: "system", label: "System", icon: <Monitor className="h-4 w-4" /> },
              { value: "dark", label: "Dark", icon: <Moon className="h-4 w-4" /> },
            ]}
            value={theme}
            onChange={setTheme}
          />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Sizes</h2>
          <p className="mt-1 text-sm text-muted-foreground">Small, medium, and large sizes.</p>
        </div>
        <ComponentPreview id="seg-sizes">
          <div className="flex flex-col gap-4">
            <SegmentedControl
              options={[
                { value: "s", label: "Small" },
                { value: "m", label: "Medium" },
                { value: "l", label: "Large" },
              ]}
              value={size}
              onChange={setSize}
              size="sm"
            />
            <SegmentedControl
              options={[
                { value: "s", label: "Small" },
                { value: "m", label: "Medium" },
                { value: "l", label: "Large" },
              ]}
              value={size}
              onChange={setSize}
              size="md"
            />
            <SegmentedControl
              options={[
                { value: "s", label: "Small" },
                { value: "m", label: "Medium" },
                { value: "l", label: "Large" },
              ]}
              value={size}
              onChange={setSize}
              size="lg"
            />
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">View Toggle</h2>
          <p className="mt-1 text-sm text-muted-foreground">Switching between grid and list views.</p>
        </div>
        <ComponentPreview id="seg-view-toggle">
          <div className="flex flex-col gap-4">
            <SegmentedControl
              options={[
                { value: "grid", label: "Grid", icon: <LayoutGrid className="h-4 w-4" /> },
                { value: "list", label: "List", icon: <List className="h-4 w-4" /> },
              ]}
              value={view}
              onChange={setView}
            />
            <div className="rounded-lg border border-border p-4">
              {view === "grid" ? (
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="flex aspect-square items-center justify-center rounded-md bg-muted text-xs text-muted-foreground">
                      Item {i + 1}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {Array.from({ length: 4 }, (_, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-md border border-border px-3 py-2 text-sm">
                      <div className="h-8 w-8 shrink-0 rounded bg-muted" />
                      <div className="flex-1">
                        <div className="text-xs font-medium">Item {i + 1}</div>
                        <div className="text-xs text-muted-foreground">Description</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Billing Period</h2>
          <p className="mt-1 text-sm text-muted-foreground">Toggle between billing periods for pricing.</p>
        </div>
        <ComponentPreview id="seg-billing">
          <div className="flex flex-col items-center gap-6">
            <SegmentedControl
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly", icon: <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">-20%</span> },
              ]}
              value={period}
              onChange={setPeriod}
            />
            <div className="text-center">
              <div className="text-3xl font-bold">${period === "monthly" ? "19" : "180"}</div>
              <div className="text-sm text-muted-foreground">per {period === "monthly" ? "month" : "year"}</div>
            </div>
          </div>
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Icon Only</h2>
          <p className="mt-1 text-sm text-muted-foreground">Compact control with icons only, no text labels.</p>
        </div>
        <ComponentPreview id="seg-icon-only">
          <SegmentedControl
            options={[
              { value: "grid", icon: <Grid className="h-4 w-4" /> },
              { value: "list", icon: <List className="h-4 w-4" /> },
              { value: "columns", icon: <LayoutGrid className="h-4 w-4" /> },
            ]}
            value={view}
            onChange={setView}
          />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Many Options</h2>
          <p className="mt-1 text-sm text-muted-foreground">Control with many options that scroll horizontally.</p>
        </div>
        <ComponentPreview id="seg-many">
          <SegmentedControl
            options={[
              { value: "json", label: "JSON" },
              { value: "yaml", label: "YAML" },
              { value: "xml", label: "XML" },
              { value: "csv", label: "CSV" },
              { value: "toml", label: "TOML" },
            ]}
            value={format}
            onChange={setFormat}
          />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">options</td>
                <td className="px-4 py-3 text-muted-foreground">{`{ value: string; label: string; icon?: ReactNode }[]`}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">{`(value: string) => void`}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">{`"sm" | "md" | "lg"`}</td>
                <td className="px-4 py-3 text-muted-foreground">{`"md"`}</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
