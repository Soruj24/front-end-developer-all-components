export const WHEEL_EXAMPLE = `const [value, setValue] = useState(2);

<AperturePicker defaultValue={value} />

// The wheel is a keyboard-accessible radio group:
// ArrowLeft / ArrowRight / ArrowUp / ArrowDown / Home / End`;

export const SLIDER_EXAMPLE = `const [value, setValue] = useState(2);

<input
  type="range"
  min={0}
  max={apertureStops.length - 1}
  step={1}
  value={value}
  onChange={(e) => setValue(Number(e.target.value))}
  aria-label="Aperture"
  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary outline-none"
/>`;

export const GRID_EXAMPLE = `<div role="radiogroup" aria-label="Aperture" className="grid grid-cols-3 gap-3">
  {apertureStops.map((stop, i) => (
    <button
      key={stop.fStop}
      type="button"
      role="radio"
      aria-checked={i === value}
      onClick={() => setValue(i)}
      className={\`rounded-xl border p-4 transition-all duration-200 ease-out active:scale-[0.97]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring \${
        i === value
          ? "border-primary/30 bg-primary/5 shadow-sm"
          : "border-border bg-surface hover:border-input hover:shadow-xs"
      }\`}
    >
      {stop.fStop}
    </button>
  ))}
</div>`;

export const DOF_EXAMPLE = `<div
  className="overflow-hidden rounded-xl border border-border"
  style={{ filter: \`blur(\${blur}px)\` }}
>
  <Camera />
</div>

<span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-xs font-medium tabular-nums">
  {data.fStop} · {data.dof}
</span>`;

export const PANEL_EXAMPLE = `const [apertureIdx, setApertureIdx] = useState(2);
const [shutterIdx, setShutterIdx] = useState(4);
const [iso, setIso] = useState(400);

<CameraSettingsPanel />`;

export const COMPACT_EXAMPLE = `const [value, setValue] = useState(2);

<button
  type="button"
  aria-label="Decrease aperture"
  onClick={() => setValue(Math.max(0, value - 1))}
  className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground
    transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
>
  <Minus />
</button>
<span className="w-14 text-center text-sm font-semibold tabular-nums">
  {apertureStops[value].fStop}
</span>
<button
  type="button"
  aria-label="Increase aperture"
  onClick={() => setValue(Math.min(apertureStops.length - 1, value + 1))}
  className="..."
>
  <Plus />
</button>`;

export const EXPOSURE_EXAMPLE = `const [value, setValue] = useState(2);

<div className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success-soft px-2.5 py-0.5 text-[11px] font-medium text-success">
  <Eye />
  Proper exposure
</div>

<ExposurePanel
  aperture={apertureStops[value]}
  shutterSpeed="1/125"
  iso={400}
/>`;

export const PLAYGROUND_EXAMPLE = `const [mode, setMode] = useState<"wheel" | "slider" | "grid">("wheel");
const [value, setValue] = useState(2);
const [showDetails, setShowDetails] = useState(true);

{mode === "wheel" && <AperturePicker defaultValue={value} />}
{mode === "slider" && <SliderPicker value={value} onChange={setValue} />}
{mode === "grid" && <GridPicker value={value} onChange={setValue} />} `;
