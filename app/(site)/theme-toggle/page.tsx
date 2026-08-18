"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Sun, Moon, Monitor, Palette, Eye, Settings, Globe } from "lucide-react";

const installCommand = `npx shadcn@latest add theme-toggle`;

const usageCode = `import { ThemeToggle } from "@/components/ui/theme-toggle";

export function ThemeToggleDemo() {
  return <ThemeToggle />;
}`;

function DarkModeToggle() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
        >
          {theme === "light" ? (
            <>
              <Moon className="mr-2 h-4 w-4" />
              Switch to Dark
            </>
          ) : (
            <>
              <Sun className="mr-2 h-4 w-4" />
              Switch to Light
            </>
          )}
        </button>
      </div>
      <div className={`rounded-lg border p-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        <p className="text-sm">Current theme: {theme}</p>
      </div>
    </div>
  );
}

function ThemeSwitch() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-lg border bg-muted p-1">
        {[
          { value: "light", icon: Sun, label: "Light" },
          { value: "dark", icon: Moon, label: "Dark" },
          { value: "system", icon: Monitor, label: "System" },
        ].map((t) => (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              theme === t.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <t.icon className="mr-1 h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>
      <Badge variant="outline">Active: {theme}</Badge>
    </div>
  );
}

function SystemTheme() {
  const [systemTheme, setSystemTheme] = useState("auto");
  const [actual, setActual] = useState("light");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {[
          { value: "auto", icon: Monitor, label: "Auto" },
          { value: "light", icon: Sun, label: "Light" },
          { value: "dark", icon: Moon, label: "Dark" },
        ].map((t) => (
          <button
            key={t.value}
            onClick={() => { setSystemTheme(t.value); setActual(t.value === "auto" ? "light" : t.value); }}
            className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition-colors ${
              systemTheme === t.value
                ? "border-primary bg-primary/10 text-primary"
                : "hover:bg-muted"
            }`}
          >
            <t.icon className="h-5 w-5" />
            <span className="text-xs">{t.label}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        System preference: {actual}
      </p>
    </div>
  );
}

function ColorPicker() {
  const [color, setColor] = useState("#3b82f6");
  const colors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Accent Color</span>
      </div>
      <div className="flex gap-2">
        {colors.map((c) => (
          <button
            key={c}
            onClick={() => setColor(c)}
            className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
              color === c ? "border-foreground scale-110" : "border-transparent"
            }`}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 rounded" style={{ backgroundColor: color }} />
        <span className="font-mono text-xs">{color}</span>
      </div>
    </div>
  );
}

function ContrastToggle() {
  const [contrast, setContrast] = useState("normal");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Contrast</span>
      </div>
      <div className="flex gap-2">
        {[
          { value: "normal", label: "Normal" },
          { value: "high", label: "High" },
          { value: "low", label: "Low" },
        ].map((c) => (
          <button
            key={c.value}
            onClick={() => setContrast(c.value)}
            className={`rounded-md px-3 py-1.5 text-sm ${
              contrast === c.value
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div
        className={`rounded-lg p-4 text-sm ${
          contrast === "high"
            ? "bg-black text-white font-bold"
            : contrast === "low"
            ? "bg-gray-200 text-gray-500"
            : "bg-muted text-muted-foreground"
        }`}
      >
        Sample text with {contrast} contrast
      </div>
    </div>
  );
}

function ThemePreview() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {["light", "dark", "warm", "cool"].map((t) => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            className={`rounded-md px-3 py-1.5 text-sm capitalize ${
              theme === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border p-3">
          <div className="mb-2 h-4 w-3/4 rounded bg-foreground/10" />
          <div className="mb-1 h-2 w-full rounded bg-foreground/5" />
          <div className="h-2 w-2/3 rounded bg-foreground/5" />
        </div>
        <div className="rounded-lg border p-3">
          <div className="mb-2 h-8 w-8 rounded-full bg-primary/20" />
          <div className="h-2 w-3/4 rounded bg-foreground/5" />
        </div>
      </div>
      <Badge variant="outline">Preview: {theme}</Badge>
    </div>
  );
}

function Accessibility() {
  const [settings, setSettings] = useState({ reduceMotion: false, largeText: false, highContrast: false });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Accessibility</span>
      </div>
      <div className="space-y-2">
        {[
          { key: "reduceMotion", label: "Reduce Motion", icon: Settings },
          { key: "largeText", label: "Large Text", icon: Eye },
          { key: "highContrast", label: "High Contrast", icon: Palette },
        ].map((s) => (
          <label key={s.key} className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-2">
              <s.icon className="h-4 w-4" />
              <span className="text-sm">{s.label}</span>
            </div>
            <button
              onClick={() => setSettings({ ...settings, [s.key]: !settings[s.key as keyof typeof settings] })}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                settings[s.key as keyof typeof settings] ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings[s.key as keyof typeof settings] ? "translate-x-4" : "translate-x-1"
                }`}
              />
            </button>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function ThemeTogglePage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
          <Badge variant="secondary">New</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">
          <Sun className="mr-2 inline h-8 w-8" />
          Theme Toggle
        </h1>
        <p className="text-lg text-muted-foreground">
          Toggle between light, dark, and system themes with smooth transitions.
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

      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Dark Mode Toggle</h3>
          <ComponentPreview>
            <DarkModeToggle />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Theme Switch</h3>
          <ComponentPreview>
            <ThemeSwitch />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">System Theme</h3>
          <ComponentPreview>
            <SystemTheme />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Color Picker</h3>
          <ComponentPreview>
            <ColorPicker />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Contrast Toggle</h3>
          <ComponentPreview>
            <ContrastToggle />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Theme Preview</h3>
          <ComponentPreview>
            <ThemePreview />
          </ComponentPreview>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-medium">Accessibility</h3>
          <ComponentPreview>
            <Accessibility />
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-3 text-left font-medium">Prop</th>
                <th className="p-3 text-left font-medium">Type</th>
                <th className="p-3 text-left font-medium">Default</th>
                <th className="p-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">defaultTheme</td>
                <td className="p-3">"light" | "dark" | "system"</td>
                <td className="p-3">"system"</td>
                <td className="p-3">Default theme value</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">storageKey</td>
                <td className="p-3">string</td>
                <td className="p-3">"theme"</td>
                <td className="p-3">localStorage key for persistence</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">enableSystem</td>
                <td className="p-3">boolean</td>
                <td className="p-3">true</td>
                <td className="p-3">Enable system theme detection</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-mono text-xs">disableTransition</td>
                <td className="p-3">boolean</td>
                <td className="p-3">false</td>
                <td className="p-3">Disable theme transition animations</td>
              </tr>
              <tr>
                <td className="p-3 font-mono text-xs">children</td>
                <td className="p-3">ReactNode</td>
                <td className="p-3">required</td>
                <td className="p-3">Toggle trigger element</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
