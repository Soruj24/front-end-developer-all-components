import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const navbarFullDemo: RegistryEntry = entry({
    id: "navbar-full-demo",
    title: "Full Featured Navbar",
    description: "Search, dropdowns, notifications, avatar menu, and mobile menu in one bar.",
    source: `import { useState } from "react";

export default function NavbarFullDemo() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(3);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <nav className="flex h-11 w-full items-center justify-between rounded-lg border border-black/[.08] bg-white/80 px-4 backdrop-blur dark:border-white/[.145] dark:bg-black/80">
        <span className="text-sm font-bold">App</span>

        <div className="hidden items-center gap-1 sm:flex">
          {["Products", "Resources"].map((item) => (
            <div key={item} className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === item ? null : item)}
                className={\`flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors \${openDropdown === item ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100" : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"}\`}
              >
                {item}
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openDropdown === item && (
                <div className="absolute left-0 top-full mt-1 w-40 rounded-lg border border-black/[.08] bg-white py-1 shadow-lg dark:border-white/[.145] dark:bg-black">
                  {["Analytics", "Engagement", "Docs"].map((child) => (
                    <button key={child} onClick={() => setOpenDropdown(null)} className="block w-full px-3 py-1.5 text-left text-xs text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900">{child}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <span className="px-2.5 py-1.5 text-xs text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50">Pricing</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            onClick={() => setNotifCount(0)}
            className="relative flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {notifCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-danger text-[8px] font-bold text-white">{notifCount}</span>
            )}
          </button>
          <div className="relative hidden sm:block">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-[10px] font-bold text-white"
            >
              JD
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 rounded-lg border border-black/[.08] bg-white py-1 shadow-lg dark:border-white/[.145] dark:bg-black">
                {["Profile", "Settings", "Sign out"].map((opt) => (
                  <button key={opt} onClick={() => setUserMenuOpen(false)} className="block w-full px-3 py-1.5 text-left text-xs text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900">{opt}</button>
                ))}
              </div>
            )}
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="flex h-7 w-7 items-center justify-center rounded-md text-sm sm:hidden">
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="relative">
          <input autoFocus placeholder="Search..." className="w-full rounded-lg border border-black/[.08] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-300 dark:border-white/[.145] dark:bg-zinc-900 dark:focus:ring-zinc-600" />
        </div>
      )}

      {mobileOpen && (
        <div className="flex flex-col gap-1 rounded-lg border border-black/[.08] bg-white p-3 dark:border-white/[.145] dark:bg-black">
          {["Products", "Resources", "Pricing", "About"].map((item) => (
            <span key={item} className="rounded-md px-2 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400">{item}</span>
          ))}
          <hr className="my-1 border-black/[.08] dark:border-white/[.145]" />
          {["Profile", "Settings", "Sign out"].map((opt) => (
            <span key={opt} className="rounded-md px-2 py-1.5 text-xs text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400">{opt}</span>
          ))}
        </div>
      )}
    </div>
  );
}`,
  });
