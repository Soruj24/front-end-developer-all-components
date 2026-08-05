"use client";

import { cn } from "@/lib/cn";
import {
  COLOR_PRESETS, SHADOW_PRESETS, ANIMATION_PRESETS, DURATION_PRESETS,
  EASING_PRESETS, FONT_FAMILY_OPTIONS, FONT_WEIGHT_OPTIONS, TEXT_ALIGN_OPTIONS,
  TEXT_TRANSFORM_OPTIONS, DISPLAY_OPTIONS, FLEX_DIRECTION_OPTIONS,
  GRADIENT_DIRECTION_OPTIONS,
} from "../../constants/defaults";

/* ─── Shared ─── */

export function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-muted/50">
        {title}
        <span className="text-[10px]">{open ? "▾" : "▸"}</span>
      </button>
      {open && <div className="space-y-3 px-4 pb-3">{children}</div>}
    </div>
  );
}

export function Row({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <label className="w-20 shrink-0 text-[11px] text-muted-foreground">{label}</label>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

/* ─── Primitives ─── */

import { useState } from "react";

export function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
      className="w-full rounded border border-border bg-background px-2 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none" />
  );
}

export function NumberInput({ value, onChange, min = 0, max = 9999, step = 1, unit = "" }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; unit?: string;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <input type="number" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded border border-border bg-background px-2 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
      {unit && <span className="text-[10px] text-muted-foreground w-6">{unit}</span>}
    </div>
  );
}

export function Slider({ value, onChange, min = 0, max = 100, step = 1, unit = "" }: {
  value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; unit?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))} className="flex-1 accent-primary h-1" />
      <span className="w-10 text-right text-[11px] text-muted-foreground tabular-nums">{Math.round(value)}{unit}</span>
    </div>
  );
}

export function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: Array<{ value: string; label: string }> }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full rounded border border-border bg-background px-2 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none">
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

export function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label?: string }) {
  return (
    <button onClick={() => onChange(!value)} className="flex items-center gap-2">
      <div className={cn("relative h-5 w-9 rounded-full transition-colors", value ? "bg-primary" : "bg-gray-200")}>
        <div className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform", value ? "translate-x-4" : "translate-x-0.5")} />
      </div>
      {label && <span className="text-[11px] text-muted-foreground">{label}</span>}
    </button>
  );
}

/* ─── Color ─── */

export function ColorPicker({ value, onChange, presets }: { value: string; onChange: (v: string) => void; presets?: string[] }) {
  const colors = presets ?? COLOR_PRESETS;
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <input type="color" value={value || "#000000"} onChange={(e) => onChange(e.target.value)}
          className="h-7 w-7 cursor-pointer rounded border border-border shrink-0" />
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder="#000000"
          className="flex-1 rounded border border-border bg-background px-2 py-1 text-xs text-foreground focus:border-primary focus:outline-none font-mono" />
      </div>
      <div className="flex flex-wrap gap-1">
        {colors.map((c) => (
          <button key={c} onClick={() => onChange(c)}
            className={cn("h-5 w-5 rounded-full border transition-all", value === c ? "ring-2 ring-primary ring-offset-1 scale-110" : "border-gray-200 hover:scale-110")}
            style={{ backgroundColor: c }} />
        ))}
        <button onClick={() => onChange("")}
          className="h-5 w-5 rounded-full border border-dashed border-gray-300 text-[8px] text-muted-foreground flex items-center justify-center hover:border-primary">
          ∅
        </button>
      </div>
    </div>
  );
}

/* ─── Shadow ─── */

