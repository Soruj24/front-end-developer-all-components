"use client";

export function TwoByTwoGridDemo() {
  const panels = [
    { bg: "bg-blue-100 dark:bg-blue-900/30", text: "The hero arrives" },
    { bg: "bg-green-100 dark:bg-green-900/30", text: "A challenge appears" },
    { bg: "bg-yellow-100 dark:bg-yellow-900/30", text: "The battle begins" },
    { bg: "bg-red-100 dark:bg-red-900/30", text: "Victory!" },
  ];
  return (
    <div className="w-full p-4">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-1 overflow-hidden rounded-lg border-2 border-foreground">
        {panels.map((panel, i) => (
          <div key={i} className={`${panel.bg} flex aspect-square items-center justify-center border border-foreground/20 p-4`}>
            <p className="text-center text-sm font-medium">{panel.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SpeechBubblesDemo() {
  return (
    <div className="w-full p-4">
      <div className="mx-auto max-w-sm">
        <div className="relative rounded-lg border-2 border-foreground bg-yellow-50 p-6 dark:bg-yellow-950/30">
          <div className="relative mb-4 max-w-[80%] rounded-xl border border-foreground/30 bg-white p-3 dark:bg-gray-800">
            <p className="text-sm">Hello there!</p>
            <div className="absolute -bottom-2 left-4 h-4 w-4 rotate-45 border-b border-r border-foreground/30 bg-white dark:bg-gray-800" />
          </div>
          <div className="relative ml-auto max-w-[80%] rounded-xl border border-foreground/30 bg-white p-3 dark:bg-gray-800">
            <p className="text-sm">General Kenobi!</p>
            <div className="absolute -bottom-2 right-4 h-4 w-4 rotate-45 border-b border-r border-foreground/30 bg-white dark:bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ActionPanelsDemo() {
  return (
    <div className="w-full p-4">
      <div className="mx-auto max-w-md space-y-1">
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
      </div>
    </div>
  );
}