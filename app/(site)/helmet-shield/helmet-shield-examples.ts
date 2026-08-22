export const SECURITY_STATUS_EXAMPLE = `<HelmetShield status="protected" />

<div className="flex gap-2">
  {["protected", "warning", "danger"].map((l) => (
    <button className="flex-1 rounded-lg px-3 py-2 text-xs font-medium">
      {l}
    </button>
  ))}
</div>`;

export const FIREWALL_MONITOR_EXAMPLE = `<div className="grid grid-cols-3 gap-3">
  {stats.map((s) => (
    <div key={s.label} className="rounded-lg bg-zinc-50 p-3 text-center">
      <p className="text-lg font-extrabold">{s.value}</p>
      <p className="text-[10px] text-zinc-500">{s.label}</p>
    </div>
  ))}
</div>`;

export const ANTIVIRUS_DASHBOARD_EXAMPLE = `<div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
  <CheckCircle className="h-10 w-10 text-emerald-500" />
</div>
<button className="w-full rounded-lg px-4 py-2 text-xs font-medium bg-zinc-900 text-white">
  Start Scan
</button>`;

export const PASSWORD_STRENGTH_EXAMPLE = `<div className="flex gap-1 mb-2">
  {[1, 2, 3, 4].map((i) => (
    <div key={i} className={\`h-1.5 flex-1 rounded-full \${
      i <= strength.score ? strength.color : "bg-zinc-200"
    }\`} />
  ))}
</div>
<p className="text-[10px] font-medium">{strength.label}</p>`;

export const VPN_STATUS_EXAMPLE = `<div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
  <ShieldCheck className="h-10 w-10 text-emerald-500" />
</div>
<button className="w-full rounded-lg px-4 py-2 text-xs font-medium bg-red-100 text-red-700">
  Disconnect
</button>`;

export const BREACH_ALERTS_EXAMPLE = `<div className="space-y-2">
  {alerts.map((a) => (
    <div key={a.id} className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3">
      <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-red-100 text-red-700">
        {a.type}
      </span>
      <p className="text-xs font-medium">{a.message}</p>
    </div>
  ))}
</div>`;

export const COMPLIANCE_SCORE_EXAMPLE = `<div className="relative h-24 w-24">
  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-200" />
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-900" strokeDasharray="218 251" strokeLinecap="round" />
  </svg>
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-2xl font-extrabold">87%</span>
  </div>
</div>`;

export const PLAYGROUND_EXAMPLE = `<HelmetShield status="protected" />`;
