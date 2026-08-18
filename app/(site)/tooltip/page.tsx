"use client"

import { useState, useRef } from "react"
import { Badge } from "@/components/design-system/Badge"
import { CodeBlock } from "@/components/home/CodeBlock"

const installCommand = `npx component-library@latest add tooltip`

const usageCode = `import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/_tooltip"

<Tooltip>
  <TooltipTrigger>Hover me</TooltipTrigger>
  <TooltipContent>Tooltip text</TooltipContent>
</Tooltip>`

const positions = [
  { label: "Top", pos: "bottom-full left-1/2 -translate-x-1/2 mb-2" },
  { label: "Bottom", pos: "top-full left-1/2 -translate-x-1/2 mt-2" },
  { label: "Left", pos: "right-full top-1/2 -translate-y-1/2 mr-2" },
  { label: "Right", pos: "left-full top-1/2 -translate-y-1/2 ml-2" },
]

function Arrow({ dir }: { dir: string }) {
  const map: Record<string, string> = {
    Top: "border-l-4 border-r-4 border-b-4 border-transparent border-b-zinc-900 dark:border-b-zinc-100 -bottom-1 left-1/2 -translate-x-1/2",
    Bottom: "border-l-4 border-r-4 border-t-4 border-transparent border-t-zinc-900 dark:border-t-zinc-100 -top-1 left-1/2 -translate-x-1/2",
    Left: "border-t-4 border-b-4 border-r-4 border-transparent border-r-zinc-900 dark:border-r-zinc-100 -right-1 top-1/2 -translate-y-1/2",
    Right: "border-t-4 border-b-4 border-l-4 border-transparent border-l-zinc-900 dark:border-l-zinc-100 -left-1 top-1/2 -translate-y-1/2",
  }
  return <div className={`absolute ${map[dir]}`} />
}

