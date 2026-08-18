"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { KeyInput } from "@/components/ui/key-input";
import {
  Key,
  Keyboard,
  Command,
  Terminal,
  Code,
  GitBranch,
  MessageSquare,
  FileText,
} from "lucide-react";

const installCommand = "npx shadcn@latest add key-input";

const usageCode = `
import { KeyInput } from "@/components/ui/key-input";

export default function Demo() {
  return (
    <KeyInput keys={["Ctrl", "S"]} />
  );
}`;

function VSCodeShortcutsDemo() {
  const shortcuts = [
    { keys: ["Ctrl", "P"], label: "Quick Open File" },
    { keys: ["Ctrl", "Shift", "P"], label: "Command Palette" },
    { keys: ["Ctrl", "/"], label: "Toggle Comment" },
    { keys: ["Ctrl", "Space"], label: "Trigger Suggest" },
    { keys: ["F12"], label: "Go to Definition" },
    { keys: ["Ctrl", "G"], label: "Go to Line" },
  ];

  return (
    <div className="grid gap-3">
      {shortcuts.map((s) => (
        <div key={s.label} className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2.5">
          <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
          <KeyInput keys={s.keys} size="sm" />
        </div>
      ))}
    </div>
  );
}

function BrowserShortcutsDemo() {
  const shortcuts = [
    { keys: ["Ctrl", "T"], label: "New Tab" },
    { keys: ["Ctrl", "W"], label: "Close Tab" },
    { keys: ["Ctrl", "Shift", "T"], label: "Reopen Tab" },
    { keys: ["Ctrl", "L"], label: "Focus Address Bar" },
    { keys: ["Ctrl", "R"], label: "Reload Page" },
    { keys: ["F12"], label: "DevTools" },
  ];

  return (
    <div className="grid gap-3">
      {shortcuts.map((s) => (
        <div key={s.label} className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2.5">
          <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
          <KeyInput keys={s.keys} size="sm" />
        </div>
      ))}
    </div>
  );
}

function GitShortcutsDemo() {
  const shortcuts = [
    { keys: ["Ctrl", "Shift", "G"], label: "Source Control Panel" },
    { keys: ["F2"], label: "Rename Symbol" },
    { keys: ["Ctrl", "Shift", "P"], label: "Git: Clone" },
    { keys: ["Ctrl", "Enter"], label: "Commit Message" },
  ];

  return (
    <div className="grid gap-3">
      {shortcuts.map((s) => (
        <div key={s.label} className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2.5">
          <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
          <KeyInput keys={s.keys} size="sm" />
        </div>
      ))}
    </div>
  );
}

function TerminalShortcutsDemo() {
  const shortcuts = [
    { keys: ["Ctrl", "C"], label: "Cancel Current Command" },
    { keys: ["Ctrl", "R"], label: "Reverse Search History" },
    { keys: ["Ctrl", "A"], label: "Move to Start of Line" },
    { keys: ["Ctrl", "E"], label: "Move to End of Line" },
    { keys: ["Tab"], label: "Autocomplete" },
    { keys: ["Ctrl", "D"], label: "Exit Shell" },
  ];

  return (
    <div className="grid gap-3">
      {shortcuts.map((s) => (
        <div key={s.label} className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2.5">
          <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
          <KeyInput keys={s.keys} size="sm" />
        </div>
      ))}
    </div>
  );
}

function FigmaShortcutsDemo() {
  const shortcuts = [
    { keys: ["Ctrl", "G"], label: "Group Selection" },
    { keys: ["Ctrl", "D"], label: "Duplicate" },
    { keys: ["Ctrl", "L"], label: "Toggle Layout Grid" },
    { keys: ["Ctrl", "K"], label: "Open Color Picker" },
    { keys: ["Ctrl", "Shift", "E"], label: "Export" },
  ];

  return (
    <div className="grid gap-3">
      {shortcuts.map((s) => (
        <div key={s.label} className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2.5">
          <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
          <KeyInput keys={s.keys} size="sm" />
        </div>
      ))}
    </div>
  );
}

