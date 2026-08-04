import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const checkboxTodo: RegistryEntry = entry({
  id: "checkbox-todo",
  title: "Todo List",
  description: "Interactive todo list with progress tracking.",
  source: `import { useState } from "react";
import { Checkbox } from "@/components/_checkbox";

export default function CheckboxTodo() {
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
            style={{ width: \`\${(completed / todos.length) * 100}%\` }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {todos.map((todo) => (
          <label key={todo.id} className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-zinc-50 dark:hover:bg-zinc-900">
            <Checkbox checked={todo.done} onChange={() => toggle(todo.id)} />
            <span className={\`text-sm \${todo.done ? "text-muted-foreground line-through" : ""}\`}>
              {todo.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}`,
});
