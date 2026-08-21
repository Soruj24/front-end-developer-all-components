"use client";

import { useState } from "react";
import { Rating } from "@/components/ui/Rating";

const labels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

export function DefaultDemo() {
  const [rating, setRating] = useState(3);
  return (
    <div className="flex flex-col gap-3">
      <Rating value={rating} onChange={setRating} />
      <span className="text-sm text-muted-foreground">
        {rating > 0 ? `${rating}/5 — ${labels[rating]}` : "Click to rate"}
      </span>
    </div>
  );
}

export function SizesDemo() {
  const [sm, setSm] = useState(3);
  const [md, setMd] = useState(4);
  const [lg, setLg] = useState(5);
  return (
    <div className="flex items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <Rating value={sm} onChange={setSm} size="sm" />
        <span className="text-xs text-muted-foreground">Small</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Rating value={md} onChange={setMd} size="md" />
        <span className="text-xs text-muted-foreground">Medium</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Rating value={lg} onChange={setLg} size="lg" />
        <span className="text-xs text-muted-foreground">Large</span>
      </div>
    </div>
  );
}

export function ColorsDemo() {
  const [rating, setRating] = useState(4);
  return (
    <div className="flex flex-col gap-4">
      {(["amber", "yellow", "emerald", "rose", "primary"] as const).map((c) => (
        <div key={c} className="flex items-center gap-3">
          <Rating value={rating} onChange={setRating} color={c} />
          <span className="text-xs text-muted-foreground capitalize">{c}</span>
        </div>
      ))}
    </div>
  );
}

export function ReadonlyDemo() {
  return (
    <div className="flex flex-col gap-3">
      {[
        { value: 5, label: "5.0 — Excellent" },
        { value: 4, label: "4.0 — Very Good" },
        { value: 3, label: "3.0 — Average" },
        { value: 0, label: "0.0 — Not rated" },
      ].map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <Rating value={item.value} />
          <span className="text-sm text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function ReviewCardDemo() {
  const [rating, setRating] = useState(0);
  return (
    <div className="w-full max-w-md rounded-xl border border-border/60 bg-background p-5">
      <h3 className="text-sm font-medium text-foreground">Write a Review</h3>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Your rating</span>
        <Rating value={rating} onChange={setRating} />
        {rating > 0 && (
          <span className="text-xs text-muted-foreground">{labels[rating]}</span>
        )}
      </div>
      <textarea
        placeholder="Share your experience..."
        className="mt-3 w-full rounded-lg border border-border/60 bg-muted/30 px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/40 focus:ring-2 focus:ring-primary/50"
        rows={3}
      />
      <button className="mt-3 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2">
        Submit Review
      </button>
    </div>
  );
}
