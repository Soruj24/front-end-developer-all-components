"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Timer,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Bell,
  CheckCircle,
} from "lucide-react";

const installCommand = `npx shadcn@latest add timer-countdown`;

const usageCode = `import { TimerCountdown } from "@/components/timer-countdown";

export default function Demo() {
  return (
    <TimerCountdown
      initialTime={300}
      onComplete={() => console.log("Done!")}
    />
  );
}`;

function CountdownTimer() {
  const [time, setTime] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(300);
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Timer className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Countdown Timer</h3>
      </div>
      <div className="flex items-center justify-center py-8">
        <div className="text-6xl font-mono font-bold">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={toggleTimer}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground"
        >
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
      <div className="flex gap-2 justify-center">
        {[60, 180, 300, 600].map((t) => (
          <button
            key={t}
            onClick={() => { setTime(t); setIsRunning(false); }}
            className={`px-3 py-1 rounded-full text-sm ${
              time === t && !isRunning
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            {t / 60}m
          </button>
        ))}
      </div>
    </div>
  );
}

function PomodoroClock() {
  const [mode, setMode] = useState<"work" | "break">("work");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [sessions, setSessions] = useState(0);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const modes = {
    work: { duration: 25 * 60, label: "Focus Time", color: "text-red-500" },
    break: { duration: 5 * 60, label: "Short Break", color: "text-green-500" },
  };

  const switchMode = (newMode: "work" | "break") => {
    setMode(newMode);
    setTimeLeft(modes[newMode].duration);
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-orange-500" />
        <h3 className="font-semibold">Pomodoro Clock</h3>
      </div>
      <div className="flex gap-2 justify-center">
        {(["work", "break"] as const).map((m) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`px-4 py-2 rounded-md capitalize ${
              mode === m
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center py-8">
        <div className={`text-6xl font-mono font-bold ${modes[mode].color}`}>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
      </div>
      <div className="text-center text-muted-foreground">{modes[mode].label}</div>
      <div className="flex items-center justify-center gap-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span className="text-sm">{sessions} sessions completed</span>
      </div>
    </div>
  );
}

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  const addLap = () => {
    setLaps((prev) => [time, ...prev]);
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Timer className="h-5 w-5 text-blue-500" />
        <h3 className="font-semibold">Stopwatch</h3>
      </div>
      <div className="flex items-center justify-center py-8">
        <div className="text-5xl font-mono font-bold">
          {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}.
          {String(milliseconds).padStart(2, "0")}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground"
        >
          {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          onClick={addLap}
          disabled={!isRunning}
          className="px-4 py-2 rounded-md bg-secondary disabled:opacity-50"
        >
          Lap
        </button>
        <button
          onClick={() => { setIsRunning(false); setTime(0); setLaps([]); }}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-secondary"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </div>
      {laps.length > 0 && (
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {laps.map((lap, i) => (
            <div key={i} className="flex justify-between text-sm px-2 py-1 bg-muted rounded">
              <span>Lap {laps.length - i}</span>
              <span className="font-mono">
                {Math.floor(lap / 60000)}:{String(Math.floor((lap % 60000) / 1000)).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TimerPreset() {
  const [activePreset, setActivePreset] = useState("cooking");

  const presets = [
    { id: "cooking", name: "Cooking", time: 1800, icon: "🍳" },
    { id: "laundry", name: "Laundry", time: 2700, icon: "👕" },
    { id: "parking", name: "Parking", time: 3600, icon: "🚗" },
    { id: "study", name: "Study", time: 2400, icon: "📚" },
  ];

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m ${s}s`;
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-purple-500" />
        <h3 className="font-semibold">Timer Presets</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {presets.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePreset(p.id)}
            className={`p-4 rounded-lg border text-left transition-all ${
              activePreset === p.id
                ? "border-primary bg-primary/5"
                : "hover:border-primary/50"
            }`}
          >
            <div className="text-2xl mb-2">{p.icon}</div>
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-muted-foreground">{formatTime(p.time)}</div>
          </button>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-muted text-center">
        <div className="text-3xl font-mono font-bold">
          {formatTime(presets.find((p) => p.id === activePreset)?.time || 0)}
        </div>
        <div className="text-sm text-muted-foreground mt-1">Remaining</div>
      </div>
    </div>
  );
}

function ReminderTimer() {
  const [reminders, setReminders] = useState([
    { id: 1, text: "Take medication", time: "09:00", active: true },
    { id: 2, text: "Water plants", time: "18:00", active: false },
  ]);
  const [newReminder, setNewReminder] = useState("");

  const toggleReminder = (id: number) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r))
    );
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Bell className="h-5 w-5 text-yellow-500" />
        <h3 className="font-semibold">Reminder Timer</h3>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add reminder..."
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border bg-background text-sm"
        />
        <button
          onClick={() => {
            if (newReminder) {
              setReminders((prev) => [
                ...prev,
                { id: Date.now(), text: newReminder, time: "12:00", active: true },
              ]);
              setNewReminder("");
            }
          }}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm"
        >
          Add
        </button>
      </div>
      <div className="space-y-2">
        {reminders.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between p-3 rounded-lg border"
          >
            <div>
              <div className="font-medium">{r.text}</div>
              <div className="text-xs text-muted-foreground">{r.time}</div>
            </div>
            <button
              onClick={() => toggleReminder(r.id)}
              className={`w-12 h-6 rounded-full transition-colors ${
                r.active ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  r.active ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkoutTimer() {
  const [workout, setWorkout] = useState("hiit");

  const workouts = {
    hiit: { name: "HIIT", work: 30, rest: 10, rounds: 8 },
    tabata: { name: "Tabata", work: 20, rest: 10, rounds: 8 },
    emom: { name: "EMOM", work: 60, rest: 0, rounds: 10 },
  };

  const current = workouts[workout as keyof typeof workouts];

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Play className="h-5 w-5 text-green-500" />
        <h3 className="font-semibold">Workout Timer</h3>
      </div>
      <div className="flex gap-2">
        {Object.keys(workouts).map((w) => (
          <button
            key={w}
            onClick={() => setWorkout(w)}
            className={`px-3 py-1 rounded-full text-sm uppercase ${
              workout === w
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            {w}
          </button>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-muted space-y-3">
        <div className="font-medium text-center">{current.name} Workout</div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-2xl font-bold">{current.work}s</div>
            <div className="text-xs text-muted-foreground">Work</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{current.rest}s</div>
            <div className="text-xs text-muted-foreground">Rest</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{current.rounds}</div>
            <div className="text-xs text-muted-foreground">Rounds</div>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Total time: {Math.round(((current.work + current.rest) * current.rounds) / 60)} min
      </div>
    </div>
  );
}

function CookingTimer() {
  const [dishes, setDishes] = useState([
    { name: "Pasta", time: 600, remaining: 600, active: false },
    { name: "Rice", time: 900, remaining: 900, active: false },
  ]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="rounded-lg border bg-card p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-red-500" />
        <h3 className="font-semibold">Cooking Timers</h3>
      </div>
      <div className="space-y-3">
        {dishes.map((dish, i) => (
          <div key={dish.name} className="p-3 rounded-lg border flex items-center justify-between">
            <div>
              <div className="font-medium">{dish.name}</div>
              <div className="text-sm text-muted-foreground">
                {formatTime(dish.remaining)} remaining
              </div>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => {
                  setDishes((prev) =>
                    prev.map((d, idx) =>
                      idx === i ? { ...d, active: !d.active } : d
                    )
                  );
                }}
                className={`p-2 rounded-md ${
                  dish.active ? "bg-primary text-primary-foreground" : "bg-secondary"
                }`}
              >
                {dish.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button
                onClick={() => {
                  setDishes((prev) =>
                    prev.map((d, idx) =>
                      idx === i ? { ...d, remaining: d.time, active: false } : d
                    )
                  );
                }}
                className="p-2 rounded-md bg-secondary"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TimerCountdownPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline">Components</Badge>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Timer Countdown</h1>
        <p className="text-lg text-muted-foreground">
          Versatile timer components for productivity, cooking, workouts, and
          event countdowns.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Examples</h2>

        <ComponentPreview name="CountdownTimer">
          <CountdownTimer />
        </ComponentPreview>

        <ComponentPreview name="PomodoroClock">
          <PomodoroClock />
        </ComponentPreview>

        <ComponentPreview name="Stopwatch">
          <Stopwatch />
        </ComponentPreview>

        <ComponentPreview name="TimerPreset">
          <TimerPreset />
        </ComponentPreview>

        <ComponentPreview name="ReminderTimer">
          <ReminderTimer />
        </ComponentPreview>

        <ComponentPreview name="WorkoutTimer">
          <WorkoutTimer />
        </ComponentPreview>

        <ComponentPreview name="CookingTimer">
          <CookingTimer />
        </ComponentPreview>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-2 text-left font-medium">Prop</th>
                <th className="px-4 py-2 text-left font-medium">Type</th>
                <th className="px-4 py-2 text-left font-medium">Default</th>
                <th className="px-4 py-2 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">initialTime</td>
                <td className="px-4 py-2">number</td>
                <td className="px-4 py-2">300</td>
                <td className="px-4 py-2">Starting time in seconds</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">onComplete</td>
                <td className="px-4 py-2">{"() => void"}</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Callback when timer reaches zero</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">autoStart</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Start timer automatically</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 font-mono text-xs">showMilliseconds</td>
                <td className="px-4 py-2">boolean</td>
                <td className="px-4 py-2">false</td>
                <td className="px-4 py-2">Display milliseconds</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-mono text-xs">className</td>
                <td className="px-4 py-2">string</td>
                <td className="px-4 py-2">—</td>
                <td className="px-4 py-2">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
