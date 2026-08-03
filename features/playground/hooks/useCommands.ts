"use client";

import { useCallback, useMemo } from "react";
import type { CommandItem } from "@/components/ui";
import type { PlaygroundContextValue } from "../context";
import { SHORTCUTS } from "../constants/shortcuts";
import { chordId } from "../constants/shortcuts";
import { exportFiles, EXPORT_FORMATS } from "../utils/exporters";
import { uid } from "../utils/misc";

/**
 * Builds the command-palette item tree and maps keyboard chords to actions.
 * All actions read from the shared playground context.
 */
export function useCommands(value: PlaygroundContextValue) {
  const { files, layout, runner, settings, setSettings } = value;

  const runNow = useCallback(() => {
    const entry = files.activeName;
    runner.rerun();
    value.setStatusMessage(`Compiling ${entry}…`);
  }, [runner, files.activeName, value]);

  const format = useCallback(() => {
    files.formatActive();
    value.setStatusMessage(`Formatted ${files.activeName}`);
  }, [files, value]);

  const save = useCallback(() => {
    files.takeSnapshot("Manual save");
    value.setStatusMessage("Snapshot saved");
  }, [files, value]);

  const items: CommandItem[] = useMemo(
    () => [
      {
        id: "run",
        label: "Run project",
        shortcut: "Ctrl/Cmd+Enter",
        group: "Project",
        onSelect: runNow,
      },
      {
        id: "format",
        label: "Format current file",
        shortcut: "Shift+Alt+F",
        group: "Edit",
        onSelect: format,
      },
      {
        id: "undo",
        label: "Undo",
        shortcut: "Ctrl/Cmd+Z",
        group: "Edit",
        onSelect: () => files.undo(),
      },
      {
        id: "redo",
        label: "Redo",
        shortcut: "Ctrl/Cmd+Shift+Z",
        group: "Edit",
        onSelect: () => files.redo(),
      },
      {
        id: "snapshot",
        label: "Save snapshot",
        shortcut: "Ctrl/Cmd+S",
        group: "Project",
        onSelect: save,
      },
      {
        id: "reset",
        label: "Reset project",
        group: "Project",
        onSelect: () => value.setStatusMessage("Reset not available — reload to restore autosave"),
      },
      {
        id: "wordwrap",
        label: "Toggle word wrap",
        shortcut: "Alt+Z",
        group: "View",
        onSelect: () => setSettings({ wordWrap: !settings.wordWrap }),
      },
      {
        id: "minimap",
        label: "Toggle minimap",
        shortcut: "Alt+M",
        group: "View",
        onSelect: () => setSettings({ minimap: !settings.minimap }),
      },
      {
        id: "brackets",
        label: "Toggle bracket colorization",
        group: "View",
        onSelect: () => setSettings({ bracketPairs: !settings.bracketPairs }),
      },
      {
        id: "sidebar",
        label: "Toggle sidebar",
        shortcut: "Ctrl/Cmd+B",
        group: "View",
        onSelect: () => layout.toggleSidebar(),
      },
      {
        id: "console",
        label: "Toggle console panel",
        shortcut: "Ctrl/Cmd+J",
        group: "View",
        onSelect: () => layout.toggleBottom(),
      },
      {
        id: "ai",
        label: layout.aiOpen ? "Hide AI assistant" : "Show AI assistant",
        shortcut: "Ctrl/Cmd+I",
        group: "View",
        onSelect: () => layout.toggleAi(),
      },
      {
        id: "fullscreen",
        label: "Fullscreen preview",
        shortcut: "Ctrl/Cmd+Shift+F",
        group: "View",
        onSelect: () => value.setFullscreen(!value.fullscreen),
      },
      {
        id: "font-up",
        label: "Increase editor font size",
        group: "View",
        onSelect: () => setSettings({ fontSize: Math.min(20, settings.fontSize + 1) }),
      },
      {
        id: "font-down",
        label: "Decrease editor font size",
        group: "View",
        onSelect: () => setSettings({ fontSize: Math.max(10, settings.fontSize - 1) }),
      },
      {
        id: "preview-theme",
        label: value.previewTheme === "dark" ? "Preview: light mode" : "Preview: dark mode",
        group: "Preview",
        onSelect: () => value.setPreviewTheme(value.previewTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "preview-rotate",
        label: value.rotate ? "Preview: unrotate device" : "Preview: rotate device",
        group: "Preview",
        onSelect: () => value.setRotate(!value.rotate),
      },
      {
        id: "preview-zoom-in",
        label: "Preview: zoom in",
        group: "Preview",
        onSelect: () => value.setZoom(Math.min(2, value.zoom + 0.25)),
      },
      {
        id: "preview-zoom-out",
        label: "Preview: zoom out",
        group: "Preview",
        onSelect: () => value.setZoom(Math.max(0.5, value.zoom - 0.25)),
      },
      {
        id: "export",
        label: "Export project…",
        group: "Share",
        children: EXPORT_FORMATS.map((format) => ({
          id: `export-${format}`,
          label: `Export as ${format.toUpperCase()}`,
          onSelect: () => {
            void exportFiles(files.files, format);
            value.setStatusMessage(`Exported ${format.toUpperCase()}`);
          },
        })),
      },
      {
        id: "share",
        label: "Copy share link",
        group: "Share",
        onSelect: () => {
          const payload = btoa(encodeURIComponent(JSON.stringify(files.files)));
          const url = `${window.location.origin}${window.location.pathname}?p=${encodeURIComponent(payload)}`;
          void navigator.clipboard?.writeText(url);
          value.setStatusMessage("Share link copied");
        },
      },
      {
        id: "add-bookmark",
        label: "Bookmark current line",
        group: "Project",
        onSelect: () => {
          files.addBookmark(1);
          value.setStatusMessage("Bookmark added");
        },
      },
      {
        id: "add-file",
        label: "New file…",
        group: "Project",
        onSelect: () => {
          const name = prompt("File name", `Untitled-${uid("f").slice(0, 6)}.tsx`);
          if (name) files.addFile(name, "");
        },
      },
    ],
    [runNow, format, save, files, layout, settings, setSettings, value]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const id = chordId(event.nativeEvent);
      if (!id) return;
      if (id === "command-palette") {
        event.preventDefault();
        value.setPaletteOpen(!value.paletteOpen);
        return;
      }
      if (id === "run") {
        event.preventDefault();
        runNow();
        return;
      }
      if (id === "format") {
        event.preventDefault();
        format();
        return;
      }
      if (id === "save") {
        event.preventDefault();
        save();
        return;
      }
      if (id === "undo") {
        event.preventDefault();
        files.undo();
        return;
      }
      if (id === "redo") {
        event.preventDefault();
        files.redo();
        return;
      }
      if (id === "toggle-sidebar") {
        event.preventDefault();
        layout.toggleSidebar();
        return;
      }
      if (id === "toggle-console") {
        event.preventDefault();
        layout.toggleBottom();
        return;
      }
      if (id === "toggle-ai") {
        event.preventDefault();
        layout.toggleAi();
        return;
      }
      if (id === "switch-preview") {
        event.preventDefault();
        value.setStatusMessage("Preview");
        return;
      }
      if (id === "switch-editor") {
        event.preventDefault();
        value.setStatusMessage("Editor");
        return;
      }
      if (id === "toggle-wordwrap") {
        event.preventDefault();
        setSettings({ wordWrap: !settings.wordWrap });
        return;
      }
      if (id === "toggle-minimap") {
        event.preventDefault();
        setSettings({ minimap: !settings.minimap });
        return;
      }
      if (id === "close-tab") {
        event.preventDefault();
        files.closeFile(files.activeName);
        return;
      }
      if (id === "fullscreen") {
        event.preventDefault();
        value.setFullscreen(!value.fullscreen);
      }
    },
    [runNow, format, save, files, layout, settings, setSettings, value]
  );

  return { items, handleKeyDown, shortcuts: SHORTCUTS };
}
