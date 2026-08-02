import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const codePlaygroundQuick: RegistryEntry = entry({
    id: "code-playground-quick",
    title: "Single-file Playground",
    description:
      "A compact single-file variant that highlights the editor, console output, and share/export actions.",
    source: `import { useState } from "react";

const cards = [
  {
    title: "Design",
    body: "Craft beautiful interfaces with a token-driven design system.",
    accent: "bg-primary-soft text-primary",
  },
  {
    title: "Code",
    body: "Compile and run TypeScript and JSX right in the browser.",
    accent: "bg-success-soft text-success",
  },
];

export default function PlaygroundDemo() {
  const [active, setActive] = useState(0);
  const card = cards[active];

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 p-6">
      <div className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-muted/40 p-1">
        {cards.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => {
              setActive(index);
              console.log("selected", item.title);
            }}
            className={
              "rounded-md px-2 py-1.5 text-xs font-medium transition-colors " +
              (index === active
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground")
            }
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className={"rounded-xl p-5 " + card.accent}>
        <h3 className="text-sm font-semibold">{card.title}</h3>
        <p className="mt-1 text-sm leading-relaxed opacity-90">{card.body}</p>
      </div>
    </div>
  );
}`,
  });
