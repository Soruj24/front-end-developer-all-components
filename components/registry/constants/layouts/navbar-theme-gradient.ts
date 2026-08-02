import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarThemeGradient: RegistryEntry = entry({
    id: "navbar-theme-gradient",
    title: "Gradient, Glass & Overlay",
    description: "Gradient, glassmorphism, and transparent overlay navs.",
    source: `export default function NavbarThemeGradient() {
  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="flex h-10 w-full items-center justify-between rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 text-white">
        <span className="text-sm font-bold">Premium</span>
        <div className="flex gap-4 text-xs text-white/80">
          <span className="text-white">Home</span>
          <span>Products</span>
          <span>Support</span>
        </div>
        <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">Get Started</span>
      </nav>
      <div className="relative rounded-lg">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600" />
        <nav className="relative mx-2 my-2 flex h-9 items-center justify-between rounded-xl border border-white/20 bg-white/60 px-4 backdrop-blur-md">
          <span className="text-sm font-bold text-zinc-800">Glass</span>
          <div className="flex gap-4 text-xs text-zinc-600">
            <span className="font-medium text-zinc-900">Home</span>
            <span>About</span>
            <span>Contact</span>
          </div>
          <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white">Sign Up</span>
        </nav>
      </div>
      <div className="relative w-full rounded-lg">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
        <nav className="relative flex h-10 items-center justify-between px-4 text-white">
          <span className="text-sm font-bold">Overlay</span>
          <div className="flex gap-4 text-xs text-white/70">
            <span className="text-white">Home</span>
            <span>Work</span>
            <span>About</span>
          </div>
          <span className="rounded-full border border-white/30 px-3 py-1 text-xs text-white">Contact</span>
        </nav>
      </div>
    </div>
  );
}`,
  });
