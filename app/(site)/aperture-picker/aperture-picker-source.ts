export const APERTURE_PICKER_SOURCE = `"use client";

import { useState } from "react";

const apertureStops = [
  { fStop: "f/1.4", label: "1.4", ev: 0, dof: "Very Shallow" },
  { fStop: "f/2", label: "2", ev: 1, dof: "Very Shallow" },
  { fStop: "f/2.8", label: "2.8", ev: 2, dof: "Shallow" },
  { fStop: "f/4", label: "4", ev: 3, dof: "Shallow" },
  { fStop: "f/5.6", label: "5.6", ev: 4, dof: "Medium" },
  { fStop: "f/8", label: "8", ev: 5, dof: "Medium" },
  { fStop: "f/11", label: "11", ev: 6, dof: "Deep" },
  { fStop: "f/16", label: "16", ev: 7, dof: "Deep" },
  { fStop: "f/22", label: "22", ev: 8, dof: "Very Deep" },
];

interface AperturePickerProps {
  defaultValue?: number;
}

export function AperturePicker({ defaultValue = 2 }: AperturePickerProps) {
  const [value, setValue] = useState(defaultValue);
  const data = apertureStops[value];
  const angle = (value / (apertureStops.length - 1)) * 270 - 135;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-56 w-56">
        <div className="absolute inset-0 rounded-full border-[3px] border-border" />
        {apertureStops.map((stop, i) => {
          const a = (i / (apertureStops.length - 1)) * 270 - 135;
          const rad = (a * Math.PI) / 180;
          return (
            <button
              key={stop.fStop}
              onClick={() => setValue(i)}
              style={{ left: 112 + 90 * Math.cos(rad), top: 112 + 90 * Math.sin(rad) }}
              className={\`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-semibold transition-all \${
                i === value
                  ? "bg-foreground text-background scale-110 shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }\`}
            >
              {stop.label}
            </button>
          );
        })}
        <div
          className="absolute left-1/2 top-1/2 h-0.5 w-14 origin-bottom -translate-x-1/2 -translate-y-full rounded-full bg-foreground transition-transform"
          style={{ transform: \`translateX(-50%) rotate(\${angle}deg)\` }}
        />
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold tabular-nums">{data.fStop}</div>
        <div className="mt-1 text-sm text-muted-foreground">{data.dof} depth of field</div>
      </div>
    </div>
  );
}`;

export const WHEEL_EXAMPLE = `<AperturePicker defaultValue={2} />`;

export const SLIDER_EXAMPLE = `const [value, setValue] = useState(2);

<input
  type="range"
  min={0}
  max={apertureStops.length - 1}
  value={value}
  onChange={(e) => setValue(Number(e.target.value))}
/>`;

export const GRID_EXAMPLE = `const [value, setValue] = useState(2);

{apertureStops.map((stop, i) => (
  <button
    key={stop.fStop}
    onClick={() => setValue(i)}
    className={i === value ? "border-foreground bg-muted" : "border-border"}
  >
    {stop.fStop}
  </button>
))}`;

export const DOF_EXAMPLE = `<div style={{ filter: \`blur(\${blur}px)\` }}>
  <Camera />
</div>`;

export const PANEL_EXAMPLE = `const [apertureIdx, setApertureIdx] = useState(2);
const [shutterIdx, setShutterIdx] = useState(4);
const [iso, setIso] = useState(400);

<CameraSettingsPanel />`;

export const COMPACT_EXAMPLE = `const [value, setValue] = useState(2);

<button onClick={() => setValue(Math.max(0, value - 1))}>
  <Minus />
</button>
<span>{apertureStops[value].fStop}</span>
<button onClick={() => setValue(Math.min(apertureStops.length - 1, value + 1))}>
  <Plus />
</button>`;

export const EXPOSURE_EXAMPLE = `const [value, setValue] = useState(2);

<ExposurePanel
  aperture={apertureStops[value]}
  shutterSpeed="1/125"
  iso={400}
/>`;