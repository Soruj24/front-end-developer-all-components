import type { PlaygroundFile } from "../types";

interface Template {
  id: string;
  label: string;
  description: string;
  files: PlaygroundFile[];
}

const blank = `export default function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <h1 className="text-3xl font-bold">Hello, world</h1>
    </div>
  );
}
`;

const counter = `import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-zinc-950 text-white">
      <p className="text-6xl font-black tabular-nums">{count}</p>
      <div className="flex gap-3">
        <button
          onClick={() => setCount((c) => c - 1)}
          className="rounded-lg bg-zinc-800 px-4 py-2 hover:bg-zinc-700"
        >
          −
        </button>
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg bg-sky-600 px-4 py-2 hover:bg-sky-500"
        >
          +
        </button>
      </div>
    </div>
  );
}
`;

const card = `export default function App() {
  const cards = [
    { title: "Design", body: "Craft interfaces that feel effortless.", color: "from-sky-500 to-indigo-500" },
    { title: "Build", body: "Ship components with confidence.", color: "from-emerald-500 to-teal-500" },
    { title: "Scale", body: "Grow without the growing pains.", color: "from-amber-500 to-rose-500" },
  ];
  return (
    <div className="flex min-h-screen flex-wrap items-center justify-center gap-6 bg-zinc-950 p-10">
      {cards.map((card) => (
        <div
          key={card.title}
          className="w-64 rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
        >
          <div className={\`mb-4 h-2 w-10 rounded-full bg-gradient-to-r \${card.color}\`} />
          <h2 className="mb-2 text-lg font-semibold text-white">{card.title}</h2>
          <p className="text-sm leading-relaxed text-zinc-400">{card.body}</p>
        </div>
      ))}
    </div>
  );
}
`;

const form = `import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
      >
        <label className="mb-2 block text-sm font-medium text-zinc-200">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ada Lovelace"
          className="mb-4 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-sky-500"
        />
        {submitted ? (
          <p className="text-sm text-emerald-400">Welcome, {name || "friend"}!</p>
        ) : (
          <button className="w-full rounded-lg bg-sky-600 py-2 font-medium text-white hover:bg-sky-500">
            Submit
          </button>
        )}
      </form>
    </div>
  );
}
`;

export const TEMPLATES: Template[] = [
  { id: "blank", label: "Blank", description: "Empty React app", files: [{ name: "App.tsx", source: blank }] },
  { id: "counter", label: "Counter", description: "Stateful counter demo", files: [{ name: "App.tsx", source: counter }] },
  { id: "cards", label: "Card grid", description: "Responsive card layout", files: [{ name: "App.tsx", source: card }] },
  { id: "form", label: "Form", description: "Controlled form demo", files: [{ name: "App.tsx", source: form }] },
];
