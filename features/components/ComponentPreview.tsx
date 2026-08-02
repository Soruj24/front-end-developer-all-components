"use client";

import { useState } from "react";
import type { RegistryComponent } from "@/features/registry";
import { DEFAULT_DEVICE_ID, getDevice } from "@/components/preview";
import type { DeviceId } from "@/components/preview";
import { DeviceSwitcher } from "@/components/preview/DeviceSwitcher";
import { PreviewFrame } from "@/components/preview/PreviewFrame";
import { LivePreview } from "./live-preview/LivePreview";

/** Frames the component preview as a browser window with a live render. */
export function ComponentPreview({ component }: { component: RegistryComponent }) {
  const [device, setDevice] = useState<DeviceId>(DEFAULT_DEVICE_ID);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background shadow-card">
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/30 px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warning/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/70" />
        </span>
        <span className="ml-2 min-w-0 flex-1 truncate font-mono text-[11px] text-muted-foreground">
          componentlibrary.dev/components/{component.slug}
        </span>
        <DeviceSwitcher device={device} onDeviceChange={setDevice} size="sm" />
        <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
          v{component.version}
        </span>
      </div>

      <div className="flex min-h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-muted/60 via-background to-muted/60 p-6">
        <PreviewFrame device={getDevice(device)}>
          <LivePreview component={component} />
        </PreviewFrame>
      </div>
    </div>
  );
}