export function ShadowPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1">
      {SHADOW_PRESETS.map((s) => (
        <button key={s.id} onClick={() => onChange(s.value)}
          className={cn("rounded border px-2 py-1 text-[10px] transition-colors",
            value === s.value ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted")}>
          {s.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Box Model (Spacing) ─── */

interface SpacingValue { top: number; right: number; bottom: number; left: number; }

export function BoxModelEditor({ label, value, onChange, max = 96 }: { label: string; value: SpacingValue; onChange: (v: SpacingValue) => void; max?: number }) {
  const update = (side: keyof SpacingValue, v: number) => onChange({ ...value, [side]: v });
  const setAll = (v: number) => onChange({ top: v, right: v, bottom: v, left: v });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-foreground">{label}</span>
        <button onClick={() => setAll(0)} className="text-[10px] text-muted-foreground hover:text-primary">Reset</button>
      </div>
      <div className="relative mx-auto w-[180px] h-[120px]">
        {/* Margin outer */}
        <div className="absolute inset-0 rounded border border-dashed border-orange-300 bg-orange-50/50 dark:bg-orange-950/20 dark:border-orange-700">
          <SpacingInput label="mt" value={value.top} onChange={(v) => update("top", v)} max={max} className="absolute -top-5 left-1/2 -translate-x-1/2" />
          <SpacingInput label="mr" value={value.right} onChange={(v) => update("right", v)} max={max} className="absolute top-1/2 -right-5 -translate-y-1/2" />
          <SpacingInput label="mb" value={value.bottom} onChange={(v) => update("bottom", v)} max={max} className="absolute -bottom-5 left-1/2 -translate-x-1/2" />
          <SpacingInput label="ml" value={value.left} onChange={(v) => update("left", v)} max={max} className="absolute top-1/2 -left-5 -translate-y-1/2" />
        </div>
        {/* Content area */}
        <div className="absolute inset-4 rounded bg-primary/10 border border-primary/30 flex items-center justify-center">
          <span className="text-[9px] text-primary font-medium">{label}</span>
        </div>
      </div>
      {/* Compact inputs */}
      <div className="grid grid-cols-4 gap-1">
        {(["top", "right", "bottom", "left"] as const).map((side) => (
          <div key={side} className="flex flex-col items-center gap-0.5">
            <span className="text-[9px] text-muted-foreground uppercase">{side[0]}</span>
            <NumberInput value={value[side]} onChange={(v) => update(side, v)} min={0} max={max} step={4} unit="px" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SpacingInput({ label, value, onChange, max, className }: { label: string; value: number; onChange: (v: number) => void; max: number; className?: string }) {
  return (
    <div className={cn("flex items-center gap-0.5 bg-background border border-border rounded px-1", className)}>
      <span className="text-[8px] text-muted-foreground">{label}</span>
      <input type="number" min={0} max={max} step={4} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-8 text-[10px] text-center bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" />
    </div>
  );
}

/* ─── Typography ─── */

export function TypographyEditor({ value, onChange }: { value: { fontSize: number; fontWeight: string; fontFamily: string; color: string; textAlign: string; lineHeight: number; letterSpacing: number; textTransform: string; textDecoration: string }; onChange: (v: Partial<typeof value>) => void }) {
  return (
    <div className="flex flex-col gap-2.5">
      <Row label="Size">
        <Slider value={value.fontSize} onChange={(v) => onChange({ fontSize: v })} min={8} max={96} step={1} unit="px" />
      </Row>
      <Row label="Weight">
        <Select value={value.fontWeight} onChange={(v) => onChange({ fontWeight: v })} options={FONT_WEIGHT_OPTIONS} />
      </Row>
      <Row label="Family">
        <Select value={value.fontFamily} onChange={(v) => onChange({ fontFamily: v })} options={FONT_FAMILY_OPTIONS} />
      </Row>
      <Row label="Color">
        <ColorPicker value={value.color} onChange={(v) => onChange({ color: v })} />
      </Row>
      <Row label="Align">
        <Select value={value.textAlign} onChange={(v) => onChange({ textAlign: v })} options={TEXT_ALIGN_OPTIONS} />
      </Row>
      <Row label="Leading">
        <Slider value={value.lineHeight} onChange={(v) => onChange({ lineHeight: v })} min={0.5} max={3} step={0.1} />
      </Row>
      <Row label="Tracking">
        <Slider value={value.letterSpacing} onChange={(v) => onChange({ letterSpacing: v })} min={-0.1} max={0.5} step={0.01} unit="em" />
      </Row>
      <Row label="Transform">
        <Select value={value.textTransform} onChange={(v) => onChange({ textTransform: v })} options={TEXT_TRANSFORM_OPTIONS} />
      </Row>
      <Row label="Decor">
        <Select value={value.textDecoration} onChange={(v) => onChange({ textDecoration: v })} options={[{ value: "none", label: "None" }, { value: "underline", label: "Underline" }, { value: "line-through", label: "Strikethrough" }]} />
      </Row>
    </div>
  );
}

/* ─── Background ─── */

export function BackgroundEditor({ value, onChange }: { value: { color: string; gradientFrom: string; gradientVia: string; gradientTo: string; gradientDirection: string }; onChange: (v: Partial<typeof value>) => void }) {
  const hasGradient = !!value.gradientFrom;
  return (
    <div className="flex flex-col gap-2.5">
      <Row label="Color">
        <ColorPicker value={value.color} onChange={(v) => onChange({ color: v, gradientFrom: "", gradientVia: "", gradientTo: "" })} />
      </Row>
      <Row label="Gradient">
        <Toggle value={hasGradient} onChange={(v) => onChange(v ? { gradientFrom: "#6366f1", gradientTo: "#a855f7" } : { gradientFrom: "", gradientVia: "", gradientTo: "" })} label="Enable" />
      </Row>
      {hasGradient && (
        <>
          <Row label="From">
            <ColorPicker value={value.gradientFrom} onChange={(v) => onChange({ gradientFrom: v })} />
          </Row>
          <Row label="Via">
            <ColorPicker value={value.gradientVia} onChange={(v) => onChange({ gradientVia: v })} />
          </Row>
          <Row label="To">
            <ColorPicker value={value.gradientTo} onChange={(v) => onChange({ gradientTo: v })} />
          </Row>
          <Row label="Direction">
            <Select value={value.gradientDirection} onChange={(v) => onChange({ gradientDirection: v })} options={GRADIENT_DIRECTION_OPTIONS} />
          </Row>
        </>
      )}
    </div>
  );
}

/* ─── Border ─── */

export function BorderEditor({ value, onChange }: { value: { width: number; color: string; style: string; radius: number; radiusTopLeft: number; radiusTopRight: number; radiusBottomLeft: number; radiusBottomRight: number }; onChange: (v: Partial<typeof value>) => void }) {
  const [individual, setIndividual] = useState(false);
  const allSame = value.radiusTopLeft === value.radiusTopRight && value.radiusTopRight === value.radiusBottomLeft && value.radiusBottomLeft === value.radiusBottomRight;
  return (
    <div className="flex flex-col gap-2.5">
      <Row label="Width">
        <Slider value={value.width} onChange={(v) => onChange({ width: v })} min={0} max={12} step={1} unit="px" />
      </Row>
      <Row label="Color">
        <ColorPicker value={value.color} onChange={(v) => onChange({ color: v })} />
      </Row>
      <Row label="Style">
        <Select value={value.style} onChange={(v) => onChange({ style: v })} options={[{ value: "solid", label: "Solid" }, { value: "dashed", label: "Dashed" }, { value: "dotted", label: "Dotted" }, { value: "none", label: "None" }]} />
      </Row>
      <Row label="Radius">
        <div className="flex items-center gap-2">
          <Slider value={individual && !allSame ? 0 : value.radius} onChange={(v) => onChange({ radius: v, radiusTopLeft: v, radiusTopRight: v, radiusBottomLeft: v, radiusBottomRight: v })} min={0} max={999} step={4} unit="px" />
          <button onClick={() => setIndividual(!individual)} className={cn("text-[10px] px-1.5 py-0.5 rounded", individual ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted")}>Each</button>
        </div>
      </Row>
      {individual && (
        <div className="grid grid-cols-2 gap-1.5">
          <div className="flex items-center gap-1"><span className="text-[9px] text-muted-foreground w-4">TL</span><NumberInput value={value.radiusTopLeft} onChange={(v) => onChange({ radiusTopLeft: v })} min={0} max={999} step={4} unit="px" /></div>
          <div className="flex items-center gap-1"><span className="text-[9px] text-muted-foreground w-4">TR</span><NumberInput value={value.radiusTopRight} onChange={(v) => onChange({ radiusTopRight: v })} min={0} max={999} step={4} unit="px" /></div>
          <div className="flex items-center gap-1"><span className="text-[9px] text-muted-foreground w-4">BL</span><NumberInput value={value.radiusBottomLeft} onChange={(v) => onChange({ radiusBottomLeft: v })} min={0} max={999} step={4} unit="px" /></div>
          <div className="flex items-center gap-1"><span className="text-[9px] text-muted-foreground w-4">BR</span><NumberInput value={value.radiusBottomRight} onChange={(v) => onChange({ radiusBottomRight: v })} min={0} max={999} step={4} unit="px" /></div>
        </div>
      )}
    </div>
  );
}

/* ─── Effects ─── */

export function EffectsEditor({ value, onChange }: { value: { opacity: number; blur: number; shadow: string }; onChange: (v: Partial<typeof value>) => void }) {
  return (
    <div className="flex flex-col gap-2.5">
      <Row label="Opacity">
        <Slider value={value.opacity} onChange={(v) => onChange({ opacity: v })} min={0} max={100} step={1} unit="%" />
      </Row>
      <Row label="Blur">
        <Slider value={value.blur} onChange={(v) => onChange({ blur: v })} min={0} max={24} step={1} unit="px" />
      </Row>
      <Row label="Shadow">
        <ShadowPicker value={value.shadow} onChange={(v) => onChange({ shadow: v })} />
      </Row>
    </div>
  );
}

/* ─── Animation ─── */

export function AnimationEditor({ value, onChange }: { value: { enter: string; exit: string; duration: number; delay: number; easing: string }; onChange: (v: Partial<typeof value>) => void }) {
  return (
    <div className="flex flex-col gap-2.5">
      <Row label="Enter">
        <div className="flex flex-wrap gap-1">
          {ANIMATION_PRESETS.map((a) => (
            <button key={a.id} onClick={() => onChange({ enter: a.value })}
              className={cn("rounded border px-2 py-1 text-[10px] transition-colors",
                value.enter === a.value ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted")}>
              {a.label}
            </button>
          ))}
        </div>
      </Row>
      <Row label="Duration">
        <Select value={String(value.duration)} onChange={(v) => onChange({ duration: Number(v) })} options={DURATION_PRESETS.map((d) => ({ value: String(d.value), label: d.label }))} />
      </Row>
      <Row label="Delay">
        <Slider value={value.delay} onChange={(v) => onChange({ delay: v })} min={0} max={3000} step={50} unit="ms" />
      </Row>
      <Row label="Easing">
        <Select value={value.easing} onChange={(v) => onChange({ easing: v })} options={EASING_PRESETS.map((e) => ({ value: e.value, label: e.label }))} />
      </Row>
    </div>
  );
}

/* ─── Hover State ─── */

export function HoverStateEditor({ value, onChange }: { value: { enabled: boolean; backgroundColor?: string; textColor?: string; borderColor?: string; scale?: number; opacity?: number; shadow?: string; translateY?: number }; onChange: (v: Partial<typeof value>) => void }) {
  return (
    <div className="flex flex-col gap-2.5">
      <Row label="Enable">
        <Toggle value={value.enabled} onChange={(v) => onChange({ enabled: v })} />
      </Row>
      {value.enabled && (
        <>
          <Row label="BG Color">
            <ColorPicker value={value.backgroundColor ?? ""} onChange={(v) => onChange({ backgroundColor: v })} />
          </Row>
          <Row label="Text">
            <ColorPicker value={value.textColor ?? ""} onChange={(v) => onChange({ textColor: v })} />
          </Row>
          <Row label="Border">
            <ColorPicker value={value.borderColor ?? ""} onChange={(v) => onChange({ borderColor: v })} />
          </Row>
          <Row label="Scale">
            <Slider value={value.scale ?? 1} onChange={(v) => onChange({ scale: v })} min={0.8} max={1.2} step={0.01} />
          </Row>
          <Row label="Opacity">
            <Slider value={value.opacity ?? 100} onChange={(v) => onChange({ opacity: v })} min={0} max={100} step={1} unit="%" />
          </Row>
          <Row label="Shadow">
            <ShadowPicker value={value.shadow ?? "none"} onChange={(v) => onChange({ shadow: v })} />
          </Row>
          <Row label="Move Y">
            <Slider value={value.translateY ?? 0} onChange={(v) => onChange({ translateY: v })} min={-20} max={20} step={1} unit="px" />
          </Row>
        </>
      )}
    </div>
  );
}

/* ─── Focus State ─── */

export function FocusStateEditor({ value, onChange }: { value: { enabled: boolean; ringColor?: string; ringWidth?: number; ringOffset?: number }; onChange: (v: Partial<typeof value>) => void }) {
  return (
    <div className="flex flex-col gap-2.5">
      <Row label="Enable">
        <Toggle value={value.enabled} onChange={(v) => onChange({ enabled: v })} />
      </Row>
      {value.enabled && (
        <>
          <Ring color={value.ringColor ?? "#6366f1"} width={value.ringWidth ?? 2} offset={value.ringOffset ?? 2} />
          <Row label="Color">
            <ColorPicker value={value.ringColor ?? "#6366f1"} onChange={(v) => onChange({ ringColor: v })} />
          </Row>
          <Row label="Width">
            <Slider value={value.ringWidth ?? 2} onChange={(v) => onChange({ ringWidth: v })} min={1} max={8} step={1} unit="px" />
          </Row>
          <Row label="Offset">
            <Slider value={value.ringOffset ?? 2} onChange={(v) => onChange({ ringOffset: v })} min={0} max={8} step={1} unit="px" />
          </Row>
        </>
      )}
    </div>
  );
}

function Ring({ color, width, offset }: { color: string; width: number; offset: number }) {
  return (
    <div className="flex justify-center py-2">
      <div className="relative">
        <div className="absolute inset-0 rounded-lg" style={{ boxShadow: `0 0 0 ${offset}px ${color}33, 0 0 0 ${offset + width}px ${color}` }} />
        <div className="relative h-8 w-12 rounded border border-gray-200 bg-white" />
      </div>
    </div>
  );
}

/* ─── Dark Mode ─── */

export function DarkModeEditor({ value, onChange }: { value: { enabled: boolean; backgroundColor?: string; textColor?: string; borderColor?: string }; onChange: (v: Partial<typeof value>) => void }) {
  return (
    <div className="flex flex-col gap-2.5">
      <Row label="Enable">
        <Toggle value={value.enabled} onChange={(v) => onChange({ enabled: v })} label="Dark overrides" />
      </Row>
      {value.enabled && (
        <>
          <Row label="BG">
            <ColorPicker value={value.backgroundColor ?? ""} onChange={(v) => onChange({ backgroundColor: v })} />
          </Row>
          <Row label="Text">
            <ColorPicker value={value.textColor ?? ""} onChange={(v) => onChange({ textColor: v })} />
          </Row>
          <Row label="Border">
            <ColorPicker value={value.borderColor ?? ""} onChange={(v) => onChange({ borderColor: v })} />
          </Row>
        </>
      )}
    </div>
  );
}

/* ─── Layout ─── */

export function LayoutEditor({ value, onChange }: { value: { width: number | string; height: number | string; display: string; flexDirection: string; gap: number }; onChange: (v: Partial<typeof value>) => void }) {
  const parseNum = (v: number | string): number => typeof v === "number" ? v : parseInt(v) || 0;
  return (
    <div className="flex flex-col gap-2.5">
      <Row label="Width">
        <div className="flex gap-1.5">
          <NumberInput value={parseNum(value.width)} onChange={(v) => onChange({ width: v })} min={0} max={2000} step={4} unit="px" />
          <Select value={typeof value.width === "string" ? value.width : "fixed"} onChange={(v) => onChange({ width: v === "auto" ? "auto" : v === "full" ? "100%" : parseNum(value.width) })} options={[{ value: "fixed", label: "Fixed" }, { value: "auto", label: "Auto" }, { value: "full", label: "100%" }]} />
        </div>
      </Row>
      <Row label="Height">
        <div className="flex gap-1.5">
          <NumberInput value={parseNum(value.height)} onChange={(v) => onChange({ height: v })} min={0} max={2000} step={4} unit="px" />
          <Select value={typeof value.height === "string" ? value.height : "fixed"} onChange={(v) => onChange({ height: v === "auto" ? "auto" : v === "full" ? "100%" : parseNum(value.height) })} options={[{ value: "fixed", label: "Fixed" }, { value: "auto", label: "Auto" }, { value: "full", label: "100%" }]} />
        </div>
      </Row>
      <Row label="Display">
        <Select value={value.display} onChange={(v) => onChange({ display: v })} options={DISPLAY_OPTIONS} />
      </Row>
      {value.display === "flex" && (
        <Row label="Direction">
          <Select value={value.flexDirection} onChange={(v) => onChange({ flexDirection: v })} options={FLEX_DIRECTION_OPTIONS} />
        </Row>
      )}
      <Row label="Gap">
        <Slider value={value.gap} onChange={(v) => onChange({ gap: v })} min={0} max={96} step={4} unit="px" />
      </Row>
    </div>
  );
}
