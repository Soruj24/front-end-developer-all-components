"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Sunrise, Sun, Cloud, Coffee, Calendar, Clock, Bell } from "lucide-react";

const installCommand = `npx component-library@latest add sunrise-morning`;
const usageCode = `<SunriseMorning time="06:30" animated />`;

function MorningRoutine() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Stretching", done: true },
    { id: 2, text: "Meditation", done: true },
    { id: 3, text: "Exercise", done: false },
    { id: 4, text: "Shower", done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Coffee className="h-5 w-5 text-amber-600" />
        <h3 className="font-medium">Morning Routine</h3>
      </div>
      <div className="space-y-2">
        {tasks.map(task => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`flex items-center gap-3 rounded-lg p-3 cursor-pointer transition-colors ${
              task.done ? "bg-green-50 dark:bg-green-950" : "bg-muted/50 hover:bg-muted"
            }`}
          >
            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
              task.done ? "border-green-500 bg-green-500" : "border-border"
            }`}>
              {task.done && <Sun className="h-3 w-3 text-white" />}
            </div>
            <span className={task.done ? "line-through text-muted-foreground" : ""}>{task.text}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {tasks.filter(t => t.done).length}/{tasks.length} completed
      </p>
    </div>
  );
}

function SunriseTimer() {
  const [minutes, setMinutes] = useState(15);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="h-5 w-5 text-orange-500" />
        <h3 className="font-medium">Sunrise Timer</h3>
      </div>
      <div className="text-center space-y-4">
        <div className="relative inline-flex items-center justify-center">
          <svg className="h-32 w-32 -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={2 * Math.PI * 56}
              strokeDashoffset={2 * Math.PI * 56 * (1 - minutes / 60)}
              className="text-orange-500"
            />
          </svg>
          <div className="absolute text-center">
            <p className="text-3xl font-bold">{minutes}</p>
            <p className="text-xs text-muted-foreground">min</p>
          </div>
        </div>
        <input
          type="range"
          min="1"
          max="60"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          className="w-full accent-orange-500"
        />
        <p className="text-sm text-muted-foreground">Sunrise duration</p>
      </div>
    </div>
  );
}

function WakeUpAlarm() {
  const [alarm, setAlarm] = useState("06:30");
  const [active, setActive] = useState(false);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Bell className="h-5 w-5 text-red-500" />
        <h3 className="font-medium">Wake Up Alarm</h3>
      </div>
      <div className="space-y-4">
        <div className="text-center">
          <input
            type="time"
            value={alarm}
            onChange={(e) => setAlarm(e.target.value)}
            className="text-4xl font-bold bg-transparent text-center border-none focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Sunrise className="h-4 w-4" />
          <span>Sunrise simulation at {alarm}</span>
        </div>
        <button
          onClick={() => setActive(!active)}
          className={`w-full rounded-md px-4 py-3 text-sm font-medium transition-colors ${
            active ? "bg-red-500 text-white" : "bg-muted hover:bg-muted/80"
          }`}
        >
          {active ? "Alarm Active" : "Set Alarm"}
        </button>
      </div>
    </div>
  );
}

function MorningWeather() {
  const [temp, setTemp] = useState(18);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Cloud className="h-5 w-5 text-blue-500" />
        <h3 className="font-medium">Morning Weather</h3>
      </div>
      <div className="rounded-lg bg-gradient-to-br from-orange-100 to-blue-100 dark:from-orange-950 dark:to-blue-950 p-6 text-center">
        <Sun className="mx-auto h-12 w-12 text-orange-500 mb-2" />
        <p className="text-3xl font-bold">{temp}°C</p>
        <p className="text-muted-foreground">Partly Cloudy</p>
        <div className="flex justify-center gap-4 mt-4 text-sm">
          <span>Wind: 12 km/h</span>
          <span>Humidity: 65%</span>
        </div>
      </div>
    </div>
  );
}

function CoffeeBreak() {
  const [cups, setCups] = useState(0);
  const maxCups = 4;

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Coffee className="h-5 w-5 text-amber-700" />
        <h3 className="font-medium">Coffee Break</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-center gap-2">
          {Array.from({ length: maxCups }, (_, i) => (
            <Coffee
              key={i}
              className={`h-8 w-8 cursor-pointer transition-colors ${
                i < cups ? "text-amber-700" : "text-muted"
              }`}
              onClick={() => setCups(i + 1)}
            />
          ))}
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{cups}/{maxCups}</p>
          <p className="text-sm text-muted-foreground">cups today</p>
        </div>
        <button
          onClick={() => setCups(0)}
          className="w-full rounded-md bg-muted px-4 py-2 text-sm font-medium hover:bg-muted/80"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function DayPlanner() {
  const [events, setEvents] = useState([
    { time: "07:00", title: "Morning Jog", icon: Sun },
    { time: "08:30", title: "Breakfast", icon: Coffee },
    { time: "09:00", title: "Team Standup", icon: Calendar },
    { time: "12:00", title: "Lunch Break", icon: Clock },
  ]);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Calendar className="h-5 w-5 text-purple-500" />
        <h3 className="font-medium">Day Planner</h3>
      </div>
      <div className="space-y-3">
        {events.map((event, i) => (
          <div key={i} className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <event.icon className="h-5 w-5 text-purple-500" />
            <div className="flex-1">
              <p className="text-sm font-medium">{event.title}</p>
              <p className="text-xs text-muted-foreground">{event.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MorningMood() {
  const [mood, setMood] = useState<string | null>(null);

  const moods = [
    { emoji: "😊", label: "Happy" },
    { emoji: "😴", label: "Tired" },
    { emoji: "🤔", label: "Neutral" },
    { emoji: "😤", label: "Energetic" },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Sun className="h-5 w-5 text-yellow-500" />
        <h3 className="font-medium">Morning Mood</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {moods.map(m => (
          <button
            key={m.label}
            onClick={() => setMood(m.label)}
            className={`rounded-lg border-2 p-4 text-center transition-all ${
              mood === m.label ? "border-yellow-500 bg-yellow-50 dark:bg-yellow-950" : "border-border hover:border-yellow-300"
            }`}
          >
            <span className="text-3xl">{m.emoji}</span>
            <p className="mt-1 text-sm font-medium">{m.label}</p>
          </button>
        ))}
      </div>
      {mood && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Feeling {mood.toLowerCase()} this morning
        </p>
      )}
    </div>
  );
}

export default function SunriseMorningPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Sunrise Morning</h1>
          <Badge variant="primary">Animation</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          An animation component for displaying sunrise scenes with horizon gradients, sun rise effects, and morning atmosphere.
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
          <ComponentPreview component="SunriseMorningRoutine" />
          <ComponentPreview component="SunriseMorningTimer" />
          <ComponentPreview component="SunriseMorningWakeUp" />
          <ComponentPreview component="SunriseMorningWeather" />
        </div>
        <ComponentPreview component="SunriseMorningCoffee" />
        <div className="grid gap-6 md:grid-cols-2">
          <ComponentPreview component="SunriseMorningPlanner" />
          <ComponentPreview component="SunriseMorningMood" />
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
                <td className="px-4 py-3 font-mono text-xs">time</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">{'"06:00"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">animated</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">duration</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">15</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">showClouds</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">true</td>
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
