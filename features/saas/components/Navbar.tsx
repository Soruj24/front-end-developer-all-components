import { navItems } from "../constants/saas-data";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white/80 px-6 py-3 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600" />
        <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">FlowState</span>
      </div>
      <div className="hidden items-center gap-6 md:flex">
        {navItems.map((item) => (
          <a key={item} href="#" className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">{item}</a>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">Sign In</button>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Get Started</button>
      </div>
    </nav>
  );
}
