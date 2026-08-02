import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const nfMinimal: RegistryEntry = entry({
    id: "nf-minimal",
    title: "Minimal 404s",
    description: "Clean typographic 404 layouts: bold, card, and light-weight minimalist.",
    source: `export default function NfMinimal() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 p-6 text-center dark:border-zinc-800">
        <h1 className="text-7xl font-bold leading-none tracking-tighter text-zinc-900 dark:text-zinc-100">404</h1>
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Page not found</p>
        <button className="mt-5 rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-transform hover:scale-105 dark:bg-zinc-100 dark:text-zinc-900">Go Home</button>
      </div>
      <div className="flex items-center justify-center rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
        <div className="w-full max-w-[240px] rounded-2xl border-2 border-zinc-200 bg-white p-6 text-center shadow-xl dark:border-zinc-600 dark:bg-zinc-700">
          <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-100">404</h1>
          <div className="mx-auto my-3 h-px w-10 bg-zinc-300 dark:bg-zinc-500" />
          <p className="text-sm text-zinc-500 dark:text-zinc-300">This page doesn&apos;t exist</p>
          <button className="mt-4 inline-block w-full rounded-lg bg-zinc-900 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">Go Home</button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 p-6 text-center dark:border-zinc-800">
        <h1 className="text-3xl font-light tracking-widest text-zinc-400 dark:text-zinc-500">404</h1>
        <div className="mx-auto my-3 h-px w-8 bg-zinc-300 dark:bg-zinc-600" />
        <p className="text-xs font-light text-zinc-400 dark:text-zinc-500">this page doesn&apos;t exist</p>
        <button className="mt-5 text-xs tracking-widest text-zinc-400 underline underline-offset-4 transition-colors hover:text-zinc-700 dark:hover:text-zinc-200">HOME</button>
      </div>
    </div>
  );
}`,
  });
