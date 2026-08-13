"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/cn";
import type { FlashSale } from "../types/ecommerce.types";

interface FlashSaleBannerProps {
  flashSale: FlashSale;
  className?: string;
}

function getTimeRemaining(endsAt: string) {
  const total = new Date(endsAt).getTime() - Date.now();
  if (total <= 0) return { hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
    expired: false,
  };
}

export function FlashSaleBanner({ flashSale, className }: FlashSaleBannerProps) {
  const [time, setTime] = useState(() => getTimeRemaining(flashSale.endsAt));
  const percentClaimed = Math.round((flashSale.claimedCount / flashSale.totalAvailable) * 100);
  const remaining = flashSale.totalAvailable - flashSale.claimedCount;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining(flashSale.endsAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [flashSale.endsAt]);

  if (time.expired) return null;

  return (
    <div className={cn("rounded-xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-4", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-red-600 uppercase tracking-wider">Flash Sale</p>
            <p className="text-xs text-muted-foreground">Hurry! Limited time offer</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[
              { value: time.hours, label: "HRS" },
              { value: time.minutes, label: "MIN" },
              { value: time.seconds, label: "SEC" },
            ].map((unit, i) => (
              <div key={unit.label} className="flex items-center gap-1">
                <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-red-500 text-white">
                  <span className="text-sm font-bold leading-none">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="text-[8px] leading-none opacity-80">{unit.label}</span>
                </div>
                {i < 2 && <span className="text-lg font-bold text-red-500">:</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground">{remaining} left at this price</p>
          <div className="mt-1 h-2 w-32 overflow-hidden rounded-full bg-red-100">
            <div
              className="h-full rounded-full bg-red-500 transition-all"
              style={{ width: `${percentClaimed}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
