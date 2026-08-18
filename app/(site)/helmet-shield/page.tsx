"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Key,
  Fingerprint,
  Server,
  Wifi,
  ShieldOff,
} from "lucide-react";

const installCommand = `npx component-library@latest add helmet-shield`;
const usageCode = `import { HelmetShield } from "@/components/helmet-shield";

<HelmetShield status="protected" />`;

function SecurityStatusDemo() {
  const [level, setLevel] = useState<"protected" | "warning" | "danger">("protected");
  const levels = {
    protected: { icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/20", label: "Fully Protected" },
    warning: { icon: ShieldAlert, color: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/20", label: "At Risk" },
    danger: { icon: ShieldX, color: "text-red-500", bg: "bg-red-50 dark:bg-red-950/20", label: "Vulnerable" },
  };

  return (
    <div className="w-full max-w-sm">
      <div className={`rounded-xl border p-5 dark:border-white/[.145] ${levels[level].bg}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm">
            {(() => { const Icon = levels[level].icon; return <Icon className={`h-6 w-6 ${levels[level].color}`} />; })()}
          </div>
          <div>
            <p className="text-lg font-extrabold">{levels[level].label}</p>
            <p className="text-xs text-muted-foreground">System status</p>
          </div>
        </div>
        <div className="flex gap-2">
          {(Object.keys(levels) as Array<keyof typeof levels>).map((l) => (
            <button key={l} onClick={() => setLevel(l)} className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${level === l ? "bg-foreground text-background" : "bg-background/50 text-muted-foreground hover:bg-background"}`}>
              {levels[l].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function FirewallMonitorDemo() {
  const [active, setActive] = useState(true);
  const stats = [
    { label: "Blocked Today", value: "1,247", change: "+12%" },
    { label: "Active Rules", value: "89", change: "" },
    { label: "Uptime", value: "99.9%", change: "" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Firewall Monitor</h3>
            <button onClick={() => setActive(!active)} className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-medium ${active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400"}`}>
              {active ? "Active" : "Disabled"}
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-3 mb-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-muted/30 p-3 text-center">
                <p className="text-lg font-extrabold">{s.value}</p>
                <p className="text-[9px] text-muted-foreground">{s.label}</p>
                {s.change && <p className="text-[9px] text-red-500">{s.change}</p>}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {[
              { ip: "192.168.1.45", action: "Blocked", threat: "Port Scan" },
              { ip: "10.0.0.123", action: "Allowed", threat: "None" },
              { ip: "172.16.0.89", action: "Blocked", threat: "Brute Force" },
            ].map((r) => (
              <div key={r.ip} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
                <Server className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10px] font-mono">{r.ip}</span>
                <span className={`text-[9px] font-medium ${r.action === "Blocked" ? "text-red-500" : "text-emerald-500"}`}>{r.action}</span>
                <span className="text-[9px] text-muted-foreground ml-auto">{r.threat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AntivirusDashboardDemo() {
  const [scanning, setScanning] = useState(false);
  const [threats, setThreats] = useState(0);

  const startScan = () => {
    setScanning(true);
    setThreats(0);
    setTimeout(() => {
      setScanning(false);
      setThreats(Math.floor(Math.random() * 5));
    }, 3000);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Antivirus</h3>
          </div>
        </div>
        <div className="p-4 text-center">
          <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${scanning ? "bg-primary/10 animate-pulse" : threats === 0 ? "bg-emerald-100 dark:bg-emerald-950/30" : "bg-red-100 dark:bg-red-950/30"}`}>
            {scanning ? <Shield className="h-10 w-10 text-primary animate-spin" /> : threats === 0 ? <CheckCircle className="h-10 w-10 text-emerald-500" /> : <AlertTriangle className="h-10 w-10 text-red-500" />}
          </div>
          <p className="text-sm font-bold">{scanning ? "Scanning..." : threats === 0 ? "System Clean" : `${threats} Threats Found`}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{scanning ? "Please wait" : "Last scan: 2 hours ago"}</p>
          <button onClick={startScan} disabled={scanning} className={`mt-4 w-full rounded-lg px-4 py-2 text-xs font-medium ${scanning ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-foreground text-background hover:bg-foreground/90"}`}>
            {scanning ? "Scanning..." : "Start Scan"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PasswordStrengthDemo() {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const getStrength = (p: string) => {
    if (p.length === 0) return { score: 0, label: "Enter password", color: "bg-muted" };
    if (p.length < 6) return { score: 1, label: "Weak", color: "bg-red-500" };
    if (p.length < 10) return { score: 2, label: "Fair", color: "bg-yellow-500" };
    if (/[A-Z]/.test(p) && /[0-9]/.test(p) && /[^A-Za-z0-9]/.test(p)) return { score: 4, label: "Strong", color: "bg-emerald-500" };
    return { score: 3, label: "Good", color: "bg-blue-500" };
  };

  const strength = getStrength(password);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm p-4 dark:border-white/[.145]">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">Password Strength</h3>
        </div>
        <div className="relative mb-3">
          <input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" className="w-full rounded-lg border border-black/[.08] bg-background px-3 py-2 pr-10 text-xs dark:border-white/[.145]" />
          <button onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {show ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
          </button>
        </div>
        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= strength.score ? strength.color : "bg-muted"}`} />
          ))}
        </div>
        <p className={`text-[10px] font-medium ${strength.score >= 3 ? "text-emerald-500" : strength.score >= 2 ? "text-yellow-500" : "text-red-500"}`}>{strength.label}</p>
        <div className="mt-3 space-y-1">
          {["At least 8 characters", "Uppercase & lowercase", "Numbers & symbols"].map((req) => (
            <div key={req} className="flex items-center gap-2 text-[9px] text-muted-foreground">
              <div className={`h-1.5 w-1.5 rounded-full ${password.length > 6 && req.includes("8") || /[A-Z]/.test(password) && req.includes("Uppercase") || /[0-9]/.test(password) && req.includes("Numbers") ? "bg-emerald-500" : "bg-muted"}`} />
              {req}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VpnStatusDemo() {
  const [connected, setConnected] = useState(false);
  const [server, setServer] = useState("US-East");

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Wifi className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">VPN Status</h3>
          </div>
        </div>
        <div className="p-4 text-center">
          <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${connected ? "bg-emerald-100 dark:bg-emerald-950/30" : "bg-muted"}`}>
            {connected ? <ShieldCheck className="h-10 w-10 text-emerald-500" /> : <ShieldOff className="h-10 w-10 text-muted-foreground" />}
          </div>
          <p className="text-sm font-bold">{connected ? "Connected" : "Disconnected"}</p>
          <p className="text-[10px] text-muted-foreground mt-1">{connected ? `Server: ${server}` : "Not protected"}</p>
          {connected && (
            <div className="flex justify-center gap-4 mt-3 text-[9px] text-muted-foreground">
              <span>IP: 198.51.100.42</span>
              <span>Ping: 24ms</span>
            </div>
          )}
          <button onClick={() => setConnected(!connected)} className={`mt-4 w-full rounded-lg px-4 py-2 text-xs font-medium ${connected ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950/30 dark:text-red-400" : "bg-foreground text-background hover:bg-foreground/90"}`}>
            {connected ? "Disconnect" : "Connect"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BreachAlertsDemo() {
  const alerts = [
    { id: 1, type: "Critical", message: "Unauthorized access attempt", time: "2 min ago", status: "open" },
    { id: 2, type: "Warning", message: "Suspicious login location", time: "15 min ago", status: "investigating" },
    { id: 3, type: "Info", message: "Password change completed", time: "1 hr ago", status: "resolved" },
  ];
  const typeColors = {
    Critical: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400",
    Warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/30 dark:text-yellow-400",
    Info: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400",
  };
  const statusIcons = {
    open: <XCircle className="h-3 w-3 text-red-500" />,
    investigating: <AlertTriangle className="h-3 w-3 text-yellow-500" />,
    resolved: <CheckCircle className="h-3 w-3 text-emerald-500" />,
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Breach Alerts</h3>
            <span className="ml-auto text-[10px] text-muted-foreground">{alerts.length} alerts</span>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {alerts.map((a) => (
            <div key={a.id} className="flex items-center gap-3 rounded-lg border border-black/[.08] p-3 dark:border-white/[.145]">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${typeColors[a.type as keyof typeof typeColors]}`}>{a.type}</span>
                  <span className="text-[9px] text-muted-foreground">{a.time}</span>
                </div>
                <p className="text-xs font-medium mt-1">{a.message}</p>
              </div>
              <div className="flex items-center gap-1">
                {statusIcons[a.status as keyof typeof statusIcons]}
                <span className="text-[10px] capitalize text-muted-foreground">{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ComplianceScoreDemo() {
  const [score, setScore] = useState(87);
  const categories = [
    { name: "Data Encryption", score: 95, status: "pass" },
    { name: "Access Control", score: 82, status: "pass" },
    { name: "Network Security", score: 78, status: "warning" },
    { name: "Audit Logging", score: 90, status: "pass" },
  ];

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Fingerprint className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Compliance Score</h3>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-center mb-4">
            <div className="relative h-24 w-24">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className={`stroke-primary`} strokeDasharray={`${score * 2.51} 251`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-extrabold">{score}%</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {categories.map((c) => (
              <div key={c.name} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-medium">{c.name}</span>
                    <span className="text-[9px] text-muted-foreground">{c.score}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${c.score >= 90 ? "bg-emerald-500" : c.score >= 80 ? "bg-yellow-500" : "bg-red-500"}`} style={{ width: `${c.score}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HelmetShieldPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Helmet Shield</h1>
          <Badge variant="primary">Feedback</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">A helmet shield component for safety feedback and protection status indicators.</p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Security Status</h3>
          <p className="text-sm text-muted-foreground">Protection level indicator.</p>
          <ComponentPreview id="shield-status"><SecurityStatusDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Firewall Monitor</h3>
          <p className="text-sm text-muted-foreground">Network security dashboard.</p>
          <ComponentPreview id="shield-firewall"><FirewallMonitorDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Antivirus Dashboard</h3>
          <p className="text-sm text-muted-foreground">Threat detection with scan.</p>
          <ComponentPreview id="shield-antivirus"><AntivirusDashboardDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Password Strength</h3>
          <p className="text-sm text-muted-foreground">Password security indicator.</p>
          <ComponentPreview id="shield-password"><PasswordStrengthDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">VPN Status</h3>
          <p className="text-sm text-muted-foreground">Connection security display.</p>
          <ComponentPreview id="shield-vpn"><VpnStatusDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Breach Alerts</h3>
          <p className="text-sm text-muted-foreground">Security incident log.</p>
          <ComponentPreview id="shield-breach"><BreachAlertsDemo /></ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Compliance Score</h3>
          <p className="text-sm text-muted-foreground">Security rating display.</p>
          <ComponentPreview id="shield-compliance"><ComplianceScoreDemo /></ComponentPreview>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead><tr className="border-b bg-muted/50"><th className="px-4 py-3 text-left font-medium">Prop</th><th className="px-4 py-3 text-left font-medium">Type</th><th className="px-4 py-3 text-left font-medium">Default</th><th className="px-4 py-3 text-left font-medium">Required</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">status</td><td className="px-4 py-3 text-muted-foreground">{"\"protected\" | \"warning\" | \"danger\""}</td><td className="px-4 py-3 text-muted-foreground">{"\"protected\""}</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
