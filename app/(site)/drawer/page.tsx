"use client";

import { useState, type ReactNode } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add drawer`;

const usageCode = `import { Drawer } from "@/components/_drawer";

<Drawer open={open} onClose={() => setOpen(false)} side="right" title="Drawer">
  <p>Drawer content goes here.</p>
</Drawer>`;

type DrawerSide = "left" | "right" | "top" | "bottom";
type DrawerSize = "sm" | "md" | "lg" | "xl" | "full";

const SIZES: Record<DrawerSize, string> = {
  sm: "w-full max-w-80",
  md: "w-full max-w-[400px]",
  lg: "w-full max-w-[500px]",
  xl: "w-full max-w-[640px]",
  full: "w-full max-w-2xl",
};

const SIDE_CONFIG: Record<DrawerSide, { enter: string; exit: string; style: string; border: string }> = {
  left: { enter: "translate-x-0", exit: "-translate-x-full", style: "left-0 top-0 bottom-0", border: "border-r" },
  right: { enter: "translate-x-0", exit: "translate-x-full", style: "right-0 top-0 bottom-0", border: "border-l" },
  top: { enter: "translate-y-0", exit: "-translate-y-full", style: "top-0 left-0 right-0 h-auto max-h-[60vh]", border: "border-b" },
  bottom: { enter: "translate-y-0", exit: "translate-y-full", style: "bottom-0 left-0 right-0 h-auto max-h-[60vh]", border: "border-t" },
};

function Drawer({
  open,
  onClose,
  side = "right",
  size = "md",
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  size?: DrawerSize;
  title?: string;
  children: ReactNode;
}) {
  const cfg = SIDE_CONFIG[side];
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed z-50 bg-white shadow-xl transition-all duration-200 ease-in-out dark:bg-zinc-900 ${
          SIZES[size] || SIZES.md
        } ${cfg.style} ${cfg.border} border-border overflow-y-auto ${
          open ? cfg.enter : cfg.exit
        }`}
      >
        <div className="flex items-center justify-between p-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button onClick={onClose} className="ml-auto rounded p-1 hover:bg-muted dark:hover:bg-muted">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 pt-0">{children}</div>
      </div>
    </>
  );
}

const triggerBtn = "rounded-lg border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted dark:border-border dark:hover:bg-muted";

const navItems = ["Dashboard", "Analytics", "Messages", "Calendar", "Files", "Settings", "Help"];

const notifs = [
  { icon: "!", title: "Server alert", time: "2m ago", color: "text-danger bg-red-100 dark:bg-red-900/30" },
  { icon: "$", title: "Payment received", time: "15m ago", color: "text-success bg-green-100 dark:bg-green-900/30" },
  { icon: "U", title: "Update available", time: "1h ago", color: "text-blue-500 bg-primary-soft dark:bg-blue-900/30" },
  { icon: "M", title: "New message", time: "2h ago", color: "text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30" },
  { icon: "T", title: "Task completed", time: "3h ago", color: "text-warning bg-amber-100 dark:bg-amber-900/30" },
  { icon: "+", title: "New follower", time: "5h ago", color: "text-purple-500 bg-purple-100 dark:bg-purple-900/30" },
];

