"use client";

import { useState } from "react";
import { ThumbsUp, Heart, Laugh, Smile, Meh, Frown, Star, Check } from "lucide-react";

export function PickerVariant() {
  const [sel, setSel] = useState<string | null>(null);
  const emojis = ["😀","😂","😍","🤔","😎","🥳","😢","😡","👍","❤️","🎉","🔥"];
  return (
    <div className="flex flex-wrap gap-1">
      {emojis.map((e) => <button key={e} onClick={() => setSel(e)} className={`flex h-9 w-9 items-center justify-center rounded-xl text-base transition-all active:scale-90 ${sel === e ? "bg-zinc-900 ring-2 ring-zinc-900 ring-offset-1 dark:bg-zinc-100 dark:ring-zinc-100" : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800"}`}>{e}</button>)}
    </div>
  );
}

export function ReactionVariant() {
  const [r, setR] = useState({ like: 5, love: 3, laugh: 0 });
  const t = (k: keyof typeof r) => setR((v) => ({ ...v, [k]: v[k] > 0 ? v[k] - 1 : v[k] + 1 }));
  return (
    <div className="flex gap-1.5">
      {[{ k: "like" as const, I: ThumbsUp, c: r.like }, { k: "love" as const, I: Heart, c: r.love }, { k: "laugh" as const, I: Laugh, c: r.laugh }].map((x) => (
        <button key={x.k} onClick={() => t(x.k)} className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all active:scale-95 ${x.c > 0 ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "border border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"}`}><x.I className="h-3.5 w-3.5" />{x.c}</button>
      ))}
    </div>
  );
}

export function MoodVariant() {
  const [m, setM] = useState<string | null>(null);
  const moods = [{ I: Smile, l: "Happy", c: "text-emerald-500" }, { I: Meh, l: "Neutral", c: "text-yellow-500" }, { I: Frown, l: "Sad", c: "text-blue-500" }];
  return (
    <div className="flex gap-2">
      {moods.map((x) => <button key={x.l} onClick={() => setM(m === x.l ? null : x.l)} className={`flex flex-col items-center gap-1.5 rounded-2xl border px-4 py-3 transition-all active:scale-95 ${m === x.l ? "border-zinc-900 bg-zinc-900 dark:border-zinc-100 dark:bg-zinc-100" : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-700 dark:bg-zinc-950"}`}><x.I className={`h-6 w-6 ${m === x.l ? "text-white dark:text-zinc-900" : x.c}`} /><span className={`text-[10px] font-medium ${m === x.l ? "text-white dark:text-zinc-900" : "text-zinc-500"}`}>{x.l}</span></button>)}
    </div>
  );
}

export function FeedbackVariant() {
  const [r, setR] = useState(0);
  const [done, setDone] = useState(false);
  if (done) return <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-800 dark:bg-emerald-950/30"><Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" /><span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Thank you!</span></div>;
  return (
    <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-950">
      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Rate your experience</p>
      <div className="flex gap-1">{[1,2,3,4,5].map((s) => <button key={s} onClick={() => setR(s)}><Star className={`h-5 w-5 transition-colors ${s <= r ? "fill-amber-400 text-amber-400" : "text-zinc-200 dark:text-zinc-700"}`} /></button>)}</div>
      <button onClick={() => r > 0 && setDone(true)} disabled={r === 0} className="rounded-xl bg-zinc-900 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.97] disabled:opacity-30 dark:bg-zinc-100 dark:text-zinc-900">Submit</button>
    </div>
  );
}

export function RatingVariant() {
  const [v, setV] = useState(0);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1.5">{["😫","😕","😐","🙂","🤩"].map((e, i) => <button key={i} onClick={() => setV(i)} className={`flex h-10 w-10 items-center justify-center rounded-2xl text-xl transition-all active:scale-90 ${v === i ? "scale-110 bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-100 opacity-40 hover:opacity-70 dark:bg-zinc-800"}`}>{e}</button>)}</div>
      <p className="text-[10px] text-zinc-500">Rating: {v + 1}/5</p>
    </div>
  );
}

export function ChatVariant() {
  const [s, setS] = useState<string[]>([]);
  const t = (e: string) => setS((v) => v.includes(e) ? v.filter((x) => x !== e) : [...v, e]);
  return (
    <div className="space-y-2">
      <div className="rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 dark:border-zinc-700 dark:bg-zinc-950"><p className="text-xs text-zinc-700 dark:text-zinc-300">Sample message</p></div>
      <div className="flex gap-1">{["👍","❤️","😂","😮","😢","🎉"].map((e) => <button key={e} onClick={() => t(e)} className={`flex h-7 items-center justify-center rounded-lg px-2 text-xs transition-all active:scale-90 ${s.includes(e) ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"}`}>{e}</button>)}</div>
    </div>
  );
}

export function SentimentVariant() {
  const [s, setS] = useState<"positive" | "neutral" | "negative">("positive");
  const cfg = { positive: { I: Smile, c: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" }, neutral: { I: Meh, c: "text-yellow-500", bg: "bg-yellow-50 dark:bg-yellow-950/30" }, negative: { I: Frown, c: "text-red-500", bg: "bg-red-50 dark:bg-red-950/30" } };
  const c = cfg[s];
  return (
    <div className="space-y-2">
      <div className={`flex items-center gap-2 rounded-xl ${c.bg} px-3 py-2`}><c.I className={`h-4 w-4 ${c.c}`} /><span className="text-xs font-medium capitalize text-zinc-900 dark:text-zinc-100">{s}</span></div>
      <div className="flex gap-1">{(["positive","neutral","negative"] as const).map((x) => <button key={x} onClick={() => setS(x)} className={`rounded-lg px-2.5 py-1 text-[10px] font-medium transition-all active:scale-95 ${s === x ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"}`}>{x}</button>)}</div>
    </div>
  );
}
