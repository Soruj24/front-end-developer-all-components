import { Shield } from "lucide-react";

const equipment = [
  { name: "Hard Hats", available: 24, inUse: 18, icon: "⛑️" },
  { name: "Safety Vests", available: 30, inUse: 22, icon: "🦺" },
  { name: "Gloves", available: 50, inUse: 35, icon: "🧤" },
  { name: "Goggles", available: 20, inUse: 12, icon: "🥽" },
];

export function SafetyEquipmentDemo() {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-black/[.08] bg-card shadow-sm overflow-hidden dark:border-white/[.145]">
        <div className="border-b border-black/[.06] px-4 py-3 dark:border-white/[.1]">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold">Safety Equipment</h3>
          </div>
        </div>
        <div className="p-4 space-y-3">
          {equipment.map((item) => (
            <div key={item.name} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-bold">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="h-1.5 flex-1 rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(item.inUse / item.available) * 100}%` }} />
                  </div>
                  <span className="text-[9px] text-muted-foreground">{item.inUse}/{item.available}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
