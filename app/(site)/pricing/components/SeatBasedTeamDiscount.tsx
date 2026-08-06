"use client";

import { useState } from "react";

export function SeatBasedTeamDiscount() {
  const [seatTierSeats, setSeatTierSeats] = useState(3);
  const tierDiscountSeats = seatTierSeats;
  let seatTierPrice: number;
  if (tierDiscountSeats <= 5) seatTierPrice = 19;
  else if (tierDiscountSeats <= 20) seatTierPrice = 15;
  else seatTierPrice = 12;
  const seatTierTotal = tierDiscountSeats * seatTierPrice;

  return (
    <div className="mx-auto max-w-md rounded-2xl border bg-white p-8 shadow-sm dark:border-border dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Seats</span>
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-lg font-bold text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">{tierDiscountSeats}</span>
      </div>
      <input type="range" min={1} max={50} value={tierDiscountSeats} onChange={(e) => setSeatTierSeats(Number(e.target.value))} className="mt-4 w-full accent-indigo-600" />
      <div className="mt-3 space-y-1 text-xs text-muted-foreground">
        <div className="flex justify-between"><span>1–5 seats</span><span>$19/seat</span></div>
        <div className="flex justify-between"><span>6–20 seats</span><span>$15/seat</span></div>
        <div className="flex justify-between"><span>21+ seats</span><span>$12/seat</span></div>
      </div>
      <div className="mt-4 rounded-lg bg-indigo-50 p-3 text-center text-sm dark:bg-indigo-950">
        <span className="font-semibold text-indigo-700 dark:text-indigo-200">Current tier: </span>
        {tierDiscountSeats <= 5 ? "$19/seat" : tierDiscountSeats <= 20 ? "$15/seat" : "$12/seat"}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-border pt-4 dark:border-border">
        <span className="text-sm font-medium">Total</span>
        <span className="text-3xl font-bold">${seatTierTotal}<span className="text-base font-normal text-muted-foreground">/mo</span></span>
      </div>
      <button className="mt-6 w-full rounded-xl bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700">Get Started</button>
    </div>
  );
}
