"use client";

import { usePlayground } from "../context";
import { DEVICES, LANGUAGES } from "../constants";
import { languageOf } from "../utils/format";
import { Icon } from "../ui/icons";
import { Spinner } from "../ui/primitives";

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
        <select
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
          title="Preview device"
          className="bg-transparent text-[11px] text-white outline-none hover:bg-white/15 [&>option]:bg-[#252526] [&>option]:text-[#d4d4d8]"
        >
          {DEVICES.map((d) => (
            <option key={d.id} value={d.id}>
              {d.label}
            </option>
          ))}
        </select>
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
