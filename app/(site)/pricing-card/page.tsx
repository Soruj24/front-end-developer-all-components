"use client";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { CreditCard } from "lucide-react";

const installCommand = `npx component-library@latest add pricing-card`;
const usageCode = `// usage`;

export default function PricingCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Pricing Card</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A pricing card component with plan details, feature list, CTA button, and popular plan highlight.</p>
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
        <div><h2 className="text-xl font-semibold tracking-tight text-foreground">Preview</h2><p className="mt-1 text-sm text-muted-foreground">Pricing cards with feature lists and highlighted plan.</p></div>
        <ComponentPreview id="pricing-card"><div className="w-full p-4"><div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">{[{name:"Starter",price:"$9",period:"/month",features:["5 projects","10GB storage","Basic support"],highlight:false},{name:"Pro",price:"$29",period:"/month",features:["Unlimited projects","100GB storage","Priority support","API access"],highlight:true},{name:"Enterprise",price:"$99",period:"/month",features:["Everything in Pro","Custom integrations","Dedicated support","SLA guarantee"],highlight:false}].map((plan,i)=>(<div key={i} className={`w-full max-w-xs rounded-xl border p-6 flex flex-col gap-4 ${plan.highlight?"border-primary bg-primary/5 ring-2 ring-primary/20":""}`}><div><p className="text-sm font-medium text-muted-foreground">{plan.name}</p><div className="flex items-baseline gap-1 mt-1"><span className="text-3xl font-bold text-foreground">{plan.price}</span><span className="text-sm text-muted-foreground">{plan.period}</span></div></div><ul className="space-y-2.5 flex-1">{plan.features.map((f,j)=>(<li key={j} className="flex items-center gap-2 text-sm text-muted-foreground"><svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>{f}</li>))}</ul><button className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${plan.highlight?"bg-primary text-primary-foreground hover:bg-primary/90":"border hover:bg-muted"}`}>Get Started</button></div>))}</div></div></ComponentPreview>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border"><table className="w-full text-sm"><thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead><tbody>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">name</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">price</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">period</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">{"month"}</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">features</td><td className="px-4 py-3 text-muted-foreground">string[]</td><td className="px-4 py-3 text-muted-foreground">[]</td><td className="px-4 py-3">Yes</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">highlight</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
        <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
        </tbody></table></div>
      </section>
    </div>
  );
}
