"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { CALCULATOR_SOURCE, BASIC_EXAMPLE, COMPACT_EXAMPLE, SCIENTIFIC_EXAMPLE } from "./calculator-source";

export default function CalculatorPage() {
  return (
    <ComponentDocPage
      name="Calculator"
      category="Forms"
      description="A calculator component with basic arithmetic operations, display, and button grid for numeric input."
    >
      <PreviewPanel filename="calculator.tsx">
        <div className="w-full p-4">
          <div className="mx-auto max-w-[240px] overflow-hidden rounded-xl border border-border bg-card">
            <div className="border-b border-border px-4 py-3 text-right">
              <p className="text-2xl font-light text-foreground">123 + 456</p>
              <p className="mt-1 text-xs text-muted-foreground">579</p>
            </div>
            <div className="grid grid-cols-4 gap-px bg-border">
              {["C", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", "0", ".", "="].map((btn, i) => (
                <button key={i} className={`h-12 text-sm font-medium ${["÷", "×", "−", "+", "="].includes(btn) ? "bg-primary text-primary-foreground" : ["C", "±", "%"].includes(btn) ? "bg-muted text-foreground" : "bg-card text-foreground hover:bg-muted/50"}`}>{btn}</button>
              ))}
            </div>
          </div>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={CALCULATOR_SOURCE} filename="components/ui/Calculator/Calculator.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Compact Calculator" description="A smaller calculator for inline use." code={COMPACT_EXAMPLE} filename="calculator-compact.tsx">
          <div className="w-full p-4">
            <div className="mx-auto max-w-[180px] overflow-hidden rounded-lg border border-border bg-card">
              <div className="border-b border-border px-3 py-2 text-right">
                <p className="text-lg font-light">42</p>
              </div>
              <div className="grid grid-cols-3 gap-px bg-border">
                {["7", "8", "9", "4", "5", "6", "1", "2", "3"].map((btn) => (
                  <button key={btn} className="h-9 text-xs font-medium bg-card hover:bg-muted/50">{btn}</button>
                ))}
              </div>
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Scientific Mode" description="Extended calculator with additional math functions." code={SCIENTIFIC_EXAMPLE} filename="calculator-scientific.tsx">
          <div className="w-full p-4">
            <div className="mx-auto max-w-[300px] overflow-hidden rounded-xl border border-border bg-card">
              <div className="border-b border-border px-4 py-3 text-right">
                <p className="text-xl font-light">sin(45°)</p>
              </div>
              <div className="grid grid-cols-5 gap-px bg-border">
                {["sin", "cos", "tan", "π", "e", "x²", "x³", "√", "ln", "log", "7", "8", "9", "C", "⌫", "4", "5", "6", "(", ")", "1", "2", "3", ".", "="].map((btn, i) => (
                  <button key={i} className={`h-9 text-[11px] font-medium ${btn === "=" ? "bg-primary text-primary-foreground" : ["sin", "cos", "tan", "π", "e", "x²", "x³", "√", "ln", "log"].includes(btn) ? "bg-muted text-muted-foreground" : "bg-card text-foreground hover:bg-muted/50"}`}>{btn}</button>
                ))}
              </div>
            </div>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}