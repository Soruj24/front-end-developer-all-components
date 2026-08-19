"use client";

import { useState, useEffect } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  Battery,
  BatteryCharging,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  AlertTriangle,
  Clock,
  Zap,
} from "lucide-react";
import {
  BATTERY_INDICATOR_SOURCE,
  BAR_EXAMPLE,
  ICON_EXAMPLE,
  DASHBOARD_EXAMPLE,
  CHARGING_EXAMPLE,
  COMPACT_EXAMPLE,
  TIME_EXAMPLE,
  LIST_EXAMPLE,
  ALERT_EXAMPLE,
} from "./battery-indicator-source";

function getBatteryColor(level: number): string {
  if (level > 60) return "bg-emerald-500";
  if (level > 30) return "bg-yellow-500";
  return "bg-red-500";
}

function getBatteryTextColor(level: number): string {
  if (level > 60) return "text-emerald-600 dark:text-emerald-400";
  if (level > 30) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
}

function getBatteryBgColor(level: number): string {
  if (level > 60) return "bg-emerald-50 dark:bg-emerald-950";
  if (level > 30) return "bg-yellow-50 dark:bg-yellow-950";
  return "bg-red-50 dark:bg-red-950";
}

function getBatteryBorderColor(level: number): string {
  if (level > 60) return "border-emerald-200 dark:border-emerald-800";
  if (level > 30) return "border-yellow-200 dark:border-yellow-800";
  return "border-red-200 dark:border-red-800";
}

interface Device {
  name: string;
  type: "phone" | "laptop" | "headphones" | "watch";
  level: number;
  charging: boolean;
  icon: React.ComponentType<{ className?: string }>;
  lastSeen: string;
}

const devices: Device[] = [
  { name: "iPhone 16 Pro", type: "phone", level: 82, charging: false, icon: Smartphone, lastSeen: "Active now" },
  { name: "MacBook Pro", type: "laptop", level: 45, charging: true, icon: Laptop, lastSeen: "Charging" },
  { name: "AirPods Pro", type: "headphones", level: 12, charging: false, icon: Headphones, lastSeen: "3h ago" },
  { name: "Apple Watch", type: "watch", level: 67, charging: false, icon: Watch, lastSeen: "Active now" },
];

function BarIndicatorDemo() {
  const levels = [95, 72, 48, 25, 8];
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      {levels.map((level) => (
        <div key={level} className="flex items-center gap-3">
          <div className="relative h-5 w-24 overflow-hidden rounded-md border border-black/[.08] bg-muted dark:border-white/[.145]">
            <div
              className={`absolute inset-y-0 left-0 transition-all duration-500 ${getBatteryColor(level)}`}
              style={{ width: `${level}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold tabular-nums text-foreground/80">
              {level}%
            </span>
          </div>
          <span className={`text-xs font-medium tabular-nums ${getBatteryTextColor(level)}`}>{level}%</span>
        </div>
      ))}
    </div>
  );
}

function IconIndicatorDemo() {
  const levels = [90, 65, 35, 15, 5];
  return (
    <div className="flex gap-4">
      {levels.map((level) => {
        const Icon = level > 80 ? BatteryFull : level > 40 ? BatteryMedium : BatteryLow;
        return (
          <div key={level} className="flex flex-col items-center gap-2">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${getBatteryBgColor(level)} ${getBatteryBorderColor(level)} border`}>
              <Icon className={`h-6 w-6 ${getBatteryTextColor(level)}`} />
            </div>
            <span className="text-xs font-medium tabular-nums">{level}%</span>
          </div>
        );
      })}
    </div>
  );
}

