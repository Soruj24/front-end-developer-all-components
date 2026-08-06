export function RadarChart() {
  const plans = [
    { name: "Free", color: "fill-zinc-400/30 stroke-zinc-400", values: [20, 10, 20, 10, 15] },
    { name: "Pro", color: "fill-blue-400/30 stroke-blue-500", values: [80, 70, 80, 70, 90] },
    { name: "Enterprise", color: "fill-violet-400/30 stroke-violet-500", values: [100, 95, 100, 100, 100] },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8">
      {plans.map((plan) => (
        <div key={plan.name} className="text-center">
          <svg viewBox="0 0 120 120" className="h-32 w-32">
            <polygon points="60,5 107,32 107,88 60,115 13,88 13,32" className="fill-zinc-100 stroke-zinc-200 dark:fill-zinc-800 dark:stroke-zinc-700" />
            <polygon points="60,5 107,32 107,88 60,115 13,88 13,32" className={`${plan.color} opacity-60`} />
            <polygon
              points={`60,${5 + (100 - plan.values[0]) * 1.1} ${60 + plan.values[1] * 0.47},${32 + (100 - plan.values[1]) * 0.83} ${60 + plan.values[2] * 0.47},${88 - (100 - plan.values[2]) * 0.83} ${60},${115 - (100 - plan.values[3]) * 1.1} ${60 - plan.values[4] * 0.47},${88 - (100 - plan.values[4]) * 0.83}`}
              className={`${plan.color} fill-opacity-40 stroke-2`}
            />
            <text x="60" y="3" textAnchor="middle" className="fill-zinc-400 text-[5px]">Features</text>
            <text x="60" y="119" textAnchor="middle" className="fill-zinc-400 text-[5px]">Support</text>
            <text x="118" y="60" textAnchor="end" className="fill-zinc-400 text-[5px]">Scale</text>
            <text x="2" y="60" textAnchor="start" className="fill-zinc-400 text-[5px]">Price</text>
            <text x="60" y="60" textAnchor="middle" className="fill-zinc-400 text-[5px]">Speed</text>
          </svg>
          <p className="mt-1 text-xs font-medium">{plan.name}</p>
        </div>
      ))}
    </div>
  );
}
