"use client";

import { useEffect, useRef, useState } from "react";
import type { Preset } from "../types";

export interface PresetMenuProps {
  presets: Preset[];
  onSave: (name: string) => void;
  onApply: (id: string) => void;
  onDelete: (id: string) => void;
}

/** Dropdown to save the current values as a preset or apply/delete saved ones. */
export function PresetMenu({ presets, onSave, onApply, onDelete }: PresetMenuProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handle = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const save = () => {
    onSave(name);
    setName("");
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition-colors ${
          open
            ? "border-ring bg-muted text-foreground"
            : "border-input bg-background text-muted-foreground hover:text-foreground"
        }`}
      >
        <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v8m0 0 4-4m-4 4L8 6" />
          <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
        </svg>
        Presets
      </button>

      {open && (
        <div className="absolute right-0 z-30 mt-1 w-64 rounded-lg border border-border bg-card p-2 shadow-lg">
          <div className="mb-2 flex items-center gap-1.5">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") save();
              }}
              placeholder="Preset name…"
              className="h-7 min-w-0 flex-1 rounded-md border border-input bg-background px-2 text-xs text-foreground placeholder:text-subtle focus:border-ring focus:outline-none"
            />
            <button
              type="button"
              onClick={save}
              disabled={!name.trim()}
              className="h-7 rounded-md bg-foreground px-2 text-xs font-medium text-background disabled:opacity-40"
            >
              Save
            </button>
          </div>
          {presets.length === 0 ? (
            <p className="px-1 py-2 text-xs text-muted-foreground">No presets yet.</p>
          ) : (
            <ul className="max-h-48 space-y-0.5 overflow-y-auto">
              {presets.map((preset) => (
                <li
                  key={preset.id}
                  className="flex items-center justify-between gap-1 rounded px-1.5 py-1 hover:bg-muted"
                >
                  <button
                    type="button"
                    onClick={() => onApply(preset.id)}
                    className="min-w-0 flex-1 truncate text-left text-xs text-foreground"
                  >
                    {preset.name}
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete ${preset.name}`}
                    onClick={() => onDelete(preset.id)}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
