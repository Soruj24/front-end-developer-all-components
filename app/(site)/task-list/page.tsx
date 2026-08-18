"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import ComponentPreview from "@/components/preview";
import CodeBlock from "@/components/home/CodeBlock";
import { CheckSquare, Square, Check, Trash2, Plus, Clock, Star } from "lucide-react";

const installCommand = "npx ui-add task-list";
const usageCode = `import { TaskList } from "@/components/ui/task-list";

<TaskList items={tasks} />
`;

function TodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Walk the dog", completed: true },
    { id: 3, text: "Read a book", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 rounded-lg border bg-card"
          >
            <button onClick={() => toggleTask(task.id)}>
              {task.completed ? (
                <CheckSquare className="h-5 w-5 text-primary" />
              ) : (
                <Square className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            <span className={`flex-1 ${task.completed ? "line-through text-muted-foreground" : ""}`}>
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-muted-foreground hover:text-destructive transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Checklist() {
  const [items, setItems] = useState([
    { id: 1, text: "Research competitors", checked: true },
    { id: 2, text: "Design mockups", checked: true },
    { id: 3, text: "Get stakeholder approval", checked: false },
    { id: 4, text: "Start development", checked: false },
    { id: 5, text: "QA testing", checked: false },
  ]);

  const toggleItem = (id: number) => {
    setItems(items.map((i) => (i.id === id ? { ...i, checked: !i.checked } : i)));
  };

  const completed = items.filter((i) => i.checked).length;
  const progress = (completed / items.length) * 100;

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">Project Checklist</span>
          <span className="text-muted-foreground">{completed}/{items.length} completed</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className="flex items-center gap-3 w-full p-3 rounded-lg border bg-card hover:bg-accent transition-colors text-left"
          >
            {item.checked ? (
              <CheckSquare className="h-5 w-5 text-primary shrink-0" />
            ) : (
              <Square className="h-5 w-5 text-muted-foreground shrink-0" />
            )}
            <span className={`${item.checked ? "line-through text-muted-foreground" : ""}`}>
              {item.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function TaskBoard() {
  const [tasks, setTasks] = useState({
    todo: [
      { id: 1, text: "Design landing page" },
      { id: 2, text: "Set up CI/CD" },
    ],
    inProgress: [
      { id: 3, text: "Build authentication" },
    ],
    done: [
      { id: 4, text: "Project setup" },
      { id: 5, text: "Database schema" },
    ],
  });

  const moveTask = (from: keyof typeof tasks, to: keyof typeof tasks, id: number) => {
    setTasks((prev) => {
      const task = prev[from].find((t) => t.id === id);
      if (!task) return prev;
      return {
        ...prev,
        [from]: prev[from].filter((t) => t.id !== id),
        [to]: [...prev[to], task],
      };
    });
  };

  const columns = [
    { key: "todo" as const, label: "To Do", color: "bg-blue-500" },
    { key: "inProgress" as const, label: "In Progress", color: "bg-yellow-500" },
    { key: "done" as const, label: "Done", color: "bg-green-500" },
  ];

  return (
    <div className="w-full max-w-2xl">
      <div className="grid grid-cols-3 gap-4">
        {columns.map((col) => (
          <div key={col.key} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${col.color}`} />
              <span className="font-medium text-sm">{col.label}</span>
              <Badge variant="secondary" className="ml-auto">{tasks[col.key].length}</Badge>
            </div>
            <div className="space-y-2">
              {tasks[col.key].map((task) => (
                <div key={task.id} className="p-3 rounded-lg border bg-card text-sm">
                  {task.text}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PriorityTasks() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Fix critical bug", priority: "high" as const },
    { id: 2, text: "Update documentation", priority: "low" as const },
    { id: 3, text: "Review PR", priority: "medium" as const },
    { id: 4, text: "Deploy to staging", priority: "high" as const },
    { id: 5, text: "Clean up dependencies", priority: "low" as const },
  ]);

  const priorityColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="w-full max-w-md space-y-3">
      {sortedTasks.map((task) => (
        <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
          <div className={`h-3 w-3 rounded-full ${priorityColors[task.priority]}`} />
          <span className="flex-1 text-sm">{task.text}</span>
          <Badge variant={task.priority === "high" ? "destructive" : "secondary"}>
            {task.priority}
          </Badge>
        </div>
      ))}
    </div>
  );
}

function SubTask() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Build authentication system",
      subtasks: [
        { id: 11, text: "Set up Auth0", completed: true },
        { id: 12, text: "Create login page", completed: true },
        { id: 13, text: "Implement protected routes", completed: false },
      ],
    },
    {
      id: 2,
      text: "Design dashboard",
      subtasks: [
        { id: 21, text: "Create wireframes", completed: true },
        { id: 22, text: "Design components", completed: false },
        { id: 23, text: "Build layout", completed: false },
      ],
    },
  ]);

  const toggleSubtask = (taskId: number, subtaskId: number) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              subtasks: t.subtasks.map((st) =>
                st.id === subtaskId ? { ...st, completed: !st.completed } : st
              ),
            }
          : t
      )
    );
  };

  return (
    <div className="w-full max-w-md space-y-4">
      {tasks.map((task) => {
        const completed = task.subtasks.filter((s) => s.completed).length;
        return (
          <div key={task.id} className="rounded-lg border bg-card p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{task.text}</span>
              <span className="text-sm text-muted-foreground">
                {completed}/{task.subtasks.length}
              </span>
            </div>
            <div className="space-y-2">
              {task.subtasks.map((subtask) => (
                <button
                  key={subtask.id}
                  onClick={() => toggleSubtask(task.id, subtask.id)}
                  className="flex items-center gap-2 w-full text-left text-sm hover:bg-accent p-2 rounded transition-colors"
                >
                  {subtask.completed ? (
                    <CheckSquare className="h-4 w-4 text-primary" />
                  ) : (
                    <Square className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className={subtask.completed ? "line-through text-muted-foreground" : ""}>
                    {subtask.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AssignedTasks() {
  const [tasks] = useState([
    { id: 1, text: "Review design specs", assignee: "Alice", avatar: "A" },
    { id: 2, text: "Fix API endpoint", assignee: "Bob", avatar: "B" },
    { id: 3, text: "Update user guide", assignee: "Charlie", avatar: "C" },
    { id: 4, text: "Run security audit", assignee: "Alice", avatar: "A" },
  ]);

  const avatarColors = ["bg-blue-500", "bg-green-500", "bg-purple-500"];

  return (
    <div className="w-full max-w-md space-y-3">
      {tasks.map((task, i) => (
        <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
          <div className={`h-8 w-8 rounded-full ${avatarColors[i % 3]} flex items-center justify-center text-white text-sm font-medium`}>
            {task.avatar}
          </div>
          <span className="flex-1 text-sm">{task.text}</span>
          <span className="text-xs text-muted-foreground">{task.assignee}</span>
        </div>
      ))}
    </div>
  );
}

function CompletedTasks() {
  const [tasks] = useState([
    { id: 1, text: "Set up project", completedAt: "2 hours ago" },
    { id: 2, text: "Install dependencies", completedAt: "1 hour ago" },
    { id: 3, text: "Create components", completedAt: "30 mins ago" },
  ]);

  return (
    <div className="w-full max-w-md space-y-3">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card opacity-75">
          <CheckSquare className="h-5 w-5 text-green-500 shrink-0" />
          <span className="flex-1 text-sm line-through text-muted-foreground">{task.text}</span>
          <span className="text-xs text-muted-foreground">{task.completedAt}</span>
        </div>
      ))}
    </div>
  );
}

export default function TaskListPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Task List</h1>
          <Badge variant="secondary">UI Component</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Interactive task lists with checkboxes, priorities, and subtasks.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Todo List</h3>
            <ComponentPreview>
              <TodoList />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Checklist</h3>
            <ComponentPreview>
              <Checklist />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Task Board</h3>
            <ComponentPreview>
              <TaskBoard />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Priority Tasks</h3>
            <ComponentPreview>
              <PriorityTasks />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">SubTask</h3>
            <ComponentPreview>
              <SubTask />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Assigned Tasks</h3>
            <ComponentPreview>
              <AssignedTasks />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Completed Tasks</h3>
            <ComponentPreview>
              <CompletedTasks />
            </ComponentPreview>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Prop</th>
                <th className="text-left py-2 font-medium">Type</th>
                <th className="text-left py-2 font-medium">Default</th>
                <th className="text-left py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">items</td>
                <td className="py-2">TaskItem[]</td>
                <td className="py-2">[]</td>
                <td className="py-2">Array of task objects</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">onToggle</td>
                <td className="py-2">(id: string) =&gt; void</td>
                <td className="py-2">undefined</td>
                <td className="py-2">Callback when task is toggled</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">onDelete</td>
                <td className="py-2">(id: string) =&gt; void</td>
                <td className="py-2">undefined</td>
                <td className="py-2">Callback when task is deleted</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">showCheckbox</td>
                <td className="py-2">boolean</td>
                <td className="py-2">true</td>
                <td className="py-2">Show checkbox for each task</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
