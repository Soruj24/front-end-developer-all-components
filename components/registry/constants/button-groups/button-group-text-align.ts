import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const buttonGroupTextAlign: RegistryEntry = entry({
  id: "button-group-text-align",
  title: "Text Align",
  description: "Text alignment toggle buttons.",
  source: `import { useState } from "react";
import { ButtonGroup } from "@/components/_button-group";

export default function ButtonGroupTextAlign() {
  const [activeAlign, setActiveAlign] = useState("left");

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-medium text-muted-foreground">Text Alignment</p>
      <ButtonGroup variant="outline">
        {[
          { value: "left", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h8M4 18h16" /></svg> },
          { value: "center", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M8 12h8M4 18h16" /></svg> },
          { value: "right", icon: <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M12 12h8M4 18h16" /></svg> },
        ].map((align) => (
          <button
            key={align.value}
            type="button"
            onClick={() => setActiveAlign(align.value)}
            className={\`px-4 py-2 \${activeAlign === align.value ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900" : ""}\`}
          >
            {align.icon}
          </button>
        ))}
      </ButtonGroup>
      <p className="text-xs text-muted-foreground">Active: {activeAlign}</p>
    </div>
  );
}`,
});
