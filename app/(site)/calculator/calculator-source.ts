export const CALCULATOR_SOURCE = `"use client";

import { useState } from "react";

const KEYS = ["C", "±", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+", "0", ".", "="];
const OPERATORS = ["÷", "×", "−", "+", "="];

export function Calculator() {
  const [display, setDisplay] = useState("0");

  const press = (key: string) => {
    if (key === "C") return setDisplay("0");
    if (key === "=") {
      const expr = display.replace(/[÷×]/g, (m) => (m === "÷" ? "/" : "*")).replace(/−/g, "-");
      try {
        setDisplay(String(new Function("return (" + expr + ");")()));
      } catch {
        setDisplay("Error");
      }
      return;
    }
    setDisplay(display === "0" ? key : display + key);
  };

  return (
    <div className="max-w-[240px] overflow-hidden rounded-xl border border-border bg-card">
      <div className="border-b border-border px-4 py-3 text-right">
        <p className="text-2xl font-light text-foreground">{display}</p>
      </div>
      <div className="grid grid-cols-4 gap-px bg-border">
        {KEYS.map((key) => (
          <button
            key={key}
            onClick={() => press(key)}
            className={
              "h-12 text-sm font-medium " +
              (OPERATORS.includes(key)
                ? "bg-primary text-primary-foreground"
                : key === "C" || key === "±" || key === "%"
                ? "bg-muted text-foreground"
                : "bg-card text-foreground hover:bg-muted/50")
            }
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}`;

export const BASIC_EXAMPLE = `<Calculator onResult={handleResult} />`;

export const COMPACT_EXAMPLE = `<div className="max-w-[180px] overflow-hidden rounded-lg border border-border bg-card">
  <div className="border-b border-border px-3 py-2 text-right text-lg font-light">42</div>
  <div className="grid grid-cols-3 gap-px bg-border">
    {["7", "8", "9", "4", "5", "6", "1", "2", "3"].map((btn) => (
      <button key={btn} className="h-9 text-xs font-medium bg-card hover:bg-muted/50">
        {btn}
      </button>
    ))}
  </div>
</div>`;

export const SCIENTIFIC_EXAMPLE = `const FUNCTIONS = ["sin", "cos", "tan", "π", "e", "x²", "x³", "√", "ln", "log"];

<div className="grid grid-cols-5 gap-px bg-border">
  {keys.map((btn) => (
    <button
      key={btn}
      className={
        "h-9 text-[11px] font-medium " +
        (btn === "="
          ? "bg-primary text-primary-foreground"
          : FUNCTIONS.includes(btn)
          ? "bg-muted text-muted-foreground"
          : "bg-card text-foreground hover:bg-muted/50")
      }
    >
      {btn}
    </button>
  ))}
</div>`;