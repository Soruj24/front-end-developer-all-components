import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const drawerNotificationsProfile: RegistryEntry = entry({
    id: "drawer-notifications-profile",
    title: "Notifications & Profile",
    description: "A notification feed and a user profile card with account actions.",
    source: `import { useState } from "react";

const SIZES = {
  sm: "w-80",
  md: "w-[400px]",
  lg: "w-[500px]",
  xl: "w-[640px]",
  full: "w-full max-w-2xl",
};

const SIDE_CONFIG = {
  left: { enter: "translate-x-0", exit: "-translate-x-full", style: "left-0 top-0 bottom-0", border: "border-r" },
  right: { enter: "translate-x-0", exit: "translate-x-full", style: "right-0 top-0 bottom-0", border: "border-l" },
  top: { enter: "translate-y-0", exit: "-translate-y-full", style: "top-0 left-0 right-0 h-auto max-h-[60vh]", border: "border-b" },
  bottom: { enter: "translate-y-0", exit: "translate-y-full", style: "bottom-0 left-0 right-0 h-auto max-h-[60vh]", border: "border-t" },
};

function Drawer({ open, onClose, side = "right", size = "md", title, children }) {
  const cfg = SIDE_CONFIG[side];
  return (
    <>
      <div
        className={\`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-200 \${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }\`}
        onClick={onClose}
      />
      <div
        className={\`fixed z-50 bg-white shadow-xl transition-all duration-200 ease-in-out dark:bg-zinc-900 \${
          SIZES[size] || SIZES.md
        } \${cfg.style} \${cfg.border} border-zinc-200 dark:border-zinc-700 overflow-y-auto \${
          open ? cfg.enter : cfg.exit
        }\`}
      >
        <div className="flex items-center justify-between p-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          <button onClick={onClose} className="ml-auto rounded p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800">
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

export default function DrawerNotificationsProfile() {
  const [open, setOpen] = useState(null);
  const notifs = [
    { icon: "!", title: "Server alert", time: "2m ago", color: "text-danger bg-red-100 dark:bg-red-900/30" },
    { icon: "$", title: "Payment received", time: "15m ago", color: "text-success bg-green-100 dark:bg-green-900/30" },
    { icon: "U", title: "Update available", time: "1h ago", color: "text-blue-500 bg-primary-soft dark:bg-blue-900/30" },
    { icon: "M", title: "New message", time: "2h ago", color: "text-indigo-500 bg-indigo-100 dark:bg-indigo-900/30" },
    { icon: "T", title: "Task completed", time: "3h ago", color: "text-warning bg-amber-100 dark:bg-amber-900/30" },
    { icon: "+", title: "New follower", time: "5h ago", color: "text-purple-500 bg-purple-100 dark:bg-purple-900/30" },
  ];

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <button onClick={() => setOpen(0)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Notifications</button>
      <button onClick={() => setOpen(1)} className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">Profile</button>

      <Drawer open={open === 0} onClose={() => setOpen(null)} side="right" title="Notifications">
        <div className="flex flex-col gap-2">
          {notifs.map((n) => (
            <div key={n.title} className="flex items-start gap-3 rounded-lg p-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
              <div className={\`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold \${n.color}\`}>{n.icon}</div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{n.title}</div>
                <div className="text-xs text-zinc-500">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => setOpen(null)} className="mt-4 w-full rounded-lg border border-zinc-300 py-2 text-sm font-medium dark:border-zinc-700">Mark all read</button>
      </Drawer>

      <Drawer open={open === 1} onClose={() => setOpen(null)} side="right" title="Profile">
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-primary dark:bg-indigo-900/30 dark:text-indigo-400">JD</div>
          <div className="mt-3 text-lg font-semibold">Jane Doe</div>
          <div className="text-sm text-zinc-500">jane@example.com</div>
          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">Admin</span>
            <span className="rounded-full bg-primary-soft px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-blue-900/30 dark:text-blue-400">Pro</span>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-1">
          {["Edit Profile", "Account Settings", "Billing", "Sign Out"].map((a) => (
            <button key={a} onClick={() => setOpen(null)} className="rounded-lg px-3 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">{a}</button>
          ))}
        </div>
      </Drawer>
    </div>
  );
}`,
  });
