"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Circle, CircleDot, Check, CreditCard, Star, Zap, Shield } from "lucide-react";

const installCommand = "npx component-library@latest add radio-card";

const usageCode = `import { useState } from "react";

export function RadioCard({ options, value, onChange }) {
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
          <div className={clsx(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
            value === opt.id ? "border-primary" : "border-border"
          )}>
            {value === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{opt.title}</p>
            <p className="text-xs text-muted-foreground">{opt.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}`;

function RadioOption() {
  const [selected, setSelected] = useState("option-1");
  const options = [
    { id: "option-1", title: "Default option", desc: "Standard selection with radio indicator" },
    { id: "option-2", title: "Alternative option", desc: "Choose this for a different path" },
    { id: "option-3", title: "Disabled option", desc: "Currently unavailable" },
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
          <div>
            <p className="text-sm font-medium text-foreground">{opt.title}</p>
            <p className="text-xs text-muted-foreground">{opt.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function PlanSelector() {
  const [selected, setSelected] = useState("pro");
  const plans = [
    { id: "free", title: "Free", price: "$0", features: ["1 user", "1GB storage"] },
    { id: "pro", title: "Pro", price: "$19", features: ["5 users", "50GB storage"] },
    { id: "enterprise", title: "Enterprise", price: "$99", features: ["Unlimited users", "500GB storage"] },
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {plans.map((plan) => (
        <div
          key={plan.id}
          onClick={() => setSelected(plan.id)}
          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
            selected === plan.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "hover:border-primary/50"
          }`}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected === plan.id ? "border-primary" : "border-border"}`}>
            {selected === plan.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-foreground">{plan.title}</p>
              {plan.id === "pro" && <Badge variant="primary">Popular</Badge>}
            </div>
            <p className="text-xs text-muted-foreground">{plan.features.join(" · ")}</p>
          </div>
          <span className="text-sm font-bold text-foreground">{plan.price}<span className="text-xs font-normal text-muted-foreground">/mo</span></span>
        </div>
      ))}
    </div>
  );
}

function PaymentMethod() {
  const [selected, setSelected] = useState("card");
  const methods = [
    { id: "card", title: "Credit Card", desc: "Visa, Mastercard, Amex", icon: CreditCard },
    { id: "paypal", title: "PayPal", desc: "Pay with your PayPal account", icon: Shield },
    { id: "bank", title: "Bank Transfer", desc: "Direct bank transfer", icon: Zap },
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {methods.map((m) => (
        <div
          key={m.id}
          onClick={() => setSelected(m.id)}
          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
            selected === m.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "hover:border-primary/50"
          }`}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected === m.id ? "border-primary" : "border-border"}`}>
            {selected === m.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
          </div>
          <m.icon className={`h-5 w-5 ${selected === m.id ? "text-primary" : "text-muted-foreground"}`} />
          <div>
            <p className="text-sm font-medium text-foreground">{m.title}</p>
            <p className="text-xs text-muted-foreground">{m.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TierSelect() {
  const [selected, setSelected] = useState("gold");
  const tiers = [
    { id: "silver", title: "Silver", icon: Circle, perks: "5% discount" },
    { id: "gold", title: "Gold", icon: Star, perks: "10% discount + free shipping" },
    { id: "platinum", title: "Platinum", icon: CircleDot, perks: "20% discount + priority support" },
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {tiers.map((tier) => (
        <div
          key={tier.id}
          onClick={() => setSelected(tier.id)}
          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
            selected === tier.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "hover:border-primary/50"
          }`}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected === tier.id ? "border-primary" : "border-border"}`}>
            {selected === tier.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
          </div>
          <tier.icon className={`h-5 w-5 ${selected === tier.id ? "text-primary" : "text-muted-foreground"}`} />
          <div>
            <p className="text-sm font-medium text-foreground">{tier.title}</p>
            <p className="text-xs text-muted-foreground">{tier.perks}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeatureChoice() {
  const [selected, setSelected] = useState("analytics");
  const features = [
    { id: "analytics", title: "Analytics Dashboard", desc: "Real-time data visualization" },
    { id: "automation", title: "Workflow Automation", desc: "Automate repetitive tasks" },
    { id: "integrations", title: "Third-party Integrations", desc: "Connect with 100+ tools" },
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
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected === f.id ? "border-primary" : "border-border"}`}>
            {selected === f.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
          </div>
          <span className="text-sm font-medium text-foreground">{f.title}</span>
          <span className="text-xs text-muted-foreground">{f.desc}</span>
        </div>
      ))}
    </div>
  );
}

function CategoryPick() {
  const [selected, setSelected] = useState("design");
  const categories = [
    { id: "design", title: "Design" },
    { id: "development", title: "Development" },
    { id: "marketing", title: "Marketing" },
    { id: "sales", title: "Sales" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 w-full max-w-md">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setSelected(cat.id)}
          className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
            selected === cat.id
              ? "border-primary bg-primary/5 text-primary"
              : "border-border text-muted-foreground hover:border-primary/50"
          }`}
        >
          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected === cat.id ? "border-primary" : "border-border"}`}>
            {selected === cat.id && <div className="w-2 h-2 rounded-full bg-primary" />}
          </div>
          {cat.title}
        </button>
      ))}
    </div>
  );
}

function StyleSelector() {
  const [selected, setSelected] = useState("modern");
  const styles = [
    { id: "modern", title: "Modern", desc: "Clean and minimal" },
    { id: "classic", title: "Classic", desc: "Traditional layout" },
    { id: "bold", title: "Bold", desc: "High contrast" },
  ];

  return (
    <div className="flex gap-3 w-full max-w-md">
      {styles.map((s) => (
        <div
          key={s.id}
          onClick={() => setSelected(s.id)}
          className={`flex-1 p-4 rounded-xl border cursor-pointer transition-all text-center ${
            selected === s.id
              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
              : "hover:border-primary/50"
          }`}
        >
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mx-auto mb-2 ${selected === s.id ? "border-primary" : "border-border"}`}>
            {selected === s.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
          </div>
          <span className="text-sm font-medium text-foreground">{s.title}</span>
          <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default function RadioCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Radio Card</h1>
          <Badge variant="primary">7 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A radio card component that combines radio button selection with card-based visual presentation. Includes plan, payment, tier, feature, category, and style selectors.
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
          <h3 className="text-sm font-medium text-muted-foreground">Radio Option</h3>
          <ComponentPreview id="radio-card-option">
            <RadioOption />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Plan Selector</h3>
          <ComponentPreview id="radio-card-plan">
            <PlanSelector />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
          <ComponentPreview id="radio-card-payment">
            <PaymentMethod />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Tier Select</h3>
          <ComponentPreview id="radio-card-tier">
            <TierSelect />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Feature Choice</h3>
          <ComponentPreview id="radio-card-feature">
            <FeatureChoice />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Category Pick</h3>
          <ComponentPreview id="radio-card-category">
            <CategoryPick />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground">Style Selector</h3>
          <ComponentPreview id="radio-card-style">
            <StyleSelector />
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
                <td className="px-4 py-3 text-muted-foreground">{"{ id: string; title: string; description?: string; icon?: LucideIcon }[]"}</td>
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
                <td className="px-4 py-3 text-muted-foreground">{"(value: string) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
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
