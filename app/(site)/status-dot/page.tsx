"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import ComponentPreview from "@/components/preview";
import CodeBlock from "@/components/home/CodeBlock";
import { Circle, CheckCircle, XCircle, AlertCircle, Clock, Wifi, Signal } from "lucide-react";

const installCommand = "npx ui-add status-dot";
const usageCode = `import { StatusDot } from "@/components/ui/status-dot";

<StatusDot status="online" />
`;

function OnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">
          {isOnline && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          )}
          <span className={`relative inline-flex rounded-full h-3 w-3 ${
            isOnline ? "bg-green-500" : "bg-gray-400"
          }`} />
        </span>
        <span className="font-medium">{isOnline ? "Online" : "Offline"}</span>
      </div>
      <button
        onClick={() => setIsOnline(!isOnline)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Toggle Status
      </button>
    </div>
  );
}

function AwayStatus() {
  const [status, setStatus] = useState<"online" | "away" | "offline">("online");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3 p-4 rounded-xl border bg-card">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
          <Circle className={`h-5 w-5 ${
            status === "online"
              ? "text-green-500"
              : status === "away"
              ? "text-yellow-500"
              : "text-gray-400"
          }`} />
        </div>
        <div>
          <p className="font-medium">User Status</p>
          <p className="text-sm text-muted-foreground capitalize">{status}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {(["online", "away", "offline"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1 rounded text-sm transition-colors capitalize ${
              status === s
                ? s === "online"
                  ? "bg-green-500 text-white"
                  : s === "away"
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-500 text-white"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function BusyStatus() {
  const [isBusy, setIsBusy] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3 p-4 rounded-xl border bg-card">
        <span className="relative flex h-3 w-3">
          {isBusy && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          )}
          <span className={`relative inline-flex rounded-full h-3 w-3 ${
            isBusy ? "bg-red-500" : "bg-green-500"
          }`} />
        </span>
        <div>
          <p className="font-medium">{isBusy ? "Busy" : "Available"}</p>
          <p className="text-sm text-muted-foreground">
            {isBusy ? "Do not disturb" : "Ready to chat"}
          </p>
        </div>
      </div>
      <button
        onClick={() => setIsBusy(!isBusy)}
        className={`px-4 py-2 rounded-lg transition-colors ${
          isBusy
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {isBusy ? "Set Available" : "Set Busy"}
      </button>
    </div>
  );
}

function OfflineStatus() {
  const [lastSeen, setLastSeen] = useState("2 minutes ago");

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3 p-4 rounded-xl border bg-card">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
            <Circle className="h-5 w-5 text-gray-400" />
          </div>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-gray-400 border-2 border-card" />
        </div>
        <div>
          <p className="font-medium">Offline</p>
          <p className="text-sm text-muted-foreground">Last seen {lastSeen}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setLastSeen("just now")}
          className="px-3 py-1 rounded text-sm bg-muted text-muted-foreground hover:bg-accent"
        >
          Update
        </button>
        <button
          onClick={() => setLastSeen("5 minutes ago")}
          className="px-3 py-1 rounded text-sm bg-muted text-muted-foreground hover:bg-accent"
        >
          Simulate Offline
        </button>
      </div>
    </div>
  );
}

function StatusBadgeDemo() {
  const [status, setStatus] = useState<"online" | "away" | "busy" | "offline">("online");

  const statusConfig = {
    online: { color: "bg-green-500", label: "Online" },
    away: { color: "bg-yellow-500", label: "Away" },
    busy: { color: "bg-red-500", label: "Busy" },
    offline: { color: "bg-gray-400", label: "Offline" },
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Badge variant={status === "online" ? "default" : status === "busy" ? "destructive" : "secondary"}>
        <span className={`h-2 w-2 rounded-full ${statusConfig[status].color} mr-1.5`} />
        {statusConfig[status].label}
      </Badge>
      <div className="flex gap-2">
        {(["online", "away", "busy", "offline"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`px-3 py-1 rounded text-sm transition-colors capitalize ${
              status === s
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function StatusIndicator() {
  const [users, setUsers] = useState([
    { name: "Alice", status: "online" as const },
    { name: "Bob", status: "away" as const },
    { name: "Charlie", status: "offline" as const },
  ]);

  const cycleStatus = (index: number) => {
    setUsers((prev) =>
      prev.map((user, i) => {
        if (i !== index) return user;
        const nextStatus = user.status === "online" ? "away" : user.status === "away" ? "offline" : "online";
        return { ...user, status: nextStatus };
      })
    );
  };

  const statusColors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-gray-400",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="space-y-2">
        {users.map((user, i) => (
          <button
            key={user.name}
            onClick={() => cycleStatus(i)}
            className="flex items-center gap-3 w-full p-3 rounded-lg border hover:bg-accent transition-colors"
          >
            <span className="relative flex h-3 w-3">
              <span className={`relative inline-flex rounded-full h-3 w-3 ${statusColors[user.status]}`} />
            </span>
            <span className="font-medium">{user.name}</span>
            <span className="text-sm text-muted-foreground capitalize ml-auto">{user.status}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ConnectionStatus() {
  const [connection, setConnection] = useState<"connected" | "reconnecting" | "disconnected">("connected");

  const config = {
    connected: { icon: Wifi, color: "text-green-500", label: "Connected" },
    reconnecting: { icon: AlertCircle, color: "text-yellow-500", label: "Reconnecting..." },
    disconnected: { icon: XCircle, color: "text-red-500", label: "Disconnected" },
  };

  const Icon = config[connection].icon;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3 p-4 rounded-xl border bg-card">
        <Icon className={`h-5 w-5 ${config[connection].color}`} />
        <span className="font-medium">{config[connection].label}</span>
      </div>
      <div className="flex gap-2">
        {(["connected", "reconnecting", "disconnected"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setConnection(c)}
            className={`px-3 py-1 rounded text-sm transition-colors capitalize ${
              connection === c
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function StatusDotPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Status Dot</h1>
          <Badge variant="secondary">UI Component</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Visual indicators for online status, availability, and connection state.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Online Status</h3>
            <ComponentPreview>
              <OnlineStatus />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Away Status</h3>
            <ComponentPreview>
              <AwayStatus />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Busy Status</h3>
            <ComponentPreview>
              <BusyStatus />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Offline Status</h3>
            <ComponentPreview>
              <OfflineStatus />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Status Badge</h3>
            <ComponentPreview>
              <StatusBadgeDemo />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Status Indicator</h3>
            <ComponentPreview>
              <StatusIndicator />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Connection Status</h3>
            <ComponentPreview>
              <ConnectionStatus />
            </ComponentPreview>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Prop</th>
                <th className="text-left py-2 font-medium">Type</th>
                <th className="text-left py-2 font-medium">Default</th>
                <th className="text-left py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">status</td>
                <td className="py-2">"online" | "away" | "busy" | "offline"</td>
                <td className="py-2">"online"</td>
                <td className="py-2">Current status state</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">size</td>
                <td className="py-2">"sm" | "md" | "lg"</td>
                <td className="py-2">"md"</td>
                <td className="py-2">Size of the status dot</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">pulse</td>
                <td className="py-2">boolean</td>
                <td className="py-2">true</td>
                <td className="py-2">Enable pulse animation</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">showLabel</td>
                <td className="py-2">boolean</td>
                <td className="py-2">false</td>
                <td className="py-2">Display status text label</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
