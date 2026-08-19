export const BOXPACKAGE_SOURCE = `"use client";

import { Package, Truck, CheckCircle } from "lucide-react";

interface BoxPackageProps {
  title: string;
  version?: string;
  variant?: "card" | "shipping" | "delivery";
  className?: string;
}

export function BoxPackage({ title, version, variant = "card", className = "" }: BoxPackageProps) {
  if (variant === "shipping") {
    return (
      <div className={"rounded-xl border border-border bg-card p-4 flex items-center gap-4 " + className}>
        <div className="h-16 w-16 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <Truck className="h-8 w-8 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1">
          <p className="font-medium text-sm">{title}</p>
          <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-2/3 rounded-full bg-primary" />
          </div>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">In Transit</span>
      </div>
    );
  }

  if (variant === "delivery") {
    return (
      <div className={"rounded-xl border border-border bg-card p-6 max-w-sm " + className}>
        <div className="flex items-center gap-3 mb-4">
          <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="font-medium text-sm">{title}</p>
            <p className="text-xs text-muted-foreground">Aug 15, 2024 · 2:30 PM</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Tracking</span><span className="font-mono">1Z999AA10123456784</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Recipient</span><span>John Doe</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className={"rounded-xl border border-border bg-card p-6 max-w-sm " + className}>
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        <Package className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">A modern React component library for building beautiful UIs.</p>
      <div className="flex items-center gap-3 mt-4 text-xs text-muted-foreground">
        {version && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">v{version}</span>}
        <span>MIT License</span>
      </div>
    </div>
  );
}`;