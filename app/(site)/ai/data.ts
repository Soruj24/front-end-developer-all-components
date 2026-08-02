export interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
  feedback?: "up" | "down";
}

export interface Conversation {
  id: number;
  title: string;
  timestamp: string;
}

export type Model = "GPT-4" | "Claude 3" | "Gemini Pro" | "Llama 3";
export type Tone = "Professional" | "Casual" | "Funny" | "Academic";

export function createInitialMessages(): Message[] {
  return [
    { id: 1, role: "assistant", text: "Hello! I'm your AI assistant. I can help with coding, design, planning, and more. What would you like to explore today?", timestamp: Date.now() },
    { id: 2, role: "user", text: "Can you help me design a scalable microservices architecture?", timestamp: Date.now() + 1000 },
    { id: 3, role: "assistant", text: "Absolutely! Here's a high-level approach:\n\n## Microservices Architecture Design\n\n### Core Principles\n- **Domain-driven design** — each service owns its domain\n- **API Gateway** — single entry point (e.g., Kong, Traefik)\n- **Event-driven** — async communication via message broker\n\n### Suggested Services\n| Service | Responsibility | Tech |\n|---|---|---|\n| Auth | User login, JWT | Node.js |\n| Orders | Order processing | Go |\n| Payments | Payment gateway | Python |\n| Notifications | Email, push | Node.js |\n\n> Start small, split only when needed. Premature decomposition is a common trap.", timestamp: Date.now() + 2000 },
    { id: 4, role: "user", text: "What's the best approach for state management in React?", timestamp: Date.now() + 3000 },
    { id: 5, role: "assistant", text: "Great question! Here's my recommended approach:\n\n1. **Local state** — `useState` for component-specific data\n2. **Context** — for low-frequency global state (theme, auth)\n3. **Server state** — React Query / SWR for async data\n4. **Complex client state** — Zustand or Jotai\n\n```js\n// Zustand example\nimport { create } from 'zustand';\n\nconst useStore = create((set) => ({\n  count: 0,\n  increment: () => set((state) => ({ count: state.count + 1 })),\n}));\n```\n\n**Rule of thumb:** Don't reach for a global store until you feel the pain of prop drilling.", timestamp: Date.now() + 4000 },
  ];
}

export const quickPrompts = [
  "Explain React Server Components",
  "Write a poem about coding",
  "Debug this: const x = null; console.log(x.toString())",
  "Compare React vs Vue",
  "Write SQL for users table",
  "Summarize the latest AI news",
];

export const historyConversations: Conversation[] = [
  { id: 1, title: "React Server Components", timestamp: "2h ago" },
  { id: 2, title: "Python debugging help", timestamp: "Yesterday" },
  { id: 3, title: "SQL query optimization", timestamp: "2 days ago" },
  { id: 4, title: "Architecture discussion", timestamp: "1 week ago" },
];

export const models: Model[] = ["GPT-4", "Claude 3", "Gemini Pro", "Llama 3"];
export const tones: Tone[] = ["Professional", "Casual", "Funny", "Academic"];
