"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Sigma,
  Calculator,
  Hash,
  Percent,
  Equal,
  Divide,
  Minus,
} from "lucide-react";

const installCommand = `npx component-library@latest add sigma-math`;

const usageCode = `import { SigmaMath } from "@/components/ui";

<SigmaMath expression="\\u03A3_{i=1}^{n} i" />`;

function FormulaDisplayDemo() {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border p-6">
      <span className="text-3xl font-serif italic text-foreground">E = mc&sup2;</span>
      <p className="text-xs text-muted-foreground">Mass-energy equivalence</p>
    </div>
  );
}

function MathEquationDemo() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const result = a + b;
  return (
    <div className="flex items-center gap-3 rounded-lg border p-4">
      <input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} className="h-10 w-16 rounded-md border bg-background px-2 text-center text-sm" />
      <span className="text-lg font-bold">+</span>
      <input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} className="h-10 w-16 rounded-md border bg-background px-2 text-center text-sm" />
      <span className="text-lg font-bold">=</span>
      <span className="flex h-10 w-16 items-center justify-center rounded-md bg-primary/10 text-lg font-bold text-primary">{result}</span>
    </div>
  );
}

function StatisticsCardDemo() {
  const data = [12, 15, 18, 22, 19, 25, 30];
  const mean = data.reduce((a, b) => a + b, 0) / data.length;
  const max = Math.max(...data);
  const min = Math.min(...data);
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="rounded-lg border p-3 text-center">
        <Sigma className="mx-auto mb-1 h-4 w-4 text-primary" />
        <p className="text-xl font-bold">{mean.toFixed(1)}</p>
        <p className="text-xs text-muted-foreground">Mean</p>
      </div>
      <div className="rounded-lg border p-3 text-center">
        <Hash className="mx-auto mb-1 h-4 w-4 text-emerald-500" />
        <p className="text-xl font-bold">{max}</p>
        <p className="text-xs text-muted-foreground">Max</p>
      </div>
      <div className="rounded-lg border p-3 text-center">
        <Minus className="mx-auto mb-1 h-4 w-4 text-orange-500" />
        <p className="text-xl font-bold">{min}</p>
        <p className="text-xs text-muted-foreground">Min</p>
      </div>
    </div>
  );
}

function CalculatorWidgetDemo() {
  const [display, setDisplay] = useState("0");
  const handleNum = (n: string) => setDisplay(d => d === "0" ? n : d + n);
  const handleClear = () => setDisplay("0");
  return (
    <div className="w-full max-w-xs rounded-lg border p-3">
      <div className="mb-2 rounded-md bg-muted p-3 text-right font-mono text-lg">{display}</div>
      <div className="grid grid-cols-4 gap-1.5">
        {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"].map((btn) => (
          <button key={btn} onClick={() => {
            if (btn === "=") { try { setDisplay(String(eval(display))); } catch { setDisplay("Error"); } }
            else handleNum(btn);
          }} className={`flex h-9 items-center justify-center rounded-md border text-sm font-medium hover:bg-muted ${btn === "=" ? "bg-primary text-primary-foreground" : ""}`}>
            {btn}
          </button>
        ))}
        <button onClick={handleClear} className="col-span-4 flex h-9 items-center justify-center rounded-md border text-sm font-medium text-destructive hover:bg-destructive/10">C</button>
      </div>
    </div>
  );
}

function SumNotationDemo() {
  const [n, setN] = useState(5);
  const sum = (n * (n + 1)) / 2;
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-serif italic text-foreground">&Sigma;</span>
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground">n={n}</span>
          <span className="text-sm">i=1</span>
        </div>
        <span className="text-lg font-serif italic">i</span>
        <span className="text-lg">= {sum}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">n:</span>
        <input type="range" min={1} max={20} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-32" />
        <span className="w-6 text-center text-sm font-medium">{n}</span>
      </div>
    </div>
  );
}

function ProductNotationDemo() {
  const [n, setN] = useState(5);
  const product = Array.from({ length: n }, (_, i) => i + 1).reduce((a, b) => a * b, 1);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <span className="text-2xl font-serif italic text-foreground">&Pi;</span>
        <div className="flex flex-col items-center">
          <span className="text-xs text-muted-foreground">n={n}</span>
          <span className="text-sm">i=1</span>
        </div>
        <span className="text-lg font-serif italic">i</span>
        <span className="text-lg">= {product.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">n:</span>
        <input type="range" min={1} max={12} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-32" />
        <span className="w-6 text-center text-sm font-medium">{n}</span>
      </div>
    </div>
  );
}

function MathGridDemo() {
  const ops = [
    { Icon: Sigma, label: "Summation", color: "text-blue-500" },
    { Icon: Minus, label: "Subtraction", color: "text-red-500" },
    { Icon: Divide, label: "Division", color: "text-green-500" },
    { Icon: Percent, label: "Modulo", color: "text-purple-500" },
    { Icon: Equal, label: "Equality", color: "text-orange-500" },
    { Icon: Hash, label: "Cardinality", color: "text-teal-500" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
      {ops.map((o) => (
        <div key={o.label} className="flex flex-col items-center gap-1 rounded-lg border p-3 hover:bg-muted/50">
          <o.Icon className={`h-5 w-5 ${o.color}`} />
          <span className="text-[11px] text-muted-foreground">{o.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function SigmaMathPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sigma Math</h1>
          <Badge variant="primary">Mathematics</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Mathematical notation components for rendering formulas, summation/product notation, calculators, and statistical displays.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Formula Display</h2>
        <ComponentPreview component="SigmaMathFormulaDisplayDemo">
          <FormulaDisplayDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Math Equation</h2>
        <ComponentPreview component="SigmaMathEquationDemo">
          <MathEquationDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Statistics Card</h2>
        <ComponentPreview component="SigmaMathStatisticsDemo">
          <StatisticsCardDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Calculator Widget</h2>
        <ComponentPreview component="SigmaMathCalculatorDemo">
          <CalculatorWidgetDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Sum Notation</h2>
        <ComponentPreview component="SigmaMathSumNotationDemo">
          <SumNotationDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Product Notation</h2>
        <ComponentPreview component="SigmaMathProductNotationDemo">
          <ProductNotationDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Math Grid</h2>
        <ComponentPreview component="SigmaMathGridDemo">
          <MathGridDemo />
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
                <td className="px-4 py-3 font-mono text-xs">expression</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">""</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">fontSize</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"sm\" | \"md\" | \"lg\" | \"xl\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"md\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">interactive</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(val: string) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
