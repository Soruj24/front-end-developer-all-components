"use client"

import { useState, useRef, useEffect, useCallback } from "react"

interface DropdownItem {
  label: string; icon?: string; shortcut?: string; disabled?: boolean; destructive?: boolean; divider?: boolean
  type?: "radio" | "checkbox"; checked?: boolean; action?: () => void; children?: DropdownItem[]; badge?: string
}

const avatarItems: DropdownItem[] = [
  { label: "Profile", icon: "U", shortcut: "P" },
  { label: "Settings", icon: "G", shortcut: "S" },
  { label: "Billing", icon: "$" },
  { label: "Keyboard shortcuts", icon: "K", shortcut: "?" },
  { label: "", divider: true },
  { label: "Sign Out", icon: "X", destructive: true },
]

const nestedItems: DropdownItem[] = [
  { label: "New File", icon: "F", shortcut: "N" },
  { label: "New Folder", icon: "D", shortcut: "N F" },
  { label: "", divider: true },
  { label: "Import", icon: "I", children: [
    { label: "From CSV", icon: "C" },
    { label: "From JSON", icon: "J" },
    { label: "From Cloud", icon: "O", children: [
      { label: "Google Drive", icon: "G" },
      { label: "Dropbox", icon: "D" },
    ]},
  ]},
  { label: "Export", icon: "E", children: [
    { label: "Export as PDF", icon: "P" },
    { label: "Export as PNG", icon: "N" },
  ]},
]

const longItems: DropdownItem[] = Array.from({ length: 20 }, (_, i) => ({ label: `Item ${i + 1}`, icon: i % 2 === 0 ? "F" : "D" }))

