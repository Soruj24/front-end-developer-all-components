export const COMPASS_ROSE_SOURCE = `"use client";

const DIRS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

interface CompassRoseProps {
  heading?: number;
  size?: number;
  showLabels?: boolean;
  className?: string;
}

export function CompassRose({ heading = 0, size = 200, showLabels = true, className = "" }: CompassRoseProps) {
  return (
    <div className={\`relative \${className}\`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
        {[...Array(36)].map((_, i) => {
          const angle = (i * 10 - 90) * (Math.PI / 180);
          const isMajor = i % 9 === 0;
          const inner = isMajor ? 65 : 75;
          return (
            <line
              key={i}
              x1={100 + inner * Math.cos(angle)}
              y1={100 + inner * Math.sin(angle)}
              x2={100 + 80 * Math.cos(angle)}
              y2={100 + 80 * Math.sin(angle)}
              stroke="currentColor"
              strokeWidth={isMajor ? 1.5 : 0.5}
              className={isMajor ? "text-foreground" : "text-border"}
            />
          );
        })}
        {showLabels &&
          DIRS.map((d, i) => {
            const angle = (i * 45 - 90) * (Math.PI / 180);
            return (
              <text
                key={d}
                x={100 + 88 * Math.cos(angle)}
                y={100 + 88 * Math.sin(angle)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-[10px] font-bold"
              >
                {d}
              </text>
            );
          })}
        <g transform={\`rotate(\${heading} 100 100)\`}>
          <polygon points="100,15 94,55 100,45 106,55" className="fill-red-500" />
          <polygon points="100,185 94,145 100,155 106,145" className="fill-muted-foreground" />
        </g>
        <circle cx="100" cy="100" r="5" className="fill-foreground" />
        <circle cx="100" cy="100" r="2" className="fill-card" />
      </svg>
    </div>
  );
}`;

export const INTERACTIVE_EXAMPLE = `const [heading, setHeading] = useState(0);

<div className="flex items-center gap-8">
  <CompassRose heading={heading} />
  <input
    type="range"
    min={0}
    max={360}
    value={heading}
    onChange={(e) => setHeading(Number(e.target.value))}
  />
</div>`;

export const HEADING_EXAMPLE = `<div className="flex items-center justify-between">
  <div className="flex items-center gap-2">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
      <Compass className="h-4 w-4" />
    </div>
    <div>
      <p className="text-sm font-semibold">Heading</p>
      <p className="text-[10px] text-muted-foreground">Current direction</p>
    </div>
  </div>
  <p className="font-mono text-2xl font-bold tabular-nums">{heading}°</p>
</div>`;

export const NAV_EXAMPLE = `<button
  onClick={() => setCurrent("N")}
  className={current === "N" ? "bg-foreground/5" : "hover:bg-muted/30"}
>
  <ArrowUp className="h-5 w-5" />
  <span>N</span>
  <span className="text-[10px] text-muted-foreground/60">120m</span>
</button>`;

export const MINI_EXAMPLE = `<div className="flex gap-4">
  <CompassRose heading={45} size={64} />
  <CompassRose heading={45} size={48} />
  <CompassRose heading={45} size={40} />
</div>`;

export const GPS_EXAMPLE = `<div className="grid grid-cols-2 gap-3">
  <div className="rounded-lg bg-muted/50 p-3">
    <span className="text-[10px] font-medium text-muted-foreground">Latitude</span>
    <p className="font-mono text-sm font-bold tabular-nums">{lat.toFixed(4)}</p>
  </div>
  <div className="rounded-lg bg-muted/50 p-3">
    <span className="text-[10px] font-medium text-muted-foreground">Longitude</span>
    <p className="font-mono text-sm font-bold tabular-nums">{lng.toFixed(4)}</p>
  </div>
</div>`;

export const BEARING_EXAMPLE = `<div className="grid grid-cols-2 gap-3">
  <div className="rounded-lg border p-3 text-center">
    <span className="text-[10px] text-muted-foreground">Bearing</span>
    <p className="font-mono text-2xl font-bold">{bearing}°</p>
  </div>
  <div className="rounded-lg border p-3 text-center">
    <span className="text-[10px] text-muted-foreground">Distance</span>
    <p className="font-mono text-2xl font-bold">{distance}</p>
  </div>
</div>`;

export const WIND_EXAMPLE = `<svg viewBox="0 0 200 200" className="h-48 w-48">
  <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-border" />
  {directions.map((d, i) => {
    const angle = (i * 22.5 - 90) * (Math.PI / 180);
    const barLen = (d.speed / maxSpeed) * 70;
    return (
      <line
        key={d}
        x1={100 + (90 - barLen) * Math.cos(angle)}
        y1={100 + (90 - barLen) * Math.sin(angle)}
        x2={100 + 90 * Math.cos(angle)}
        y2={100 + 90 * Math.sin(angle)}
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        className="text-blue-500"
      />
    );
  })}
</svg>`;