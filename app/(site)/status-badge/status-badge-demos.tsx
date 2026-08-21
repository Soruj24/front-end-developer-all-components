"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { StatusVariant } from "@/components/ui/StatusBadge";
import { Loader2, Rocket } from "lucide-react";

const statuses: { key: StatusVariant; label: string }[] = [
  { key: "active", label: "Active" },
  { key: "warning", label: "Away" },
  { key: "error", label: "Offline" },
  { key: "info", label: "Pending" },
  { key: "neutral", label: "Draft" },
];

const users = [
  { name: "Sarah Chen", role: "Admin", status: "active" as const, avatar: "SC" },
  { name: "Marcus Johnson", role: "Editor", status: "active" as const, avatar: "MJ" },
  { name: "Aria Patel", role: "Viewer", status: "warning" as const, avatar: "AP" },
  { name: "Tom Wilson", role: "Contributor", status: "error" as const, avatar: "TW" },
  { name: "Luna Kim", role: "Admin", status: "info" as const, avatar: "LK" },
];

export function BasicBadgesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {statuses.map((s) => (
        <StatusBadge key={s.key} status={s.key} label={s.label} />
      ))}
    </div>
  );
}

export function AnimatedBadgesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <StatusBadge status="active" label="Live" animated />
      <StatusBadge status="error" label="Recording" animated />
      <StatusBadge status="warning" label="Processing" animated />
      <StatusBadge status="info" label="Streaming" animated />
    </div>
  );
}

export function SizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <StatusBadge status="active" label="Small" size="sm" />
      <StatusBadge status="active" label="Medium" size="md" />
      <StatusBadge status="active" label="Large" size="lg" />
    </div>
  );
}

export function CustomIconDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <StatusBadge status="active" label="Deployed" icon={<Rocket className="h-3.5 w-3.5" />} />
      <StatusBadge status="warning" label="Pending Review" />
      <StatusBadge status="info" label="Processing" animated />
    </div>
  );
}

export function UserListDemo() {
  return (
    <div className="flex w-full flex-col gap-2">
      {users.map((user) => (
        <div key={user.name} className="flex items-center justify-between rounded-lg border border-border/60 bg-background px-4 py-3 transition-colors hover:bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {user.avatar}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>
          <StatusBadge status={user.status} label={user.status} size="sm" />
        </div>
      ))}
    </div>
  );
}

export function InteractiveDemo() {
  const [selectedStatus, setSelectedStatus] = useState<StatusVariant>("active");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1.5">
        {statuses.map((s) => (
          <button
            key={s.key}
            onClick={() => setSelectedStatus(s.key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              selectedStatus === s.key
                ? "bg-foreground text-background shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 rounded-lg border border-border/60 bg-background p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
          JD
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">John Doe</p>
          <p className="text-xs text-muted-foreground">john@example.com</p>
        </div>
        <StatusBadge status={selectedStatus} label={statuses.find((s) => s.key === selectedStatus)!.label} />
      </div>
    </div>
  );
}

export function DotOnlyDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {statuses.map((s) => (
        <div key={s.key} className="flex items-center gap-2">
          <StatusBadge status={s.key} label={s.label} dotOnly />
          <span className="text-sm text-muted-foreground">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
