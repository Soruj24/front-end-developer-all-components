"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { DEVICES, ZOOM_LEVELS } from "../../constants";
import { usePlayground } from "../../context";
import { toHtml } from "../../utils/exporters";
import { Icon } from "../../ui/icons";
import { IconButton, VDivider } from "../../ui/primitives";

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
        className="flex h-6 items-center gap-1.5 rounded border border-[#3a3a41] bg-[#1f1f23] px-1.5 text-[11px] text-[#d4d4d8] transition-colors duration-150 hover:border-[#505056] hover:bg-[#252526] focus:border-[#2b7de9] focus:outline-none"
      >
        <span className="truncate">{selected ? `${selected.label} · ${selected.chrome}` : "Device"}</span>
        <svg className={`h-3 w-3 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-48 overflow-hidden rounded-md border border-[#3a3a41] bg-[#252526] shadow-lg animate-in fade-in-0 zoom-in-95 duration-150">
          {DEVICES.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => { onChange(d.id); setOpen(false); }}
              className={`flex w-full items-center justify-between px-2.5 py-1.5 text-left text-[11px] transition-colors duration-75 hover:bg-[#2a2d2e] ${d.id === value ? "bg-[#37373d] text-white" : "text-[#d4d4d8]"}`}
            >
              <span>{d.label} · {d.chrome}</span>
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

export function PreviewPanel() {
  const {
    files,
    runner,
    device,
    deviceId,
    setDeviceId,
    zoom,
    setZoom,
    rotate,
    setRotate,
    previewTheme,
    setPreviewTheme,
    fullscreen,
    setFullscreen,
    previewRef,
    setStatusMessage,
  } = usePlayground();

  useEffect(() => {
    if (fullscreen) {
      runner.rerun();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullscreen]);

  const openExternal = useCallback(() => {
    const html = toHtml(files.files);
    const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    setStatusMessage("Opened preview in new tab");
  }, [files.files, setStatusMessage]);

  const frame = (
    <div className="mx-auto h-full w-full" style={{ width: device.width * zoom, height: device.height * zoom }}>
      <div
        className={`overflow-auto shadow-2xl ring-1 ring-black/40 ${rotate ? "rotate-90" : ""}`}
        style={{
          width: device.width,
          height: device.height,
          transform: `scale(${zoom})`,
          transformOrigin: "top left",
          backgroundColor: previewTheme === "dark" ? "#0a0a0c" : "#ffffff",
          color: previewTheme === "dark" ? "#e4e4e7" : "#18181b",
        }}
      >
        <div ref={previewRef} className="min-h-full min-w-full" data-preview-mount />
      </div>
    </div>
  );

  const toolbar = (
    <div className="flex h-9 shrink-0 items-center gap-1 border-b border-[#2a2a2e] bg-[#252526] px-2">
      <span className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
        <Icon name="eye" width={13} height={13} />
        Preview
      </span>

      <VDivider />

      <DeviceSelect value={deviceId} onChange={setDeviceId} />

      <IconButton
        icon="rotate"
        label="Rotate device"
        active={rotate}
        onClick={() => setRotate(!rotate)}
      />
      <IconButton icon="zoomOut" label="Zoom out" onClick={() => setZoom(Math.max(0.5, zoom - 0.25))} />
      <span className="w-10 text-center text-[11px] text-[#d4d4d8]">{Math.round(zoom * 100)}%</span>
      <IconButton icon="zoomIn" label="Zoom in" onClick={() => setZoom(Math.min(2, zoom + 0.25))} />
      {zoom !== 1 && (
        <button
          type="button"
          onClick={() => setZoom(1)}
          className="rounded px-1 text-[11px] text-[#2b7de9] hover:bg-[#37373d]"
        >
          Reset
        </button>
      )}

      <div className="min-w-1 flex-1" />

      <span className="hidden items-center gap-0.5 sm:flex">
        {ZOOM_LEVELS.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => setZoom(level)}
            className={`h-5 w-6 rounded text-[10px] ${
              zoom === level ? "bg-[#2b7de9] text-white" : "text-[#9ca3af] hover:bg-[#37373d]"
            }`}
          >
            {level}
          </button>
        ))}
      </span>

      <VDivider />

      <IconButton
        icon={previewTheme === "dark" ? "sun" : "moon"}
        label="Toggle theme"
        onClick={() => setPreviewTheme(previewTheme === "dark" ? "light" : "dark")}
      />
      <IconButton icon="external" label="Open in new tab" onClick={openExternal} />
      <IconButton
        icon="maximize"
        label="Fullscreen"
        active={fullscreen}
        onClick={() => setFullscreen(!fullscreen)}
      />
    </div>
  );

  const status = runner.error ? (
    <div className="flex items-start gap-2 rounded border border-[#4d2020] bg-[#2a1515] px-3 py-2 font-mono text-[11px] leading-relaxed text-[#f48771]">
      <Icon name="alertCircle" width={14} height={14} className="mt-0.5 shrink-0" />
      <span className="whitespace-pre-wrap break-all">{runner.error}</span>
    </div>
  ) : null;

  const inline = (
    <div className="flex h-full min-h-0 flex-col bg-[#1e1e1e]">
      {toolbar}
      <div className="min-h-0 flex-1 overflow-auto p-3">
        <div className="flex min-h-full items-start justify-center">
          {frame}
        </div>
        {status && <div className="mx-auto mt-2 max-w-xl">{status}</div>}
      </div>
    </div>
  );

  return fullscreen ? (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#141416]">
      {toolbar}
      <div className="min-h-0 flex-1 overflow-auto p-4">
        <div className="flex min-h-full items-start justify-center">{frame}</div>
        {status && <div className="mx-auto mt-2 max-w-xl">{status}</div>}
      </div>
      <button
        type="button"
        onClick={() => setFullscreen(false)}
        className="absolute right-4 top-12 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
        title="Exit fullscreen"
      >
        <Icon name="x" width={15} height={15} />
      </button>
    </div>
  ) : (
    inline
  );
}