function TooltipWrap({
  children, content, dir = "Top", delay = 0, clickToggle = false, disabled = false,
}: {
  children: React.ReactNode; content: React.ReactNode; dir?: string; delay?: number; clickToggle?: boolean; disabled?: boolean
}) {
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const pos = positions.find((p) => p.label === dir)?.pos || positions[0].pos

  if (clickToggle) {
    return (
      <div className="relative inline-flex">
        <div className={disabled ? "pointer-events-none opacity-50" : ""}>
          <button onClick={() => setVisible(!visible)} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted dark:border-border dark:hover:bg-muted">
            {children}
          </button>
        </div>
        {visible && (
          <div className={`pointer-events-none absolute z-40 whitespace-nowrap rounded bg-zinc-900 px-3 py-1.5 text-xs text-white shadow-lg dark:bg-muted dark:text-black ${pos}`}>
            {content}
            <Arrow dir={dir} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => { if (delay) timer.current = setTimeout(() => setVisible(true), delay); else setVisible(true) }}
      onMouseLeave={() => { clearTimeout(timer.current); setVisible(false) }}
    >
      <div className={disabled ? "pointer-events-none opacity-50" : ""}>
        <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted dark:border-border dark:hover:bg-muted">
          {children}
        </button>
      </div>
      {(visible || delay === 0) && (
        <div
          className={`pointer-events-none absolute z-40 whitespace-nowrap rounded bg-zinc-900 px-3 py-1.5 text-xs text-white shadow-lg transition-opacity dark:bg-muted dark:text-black ${
            visible ? "opacity-100" : "opacity-0"
          } ${pos}`}
        >
          {content}
          <Arrow dir={dir} />
        </div>
      )}
    </div>
  )
}

export default function TooltipPage() {
  const [t1, setT1] = useState(false); const [t2, setT2] = useState(false)
  const [t3, setT3] = useState(false); const [t4, setT4] = useState(false)
  const [t5, setT5] = useState(false); const [t6, setT6] = useState(false)
  const [t7, setT7] = useState(false); const [t8, setT8] = useState(false)
  const [t9, setT9] = useState(false); const [t10, setT10] = useState(false)
  const [t11, setT11] = useState(false); const [t12, setT12] = useState(false)
  const [t13, setT13] = useState(false); const [t14, setT14] = useState(false)
  const [t15, setT15] = useState(false); const [t16, setT16] = useState(false)
  const [t17, setT17] = useState(false); const [t18, setT18] = useState(false)
  const [t19, setT19] = useState(false); const [t20, setT20] = useState(false)
  const [t21, setT21] = useState(false); const [t22, setT22] = useState(false)
  const [t23, setT23] = useState(false); const [t24, setT24] = useState(false)
  const [t25, setT25] = useState(false); const [t26, setT26] = useState(false)
  const [t27, setT27] = useState(false); const [t28, setT28] = useState(false)
  const [t29, setT29] = useState(false); const [t30, setT30] = useState(false)

  const states: Record<number, boolean> = { 1: t1, 2: t2, 3: t3, 4: t4, 5: t5, 6: t6, 7: t7, 8: t8, 9: t9, 10: t10, 11: t11, 12: t12, 13: t13, 14: t14, 15: t15, 16: t16, 17: t17, 18: t18, 19: t19, 20: t20, 21: t21, 22: t22, 23: t23, 24: t24, 25: t25, 26: t26, 27: t27, 28: t28, 29: t29, 30: t30 }
  const setters: Record<number, (v: boolean) => void> = { 1: setT1, 2: setT2, 3: setT3, 4: setT4, 5: setT5, 6: setT6, 7: setT7, 8: setT8, 9: setT9, 10: setT10, 11: setT11, 12: setT12, 13: setT13, 14: setT14, 15: setT15, 16: setT16, 17: setT17, 18: setT18, 19: setT19, 20: setT20, 21: setT21, 22: setT22, 23: setT23, 24: setT24, 25: setT25, 26: setT26, 27: setT27, 28: setT28, 29: setT29, 30: setT30 }

  const dirs = ["Top", "Bottom", "Left", "Right"]

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Tooltip</h1>
          <Badge variant="primary">8 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Hover, click, and delayed tooltips with directional placement.
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

      <section>
        <h2 className="mb-4 text-lg font-semibold">Directional</h2>
        <div className="flex flex-wrap gap-8">
          {dirs.map((d) => (
            <TooltipWrap key={d} content={`${d} tooltip`} dir={d}>{d}</TooltipWrap>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Sizes & Styles</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Small", tip: "Small hint", cls: "text-[10px] px-2 py-1" },
            { label: "Default", tip: "Standard tooltip", cls: "text-xs px-3 py-1.5" },
            { label: "Large", tip: "Large description text", cls: "text-sm px-4 py-2" },
            { label: "Sticky", tip: "Always visible", cls: "text-xs px-3 py-1.5" },
          ].map((s) => (
            <div key={s.label} className="relative inline-flex group">
              <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium dark:border-border">{s.label}</button>
              <div className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-black ${s.cls}`}>
                {s.tip}
                <Arrow dir="Top" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Rich Content</h2>
        <div className="flex flex-wrap gap-8">
          <div className="relative group">
            <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium dark:border-border">User Info</button>
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-64 -translate-x-1/2 rounded-lg bg-zinc-900 p-4 text-xs text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-black">
              <p className="mb-1 font-semibold">User Details</p>
              <p className="mb-1"><span className="text-muted-foreground/70 dark:text-muted-foreground">Name:</span> Jane Doe</p>
              <p className="mb-1"><span className="text-muted-foreground/70 dark:text-muted-foreground">Role:</span> <span className="text-indigo-400 dark:text-primary">Admin</span></p>
              <p><span className="text-muted-foreground/70 dark:text-muted-foreground">Status:</span> <span className="text-emerald-400 dark:text-emerald-600">Active</span></p>
              <Arrow dir="Top" />
            </div>
          </div>

          <div className="relative group">
            <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium dark:border-border">With Image</button>
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-56 -translate-x-1/2 rounded-lg bg-zinc-900 p-3 text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-black">
              <div className="mb-2 h-16 w-full rounded bg-zinc-700 dark:bg-muted" />
              <p className="text-xs font-medium">Product Preview</p>
              <p className="text-[10px] text-muted-foreground/70 dark:text-muted-foreground">Hover to preview image</p>
              <Arrow dir="Top" />
            </div>
          </div>

          <div className="relative group">
            <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium dark:border-border">List Content</button>
            <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-56 -translate-x-1/2 rounded-lg bg-zinc-900 p-3 text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-black">
              <p className="mb-1.5 text-xs font-medium">Quick Stats</p>
              <div className="flex justify-between text-[10px]"><span>Users</span><span className="font-medium">2,847</span></div>
              <div className="flex justify-between text-[10px]"><span>Revenue</span><span className="font-medium">$48K</span></div>
              <div className="flex justify-between text-[10px]"><span>Sessions</span><span className="font-medium">14.2K</span></div>
              <Arrow dir="Top" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Delayed (500ms)</h2>
        <div className="flex flex-wrap gap-8">
          <TooltipWrap content="Appeared after 500ms" delay={500}>Hover slowly</TooltipWrap>
          <TooltipWrap content="1 second delay" delay={1000}>Wait 1s</TooltipWrap>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Click Toggle</h2>
        <div className="flex flex-wrap gap-8">
          {dirs.map((d) => (
            <TooltipWrap key={`click-${d}`} content={`Click toggled ${d}`} dir={d} clickToggle>Click {d}</TooltipWrap>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Disabled Elements</h2>
        <div className="flex flex-wrap gap-8">
          <TooltipWrap content="This action is unavailable" disabled>Disabled</TooltipWrap>
          <TooltipWrap content="Coming in v5.0" dir="Bottom" disabled>Coming Soon</TooltipWrap>
          <TooltipWrap content="You need admin access" dir="Left" disabled>Admin Only</TooltipWrap>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">On Icons</h2>
        <div className="flex flex-wrap gap-6">
          {[
            { icon: "?", tip: "Get help" },
            { icon: "i", tip: "More information" },
            { icon: "!", tip: "Important notice" },
            { icon: "x", tip: "Close or dismiss" },
            { icon: "+", tip: "Create new item" },
            { icon: "#", tip: "Hashtag filter" },
          ].map((item) => (
            <div key={item.icon} className="relative group">
              <div className="flex h-8 w-8 cursor-help items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground dark:bg-muted dark:text-muted-foreground/70">
                {item.icon}
              </div>
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-black">
                {item.tip}
                <Arrow dir="Top" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">On Text</h2>
        <div className="text-sm text-muted-foreground">
          Hover over the{" "}
          <span className="relative group cursor-help underline decoration-dotted underline-offset-2">
            underlined text
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-black">
              Hidden explanation
              <Arrow dir="Top" />
            </span>
          </span>{" "}
          to see a tooltip.{" "}
          <span className="relative group cursor-help underline decoration-dotted underline-offset-2">
            Another one here
            <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-black">
              And another tip
              <Arrow dir="Top" />
            </span>
          </span>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Use Cases</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Truncated Text", tip: "Full text: This is a very long title that gets cut off" },
            { label: "Form Help", tip: "Password must be 8+ characters" },
            { label: "Status Dot", tip: "Online - Last seen 2m ago" },
            { label: "Badge Info", tip: "Premium feature - upgrade to access" },
          ].map((u) => (
            <div key={u.label} className="relative group">
              <div className="rounded-lg border border-border p-3 text-sm dark:border-border">
                <div className="truncate font-medium">{u.label}</div>
                <div className="text-xs text-muted-foreground">Hover for more</div>
              </div>
              <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-black">
                {u.tip}
                <Arrow dir="Top" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">All Positions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dirs.map((d) => (
            <div key={d} className="relative group flex justify-center">
              <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">{d}</button>
              <div className={`pointer-events-none absolute z-40 whitespace-nowrap rounded bg-zinc-900 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-black ${positions.find((p) => p.label === d)?.pos}`}>
                {d} positioned tooltip
                <Arrow dir={d} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Color Variants</h2>
        <div className="flex flex-wrap gap-6">
          {[
            { label: "Dark", bg: "bg-zinc-900 dark:bg-muted", text: "text-white dark:text-black" },
            { label: "Indigo", bg: "bg-primary", text: "text-white" },
            { label: "Red", bg: "bg-danger", text: "text-white" },
            { label: "Green", bg: "bg-success", text: "text-white" },
            { label: "Amber", bg: "bg-warning", text: "text-white" },
            { label: "Blue", bg: "bg-primary", text: "text-white" },
          ].map((c) => (
            <div key={c.label} className="relative group">
              <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium dark:border-border">{c.label}</button>
              <div className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded px-3 py-1.5 text-xs opacity-0 shadow-lg transition-opacity group-hover:opacity-100 ${c.bg} ${c.text}`}>
                {c.label} tooltip
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Edge Placements</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Top-Left", pos: "bottom-full right-0 mb-2" },
            { label: "Top-Right", pos: "bottom-full left-0 mb-2" },
            { label: "Bottom-Left", pos: "top-full right-0 mt-2" },
            { label: "Bottom-Right", pos: "top-full left-0 mt-2" },
            { label: "Left-Top", pos: "right-full top-0 mr-2" },
            { label: "Right-Top", pos: "left-full top-0 ml-2" },
          ].map((e) => (
            <div key={e.label} className="relative group flex justify-center">
              <button className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium dark:border-border">{e.label}</button>
              <div className={`pointer-events-none absolute z-40 whitespace-nowrap rounded bg-zinc-900 px-2 py-1 text-[10px] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-muted dark:text-black ${e.pos}`}>
                {e.label}
              </div>
            </div>
          ))}
        </div>
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
                <td className="px-4 py-3 font-mono text-xs">content</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">dir</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;Top&quot; | &quot;Bottom&quot; | &quot;Left&quot; | &quot;Right&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;Top&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">delay</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">0</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">clickToggle</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">disabled</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
