export const THERMOSTAT_EXAMPLE = `<HeaterControl value={22} />`;

export const ROOM_TEMPERATURES_EXAMPLE = `<div className="grid grid-cols-2 gap-2">
  {rooms.map((r) => (
    <button key={r.id} className="rounded-lg border border-zinc-200 p-3 text-left">
      <span className="text-xl">{r.icon}</span>
      <p className="text-[10px] text-zinc-500">{r.name}</p>
      <p className="text-lg font-extrabold">{r.temp}°</p>
    </button>
  ))}
</div>`;

export const SCHEDULE_TIMER_EXAMPLE = `<div className="space-y-2">
  {schedule.map((s) => (
    <div key={s.time} className="flex items-center gap-3 rounded-lg bg-zinc-50 px-3 py-2">
      <span className="font-mono text-sm font-bold">{s.time}</span>
      <p className="flex-1 text-xs font-medium">{s.label}</p>
      <span className="text-xs font-bold">{s.temp}°</span>
    </div>
  ))}
</div>`;

export const ENERGY_USAGE_EXAMPLE = `<div className="mb-4 grid grid-cols-3 gap-3">
  <div className="rounded-lg bg-zinc-50 p-3 text-center">
    <p className="text-xl font-extrabold">{data.kwh}</p>
    <p className="text-[10px] text-zinc-500">kWh</p>
  </div>
</div>`;

export const QUICK_PRESETS_EXAMPLE = `<div className="grid grid-cols-2 gap-2">
  {presets.map((p) => (
    <button key={p.id} className="rounded-lg border border-zinc-200 p-4 text-left">
      <span className="text-2xl">{p.icon}</span>
      <p className="mt-2 text-sm font-bold">{p.name}</p>
      <p className="text-lg font-extrabold">{p.temp}°C</p>
    </button>
  ))}
</div>`;

export const HEATING_ZONES_EXAMPLE = `<div className="space-y-2">
  {zones.map((z) => (
    <button key={z.id} className="flex w-full items-center gap-3 rounded-lg border border-zinc-200 p-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white">
        <Thermometer className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-bold">{z.name}</p>
        <p className="text-[10px] text-zinc-500">{z.temp}°C target</p>
      </div>
      <span className="text-[10px] font-medium">{z.active ? "ON" : "OFF"}</span>
    </button>
  ))}
</div>`;

export const CLIMATE_HISTORY_EXAMPLE = `<div className="flex h-24 items-end gap-0.5">
  {hours.map((h, i) => (
    <div key={i} className="flex-1 flex flex-col items-center">
      <div className="w-full rounded-t bg-zinc-900" style={{ height: \`\${((h.temp - 15) / 15) * 100}%\` }} />
    </div>
  ))}
</div>`;

export const PLAYGROUND_EXAMPLE = `<HeaterControl value={22} min={10} max={40} />`;
