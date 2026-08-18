"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Check, Zap, Bell, Shield, Mail, Globe, Lock, Eye } from "lucide-react";

const installCommand = `npx component-library@latest add toggle-card`;

const usageCode = `import { ToggleCard } from "@/components/ui";

<ToggleCard
  title="Notifications"
  description="Receive push notifications"
  icon={<Bell />}
  enabled={isEnabled}
  onChange={setEnabled}
/>`;

function Toggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? "bg-primary" : "bg-muted"}`}>
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}

function BasicToggleCardsDemo() {
  const [cards, setCards] = useState([
    { id: 1, title: "Email Notifications", desc: "Receive email for new messages", icon: <Mail className="h-5 w-5" />, enabled: true },
    { id: 2, title: "Push Notifications", desc: "Get push alerts on your device", icon: <Bell className="h-5 w-5" />, enabled: false },
    { id: 3, title: "SMS Alerts", desc: "Text message notifications", icon: <Zap className="h-5 w-5" />, enabled: false },
  ]);

  const toggle = (id: number) => setCards(cards.map((c) => c.id === id ? { ...c, enabled: !c.enabled } : c));

  return (
    <div className="w-full max-w-md space-y-3">
      {cards.map((card) => (
        <div key={card.id} className={`flex items-center justify-between rounded-xl border p-4 transition-colors ${card.enabled ? "border-primary bg-primary/5" : "border-border"}`}>
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.enabled ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium">{card.title}</p>
              <p className="text-xs text-muted-foreground">{card.desc}</p>
            </div>
          </div>
          <Toggle enabled={card.enabled} onToggle={() => toggle(card.id)} />
        </div>
      ))}
    </div>
  );
}

function MultipleSelectionDemo() {
  const [selected, setSelected] = useState<string[]>(["pro"]);
  const plans = [
    { id: "free", title: "Free", desc: "Basic features", price: "$0/mo" },
    { id: "pro", title: "Pro", desc: "Advanced features", price: "$19/mo" },
    { id: "enterprise", title: "Enterprise", desc: "Full access", price: "$99/mo" },
  ];

  const select = (id: string) => setSelected([id]);

  return (
    <div className="w-full max-w-md grid grid-cols-3 gap-3">
      {plans.map((plan) => (
        <button key={plan.id} onClick={() => select(plan.id)}
          className={`rounded-xl border p-4 text-left transition-all ${selected.includes(plan.id) ? "border-primary bg-primary/5 ring-2 ring-primary" : "border-border hover:border-primary/50"}`}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold">{plan.title}</p>
            {selected.includes(plan.id) && <Check className="h-4 w-4 text-primary" />}
          </div>
          <p className="text-xs text-muted-foreground mb-1">{plan.desc}</p>
          <p className="text-lg font-bold">{plan.price}</p>
        </button>
      ))}
    </div>
  );
}

function WithIconsDemo() {
  const [settings, setSettings] = useState([
    { id: "security", title: "Two-Factor Auth", desc: "Extra layer of security", icon: <Shield className="h-5 w-5" />, enabled: true },
    { id: "privacy", title: "Profile Visible", desc: "Show profile to others", icon: <Eye className="h-5 w-5" />, enabled: false },
    { id: "region", title: "Global Access", desc: "Access from any region", icon: <Globe className="h-5 w-5" />, enabled: true },
    { id: "encrypt", title: "End-to-End Encryption", desc: "Encrypt all messages", icon: <Lock className="h-5 w-5" />, enabled: false },
  ]);

  const toggle = (id: string) => setSettings(settings.map((s) => s.id === id ? { ...s, enabled: !s.enabled } : s));

  return (
    <div className="w-full max-w-md space-y-2">
      {settings.map((s) => (
        <div key={s.id} onClick={() => toggle(s.id)}
          className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${s.enabled ? "border-green-500 bg-green-50 dark:bg-green-950" : "border-border"}`}>
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${s.enabled ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-muted text-muted-foreground"}`}>
            {s.icon}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{s.title}</p>
            <p className="text-xs text-muted-foreground">{s.desc}</p>
          </div>
          <Toggle enabled={s.enabled} onToggle={() => toggle(s.id)} />
        </div>
      ))}
    </div>
  );
}

export default function ToggleCardPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Toggle Card</h1>
          <Badge variant="primary">Forms</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Card-based toggle selection for settings, preferences, and feature toggles. Supports single and multiple selection.
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
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Toggle Cards</h2>
          <p className="mt-1 text-sm text-muted-foreground">Simple toggle cards for notification settings.</p>
        </div>
        <ComponentPreview id="toggle-card-basic">
          <BasicToggleCardsDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Multiple Selection</h2>
          <p className="mt-1 text-sm text-muted-foreground">Radio-style card selection for plans.</p>
        </div>
        <ComponentPreview id="toggle-card-multiple">
          <MultipleSelectionDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Icons</h2>
          <p className="mt-1 text-sm text-muted-foreground">Toggle cards with descriptive icons.</p>
        </div>
        <ComponentPreview id="toggle-card-icons">
          <WithIconsDemo />
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
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">description</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">icon</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">enabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onChange</td>
                <td className="px-4 py-3 text-muted-foreground">(enabled: boolean) =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
