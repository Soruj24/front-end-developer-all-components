export const THEMETOGGLE_SOURCE = `"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

type Theme = "light" | "dark" | "system";

interface ThemeToggleProps {
  defaultTheme?: Theme;
  storageKey?: string;
}

function applyTheme(theme: Theme) {
  const resolved = theme === "system"
    ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
    : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export function ThemeToggle({ defaultTheme = "system", storageKey = "theme" }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey) as Theme | null;
    if (saved) setTheme(saved);
  }, [storageKey]);

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:bg-accent"
      aria-label={\`Switch theme, current: \${theme}\`}
    >
      {theme === "dark" ? <Moon className="h-4 w-4" /> : theme === "light" ? <Sun className="h-4 w-4" /> : <Monitor className="h-4 w-4" />}
    </button>
  );
}`;

export const DARK_EXAMPLE = `const [theme, setTheme] = useState("light");

<button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
  {theme === "light" ? <Moon className="mr-2 h-4 w-4" /> : <Sun className="mr-2 h-4 w-4" />}
  {theme === "light" ? "Switch to Dark" : "Switch to Light"}
</button>`;

export const SWITCH_EXAMPLE = `<div className="inline-flex rounded-lg border bg-muted p-1">
  {themes.map((t) => (
    <button key={t.value} onClick={() => setTheme(t.value)}>
      <t.icon className="mr-1 h-4 w-4" />
      {t.label}
    </button>
  ))}
</div>`;

export const SYSTEM_EXAMPLE = `<button onClick={() => setSystemTheme("auto")}>
  <Monitor className="h-5 w-5" />
  Auto
</button>`;

export const COLOR_EXAMPLE = `const [color, setColor] = useState("#3b82f6");

{colors.map((c) => (
  <button
    key={c}
    onClick={() => setColor(c)}
    className="h-8 w-8 rounded-full border-2"
    style={{ backgroundColor: c }}
  />
))}`;

export const CONTRAST_EXAMPLE = `const [contrast, setContrast] = useState("normal");

<div className={\`rounded-lg p-4 text-sm \${contrast === "high" ? "bg-black text-white" : "bg-muted text-muted-foreground"}\`}>
  Sample text with {contrast} contrast
</div>`;

export const PREVIEW_EXAMPLE = `const [theme, setTheme] = useState("light");

{["light", "dark", "warm", "cool"].map((t) => (
  <button key={t} onClick={() => setTheme(t)}>
    {t}
  </button>
))}`;

export const ACCESS_EXAMPLE = `<button
  onClick={() => setSettings({ ...settings, [s.key]: !settings[s.key as keyof typeof settings] })}
  className="relative inline-flex h-5 w-9 items-center rounded-full"
>
  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
</button>`;
