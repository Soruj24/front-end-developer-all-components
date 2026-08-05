"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add dropdown-menu`;

const usageCode = `import { DropdownMenu } from "@/components/_dropdown-menu";

<DropdownMenu
  trigger={<button>Open</button>}
  items={[
    { label: "Profile", onClick: () => {} },
    { label: "Settings", onClick: () => {} },
    { divider: true },
    { label: "Logout", onClick: () => {}, variant: "danger" },
  ]}
/>`;

function CopyIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

export default function DropdownMenuPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Dropdown Menu</h1>
          <Badge variant="primary">Overlay</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A menu that drops down from a trigger element, displaying a list of
          actions or navigation links. Use for context menus and command palettes.
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

      {/* Default */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Default</h2>
          <p className="mt-1 text-sm text-muted-foreground">Basic dropdown menu with items and dividers.</p>
        </div>
        <ComponentPreview id="dropdown-menu-default">
          <div className="flex items-center gap-4">
            <div className="relative inline-block text-left">
              <button type="button" className="inline-flex items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
                Actions
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 dark:bg-zinc-900">
                <div className="py-1">
                  <button type="button" className="flex w-full items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                    <CopyIcon /> Copy
                  </button>
                  <button type="button" className="flex w-full items-center gap-2 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                    <DownloadIcon /> Download
                  </button>
                  <div className="my-1 border-t border-zinc-200 dark:border-zinc-700" />
                  <button type="button" className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                    <TrashIcon /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* With Icons */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">With Icons</h2>
          <p className="mt-1 text-sm text-muted-foreground">Items with leading icons for better recognition.</p>
        </div>
        <ComponentPreview id="dropdown-menu-icons">
          <div className="relative inline-block text-left">
            <button type="button" className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              Profile
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 dark:bg-zinc-900">
              <div className="py-1">
                <button type="button" className="flex w-full items-center gap-3 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  My Account
                </button>
                <button type="button" className="flex w-full items-center gap-3 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Settings
                </button>
                <button type="button" className="flex w-full items-center gap-3 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Help
                </button>
              </div>
            </div>
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
                <td className="px-4 py-3 font-mono text-xs">trigger</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">MenuItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">align</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;start&quot; | &quot;center&quot; | &quot;end&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;end&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
