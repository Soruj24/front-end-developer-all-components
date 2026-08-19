"use client";

import { useState } from "react";
import { Aperture, Camera, Sun, Minus, Plus, RotateCcw, Eye } from "lucide-react";

export interface ApertureStop {
  fStop: string;
  label: string;
  ev: number;
  dof: "Very Shallow" | "Shallow" | "Medium" | "Deep" | "Very Deep";
  bestFor: string;
}

export const apertureData: ApertureStop[] = [
  { fStop: "f/1.4", label: "1.4", ev: 0, dof: "Very Shallow", bestFor: "Portraits, low light" },
  { fStop: "f/2", label: "2", ev: 1, dof: "Very Shallow", bestFor: "Portraits, bokeh" },
  { fStop: "f/2.8", label: "2.8", ev: 2, dof: "Shallow", bestFor: "Street photography" },
  { fStop: "f/4", label: "4", ev: 3, dof: "Shallow", bestFor: "Travel, everyday" },
  { fStop: "f/5.6", label: "5.6", ev: 4, dof: "Medium", bestFor: "Group photos" },
  { fStop: "f/8", label: "8", ev: 5, dof: "Medium", bestFor: "Landscapes, sharp" },
  { fStop: "f/11", label: "11", ev: 6, dof: "Deep", bestFor: "Architecture" },
  { fStop: "f/16", label: "16", ev: 7, dof: "Deep", bestFor: "Max depth" },
  { fStop: "f/22", label: "22", ev: 8, dof: "Very Deep", bestFor: "Starburst effect" },
];

export function WheelPickerDemo() {
  const [selected, setSelected] = useState(2);
  const data = apertureData[selected];
  const angle = (selected / (apertureData.length - 1)) * 270 - 135;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-56 w-56">
        <div className="absolute inset-0 rounded-full border-[3px] border-black/[.08] dark:border-white/[.145]" />
        {apertureData.map((stop, i) => {
          const a = (i / (apertureData.length - 1)) * 270 - 135;
          const rad = (a * Math.PI) / 180;
          const x = 112 + 90 * Math.cos(rad);
          const y = 112 + 90 * Math.sin(rad);
          return (
            <button
              key={stop.fStop}
              onClick={() => setSelected(i)}
              className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-semibold transition-all ${
                i === selected
                  ? "bg-foreground text-background scale-110 shadow-md"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              style={{ left: x, top: y }}
            >
              {stop.label}
            </button>
          );
        })}
        <div
          className="absolute left-1/2 top-1/2 h-0.5 w-14 -translate-x-1/2 -translate-y-full origin-bottom rounded-full bg-foreground transition-transform"
          style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
        />
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold tabular-nums">{data.fStop}</div>
        <div className="mt-1 text-sm text-muted-foreground">{data.dof} depth of field</div>
        <div className="mt-0.5 text-xs text-muted-foreground/70">{data.bestFor}</div>
      </div>
    </div>
  );
}

