"use client"

import { useState, useCallback, useEffect } from "react"

let nextId = 0

type ToastType = "success" | "error" | "warning" | "info" | "loading"
type Position = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"

interface Toast {
  id: number; type: ToastType; message: string; action?: { label: string; onClick: () => void }; duration: number
}

const positionStyles: Record<Position, string> = {
  "top-right": "top-4 right-4", "top-left": "top-4 left-4",
  "bottom-right": "bottom-4 right-4", "bottom-left": "bottom-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2", "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
}

const toastColors: Record<ToastType, string> = {
  success: "bg-success text-success-foreground",
  error: "bg-danger text-danger-foreground",
  warning: "bg-warning text-warning-foreground",
  info: "bg-primary text-primary-foreground",
  loading: "bg-zinc-800 text-white dark:bg-muted dark:text-black",
}

const toastIcons: Record<ToastType, string> = {
  success: "✓", error: "✕", warning: "!", info: "i", loading: "⟳",
}

export default function ToastPage() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [position, setPosition] = useState<Position>("bottom-right")

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const add = useCallback((type: ToastType, message?: string, action?: { label: string; onClick: () => void }, dur?: number) => {
    const id = nextId++
    const defaults: Record<ToastType, string> = {
      success: "Saved successfully!", error: "Something went wrong.", warning: "Please check your input.", info: "Here is some information.", loading: "Loading...",
    }
    const d = dur ?? 3000
    const t: Toast = { id, type, message: message || defaults[type], action, duration: d }
    setToasts((prev) => [...prev, t])
    if (type !== "loading") setTimeout(() => remove(id), d)
  }, [remove])

  const bulkAdd = useCallback((n: number) => {
    const types: ToastType[] = ["success", "info", "warning", "error"]
    for (let i = 0; i < n; i++) add(types[i % 4], `Toast ${nextId} - ${types[i % 4]} notification`)
  }, [add])

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Toast</h1>
        <p className="mt-1 text-muted-foreground">Toast notifications with types, positions, actions, and auto-dismiss.</p>
      </div>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Types</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => add("success")} className="rounded-lg bg-success px-4 py-2 text-sm font-medium text-success-foreground hover:bg-success/90">Success</button>
          <button onClick={() => add("error")} className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-danger-foreground hover:bg-danger/90">Error</button>
          <button onClick={() => add("warning")} className="rounded-lg bg-warning px-4 py-2 text-sm font-medium text-warning-foreground hover:bg-warning">Warning</button>
          <button onClick={() => add("info")} className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Info</button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Positions</h2>
        <div className="flex flex-wrap gap-2">
          {(["top-right", "top-left", "bottom-right", "bottom-left", "top-center", "bottom-center"] as Position[]).map((p) => (
            <button
              key={p}
              onClick={() => setPosition(p)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium ${position === p ? "border-zinc-900 bg-foreground text-background dark:border-border dark:bg-muted dark:text-zinc-900" : "border-border hover:bg-muted dark:border-border dark:hover:bg-muted"}`}
            >
              {p}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">With Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => add("info", "File uploaded", { label: "Undo", onClick: () => alert("Undone!") })} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">Undo Action</button>
          <button onClick={() => add("success", "Changes saved", { label: "View", onClick: () => alert("Viewed!") })} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">View Action</button>
          <button onClick={() => add("warning", "Update available", { label: "Update", onClick: () => alert("Updating!") })} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">Update Action</button>
          <button onClick={() => add("error", "Upload failed", { label: "Retry", onClick: () => alert("Retrying!") })} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">Retry Action</button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Duration Variants</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => add("info", "Short (1s)", undefined, 1000)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">1s</button>
          <button onClick={() => add("info", "Default (3s)", undefined, 3000)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">3s</button>
          <button onClick={() => add("info", "Long (6s)", undefined, 6000)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">6s</button>
          <button onClick={() => add("info", "Sticky (10s)", undefined, 10000)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">10s</button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Loading Toast</h2>
        <button
          onClick={() => {
            const id = nextId
            add("loading", "Processing...", undefined, 99999)
            setTimeout(() => remove(id), 2000)
          }}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border"
        >
          Show Loading (2s)
        </button>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Batch / Stacking</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => bulkAdd(3)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">Add 3</button>
          <button onClick={() => bulkAdd(5)} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">Add 5</button>
          <button onClick={() => { for (let i = 0; i < 10; i++) setTimeout(() => add("success", `Toast ${nextId}`), i * 200) }} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">Queue 10</button>
          <button onClick={() => setToasts([])} className="rounded-lg bg-danger px-4 py-2 text-sm font-medium text-danger-foreground hover:bg-danger/90">Clear All</button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Custom Messages</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => add("success", "Profile updated successfully")} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">Profile</button>
          <button onClick={() => add("error", "Network request failed")} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">Network</button>
          <button onClick={() => add("warning", "Session will expire in 5 minutes")} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">Session</button>
          <button onClick={() => add("info", "New version 4.2.1 is available")} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">Version</button>
          <button onClick={() => add("success", "$49.00 payment received")} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">Payment</button>
          <button onClick={() => add("warning", "Disk space is running low (12% remaining)")} className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border">Disk</button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Compound Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => add("info", "2 files exported", { label: "Download", onClick: () => alert("Downloading...") })}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border"
          >
            Export
          </button>
          <button
            onClick={() => add("success", "Team member added", { label: "Invite more", onClick: () => alert("Opening invite...") })}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border"
          >
            Team
          </button>
          <button
            onClick={() => add("warning", "Subscription expiring", { label: "Renew", onClick: () => alert("Opening billing...") })}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border"
          >
            Subscription
          </button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Rich Content</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => add("success", "✓ Task completed — 4/5 remaining")}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border"
          >
            Task Progress
          </button>
          <button
            onClick={() => add("info", "👋 Welcome back, Jane! You have 3 notifications.")}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border"
          >
            Welcome
          </button>
          <button
            onClick={() => add("warning", "⚠️ Your trial ends in 3 days. Upgrade to keep access.")}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border"
          >
            Trial
          </button>
          <button
            onClick={() => add("error", "✕ Failed to connect. Check your internet and try again.")}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border"
          >
            Connection
          </button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">Use Case Scenarios</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Saved", msg: "Document saved as draft", type: "success" as ToastType },
            { label: "Deleted", msg: "Item moved to trash", type: "info" as ToastType, action: { label: "Undo", onClick: () => alert("Restored!") } },
            { label: "Copied", msg: "Link copied to clipboard", type: "success" as ToastType },
            { label: "Offline", msg: "You are offline. Changes will sync when reconnected.", type: "warning" as ToastType },
            { label: "Uploaded", msg: "3 files uploaded to /projects", type: "success" as ToastType },
            { label: "Reminder", msg: "Meeting with Design team in 15 minutes", type: "info" as ToastType },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => add(item.type, item.msg, "action" in item ? item.action : undefined)}
              className="rounded-xl border border-border p-4 text-left transition-colors hover:bg-muted/40 dark:border-border dark:hover:bg-muted/50"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium dark:bg-muted">{item.label.charAt(0)}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <span className="mt-1 text-xs text-muted-foreground">{item.msg}</span>
            </button>
          ))}
        </div>
      </section>

      {toasts.length > 0 && (
        <>
          <div className={`fixed z-50 flex flex-col gap-2 ${positionStyles[position]}`}>
            {toasts.map((t) => (
              <div
                key={t.id}
                className={`flex items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all duration-300 ${toastColors[t.type]} min-w-[280px] max-w-[380px]`}
              >
                <div className="flex items-center gap-2">
                  {t.type === "loading" && (
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  )}
                  <span>{t.message}</span>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {t.action && (
                    <button
                      onClick={() => { t.action!.onClick(); remove(t.id) }}
                      className="whitespace-nowrap rounded bg-white/20 px-2 py-0.5 text-xs font-semibold hover:bg-white/30"
                    >
                      {t.action.label}
                    </button>
                  )}
                  <button onClick={() => remove(t.id)} className="text-white/70 hover:text-white">&times;</button>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setToasts([])}
            className="fixed bottom-4 left-4 z-50 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium shadow-lg hover:bg-muted dark:border-border dark:bg-zinc-900 dark:hover:bg-muted"
          >
            Clear All ({toasts.length})
          </button>
        </>
      )}
    </div>
  )
}
