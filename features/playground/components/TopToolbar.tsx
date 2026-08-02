"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { usePlayground } from "../context";
import { docsRouteFor, registryItemToFiles } from "../registry";
import { EXPORT_FORMATS, exportFiles, type ExportFormat } from "../utils/exporters";
import { Icon } from "../ui/icons";
import { IconButton, Spinner, VDivider, ToolbarGroup } from "../ui/primitives";
import { Menu } from "../ui/Menu";
import { ComponentPicker } from "./ComponentPicker";

export function TopToolbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const componentId = searchParams.get("component");
  const {
    files,
    runner,
    layout,
    paletteOpen,
    setPaletteOpen,
    previewTheme,
    setPreviewTheme,
    fullscreen,
    setFullscreen,
    setStatusMessage,
  } = usePlayground();

  const backRoute = componentId ? docsRouteFor(componentId) : "/components";

  const selectComponent = (id: string) => {
    const project = registryItemToFiles(id);
    if (project.length === 0) return;
    files.loadProject(project);
    router.replace(`/playground?component=${encodeURIComponent(id)}`, { scroll: false });
    setStatusMessage(`Loaded ${id}`);
  };

  const exportProject = (format: ExportFormat) => {
    void exportFiles(files.files, format);
    setStatusMessage(`Exported ${format.toUpperCase()}`);
  };

  const share = async () => {
    const payload = btoa(encodeURIComponent(JSON.stringify(files.files)));
    const url = `${window.location.origin}/playground?p=${encodeURIComponent(payload)}`;
    try {
      await navigator.clipboard?.writeText(url);
      setStatusMessage("Share link copied");
    } catch {
      setStatusMessage("Share link ready in console");
      console.log(url);
    }
  };

  return (
    <header className="flex h-10 shrink-0 items-center gap-1 border-b border-[#2a2a2e] bg-[#252526] px-2">
      <Link
        href={backRoute}
        aria-label="Back to docs"
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-[#9ca3af] transition-colors hover:bg-[#37373d] hover:text-[#d4d4d8]"
      >
        <Icon name="chevronRight" width={15} height={15} className="rotate-180" />
      </Link>

      <ComponentPicker value={componentId ?? "pagination-style-variants"} onSelect={selectComponent} />

      <VDivider />

      <ToolbarGroup>
        <IconButton icon="undo" label="Undo (Ctrl+Z)" disabled={!files.canUndo} onClick={files.undo} />
        <IconButton icon="redo" label="Redo (Ctrl+Shift+Z)" disabled={!files.canRedo} onClick={files.redo} />
        <IconButton icon="format" label="Format file (Shift+Alt+F)" onClick={files.formatActive} />
        <IconButton icon="save" label="Save snapshot (Ctrl+S)" onClick={() => files.takeSnapshot("Manual save")} />
      </ToolbarGroup>

      <VDivider />

      <ToolbarGroup>
        <button
          type="button"
          onClick={runner.rerun}
          disabled={runner.running}
          className="flex h-7 items-center gap-1.5 rounded bg-[#2b7de9] px-2.5 text-[12px] font-medium text-white transition-colors hover:bg-[#3b8be9] disabled:opacity-60"
        >
          {runner.running ? <Spinner /> : <Icon name="play" width={12} height={12} />}
          Run
        </button>
      </ToolbarGroup>

      <div className="min-w-2 flex-1" />

      <ToolbarGroup>
        <Menu
          align="end"
          trigger={
            <button
              type="button"
              className="flex h-7 items-center gap-1.5 rounded px-2 text-[12px] text-[#d4d4d8] transition-colors hover:bg-[#37373d]"
            >
              <Icon name="download" width={14} height={14} />
              Export
              <Icon name="chevronDown" width={11} height={11} className="text-[#9ca3af]" />
            </button>
          }
          items={EXPORT_FORMATS.map((format) => ({
            label: `${format.toUpperCase()} project`,
            onSelect: () => exportProject(format),
          }))}
        />
        <IconButton
          icon="share"
          label="Copy share link"
          onClick={() => {
            void share();
          }}
        />
        <IconButton icon="history" label="Snapshots" onClick={() => layout.setBottomTab("logs")} />
        <IconButton
          icon="settings"
          label="Editor settings"
          onClick={() => {
            layout.setBottomTab("build");
            setPaletteOpen(true);
          }}
        />
      </ToolbarGroup>

      <VDivider />

      <ToolbarGroup>
        <IconButton
          icon="panelLeft"
          label="Toggle sidebar (Ctrl+B)"
          active={layout.sidebarOpen}
          onClick={layout.toggleSidebar}
        />
        <IconButton
          icon="panelBottom"
          label="Toggle panel (Ctrl+J)"
          active={layout.bottomOpen}
          onClick={layout.toggleBottom}
        />
        <IconButton
          icon={previewTheme === "dark" ? "sun" : "moon"}
          label="Preview theme"
          onClick={() => setPreviewTheme(previewTheme === "dark" ? "light" : "dark")}
        />
        <IconButton
          icon="maximize"
          label="Fullscreen preview (Alt+F11)"
          active={fullscreen}
          onClick={() => setFullscreen(!fullscreen)}
        />
        <IconButton
          icon="search"
          label="Command palette (Ctrl+K)"
          active={paletteOpen}
          onClick={() => setPaletteOpen(!paletteOpen)}
        />
      </ToolbarGroup>
    </header>
  );
}
