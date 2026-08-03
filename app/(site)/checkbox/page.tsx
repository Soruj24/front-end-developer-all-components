"use client";

import { useState } from "react";
import { Checkbox } from "@/components/_checkbox";
import { ComponentPreview } from "@/components/preview";

const sizes = ["sm", "md", "lg"] as const;
const variants = ["default", "outline", "ghost"] as const;

export default function CheckboxPage() {
  const [terms, setTerms] = useState(false);
  const [features, setFeatures] = useState({ notifications: true, marketing: false, updates: true });
  const [allChecked, setAllChecked] = useState(false);

  function toggleAll() {
    const next = !allChecked;
    setAllChecked(next);
    setFeatures({ notifications: next, marketing: next, updates: next });
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Checkbox</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A control that allows the user to toggle between checked and not checked.
          Use checkboxes for binary on/off options or to select multiple items from a list.
        </p>
      </header>

      <ComponentPreview id="checkbox-default">
        <div className="flex flex-col gap-3">
          <Checkbox label="Accept terms and conditions" />
          <Checkbox label="Send me marketing emails" defaultChecked />
          <Checkbox label="Enable notifications" disabled />
        </div>
      </ComponentPreview>

      <ComponentPreview id="checkbox-sizes">
        <div className="flex flex-col gap-3">
          {sizes.map((size) => (
            <div key={size} className="flex items-center gap-4">
              <Checkbox size={size} label={`${size} checkbox`} />
              <Checkbox size={size} label={`${size} checked`} defaultChecked />
              <Checkbox size={size} label={`${size} disabled`} disabled />
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="checkbox-variants">
        <div className="flex flex-col gap-3">
          {variants.map((variant) => (
            <div key={variant} className="flex items-center gap-4">
              <Checkbox variant={variant} label={`${variant}`} />
              <Checkbox variant={variant} label={`${variant} checked`} defaultChecked />
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="checkbox-with-description">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <Checkbox
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mt-1"
            />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Accept terms and conditions</span>
              <span className="text-xs text-muted-foreground">
                You agree to our Terms of Service and Privacy Policy.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Checkbox className="mt-1" defaultChecked />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Enable dark mode</span>
              <span className="text-xs text-muted-foreground">
                Switch to a darker color scheme for better visibility in low light.
              </span>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="checkbox-card">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <Checkbox className="mt-0.5" defaultChecked />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Professional</span>
              <span className="text-xs text-muted-foreground">Advanced features for teams</span>
            </div>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <Checkbox className="mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Enterprise</span>
              <span className="text-xs text-muted-foreground">Custom solutions for large orgs</span>
            </div>
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <Checkbox className="mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Startup</span>
              <span className="text-xs text-muted-foreground">Everything you need to launch</span>
            </div>
          </label>
        </div>
      </ComponentPreview>

      <ComponentPreview id="checkbox-group">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 border-b pb-2">
            <Checkbox
              checked={allChecked}
              onChange={toggleAll}
            />
            <span className="text-sm font-medium">Select all</span>
          </div>
          <div className="flex flex-col gap-2 pl-6">
            <Checkbox
              checked={features.notifications}
              onChange={(e) => setFeatures((f) => ({ ...f, notifications: e.target.checked }))}
              label="Notifications"
            />
            <Checkbox
              checked={features.marketing}
              onChange={(e) => setFeatures((f) => ({ ...f, marketing: e.target.checked }))}
              label="Marketing emails"
            />
            <Checkbox
              checked={features.updates}
              onChange={(e) => setFeatures((f) => ({ ...f, updates: e.target.checked }))}
              label="Product updates"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Selected: {Object.entries(features).filter(([, v]) => v).map(([k]) => k).join(", ") || "none"}
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="checkbox-error">
        <div className="flex flex-col gap-3">
          <Checkbox error label="This field is required" />
          <Checkbox error defaultChecked label="Invalid selection" />
          <p className="text-xs text-red-500">Please fix the errors above before continuing.</p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="checkbox-form">
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col gap-1">
            <Checkbox label="I agree to the Terms of Service" required />
          </div>
          <div className="flex flex-col gap-1">
            <Checkbox label="I have read the Privacy Policy" required />
          </div>
          <div className="flex flex-col gap-1">
            <Checkbox label="Subscribe to newsletter" />
          </div>
          <button type="submit" className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900">
            Submit
          </button>
        </form>
      </ComponentPreview>

      <ComponentPreview id="checkbox-todo">
        <TodoList />
      </ComponentPreview>
    </div>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Design new landing page", done: true },
    { id: 2, text: "Implement authentication", done: true },
    { id: 3, text: "Write unit tests", done: false },
    { id: 4, text: "Deploy to production", done: false },
    { id: 5, text: "Update documentation", done: false },
  ]);

  function toggle(id: number) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  const completed = todos.filter((t) => t.done).length;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Tasks ({completed}/{todos.length})</span>
        <div className="h-2 w-32 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${(completed / todos.length) * 100}%` }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <label key={todo.id} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <Checkbox checked={todo.done} onChange={() => toggle(todo.id)} />
            <span className={`text-sm ${todo.done ? "text-muted-foreground line-through" : ""}`}>
              {todo.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
