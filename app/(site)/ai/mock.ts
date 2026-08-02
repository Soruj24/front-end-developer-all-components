import type { Tone } from "./data";

let msgIdCounter = 5;

export function nextId() {
  return msgIdCounter++;
}

function getTonePrefix(tone: Tone): string {
  switch (tone) {
    case "Professional":
      return "Based on my analysis, ";
    case "Casual":
      return "Hey there! So basically, ";
    case "Funny":
      return "Well, well, well... ";
    case "Academic":
      return "From a scholarly perspective, ";
  }
}

const mockResponses: Record<string, string> = {
  default:
    "That's a great question! Here's what I know about it.\n\nThe key points to consider are:\n1. **First principle** — this is the foundation of the concept\n2. **Second aspect** — builds on the initial idea\n3. **Third consideration** — ties everything together\n\nLet me know if you'd like me to dive deeper into any of these points!",
  "Explain React Server Components":
    "React Server Components (RSC) allow rendering React components **exclusively on the server**, sending only the resulting HTML to the client.\n\n### Key Benefits\n- **Reduced bundle size** — server components never ship to the client\n- **Direct data access** — query databases without API layers\n- **Automatic code splitting** — client components are loaded on demand\n\n```jsx\n// ServerComponent.jsx — runs on server only\nimport db from './database';\n\nexport default async function UserList() {\n  const users = await db.query('SELECT * FROM users');\n  return (\n    <ul>\n      {users.map(u => <li key={u.id}>{u.name}</li>)}\n    </ul>\n  );\n}\n```\n\n> RSC represents a fundamental shift in how we think about React architecture.",
  "Write a poem about coding":
    "Here's a little poem for you:\n\n---\n\nIn realms of logic, dark and deep,\nWhere restless loops their vigil keep,\nA coder sits with furrowed brow,\nTo make the stubborn compile bow.\n\n```\nWhile (coffee != empty) {\n  writeCode();\n  debug();\n  cry();\n}\n```\n\nWith semicolons and curly braces,\nThey navigate uncharted spaces,\nA single bug, a missing quote,\nCan sink the world's most sturdy boat.\n\n---\n\nHope that brightens your day!",
  "Debug this: const x = null; console.log(x.toString())":
    "The error here is a **TypeError: Cannot read properties of null**.\n\n### Why it happens\n`x` is `null`, and `null` has no `.toString()` method — well, actually it *does* have one via `Object.prototype`, but **null is not an object**, so the call fails.\n\n### Fix it\n```js\nconst x = null;\nconsole.log(x?.toString() ?? 'Value is null');\n// → 'Value is null'\n```\n\nOr ensure `x` has a value:\n```js\nconst x = 'hello';\nconsole.log(x.toString());\n// → 'hello'\n```",
  "Compare React vs Vue":
    "Here's a detailed comparison:\n\n| Feature | React | Vue |\n|---|---|---|\n| **Type** | Library | Framework |\n| **Learning Curve** | Moderate | Gentle |\n| **State Management** | Redux / Zustand | Pinia / Vuex |\n| **Rendering** | JSX | Templates + JSX |\n| **Bundle Size** | ~42 KB | ~33 KB |\n| **Ecosystem** | Mature, vast | Growing fast |\n\n### Verdict\n- **React** — more flexible, larger ecosystem, steeper learning\n- **Vue** — easier to start, opinionated, excellent docs\n\nBoth are excellent choices. Pick based on your team's experience and project needs.",
  "Write SQL for users table":
    "```sql\nCREATE TABLE users (\n  id          SERIAL PRIMARY KEY,\n  email       VARCHAR(255) UNIQUE NOT NULL,\n  username    VARCHAR(100) NOT NULL,\n  password    VARCHAR(255) NOT NULL,\n  full_name   VARCHAR(255),\n  avatar_url  TEXT,\n  role        VARCHAR(50) DEFAULT 'user',\n  is_active   BOOLEAN DEFAULT true,\n  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);\n\nCREATE INDEX idx_users_email ON users(email);\nCREATE INDEX idx_users_role ON users(role);\n```\n\nAdd some seed data:\n```sql\nINSERT INTO users (email, username, password, full_name, role)\nVALUES\n  ('alice@example.com', 'alice', '$2b$10$...', 'Alice Johnson', 'admin'),\n  ('bob@example.com', 'bob', '$2b$10$...', 'Bob Martinez', 'user');\n```",
  "Summarize the latest AI news":
    "Here's a summary of recent AI developments:\n\n1. **OpenAI GPT-5** — leaked benchmarks show dramatic improvements in reasoning\n2. **Google Gemini 2.0** — now supports 10M token context windows\n3. **Claude 3.5 Sonnet** — top-rated on coding benchmarks\n4. **Open Source LLMs** — Llama 3 and Mistral are closing the gap\n\n### Key Trend: Agentic AI\n> AI systems are moving from chatbots to autonomous agents that can use tools, browse the web, and execute code.\n\n---\n\nThe pace of innovation is **exponential**. Subscribe to my newsletter for weekly updates!",
};

export function getMockResponse(input: string, tone: Tone): string {
  for (const [key, response] of Object.entries(mockResponses)) {
    if (input.toLowerCase().includes(key.toLowerCase())) {
      return getTonePrefix(tone) + response;
    }
  }
  return getTonePrefix(tone) + mockResponses.default;
}

const codeSnippets: Record<string, string> = {
  JavaScript:
    "function fibonacci(n) {\n  if (n <= 1) return n;\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) {\n    [a, b] = [b, a + b];\n  }\n  return b;\n}\n\nconsole.log(fibonacci(10)); // 55",
  TypeScript:
    "interface User {\n  id: number;\n  name: string;\n  email: string;\n  role: 'admin' | 'user';\n}\n\nasync function fetchUser(id: number): Promise<User> {\n  const res = await fetch(`/api/users/${id}`);\n  if (!res.ok) throw new Error('Failed to fetch');\n  return res.json();\n}",
  Python:
    "def quicksort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quicksort(left) + middle + quicksort(right)\n\nprint(quicksort([3, 6, 8, 10, 1, 2, 1]))",
  SQL:
    "WITH user_orders AS (\n  SELECT\n    u.id,\n    u.name,\n    COUNT(o.id) AS order_count,\n    SUM(o.total) AS total_spent\n  FROM users u\n  LEFT JOIN orders o ON o.user_id = u.id\n  GROUP BY u.id, u.name\n)\nSELECT * FROM user_orders\nORDER BY total_spent DESC\nLIMIT 10;",
  CSS:
    ".glass-card {\n  background: rgba(255, 255, 255, 0.05);\n  backdrop-filter: blur(10px);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 16px;\n  padding: 24px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n\n.glass-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);\n}",
};

export function generateCode(language: string): string {
  return codeSnippets[language] || codeSnippets.JavaScript;
}

export const suggestedFollowUps = [
  "Can you elaborate on that?",
  "Give me a practical example",
  "What are the downsides?",
  "How does this compare to alternatives?",
  "Show me a code sample",
  "What's the best practice here?",
];
