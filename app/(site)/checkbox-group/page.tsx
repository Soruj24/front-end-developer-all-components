"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add checkbox-group`;
const usageCode = `import { CheckboxGroup } from "@/components/ui/checkbox-group";

<CheckboxGroup
  options={["Option 1", "Option 2", "Option 3"]}
  value={selected}
  onChange={setSelected}
/>`;

export default function CheckboxGroupPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Checkbox Group</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A checkbox group component for selecting multiple options with labels, descriptions, and indeterminate states.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Checkboxes</h2><p className="mt-1 text-sm text-muted-foreground">Simple checkbox list with labels.</p></div>
        <ComponentPreview id="checkbox-group-basic">
          <div className="w-full p-4">
            <div className="space-y-3 max-w-sm">
              {["React", "Vue", "Angular", "Svelte"].map((opt, i) => (
                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                  <div className={`h-5 w-5 rounded border-2 flex items-center justify-center ${i < 2 ? "bg-primary border-primary" : "border-border"}`}>
                    {i < 2 && <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className="text-sm">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">With Descriptions</h2><p className="mt-1 text-sm text-muted-foreground">Checkboxes with additional description text.</p></div>
        <ComponentPreview id="checkbox-group-descriptions">
          <div className="w-full p-4">
            <div className="space-y-4 max-w-sm">
              {[
                { label: "Email notifications", desc: "Receive email about account activity" },
                { label: "Marketing emails", desc: "Receive tips and promotions" },
              ].map((opt) => (
                <label key={opt.label} className="flex items-start gap-3 cursor-pointer">
                  <div className="h-5 w-5 rounded border-2 border-primary bg-primary flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="h-3 w-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Card Style</h2><p className="mt-1 text-sm text-muted-foreground">Checkboxes displayed as selectable cards.</p></div>
        <ComponentPreview id="checkbox-group-cards">
          <div className="w-full p-4">
            <div className="grid grid-cols-2 gap-3 max-w-md">
              {["Basic", "Pro", "Enterprise", "Team"].map((plan, i) => (
                <div key={plan} className={`rounded-lg border p-4 cursor-pointer transition-colors ${i === 1 ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`h-4 w-4 rounded border-2 flex items-center justify-center ${i === 1 ? "bg-primary border-primary" : "border-border"}`}>
                      {i === 1 && <svg className="h-2.5 w-2.5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className="text-sm font-medium">{plan}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Perfect for {plan.toLowerCase()} users</p>
                </div>
              ))}
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody><tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr></tbody></table></div>
      </section>
    </div>
  );
}
