"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/design-system/Button";

interface SizeGuideProps {
  category: string;
  className?: string;
}

const sizeData: Record<string, { headers: string[]; rows: string[][] }> = {
  Clothing: {
    headers: ["Size", "Chest", "Waist", "Hips"],
    rows: [
      ["XS", '34-36"', '28-30"', '36-38"'],
      ["S", '36-38"', '30-32"', '38-40"'],
      ["M", '38-40"', '32-34"', '40-42"'],
      ["L", '40-42"', '34-36"', '42-44"'],
      ["XL", '42-44"', '36-38"', '44-46"'],
      ["XXL", '44-46"', '38-40"', '46-48"'],
    ],
  },
  Sports: {
    headers: ["Size", "US", "EU", "UK"],
    rows: [
      ["US 7", "7", "40", "6"],
      ["US 8", "8", "41", "7"],
      ["US 9", "9", "42", "8"],
      ["US 10", "10", "43", "9"],
      ["US 11", "11", "44", "10"],
      ["US 12", "12", "45", "11"],
    ],
  },
  Accessories: {
    headers: ["Size", "Dimensions", "Fits"],
    rows: [
      ["Small", '8" x 6"', "Small items"],
      ["Medium", '10" x 8"', "Medium items"],
      ["Large", '12" x 10"', "Large items"],
    ],
  },
};

export function SizeGuide({ category, className }: SizeGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const data = sizeData[category];

  if (!data) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-primary underline-offset-4 hover:underline"
      >
        Size Guide
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-4 z-50 mx-auto my-auto max-w-lg overflow-hidden rounded-2xl border border-border/50 bg-background shadow-2xl sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2">
            <div className="flex items-center justify-between border-b border-border/50 px-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">Size Guide - {category}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/50">
                    {data.headers.map((header) => (
                      <th
                        key={header}
                        className="pb-3 text-left font-medium text-muted-foreground"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row, i) => (
                    <tr key={i} className="border-b border-border/30 last:border-0">
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={cn(
                            "py-3",
                            j === 0 ? "font-medium text-foreground" : "text-muted-foreground"
                          )}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-xs text-muted-foreground">
                All measurements are in inches. If you&apos;re between sizes, we recommend sizing up.
              </p>
            </div>
            <div className="border-t border-border/50 px-6 py-4">
              <Button onClick={() => setIsOpen(false)} className="w-full">
                Got it
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
