export function AreaChart() {
  return (
    <div className="rounded-xl border border-border p-6 dark:border-border">
      <h2 className="mb-4 text-lg font-semibold">Area Chart</h2>
      <div className="relative h-40 w-full">
        <svg className="h-full w-full" viewBox="0 0 100 40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path d="M0 40 L0 32 L10 28 L20 30 L30 18 L40 24 L50 12 L60 16 L70 8 L80 14 L90 6 L100 10 L100 40 Z" fill="url(#areaGrad)" />
          <polyline points="0,32 10,28 20,30 30,18 40,24 50,12 60,16 70,8 80,14 90,6 100,10" fill="none" stroke="#6366f1" strokeWidth="2" />
          {[
            { x: 10, y: 28, label: "10" },
            { x: 50, y: 12, label: "50" },
            { x: 90, y: 6, label: "90" },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="2" fill="#6366f1" className="hover:r-3 cursor-pointer">
                <title>Value: {p.label}</title>
              </circle>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
