export type EggType = "soft" | "medium" | "hard" | "custom";

export const eggPresets: Record<EggType, { time: number; label: string; color: string; emoji: string }> = {
  soft: { time: 180, label: "Soft Boiled", color: "from-orange-400 to-orange-500", emoji: "🥚" },
  medium: { time: 300, label: "Medium", color: "from-amber-400 to-amber-500", emoji: "🥚" },
  hard: { time: 420, label: "Hard Boiled", color: "from-yellow-500 to-yellow-600", emoji: "🥚" },
  custom: { time: 0, label: "Custom", color: "from-gray-400 to-gray-500", emoji: "⏱️" },
};
