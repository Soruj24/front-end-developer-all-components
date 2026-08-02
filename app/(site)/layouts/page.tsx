"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/preview";

export default function LayoutsPage() {
  const [sidebarTab, setSidebarTab] = useState("Overview");
  const [overlayOpen, setOverlayOpen] = useState(true);
  const [wizardStep, setWizardStep] = useState(2);
  const [profileTab, setProfileTab] = useState("Posts");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Layouts</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of page layout patterns — from simple sidebars and
          headers to app shells, wizards, and overlays. Use the tabs to switch
          between the live preview, source code, CLI, installation, and
          dependency details for each example.
        </p>
      </header>

      <ComponentPreview id="layout-sidebar-main">
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-48 w-full overflow-hidden rounded-lg border border-border">
            <div className="flex w-16 flex-col gap-1 border-r border-black/[.08] bg-muted/40 p-2 dark:border-white/[.145] dark:bg-black">
              {["⌂", "📊", "⚙"].map((icon, i) => (
                <button key={i} className={`flex h-7 items-center justify-center rounded-md text-xs ${i === 0 ? "bg-muted" : "text-muted-foreground/70"}`}>{icon}</button>
              ))}
              <button className="mt-auto flex h-7 items-center justify-center rounded-md text-xs text-muted-foreground/70">👤</button>
            </div>
            <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Main Content</div>
          </div>
          <div className="flex h-48 w-full overflow-hidden rounded-lg border border-border">
            <div className="flex w-20 flex-col gap-1 border-r border-black/[.08] bg-muted/40 p-2 dark:border-white/[.145] dark:bg-black">
              {["Dashboard", "Analytics", "Reports", "Settings"].map((item, i) => (
                <button key={i} className={`rounded px-2 py-1 text-left text-[10px] ${i === 0 ? "bg-muted font-medium dark:bg-muted" : "text-muted-foreground/70"}`}>{item}</button>
              ))}
            </div>
            <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Content</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-header-content">
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-border">
            <div className="flex h-9 items-center justify-between border-b border-black/[.08] bg-white px-3 dark:border-white/[.145] dark:bg-black">
              <span className="text-xs font-bold">Brand</span>
              <div className="flex gap-3 text-[10px] text-muted-foreground">
                <span>Home</span>
                <span>About</span>
                <span>Contact</span>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center bg-muted/40 text-[10px] text-zinc-300 dark:bg-zinc-900">Content</div>
          </div>
          <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-border">
            <div className="flex h-8 items-center justify-between border-b border-black/[.08] bg-white px-3 text-[10px] font-bold dark:border-white/[.145] dark:bg-black">
              <span>App</span>
              <div className="flex gap-3 text-[10px] font-normal text-muted-foreground">
                <span className="text-foreground">Home</span>
                <span>Products</span>
              </div>
            </div>
            <div className="flex flex-1 gap-2 bg-muted/40 p-2 dark:bg-zinc-900">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-1 items-center justify-center rounded-md bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Item {i}</div>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-stacked-sidebar">
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-border">
            <div className="flex h-8 items-center justify-between border-b border-black/[.08] bg-white px-3 dark:border-white/[.145] dark:bg-black">
              <span className="text-[10px] font-bold">Top Bar</span>
              <span className="text-[10px] text-muted-foreground/70">🔔</span>
            </div>
            <div className="flex flex-1">
              <div className="flex w-14 flex-col gap-1 border-r border-black/[.08] bg-muted/40 p-2 dark:border-white/[.145] dark:bg-black">
                {["⌂", "📊", "⚙"].map((icon, i) => (
                  <button key={i} className={`flex h-7 items-center justify-center rounded-md text-xs ${i === 0 ? "bg-muted" : "text-muted-foreground/70"}`}>{icon}</button>
                ))}
              </div>
              <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Content</div>
            </div>
          </div>
          <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-border">
            <div className="flex h-7 items-center justify-between border-b border-black/[.08] bg-white px-3 text-[10px] font-bold dark:border-white/[.145] dark:bg-black">
              <span>Header</span>
              <div className="flex gap-2 font-normal text-muted-foreground/70">
                <span>🔍</span>
                <span>🔔</span>
              </div>
            </div>
            <div className="flex flex-1">
              <div className="flex w-12 flex-col gap-1 border-r border-black/[.08] bg-muted/40 p-1.5 dark:border-white/[.145] dark:bg-black">
                {["⌂", "📊", "📝", "⚙"].map((icon, i) => (
                  <button key={i} className={`flex h-6 items-center justify-center rounded text-xs ${i === 0 ? "bg-muted" : "text-muted-foreground/70"}`}>{icon}</button>
                ))}
              </div>
              <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Content</div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-three-column">
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-48 w-full overflow-hidden rounded-lg border border-border">
            <div className="flex w-16 flex-col gap-1 border-r border-black/[.08] bg-muted/40 p-2 dark:border-white/[.145] dark:bg-black">
              {["⌂", "📊", "⚙"].map((icon, i) => (
                <button key={i} className={`flex h-7 items-center justify-center rounded-md text-xs ${i === 0 ? "bg-muted" : "text-muted-foreground/70"}`}>{icon}</button>
              ))}
            </div>
            <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Main</div>
            <div className="flex w-20 flex-col border-l border-black/[.08] bg-muted/40 p-2 text-[10px] text-muted-foreground/70 dark:border-white/[.145] dark:bg-black">
              <span className="font-medium text-muted-foreground">Details</span>
              <span className="mt-2">Info</span>
              <span>Activity</span>
            </div>
          </div>
          <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-border">
            <div className="flex h-7 items-center justify-between border-b border-black/[.08] bg-white px-3 text-[10px] font-bold dark:border-white/[.145] dark:bg-black">
              <span>App</span>
              <span className="font-normal text-muted-foreground/70">🔔</span>
            </div>
            <div className="flex flex-1">
              <div className="flex w-12 flex-col gap-1 border-r border-black/[.08] bg-muted/40 p-1.5 dark:border-white/[.145] dark:bg-black">
                {["⌂", "📊", "📝", "⚙"].map((icon, i) => (
                  <button key={i} className={`flex h-6 items-center justify-center rounded text-xs ${i === 0 ? "bg-muted" : "text-muted-foreground/70"}`}>{icon}</button>
                ))}
              </div>
              <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Main</div>
              <div className="flex w-16 flex-col border-l border-black/[.08] bg-muted/40 p-2 text-[10px] text-muted-foreground/70 dark:border-white/[.145] dark:bg-black">
                <span className="font-medium text-muted-foreground">Chat</span>
                <div className="mt-1 rounded bg-muted p-1 text-[8px] dark:bg-muted">Hey!</div>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-centered-hero">
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-border">
            <div className="flex h-8 items-center justify-center border-b border-black/[.08] bg-white px-3 dark:border-white/[.145] dark:bg-black">
              <span className="text-[10px] font-bold">Centered Layout</span>
            </div>
            <div className="flex flex-1 items-start justify-center bg-muted/40 p-4 dark:bg-zinc-900">
              <div className="h-full w-full max-w-[70%] rounded-md border border-dashed border-border bg-white p-3 dark:border-border dark:bg-zinc-950">
                <div className="h-2 w-1/3 rounded bg-muted" />
                <div className="mt-2 h-2 w-1/2 rounded bg-muted dark:bg-muted" />
              </div>
            </div>
          </div>
          <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-border">
            <div className="flex h-16 items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <div className="text-center">
                <div className="text-xs font-bold">Hero Section</div>
                <div className="mt-1 text-[10px] text-white/70">Full-width background</div>
              </div>
            </div>
            <div className="flex flex-1 items-start justify-center bg-white p-3 dark:bg-zinc-950">
              <div className="h-full w-full max-w-[80%]">
                <div className="h-2 w-2/3 rounded bg-muted" />
                <div className="mt-2 h-2 w-1/3 rounded bg-muted dark:bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-holy-grail">
        <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-border">
          <div className="flex h-7 items-center justify-between border-b border-black/[.08] bg-white px-3 text-[10px] font-bold dark:border-white/[.145] dark:bg-black">
            <span>Header</span>
            <span className="text-muted-foreground/70">Nav</span>
          </div>
          <div className="flex flex-1">
            <div className="flex w-12 items-center justify-center border-r border-black/[.08] bg-muted/40 text-[10px] text-muted-foreground/70 dark:border-white/[.145] dark:bg-black">SB</div>
            <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Main</div>
          </div>
          <div className="flex h-6 items-center justify-center border-t border-black/[.08] bg-muted text-[10px] text-muted-foreground/70 dark:border-white/[.145] dark:bg-zinc-900">Footer</div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-split">
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-48 w-full overflow-hidden rounded-lg border border-border">
            <div className="flex w-1/2 items-center justify-center border-r border-black/[.08] bg-blue-50 text-[10px] text-blue-400 dark:border-white/[.145] dark:bg-blue-950">Content</div>
            <div className="flex w-1/2 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Sidebar</div>
          </div>
          <div className="flex h-48 w-full overflow-hidden rounded-lg border border-border">
            <div className="flex w-1/2 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-[10px] text-white/70">Image</div>
            <div className="flex w-1/2 flex-col justify-center gap-2 bg-white p-4 dark:bg-zinc-950">
              <div className="h-2 w-3/4 rounded bg-muted" />
              <div className="h-2 w-1/2 rounded bg-muted dark:bg-muted" />
              <div className="mt-2 h-5 w-1/3 rounded bg-foreground" />
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-card-grid">
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-48 w-full flex-col gap-2 overflow-hidden rounded-lg border border-black/[.08] bg-white p-3 dark:border-white/[.145] dark:bg-zinc-950">
            <div className="grid h-full grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-center rounded-md border border-black/[.08] bg-muted/40 text-[10px] text-zinc-300 dark:border-white/[.145] dark:bg-black">Card {i}</div>
              ))}
            </div>
          </div>
          <div className="flex h-48 w-full flex-col gap-2 overflow-hidden rounded-lg border border-black/[.08] bg-muted/40 p-3 dark:border-white/[.145] dark:bg-black">
            <div className="flex gap-2">
              {["Revenue", "Users", "Orders"].map((label) => (
                <div key={label} className="flex flex-1 flex-col gap-1 rounded-md bg-white p-2 dark:bg-zinc-950">
                  <span className="text-[8px] text-muted-foreground/70">{label}</span>
                  <span className="text-xs font-bold">$—</span>
                </div>
              ))}
            </div>
            <div className="flex flex-1 items-center justify-center rounded-md bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Chart Area</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-sticky-footer">
        <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-border">
          <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Content</div>
          <div className="flex h-7 items-center justify-center border-t border-black/[.08] bg-muted text-[10px] text-muted-foreground/70 dark:border-white/[.145] dark:bg-zinc-900">© 2026 Company</div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-right-panel">
        <div className="flex w-full flex-col gap-4">
          <div className="flex h-48 w-full overflow-hidden rounded-lg border border-border">
            <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Main Content</div>
            <div className="flex w-24 flex-col gap-2 border-l border-black/[.08] bg-muted/40 p-3 text-[10px] dark:border-white/[.145] dark:bg-black">
              <span className="font-medium text-muted-foreground">Details</span>
              <div className="h-2 rounded bg-muted" />
              <div className="h-2 w-2/3 rounded bg-muted" />
              <div className="h-2 rounded bg-muted" />
              <button className="mt-auto rounded bg-foreground py-1 text-[10px] text-background">Action</button>
            </div>
          </div>
          <div className="flex h-48 w-full overflow-hidden rounded-lg border border-border">
            <div className="flex w-24 flex-col gap-0.5 border-r border-black/[.08] bg-muted/40 p-2 text-[10px] dark:border-white/[.145] dark:bg-black">
              {["General", "Appearance", "Notifications", "Privacy"].map((item, i) => (
                <button key={i} className={`rounded px-2 py-1 text-left ${i === 0 ? "bg-muted font-medium dark:bg-muted" : "text-muted-foreground/70"}`}>{item}</button>
              ))}
            </div>
            <div className="flex flex-1 flex-col gap-2 bg-white p-3 dark:bg-zinc-950">
              <span className="text-xs font-medium">General Settings</span>
              <div className="h-2 w-1/2 rounded bg-muted" />
              <div className="h-2 w-1/3 rounded bg-muted dark:bg-muted" />
              <div className="mt-auto flex gap-2 self-end">
                <div className="h-5 w-14 rounded bg-muted" />
                <div className="h-5 w-14 rounded bg-foreground" />
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-masonry">
        <div className="flex h-48 w-full gap-2 overflow-hidden rounded-lg border border-black/[.08] bg-muted/40 p-3 dark:border-white/[.145] dark:bg-black">
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-1 items-center justify-center rounded-md bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Tall</div>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex h-1/3 items-center justify-center rounded-md bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Short</div>
            <div className="flex flex-1 items-center justify-center rounded-md bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Tall</div>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-1 items-center justify-center rounded-md bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Tall</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-sidebar-tabs">
        <div className="flex h-48 w-full overflow-hidden rounded-lg border border-border">
          <div className="flex w-14 flex-col gap-1 border-r border-black/[.08] bg-muted/40 p-2 dark:border-white/[.145] dark:bg-black">
            {["⌂", "📊", "⚙"].map((icon, i) => (
              <button key={i} className={`flex h-7 items-center justify-center rounded-md text-xs ${i === 0 ? "bg-muted" : "text-muted-foreground/70"}`}>{icon}</button>
            ))}
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex gap-0 border-b border-black/[.08] bg-white px-2 dark:border-white/[.145] dark:bg-black">
              {["Overview", "Details", "Activity"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSidebarTab(t)}
                  className={`px-2 py-1.5 text-[10px] font-medium transition-colors ${sidebarTab === t ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70"}`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">{sidebarTab}</div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-overlay-sidebar">
        <div className="relative flex h-48 w-full overflow-hidden rounded-lg border border-border">
          <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">
            <button onClick={() => setOverlayOpen(!overlayOpen)} className="rounded bg-foreground px-2 py-1 text-[10px] text-background">{overlayOpen ? "Close" : "Open"}</button>
          </div>
          {overlayOpen && (
            <>
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute right-0 top-0 flex h-full w-20 flex-col gap-1 bg-white p-2 shadow-lg dark:bg-zinc-950">
                <button onClick={() => setOverlayOpen(false)} className="self-end text-xs text-muted-foreground/70">✕</button>
                <span className="text-[10px] font-medium">Panel</span>
                <span className="text-[10px] text-muted-foreground/70">Details</span>
              </div>
            </>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-minimal-blog">
        <div className="flex h-48 w-full flex-col items-center overflow-hidden rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-zinc-950">
          <div className="flex h-full w-3/4 flex-col justify-center gap-2">
            <div className="h-2 w-1/4 rounded bg-muted dark:bg-muted" />
            <div className="h-2 w-3/4 rounded bg-muted" />
            <div className="h-2 w-1/2 rounded bg-muted dark:bg-muted" />
            <div className="h-2 w-full rounded bg-muted dark:bg-muted" />
            <div className="h-2 w-2/3 rounded bg-muted dark:bg-muted" />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-modal-sheet">
        <div className="flex w-full flex-col gap-4">
          <div className="relative flex h-48 w-full overflow-hidden rounded-lg border border-border">
            <div className="flex flex-1 items-center justify-center bg-muted/40 text-[10px] text-zinc-300 dark:bg-zinc-900">Page Content</div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="flex w-2/3 flex-col gap-2 rounded-lg bg-white p-4 shadow-lg dark:bg-zinc-950">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">Modal Title</span>
                  <span className="text-xs text-muted-foreground/70">✕</span>
                </div>
                <div className="h-2 w-full rounded bg-muted dark:bg-muted" />
                <div className="h-2 w-2/3 rounded bg-muted dark:bg-muted" />
                <div className="flex gap-2 self-end">
                  <div className="h-5 w-12 rounded bg-muted" />
                  <div className="h-5 w-12 rounded bg-foreground" />
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex h-48 w-full overflow-hidden rounded-lg border border-border">
            <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Content</div>
            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1.5 border-t border-black/[.08] bg-white p-3 dark:border-white/[.145] dark:bg-zinc-950">
              <div className="mx-auto h-1 w-8 rounded-full bg-muted dark:bg-muted" />
              <span className="text-xs font-medium">Bottom Sheet</span>
              <div className="h-2 w-full rounded bg-muted dark:bg-muted" />
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-wizard">
        <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-zinc-950">
          <div className="flex items-center justify-center gap-2 border-b border-black/[.08] px-3 py-2 dark:border-white/[.145]">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-1">
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium ${s <= wizardStep ? "bg-foreground text-background" : "border border-border text-muted-foreground/70 dark:border-border"}`}>{s}</span>
                {s < 3 && <div className={`h-0.5 w-6 ${s < wizardStep ? "bg-foreground" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col justify-center gap-2 px-4">
            <span className="text-xs font-medium">Step {wizardStep} of 3</span>
            <div className="h-2 w-3/4 rounded bg-muted dark:bg-muted" />
            <div className="h-2 w-1/2 rounded bg-muted dark:bg-muted" />
            <div className="mt-auto flex items-center justify-between pb-2">
              <button onClick={() => setWizardStep(Math.max(1, wizardStep - 1))} className="rounded border border-black/[.08] px-3 py-1 text-[10px] dark:border-white/[.145]">Back</button>
              <button onClick={() => setWizardStep(Math.min(3, wizardStep + 1))} className="rounded bg-foreground px-3 py-1 text-[10px] text-background">Next</button>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-terminal">
        <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg bg-zinc-900">
          <div className="flex h-7 items-center gap-1.5 border-b border-zinc-700 px-3">
            <span className="h-2 w-2 rounded-full bg-danger" />
            <span className="h-2 w-2 rounded-full bg-yellow-500" />
            <span className="h-2 w-2 rounded-full bg-success" />
            <span className="ml-3 text-[10px] text-muted-foreground">terminal</span>
          </div>
          <div className="flex flex-1 items-center justify-center text-[10px] text-success/30">~ $</div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-email-client">
        <div className="flex h-48 w-full overflow-hidden rounded-lg border border-border">
          <div className="flex w-16 flex-col gap-0.5 border-r border-black/[.08] bg-muted/40 p-2 text-[10px] dark:border-white/[.145] dark:bg-black">
            {["Inbox", "Sent", "Drafts", "Trash"].map((f, i) => (
              <button key={i} className={`rounded px-1 py-1 text-left ${i === 0 ? "bg-muted font-medium dark:bg-muted" : "text-muted-foreground/70"}`}>{f[0]}</button>
            ))}
          </div>
          <div className="flex w-24 flex-col border-r border-border">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`border-b border-black/[.08] px-2 py-1.5 ${i === 1 ? "bg-blue-50 dark:bg-blue-950" : ""} dark:border-white/[.145]`}>
                <div className="text-[9px] font-medium">Subject {i}</div>
                <div className="text-[8px] text-muted-foreground/70">Preview...</div>
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">Email Content</div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-kanban">
        <div className="flex h-48 w-full gap-2 overflow-hidden rounded-lg border border-black/[.08] bg-muted/40 p-2 dark:border-white/[.145] dark:bg-black">
          {["To Do", "In Progress", "Done"].map((col) => (
            <div key={col} className="flex flex-1 flex-col gap-1.5 rounded-md bg-white p-2 dark:bg-zinc-950">
              <span className="text-[10px] font-medium text-muted-foreground">{col}</span>
              {[1, 2].map((card) => (
                <div key={card} className="rounded-md border border-black/[.08] p-1.5 text-[8px] text-muted-foreground/70 dark:border-white/[.145]">
                  Task {card}
                </div>
              ))}
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-profile">
        <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-border">
          <div className="flex items-center gap-3 border-b border-black/[.08] bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm">👤</span>
            <div>
              <div className="text-xs font-bold">Alex Rivera</div>
              <div className="text-[10px] text-white/70">@alexriv</div>
            </div>
          </div>
          <div className="flex gap-0 border-b border-black/[.08] bg-white px-3 dark:border-white/[.145] dark:bg-black">
            {["Posts", "Photos", "About"].map((t) => (
              <button
                key={t}
                onClick={() => setProfileTab(t)}
                className={`px-3 py-1.5 text-[10px] font-medium ${profileTab === t ? "border-b-2 border-zinc-950 text-foreground dark:border-zinc-50 dark:text-foreground" : "text-muted-foreground/70"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex flex-1 items-center justify-center bg-white text-[10px] text-zinc-300 dark:bg-zinc-950">{profileTab}</div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-mobile-chat">
        <div className="flex w-full flex-col gap-4">
          <div className="mx-auto flex h-48 w-36 flex-col overflow-hidden rounded-xl border border-border">
            <div className="flex h-6 items-center justify-between border-b border-black/[.08] bg-white px-2 dark:border-white/[.145] dark:bg-black">
              <span className="text-[8px] font-bold">App</span>
              <span className="text-[8px] text-muted-foreground/70">☰</span>
            </div>
            <div className="flex flex-1 flex-col gap-1 bg-muted/40 p-2 dark:bg-zinc-900">
              {["Item 1", "Item 2", "Item 3"].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 rounded bg-white px-1.5 py-1 text-[7px] text-muted-foreground dark:bg-zinc-950">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="flex h-48 w-full overflow-hidden rounded-lg border border-border">
            <div className="flex w-20 flex-col border-r border-black/[.08] bg-muted/40 dark:border-white/[.145] dark:bg-black">
              <div className="border-b border-black/[.08] p-2 text-[10px] font-bold dark:border-white/[.145]">Chats</div>
              {["Alice", "Bob", "Carol"].map((name, i) => (
                <div key={name} className={`flex items-center gap-1.5 border-b border-black/[.08] px-2 py-1.5 ${i === 0 ? "bg-white dark:bg-zinc-950" : ""} dark:border-white/[.145]`}>
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-muted text-[7px] dark:bg-muted">{name[0]}</span>
                  <span className="text-[9px]">{name}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-1 flex-col bg-white dark:bg-zinc-950">
              <div className="flex items-center justify-between border-b border-black/[.08] px-3 py-1.5 dark:border-white/[.145]">
                <span className="text-[10px] font-medium">Alice</span>
                <span className="text-[8px] text-muted-foreground/70">⋮</span>
              </div>
              <div className="flex flex-1 items-center justify-center text-[10px] text-zinc-300">
                <div className="rounded-lg bg-primary-soft px-2 py-1 text-[9px] text-primary dark:bg-blue-900 dark:text-blue-300">Hey there!</div>
              </div>
              <div className="flex gap-1 border-t border-black/[.08] p-2 dark:border-white/[.145]">
                <div className="flex-1 rounded-md bg-muted px-2 py-1 text-[8px] text-muted-foreground/70 dark:bg-muted">Type...</div>
                <div className="rounded bg-foreground px-2 py-1 text-[8px] text-background">Send</div>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-empty-state">
        <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-border">
          <div className="flex h-7 items-center justify-between border-b border-black/[.08] bg-white px-3 dark:border-white/[.145] dark:bg-black">
            <span className="text-[10px] font-bold">Inbox</span>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-1 bg-muted/40 dark:bg-zinc-900">
            <span className="text-lg text-zinc-300">📭</span>
            <span className="text-xs text-muted-foreground/70">No messages yet</span>
            <span className="text-[10px] text-zinc-300">Get started by sending your first message</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="layout-loading-skeleton">
        <div className="flex h-48 w-full flex-col overflow-hidden rounded-lg border border-black/[.08] bg-white dark:border-white/[.145] dark:bg-zinc-950">
          <div className="flex h-7 items-center gap-2 border-b border-black/[.08] px-3 dark:border-white/[.145]">
            <div className="h-3 w-3 animate-pulse rounded bg-muted" />
            <div className="h-2 w-20 animate-pulse rounded bg-muted" />
          </div>
          <div className="flex flex-1 flex-col gap-2 p-3">
            <div className="h-2 w-3/4 animate-pulse rounded bg-muted dark:bg-muted" />
            <div className="h-2 w-1/2 animate-pulse rounded bg-muted dark:bg-muted" />
            <div className="h-2 w-2/3 animate-pulse rounded bg-muted dark:bg-muted" />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