function SlackShortcutsDemo() {
  const shortcuts = [
    { keys: ["Ctrl", "K"], label: "Quick Switcher" },
    { keys: ["Ctrl", "N"], label: "New Message" },
    { keys: ["Ctrl", "Shift", "M"], label: "Open Threads" },
    { keys: ["Ctrl", "/"], label: "Keyboard Shortcuts" },
    { keys: ["Ctrl", "E"], label: "Toggle Emoji Picker" },
  ];

  return (
    <div className="grid gap-3">
      {shortcuts.map((s) => (
        <div key={s.label} className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2.5">
          <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
          <KeyInput keys={s.keys} size="sm" />
        </div>
      ))}
    </div>
  );
}

function NotionShortcutsDemo() {
  const shortcuts = [
    { keys: ["Ctrl", "B"], label: "Bold" },
    { keys: ["Ctrl", "I"], label: "Italic" },
    { keys: ["Ctrl", "U"], label: "Underline" },
    { keys: ["Ctrl", "Shift", "H"], label: "Highlight" },
    { keys: ["Ctrl", "/"], label: "Block Menu" },
  ];

  return (
    <div className="grid gap-3">
      {shortcuts.map((s) => (
        <div key={s.label} className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-2.5">
          <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
          <KeyInput keys={s.keys} size="sm" />
        </div>
      ))}
    </div>
  );
}

export default function KeyInputPage() {
  const [activeDemo, setActiveDemo] = useState<string>("vscode");

  const demos = [
    { id: "vscode", label: "VS Code", icon: Code, component: VSCodeShortcutsDemo },
    { id: "browser", label: "Browser", icon: Keyboard, component: BrowserShortcutsDemo },
    { id: "git", label: "Git", icon: GitBranch, component: GitShortcutsDemo },
    { id: "terminal", label: "Terminal", icon: Terminal, component: TerminalShortcutsDemo },
    { id: "figma", label: "Figma", icon: Command, component: FigmaShortcutsDemo },
    { id: "slack", label: "Slack", icon: MessageSquare, component: SlackShortcutsDemo },
    { id: "notion", label: "Notion", icon: FileText, component: NotionShortcutsDemo },
  ];

  const ActiveDemoComponent = demos.find((d) => d.id === activeDemo)?.component ?? VSCodeShortcutsDemo;

  return (
    <div className="mx-auto max-w-4xl space-y-12 py-10">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Key className="h-6 w-6" />
          <h1 className="text-3xl font-bold tracking-tight">Key Input</h1>
          <Badge variant="secondary">Component</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          A component for displaying keyboard shortcuts and key combinations with
          a clean, developer-focused aesthetic. Ideal for cheat sheets, shortcut
          references, and help dialogs.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Examples</h2>
        <div className="flex flex-wrap gap-2">
          {demos.map((demo) => {
            const Icon = demo.icon;
            return (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo.id)}
                className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeDemo === demo.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {demo.label}
              </button>
            );
          })}
        </div>
        <ComponentPreview>
          <ActiveDemoComponent />
        </ComponentPreview>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2.5 text-left font-medium">Prop</th>
                <th className="px-4 py-2.5 text-left font-medium">Type</th>
                <th className="px-4 py-2.5 text-left font-medium">Default</th>
                <th className="px-4 py-2.5 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-4 py-2.5 font-mono text-sm">keys</td>
                <td className="px-4 py-2.5 font-mono text-sm">string[]</td>
                <td className="px-4 py-2.5 text-muted-foreground">Required</td>
                <td className="px-4 py-2.5 text-muted-foreground">Array of key labels to display</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-sm">variant</td>
                <td className="px-4 py-2.5 font-mono text-sm">string</td>
                <td className="px-4 py-2.5 font-mono text-sm">"default"</td>
                <td className="px-4 py-2.5 text-muted-foreground">Visual style variant</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-sm">size</td>
                <td className="px-4 py-2.5 font-mono text-sm">string</td>
                <td className="px-4 py-2.5 font-mono text-sm">"md"</td>
                <td className="px-4 py-2.5 text-muted-foreground">Size of the key display</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5 font-mono text-sm">className</td>
                <td className="px-4 py-2.5 font-mono text-sm">string</td>
                <td className="px-4 py-2.5 text-muted-foreground">-</td>
                <td className="px-4 py-2.5 text-muted-foreground">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}