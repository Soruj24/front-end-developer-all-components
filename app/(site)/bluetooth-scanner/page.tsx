"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Bluetooth, BluetoothSearching, BluetoothConnected, Wifi, WifiOff } from "lucide-react";

const installCommand = `npx component-library@latest add bluetooth-scanner`;
const usageCode = `import { BluetoothScanner } from "@/components/bluetooth-scanner";

<BluetoothScanner
  onDeviceFound={(device) => console.log(device)}
  autoScan={true}
/>`;

interface Device {
  id: string;
  name: string;
  signal: number;
  type: "audio" | "keyboard" | "mouse" | "sensor" | "unknown";
}

const mockDevices: Device[] = [
  { id: "AA:BB:CC:DD:EE:01", name: "AirPods Pro", signal: 85, type: "audio" },
  { id: "AA:BB:CC:DD:EE:02", name: "Magic Keyboard", signal: 72, type: "keyboard" },
  { id: "AA:BB:CC:DD:EE:03", name: "MX Master 3", signal: 60, type: "mouse" },
  { id: "AA:BB:CC:DD:EE:04", name: "Heart Rate Sensor", signal: 45, type: "sensor" },
  { id: "AA:BB:CC:DD:EE:05", name: "Bluetooth Speaker", signal: 30, type: "audio" },
];

function ScannerListDemo() {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);

  const startScan = () => {
    setScanning(true);
    setDevices([]);
    mockDevices.forEach((d, i) => {
      setTimeout(() => setDevices((prev) => [...prev, d]), (i + 1) * 400);
    });
    setTimeout(() => setScanning(false), mockDevices.length * 400 + 200);
  };

  const signalBars = (signal: number) => {
    const bars = Math.ceil(signal / 25);
    return (
      <div className="flex items-end gap-0.5 h-4">
        {[1, 2, 3, 4].map((b) => (
          <div
            key={b}
            className={`w-1 rounded-sm transition-colors ${b <= bars ? (signal > 60 ? "bg-emerald-500" : signal > 30 ? "bg-yellow-500" : "bg-red-500") : "bg-muted"}`}
            style={{ height: `${b * 25}%` }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <button
        onClick={startScan}
        disabled={scanning}
        className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          scanning ? "bg-primary/50 text-primary-foreground cursor-wait" : "bg-primary text-primary-foreground hover:bg-primary/90"
        }`}
      >
        {scanning ? <BluetoothSearching className="h-4 w-4 animate-spin" /> : <Bluetooth className="h-4 w-4" />}
        {scanning ? "Scanning..." : "Start Scan"}
      </button>
      <div className="flex flex-col gap-1 rounded-lg border bg-card">
        {devices.length === 0 && !scanning && (
          <div className="flex items-center justify-center p-6 text-sm text-muted-foreground">No devices found</div>
        )}
        {devices.map((d) => (
          <div key={d.id} className="flex items-center gap-3 border-b px-3 py-2 last:border-0">
            <BluetoothConnected className="h-4 w-4 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{d.name}</p>
              <p className="text-[10px] text-muted-foreground font-mono">{d.id}</p>
            </div>
            {signalBars(d.signal)}
            <span className="text-[10px] text-muted-foreground">{d.signal}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SignalMeterDemo() {
  const [signal, setSignal] = useState(75);
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="relative h-24 w-24">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
          <circle
            cx="50" cy="50" r="40" fill="none" strokeWidth="8"
            strokeDasharray={`${signal * 2.51} 251`}
            strokeLinecap="round"
            className="text-primary -rotate-90 origin-center transition-all duration-500"
            stroke="currentColor"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold">{signal}%</span>
        </div>
      </div>
      <input
        type="range" min={0} max={100} value={signal}
        onChange={(e) => setSignal(Number(e.target.value))}
        className="w-48 accent-primary"
      />
    </div>
  );
}

function DeviceTypeGridDemo() {
  const types: { type: Device["type"]; label: string; color: string }[] = [
    { type: "audio", label: "Audio", color: "bg-purple-500" },
    { type: "keyboard", label: "Keyboard", color: "bg-blue-500" },
    { type: "mouse", label: "Mouse", color: "bg-green-500" },
    { type: "sensor", label: "Sensor", color: "bg-orange-500" },
    { type: "unknown", label: "Other", color: "bg-gray-500" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {types.map((t) => (
        <div key={t.type} className="flex flex-col items-center gap-2 rounded-lg border bg-card p-3">
          <div className={`h-3 w-3 rounded-full ${t.color}`} />
          <span className="text-xs font-medium">{t.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function BluetoothScannerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Bluetooth Scanner</h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Bluetooth device discovery interface with signal strength indicators, device type classification, and scan controls.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Device Scanner</h2>
        <ComponentPreview>
          <ScannerListDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Signal Strength</h2>
        <ComponentPreview>
          <SignalMeterDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Device Types</h2>
        <ComponentPreview>
          <DeviceTypeGridDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">onDeviceFound</td><td className="px-4 py-3 text-muted-foreground">(device: Device) =&gt; void</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">Yes</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">autoScan</td><td className="px-4 py-3 text-muted-foreground">boolean</td><td className="px-4 py-3 text-muted-foreground">false</td><td className="px-4 py-3">No</td></tr>
              <tr className="border-b"><td className="px-4 py-3 font-mono text-xs">filter</td><td className="px-4 py-3 text-muted-foreground">DeviceType</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs">className</td><td className="px-4 py-3 text-muted-foreground">string</td><td className="px-4 py-3 text-muted-foreground">-</td><td className="px-4 py-3">No</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
