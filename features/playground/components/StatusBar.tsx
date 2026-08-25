"use client";

import { useState, useRef, useEffect } from "react";
import { usePlayground } from "../context";
import { DEVICES, LANGUAGES } from "../constants";
import { languageOf } from "../utils/format";
import { Icon } from "../ui/icons";
import { Spinner } from "../ui/primitives";

function DeviceSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = DEVICES.find((d) => d.id === value);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded px-1 text-[11px] text-white hover:bg-white/15"
      >
        {selected?.label ?? "Device"}
        <svg className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute bottom-full right-0 z-50 mb-1 w-40 overflow-hidden rounded-md border border-[#3a3a41] bg-[#252526] shadow-lg animate-in fade-in-0 zoom-in-95 duration-150">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => { onChange(d.id); setOpen(false); }}
              className={`flex w-full items-center justify-between px-2.5 py-1.5 text-left text-[11px] transition-colors duration-75 hover:bg-[#2a2d2e] ${d.id === value ? "bg-[#37373d] text-white" : "text-[#d4d4d8]"}`}
            >
              <span>{d.label}</span>
              {d.id === value && (
                <svg className="h-3.5 w-3.5 text-[#2b7de9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function StatusBar() {
  const {
    files,
    runner,
    console: consoleApi,
    deviceId,
    setDeviceId,
    zoom,
    setZoom,
    previewTheme,
    setPreviewTheme,
    statusMessage,
    layout,
  } = usePlayground();

  const lang = languageOf(files.activeName);
  const langMeta = LANGUAGES[lang] ?? LANGUAGES.tsx;

  return (
    <footer className="flex h-6 shrink-0 select-none items-center gap-2 overflow-hidden border-t border-[#2a2a2e] bg-[#2b7de9] px-2 text-[11px] text-white">
      <span className="flex items-center gap-1.5">
        {runner.running ? (
          <Spinner width={11} height={11} />
        ) : runner.error ? (
          <Icon name="alertCircle" width={11} height={11} />
        ) : (
          <Icon name="check" width={11} height={11} />
        )}
        <span className="hidden truncate sm:inline">{statusMessage}</span>
      </span>

      <span className="hidden items-center gap-1 text-white/80 md:flex">
        <Icon name="gitBranch" width={11} height={11} />
        main
      </span>

      <button
        type="button"
        onClick={() => layout.setBottomTab("problems")}
        title="Problems"
        className="hidden items-center gap-1 rounded px-1 hover:bg-white/15 sm:flex"
      >
        {consoleApi.counts.errors > 0 ? (
          <Icon name="alertCircle" width={11} height={11} />
        ) : consoleApi.counts.warnings > 0 ? (
          <Icon name="alert" width={11} height={11} />
        ) : (
          <Icon name="info" width={11} height={11} />
        )}
        {consoleApi.counts.errors > 0 && `${consoleApi.counts.errors} `}Errors
      </button>

      <span className="flex-1" />

      <span className="hidden text-white/80 lg:inline">Ln 1, Col 1</span>

      <button
        type="button"
        title="Toggle preview theme"
        onClick={() => setPreviewTheme(previewTheme === "dark" ? "light" : "dark")}
        className="flex items-center gap-1 rounded px-1 hover:bg-white/15"
      >
        <Icon name={previewTheme === "dark" ? "moon" : "sun"} width={11} height={11} />
        {previewTheme === "dark" ? "Dark" : "Light"}
      </button>

      <span className="hidden items-center gap-1 sm:flex">
        <Icon name="maximize" width={11} height={11} />
        <DeviceSelect value={deviceId} onChange={setDeviceId} />
      </span>

      <button
        type="button"
        title="Zoom out"
        onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
        className="rounded px-1 hover:bg-white/15"
      >
        −
      </button>
      <span className="w-8 text-center">{Math.round(zoom * 100)}%</span>
      <button
        type="button"
        title="Zoom in"
        onClick={() => setZoom(Math.min(2, zoom + 0.25))}
        className="rounded px-1 hover:bg-white/15"
      >
        +
      </button>

      <span className="hidden items-center gap-1 rounded px-1 sm:flex" title={langMeta.label}>
        <span style={{ color: langMeta.color }} className="text-[10px] font-bold">
          {langMeta.icon}
        </span>
        {lang}
      </span>
    </footer>
  );
}
