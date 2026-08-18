"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Check, Circle, CreditCard, Star, Zap, Shield, Award } from "lucide-react";

const installCommand = "npx component-library@latest add option-card";

const usageCode = `import { useState } from "react";

export function OptionCard({ options, value, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => (
        <div
          key={opt.id}
          onClick={() => onChange(opt.id)}
          className={clsx(
            "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
            value === opt.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "hover:border-primary/50"
          )}
        >
          <opt.icon className="h-5 w-5" />
          <div className="flex-1">
            <p className="text-sm font-medium">{opt.title}</p>
            <p className="text-xs text-muted-foreground">{opt.description}</p>
          </div>
          <div className={clsx(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
            value === opt.id ? "border-primary bg-primary" : "border-border"
          )}>
            {value === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
          </div>
        </div>
      ))}
    </div>
  );
}`;

function RadioCard() {
  const [selected, setSelected] = useState("starter");
  const options = [
    { id: "starter", title: "Starter Plan", desc: "Perfect for individuals", price: "$9/mo" },
    { id: "pro", title: "Pro Plan", desc: "Best for growing teams", price: "$29/mo" },
    { id: "enterprise", title: "Enterprise", desc: "For large organizations", price: "$99/mo" },
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {options.map((opt) => (
        <div
          key={opt.id}
          onClick={() => setSelected(opt.id)}
          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
            selected === opt.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "hover:border-primary/50"
          }`}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected === opt.id ? "border-primary" : "border-border"}`}>
            {selected === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{opt.title}</p>
            <p className="text-xs text-muted-foreground">{opt.desc}</p>
          </div>
          <span className="text-sm font-semibold text-foreground">{opt.price}</span>
        </div>
      ))}
    </div>
  );
}

function CheckCard() {
  const [selected, setSelected] = useState<string[]>(["feature-a"]);

  const toggle = (id: string) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const features = [
    { id: "feature-a", title: "API Access", desc: "Full REST and GraphQL API" },
    { id: "feature-b", title: "Custom Domains", desc: "Use your own domain name" },
    { id: "feature-c", title: "Priority Support", desc: "24/7 dedicated support" },
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {features.map((f) => (
        <div
          key={f.id}
          onClick={() => toggle(f.id)}
          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
            selected.includes(f.id)
              ? "border-primary bg-primary/5"
              : "hover:border-primary/50"
          }`}
        >
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${selected.includes(f.id) ? "border-primary bg-primary" : "border-border"}`}>
            {selected.includes(f.id) && <Check className="h-3 w-3 text-primary-foreground" />}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{f.title}</p>
            <p className="text-xs text-muted-foreground">{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PricingCard() {
  const [selected, setSelected] = useState("monthly");
  const plans = [
    { id: "monthly", label: "Monthly", price: "$29", period: "/mo" },
    { id: "yearly", label: "Yearly", price: "$24", period: "/mo", badge: "Save 17%" },
  ];

  return (
    <div className="flex gap-3 w-full max-w-md">
      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => setSelected(plan.id)}
          className={`flex-1 p-4 rounded-xl border cursor-pointer transition-all text-center ${
            selected === plan.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "hover:border-primary/50"
          }`}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-sm font-medium text-foreground">{plan.label}</span>
            {plan.badge && <Badge variant="success">{plan.badge}</Badge>}
          </div>
          <span className="text-2xl font-bold text-foreground">{plan.price}</span>
          <span className="text-sm text-muted-foreground">{plan.period}</span>
        </div>
      ))}
    </div>
  );
}

function FeatureCard() {
  const [selected, setSelected] = useState("performance");
  const features = [
    { id: "performance", icon: Zap, title: "Performance", desc: "Lightning fast load times" },
    { id: "security", icon: Shield, title: "Security", desc: "Enterprise-grade protection" },
    { id: "quality", icon: Award, title: "Quality", desc: "Pixel-perfect rendering" },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
      {features.map((f) => (
        <div
          key={f.id}
          onClick={() => setSelected(f.id)}
          className={`flex flex-col items-center gap-2 p-4 rounded-xl border cursor-pointer transition-all text-center ${
            selected === f.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "hover:border-primary/50"
          }`}
        >
          <f.icon className={`h-6 w-6 ${selected === f.id ? "text-primary" : "text-muted-foreground"}`} />
          <span className="text-sm font-medium text-foreground">{f.title}</span>
          <span className="text-xs text-muted-foreground">{f.desc}</span>
        </div>
      ))}
    </div>
  );
}

