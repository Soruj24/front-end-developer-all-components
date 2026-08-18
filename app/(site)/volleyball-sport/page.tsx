"use client";

import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Volleyball } from "lucide-react";

const installCommand = `npx component-library@latest add volleyball-sport`;
const usageCode = `import { VolleyballSport } from "@/components/_volleyball-sport";

<VolleyballSport score={{ home: 21, away: 18 }} />`;

function ScoreBoard({ team, score, sets }: { team: string; score: number; sets: number }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-xs font-medium text-muted-foreground">{team}</p>
      <p className="text-4xl font-bold">{score}</p>
      <p className="text-xs text-muted-foreground">{sets} sets</p>
    </div>
  );
}

function StatBar({ label, home, away }: { label: string; home: number; away: number }) {
  const total = home + away || 1;
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-8 text-right font-mono text-xs">{home}</span>
      <div className="flex-1 overflow-hidden rounded-full bg-muted">
        <div className="h-2 rounded-full bg-primary" style={{ width: `${(home / total) * 100}%` }} />
      </div>
      <span className="w-20 text-center text-xs text-muted-foreground">{label}</span>
      <div className="flex-1 overflow-hidden rounded-full bg-muted">
        <div className="h-2 rounded-full bg-danger" style={{ width: `${(away / total) * 100}%` }} />
      </div>
      <span className="w-8 font-mono text-xs">{away}</span>
    </div>
  );
}

export default function VolleyballSportPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Volleyball Sport</h1>
          <Badge variant="primary">Visual</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Volleyball scoreboards, match stats, and game state displays.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Score Board</h2>
        <div className="flex items-center gap-8 rounded-lg border border-border p-6">
          <ScoreBoard team="Home" score={21} sets={2} />
          <div className="text-xl font-semibold text-muted-foreground">vs</div>
          <ScoreBoard team="Away" score={18} sets={1} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Match Statistics</h2>
        <div className="flex flex-col gap-3 rounded-lg border border-border p-4">
          <StatBar label="Aces" home={4} away={2} />
          <StatBar label="Blocks" home={6} away={5} />
          <StatBar label="Kills" home={18} away={14} />
          <StatBar label="Errors" home={8} away={11} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Set History</h2>
        <div className="flex gap-2">
          {[{ set: 1, w: true }, { set: 2, w: true }, { set: 3, w: false }].map((s) => (
            <div key={s.set} className={`rounded-lg border p-3 text-center ${s.w ? "border-success/30 bg-success/5" : "border-danger/30 bg-danger/5"}`}>
              <p className="text-xs text-muted-foreground">Set {s.set}</p>
              <p className={`text-sm font-medium ${s.w ? "text-success" : "text-danger"}`}>{s.w ? "W" : "L"}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">score</td>
                <td className="px-4 py-3 text-muted-foreground">{'{"{ home: number; away: number }"}'}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">sets</td>
                <td className="px-4 py-3 text-muted-foreground">{'{"{ home: number; away: number }"}'}</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
