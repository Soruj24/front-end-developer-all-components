"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Keyboard,
  Command,
  Gamepad2,
  Type,
  Layout,
  Zap,
  BarChart3,
} from "lucide-react";

const installCommand = `npx component-library@latest add keyboard-layout`;
const usageCode = `import { KeyboardLayout } from "@/components/keyboard-layout";

<KeyboardLayout variant="full" highlightKeys={["Q", "W", "E", "R", "T"]} />`;

function KeyCap({
  label,
  size = "md",
  highlight = false,
  sub,
}: {
  label: string;
  size?: "sm" | "md" | "lg";
  highlight?: boolean;
  sub?: string;
}) {
  const sizeClasses = {
    sm: "min-w-[32px] h-8 text-[10px]",
    md: "min-w-[40px] h-10 text-xs",
    lg: "min-w-[60px] h-10 text-xs",
  };
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-md border font-medium shadow-sm transition-colors ${sizeClasses[size]} ${
        highlight
          ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
          : "border-black/[.08] bg-muted text-foreground dark:border-white/[.145]"
      }`}
    >
      <span>{label}</span>
      {sub && (
        <span className="text-[8px] text-muted-foreground">{sub}</span>
      )}
    </div>
  );
}

function QWERTYLayoutDemo() {
  const rows = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  ];
  return (
    <div className="flex w-full max-w-2xl flex-col gap-1.5 rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      {rows.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((key) => (
            <KeyCap key={key} label={key} size="md" />
          ))}
        </div>
      ))}
      <div className="flex gap-1">
        <KeyCap label="Ctrl" size="lg" />
        <KeyCap label="Alt" size="lg" />
        <KeyCap label="Space" size="lg" />
        <KeyCap label="Alt" size="lg" />
        <KeyCap label="Ctrl" size="lg" />
      </div>
    </div>
  );
}

function ShortcutGuideDemo() {
  const shortcuts = [
    { keys: ["Ctrl", "C"], action: "Copy" },
    { keys: ["Ctrl", "V"], action: "Paste" },
    { keys: ["Ctrl", "Z"], action: "Undo" },
    { keys: ["Ctrl", "S"], action: "Save" },
    { keys: ["Ctrl", "F"], action: "Find" },
    { keys: ["Ctrl", "A"], action: "Select All" },
  ];
  return (
    <div className="grid w-full max-w-lg grid-cols-2 gap-3">
      {shortcuts.map((s) => (
        <div
          key={s.action}
          className="flex items-center justify-between rounded-lg border border-black/[.08] bg-card px-3 py-2 shadow-sm dark:border-white/[.145]"
        >
          <span className="text-sm text-foreground">{s.action}</span>
          <div className="flex gap-1">
            {s.keys.map((k) => (
              <kbd
                key={k}
                className="rounded border border-black/[.08] bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium dark:border-white/[.145]"
              >
                {k}
              </kbd>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function GamingLayoutDemo() {
  const movementKeys = [
    { label: "W", action: "Forward" },
    { label: "A", action: "Left" },
    { label: "S", action: "Back" },
    { label: "D", action: "Right" },
  ];
  return (
    <div className="flex w-full max-w-sm items-center gap-8">
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-1">
          <div className="w-10" />
          <KeyCap label="W" highlight />
        </div>
        <div className="flex gap-1">
          <KeyCap label="A" highlight />
          <KeyCap label="S" highlight />
          <KeyCap label="D" highlight />
        </div>
      </div>
      <div className="space-y-2">
        {movementKeys.map((k) => (
          <div key={k.label} className="flex items-center gap-2">
            <kbd className="flex h-8 w-8 items-center justify-center rounded-md border-2 border-blue-500 bg-blue-50 font-mono text-sm font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {k.label}
            </kbd>
            <span className="text-sm text-muted-foreground">{k.action}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MacLayoutDemo() {
  const topRow = [
    "esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10",
    "F11", "F12",
  ];
  const mainRow = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
    ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
  ];
  return (
    <div className="flex w-full max-w-2xl flex-col gap-1 rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className="mb-1 flex gap-1">
        {topRow.map((k) => (
          <KeyCap key={k} label={k} size="sm" />
        ))}
      </div>
      {mainRow.map((row, ri) => (
        <div key={ri} className="flex gap-1">
          {row.map((key) => (
            <KeyCap key={key} label={key} size="md" />
          ))}
        </div>
      ))}
      <div className="flex gap-1">
        <KeyCap label="fn" size="sm" />
        <KeyCap label="Ctrl" size="lg" />
        <KeyCap label="Alt" size="lg" />
        <KeyCap label="Cmd" size="lg" highlight />
        <KeyCap label="Space" size="lg" />
        <KeyCap label="Cmd" size="lg" highlight />
        <KeyCap label="Alt" size="lg" />
      </div>
    </div>
  );
}

function TypingTutorDemo() {
  const [typed, setTyped] = useState("");
  const target = "the quick brown fox jumps over the lazy dog";
  const display = target.split("").map((char, i) => {
    let state = "pending";
    if (i < typed.length) {
      state = typed[i] === char ? "correct" : "wrong";
    }
    return { char, state };
  });
  return (
    <div className="flex w-full max-w-lg flex-col gap-4 rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="flex flex-wrap gap-0.5 font-mono text-lg">
        {display.map((d, i) => (
          <span
            key={i}
            className={`rounded px-0.5 ${
              d.state === "correct"
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
                : d.state === "wrong"
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  : "text-muted-foreground"
            }`}
          >
            {d.char}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        placeholder="Start typing here..."
        className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/[.145]"
        autoFocus
      />
      <div className="flex gap-3 text-xs text-muted-foreground">
        <span>
          Progress: {Math.round((typed.length / target.length) * 100)}%
        </span>
        <span>
          Chars: {typed.length}/{target.length}
        </span>
      </div>
    </div>
  );
}

function CompactLayoutDemo() {
  const rows = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];
  return (
    <div className="flex w-full max-w-md flex-col gap-1 rounded-xl border border-black/[.08] bg-card p-3 shadow-sm dark:border-white/[.145]">
      {rows.map((row, ri) => (
        <div key={ri} className="flex justify-center gap-0.5">
          {row.map((key) => (
            <KeyCap key={key} label={key} size="sm" />
          ))}
        </div>
      ))}
      <div className="flex justify-center gap-0.5">
        <KeyCap label="Space" size="lg" />
      </div>
    </div>
  );
}

function KeyStatisticsDemo() {
  const keys = [
    { key: "E", usage: 12.7, color: "bg-blue-500" },
    { key: "T", usage: 9.1, color: "bg-blue-400" },
    { key: "A", usage: 8.2, color: "bg-blue-400" },
    { key: "Space", usage: 7.8, color: "bg-emerald-500" },
    { key: "S", usage: 6.3, color: "bg-blue-300" },
    { key: "O", usage: 6.1, color: "bg-blue-300" },
    { key: "I", usage: 5.9, color: "bg-blue-300" },
    { key: "N", usage: 5.7, color: "bg-blue-300" },
  ];
  return (
    <div className="w-full max-w-md rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <h4 className="mb-3 text-sm font-semibold text-foreground">
        Most Used Keys
      </h4>
      <div className="space-y-2">
        {keys.map((k) => (
          <div key={k.key} className="flex items-center gap-2">
            <kbd className="flex h-7 w-10 items-center justify-center rounded border border-black/[.08] bg-muted font-mono text-[10px] font-bold dark:border-white/[.145]">
              {k.key}
            </kbd>
            <div className="flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-2 rounded-full ${k.color}`}
                style={{ width: `${k.usage * 7}%` }}
              />
            </div>
            <span className="w-10 text-right text-[10px] font-medium tabular-nums text-muted-foreground">
              {k.usage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function KeyboardLayoutPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Keyboard Layout
          </h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Interactive keyboard layout visualizations with QWERTY, gaming, macOS,
          compact variants, shortcut guides, and key usage statistics.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Installation
        </h2>
        <CodeBlock
          code={installCommand}
          filename="Terminal"
          label="bash"
          variant="terminal"
        />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Usage
        </h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">
            QWERTY Layout
          </h3>
          <p className="text-sm text-muted-foreground">
            Standard QWERTY keyboard layout visualization with function row,
            alphanumeric keys, and modifier keys.
          </p>
          <ComponentPreview id="keyboard-qwerty">
            <QWERTYLayoutDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">
            Shortcut Guide
          </h3>
          <p className="text-sm text-muted-foreground">
            Common keyboard shortcuts with highlighted key combinations for
            quick reference.
          </p>
          <ComponentPreview id="keyboard-shortcuts">
            <ShortcutGuideDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">
            Gaming Layout
          </h3>
          <p className="text-sm text-muted-foreground">
            WASD gaming keyboard layout with highlighted movement keys and
            action labels.
          </p>
          <ComponentPreview id="keyboard-gaming">
            <GamingLayoutDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">
            macOS Layout
          </h3>
          <p className="text-sm text-muted-foreground">
            macOS-style keyboard layout with Command keys, function row, and
            fn key support.
          </p>
          <ComponentPreview id="keyboard-mac">
            <MacLayoutDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">
            Typing Tutor
          </h3>
          <p className="text-sm text-muted-foreground">
            Interactive typing practice with real-time feedback, color-coded
            correctness, and progress tracking.
          </p>
          <ComponentPreview id="keyboard-typing">
            <TypingTutorDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">
            Compact Layout
          </h3>
          <p className="text-sm text-muted-foreground">
            Space-efficient compact keyboard layout without function row or
            numpad.
          </p>
          <ComponentPreview id="keyboard-compact">
            <CompactLayoutDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">
            Key Statistics
          </h3>
          <p className="text-sm text-muted-foreground">
            Visual representation of most frequently used keys with percentage
            bars.
          </p>
          <ComponentPreview id="keyboard-stats">
            <KeyStatisticsDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          API Reference
        </h2>
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
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {"\"full\" | \"compact\" | \"gaming\" | \"mac\""}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {"\"full\""}
                </td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">highlightKeys</td>
                <td className="px-4 py-3 text-muted-foreground">string[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
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