function PlanCard() {
  const [selected, setSelected] = useState("team");
  const plans = [
    { id: "solo", title: "Solo", price: "$9", features: ["1 user", "5 projects", "10GB storage"] },
    { id: "team", title: "Team", price: "$29", features: ["5 users", "25 projects", "100GB storage"] },
    { id: "business", title: "Business", price: "$99", features: ["Unlimited users", "Unlimited projects", "1TB storage"] },
  ];

  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => setSelected(plan.id)}
          className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
            selected === plan.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "hover:border-primary/50"
          }`}
        >
          <span className="text-sm font-semibold text-foreground mb-1">{plan.title}</span>
          <span className="text-xl font-bold text-foreground mb-3">{plan.price}<span className="text-xs font-normal text-muted-foreground">/mo</span></span>
          <ul className="space-y-1.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Check className="h-3 w-3 text-primary flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function SelectableCard() {
  const [selected, setSelected] = useState("visa");
  const cards = [
    { id: "visa", title: "Visa ending 4242", icon: CreditCard },
    { id: "mastercard", title: "Mastercard ending 8888", icon: CreditCard },
    { id: "amex", title: "Amex ending 1234", icon: CreditCard },
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {cards.map((c) => (
        <div
          key={c.id}
          onClick={() => setSelected(c.id)}
          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
            selected === c.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "hover:border-primary/50"
          }`}
        >
          <c.icon className={`h-5 w-5 ${selected === c.id ? "text-primary" : "text-muted-foreground"}`} />
          <span className="text-sm font-medium text-foreground flex-1">{c.title}</span>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === c.id ? "border-primary" : "border-border"}`}>
            {selected === c.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
          </div>
        </div>
      ))}
    </div>
  );
}

function MultiOption() {
  const [selected, setSelected] = useState<string[]>(["dark"]);
  const options = [
    { id: "dark", label: "Dark Mode" },
    { id: "animations", label: "Animations" },
    { id: "compact", label: "Compact View" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 w-full max-w-md">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setSelected((prev) => prev.includes(opt.id) ? prev.filter((x) => x !== opt.id) : [...prev, opt.id])}
          className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
            selected.includes(opt.id)
              ? "border-primary bg-primary/5 text-primary"
              : "border-border text-muted-foreground hover:border-primary/50"
          }`}
        >
          <div className={`w-4 h-4 rounded border flex items-center justify-center ${selected.includes(opt.id) ? "border-primary bg-primary" : "border-border"}`}>
            {selected.includes(opt.id) && <Check className="h-3 w-3 text-primary-foreground" />}
          </div>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function OptionCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Option Card</h1>
          <Badge variant="primary">7 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A selectable option card component with radio-style selection, icons, and description text. Supports single and multi-select with pricing, feature, and plan layouts.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      {/* Examples */}
      <section className="flex flex-col gap-8">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Radio Card</h3>
          <ComponentPreview id="option-card-radio">
            <RadioCard />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Check Card</h3>
          <ComponentPreview id="option-card-check">
            <CheckCard />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Pricing Card</h3>
          <ComponentPreview id="option-card-pricing">
            <PricingCard />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Feature Card</h3>
          <ComponentPreview id="option-card-feature">
            <FeatureCard />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Plan Card</h3>
          <ComponentPreview id="option-card-plan">
            <PlanCard />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Selectable Card</h3>
          <ComponentPreview id="option-card-selectable">
            <SelectableCard />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Multi Option</h3>
          <ComponentPreview id="option-card-multi">
            <MultiOption />
          </ComponentPreview>
        </div>
      </section>

      {/* API Reference */}
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
                <td className="px-4 py-3 text-muted-foreground">{"{ id: string; title: string; description?: string }[]"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">value</td>
                <td className="px-4 py-3 text-muted-foreground">string | string[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">{"(value: string | string[]) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">multi</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
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
