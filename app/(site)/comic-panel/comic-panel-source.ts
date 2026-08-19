export const COMIC_PANEL_SOURCE = `"use client";

interface ComicPanelProps {
  layout?: "2x2" | "2x3";
  className?: string;
  children: React.ReactNode;
}

export function ComicPanel({ layout = "2x2", className = "", children }: ComicPanelProps) {
  const cols = layout === "2x3" ? 3 : 2;
  return (
    <div
      className={\`grid gap-1 overflow-hidden rounded-lg border-2 border-foreground \${className}\`}
      style={{ gridTemplateColumns: \`repeat(\${cols}, minmax(0, 1fr))\` }}
    >
      {children}
    </div>
  );
}`;

export const GRID_EXAMPLE = `<ComicPanel layout="2x2">
  <div className="bg-blue-100 p-4 text-center">The hero arrives</div>
  <div className="bg-green-100 p-4 text-center">A challenge appears</div>
  <div className="bg-yellow-100 p-4 text-center">The battle begins</div>
  <div className="bg-red-100 p-4 text-center">Victory!</div>
</ComicPanel>`;

export const SPEECH_EXAMPLE = `<div className="relative rounded-lg border-2 border-foreground bg-yellow-50 p-6 dark:bg-yellow-950/30">
  <div className="relative mb-4 max-w-[80%] rounded-xl border border-foreground/30 bg-white p-3 dark:bg-gray-800">
    <p className="text-sm">Hello there!</p>
    <div className="absolute -bottom-2 left-4 h-4 w-4 rotate-45 border-b border-r border-foreground/30 bg-white dark:bg-gray-800" />
  </div>
  <div className="relative ml-auto max-w-[80%] rounded-xl border border-foreground/30 bg-white p-3 dark:bg-gray-800">
    <p className="text-sm">General Kenobi!</p>
    <div className="absolute -bottom-2 right-4 h-4 w-4 rotate-45 border-b border-r border-foreground/30 bg-white dark:bg-gray-800" />
  </div>
</div>`;

export const ACTION_EXAMPLE = `<div className="space-y-1">
  <div className="rounded-lg border-2 border-foreground bg-red-100 p-4 text-center dark:bg-red-900/30">
    <p className="text-lg font-bold italic tracking-wider">POW!</p>
  </div>
  <div className="grid grid-cols-2 gap-1">
    <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-foreground bg-blue-100 p-4 text-center dark:bg-blue-900/30">
      <p className="text-sm font-bold italic">ZAP!</p>
    </div>
    <div className="flex aspect-square items-center justify-center rounded-lg border-2 border-foreground bg-green-100 p-4 text-center dark:bg-green-900/30">
      <p className="text-sm font-bold italic">WHAM!</p>
    </div>
  </div>
</div>`;