"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  ToggleLeft,
  ToggleRight,
  Power,
  Settings,
  Sun,
  Moon,
  Check,
} from "lucide-react";

const installCommand = `npx shadcn@latest add toggle-button`;

const usageCode = `import { ToggleButton } from "@/components/toggle-button";

export default function Demo() {
  const [enabled, setEnabled] = useState(false);

  return (
    <ToggleButton
      pressed={enabled}
      onPressedChange={setEnabled}
      label="Toggle me"
    />
  );
}`;

function ToggleSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <ToggleLeft className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Toggle Switch</h3>
      </div>
      <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
        <div>
          <div className="font-medium">Enable Feature</div>
          <div className="text-sm text-muted-foreground">
            Turn this feature on or off
          </div>
        </div>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`w-14 h-7 rounded-full transition-colors relative ${
            enabled ? "bg-primary" : "bg-muted-foreground/30"
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-white absolute top-0.5 transition-transform ${
              enabled ? "translate-x-7" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {enabled ? (
          <ToggleRight className="h-4 w-4 text-primary" />
        ) : (
          <ToggleLeft className="h-4 w-4" />
        )}
        Feature is {enabled ? "enabled" : "disabled"}
      </div>
    </div>
  );
}

function PowerButton() {
  const [power, setPower] = useState(false);
  const [device, setDevice] = useState("lights");

  const devices = [
    { id: "lights", name: "Lights", power: "12W" },
    { id: "fan", name: "Fan", power: "45W" },
    { id: "ac", name: "Air Conditioner", power: "1200W" },
  ];

  const activeDevice = devices.find((d) => d.id === device);

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Power className="h-5 w-5 text-green-500" />
        <h3 className="font-semibold">Power Button</h3>
      </div>
      <div className="flex gap-2">
        {devices.map((d) => (
          <button
            key={d.id}
            onClick={() => setDevice(d.id)}
            className={`flex-1 p-2 rounded-lg border text-center text-sm ${
              device === d.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 py-4">
        <button
          onClick={() => setPower(!power)}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
            power
              ? "bg-green-500 shadow-lg shadow-green-500/25"
              : "bg-muted hover:bg-muted/80"
          }`}
        >
          <Power
            className={`h-10 w-10 ${power ? "text-white" : "text-muted-foreground"}`}
          />
        </button>
        <div className="text-center">
          <div className="font-medium">{activeDevice?.name}</div>
          <div className={`text-sm ${power ? "text-green-500" : "text-muted-foreground"}`}>
            {power ? `ON - ${activeDevice?.power}` : "OFF"}
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsToggle() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    darkMode: false,
    twoFactor: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const settingItems = [
    { key: "notifications" as const, label: "Notifications", desc: "Receive push notifications" },
    { key: "autoSave" as const, label: "Auto Save", desc: "Save changes automatically" },
    { key: "darkMode" as const, label: "Dark Mode", desc: "Use dark theme" },
    { key: "twoFactor" as const, label: "2FA", desc: "Two-factor authentication" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Settings className="h-5 w-5 text-gray-500" />
        <h3 className="font-semibold">Settings Panel</h3>
      </div>
      <div className="space-y-3">
        {settingItems.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted"
          >
            <div>
              <div className="font-medium">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.desc}</div>
            </div>
            <button
              onClick={() => toggleSetting(item.key)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                settings[item.key] ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  settings[item.key] ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  const themes = [
    { id: "light" as const, label: "Light", icon: Sun },
    { id: "dark" as const, label: "Dark", icon: Moon },
    { id: "system" as const, label: "System", icon: Settings },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Sun className="h-5 w-5 text-yellow-500" />
        <h3 className="font-semibold">Theme Toggle</h3>
      </div>
      <div className="flex gap-2 p-1 bg-muted rounded-lg">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => setTheme(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-colors ${
              theme === t.id
                ? "bg-background shadow-sm font-medium"
                : "text-muted-foreground"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-muted text-center">
        <div className="text-sm text-muted-foreground">Current theme</div>
        <div className="text-xl font-bold capitalize mt-1">{theme}</div>
      </div>
    </div>
  );
}

function FeatureToggle() {
  const [features, setFeatures] = useState({
    beta: false,
    analytics: true,
    experimental: false,
  });

  const toggleFeature = (key: keyof typeof features) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Check className="h-5 w-5 text-blue-500" />
        <h3 className="font-semibold">Feature Flags</h3>
      </div>
      <div className="space-y-2">
        {Object.entries(features).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between p-3 rounded-lg border"
          >
            <div className="flex items-center gap-3">
              <Badge variant={value ? "default" : "secondary"}>
                {value ? "ON" : "OFF"}
              </Badge>
              <div className="font-medium capitalize">{key}</div>
            </div>
            <button
              onClick={() => toggleFeature(key as keyof typeof features)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                value ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  value ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="text-sm text-muted-foreground">
        {Object.values(features).filter(Boolean).length} features enabled
      </div>
    </div>
  );
}

function ButtonGroup() {
  const [selected, setSelected] = useState("monthly");

  const options = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
    { id: "yearly", label: "Yearly" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <ToggleLeft className="h-5 w-5 text-purple-500" />
        <h3 className="font-semibold">Button Group</h3>
      </div>
      <div className="flex gap-1 p-1 bg-muted rounded-lg">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`flex-1 px-4 py-2 rounded-md text-sm transition-colors ${
              selected === opt.id
                ? "bg-background shadow-sm font-medium"
                : "text-muted-foreground"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="p-3 rounded-lg bg-muted text-center">
        <div className="text-sm text-muted-foreground">Selected interval</div>
        <div className="text-lg font-bold capitalize">{selected}</div>
      </div>
    </div>
  );
}

