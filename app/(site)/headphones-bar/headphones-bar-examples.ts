export const VOLUME_CONTROL_EXAMPLE = `<HeadphonesBar volume={50} />`;

export const MUSIC_PLAYER_EXAMPLE = `<div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
  <p className="text-sm font-semibold">Midnight Dreams</p>
  <p className="text-[11px] text-zinc-500">Luna Wave</p>
  <div className="mt-3 flex items-center justify-center gap-4">
    <SkipBack className="h-5 w-5 text-zinc-400" />
    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-white">
      <Play className="ml-0.5 h-5 w-5" />
    </button>
    <SkipForward className="h-5 w-5 text-zinc-400" />
  </div>
</div>`;

export const AUDIO_VISUALIZER_EXAMPLE = `<div className="flex items-end justify-center gap-1 h-24">
  {bars.map((h, i) => (
    <div
      key={i}
      className="w-2 rounded-t bg-zinc-900 transition-all duration-150"
      style={{ height: \`\${h * 4}px\`, opacity: 0.5 + (h / 22) * 0.5 }}
    />
  ))}
</div>`;

export const EQUALIZER_EXAMPLE = `<div className="flex items-end justify-between gap-3 h-32">
  {bands.map((val, i) => (
    <div key={i} className="flex flex-col items-center gap-1 flex-1">
      <span className="font-mono text-[10px] text-zinc-500">{val}</span>
      <input
        type="range"
        min={0}
        max={100}
        value={val}
        className="h-20 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900"
        style={{ writingMode: "vertical-lr", direction: "rtl" }}
      />
    </div>
  ))}
</div>`;

export const PODCAST_PLAYER_EXAMPLE = `<div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
  <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
    <Mic className="h-5 w-5 text-zinc-600" />
    <p className="text-xs font-semibold">Design Systems</p>
    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900 text-white">
      <Play className="ml-0.5 h-4 w-4" />
    </button>
  </div>
</div>`;

export const SOUND_SETTINGS_EXAMPLE = `<div className="space-y-2">
  {[
    { label: "Spatial Audio", active: true },
    { label: "Noise Cancellation", active: false },
  ].map((s) => (
    <button
      className={\`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all \${
        s.active ? "border-zinc-900 bg-zinc-50" : "border-zinc-200 hover:border-zinc-300"
      }\`}
    >
      <div className={\`h-5 w-5 rounded \${s.active ? "bg-zinc-900 text-white" : "border border-zinc-300"}\`} />
      <span className="text-xs font-semibold">{s.label}</span>
    </button>
  ))}
</div>`;

export const HEADPHONE_SELECTOR_EXAMPLE = `<div className="space-y-2">
  {devices.map((d) => (
    <button key={d.id} className="flex w-full items-center gap-3 rounded-lg border border-zinc-200 p-3 text-left">
      <span className="text-2xl">{d.icon}</span>
      <div className="flex-1">
        <p className="text-xs font-semibold">{d.name}</p>
        <p className="text-[10px] text-zinc-500">Battery: {d.battery}%</p>
      </div>
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-200">
        <div className="h-full rounded-full bg-emerald-500" style={{ width: \`\${d.battery}%\` }} />
      </div>
    </button>
  ))}
</div>`;

export const PLAYGROUND_EXAMPLE = `<HeadphonesBar volume={65} />`;
