"use client";

import { useEffect, useState } from "react";

export function TypewriterHero() {
  const words = ["developers", "designers", "teams", "startups"];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[index];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(word.slice(0, text.length + 1));
          if (text.length === word.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-6 rounded-xl border border-border bg-gradient-to-b from-zinc-50 to-white p-8 text-center dark:border-border dark:from-zinc-900 dark:to-black">
      <span className="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Typewriter Effect</span>
      <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
        Built for <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">{text}</span>
        <span className="ml-1 inline-block h-[1em] w-[3px] animate-pulse bg-emerald-500" />
      </h2>
      <p className="max-w-xl text-muted-foreground">Animated text that cycles through words, creating a dynamic and engaging headline.</p>
      <div className="flex gap-4">
        <button className="rounded-lg bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-700 dark:bg-foreground dark:text-background dark:hover:bg-muted">Get Started</button>
        <button className="rounded-lg border border-border px-6 py-3 font-medium text-muted-foreground hover:bg-muted dark:border-border dark:text-muted-foreground dark:hover:bg-muted">Learn More</button>
      </div>
    </div>
  );
}
