"use client";

import { useState } from "react";
import { QuickNav } from "@/components/ui/QuickNav";
import type { QuickNavItem } from "@/components/ui/QuickNav";
import { Search, Home, Settings, User, FileText, LayoutDashboard, Bell, Mail, Calendar, Star, Command } from "lucide-react";

const navItems: QuickNavItem[] = [
  { id: "home", label: "Home", shortcut: "⌘H", section: "Navigation", icon: <Home className="h-4 w-4" /> },
  { id: "dashboard", label: "Dashboard", shortcut: "⌘D", section: "Navigation", icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: "documents", label: "Documents", shortcut: "⌘F", section: "Navigation", icon: <FileText className="h-4 w-4" /> },
  { id: "profile", label: "Profile", shortcut: "⌘U", section: "Account", icon: <User className="h-4 w-4" /> },
  { id: "settings", label: "Settings", shortcut: "⌘,", section: "Account", icon: <Settings className="h-4 w-4" /> },
  { id: "notifications", label: "Notifications", shortcut: "⌘N", section: "Account", icon: <Bell className="h-4 w-4" /> },
  { id: "messages", label: "Messages", shortcut: "⌘M", section: "Account", icon: <Mail className="h-4 w-4" /> },
  { id: "calendar", label: "Calendar", shortcut: "⌘K", section: "Tools", icon: <Calendar className="h-4 w-4" /> },
  { id: "favorites", label: "Favorites", section: "Tools", icon: <Star className="h-4 w-4" /> },
];

function TriggerButton({ onClick, label, shortcut }: { onClick: () => void; label: string; shortcut: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <Search className="h-4 w-4 shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      <kbd className="shrink-0 rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60">
        {shortcut}
      </kbd>
    </button>
  );
}

export function DefaultDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <TriggerButton onClick={() => setOpen(true)} label="Search commands..." shortcut="⌘K" />
      <QuickNav open={open} onClose={() => setOpen(false)} items={navItems} />
    </div>
  );
}

export function CompactDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <TriggerButton onClick={() => setOpen(true)} label="Quick search..." shortcut="⌘K" />
      <QuickNav open={open} onClose={() => setOpen(false)} items={navItems} variant="compact" />
    </div>
  );
}

export function FlatDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <TriggerButton onClick={() => setOpen(true)} label="Jump to..." shortcut="⌘J" />
      <QuickNav open={open} onClose={() => setOpen(false)} items={navItems} variant="flat" />
    </div>
  );
}

export function ActionsDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-lg border border-border/60 bg-background px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:border-border hover:bg-muted/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
      >
        <Command className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">Type a command...</span>
        <kbd className="shrink-0 rounded-md border border-border/60 bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground/60">⌘/</kbd>
      </button>
      <QuickNav
        open={open}
        onClose={() => setOpen(false)}
        items={navItems.slice(0, 5)}
        footer={<span className="text-xs">Press ⌘/ to toggle</span>}
      />
    </div>
  );
}
