export const PRESET_EXAMPLE = `<DropletColor
  value={selected}
  onChange={setSelected}
  className="mx-auto"
/>

// Preset swatches are a radio group:
// ← → ↑ ↓, Home and End move between swatches`;

export const HSL_EXAMPLE = `const [hue, setHue] = useState(200);
const [sat, setSat] = useState(80);
const [light, setLight] = useState(50);

<input
  type="range"
  min={0}
  max={360}
  value={hue}
  aria-label="Hue channel"
  onChange={(e) => setHue(Number(e.target.value))}
  style={{
    background: "linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)",
  }}
  className="h-2 w-full cursor-pointer appearance-none rounded-full"
/>`;

export const BRAND_EXAMPLE = `<Swatches
  size="sm"
  colors={BRAND_PRESETS.primary}
  value={brand.primary}
  onValueChange={(c) => setBrand({ ...brand, primary: c })}
  ariaLabel="Primary color"
/>`;

export const THEME_EXAMPLE = `<input
  type="color"
  value={theme.primary}
  onChange={(e) => setTheme({ ...theme, primary: e.target.value })}
  aria-label="Primary color"
  className="h-7 w-9 cursor-pointer appearance-none rounded-md border border-border bg-transparent p-0.5
    [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded-sm [&::-webkit-color-swatch]:border-0
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
/>`;

export const GRADIENT_EXAMPLE = `<div
  className="h-24 rounded-xl border border-border shadow-xs transition-[background] duration-300"
  style={{ background: \`linear-gradient(\${angle}deg, \${colors.join(", ")})\` }}
/>`;

export const PALETTE_EXAMPLE = `const shades = generateShades(baseColor);

<button onClick={() => copyColor(shade.hex)} aria-label={\`Copy shade \${shade.weight}\`}>
  <span style={{ backgroundColor: shade.hex }} />
  <span>{shade.weight}</span>
  <span>{shade.hex}</span>
</button>`;

export const OPACITY_EXAMPLE = `<div className="relative h-20 w-44 overflow-hidden rounded-xl border border-border">
  <div className="absolute inset-0" style={{ backgroundImage: checker }} />
  <div
    className="absolute inset-0 transition-opacity duration-200"
    style={{ backgroundColor: color, opacity: opacity / 100 }}
  />
</div>

<span className="font-mono text-xs tabular-nums">{opacity}%</span>`;

export const PLAYGROUND_EXAMPLE = `const [value, setValue] = useState("#3b82f6");
const [compact, setCompact] = useState(false);

<DropletColor
  value={value}
  onChange={setValue}
  presets={compact ? COMPACT_PRESETS : undefined}
/>`;
