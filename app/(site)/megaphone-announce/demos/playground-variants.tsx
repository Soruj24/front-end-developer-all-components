"use client";

import { useState } from "react";
import { Megaphone, Bell, Send, CheckCircle, AlertCircle, Info } from "lucide-react";

export function AnnouncementVariant() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return <div className="py-8 text-center"><button onClick={() => setDismissed(false)} className="text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100">Show again</button></div>;
  return (
    <div className="rounded-xl border border-zinc-200 bg-gradient-to-r from-zinc-50 to-white p-4 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"><Megaphone className="h-4 w-4" /></div>
          <div><p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">New Feature!</p><p className="text-xs text-zinc-500 dark:text-zinc-400">Dark mode launched.</p></div>
        </div>
        <button onClick={() => setDismissed(true)} className="rounded-md p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"><svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></button>
      </div>
      <div className="mt-3 flex gap-2"><button className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">Learn More</button><button onClick={() => setDismissed(true)} className="rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium dark:border-zinc-700">Dismiss</button></div>
    </div>
  );
}

export function AlertVariant() {
  const [alerts, setAlerts] = useState([{ id: 1, type: "warning" as const, msg: "Storage 80% full", active: true }, { id: 2, type: "info" as const, msg: "Maintenance tonight", active: true }]);
  const styles = { warning: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30", info: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30" };
  const colors = { warning: "text-amber-500", info: "text-blue-500" };
  return (
    <div className="space-y-1.5">
      {alerts.filter((a) => a.active).map((a) => (
        <div key={a.id} className={`flex items-center gap-2 rounded-xl border p-2.5 ${styles[a.type]}`}>
          <AlertCircle className={`h-3.5 w-3.5 shrink-0 ${colors[a.type]}`} />
          <span className="flex-1 text-xs text-zinc-700 dark:text-zinc-300">{a.msg}</span>
          <button onClick={() => setAlerts(alerts.map((x) => x.id === a.id ? { ...x, active: false } : x))} className="rounded p-0.5 text-zinc-400 hover:text-zinc-600"><svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg></button>
        </div>
      ))}
    </div>
  );
}

export function BroadcastVariant() {
  const [ch, setCh] = useState<"all" | "email">("all");
  const [sent, setSent] = useState(false);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-1.5">
        {(["all", "email"] as const).map((c) => <button key={c} onClick={() => setCh(c)} className={`rounded-lg py-1.5 text-xs font-medium capitalize transition-all ${ch === c ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"}`}>{c}</button>)}
      </div>
      <textarea className="w-full min-h-[60px] rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" placeholder="Message..." defaultValue="Maintenance tonight at 11 PM." />
      <button onClick={() => { setSent(true); setTimeout(() => setSent(false), 3000); }} disabled={sent} className={`w-full rounded-xl py-2 text-xs font-medium transition-all ${sent ? "bg-emerald-500 text-white" : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"}`}>{sent ? "Sent!" : "Broadcast"}</button>
    </div>
  );
}

export function PromotionVariant() {
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [copied, setCopied] = useState(false);
  const apply = () => { setDiscount(code === "SAVE20" ? 20 : code === "SAVE10" ? 10 : 0); };
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-purple-200 bg-purple-50 p-3 dark:border-purple-800 dark:bg-purple-950/30">
        <span className="inline-flex rounded-full bg-purple-600 px-2 py-0.5 text-[10px] font-bold uppercase text-white">Limited</span>
        <p className="mt-1 text-sm font-bold text-zinc-900 dark:text-zinc-100">20% OFF!</p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 font-mono text-xs dark:border-zinc-700 dark:bg-zinc-900">SAVE20</div>
          <button onClick={() => { navigator.clipboard.writeText("SAVE20"); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="rounded-lg bg-zinc-900 px-2.5 py-1.5 text-[10px] font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">{copied ? "Copied!" : "Copy"}</button>
        </div>
        {discount > 0 && <p className="mt-1.5 text-[10px] font-medium text-emerald-600">{discount}% applied!</p>}
      </div>
      <div className="flex gap-2">
        <input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="Promo code" className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100" />
        <button onClick={apply} className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white dark:bg-zinc-100 dark:text-zinc-900">Apply</button>
      </div>
    </div>
  );
}

export function NewsVariant() {
  const [breaking, setBreaking] = useState(true);
  const news = [{ t: "Climate Agreement Reached", cat: "World" }, { t: "Tech Stocks Rally", cat: "Business" }];
  return (
    <>
      {breaking && <div className="mb-2 animate-pulse rounded-xl border border-red-200 bg-red-50 p-2.5 dark:border-red-800 dark:bg-red-950/30"><div className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-red-500" /><span className="text-[10px] font-bold uppercase text-red-600">Breaking</span></div><p className="mt-0.5 text-xs font-medium text-zinc-900 dark:text-zinc-100">Revolutionary AI product announced</p></div>}
      <div className="space-y-1">{news.map((n, i) => <div key={i} className="flex items-start gap-2 rounded-lg p-1.5 hover:bg-zinc-50 dark:hover:bg-zinc-900"><div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-900 dark:bg-zinc-100" /><div><p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{n.t}</p><span className="inline-flex rounded-full border border-zinc-200 px-1.5 py-0.5 text-[9px] dark:border-zinc-700">{n.cat}</span></div></div>)}</div>
    </>
  );
}

export function StatusVariant() {
  const [s, setS] = useState<"online" | "away" | "busy">("online");
  const ss = [{ v: "online" as const, l: "Online", c: "bg-emerald-500" }, { v: "away" as const, l: "Away", c: "bg-amber-500" }, { v: "busy" as const, l: "Busy", c: "bg-red-500" }];
  return (
    <div className="flex items-center gap-3">
      <div className="relative"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800"><span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">JD</span></div><div className={`absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-zinc-950 ${ss.find((x) => x.v === s)?.c}`} /></div>
      <div className="flex gap-1">{ss.map((x) => <button key={x.v} onClick={() => setS(x.v)} className={`rounded-lg px-2 py-1 text-[10px] font-medium capitalize transition-all ${s === x.v ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"}`}>{x.l}</button>)}</div>
    </div>
  );
}

export function EventVariant() {
  const [events, setEvents] = useState([{ id: 1, title: "Standup", time: "9:00", on: true }, { id: 2, title: "Demo", time: "2:00", on: false }]);
  return (
    <div className="space-y-1.5">{events.map((e) => <div key={e.id} className="flex items-center gap-2.5 rounded-xl border border-zinc-200 p-2.5 dark:border-zinc-800"><div className="w-10 text-center"><p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{e.time}</p></div><p className="flex-1 text-xs font-medium text-zinc-900 dark:text-zinc-100">{e.title}</p><button onClick={() => setEvents(events.map((x) => x.id === e.id ? { ...x, on: !x.on } : x))} className={`rounded-lg p-1.5 transition-all ${e.on ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800"}`}><Bell className="h-3 w-3" /></button></div>)}</div>
  );
}
