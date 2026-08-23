"use client";

import { useState } from "react";

function generateZigzag(width: number, height: number, segments: number, amplitude: number): string {
  const segmentWidth = width / segments;
  const midY = height / 2;
  let path = `M0 ${midY}`;
  for (let i = 0; i < segments; i++) {
    const x1 = i * segmentWidth + segmentWidth / 2;
    const y1 = i % 2 === 0 ? midY - amplitude : midY + amplitude;
    const x2 = (i + 1) * segmentWidth;
    path += ` L${x1} ${y1} L${x2} ${midY}`;
  }
  return path;
}

export function BasicZigzag() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <svg className="h-8 w-full" viewBox="0 0 400 32" preserveAspectRatio="none">
        <defs>
          <linearGradient id="zv2-grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="100%" stopColor="#18181b" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path d={generateZigzag(400, 32, 20, 12)} fill="none" stroke="url(#zv2-grad1)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-zinc-100" />
      </svg>
    </div>
  );
}

export function ZigzagVariants() {
  const variants = [
    { label: "Solid", stroke: "#18181b", dasharray: "none", className: "dark:stroke-zinc-100" },
    { label: "Dashed", stroke: "#71717a", dasharray: "6 3", className: "dark:stroke-zinc-400" },
    { label: "Dotted", stroke: "#a1a1aa", dasharray: "2 4", className: "dark:stroke-zinc-500" },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {variants.map((v) => (
        <div key={v.label} className="flex flex-col gap-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{v.label}</span>
          <svg className="h-6 w-full" viewBox="0 0 400 24" preserveAspectRatio="none">
            <path d={generateZigzag(400, 24, 20, 8)} fill="none" stroke={v.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={v.dasharray === "none" ? undefined : v.dasharray} className={v.className} />
          </svg>
        </div>
      ))}
    </div>
  );
}

export function ZigzagAmplitudes() {
  const amplitudes = [4, 8, 12, 16, 20];

  return (
    <div className="flex flex-col gap-3 w-full">
      {amplitudes.map((amp) => (
        <div key={amp} className="flex items-center gap-3">
          <span className="w-8 text-right text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">{amp}px</span>
          <svg className="h-8 flex-1" viewBox="0 0 400 32" preserveAspectRatio="none">
            <path d={generateZigzag(400, 32, 16, amp)} fill="none" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-zinc-100" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export function ZigzagColors() {
  const colors = [
    { label: "Zinc", stroke: "#18181b", className: "dark:stroke-zinc-100" },
    { label: "Blue", stroke: "#2563eb", className: "" },
    { label: "Violet", stroke: "#7c3aed", className: "" },
    { label: "Emerald", stroke: "#059669", className: "" },
    { label: "Rose", stroke: "#e11d48", className: "" },
  ];

  return (
    <div className="flex flex-col gap-3 w-full">
      {colors.map((c) => (
        <div key={c.label} className="flex items-center gap-3">
          <span className="w-14 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">{c.label}</span>
          <svg className="h-6 flex-1" viewBox="0 0 400 24" preserveAspectRatio="none">
            <path d={generateZigzag(400, 24, 16, 8)} fill="none" stroke={c.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={c.className} />
          </svg>
        </div>
      ))}
    </div>
  );
}

export function ZigzagInteractive() {
  const [segments, setSegments] = useState(16);
  const [amplitude, setAmplitude] = useState(10);

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <svg className="h-12 w-full" viewBox="0 0 400 48" preserveAspectRatio="none">
        <defs>
          <linearGradient id="zv2-interactive" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="50%" stopColor="#71717a" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>
        </defs>
        <path d={generateZigzag(400, 48, segments, amplitude)} fill="none" stroke="url(#zv2-interactive)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-zinc-100" />
      </svg>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <div className="flex items-center gap-3">
          <span className="w-16 text-xs font-medium text-zinc-500 dark:text-zinc-400">Segments</span>
          <input type="range" min="4" max="32" value={segments} onChange={(e) => setSegments(Number(e.target.value))} className="flex-1 accent-zinc-900 dark:accent-zinc-100" />
          <span className="w-8 text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">{segments}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-16 text-xs font-medium text-zinc-500 dark:text-zinc-400">Amplitude</span>
          <input type="range" min="2" max="20" value={amplitude} onChange={(e) => setAmplitude(Number(e.target.value))} className="flex-1 accent-zinc-900 dark:accent-zinc-100" />
          <span className="w-8 text-right text-xs font-semibold text-zinc-700 dark:text-zinc-300">{amplitude}</span>
        </div>
      </div>
    </div>
  );
}
