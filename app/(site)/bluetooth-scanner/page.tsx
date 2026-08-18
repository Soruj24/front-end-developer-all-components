"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Bluetooth,
  BluetoothSearching,
  BluetoothConnected,
  BluetoothOff,
  Headphones,
  Keyboard,
  Mouse,
  Smartphone,
  Watch,
  Battery,
  Signal,
  RefreshCw,
  Check,
  Clock,
} from "lucide-react";

const installCommand = `npx component-library@latest add bluetooth-scanner`;
const usageCode = `import { BluetoothScanner } from "@/components/bluetooth-scanner";

<BluetoothScanner
  onDeviceFound={(device) => console.log(device)}
  autoScan={true}
/>`;

interface BluetoothDevice {
  id: string;
  name: string;
  signal: number;
  type: "audio" | "keyboard" | "mouse" | "sensor" | "wearable" | "phone";
  battery?: number;
  connected: boolean;
  paired: boolean;
  lastSeen?: string;
}

const mockDevices: BluetoothDevice[] = [
  { id: "AA:BB:CC:DD:EE:01", name: "AirPods Pro", signal: 85, type: "audio", battery: 78, connected: false, paired: true },
  { id: "AA:BB:CC:DD:EE:02", name: "Magic Keyboard", signal: 72, type: "keyboard", battery: 92, connected: true, paired: true },
  { id: "AA:BB:CC:DD:EE:03", name: "MX Master 3", signal: 60, type: "mouse", battery: 45, connected: true, paired: true },
  { id: "AA:BB:CC:DD:EE:04", name: "Apple Watch", signal: 55, type: "wearable", battery: 67, connected: false, paired: true, lastSeen: "2m ago" },
  { id: "AA:BB:CC:DD:EE:05", name: "Sony WH-1000XM5", signal: 48, type: "audio", battery: 34, connected: false, paired: false },
  { id: "AA:BB:CC:DD:EE:06", name: "iPhone 16 Pro", signal: 40, type: "phone", battery: 82, connected: false, paired: true, lastSeen: "5m ago" },
  { id: "AA:BB:CC:DD:EE:07", name: "Samsung Galaxy Buds", signal: 35, type: "audio", battery: 22, connected: false, paired: false },
  { id: "AA:BB:CC:DD:EE:08", name: "Logitech Combo Touch", signal: 28, type: "keyboard", battery: 58, connected: false, paired: false },
];