export function SliderPickerDemo() {
  const [value, setValue] = useState(2);
  const data = apertureData[value];

  return (
    <div className="flex w-full max-w-md flex-col gap-5 rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-foreground">Aperture</div>
          <div className="text-xs text-muted-foreground">Controls depth of field</div>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold tabular-nums">{data.fStop}</div>
          <div className="text-xs text-muted-foreground">EV {data.ev > 0 ? "+" : ""}{data.ev}</div>
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={0}
          max={apertureData.length - 1}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full accent-foreground"
        />
        <div className="mt-2 flex justify-between">
          {apertureData.map((stop, i) => (
            <button
              key={stop.fStop}
              onClick={() => setValue(i)}
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold transition-colors ${
                i === value ? "bg-foreground text-background" : "text-muted-foreground/50 hover:text-muted-foreground"
              }`}
            >
              {stop.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background">
          <Aperture className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-medium text-foreground">{data.dof} Depth of Field</div>
          <div className="text-[11px] text-muted-foreground">Best for: {data.bestFor}</div>
        </div>
      </div>
    </div>
  );
}

export function GridPickerDemo() {
  const [selected, setSelected] = useState(2);
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
      {apertureData.map((stop, i) => {
        const circleSize = 36 - i * 3;
        return (
          <button
            key={stop.fStop}
            onClick={() => setSelected(i)}
            className={`flex flex-col items-center gap-2.5 rounded-xl border p-4 transition-all ${
              i === selected
                ? "border-foreground bg-muted shadow-sm"
                : "border-black/[.08] hover:border-foreground/30 dark:border-white/[.145]"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center">
              <div
                className={`rounded-full border-2 transition-all ${
                  i === selected ? "border-foreground" : "border-muted-foreground/30"
                }`}
                style={{ width: circleSize, height: circleSize }}
              />
            </div>
            <div className="text-center">
              <div className="text-xs font-bold tabular-nums">{stop.fStop}</div>
              <div className="mt-0.5 text-[10px] text-muted-foreground/70">{stop.dof}</div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function DepthOfFieldPreviewDemo() {
  const [selected, setSelected] = useState(2);
  const blurValues = [12, 6, 3, 1.5, 0.5, 0.2, 0.1, 0, 0];
  const blur = blurValues[selected];
  const data = apertureData[selected];

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-5">
      <div className="relative h-44 w-full overflow-hidden rounded-xl border border-black/[.08] bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 dark:from-sky-950 dark:via-blue-950 dark:to-indigo-950">
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ filter: `blur(${blur}px)` }}
        >
          <Camera className="h-16 w-16 text-foreground/60" />
        </div>
        <div className="absolute bottom-3 left-3 rounded-md bg-background/80 px-2 py-1 text-[11px] font-medium backdrop-blur">
          {data.fStop} - {data.dof}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {apertureData.map((stop, i) => (
          <button
            key={stop.fStop}
            onClick={() => setSelected(i)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold transition-all ${
              i === selected
                ? "bg-foreground text-background shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {stop.label}
          </button>
        ))}
      </div>
      <div className="grid w-full grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-muted/50 p-2">
          <div className="text-[10px] text-muted-foreground">Blur</div>
          <div className="text-sm font-bold">{blur}px</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-2">
          <div className="text-[10px] text-muted-foreground">DoF</div>
          <div className="text-sm font-bold">{data.dof.split(" ")[0]}</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-2">
          <div className="text-[10px] text-muted-foreground">EV</div>
          <div className="text-sm font-bold">{data.ev > 0 ? "+" : ""}{data.ev}</div>
        </div>
      </div>
    </div>
  );
}

export function CameraSettingsPanelDemo() {
  const [apertureIdx, setApertureIdx] = useState(2);
  const [iso, setIso] = useState(400);
  const [shutterIdx, setShutterIdx] = useState(4);
  const shutterSpeeds = ["1/1000", "1/500", "1/250", "1/125", "1/60", "1/30", "1/15", "1/8"];
  const isoValues = [100, 200, 400, 800, 1600, 3200, 6400];

  const data = apertureData[apertureIdx];

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="h-4 w-4" />
          <span className="text-sm font-semibold">Camera Settings</span>
        </div>
        <button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted">
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-black/[.08] bg-muted/30 p-3 text-center dark:border-white/[.145]">
          <div className="text-[10px] font-medium uppercase text-muted-foreground">Aperture</div>
          <div className="mt-1 text-lg font-bold tabular-nums">{data.fStop}</div>
          <div className="text-[10px] text-muted-foreground/70">f-stop</div>
        </div>
        <div className="rounded-lg border border-black/[.08] bg-muted/30 p-3 text-center dark:border-white/[.145]">
          <div className="text-[10px] font-medium uppercase text-muted-foreground">Shutter</div>
          <div className="mt-1 text-lg font-bold tabular-nums">{shutterSpeeds[shutterIdx]}</div>
          <div className="text-[10px] text-muted-foreground/70">seconds</div>
        </div>
        <div className="rounded-lg border border-black/[.08] bg-muted/30 p-3 text-center dark:border-white/[.145]">
          <div className="text-[10px] font-medium uppercase text-muted-foreground">ISO</div>
          <div className="mt-1 text-lg font-bold tabular-nums">{iso}</div>
          <div className="text-[10px] text-muted-foreground/70">sensitivity</div>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Aperture</span>
            <span className="font-mono font-medium">{data.fStop}</span>
          </div>
          <div className="flex gap-1">
            {apertureData.map((stop, i) => (
              <button
                key={stop.fStop}
                onClick={() => setApertureIdx(i)}
                className={`flex-1 rounded py-1 text-[10px] font-bold transition-colors ${
                  i === apertureIdx ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {stop.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Shutter Speed</span>
            <span className="font-mono font-medium">{shutterSpeeds[shutterIdx]}</span>
          </div>
          <div className="flex gap-1">
            {shutterSpeeds.map((speed, i) => (
              <button
                key={speed}
                onClick={() => setShutterIdx(i)}
                className={`flex-1 rounded py-1 text-[10px] font-bold transition-colors ${
                  i === shutterIdx ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {speed.replace("1/", "")}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-muted-foreground">ISO</span>
            <span className="font-mono font-medium">{iso}</span>
          </div>
          <div className="flex gap-1">
            {isoValues.map((val) => (
              <button
                key={val}
                onClick={() => setIso(val)}
                className={`flex-1 rounded py-1 text-[10px] font-bold transition-colors ${
                  iso === val ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompactInlineDemo() {
  const [value, setValue] = useState(2);
  const data = apertureData[value];

  return (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-lg border border-black/[.08] bg-card px-4 py-3 shadow-sm dark:border-white/[.145]">
      <Aperture className="h-4 w-4 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">Aperture</span>
      <div className="ml-auto flex items-center gap-1">
        <button
          onClick={() => setValue(Math.max(0, value - 1))}
          disabled={value === 0}
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted disabled:opacity-30"
        >
          <Minus className="h-3 w-3" />
        </button>
        <span className="w-12 text-center text-sm font-bold tabular-nums">{data.fStop}</span>
        <button
          onClick={() => setValue(Math.min(apertureData.length - 1, value + 1))}
          disabled={value === apertureData.length - 1}
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted disabled:opacity-30"
        >
          <Plus className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

export function ExposureInfoDemo() {
  const [value, setValue] = useState(2);
  const data = apertureData[value];
  const shutterSpeed = "1/125";
  const iso = 400;

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-semibold">Exposure Settings</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-600 dark:bg-green-950 dark:text-green-400">
          <Eye className="h-3 w-3" />
          Proper
        </span>
      </div>
      <div className="mb-4 flex items-center gap-4 rounded-lg bg-muted/50 p-3">
        <div className="text-center">
          <div className="text-[10px] text-muted-foreground">Aperture</div>
          <div className="text-lg font-bold tabular-nums">{data.fStop}</div>
        </div>
        <div className="text-muted-foreground/30">x</div>
        <div className="text-center">
          <div className="text-[10px] text-muted-foreground">Shutter</div>
          <div className="text-lg font-bold tabular-nums">{shutterSpeed}</div>
        </div>
        <div className="text-muted-foreground/30">x</div>
        <div className="text-center">
          <div className="text-[10px] text-muted-foreground">ISO</div>
          <div className="text-lg font-bold tabular-nums">{iso}</div>
        </div>
      </div>
      <div className="flex gap-1.5">
        {apertureData.map((stop, i) => (
          <button
            key={stop.fStop}
            onClick={() => setValue(i)}
            className={`flex-1 rounded-lg py-2 text-xs font-bold transition-all ${
              i === value
                ? "bg-foreground text-background shadow-sm"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {stop.label}
          </button>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Sun className="h-3.5 w-3.5" />
        <span>EV Compensation: {data.ev > 0 ? "+" : ""}{data.ev}</span>
        <span className="ml-auto">{data.dof}</span>
      </div>
    </div>
  );
}