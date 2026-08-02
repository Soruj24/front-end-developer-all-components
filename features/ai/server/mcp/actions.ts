import { z } from "zod";
import { estimateTokens } from "../../utils";

export interface AgentAction {
  id: string;
  description: string;
  schema: z.ZodObject;
  handler: (args: unknown) => unknown | Promise<unknown>;
}

export class ActionRegistry {
  private actions = new Map<string, AgentAction>();

  register(action: AgentAction): this {
    this.actions.set(action.id, action);
    return this;
  }

  registerMany(actions: AgentAction[]): this {
    for (const action of actions) this.register(action);
    return this;
  }

  get(id: string): AgentAction | undefined {
    return this.actions.get(id);
  }

  list(): AgentAction[] {
    return [...this.actions.values()];
  }

  async execute(id: string, args: unknown): Promise<unknown> {
    const action = this.actions.get(id);
    if (!action) throw new Error(`Unknown agent action: ${id}`);
    const parsed = action.schema.safeParse(args);
    if (!parsed.success) {
      throw new Error(`Invalid args for action ${id}: ${parsed.error.message}`);
    }
    return action.handler(parsed.data);
  }
}

export function createDefaultActionRegistry(): ActionRegistry {
  return new ActionRegistry().registerMany([
    {
      id: "tokens.count",
      description: "Estimate the number of tokens in a text.",
      schema: z.object({ text: z.string().min(1).max(200_000) }),
      handler: (args) => {
        const { text } = args as { text: string };
        return { tokens: estimateTokens(text) };
      },
    },
    {
      id: "text.keywords",
      description: "Extract the most frequent keywords from a text.",
      schema: z.object({
        text: z.string().min(1).max(100_000),
        limit: z.number().int().min(1).max(50).default(10),
      }),
      handler: (args) => {
        const { text, limit } = args as { text: string; limit: number };
        const counts = new Map<string, number>();
        for (const word of text.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean)) {
          if (word.length < 4) continue;
          counts.set(word, (counts.get(word) ?? 0) + 1);
        }
        return {
          keywords: [...counts.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, limit)
            .map(([word, count]) => ({ word, count })),
        };
      },
    },
    {
      id: "text.summarize",
      description: "Summarize a text into a number of sentences.",
      schema: z.object({
        text: z.string().min(1).max(100_000),
        sentences: z.number().int().min(1).max(10).default(3),
      }),
      handler: (args) => {
        const { text, sentences } = args as { text: string; sentences: number };
        const words = text.split(/\s+/).filter(Boolean);
        const step = Math.max(1, Math.ceil(words.length / sentences));
        const summary: string[] = [];
        for (let i = 0; i < words.length && summary.length < sentences; i += step) {
          summary.push(words.slice(i, i + step).join(" "));
        }
        return { summary: summary.join(". ") + "." };
      },
    },
    {
      id: "json.beautify",
      description: "Parse and pretty-print a JSON string.",
      schema: z.object({ json: z.string().min(1).max(500_000) }),
      handler: (args) => {
        const { json } = args as { json: string };
        return JSON.parse(json);
      },
    },
  ]);
}