const deviceTypeConfig = {
  audio: { icon: Headphones, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950", border: "border-purple-200 dark:border-purple-800", label: "Audio" },
  keyboard: { icon: Keyboard, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950", border: "border-blue-200 dark:border-blue-800", label: "Keyboard" },
  mouse: { icon: Mouse, color: "text-green-500", bg: "bg-green-50 dark:bg-green-950", border: "border-green-200 dark:border-green-800", label: "Mouse" },
  sensor: { icon: Signal, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950", border: "border-orange-200 dark:border-orange-800", label: "Sensor" },
  wearable: { icon: Watch, color: "text-pink-500", bg: "bg-pink-50 dark:bg-pink-950", border: "border-pink-200 dark:border-pink-800", label: "Wearable" },
  phone: { icon: Smartphone, color: "text-cyan-500", bg: "bg-cyan-50 dark:bg-cyan-950", border: "border-cyan-200 dark:border-cyan-800", label: "Phone" },
};

function SignalBars({ signal }: { signal: number }) {
  const bars = Math.ceil(signal / 25);
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[1, 2, 3, 4].map((b) => (
        <div
          key={b}
          className={`w-1 rounded-sm transition-colors ${
            b <= bars
              ? signal > 60
                ? "bg-emerald-500"
                : signal > 30
                ? "bg-yellow-500"
                : "bg-red-500"
              : "bg-muted"
          }`}
          style={{ height: `${b * 25}%` }}
        />
      ))}
    </div>
  );
}

function ScannerListDemo() {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const startScan = () => {
    setScanning(true);
    setDevices([]);
    const filtered = filter === "all" ? mockDevices : mockDevices.filter((d) => d.type === filter);
    filtered.forEach((d, i) => {
      setTimeout(() => setDevices((prev) => [...prev, d]), (i + 1) * 350);
    });
    setTimeout(() => setScanning(false), filtered.length * 350 + 200);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-md rounded-xl border border-black/[.08] bg-card shadow-sm dark:border-white/[.145]">
      <div className="flex items-center justify-between border-b border-black/[.06] px-4 py-3 dark:border-white/[.08]">
        <div className="flex items-center gap-2">
          <Bluetooth className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold">Bluetooth Scanner</span>
        </div>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {devices.length} found
        </span>
      </div>
      <div className="flex gap-1.5 px-4">
        {["all", "audio", "keyboard", "mouse", "wearable"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors ${
              filter === type
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {type === "all" ? "All" : type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-1 px-4 pb-4">
        {devices.length === 0 && !scanning && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <BluetoothOff className="mb-2 h-8 w-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">No devices found</p>
            <p className="text-xs text-muted-foreground/70">Tap scan to discover nearby devices</p>
          </div>
        )}
        {scanning && devices.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <BluetoothSearching className="mb-2 h-8 w-8 animate-spin text-blue-500" />
            <p className="text-sm text-muted-foreground">Scanning for devices...</p>
          </div>
        )}
        {devices.map((d) => {
          const typeConf = deviceTypeConfig[d.type];
          const TypeIcon = typeConf.icon;
          return (
            <div
              key={d.id}
              className="flex items-center gap-3 rounded-lg border border-black/[.06] bg-muted/30 px-3 py-2.5 transition-colors hover:bg-muted/50 dark:border-white/[.08]"
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${typeConf.bg} ${typeConf.border} border`}>
                <TypeIcon className={`h-4 w-4 ${typeConf.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium truncate">{d.name}</span>
                  {d.connected && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                      <Check className="h-2.5 w-2.5" />
                      CONNECTED
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span className="font-mono">{d.id}</span>
                  {d.battery !== undefined && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-0.5">
                        <Battery className="h-2.5 w-2.5" />
                        {d.battery}%
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <SignalBars signal={d.signal} />
                <span className="w-8 text-right text-[10px] tabular-nums text-muted-foreground">{d.signal}%</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-black/[.06] px-4 py-3 dark:border-white/[.08]">
        <button
          onClick={startScan}
          disabled={scanning}
          className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            scanning
              ? "bg-blue-500/50 text-white cursor-wait"
              : "bg-blue-500 text-white hover:bg-blue-600 shadow-sm"
          }`}
        >
          {scanning ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Bluetooth className="h-4 w-4" />
          )}
          {scanning ? "Scanning..." : "Scan for Devices"}
        </button>
      </div>
    </div>
  );
}

function SignalMeterDemo() {
  const [signal, setSignal] = useState(75);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (signal / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative h-28 w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-muted"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className={`transition-all duration-500 ${
              signal > 60 ? "text-emerald-500" : signal > 30 ? "text-yellow-500" : "text-red-500"
            }`}
            stroke="currentColor"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold tabular-nums">{signal}%</span>
          <span className="text-[10px] text-muted-foreground">
            {signal > 60 ? "Excellent" : signal > 30 ? "Good" : "Weak"}
          </span>
        </div>
      </div>
      <div className="w-48">
        <input
          type="range"
          min={0}
          max={100}
          value={signal}
          onChange={(e) => setSignal(Number(e.target.value))}
          className="w-full accent-foreground"
        />
        <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}

function ConnectedDevicesDemo() {
  const connectedDevices = mockDevices.filter((d) => d.connected);

  return (
    <div className="w-full max-w-md rounded-xl border border-black/[.08] bg-card shadow-sm dark:border-white/[.145]">
      <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.08]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Connected Devices</span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            {connectedDevices.length} active
          </span>
        </div>
      </div>
      <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
        {connectedDevices.map((d) => {
          const typeConf = deviceTypeConfig[d.type];
          const TypeIcon = typeConf.icon;
          return (
            <div key={d.id} className="flex items-center gap-3 px-4 py-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${typeConf.bg} ${typeConf.border} border`}>
                <TypeIcon className={`h-5 w-5 ${typeConf.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium">{d.name}</span>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{typeConf.label}</span>
                  {d.battery !== undefined && (
                    <>
                      <span>·</span>
                      <span className="flex items-center gap-0.5">
                        <Battery className="h-3 w-3" />
                        {d.battery}%
                      </span>
                    </>
                  )}
                </div>
              </div>
              <button className="rounded-lg border border-black/[.08] px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground hover:bg-muted dark:border-white/[.145]">
                Disconnect
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DeviceDetailDemo() {
  const device = mockDevices[0];
  const typeConf = deviceTypeConfig[device.type];
  const TypeIcon = typeConf.icon;

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="flex items-center gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${typeConf.bg} ${typeConf.border} border shadow-sm`}>
          <TypeIcon className={`h-7 w-7 ${typeConf.color}`} />
        </div>
        <div>
          <h3 className="text-base font-semibold">{device.name}</h3>
          <p className="text-xs text-muted-foreground font-mono">{device.id}</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-muted/50 p-3">
          <div className="text-[10px] text-muted-foreground">Signal</div>
          <div className="mt-1 flex items-center gap-1.5">
            <SignalBars signal={device.signal} />
            <span className="text-sm font-bold">{device.signal}%</span>
          </div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <div className="text-[10px] text-muted-foreground">Battery</div>
          <div className="mt-1 flex items-center gap-1.5">
            <Battery className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-bold">{device.battery}%</span>
          </div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <div className="text-[10px] text-muted-foreground">Type</div>
          <div className="mt-1 text-sm font-medium">{typeConf.label}</div>
        </div>
        <div className="rounded-lg bg-muted/50 p-3">
          <div className="text-[10px] text-muted-foreground">Status</div>
          <div className="mt-1 text-sm font-medium text-emerald-600 dark:text-emerald-400">Paired</div>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-600">
          <BluetoothConnected className="h-4 w-4" />
          Connect
        </button>
        <button className="rounded-lg border border-black/[.08] px-4 py-2.5 text-sm font-medium hover:bg-muted dark:border-white/[.145]">
          Forget
        </button>
      </div>
    </div>
  );
}

function ScanHistoryDemo() {
  const historyDevices: (BluetoothDevice & { lastSeen: string })[] = [
    { ...mockDevices[0], lastSeen: "2 minutes ago" },
    { ...mockDevices[3], lastSeen: "5 minutes ago" },
    { ...mockDevices[5], lastSeen: "12 minutes ago" },
    { ...mockDevices[1], lastSeen: "1 hour ago" },
  ];

  return (
    <div className="w-full max-w-md rounded-xl border border-black/[.08] bg-card shadow-sm dark:border-white/[.145]">
      <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.08]">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-semibold">Scan History</span>
        </div>
      </div>
      <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
        {historyDevices.map((d) => {
          const typeConf = deviceTypeConfig[d.type];
          const TypeIcon = typeConf.icon;
          return (
            <div key={d.id} className="flex items-center gap-3 px-4 py-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${typeConf.bg}`}>
                <TypeIcon className={`h-4 w-4 ${typeConf.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium">{d.name}</span>
                <p className="text-[11px] text-muted-foreground">{d.lastSeen}</p>
              </div>
              <button className="rounded-md bg-muted px-2.5 py-1.5 text-[11px] font-medium hover:bg-muted/80">
                Reconnect
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BluetoothScannerPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Bluetooth Scanner
          </h1>
          <Badge variant="primary">Tools</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Bluetooth device discovery interface with signal strength indicators, device type
          classification, and scan controls.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Device Scanner</h3>
          <p className="text-sm text-muted-foreground">
            Full scanner with type filters, animated discovery, and signal strength bars.
          </p>
          <ComponentPreview id="bt-scanner">
            <ScannerListDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Signal Strength Meter</h3>
          <p className="text-sm text-muted-foreground">
            Circular gauge with color-coded signal quality and interactive slider.
          </p>
          <ComponentPreview id="bt-signal">
            <SignalMeterDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Connected Devices</h3>
          <p className="text-sm text-muted-foreground">
            List of currently active Bluetooth connections with battery and disconnect controls.
          </p>
          <ComponentPreview id="bt-connected">
            <ConnectedDevicesDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Device Detail</h3>
          <p className="text-sm text-muted-foreground">
            Expanded device info panel with signal, battery, type, and connect/forget actions.
          </p>
          <ComponentPreview id="bt-detail">
            <DeviceDetailDemo />
          </ComponentPreview>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-medium text-foreground">Scan History</h3>
          <p className="text-sm text-muted-foreground">
            Previously discovered devices with timestamps and quick reconnect buttons.
          </p>
          <ComponentPreview id="bt-history">
            <ScanHistoryDemo />
          </ComponentPreview>
        </div>
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
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">onDeviceFound</td>
                <td className="px-4 py-3 text-muted-foreground">{"(device: Device) => void"}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">autoScan</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">filter</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"all\" | \"audio\" | \"keyboard\" | \"mouse\" | \"wearable\""}</td>
                <td className="px-4 py-3 text-muted-foreground">{"\"all\""}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">scanInterval</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">5000</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showSignal</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showBattery</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