export default function DrawerPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [cartQty, setCartQty] = useState([1, 2, 1]);
  const [filterActive, setFilterActive] = useState("All");

  const carts = [
    { name: "Wireless Headphones", price: "$79" },
    { name: "USB-C Hub", price: "$49" },
    { name: "Desk Lamp", price: "$39" },
  ];
  const cartTotal = cartQty.reduce((sum, q, i) => sum + q * [79, 49, 39][i], 0);

  const filters = [
    { name: "All" }, { name: "Design" }, { name: "Development" },
    { name: "Marketing" }, { name: "Sales" }, { name: "Support" },
  ];

  const settingsItems = [
    { label: "Account", icon: "A" }, { label: "Privacy", icon: "P" },
    { label: "Security", icon: "S" }, { label: "Notifications", icon: "N" },
    { label: "Appearance", icon: "V" }, { label: "Language", icon: "L" },
  ];

  const close = () => setOpen(null);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Drawer</h1>
          <Badge variant="primary">10 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of off-canvas panel patterns — directions, sizes, carts,
          filters, navigation, forms, and more. Use the tabs to switch between
          the live preview, source code, CLI, installation, and dependency
          details for each example.
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

      <ComponentPreview id="drawer-directions">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Right</button>
          <button onClick={() => setOpen(1)} className={triggerBtn}>Left</button>
          <button onClick={() => setOpen(2)} className={triggerBtn}>Top</button>
          <button onClick={() => setOpen(3)} className={triggerBtn}>Bottom</button>

          <Drawer open={open === 0} onClose={close} side="right" title="Right Panel">
            <p className="text-sm text-muted-foreground">Default drawer slides in from the right side.</p>
            <div className="mt-4 flex flex-col gap-2">
              {["Profile", "Settings", "Notifications", "Help"].map((item) => (
                <button key={item} onClick={close} className="rounded-lg px-3 py-2 text-left text-sm hover:bg-muted dark:hover:bg-muted">{item}</button>
              ))}
            </div>
          </Drawer>

          <Drawer open={open === 1} onClose={close} side="left" title="Navigation">
            <div className="flex flex-col gap-1">
              {navItems.map((n) => (
                <button key={n} onClick={close} className="rounded-lg px-3 py-2 text-left text-sm hover:bg-muted dark:hover:bg-muted">{n}</button>
              ))}
            </div>
          </Drawer>

          <Drawer open={open === 2} onClose={close} side="top" title="Announcement">
            <p className="text-sm text-muted-foreground">Scheduled maintenance tonight at 2 AM. Expect 30 minutes of downtime.</p>
            <div className="mt-3 flex gap-2">
              <button onClick={close} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">Got it</button>
              <button onClick={close} className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium dark:border-border">Learn more</button>
            </div>
          </Drawer>

          <Drawer open={open === 3} onClose={close} side="bottom" title="Actions">
            <div className="flex flex-col gap-1">
              {["Edit", "Duplicate", "Archive", "Delete"].map((a) => (
                <button key={a} onClick={close} className={`rounded-lg px-3 py-2.5 text-left text-sm ${a === "Delete" ? "text-danger hover:bg-danger-soft dark:hover:bg-red-900/20" : "hover:bg-muted dark:hover:bg-muted"}`}>{a}</button>
              ))}
            </div>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-sizes">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Small</button>
          <button onClick={() => setOpen(1)} className={triggerBtn}>Large</button>
          <button onClick={() => setOpen(2)} className={triggerBtn}>Full</button>

          <Drawer open={open === 0} onClose={close} side="right" size="sm" title="Mini Panel">
            <p className="text-sm text-muted-foreground">Compact sidebar for quick actions.</p>
            <button onClick={close} className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Close</button>
          </Drawer>

          <Drawer open={open === 1} onClose={close} side="right" size="lg" title="Wide Layout">
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="rounded-lg bg-muted/40 p-3 dark:bg-muted">
                  <div className="text-sm font-medium">Card {i + 1}</div>
                  <div className="mt-1 text-xs text-muted-foreground">Content goes here</div>
                </div>
              ))}
            </div>
          </Drawer>

          <Drawer open={open === 2} onClose={close} side="right" size="full" title="Full Width">
            <div className="flex gap-4">
              <div className="flex-1 rounded-lg bg-muted/40 p-4 dark:bg-muted">
                <div className="text-sm font-medium">Main Content</div>
                <p className="mt-1 text-xs text-muted-foreground">Full-width drawer spans most of the screen.</p>
              </div>
              <div className="w-40 rounded-lg bg-muted/40 p-4 dark:bg-muted">
                <div className="text-sm font-medium">Sidebar</div>
              </div>
            </div>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-cart">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Open Cart</button>

          <Drawer open={open === 0} onClose={close} side="right" title="Shopping Cart">
            <div className="flex flex-col gap-3">
              {carts.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
                  <div>
                    <div className="text-sm font-medium">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.price}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { const next = [...cartQty]; next[i] = Math.max(0, next[i] - 1); setCartQty(next); }} className="flex h-6 w-6 items-center justify-center rounded border text-xs dark:border-border">-</button>
                    <span className="w-4 text-center text-sm">{cartQty[i]}</span>
                    <button onClick={() => { const next = [...cartQty]; next[i] += 1; setCartQty(next); }} className="flex h-6 w-6 items-center justify-center rounded border text-xs dark:border-border">+</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4 dark:border-border">
              <span className="text-sm font-medium">Total</span>
              <span className="text-lg font-bold">${cartTotal}</span>
            </div>
            <button onClick={close} className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Checkout</button>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-filter">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Open Filters</button>

          <Drawer open={open === 0} onClose={close} side="left" title="Filters">
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.name}
                  onClick={() => setFilterActive(f.name)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${filterActive === f.name ? "bg-foreground text-background dark:bg-muted dark:text-zinc-900" : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground"}`}
                >
                  {f.name}
                </button>
              ))}
            </div>
            <div className="mt-6 flex gap-2">
              <button onClick={close} className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Apply</button>
              <button onClick={close} className="flex-1 rounded-lg border border-border py-2 text-sm font-medium dark:border-border">Reset</button>
            </div>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-notifications-profile">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Notifications</button>
          <button onClick={() => setOpen(1)} className={triggerBtn}>Profile</button>

          <Drawer open={open === 0} onClose={close} side="right" title="Notifications">
            <div className="flex flex-col gap-2">
              {notifs.map((n) => (
                <div key={n.title} className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted/40 dark:hover:bg-muted/50">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${n.color}`}>{n.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={close} className="mt-4 w-full rounded-lg border border-border py-2 text-sm font-medium dark:border-border">Mark all read</button>
          </Drawer>

          <Drawer open={open === 1} onClose={close} side="right" title="Profile">
            <div className="flex flex-col items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-primary dark:bg-indigo-900/30 dark:text-indigo-400">JD</div>
              <div className="mt-3 text-lg font-semibold">Jane Doe</div>
              <div className="text-sm text-muted-foreground">jane@example.com</div>
              <div className="mt-4 flex gap-2">
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">Admin</span>
                <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-blue-900/30 dark:text-blue-400">Pro</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-1">
              {["Edit Profile", "Account Settings", "Billing", "Sign Out"].map((a) => (
                <button key={a} onClick={close} className="rounded-lg px-3 py-2 text-left text-sm hover:bg-muted dark:hover:bg-muted">{a}</button>
              ))}
            </div>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-navigation">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Menu</button>
          <button onClick={() => setOpen(1)} className={triggerBtn}>Settings</button>
          <button onClick={() => setOpen(2)} className={triggerBtn}>Help</button>

          <Drawer open={open === 0} onClose={close} side="left" title="Menu">
            <div className="flex flex-col gap-1">
              {navItems.map((n, i) => (
                <button
                  key={n}
                  onClick={close}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${i === 0 ? "bg-indigo-50 font-medium text-primary dark:bg-indigo-900/20 dark:text-indigo-400" : "hover:bg-muted dark:hover:bg-muted"}`}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded bg-muted text-xs dark:bg-muted">{n.charAt(0)}</span>
                  {n}
                </button>
              ))}
            </div>
          </Drawer>

          <Drawer open={open === 1} onClose={close} side="right" title="Settings">
            <div className="flex flex-col gap-1">
              {settingsItems.map((s) => (
                <button key={s.label} onClick={close} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted dark:hover:bg-muted">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs font-medium dark:bg-muted">{s.icon}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </Drawer>

          <Drawer open={open === 2} onClose={close} side="right" title="Help & Support">
            <div className="flex flex-col gap-2">
              {["Getting Started", "FAQ", "Contact Support", "Report Bug", "API Docs", "Community"].map((h) => (
                <button key={h} onClick={close} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-muted dark:hover:bg-muted">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-muted text-xs dark:bg-muted">{h.charAt(0)}</span>
                  {h}
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
              <div className="text-sm font-medium text-indigo-700 dark:text-indigo-400">Need help?</div>
              <p className="mt-1 text-xs text-primary dark:text-indigo-300">Our team typically responds within 2 hours.</p>
            </div>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-forms">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Quick Form</button>
          <button onClick={() => setOpen(1)} className={triggerBtn}>Invite</button>

          <Drawer open={open === 0} onClose={close} side="right" title="Quick Form">
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Name</label>
                <input className="w-full rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted" placeholder="Enter name" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Email</label>
                <input className="w-full rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted" placeholder="Enter email" type="email" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Message</label>
                <textarea className="w-full rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted" rows={3} placeholder="Type here" />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button onClick={close} className="flex-1 rounded-lg border border-border py-2 text-sm font-medium dark:border-border">Cancel</button>
              <button onClick={close} className="flex-1 rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Submit</button>
            </div>
          </Drawer>

          <Drawer open={open === 1} onClose={close} side="right" title="Invite People">
            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-muted-foreground">Email addresses</label>
                <textarea className="w-full rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted" rows={3} placeholder="john@example.com" />
              </div>
              <select aria-label="Member role" className="w-full rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted">
                <option>Member</option>
                <option>Admin</option>
                <option>Viewer</option>
              </select>
              <button onClick={close} className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Send Invites</button>
            </div>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-team">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Team</button>

          <Drawer open={open === 0} onClose={close} side="right" title="Team">
            <div className="flex flex-col gap-2">
              {["Alice", "Bob", "Carol", "Dave", "Eve"].map((m) => (
                <div key={m} className="flex items-center justify-between rounded-lg border border-border p-3 dark:border-border">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium dark:bg-muted">{m.charAt(0)}</div>
                    <div>
                      <div className="text-sm font-medium">{m}</div>
                      <div className="text-xs text-muted-foreground">{m.toLowerCase()}@company.com</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400">Online</span>
                </div>
              ))}
            </div>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-activity">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Activity</button>
          <button onClick={() => setOpen(1)} className={triggerBtn}>History</button>

          <Drawer open={open === 0} onClose={close} side="right" title="Activity">
            <div className="flex flex-col gap-3">
              {["Created project 'Dashboard'", "Updated profile picture", "Deleted old backup", "Added team member", "Changed password", "Exported data"].map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-2.5 w-2.5 rounded-full bg-indigo-500" />
                    {i < 5 && <div className="h-full w-px bg-muted" />}
                  </div>
                  <div className="pb-3">
                    <div className="text-sm">{a}</div>
                    <div className="text-xs text-muted-foreground">{i + 1}h ago</div>
                  </div>
                </div>
              ))}
            </div>
          </Drawer>

          <Drawer open={open === 1} onClose={close} side="right" title="Version History">
            <div className="flex flex-col gap-3">
              {[
                { ver: "v4.2.1", date: "Today", desc: "Bug fixes and performance improvements" },
                { ver: "v4.2.0", date: "3 days ago", desc: "New dashboard charts and export feature" },
                { ver: "v4.1.0", date: "2 weeks ago", desc: "Dark mode and accessibility updates" },
                { ver: "v4.0.0", date: "1 month ago", desc: "Major redesign with new component library" },
              ].map((v) => (
                <div key={v.ver} className="rounded-lg border border-border p-3 dark:border-border">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{v.ver}</span>
                    <span className="text-xs text-muted-foreground">{v.date}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-comments">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Comments</button>

          <Drawer open={open === 0} onClose={close} side="right" title="Comments">
            <div className="flex flex-col gap-4">
              {["Great work!", "Can you review this?", "LGTM!", "Let's discuss in standup."].map((c, i) => (
                <div key={i} className="rounded-lg bg-muted/40 p-3 dark:bg-muted">
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs text-primary">U{i + 1}</div>
                    <span className="text-xs font-medium">User {i + 1}</span>
                    <span className="text-xs text-muted-foreground">{i + 1}h ago</span>
                  </div>
                  <p className="mt-1 text-sm">{c}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <input className="flex-1 rounded-lg border border-border px-3 py-2 text-sm dark:border-border dark:bg-muted" placeholder="Add comment..." />
              <button onClick={close} className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground">Send</button>
            </div>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-actions">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Share</button>
          <button onClick={() => setOpen(1)} className={triggerBtn}>Upload</button>
          <button onClick={() => setOpen(2)} className={triggerBtn}>Search</button>

          <Drawer open={open === 0} onClose={close} side="bottom" title="Share">
            <div className="grid grid-cols-4 gap-3">
              {["Email", "Link", "Twitter", "Slack", "Teams", "WhatsApp", "Telegram", "Copy"].map((s) => (
                <button key={s} onClick={close} className="flex flex-col items-center gap-1 rounded-lg p-3 hover:bg-muted dark:hover:bg-muted">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-medium dark:bg-muted">{s.slice(0, 2)}</div>
                  <span className="text-xs text-muted-foreground">{s}</span>
                </button>
              ))}
            </div>
          </Drawer>

          <Drawer open={open === 1} onClose={close} side="right" title="Upload Files">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-8 dark:border-border">
              <svg className="mb-2 h-8 w-8 text-muted-foreground/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              <p className="text-sm text-muted-foreground">Drag files or click to upload</p>
              <button className="mt-3 rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">Browse</button>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {["design.png", "report.pdf", "photo.jpg"].map((f) => (
                <div key={f} className="flex items-center gap-3 rounded-lg bg-muted/40 p-2 dark:bg-muted">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-muted text-xs dark:bg-muted">{f.split(".").pop()}</div>
                  <div className="flex-1 text-sm">{f}</div>
                  <button className="text-xs text-danger" onClick={close}>Remove</button>
                </div>
              ))}
            </div>
          </Drawer>

          <Drawer open={open === 2} onClose={close} side="top" title="Search">
            <input
              autoFocus
              className="w-full rounded-lg border border-border px-4 py-3 text-sm dark:border-border dark:bg-muted"
              placeholder="Search projects, files, and more..."
            />
            <div className="mt-4 flex flex-col gap-1">
              {["Dashboard", "Analytics Report", "User Settings", "API Documentation"].map((s) => (
                <button key={s} onClick={close} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-muted dark:hover:bg-muted">
                  <span className="text-xs text-muted-foreground/70">#</span>
                  {s}
                </button>
              ))}
            </div>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-settings-tools">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Theme</button>
          <button onClick={() => setOpen(1)} className={triggerBtn}>Checklist</button>
          <button onClick={() => setOpen(2)} className={triggerBtn}>Shortcuts</button>

          <Drawer open={open === 0} onClose={close} side="right" title="Theme">
            <p className="mb-3 text-sm text-muted-foreground">Choose your accent color</p>
            <div className="flex flex-wrap gap-3">
              {["#4f46e5", "#059669", "#dc2626", "#d97706", "#2563eb", "#7c3aed", "#db2777", "#0891b2"].map((c) => (
                <button
                  key={c}
                  onClick={close}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110"
                  style={{ backgroundColor: c }}
                >
                  {c === "#4f46e5" && <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
                </button>
              ))}
            </div>
          </Drawer>

          <Drawer open={open === 1} onClose={close} side="right" title="Checklist">
            <div className="flex flex-col gap-2">
              {["Set up project", "Invite team", "Configure CI/CD", "Write docs", "Deploy to staging", "Run tests", "Review PRs"].map((task, i) => (
                <label key={task} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-sm dark:border-border">
                  <input type="checkbox" defaultChecked={i < 2} className="accent-primary" />
                  <span className={i < 2 ? "text-muted-foreground/70 line-through" : ""}>{task}</span>
                </label>
              ))}
            </div>
          </Drawer>

          <Drawer open={open === 2} onClose={close} side="right" title="Shortcuts">
            <div className="flex flex-col gap-2">
              {[
                { keys: "Ctrl+K", action: "Command palette" },
                { keys: "Ctrl+S", action: "Save" },
                { keys: "Ctrl+F", action: "Search" },
                { keys: "Ctrl+Z", action: "Undo" },
                { keys: "Ctrl+Shift+P", action: "Publish" },
                { keys: "Escape", action: "Close dialog" },
              ].map((s) => (
                <div key={s.keys} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm">
                  <span className="text-muted-foreground">{s.action}</span>
                  <kbd className="rounded border border-border px-2 py-0.5 text-xs font-medium dark:border-border">{s.keys}</kbd>
                </div>
              ))}
            </div>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-pricing-analytics">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Plans</button>
          <button onClick={() => setOpen(1)} className={triggerBtn}>Stats</button>

          <Drawer open={open === 0} onClose={close} side="right" title="Plans">
            <div className="flex flex-col gap-3">
              {[
                { name: "Free", price: "$0", badge: "" },
                { name: "Pro", price: "$29", badge: "Popular" },
                { name: "Enterprise", price: "$99", badge: "" },
              ].map((p) => (
                <div key={p.name} className={`rounded-lg border p-4 ${p.badge ? "border-indigo-500" : "border-border"}`}>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{p.name}</div>
                    {p.badge && <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">{p.badge}</span>}
                  </div>
                  <div className="mt-1 text-2xl font-bold">{p.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                  <button onClick={close} className={`mt-3 w-full rounded-lg py-1.5 text-sm font-medium ${p.badge ? "bg-primary text-primary-foreground hover:bg-primary/90" : "border border-border dark:border-border hover:bg-muted/40 dark:hover:bg-muted"}`}>Choose</button>
                </div>
              ))}
            </div>
          </Drawer>

          <Drawer open={open === 1} onClose={close} side="right" title="Quick Stats">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Users", value: "2,847" },
                { label: "Revenue", value: "$48K" },
                { label: "Sessions", value: "14.2K" },
                { label: "Bounce", value: "32%" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-border p-3 text-center dark:border-border">
                  <div className="text-lg font-bold">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
            <button onClick={close} className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">View Full Report</button>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-bookmarks-language">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Bookmarks</button>
          <button onClick={() => setOpen(1)} className={triggerBtn}>Language</button>

          <Drawer open={open === 0} onClose={close} side="right" title="Bookmarks">
            <div className="flex flex-col gap-2">
              {["Getting Started Guide", "API Reference", "Design System", "Component Library", "Best Practices"].map((b) => (
                <button key={b} onClick={close} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm hover:bg-muted dark:hover:bg-muted">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-xs text-warning dark:bg-amber-900/30 dark:text-warning">&#9733;</span>
                  <span>{b}</span>
                </button>
              ))}
            </div>
          </Drawer>

          <Drawer open={open === 1} onClose={close} side="bottom" title="Language">
            <div className="grid grid-cols-2 gap-2">
              {["English", "Spanish", "French", "German", "Chinese", "Japanese", "Korean", "Portuguese", "Russian", "Arabic"].map((lang) => (
                <button key={lang} onClick={close} className={`rounded-lg px-3 py-2.5 text-sm ${lang === "English" ? "bg-indigo-50 font-medium text-primary dark:bg-indigo-900/20 dark:text-indigo-400" : "hover:bg-muted dark:hover:bg-muted"}`}>
                  {lang}
                </button>
              ))}
            </div>
          </Drawer>
        </div>
      </ComponentPreview>

      <ComponentPreview id="drawer-calendar-export">
        <div className="flex w-full flex-wrap items-center justify-center gap-3">
          <button onClick={() => setOpen(0)} className={triggerBtn}>Calendar</button>
          <button onClick={() => setOpen(1)} className={triggerBtn}>Export</button>

          <Drawer open={open === 0} onClose={close} side="right" title="Calendar">
            <div className="mb-3 flex items-center justify-between">
              <button className="text-sm text-muted-foreground">&larr;</button>
              <span className="text-sm font-medium">January 2025</span>
              <button className="text-sm text-muted-foreground">&rarr;</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                <div key={d} className="py-1 font-medium text-muted-foreground">{d}</div>
              ))}
              {Array.from({ length: 31 }, (_, i) => (
                <button key={i} onClick={close} className={`rounded py-1.5 text-sm ${i + 1 === 15 ? "bg-primary text-primary-foreground" : "hover:bg-muted dark:hover:bg-muted"}`}>{i + 1}</button>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-1">
              {[
                { time: "09:00", event: "Standup" },
                { time: "11:00", event: "Design review" },
                { time: "14:00", event: "Sprint planning" },
              ].map((e) => (
                <div key={e.time} className="flex items-center gap-3 rounded-lg bg-muted/40 p-2 text-sm dark:bg-muted">
                  <span className="text-xs font-medium text-muted-foreground">{e.time}</span>
                  <span>{e.event}</span>
                </div>
              ))}
            </div>
          </Drawer>

          <Drawer open={open === 1} onClose={close} side="right" title="Export">
            <p className="mb-3 text-sm text-muted-foreground">Choose export format</p>
            <div className="flex flex-col gap-2">
              {[
                { fmt: "PDF", desc: "Document format" },
                { fmt: "CSV", desc: "Spreadsheet data" },
                { fmt: "JSON", desc: "Raw data format" },
                { fmt: "PNG", desc: "Image capture" },
              ].map((e) => (
                <label key={e.fmt} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 dark:border-border">
                  <input type="radio" name="export" className="accent-primary" />
                  <div>
                    <div className="text-sm font-medium">{e.fmt}</div>
                    <div className="text-xs text-muted-foreground">{e.desc}</div>
                  </div>
                </label>
              ))}
            </div>
            <button onClick={close} className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Export</button>
          </Drawer>
        </div>
      </ComponentPreview>

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
                <td className="px-4 py-3 font-mono text-xs">open</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onClose</td>
                <td className="px-4 py-3 text-muted-foreground">() =&gt; void</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">side</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;left&quot; | &quot;right&quot; | &quot;top&quot; | &quot;bottom&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;right&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot; | &quot;xl&quot; | &quot;full&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">title</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
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
