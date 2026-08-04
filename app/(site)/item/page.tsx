"use client";

import { Item } from "@/components/_item";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add item`;

const usageCode = `import { Item } from "@/components/_item"

<Item>Profile</Item>
<Item selected>Selected</Item>
<Item disabled>Disabled</Item>`;

const compositionCode = `ItemGroup
└── Item
    ├── ItemMedia (icon)
    ├── ItemContent
    │   ├── ItemTitle
    │   └── ItemDescription
    └── ItemActions`;

function HomeIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function ItemPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Item</h1>
          <Badge variant="primary">Base UI</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A versatile component for displaying content with media, title, description, and actions.
        </p>
      </header>

      {/* Basic */}
      <ComponentPreview id="item-basic">
        <div className="flex flex-col gap-1">
          <Item>Profile</Item>
          <Item>Settings</Item>
          <Item>Notifications</Item>
        </div>
      </ComponentPreview>

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

      {/* Composition */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Composition</h2>
        <p className="text-sm text-muted-foreground">
          Use the following composition to build an <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">Item</code>:
        </p>
        <CodeBlock code={compositionCode} variant="terminal" />
      </section>

      {/* Variants */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Variant</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Use the <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">variant</code> prop to change the visual style of the item.
          </p>
        </div>
        <ComponentPreview id="item-variants">
          <div className="flex flex-col gap-1">
            <Item>Default</Item>
            <Item selected>Selected</Item>
            <Item disabled>Disabled</Item>
            <Item selected disabled>Selected &amp; Disabled</Item>
          </div>
        </ComponentPreview>
      </section>

      {/* Icon */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Icon</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Use the <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">icon</code> prop to display an icon.
          </p>
        </div>
        <ComponentPreview id="item-icon">
          <div className="flex flex-col gap-1">
            <Item icon={<HomeIcon />}>Home</Item>
            <Item icon={<SettingsIcon />}>Settings</Item>
            <Item icon={<UserIcon />}>Profile</Item>
          </div>
        </ComponentPreview>
      </section>

      {/* Group */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Group</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Group related items together with dividers.
          </p>
        </div>
        <ComponentPreview id="item-group">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="px-2 text-xs font-medium text-muted-foreground">Account</p>
              <Item>Profile</Item>
              <Item>Settings</Item>
              <Item>Notifications</Item>
            </div>
            <div className="h-px bg-border" />
            <div className="flex flex-col gap-1">
              <p className="px-2 text-xs font-medium text-muted-foreground">Actions</p>
              <Item>Sign Out</Item>
              <Item disabled>Delete Account</Item>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Navigation */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Navigation</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Items used in navigation menus.
          </p>
        </div>
        <ComponentPreview id="item-navigation">
          <div className="flex flex-col gap-1 rounded-lg border p-2">
            <Item icon={<ChevronIcon />}>Getting Started</Item>
            <Item icon={<ChevronIcon />}>Components</Item>
            <Item icon={<ChevronIcon />}>Documentation</Item>
            <Item icon={<ChevronIcon />}>Examples</Item>
          </div>
        </ComponentPreview>
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
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot; | &quot;selected&quot; | &quot;disabled&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;default&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">icon</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">inset</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">selected</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
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
