"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DEFAULT_DEVICE_ID, getDevice } from "./devices";
import type { DeviceId, DevicePreset } from "./devices";
import { DeviceSwitcher } from "./DeviceSwitcher";
import { PreviewFrame } from "./PreviewFrame";
import { ComponentRenderer } from "./ComponentRenderer";
import { XIcon } from "./icons";

interface ExpandablePreviewProps {
  open: boolean;
  title: string;
  onClose: () => void;
  initialDevice?: DevicePreset;
  children: ReactNode;
}

/**
 * Fullscreen device preview. Portaled to <body>, locks scroll while open,
 * traps focus inside the dialog, and closes on Escape.
 */
export function ExpandablePreview({
  open,
  title,
  onClose,
  initialDevice,
  children,
}: ExpandablePreviewProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [device, setDevice] = useState<DeviceId>(
    initialDevice?.id ?? DEFAULT_DEVICE_ID
  );

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !containerRef.current) return;
      const els = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} preview`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <span className="shrink-0 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Preview
          </span>
          <span className="min-w-0 truncate font-medium">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <DeviceSwitcher device={device} onDeviceChange={setDevice} />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
        <PreviewFrame device={getDevice(device)} className="min-h-full">
          <ComponentRenderer className="min-h-full">{children}</ComponentRenderer>
        </PreviewFrame>
      </div>
    </div>,
    document.body
  );
}
