export const QWERTY_LAYOUT_EXAMPLE = `<KeyboardLayout variant="full" />

<KeyboardLayout variant="full" highlightKeys={["Q", "W", "E", "R", "T"]} />`;

export const SHORTCUT_GUIDE_EXAMPLE = `<div className="grid grid-cols-2 gap-3">
  {shortcuts.map((s) => (
    <div key={s.action} className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-3 py-2">
      <span className="text-sm text-zinc-700">{s.action}</span>
      <div className="flex gap-1">
        {s.keys.map((k) => (
          <kbd key={k} className="rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px]">
            {k}
          </kbd>
        ))}
      </div>
    </div>
  ))}
</div>`;

export const GAMING_LAYOUT_EXAMPLE = `<div className="flex gap-1">
  <div className="w-10" />
  <KeyCap label="W" highlight />
</div>
<div className="flex gap-1">
  <KeyCap label="A" highlight />
  <KeyCap label="S" highlight />
  <KeyCap label="D" highlight />
</div>`;

export const MAC_LAYOUT_EXAMPLE = `<KeyboardLayout variant="mac" highlightKeys={["Cmd"]} />`;

export const TYPING_TUTOR_TUTOR_EXAMPLE = `<div className="flex flex-wrap gap-0.5 font-mono text-lg">
  {display.map((d, i) => (
    <span key={i} className={\`rounded px-0.5 \${
      d.state === "correct" ? "bg-emerald-100 text-emerald-700"
      : d.state === "wrong" ? "bg-red-100 text-red-700"
      : "text-zinc-400"
    }\`}>
      {d.char}
    </span>
  ))}
</div>`;

export const COMPACT_LAYOUT_EXAMPLE = `<KeyboardLayout variant="compact" />`;

export const KEY_STATISTICS_EXAMPLE = `<div className="space-y-2">
  {keys.map((k) => (
    <div key={k.key} className="flex items-center gap-2">
      <kbd className="flex h-7 w-10 items-center justify-center rounded-md border border-zinc-200 bg-zinc-100 font-mono text-[10px] font-bold">
        {k.key}
      </kbd>
      <div className="flex-1 overflow-hidden rounded-full bg-zinc-200">
        <div className={\`h-2 rounded-full \${k.color}\`} style={{ width: \`\${k.usage * 7}%\` }} />
      </div>
      <span className="w-10 text-right text-[10px] font-medium tabular-nums text-zinc-500">{k.usage}%</span>
    </div>
  ))}
</div>`;

export const PLAYGROUND_EXAMPLE = `<KeyboardLayout variant="full" highlightKeys={["W", "A", "S", "D"]} />`;