function SwitchControl() {
  const [switches, setSwitches] = useState([
    { id: "wifi", label: "Wi-Fi", enabled: true },
    { id: "bluetooth", label: "Bluetooth", enabled: false },
    { id: "airplane", label: "Airplane Mode", enabled: false },
  ]);

  const toggleSwitch = (id: string) => {
    setSwitches((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <ToggleRight className="h-5 w-5 text-teal-500" />
        <h3 className="font-semibold">Switch Controls</h3>
      </div>
      <div className="space-y-2">
        {switches.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between p-3 rounded-lg border"
          >
            <div className="font-medium">{s.label}</div>
            <button
              onClick={() => toggleSwitch(s.id)}
              className={`w-14 h-7 rounded-full transition-colors relative ${
                s.enabled ? "bg-primary" : "bg-muted-foreground/30"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white absolute top-0.5 transition-transform ${
                  s.enabled ? "translate-x-7" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
      <div className="p-3 rounded-lg bg-muted text-sm text-muted-foreground">
        Active connections: {switches.filter((s) => s.enabled).length}
      </div>
    </div>
  );
}

export default function ToggleButtonPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Toggle Button</h1>
        <p className="text-lg text-muted-foreground">
          Versatile toggle and switch components for settings, feature flags,
          and interactive controls.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <ComponentPreview name="ToggleSwitch">
          <ToggleSwitch />
        </ComponentPreview>

        <ComponentPreview name="PowerButton">
          <PowerButton />
        </ComponentPreview>

        <ComponentPreview name="SettingsToggle">
          <SettingsToggle />
        </ComponentPreview>

        <ComponentPreview name="ThemeToggle">
          <ThemeToggle />
        </ComponentPreview>

        <ComponentPreview name="FeatureToggle">
          <FeatureToggle />
        </ComponentPreview>

        <ComponentPreview name="ButtonGroup">
          <ButtonGroup />
        </ComponentPreview>

        <ComponentPreview name="SwitchControl">
          <SwitchControl />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2 text-left font-medium">Prop</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Default</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">pressed</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Whether the toggle is pressed</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">onPressedChange</td>
                <td className="px-4 py-2">{"(pressed: boolean) => void"}</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Called when toggle state changes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">label</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Accessible label for the toggle</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">disabled</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Disable the toggle</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">className</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
