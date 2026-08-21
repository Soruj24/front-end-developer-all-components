"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { ToggleCard } from "@/components/ui/ToggleCard";
import { TOGGLE_CARD_SOURCE } from "./toggle-card-source";
import { Bell, Shield, Globe, Lock, Eye, Mail, Zap } from "lucide-react";

const BASIC_CODE = `import { ToggleCard } from "@/components/ui/ToggleCard";

<ToggleCard
  title="Notifications"
  description="Receive push notifications"
  icon={<Bell />}
  enabled={isEnabled}
  onChange={setEnabled}
/>`;

const DISABLED_CODE = `import { ToggleCard } from "@/components/ui/ToggleCard";

<ToggleCard title="Locked" description="Cannot be changed" disabled />`;

export default function ToggleCardPage() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Email Notifications", desc: "Receive email for new messages", icon: <Mail className="h-5 w-5" />, enabled: true },
    { id: 2, title: "Push Notifications", desc: "Get push alerts on your device", icon: <Bell className="h-5 w-5" />, enabled: false },
    { id: 3, title: "SMS Alerts", desc: "Text message notifications", icon: <Zap className="h-5 w-5" />, enabled: false },
  ]);

  const [settings, setSettings] = useState([
    { id: "security", title: "Two-Factor Auth", desc: "Extra layer of security", icon: <Shield className="h-5 w-5" />, enabled: true },
    { id: "privacy", title: "Profile Visible", desc: "Show profile to others", icon: <Eye className="h-5 w-5" />, enabled: false },
    { id: "region", title: "Global Access", desc: "Access from any region", icon: <Globe className="h-5 w-5" />, enabled: true },
    { id: "encrypt", title: "End-to-End Encryption", desc: "Encrypt all messages", icon: <Lock className="h-5 w-5" />, enabled: false },
  ]);

  const [selected, setSelected] = useState("pro");

  const toggleNotif = (id: number) =>
    setNotifications((prev) => prev.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c)));

  const toggleSetting = (id: string) =>
    setSettings((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)));

  return (
    <ComponentDocPage
      name="Toggle Card"
      category="Forms"
      description="Card-based toggle selection for settings, preferences, and feature toggles. Supports single and multiple selection with icons, keyboard navigation, and accessible markup."
    >
      <PreviewPanel filename="toggle-card.tsx">
        <div className="w-full max-w-md space-y-3">
          {notifications.map((card) => (
            <ToggleCard
              key={card.id}
              title={card.title}
              description={card.desc}
              icon={card.icon}
              enabled={card.enabled}
              onChange={() => toggleNotif(card.id)}
            />
          ))}
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={TOGGLE_CARD_SOURCE}
        filename="components/ui/ToggleCard/ToggleCard.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="With Icons"
          description="Toggle cards with descriptive icons and different color states."
          code={`<ToggleCard title="Security" icon={<Shield />} enabled={v} onChange={setV} />`}
          filename="icons.tsx"
        >
          <div className="w-full max-w-md space-y-2">
            {settings.map((s) => (
              <ToggleCard
                key={s.id}
                title={s.title}
                description={s.desc}
                icon={s.icon}
                enabled={s.enabled}
                onChange={() => toggleSetting(s.id)}
              />
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Single Selection"
          description="Radio-style card selection for plans."
          code={`<ToggleCard title="Free" enabled={selected === "free"} onChange={() => setSelected("free")} />`}
          filename="single-selection.tsx"
        >
          <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(["free", "pro", "enterprise"] as const).map((plan) => (
              <ToggleCard
                key={plan}
                title={plan.charAt(0).toUpperCase() + plan.slice(1)}
                description={plan === "free" ? "$0/mo" : plan === "pro" ? "$19/mo" : "$99/mo"}
                enabled={selected === plan}
                onChange={() => setSelected(plan)}
              />
            ))}
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="No Icon"
          description="Toggle cards without icons work well for simple settings."
          code={`<ToggleCard title="Dark Mode" description="Use dark theme" enabled={v} onChange={setV} />`}
          filename="no-icon.tsx"
        >
          <div className="w-full max-w-md space-y-3">
            <ToggleCard title="Dark Mode" description="Use dark theme" enabled onChange={() => {}} />
            <ToggleCard title="Auto-save" description="Save changes automatically" enabled={false} onChange={() => {}} />
            <ToggleCard title="Beta Features" description="Try experimental features" enabled={false} onChange={() => {}} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Disabled cards cannot be interacted with."
          code={`<ToggleCard title="Locked" disabled />`}
          filename="disabled.tsx"
        >
          <div className="w-full max-w-md space-y-3">
            <ToggleCard title="Organization Settings" description="Managed by admin" disabled enabled={false} onChange={() => {}} />
            <ToggleCard title="Two-Factor Auth" description="Required for compliance" disabled enabled onChange={() => {}} />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Keyboard Navigation"
          description="Navigate with Tab and toggle with Enter or Space."
          code={`{/* Tab between cards, press Enter or Space to toggle */}`}
          filename="keyboard.tsx"
        >
          <div className="w-full max-w-md space-y-3">
            <ToggleCard title="Item One" description="Tab here, press Enter" enabled onChange={() => {}} />
            <ToggleCard title="Item Two" description="Then press Space" enabled={false} onChange={() => {}} />
            <ToggleCard title="Item Three" description="Then Tab away" enabled onChange={() => {}} />
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
