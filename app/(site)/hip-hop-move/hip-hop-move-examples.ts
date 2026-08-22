export const DANCE_MOVE_SELECTOR_EXAMPLE = `<HipHopMove variant="bounce" size={100} />

<div className="grid grid-cols-2 gap-2">
  {moves.map((m) => (
    <button key={m.id} className="rounded-lg border border-zinc-200 p-3 text-left">
      <p className="text-xs font-bold">{m.name}</p>
      <p className="text-[10px] text-zinc-500">{m.desc}</p>
    </button>
  ))}
</div>`;

export const MUSIC_VISUALIZER_EXAMPLE = `<div className="flex h-20 items-end justify-center gap-1">
  {bars.map((h, i) => (
    <div key={i} className="w-3 rounded-t transition-all duration-150" style={{ height: \`\${h * 4}px\`, backgroundColor: \`hsl(\${280 + i * 5}, 70%, 50%)\` }} />
  ))}
</div>`;

export const DANCE_BATTLE_EXAMPLE = `<div className="flex items-center justify-between">
  <div className="text-center">
    <DanceMoveRenderer move="bounce" size={60} />
    <p className="text-xs font-bold mt-1">Player 1</p>
  </div>
  <div className="text-2xl font-extrabold text-zinc-300">VS</div>
  <div className="text-center">
    <DanceMoveRenderer move="wave" size={60} />
    <p className="text-xs font-bold mt-1">Player 2</p>
  </div>
</div>`;

export const STEP_SEQUENCER_EXAMPLE = `<div className="grid grid-cols-8 gap-1">
  {steps.map((active, i) => (
    <button key={i} className={\`aspect-square rounded-md transition-colors \${
      active ? "bg-zinc-900" : "bg-zinc-200"
    }\`} />
  ))}
</div>`;

export const CLUB_NIGHT_EXAMPLE = `<div className="relative h-32 bg-gradient-to-br from-purple-900 to-pink-900">
  <div className="absolute bottom-4 left-4">
    <p className="text-xl font-extrabold text-white">Hip Hop Night</p>
    <p className="text-xs text-white/70">Saturday · 10 PM - 4 AM</p>
  </div>
</div>`;

export const DJ_BOOTH_EXAMPLE = `<button className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-white">
  <Play className="h-6 w-6" />
</button>
<input type="range" min={0} max={100} value={75} className="w-full accent-zinc-900" />`;

export const DANCE_TUTORIAL_EXAMPLE = `<DanceMoveRenderer move="bounce" size={100} />

<div className="flex justify-center gap-1">
  {steps.map((_, i) => (
    <div key={i} className={\`h-1.5 w-8 rounded-full \${
      i <= step ? "bg-zinc-900" : "bg-zinc-200"
    }\`} />
  ))}
</div>`;

export const PLAYGROUND_EXAMPLE = `<HipHopMove variant="bounce" size={100} />`;
