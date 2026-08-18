"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add form-wizard`;
const usageCode = `import { FormWizard } from "@/components/ui/form-wizard";

<FormWizard steps={steps} onComplete={handleSubmit} />`;

export default function FormWizardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Form Wizard</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A multi-step form wizard component with progress indicator, step validation, and navigation between form pages.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Step Indicator</h2><p className="mt-1 text-sm text-muted-foreground">Progress indicator showing current step.</p></div>
        <ComponentPreview id="form-wizard-indicator">
          <div className="w-full p-4">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6">
                {["Account", "Profile", "Confirm"].map((step, i) => (
                  <div key={step} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium ${i <= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{i < 1 ? "✓" : i + 1}</div>
                      <span className="text-[10px] text-muted-foreground mt-1">{step}</span>
                    </div>
                    {i < 2 && <div className={`h-0.5 w-16 mx-2 ${i === 0 ? "bg-primary" : "bg-muted"}`} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Form Step</h2><p className="mt-1 text-sm text-muted-foreground">A single step in the form wizard.</p></div>
        <ComponentPreview id="form-wizard-step">
          <div className="w-full p-4">
            <div className="max-w-md mx-auto rounded-xl border border-border bg-card p-6">
              <h3 className="font-medium text-sm mb-4">Step 1: Account Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Email</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm" />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button className="px-4 py-2 rounded-lg bg-muted text-sm font-medium">Back</button>
                <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Next Step</button>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Completion</h2><p className="mt-1 text-sm text-muted-foreground">Final confirmation step with summary.</p></div>
        <ComponentPreview id="form-wizard-complete">
          <div className="w-full p-4">
            <div className="max-w-md mx-auto text-center">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="font-medium text-lg">All Done!</h3>
              <p className="text-sm text-muted-foreground mt-1">Your information has been submitted successfully.</p>
              <button className="mt-6 px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">Back to Home</button>
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
