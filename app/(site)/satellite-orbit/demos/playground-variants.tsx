"use client";

export function BasicVariant() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative h-28 w-28">
        <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 shadow dark:bg-zinc-100" />
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/30" style={{ animation: "spin 4s linear infinite" }} />
      </div>
    </div>
  );
}

export function MultipleVariant() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative h-32 w-32">
        <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-5 rounded-full border border-zinc-200/60 dark:border-zinc-700/60" />
        <div className="absolute inset-10 rounded-full border border-zinc-200/30 dark:border-zinc-700/30" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 shadow dark:bg-zinc-100" />
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/30" style={{ animation: "spin 4s linear infinite" }} />
        <div className="absolute left-[85%] top-[30%] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/30" style={{ animation: "spin 6s linear infinite" }} />
        <div className="absolute left-[15%] top-[70%] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500 shadow-sm shadow-amber-500/30" style={{ animation: "spin 8s linear infinite reverse" }} />
      </div>
    </div>
  );
}

export function PathVariant() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative h-12 w-52 overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="absolute inset-x-3 bottom-1/2 h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-600" />
        <div className="absolute bottom-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-blue-500 shadow-sm shadow-blue-500/40" style={{ animation: "moveX 3s linear infinite", left: "12px" }} />
      </div>
    </div>
  );
}

export function InfoVariant() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative h-28 w-28">
        <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-5 rounded-full border border-zinc-200/60 dark:border-zinc-700/60" />
        <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 shadow dark:bg-zinc-100" />
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-sm" style={{ animation: "spin 4s linear infinite" }} />
        <div className="absolute left-[85%] top-[50%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 shadow-sm" style={{ animation: "spin 6s linear infinite" }} />
        <div className="absolute left-1/2 top-full h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500 shadow-sm" style={{ animation: "spin 5s linear infinite reverse" }} />
      </div>
    </div>
  );
}

export function ConfigurableVariant() {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="relative h-28 w-28">
        <div className="absolute inset-0 rounded-full border border-zinc-200 dark:border-zinc-700" />
        <div className="absolute inset-5 rounded-full border border-zinc-200/60 dark:border-zinc-700/60" />
        <div className="absolute inset-10 rounded-full border border-zinc-200/30 dark:border-zinc-700/30" />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900 shadow dark:bg-zinc-100" />
        <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500 shadow-sm" style={{ animation: "spin 3s linear infinite" }} />
        <div className="absolute left-[85%] top-[50%] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500 shadow-sm" style={{ animation: "spin 5s linear infinite" }} />
        <div className="absolute left-1/2 top-full h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500 shadow-sm" style={{ animation: "spin 7s linear infinite reverse" }} />
      </div>
    </div>
  );
}
