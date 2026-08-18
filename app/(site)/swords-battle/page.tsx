"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Swords, Shield, Target, Zap, Trophy, Users, Timer } from "lucide-react";

const installCommand = `npx component-library@latest add swords-battle`;
const usageCode = `<SwordsBattle players={playerData} />`;

function BattleCard() {
  const [health, setHealth] = useState(100);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Swords className="h-5 w-5 text-red-500" />
        <h3 className="font-medium">Battle Card</h3>
      </div>
      <div className="rounded-lg bg-gradient-to-br from-red-500 to-orange-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <span className="font-medium">Warrior</span>
          </div>
          <span className="text-sm">LVL 12</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Health</span>
            <span>{health}/100</span>
          </div>
          <div className="h-3 rounded-full bg-white/30">
            <div className="h-full rounded-full bg-white" style={{ width: `${health}%` }} />
          </div>
        </div>
        <button
          onClick={() => setHealth(Math.max(0, health - 10))}
          className="mt-4 w-full rounded-md bg-white/20 px-4 py-2 text-sm font-medium hover:bg-white/30 transition-colors"
        >
          Take Damage
        </button>
      </div>
    </div>
  );
}

function PlayerStats() {
  const [stats] = useState({ attack: 45, defense: 32, speed: 28, magic: 15 });

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="h-5 w-5 text-yellow-500" />
        <h3 className="font-medium">Player Stats</h3>
      </div>
      <div className="space-y-3">
        {Object.entries(stats).map(([stat, value]) => (
          <div key={stat} className="flex items-center gap-3">
            <span className="w-20 text-sm capitalize">{stat}</span>
            <div className="flex-1 h-2 rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-yellow-500"
                style={{ width: `${(value / 50) * 100}%` }}
              />
            </div>
            <span className="text-sm font-mono w-8 text-right">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GameTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Timer className="h-5 w-5 text-blue-500" />
        <h3 className="font-medium">Game Timer</h3>
      </div>
      <div className="text-center space-y-4">
        <p className="text-5xl font-mono font-bold">{formatTime(seconds)}</p>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setRunning(!running)}
            className={`rounded-md px-6 py-2 text-sm font-medium transition-colors ${
              running ? "bg-red-500 text-white" : "bg-green-500 text-white"
            }`}
          >
            {running ? "Stop" : "Start"}
          </button>
          <button
            onClick={() => { setSeconds(0); setRunning(false); }}
            className="rounded-md bg-muted px-6 py-2 text-sm font-medium hover:bg-muted/80"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

function ScoreBoard() {
  const [scores, setScores] = useState([
    { name: "Player 1", score: 150 },
    { name: "Player 2", score: 120 },
    { name: "Player 3", score: 90 },
  ]);

  const updateScore = (index: number, delta: number) => {
    setScores(scores.map((s, i) => i === index ? { ...s, score: Math.max(0, s.score + delta) } : s));
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Trophy className="h-5 w-5 text-yellow-500" />
        <h3 className="font-medium">Score Board</h3>
      </div>
      <div className="space-y-3">
        {scores.sort((a, b) => b.score - a.score).map((player, i) => (
          <div key={player.name} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <span className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
              i === 0 ? "bg-yellow-500 text-white" : i === 1 ? "bg-gray-400 text-white" : "bg-orange-600 text-white"
            }`}>
              {i + 1}
            </span>
            <span className="flex-1 font-medium">{player.name}</span>
            <span className="font-mono font-bold">{player.score}</span>
            <div className="flex gap-1">
              <button
                onClick={() => updateScore(scores.indexOf(player), 10)}
                className="h-6 w-6 rounded bg-green-500 text-white text-xs hover:bg-green-600"
              >
                +
              </button>
              <button
                onClick={() => updateScore(scores.indexOf(player), -10)}
                className="h-6 w-6 rounded bg-red-500 text-white text-xs hover:bg-red-600"
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatchResult() {
  const [result, setResult] = useState<"win" | "lose" | "draw" | null>(null);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Target className="h-5 w-5 text-purple-500" />
        <h3 className="font-medium">Match Result</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {(["win", "lose", "draw"] as const).map(r => (
            <button
              key={r}
              onClick={() => setResult(r)}
              className={`rounded-lg p-4 text-center font-medium transition-colors ${
                result === r
                  ? r === "win" ? "bg-green-500 text-white" : r === "lose" ? "bg-red-500 text-white" : "bg-yellow-500 text-white"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>
        {result && (
          <div className={`rounded-lg p-4 text-center ${
            result === "win" ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300" :
            result === "lose" ? "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300" :
            "bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300"
          }`}>
            <p className="text-lg font-bold capitalize">Match {result}!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TeamRoster() {
  const [team, setTeam] = useState([
    { name: "Alice", role: "Tank", ready: true },
    { name: "Bob", role: "Healer", ready: true },
    { name: "Charlie", role: "DPS", ready: false },
  ]);

  const toggleReady = (index: number) => {
    setTeam(team.map((m, i) => i === index ? { ...m, ready: !m.ready } : m));
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Users className="h-5 w-5 text-indigo-500" />
        <h3 className="font-medium">Team Roster</h3>
      </div>
      <div className="space-y-2">
        {team.map((member, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                {member.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
            <button
              onClick={() => toggleReady(i)}
              className={`rounded-md px-3 py-1 text-xs font-medium ${
                member.ready ? "bg-green-500 text-white" : "bg-muted"
              }`}
            >
              {member.ready ? "Ready" : "Not Ready"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BattleArena() {
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(100);
  const [log, setLog] = useState<string[]>([]);

  const attack = () => {
    const dmg = Math.floor(Math.random() * 20) + 5;
    const enemyDmg = Math.floor(Math.random() * 15) + 3;
    setEnemyHp(Math.max(0, enemyHp - dmg));
    setPlayerHp(Math.max(0, playerHp - enemyDmg));
    setLog([`You dealt ${dmg} damage`, `Enemy dealt ${enemyDmg} damage`, ...log.slice(0, 4)]);
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Swords className="h-5 w-5 text-red-500" />
        <h3 className="font-medium">Battle Arena</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-sm font-medium mb-2">You</p>
          <div className="h-3 rounded-full bg-muted">
            <div className="h-full rounded-full bg-green-500" style={{ width: `${playerHp}%` }} />
          </div>
          <p className="text-xs mt-1">{playerHp} HP</p>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium mb-2">Enemy</p>
          <div className="h-3 rounded-full bg-muted">
            <div className="h-full rounded-full bg-red-500" style={{ width: `${enemyHp}%` }} />
          </div>
          <p className="text-xs mt-1">{enemyHp} HP</p>
        </div>
      </div>
      <button
        onClick={attack}
        disabled={playerHp <= 0 || enemyHp <= 0}
        className="w-full rounded-md bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
      >
        Attack
      </button>
      <div className="mt-4 space-y-1">
        {log.map((entry, i) => (
          <p key={i} className="text-xs text-muted-foreground">{entry}</p>
        ))}
      </div>
    </div>
  );
}

export default function SwordsBattlePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Swords Battle</h1>
          <Badge variant="primary">Data Display</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A data display component for battle scenes with swords, health bars, attack animations, and combat statistics.
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

      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <ComponentPreview component="SwordsBattleCard" />
          <ComponentPreview component="SwordsBattlePlayerStats" />
          <ComponentPreview component="SwordsBattleTimer" />
          <ComponentPreview component="SwordsBattleScoreBoard" />
        </div>
        <ComponentPreview component="SwordsBattleMatchResult" />
        <div className="grid gap-6 md:grid-cols-2">
          <ComponentPreview component="SwordsBattleTeamRoster" />
          <ComponentPreview component="SwordsBattleArena" />
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
                <td className="px-4 py-3 font-mono text-xs">players</td>
                <td className="px-4 py-3 text-muted-foreground">Player[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showHealth</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">animated</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">variant</td>
                <td className="px-4 py-3 text-muted-foreground">{'"medieval" | "modern" | "fantasy"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"medieval"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
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
