"use client";

import { useState } from "react";
import { HardHat, Check } from "lucide-react";

const initialTasks = [
  { id: 1, label: "Frame walls", done: true },
  { id: 2, label: "Install electrical", done: true },
  { id: 3, label: "Drywall installation", done: false },
  { id: 4, label: "Paint interior", done: false },
  { id: 5, label: "Install fixtures", done: false },
];

export function ProjectTasksDemo() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggle = (id: number) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const completed = tasks.filter((t) => t.done).length;
  const pct = (completed / tasks.length) * 100;

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden dark:border-zinc-800 dark:bg-zinc-950">
        <div className="border-b border-zinc-100 px-5 py-3.5 dark:border-zinc-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800">
                <HardHat className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
              </div>
              <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Project Tasks</h3>
            </div>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">{completed}/{tasks.length}</span>
          </div>
        </div>
        <div className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-zinc-900 transition-all duration-300 ease-out dark:bg-white"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs font-medium tabular-nums text-zinc-500 dark:text-zinc-400">{Math.round(pct)}%</span>
          </div>
          <div className="space-y-1">
            {tasks.map((task) => (
              <button
                key={task.id}
                onClick={() => toggle(task.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-150 ${
                  task.done
                    ? "bg-zinc-50 dark:bg-zinc-900/30"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-900/30"
                }`}
              >
                <div className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] border transition-all duration-150 ${
                  task.done
                    ? "border-zinc-900 bg-zinc-900 dark:border-white dark:bg-white"
                    : "border-zinc-300 dark:border-zinc-700"
                }`}>
                  {task.done && <Check className="h-2.5 w-2.5 text-white dark:text-zinc-900" strokeWidth={3} />}
                </div>
                <span className={`text-[13px] ${task.done ? "text-zinc-400 line-through dark:text-zinc-500" : "font-medium text-zinc-900 dark:text-zinc-100"}`}>
                  {task.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
