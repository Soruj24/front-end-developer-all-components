export const BLUETOOTH_SCANNER_SOURCE = `"use client";

import { useState } from "react";

interface Device {
  id: string;
  name: string;
  signal: number;
  connected: boolean;
}

interface BluetoothScannerProps {
  devices?: Device[];
}

export function BluetoothScanner({ devices = [] }: BluetoothScannerProps) {
  const [scanning, setScanning] = useState(false);
  const [found, setFound] = useState<Device[]>([]);

  const startScan = () => {
    setScanning(true);
    setFound([]);
    devices.forEach((device, i) => {
      setTimeout(() => setFound((prev) => [...prev, device]), (i + 1) * 350);
    });
    setTimeout(() => setScanning(false), devices.length * 350 + 200);
  };

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <span className="text-sm font-semibold">Bluetooth Scanner</span>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {found.length} found
        </span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {found.map((device) => (
          <div
            key={device.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{device.name}</p>
              <p className="font-mono text-[10px] text-muted-foreground">{device.id}</p>
            </div>
            <span className="text-xs font-medium tabular-nums">{device.signal}%</span>
            {device.connected && (
              <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600">
                CONNECTED
              </span>
            )}
          </div>
        ))}
        {found.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">No devices found</p>
        )}
      </div>
      <div className="border-t border-border p-4">
        <button
          onClick={startScan}
          disabled={scanning}
          className="w-full rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-wait disabled:opacity-60"
        >
          {scanning ? "Scanning..." : "Scan for Devices"}
        </button>
      </div>
    </div>
  );
}`;

export const SCANNER_EXAMPLE = `<BluetoothScanner
  onDeviceFound={(device) => console.log(device)}
  autoScan={false}
/>`;

export const SIGNAL_EXAMPLE = `<svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
  <circle
    cx="50" cy="50" r="45" fill="none" strokeWidth="6"
    className="text-muted" stroke="currentColor"
  />
  <circle
    cx="50" cy="50" r="45" fill="none" strokeWidth="6"
    strokeLinecap="round" strokeDasharray="282.7"
    strokeDashoffset={offset} stroke="currentColor"
    className={signal > 60 ? "text-emerald-500" : "text-yellow-500"}
  />
</svg>`;

export const CONNECTED_EXAMPLE = `<div className="flex items-center gap-3 px-4 py-3">
  <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-muted/30">
    <TypeIcon className="h-5 w-5 text-blue-500" />
  </div>
  <div className="flex-1">
    <span className="text-sm font-medium">{device.name}</span>
    <span className="text-[11px] text-muted-foreground">{device.battery}%</span>
  </div>
  <button className="rounded-lg border px-2.5 py-1.5 text-[11px]">Disconnect</button>
</div>`;

export const DETAIL_EXAMPLE = `<div className="grid grid-cols-2 gap-3">
  <div className="rounded-lg bg-muted/50 p-3">
    <span className="text-[10px] text-muted-foreground">Signal</span>
    <span className="text-sm font-bold">{device.signal}%</span>
  </div>
  <div className="rounded-lg bg-muted/50 p-3">
    <span className="text-[10px] text-muted-foreground">Battery</span>
    <span className="text-sm font-bold">{device.battery}%</span>
  </div>
</div>`;

export const HISTORY_EXAMPLE = `<div className="flex items-center gap-3 px-4 py-3">
  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/30">
    <TypeIcon className="h-4 w-4 text-blue-500" />
  </div>
  <div className="flex-1">
    <span className="text-sm font-medium">{device.name}</span>
    <p className="text-[11px] text-muted-foreground">{device.lastSeen}</p>
  </div>
  <button className="rounded-md bg-muted px-2.5 py-1.5 text-[11px]">Reconnect</button>
</div>`;