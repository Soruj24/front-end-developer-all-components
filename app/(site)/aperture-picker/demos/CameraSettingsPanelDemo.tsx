"use client";

import { useState } from "react";
import { Camera, RotateCcw } from "lucide-react";
import { apertureData, formatEv } from "./aperture-data";
import { SegmentedControl } from "./SegmentedControl";

const shutterSpeeds = ["1/1000", "1/500", "1/250", "1/125", "1/60", "1/30", "1/15", "1/8"];
const isoValues = [100, 200, 400, 800, 1600, 3200, 6400];

export function CameraSettingsPanelDemo() {
  const [apertureIdx, setApertureIdx] = useState(2);
  const [shutterIdx, setShutterIdx] = useState(4);
  const [iso, setIso] = useState(400);

  const data = apertureData[apertureIdx];
  const reset = () => {
    setApertureIdx(2);
    setShutterIdx(4);
    setIso(400);
  };

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-surface p-4 shadow-card sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-muted/60">
            <Camera className="h-4 w-4 text-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-tight">Camera Settings</span>
        </div>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset camera settings"
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-all duration-150 ease-out hover:bg-muted hover:text-foreground active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: "Aperture", value: data.fStop, hint: `EV ${formatEv(data.ev)}` },
          { label: "Shutter", value: shutterSpeeds[shutterIdx], hint: "seconds" },
          { label: "ISO", value: String(iso), hint: "sensitivity" },
        ].map(({ label, value, hint }) => (
          <div
            key={label}
            className="rounded-lg border border-border bg-background px-2 py-3 text-center shadow-xs transition-colors duration-200"
          >
            <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
            <div className="mt-1 text-base font-bold tabular-nums">{value}</div>
            <div className="text-[10px] text-muted-foreground/80">{hint}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <SegmentedControl
          label="Aperture"
          displayValue={data.fStop}
          value={String(apertureIdx)}
          onValueChange={(v) => setApertureIdx(Number(v))}
          options={apertureData.map((stop, i) => ({ value: String(i), label: stop.label }))}
        />
        <SegmentedControl
          label="Shutter Speed"
          displayValue={shutterSpeeds[shutterIdx]}
          value={shutterSpeeds[shutterIdx]}
          onValueChange={setShutterIdx}
          options={shutterSpeeds.map((speed) => ({ value: speed, label: speed.replace("1/", "") }))}
        />
        <SegmentedControl
          label="ISO"
          displayValue={String(iso)}
          value={String(iso)}
          onValueChange={(v) => setIso(Number(v))}
          options={isoValues.map((val) => ({ value: String(val), label: String(val) }))}
        />
      </div>
    </div>
  );
}
