"use client";

import { useState } from "react";

export function MortgageCalculator() {
  const [amount, setAmount] = useState("500000");
  const [downPayment, setDownPayment] = useState("20");
  const [rate, setRate] = useState("6.5");
  const [term, setTerm] = useState("30");

  const principal = parseFloat(amount) * (1 - parseFloat(downPayment) / 100);
  const monthlyRate = parseFloat(rate) / 100 / 12;
  const numPayments = parseFloat(term) * 12;
  const monthly =
    monthlyRate > 0 && numPayments > 0
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1)
      : 0;

  return (
    <div className="rounded-xl border border-border/50 bg-background p-5">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Mortgage Calculator
      </h3>
      <div className="flex flex-col gap-3">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Home Price</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Down %</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Rate %</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted-foreground">Loan Term</label>
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="15">15 years</option>
            <option value="20">20 years</option>
            <option value="30">30 years</option>
          </select>
        </div>
        <div className="rounded-lg bg-primary/5 p-4 text-center">
          <p className="text-xs text-muted-foreground">Monthly Payment</p>
          <p className="text-2xl font-bold text-primary">
            ${isFinite(monthly) ? monthly.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}
          </p>
        </div>
      </div>
    </div>
  );
}
