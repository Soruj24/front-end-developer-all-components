"use client";

import { ChevronRight, Plus, Settings, Download, Filter, MoreHorizontal } from "lucide-react";

export function BasicHeader() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <div className="border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-[11px] text-zinc-400 dark:text-zinc-500">
          <span className="hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">Home</span>
          <ChevronRight className="h-3 w-3" />
          <span className="hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">Components</span>
          <ChevronRight className="h-3 w-3" />
          <span className="font-medium text-zinc-700 dark:text-zinc-200">Zone Header</span>
        </div>
        <div className="mt-3 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Zone Header</h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">A header component for zone sections.</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">Cancel</button>
            <button className="rounded-xl bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WithActions() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Team Members</h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">Manage your team members and their roles.</p>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
              <Download className="h-3.5 w-3.5" />
              Export
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
              <Plus className="h-3.5 w-3.5" />
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WithTabs() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <div className="border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Settings</h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">Manage your account settings and preferences.</p>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
            <Settings className="h-3.5 w-3.5" />
            Settings
          </button>
        </div>
        <div className="mt-4 flex gap-1">
          {["General", "Security", "Notifications", "Billing"].map((tab, i) => (
            <button key={tab} className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${i === 0 ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"}`}>
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MinimalHeader() {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Dashboard</h2>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">Welcome back. Here's your overview.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-medium text-zinc-700 transition-all hover:bg-zinc-50 active:scale-95 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
            <Plus className="h-3.5 w-3.5" />
            New Widget
          </button>
        </div>
      </div>
    </div>
  );
}

export function WithBadge() {
  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-950">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Orders</h2>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400">Active</span>
              </div>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">Track and manage all customer orders.</p>
            </div>
          </div>
          <button className="rounded-xl bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200">
            View All
          </button>
        </div>
      </div>
    </div>
  );
}
