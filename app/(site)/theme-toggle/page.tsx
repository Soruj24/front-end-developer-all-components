"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { Sun, Moon, Monitor, Palette, Eye, Settings, Globe } from "lucide-react";
import { THEMETOGGLE_SOURCE, DARK_EXAMPLE, SWITCH_EXAMPLE, SYSTEM_EXAMPLE, COLOR_EXAMPLE, CONTRAST_EXAMPLE, PREVIEW_EXAMPLE, ACCESS_EXAMPLE } from "./theme-toggle-source";

function DarkModeToggle() {
  const [theme, setTheme] = useState("light");
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          {theme === "light" ? (<><Moon className="mr-2 h-4 w-4" />Switch to Dark</>) : (<><Sun className="mr-2 h-4 w-4" />Switch to Light</>)}
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
          <button key={t.value} onClick={() => setTheme(t.value)} className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${theme === t.value ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
            <t.icon className="mr-1 h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>
      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">Active: {theme}</span>
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
          <button key={t.value} onClick={() => { setSystemTheme(t.value); setActual(t.value === "auto" ? "light" : t.value); }} className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition-colors ${systemTheme === t.value ? "border-primary bg-primary/10 text-primary" : "hover:bg-muted"}`}>
            <t.icon className="h-5 w-5" />
            <span className="text-xs">{t.label}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">System preference: {actual}</p>
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
          <button key={c} onClick={() => setColor(c)} className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? "border-foreground scale-110" : "border-transparent"}`} style={{ backgroundColor: c }} />
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
          <button key={c.value} onClick={() => setContrast(c.value)} className={`rounded-md px-3 py-1.5 text-sm ${contrast === c.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}>{c.label}</button>
        ))}
      </div>
      <div className={`rounded-lg p-4 text-sm ${contrast === "high" ? "bg-black text-white font-bold" : contrast === "low" ? "bg-gray-200 text-gray-500" : "bg-muted text-muted-foreground"}`}>
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
          <button key={t} onClick={() => setTheme(t)} className={`rounded-md px-3 py-1.5 text-sm capitalize ${theme === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t}</button>
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
      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs text-muted-foreground">Preview: {theme}</span>
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
            <button onClick={() => setSettings({ ...settings, [s.key]: !settings[s.key as keyof typeof settings] })} className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${settings[s.key as keyof typeof settings] ? "bg-primary" : "bg-muted"}`}>
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings[s.key as keyof typeof settings] ? "translate-x-4" : "translate-x-1"}`} />
            </button>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function ThemeTogglePage() {
  return (
    <ComponentDocPage
      name="Theme Toggle"
      category="Forms"
      description="Toggle between light, dark, and system themes with smooth transitions."
    >
      <PreviewPanel filename="theme-toggle.tsx">
        <DarkModeToggle />
      </PreviewPanel>

      <SourceCodeViewer source={THEMETOGGLE_SOURCE} filename="components/ui/ThemeToggle/ThemeToggle.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Dark Mode Toggle" description="Simple button that switches between light and dark." code={DARK_EXAMPLE}><DarkModeToggle /></ExampleBlock>
        <ExampleBlock title="Theme Switch" description="Segmented control for light, dark, and system." code={SWITCH_EXAMPLE}><ThemeSwitch /></ExampleBlock>
        <ExampleBlock title="System Theme" description="Follow the operating system color scheme." code={SYSTEM_EXAMPLE}><SystemTheme /></ExampleBlock>
        <ExampleBlock title="Color Picker" description="Pick an accent color for the theme." code={COLOR_EXAMPLE}><ColorPicker /></ExampleBlock>
        <ExampleBlock title="Contrast Toggle" description="Adjust text contrast levels." code={CONTRAST_EXAMPLE}><ContrastToggle /></ExampleBlock>
        <ExampleBlock title="Theme Preview" description="Preview themes with skeleton content." code={PREVIEW_EXAMPLE}><ThemePreview /></ExampleBlock>
        <ExampleBlock title="Accessibility" description="Toggles for motion, text, and contrast preferences." code={ACCESS_EXAMPLE}><Accessibility /></ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
