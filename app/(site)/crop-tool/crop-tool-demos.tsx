"use client";

import { useState } from "react";
import {
  Crop,
  RotateCcw,
  Check,
  X,
  Move,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Image,
  User,
  Monitor,
  Smartphone,
  Globe,
  Share2,
} from "lucide-react";

function CropBoxDemo() {
  const [box, setBox] = useState({ x: 15, y: 20, w: 70, h: 60 });

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
        <div className="relative h-56 overflow-hidden rounded-lg bg-muted">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-60" />
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute border-2 border-white shadow-lg cursor-move"
            style={{ left: `${box.x}%`, top: `${box.y}%`, width: `${box.w}%`, height: `${box.h}%` }}
          >
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="border border-white/30" />
              ))}
            </div>
            <div className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-mono text-white">
              {Math.round(box.w)}×{Math.round(box.h)}
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>Drag corners to resize</span>
          <span className="font-mono">{Math.round(box.w)}% × {Math.round(box.h)}%</span>
        </div>
      </div>
    </div>
  );
}

function AspectRatioDemo() {
  const [ratio, setRatio] = useState("1:1");
  const ratios = [
    { label: "1:1", desc: "Square", w: 24, h: 24 },
    { label: "4:3", desc: "Standard", w: 24, h: 18 },
    { label: "16:9", desc: "Widescreen", w: 28, h: 16 },
    { label: "3:2", desc: "Photo", w: 24, h: 16 },
    { label: "Free", desc: "Custom", w: 24, h: 20 },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
        <div className="mb-3 text-sm font-semibold">Aspect Ratio</div>
        <div className="grid grid-cols-5 gap-1.5 mb-4">
          {ratios.map((r) => (
            <button
              key={r.label}
              onClick={() => setRatio(r.label)}
              className={`flex flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs transition-colors ${
                ratio === r.label
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <div
                className={`border-2 ${
                  ratio === r.label ? "border-background/50" : "border-current"
                }`}
                style={{ width: r.w * 0.6, height: r.h * 0.6 }}
              />
              <span className="font-medium">{r.label}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center rounded-lg bg-muted/50 p-6">
          <div
            className="rounded-md border-2 border-dashed border-foreground/30 bg-foreground/5 transition-all"
            style={{
              width: ratios.find((r) => r.label === ratio)?.w ?? 24,
              height: ratios.find((r) => r.label === ratio)?.h ?? 24,
            }}
          />
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          {ratios.find((r) => r.label === ratio)?.desc} — {ratio}
        </p>
      </div>
    </div>
  );
}

function CropControlsDemo() {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [flipH, setFlipH] = useState(false);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
        <div className="relative mb-4 h-40 overflow-hidden rounded-lg bg-muted">
          <div
            className="absolute inset-4 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-400 transition-transform"
            style={{
              transform: `rotate(${rotation}deg) scale(${zoom / 100}) scaleX(${flipH ? -1 : 1}`,
            }}
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="w-10 text-[10px] font-medium text-muted-foreground">{rotation}°</span>
            <input
              type="range"
              min={-180}
              max={180}
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="flex-1 accent-foreground"
            />
          </div>
          <div className="flex items-center gap-3">
            <ZoomIn className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="w-10 text-[10px] font-medium text-muted-foreground">{zoom}%</span>
            <input
              type="range"
              min={50}
              max={200}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="flex-1 accent-foreground"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setFlipH(!flipH)}
              className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${
                flipH ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Flip H
            </button>
            <button
              onClick={() => { setRotation(0); setZoom(100); setFlipH(false); }}
              className="flex-1 rounded-lg bg-muted py-2 text-xs font-medium text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-foreground py-2.5 text-xs font-medium text-background hover:bg-foreground/90 transition-colors">
            <Check className="h-3.5 w-3.5" />
            Apply
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-black/[.08] py-2.5 text-xs font-medium hover:bg-muted transition-colors dark:border-white/[.145]">
            <X className="h-3.5 w-3.5" />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function AvatarCropDemo() {
  const [size, setSize] = useState(128);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
        <div className="mb-3 text-sm font-semibold">Avatar Crop</div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="h-32 w-32 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-full bg-gradient-to-br from-orange-400 to-pink-500" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/50" />
            <div className="absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-foreground text-background">
              <RefreshCw className="h-3 w-3" />
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <label className="mb-1 block text-[10px] font-medium text-muted-foreground">Output Size</label>
              <div className="flex gap-1.5">
                {[64, 128, 256].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors ${
                      size === s ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-muted/50 p-2">
              <p className="text-[10px] text-muted-foreground">Preview: {size}×{size}px</p>
              <div className="mt-1 flex gap-1">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-pink-500" />
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500" />
                <div className="h-4 w-4 rounded-full bg-gradient-to-br from-orange-400 to-pink-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BannerCropDemo() {
  const [platform, setPlatform] = useState("twitter");

  const platforms = [
    { id: "twitter", label: "Twitter", icon: Globe, w: 300, h: 100, ratio: "3:1" },
    { id: "linkedin", label: "LinkedIn", icon: Monitor, w: 300, h: 120, ratio: "5:2" },
    { id: "youtube", label: "YouTube", icon: Monitor, w: 300, h: 68, ratio: "16:4" },
  ];

  const active = platforms.find((p) => p.id === platform)!;

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
        <div className="mb-3 text-sm font-semibold">Banner Crop</div>
        <div className="flex gap-1.5 mb-4">
          {platforms.map((p) => (
            <button
              key={p.id}
              onClick={() => setPlatform(p.id)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors ${
                platform === p.id ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <p.icon className="h-3 w-3" />
              {p.label}
            </button>
          ))}
        </div>
        <div className="relative overflow-hidden rounded-lg bg-muted" style={{ height: 120 }}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-60" />
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-2 border-dashed border-white/60"
            style={{ height: `${(active.h / 120) * 100}%` }}
          >
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white/80">
              {active.ratio} — {active.w}×{active.h}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PresetSizesDemo() {
  const [selected, setSelected] = useState("post");
  const presets = [
    { id: "post", label: "Instagram Post", size: "1080×1080", icon: Globe, color: "bg-pink-500" },
    { id: "story", label: "Instagram Story", size: "1080×1920", icon: Smartphone, color: "bg-purple-500" },
    { id: "thumb", label: "Thumbnail", size: "320×180", icon: Image, color: "bg-blue-500" },
    { id: "avatar", label: "Profile Picture", size: "400×400", icon: User, color: "bg-emerald-500" },
    { id: "og", label: "OG Image", size: "1200×630", icon: Monitor, color: "bg-orange-500" },
  ];

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
        <div className="mb-3 text-sm font-semibold">Preset Sizes</div>
        <div className="space-y-1.5">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                selected === p.id ? "bg-muted/80" : "hover:bg-muted/30"
              }`}
            >
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${p.color}`}>
                <p.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium">{p.label}</p>
                <p className="text-[10px] text-muted-foreground">{p.size}</p>
              </div>
              {selected === p.id && (
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground">
                  <Check className="h-3 w-3 text-background" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function BeforeAfterDemo() {
  const [position, setPosition] = useState(50);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
        <div className="mb-3 text-sm font-semibold">Before / After</div>
        <div className="relative h-48 overflow-hidden rounded-lg bg-muted">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700" />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-500" style={{ width: `${(100 / position) * 100}%` }} />
          </div>
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg cursor-ew-resize"
            style={{ left: `${position}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-circle bg-white shadow-lg">
              <div className="flex gap-0.5">
                <div className="h-3 w-0.5 rounded-full bg-muted-foreground" />
                <div className="h-3 w-0.5 rounded-full bg-muted-foreground" />
              </div>
            </div>
            <div className="absolute top-2 left-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
              Original
            </div>
            <div className="absolute top-2 right-2 rounded bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white">
              Cropped
            </div>
          </div>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          className="mt-3 w-full accent-foreground"
        />
      </div>
    </div>
  );
}

export { CropBoxDemo, AspectRatioDemo, CropControlsDemo, AvatarCropDemo, BannerCropDemo, PresetSizesDemo, BeforeAfterDemo };