function DeviceDashboardDemo() {
  return (
    <div className="w-full max-w-md rounded-xl border border-black/[.08] bg-card p-4 shadow-sm dark:border-white/[.145]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Connected Devices</h3>
        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          {devices.length} devices
        </span>
      </div>
      <div className="space-y-3">
        {devices.map((device) => {
          const IconComponent = device.level > 80 ? BatteryFull : device.level > 40 ? BatteryMedium : BatteryLow;
          return (
            <div key={device.name} className="flex items-center gap-3 rounded-lg border border-black/[.06] bg-muted/30 p-3 dark:border-white/[.08]">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${getBatteryBgColor(device.level)} ${getBatteryBorderColor(device.level)} border`}>
                <IconComponent className={`h-5 w-5 ${getBatteryTextColor(device.level)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{device.name}</span>
                  {device.charging && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                      <Zap className="h-2.5 w-2.5" />
                      CHARGING
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-muted-foreground">{device.lastSeen}</span>
              </div>
              <div className="text-right">
                <div className={`text-sm font-bold tabular-nums ${getBatteryTextColor(device.level)}`}>{device.level}%</div>
                <div className="relative mt-1 h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full transition-all ${getBatteryColor(device.level)}`}
                    style={{ width: `${device.level}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChargingAnimationDemo() {
  const [level, setLevel] = useState(23);
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    if (!charging) return;
    const interval = setInterval(() => {
      setLevel((l) => Math.min(100, l + 1));
    }, 120);
    return () => clearInterval(interval);
  }, [charging]);

  const estimatedTime = charging ? Math.ceil((100 - level) * 0.5) : null;

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-5 rounded-xl border border-black/[.08] bg-card p-6 shadow-sm dark:border-white/[.145]">
      <div className="relative h-12 w-40 overflow-hidden rounded-xl border-2 border-foreground/20">
        <div
          className={`absolute inset-y-0 left-0 transition-all duration-200 ${
            charging ? "bg-emerald-500" : getBatteryColor(level)
          }`}
          style={{ width: `${level}%` }}
        />
        {charging && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="h-5 w-5 text-white drop-shadow-md" />
          </div>
        )}
        <span className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums text-foreground drop-shadow-sm">
          {level}%
        </span>
      </div>
      <div className="text-center">
        <div className={`text-sm font-semibold ${getBatteryTextColor(level)}`}>
          {charging ? "Charging" : level < 20 ? "Low Battery" : "On Battery"}
        </div>
        {estimatedTime && (
          <div className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            ~{estimatedTime} min to full
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => { setCharging(true); setLevel(0); }}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-emerald-600"
        >
          <Zap className="h-3 w-3" />
          Charge
        </button>
        <button
          onClick={() => setCharging(false)}
          className="rounded-lg border border-black/[.08] bg-background px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-muted dark:border-white/[.145]"
        >
          Stop
        </button>
        <button
          onClick={() => { setCharging(false); setLevel(Math.max(0, level - 20)); }}
          className="flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-red-600"
        >
          <BatteryLow className="h-3 w-3" />
          Drain
        </button>
      </div>
    </div>
  );
}

function CompactInlineDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <div className="flex items-center justify-between rounded-lg border border-black/[.08] bg-card px-3 py-2 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">iPhone 16 Pro</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium tabular-nums">82%</span>
          <Battery className="h-4 w-4 text-emerald-500" />
        </div>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-black/[.08] bg-card px-3 py-2 shadow-sm dark:border-white/[.145]">
        <div className="flex items-center gap-2">
          <Laptop className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">MacBook Pro</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium tabular-nums">45%</span>
          <BatteryCharging className="h-4 w-4 text-emerald-500" />
        </div>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2 shadow-sm dark:border-red-800 dark:bg-red-950">
        <div className="flex items-center gap-2">
          <Headphones className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-700 dark:text-red-300">AirPods Pro</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium tabular-nums text-red-600 dark:text-red-400">12%</span>
          <BatteryLow className="h-4 w-4 text-red-500" />
        </div>
      </div>
    </div>
  );
}

function BatteryWithTimeDemo() {
  const [level, setLevel] = useState(68);

  const hours = Math.floor(level * 0.24);
  const minutes = Math.floor((level * 0.24 - hours) * 60);

  return (
    <div className="w-full max-w-sm rounded-xl border border-black/[.08] bg-card p-5 shadow-sm dark:border-white/[.145]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Laptop className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">MacBook Pro</span>
        </div>
        <span className={`text-sm font-bold tabular-nums ${getBatteryTextColor(level)}`}>{level}%</span>
      </div>
      <div className="mb-4">
        <div className="relative h-8 overflow-hidden rounded-lg border border-black/[.08] bg-muted dark:border-white/[.145]">
          <div
            className={`absolute inset-y-0 left-0 transition-all duration-500 ${getBatteryColor(level)}`}
            style={{ width: `${level}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold tabular-nums text-foreground/80">
            {level}%
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Time Remaining</span>
        </div>
        <span className="text-sm font-bold tabular-nums">
          {hours}h {minutes}m
        </span>
      </div>
      <div className="mt-3">
        <input
          type="range"
          min={0}
          max={100}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
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

function DeviceListDemo() {
  const deviceList = [
    { name: "Sarah's iPhone", level: 87, charging: false, icon: Smartphone, signal: "5G" },
    { name: "Office Laptop", level: 34, charging: true, icon: Laptop, signal: "WiFi" },
    { name: "AirPods Pro", level: 62, charging: false, icon: Headphones, signal: "BT" },
    { name: "Galaxy Watch", level: 18, charging: false, icon: Watch, signal: "BT" },
  ];

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-black/[.08] dark:border-white/[.145]">
      <div className="border-b border-black/[.08] bg-muted/30 px-4 py-3 dark:border-white/[.145]">
        <h3 className="text-sm font-semibold">Battery Status</h3>
      </div>
      <div className="divide-y divide-black/[.06] dark:divide-white/[.08]">
        {deviceList.map((device) => {
          const Icon = device.icon;
          return (
            <div key={device.name} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/30">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${getBatteryBgColor(device.level)} ${getBatteryBorderColor(device.level)} border`}>
                <Icon className={`h-4 w-4 ${getBatteryTextColor(device.level)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">{device.name}</div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{device.signal}</span>
                  <span>·</span>
                  <span>{device.charging ? "Charging" : "On battery"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative h-2 w-12 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full transition-all ${getBatteryColor(device.level)}`}
                    style={{ width: `${device.level}%` }}
                  />
                </div>
                <span className={`w-8 text-right text-xs font-bold tabular-nums ${getBatteryTextColor(device.level)}`}>
                  {device.level}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LowBatteryAlertDemo() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-xl border border-black/[.08] bg-card p-8 text-center shadow-sm dark:border-white/[.145]">
        <Battery className="h-8 w-8 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">Alert dismissed</p>
        <button
          onClick={() => setDismissed(false)}
          className="rounded-lg bg-muted px-3 py-1.5 text-xs font-medium hover:bg-muted/80"
        >
          Show Alert Again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-red-200 bg-red-50 shadow-sm dark:border-red-800 dark:bg-red-950">
      <div className="flex items-start gap-3 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-red-800 dark:text-red-200">Low Battery</h4>
          <p className="mt-0.5 text-xs text-red-600/80 dark:text-red-300/80">
            AirPods Pro battery is critically low. Charge now to avoid disconnection.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <div className="relative h-3 w-20 overflow-hidden rounded-full bg-red-100 dark:bg-red-900">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-red-500"
                style={{ width: "12%" }}
              />
            </div>
            <span className="text-xs font-bold text-red-600 dark:text-red-400">12%</span>
          </div>
        </div>
      </div>
      <div className="flex border-t border-red-200 dark:border-red-800">
        <button
          onClick={() => setDismissed(true)}
          className="flex-1 px-4 py-2.5 text-xs font-medium text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-900"
        >
          Dismiss
        </button>
        <div className="w-px bg-red-200 dark:bg-red-800" />
        <button className="flex-1 px-4 py-2.5 text-xs font-medium text-red-700 hover:bg-red-100 dark:text-red-300 dark:hover:bg-red-900">
          Find Device
        </button>
      </div>
    </div>
  );
}

export default function BatteryIndicatorPage() {
  return (
    <ComponentDocPage
      name="Battery Indicator"
      category="Data Display"
      description="Battery level display with animated charging states, color-coded thresholds, and multiple size variants."
    >
      <PreviewPanel filename="battery-indicator.tsx">
        <BarIndicatorDemo />
      </PreviewPanel>
      <SourceCodeViewer source={BATTERY_INDICATOR_SOURCE} filename="components/ui/BatteryIndicator/BatteryIndicator.tsx" defaultExpanded />
      <div className="flex flex-col gap-6">
        <ExampleBlock title="Bar Indicators" description="Horizontal bars with color-coded thresholds: green above 60%, yellow 30-60%, red below 30%." code={BAR_EXAMPLE}><BarIndicatorDemo /></ExampleBlock>
        <ExampleBlock title="Icon Indicators" description="Battery icons with colored backgrounds showing different charge levels." code={ICON_EXAMPLE}><IconIndicatorDemo /></ExampleBlock>
        <ExampleBlock title="Device Dashboard" description="Dashboard card showing all connected devices with battery levels and charging status." code={DASHBOARD_EXAMPLE}><DeviceDashboardDemo /></ExampleBlock>
        <ExampleBlock title="Charging Animation" description="Interactive demo with charge, stop, and drain controls plus estimated time." code={CHARGING_EXAMPLE}><ChargingAnimationDemo /></ExampleBlock>
        <ExampleBlock title="Compact Inline" description="Minimal inline battery display for status bars and device lists." code={COMPACT_EXAMPLE}><CompactInlineDemo /></ExampleBlock>
        <ExampleBlock title="With Time Remaining" description="Battery bar with estimated hours and minutes remaining, plus slider control." code={TIME_EXAMPLE}><BatteryWithTimeDemo /></ExampleBlock>
        <ExampleBlock title="Device List" description="Table-style list with device info, connection type, and mini progress bars." code={LIST_EXAMPLE}><DeviceListDemo /></ExampleBlock>
        <ExampleBlock title="Low Battery Alert" description="Warning banner for critically low battery with dismiss and find device actions." code={ALERT_EXAMPLE}><LowBatteryAlertDemo /></ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}