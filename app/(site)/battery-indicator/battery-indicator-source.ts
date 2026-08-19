export const BATTERY_INDICATOR_SOURCE = `"use client";

interface BatteryIndicatorProps {
  level: number;
  charging?: boolean;
  showPercentage?: boolean;
}

export function BatteryIndicator({ level, charging = false, showPercentage = true }: BatteryIndicatorProps) {
  const clamped = Math.max(0, Math.min(100, level));
  const color =
    clamped > 60 ? "bg-emerald-500"
    : clamped > 30 ? "bg-yellow-500"
    : "bg-red-500";

  return (
    <div className="relative h-5 w-24 overflow-hidden rounded-md border border-border bg-muted">
      <div
        className={\`absolute inset-y-0 left-0 transition-all duration-500 \${charging ? "bg-emerald-500" : color}\`}
        style={{ width: \`\${clamped}%\` }}
      />
      {showPercentage && (
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold tabular-nums text-foreground/80">
          {clamped}%
        </span>
      )}
    </div>
  );
}`;

export const BAR_EXAMPLE = `<BatteryIndicator level={72} />
<BatteryIndicator level={48} />
<BatteryIndicator level={8} />`;

export const ICON_EXAMPLE = `<BatteryFull className="h-6 w-6 text-emerald-500" />
<BatteryMedium className="h-6 w-6 text-yellow-500" />
<BatteryLow className="h-6 w-6 text-red-500" />`;

export const DASHBOARD_EXAMPLE = `<div className="flex items-center gap-3 rounded-lg border p-3">
  <Icon className="h-5 w-5" />
  <div>
    <span>{device.name}</span>
    <span>{device.lastSeen}</span>
  </div>
  <BatteryIndicator level={device.level} charging={device.charging} />
</div>`;

export const CHARGING_EXAMPLE = `<BatteryIndicator level={level} charging={charging} />`;

export const COMPACT_EXAMPLE = `<div className="flex items-center gap-1.5">
  <span className="text-xs font-medium tabular-nums">82%</span>
  <Battery className="h-4 w-4 text-emerald-500" />
</div>`;

export const TIME_EXAMPLE = `<BatteryIndicator level={68} showPercentage />
<span className="tabular-nums">{hours}h {minutes}m</span>`;

export const LIST_EXAMPLE = `<div className="relative h-2 w-12 overflow-hidden rounded-full bg-muted">
  <div className={\`absolute inset-y-0 left-0 rounded-full \${color}\`}
    style={{ width: \`\${device.level}%\` }} />
</div>`;

export const ALERT_EXAMPLE = `<div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
  <AlertTriangle className="h-5 w-5 text-red-600" />
  <div>
    <h4 className="text-sm font-semibold text-red-800">Low Battery</h4>
    <p className="text-xs text-red-600/80">Charge now to avoid disconnection.</p>
  </div>
</div>`;