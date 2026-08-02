"use client";

import { useState } from "react";
import { NotFoundLayout, GoHomeButton } from "./NotFoundShell";
import { funFacts, jokes, quotes } from "./data";

export function Funny404() {
  return (
    <NotFoundLayout className="py-20">
      <span className="text-7xl">🏖️</span>
      <h1 className="mt-6 text-4xl font-bold text-amber-600 dark:text-amber-400">Oops!</h1>
      <p className="mt-3 text-xl text-muted-foreground">This page went on vacation</p>
      <p className="mt-1 text-sm text-muted-foreground/70">It didn&apos;t even leave a forwarding address.</p>
      <GoHomeButton className="mt-8 rounded-full bg-amber-500 px-8 py-3 text-sm font-medium text-white hover:bg-amber-600" />
    </NotFoundLayout>
  );
}

export function Construction404() {
  return (
    <NotFoundLayout className="py-20">
      <span className="text-7xl">🚧</span>
      <h1 className="mt-4 text-5xl font-bold text-amber-600 dark:text-amber-400">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">Under Construction</p>
      <p className="mt-1 text-sm text-muted-foreground/70">This page is being built. Check back later!</p>
      <div className="mt-6 flex gap-3 text-2xl">
        <span>🔨</span><span>🛠️</span><span>📐</span><span>🧱</span><span>🚜</span>
      </div>
      <GoHomeButton className="mt-8 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-600" />
    </NotFoundLayout>
  );
}

export function TeaTime404() {
  return (
    <NotFoundLayout
      className="py-20"
      style={{ background: "linear-gradient(180deg, #fef3c7 0%, #fff 100%)", borderRadius: "12px" }}
    >
      <span className="text-7xl">🍵</span>
      <h1 className="mt-4 text-4xl font-bold text-amber-800">Take a break</h1>
      <p className="mt-2 text-muted-foreground">The page you were looking for isn&apos;t here.</p>
      <p className="text-sm italic text-muted-foreground/70">Why not enjoy a cup of tea while you think about where to go next?</p>
      <GoHomeButton className="mt-8 rounded-lg bg-amber-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-amber-800" />
    </NotFoundLayout>
  );
}

export function FunFact404() {
  const [fact] = useState(() => funFacts[Math.floor(Math.random() * funFacts.length)]);
  return (
    <NotFoundLayout className="py-20">
      <h1 className="text-8xl font-bold text-zinc-200 dark:text-muted-foreground">404</h1>
      <p className="mt-2 text-muted-foreground">Page not found. But here&apos;s a fun fact:</p>
      <div className="mx-auto mt-6 max-w-md rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 p-5 dark:from-indigo-950 dark:to-purple-950">
        <p className="text-sm leading-relaxed text-muted-foreground">{fact}</p>
      </div>
      <GoHomeButton className="mt-8 rounded-lg bg-indigo-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-600" />
    </NotFoundLayout>
  );
}

export function Joke404() {
  const [joke] = useState(() => jokes[Math.floor(Math.random() * jokes.length)]);
  return (
    <NotFoundLayout className="py-20">
      <h1 className="text-8xl font-bold text-zinc-200 dark:text-muted-foreground">404</h1>
      <p className="mt-2 text-muted-foreground">Page missing. Have a joke instead:</p>
      <div className="mx-auto mt-6 max-w-md rounded-xl border border-dashed border-border p-5 dark:border-border">
        <p className="text-sm leading-relaxed text-muted-foreground">{joke}</p>
      </div>
      <GoHomeButton />
    </NotFoundLayout>
  );
}

export function Quote404() {
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);
  const [text, author] = quote.split("—").map((part) => part.trim());
  return (
    <NotFoundLayout className="py-20">
      <h1 className="text-8xl font-bold text-zinc-200 dark:text-muted-foreground">404</h1>
      <p className="mt-2 text-muted-foreground">Lost? Find your way with this:</p>
      <div className="mx-auto mt-6 max-w-lg">
        <p className="text-lg italic leading-relaxed text-muted-foreground dark:text-zinc-200">&ldquo;{text}&rdquo;</p>
        {author && <p className="mt-2 text-sm text-muted-foreground/70">&mdash; {author}</p>}
      </div>
      <GoHomeButton />
    </NotFoundLayout>
  );
}
