export const HEART_RATE_MONITOR_EXAMPLE = `<HeartbeatRenderer bpm={72} size={60} />

<div className="flex items-end gap-1 h-12">
  {history.map((h, i) => (
    <div
      key={i}
      className="flex-1 bg-red-500 rounded-t transition-all"
      style={{ height: \`\${((h - 50) / 60) * 100}%\`, opacity: 0.4 + (i / history.length) * 0.6 }}
    />
  ))}
</div>`;

export const WORKOUT_TRACKER_EXAMPLE = `<button className="w-full rounded-lg px-4 py-2 text-xs font-medium bg-zinc-900 text-white">
  Start Workout
</button>

<div className="grid grid-cols-3 gap-3">
  <div className="rounded-lg bg-red-50 p-3 text-center">
    <Heart className="h-4 w-4 text-red-500 mx-auto mb-1" />
    <p className="text-lg font-extrabold">142</p>
    <p className="text-[10px] text-zinc-500">BPM</p>
  </div>
</div>`;

export const HEALTH_DASHBOARD_EXAMPLE = `<div className="grid grid-cols-2 gap-3">
  {vitals.map((v) => (
    <div key={v.label} className="rounded-lg bg-zinc-50 p-3">
      <div className="flex items-center gap-2 mb-2">
        <v.icon className={\`h-4 w-4 \${v.color}\`} />
        <span className="text-[10px] text-zinc-500">{v.label}</span>
      </div>
      <p className="text-xl font-extrabold">{v.value}</p>
    </div>
  ))}
</div>`;

export const ECG_VISUALIZATION_EXAMPLE = `<div className="relative h-24 overflow-hidden rounded-lg bg-zinc-950">
  <svg viewBox="0 0 200 100" className="h-full w-full">
    <path d={generatePath()} fill="none" stroke="#22c55e" strokeWidth="1.5" />
  </svg>
</div>`;

export const PATIENT_STATUS_EXAMPLE = `<div className="space-y-2">
  {patients.map((p) => (
    <div key={p.name} className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3">
      <HeartbeatRenderer bpm={p.bpm} size={40} />
      <div className="flex-1">
        <p className="text-xs font-bold">{p.name}</p>
        <p className="text-[10px] text-zinc-500">{p.bpm} BPM</p>
      </div>
      <span className="rounded-full px-2 py-0.5 text-[10px] font-medium capitalize bg-emerald-100 text-emerald-700">
        {p.status}
      </span>
    </div>
  ))}
</div>`;

export const SLEEP_TRACKER_EXAMPLE = `<div className="mb-4 flex h-6 overflow-hidden rounded-full">
  <div className="bg-indigo-500 rounded-l-full" style={{ width: "27%" }} />
  <div className="bg-blue-400" style={{ width: "53%" }} />
  <div className="bg-purple-400 rounded-r-full" style={{ width: "20%" }} />
</div>

<div className="grid grid-cols-3 gap-2 text-center">
  <div>
    <p className="text-sm font-bold">2h</p>
    <p className="text-[10px] text-indigo-500">Deep</p>
  </div>
</div>`;

export const CALORIE_BURN_EXAMPLE = `<div className="relative h-16 w-16">
  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-200" />
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-orange-500" strokeDasharray="125.5 251" strokeLinecap="round" />
  </svg>
  <div className="absolute inset-0 flex items-center justify-center">
    <Flame className="h-6 w-6 text-orange-500" />
  </div>
</div>`;

export const PLAYGROUND_EXAMPLE = `<HeartbeatRenderer bpm={72} size={48} />

<button className="w-full rounded-lg px-4 py-2 text-xs font-medium bg-zinc-900 text-white">
  Start Workout
</button>`;
