"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add calculator`;
const usageCode = `import { Calculator } from "@/components/ui/calculator";

<Calculator onResult={handleResult} />`;

export default function CalculatorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Calculator</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A calculator component with basic arithmetic operations, display, and button grid for numeric input.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Calculator</h2><p className="mt-1 text-sm text-muted-foreground">A full calculator with display and number pad.</p></div>
        <ComponentPreview id="calculator-basic">
          <div className="w-full p-4">
            <div className="max-w-[240px] mx-auto rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 text-right border-b border-border">
                <p className="text-2xl font-light text-foreground">123 + 456</p>
                <p className="text-xs text-muted-foreground mt-1">579</p>
              </div>
              <div className="grid grid-cols-4 gap-px bg-border">
                {["C", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", "0", ".", "="].map((btn, i) => (
                  <button key={i} className={`h-12 text-sm font-medium ${["÷", "×", "−", "+", "="].includes(btn) ? "bg-primary text-primary-foreground" : ["C", "±", "%"].includes(btn) ? "bg-muted text-foreground" : "bg-card text-foreground hover:bg-muted/50"}`}>{btn}</button>
                ))}
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Compact Calculator</h2><p className="mt-1 text-sm text-muted-foreground">A smaller calculator for inline use.</p></div>
        <ComponentPreview id="calculator-compact">
          <div className="w-full p-4">
            <div className="max-w-[180px] mx-auto rounded-lg border border-border bg-card overflow-hidden">
              <div className="px-3 py-2 text-right border-b border-border">
                <p className="text-lg font-light">42</p>
              </div>
              <div className="grid grid-cols-3 gap-px bg-border">
                {["7", "8", "9", "4", "5", "6", "1", "2", "3"].map((btn) => (
                  <button key={btn} className="h-9 text-xs font-medium bg-card hover:bg-muted/50">{btn}</button>
                ))}
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Scientific Mode</h2><p className="mt-1 text-sm text-muted-foreground">Extended calculator with additional math functions.</p></div>
        <ComponentPreview id="calculator-scientific">
          <div className="w-full p-4">
            <div className="max-w-[300px] mx-auto rounded-xl border border-border bg-card overflow-hidden">
              <div className="px-4 py-3 text-right border-b border-border">
                <p className="text-xl font-light">sin(45°)</p>
              </div>
              <div className="grid grid-cols-5 gap-px bg-border">
                {["sin", "cos", "tan", "π", "e", "x²", "x³", "√", "ln", "log", "7", "8", "9", "C", "⌫", "4", "5", "6", "(", ")", "1", "2", "3", ".", "="].map((btn, i) => (
                  <button key={i} className={`h-9 text-[11px] font-medium ${btn === "=" ? "bg-primary text-primary-foreground" : ["sin", "cos", "tan", "π", "e", "x²", "x³", "√", "ln", "log"].includes(btn) ? "bg-muted text-muted-foreground" : "bg-card text-foreground hover:bg-muted/50"}`}>{btn}</button>
                ))}
              </div>
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