function DropdownContent({ items, onClose }: { items: DropdownItem[]; onClose: () => void }) {
  const [openNested, setOpenNested] = useState<string | null>(null)
  const [radioIdx, setRadioIdx] = useState(0)
  const [checks, setChecks] = useState<Record<string, boolean>>({ "Show Sidebar": true, "Show Toolbar": true })

  return (
    <div className="min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md">
      {items.map((item, i) => {
        if (item.divider) return <div key={i} className="-mx-1 my-1 h-px bg-muted" />
        if (item.type === "radio") return (
          <button key={item.label} onClick={() => { setRadioIdx(i); onClose() }}
            className={`flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${item.disabled ? "pointer-events-none opacity-50" : ""}`}>
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-primary">{radioIdx === i && <span className="h-2 w-2 rounded-full bg-primary" />}</span>{item.label}
          </button>
        )
        if (item.type === "checkbox") {
          const checked = checks[item.label] ?? false
          return (
            <button key={item.label} onClick={() => setChecks((p) => ({ ...p, [item.label]: !checked }))}
              className="flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
              <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-primary">{checked && <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}</span>{item.label}
            </button>
          )
        }
        const hasChildren = !!item.children?.length
        return (
          <div key={item.label} className="relative"
            onMouseEnter={() => { if (hasChildren) setOpenNested(item.label) }}
            onMouseLeave={() => { setOpenNested(null) }}>
            <button disabled={item.disabled} onClick={() => { if (!hasChildren) { item.action?.(); onClose() } }}
              className={`flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground ${item.disabled ? "pointer-events-none opacity-50" : item.destructive ? "text-destructive hover:bg-destructive/10" : "hover:bg-accent hover:text-accent-foreground"}`}>
              {item.icon && <span className="flex h-4 w-4 shrink-0 items-center justify-center">{item.icon}</span>}
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && <span className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">{item.badge}</span>}
              {item.shortcut && <span className="ml-auto text-xs tracking-widest opacity-60">{item.shortcut}</span>}
              {hasChildren && <span className="ml-auto opacity-60">▸</span>}
            </button>
            {hasChildren && openNested === item.label && (
              <div className="absolute left-full top-0 z-50 ml-1"><DropdownContent items={item.children!} onClose={onClose} /></div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function Dropdown({ trigger, items, width }: { trigger: React.ReactNode; items: DropdownItem[]; width?: string }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    if (open) { document.addEventListener("mousedown", handler); return () => document.removeEventListener("mousedown", handler) }
  }, [open])
  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && <div className={`absolute left-0 top-full z-40 mt-1 ${width || ""}`}><DropdownContent items={items} onClose={() => setOpen(false)} /></div>}
    </div>
  )
}

export default function DropdownPage() {
  const [d1, setD1] = useState(false); const [d2, setD2] = useState(false)
  const [d3, setD3] = useState(false); const [d4, setD4] = useState(false)
  const [d5, setD5] = useState(false); const [d6, setD6] = useState(false)
  const [d7, setD7] = useState(false); const [d8, setD8] = useState(false)
  const [d9, setD9] = useState(false); const [d10, setD10] = useState(false)
  const [d11, setD11] = useState(false); const [d12, setD12] = useState(false)
  const [d13, setD13] = useState(false); const [d14, setD14] = useState(false)
  const [d15, setD15] = useState(false); const [d16, setD16] = useState(false)
  const [d17, setD17] = useState(false); const [d18, setD18] = useState(false)
  const [d19, setD19] = useState(false); const [d20, setD20] = useState(false)
  const [d21, setD21] = useState(false); const [d22, setD22] = useState(false)
  const [d23, setD23] = useState(false); const [d24, setD24] = useState(false)
  const [d25, setD25] = useState(false); const [d26, setD26] = useState(false)
  const [d27, setD27] = useState(false); const [d28, setD28] = useState(false)
  const [d29, setD29] = useState(false); const [d30, setD30] = useState(false)

  const stateMap: Record<number, [boolean, (v: boolean) => void]> = {
    1: [d1, setD1], 2: [d2, setD2], 3: [d3, setD3], 4: [d4, setD4], 5: [d5, setD5],
    6: [d6, setD6], 7: [d7, setD7], 8: [d8, setD8], 9: [d9, setD9], 10: [d10, setD10],
    11: [d11, setD11], 12: [d12, setD12], 13: [d13, setD13], 14: [d14, setD14], 15: [d15, setD15],
    16: [d16, setD16], 17: [d17, setD17], 18: [d18, setD18], 19: [d19, setD19], 20: [d20, setD20],
    21: [d21, setD21], 22: [d22, setD22], 23: [d23, setD23], 24: [d24, setD24], 25: [d25, setD25],
    26: [d26, setD26], 27: [d27, setD27], 28: [d28, setD28], 29: [d29, setD29], 30: [d30, setD30],
  }

  const closeAll = useCallback(() => { Object.values(stateMap).forEach(([, s]) => s(false)) }, [])

  const items = [
    { label: "Basic Menu", desc: "Simple action list", items: [{ label: "Edit", shortcut: "E" }, { label: "Duplicate", shortcut: "D" }, { label: "", divider: true }, { label: "Delete", destructive: true }] as DropdownItem[] },
    { label: "With Icons", desc: "Action list with icons", items: [{ label: "Profile", icon: "U" }, { label: "Settings", icon: "G" }, { label: "Billing", icon: "$" }] as DropdownItem[] },
    { label: "With Shortcuts", desc: "Keyboard shortcuts", items: [{ label: "Copy", shortcut: "Ctrl+C" }, { label: "Paste", shortcut: "Ctrl+V" }, { label: "Cut", shortcut: "Ctrl+X" }, { label: "Save", shortcut: "Ctrl+S" }] as DropdownItem[] },
    { label: "With Badges", desc: "Badge indicators", items: [{ label: "Inbox", badge: "12" }, { label: "Drafts", badge: "3" }, { label: "Sent", badge: "0" }, { label: "Spam", badge: "5" }] as DropdownItem[] },
    { label: "Disabled Items", desc: "Grayed out options", items: [{ label: "Available" }, { label: "Coming Soon", disabled: true }, { label: "Locked", disabled: true }, { label: "Available Too" }] as DropdownItem[] },
    { label: "Destructive", desc: "Danger action at bottom", items: [{ label: "Edit" }, { label: "Archive" }, { label: "", divider: true }, { label: "Delete", destructive: true }] as DropdownItem[] },
    { label: "With Divider", desc: "Section separation", items: [{ label: "New File" }, { label: "New Folder" }, { label: "", divider: true }, { label: "Import" }, { label: "Export" }] as DropdownItem[] },
    { label: "Nested Submenus", desc: "Multi-level menus", items: nestedItems },
    { label: "Radio Group", desc: "Single select", items: [{ label: "Ascending", type: "radio" as const, checked: true }, { label: "Descending", type: "radio" as const }, { label: "Alphabetical", type: "radio" as const }] },
    { label: "Checkbox Group", desc: "Multi select", items: [{ label: "Show Sidebar", type: "checkbox" as const, checked: true }, { label: "Show Toolbar", type: "checkbox" as const, checked: true }, { label: "Show Status Bar", type: "checkbox" as const }] },
    { label: "Mixed Items", desc: "Radio + checkbox + actions", items: [
      { label: "Sort: Ascending", type: "radio" as const, checked: true },
      { label: "Sort: Descending", type: "radio" as const },
      { label: "", divider: true },
      { label: "Show Sidebar", type: "checkbox" as const, checked: true },
      { label: "Show Toolbar", type: "checkbox" as const },
    ]},
    { label: "Long List", desc: "Scrollable (20 items)", items: longItems },
    { label: "Custom Trigger", desc: "Avatar button", items: avatarItems },
    { label: "Icon Button", desc: "Gear icon trigger", items: avatarItems },
    { label: "Text Trigger", desc: "Plain text link", items: avatarItems },
    { label: "Account Menu", desc: "User profile menu", items: [
      { label: "Profile", icon: "U" }, { label: "Settings", icon: "G" },
      { label: "Billing", icon: "$" }, { label: "", divider: true },
      { label: "Sign Out", destructive: true },
    ] as DropdownItem[] },
    { label: "Sort Options", desc: "Sort by field", items: [
      { label: "Name", type: "radio" as const, checked: true },
      { label: "Date", type: "radio" as const },
      { label: "Size", type: "radio" as const },
      { label: "Type", type: "radio" as const },
    ]},
    { label: "View Options", desc: "Toggle visibility", items: [
      { label: "Grid View", type: "checkbox" as const, checked: true },
      { label: "List View", type: "checkbox" as const },
      { label: "Compact", type: "checkbox" as const },
    ]},
    { label: "Status Menu", desc: "Set task status", items: [
      { label: "To Do", icon: "T" }, { label: "In Progress", icon: "P" },
      { label: "Review", icon: "R" }, { label: "Done", icon: "D" },
    ] as DropdownItem[] },
    { label: "Priority Menu", desc: "Set priority", items: [
      { label: "Low", icon: "L" }, { label: "Medium", icon: "M" },
      { label: "High", icon: "H" }, { label: "Urgent", icon: "U" },
    ] as DropdownItem[] },
    { label: "Assign Menu", desc: "Assign to user", items: [
      { label: "Alice", icon: "A" }, { label: "Bob", icon: "B" },
      { label: "Carol", icon: "C" }, { label: "Dave", icon: "D" },
    ] as DropdownItem[] },
    { label: "More Actions", desc: "Extra actions", items: [
      { label: "Export as CSV" }, { label: "Export as PDF" },
      { label: "Print" }, { label: "Bookmark" },
    ] as DropdownItem[] },
    { label: "Share Menu", desc: "Share options", items: [
      { label: "Copy Link", icon: "L" }, { label: "Share via Email", icon: "E" },
      { label: "Share to Slack", icon: "S" },
    ] as DropdownItem[] },
    { label: "Filter Menu", desc: "Filter by status", items: [
      { label: "All", type: "radio" as const, checked: true },
      { label: "Active", type: "radio" as const },
      { label: "Archived", type: "radio" as const },
      { label: "Draft", type: "radio" as const },
    ]},
    { label: "Date Filter", desc: "Date range filter", items: [
      { label: "Today", icon: "T" }, { label: "This Week", icon: "W" },
      { label: "This Month", icon: "M" }, { label: "Custom", icon: "C" },
    ] as DropdownItem[] },
    { label: "Notification Prefs", desc: "Notification toggles", items: [
      { label: "Email", type: "checkbox" as const, checked: true },
      { label: "Push", type: "checkbox" as const, checked: true },
      { label: "SMS", type: "checkbox" as const },
    ]},
    { label: "Language Menu", desc: "Choose language", items: [
      { label: "English", type: "radio" as const, checked: true },
      { label: "Spanish", type: "radio" as const },
      { label: "French", type: "radio" as const },
      { label: "German", type: "radio" as const },
    ]},
    { label: "Theme Menu", desc: "Appearance theme", items: [
      { label: "Light", icon: "L" }, { label: "Dark", icon: "D" },
      { label: "System", icon: "S" },
    ] as DropdownItem[] },
    { label: "Help Menu", desc: "Help resources", items: [
      { label: "Documentation", icon: "D" }, { label: "FAQ", icon: "F" },
      { label: "Contact Support", icon: "S" }, { label: "", divider: true },
      { label: "About", icon: "A" },
    ] as DropdownItem[] },
    { label: "Full Menu", desc: "All features demo", items: [
      { label: "Profile", icon: "U", shortcut: "P" },
      { label: "Settings", icon: "G", shortcut: "S" },
      { label: "Inbox", icon: "I", badge: "12" },
      { label: "", divider: true },
      { label: "Import", icon: "I", children: [
        { label: "From CSV", icon: "C" }, { label: "From JSON", icon: "J" },
      ]},
      { label: "", divider: true },
      { label: "Delete Project", destructive: true },
    ] as DropdownItem[] },
  ]

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Dropdown</h1>
        <p className="mt-1 text-muted-foreground">Dropdown menus with nested submenus, icons, shortcuts, badges, and interactive items.</p>
      </div>

      <div className="flex flex-wrap gap-4">
        <Dropdown
          trigger={<button className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">☰ Button</button>}
          items={avatarItems}
        />
        <Dropdown
          trigger={<button className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-bold text-white">JD</button>}
          items={avatarItems}
        />
        <Dropdown
          trigger={<button className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-lg hover:bg-accent hover:text-accent-foreground">⚙</button>}
          items={avatarItems}
        />
        <Dropdown
          trigger={<span className="cursor-pointer text-sm text-primary underline hover:text-indigo-700 dark:text-indigo-400">Account</span>}
          items={avatarItems}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {items.map((item, i) => (
          <div key={i} className="relative rounded-xl border border-border p-4 dark:border-border">
            <div className="text-sm font-medium">{item.label}</div>
            <div className="mt-0.5 text-xs text-muted-foreground">{item.desc}</div>
            <div className="mt-3">
              <button
                onClick={() => {
                  closeAll()
                  const [open, setOpen] = stateMap[i + 1]
                  setTimeout(() => setOpen(!open), 10)
                }}
                className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted"
              >
                Open
              </button>
            </div>
            {stateMap[i + 1]?.[0] && (
              <div className="absolute left-4 top-full z-40 mt-1">
                <div className="min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md">
                  {item.items.map((it, j) => {
                    if (it.divider) return <div key={j} className="-mx-1 my-1 h-px bg-muted" />
                    if (it.type === "radio") {
                      const [open] = stateMap[i + 1]
                      return (
                        <button key={it.label} onClick={() => stateMap[i + 1]?.[1](false)}
                          className="flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-primary">{open && it.checked && <span className="h-2 w-2 rounded-full bg-primary" />}</span>{it.label}
                        </button>
                      )
                    }
                    if (it.type === "checkbox") {
                      return (
                        <button key={it.label} onClick={() => {}}
                          className="flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-primary">{it.checked && <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none"><path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}</span>{it.label}
                        </button>
                      )
                    }
                    const hasChildren = !!(it as DropdownItem).children?.length
                    return (
                      <button key={it.label} disabled={it.disabled}
                        className={`flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground ${it.disabled ? "pointer-events-none opacity-50" : it.destructive ? "text-destructive hover:bg-destructive/10" : "hover:bg-accent hover:text-accent-foreground"}`}
                        onClick={() => { if (!hasChildren) stateMap[i + 1]?.[1](false) }}>
                        {it.icon && <span className="flex h-4 w-4 shrink-0 items-center justify-center">{it.icon}</span>}
                        <span className="flex-1 text-left">{it.label}</span>
                        {it.badge && <span className="ml-auto rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">{it.badge}</span>}
                        {it.shortcut && <span className="ml-auto text-xs tracking-widest opacity-60">{it.shortcut}</span>}
                        {hasChildren && <span className="ml-auto opacity-60">▸</span>}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
