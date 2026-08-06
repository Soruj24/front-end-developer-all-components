"use client";

import { useState } from "react";
import { testimonials, categories } from "../data";
import { StarRating, Avatar, Badge } from "../helpers";

export function FilterTestimonials() {
  const [filter, setFilter] = useState<string>("All");

  const filtered = filter === "All" ? testimonials : testimonials.filter((t) => t.category === filter);

  return (
    <div>
      <div className="mb-6 flex justify-center gap-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition ${
              filter === c
                ? "bg-blue-500 text-white shadow"
                : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70 dark:hover:bg-muted"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6 shadow-sm transition hover:shadow-md dark:border-border dark:bg-zinc-900">
            <div className="flex items-start justify-between">
              <StarRating />
              <Badge label={t.category} />
            </div>
            <p className="flex-1 text-sm leading-relaxed text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3">
              <Avatar name={t.name} />
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground dark:text-muted-foreground/70">{t.title}, {t.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
