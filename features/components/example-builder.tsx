import type { RegistryComponent } from "@/features/registry";
import type { Example } from "./ExampleCard";
import { LivePreview } from "./live-preview/LivePreview";

/** Builds real example variations based on the component category and variants. */
export function buildComponentExamples(component: RegistryComponent): Example[] {
  const examples: Example[] = [];
  const source = component.source;
  const pascal = toPascalCase(component.name);

  // 1. Basic usage — always present
  examples.push({
    title: "Basic Usage",
    description: "The simplest way to render this component.",
    code: source,
    filename: `${component.slug}.tsx`,
    preview: <LivePreview component={component} />,
  });

  // 2. Variants — if the component has variants
  if (component.variants.length > 0) {
    const variantLines = component.variants
      .map((v) => `      <${pascal} variant="${v}">${v}</${pascal}>`)
      .join("\n");

    examples.push({
      title: "Variants",
      description: `${component.variants.length} available variants: ${component.variants.join(", ")}.`,
      code: `import { ${pascal} } from "@/components/ui";

export function ${pascal}Variants() {
  return (
    <div className="flex flex-wrap gap-3">
${variantLines}
    </div>
  );
}`,
      filename: `${component.slug}-variants.tsx`,
      preview: <LivePreview component={component} />,
    });
  }

  // 3. Sizes — for buttons, inputs
  if (["buttons", "inputs"].includes(component.category)) {
    examples.push({
      title: "Sizes",
      description: "Available size options from small to large.",
      code: `import { ${pascal} } from "@/components/ui";

export function ${pascal}Sizes() {
  return (
    <div className="flex items-center gap-3">
      <${pascal} size="sm">Small</${pascal}>
      <${pascal} size="md">Medium</${pascal}>
      <${pascal} size="lg">Large</${pascal}>
    </div>
  );
}`,
      filename: `${component.slug}-sizes.tsx`,
      preview: <LivePreview component={component} />,
    });
  }

  // 4. Disabled state — for interactive components
  if (["buttons", "inputs"].includes(component.category)) {
    examples.push({
      title: "Disabled State",
      description: "Non-interactive state for buttons and inputs.",
      code: `import { ${pascal} } from "@/components/ui";

export function ${pascal}Disabled() {
  return (
    <div className="flex flex-wrap gap-3">
      <${pascal} disabled>Disabled</${pascal}>
      <${pascal} variant="outline" disabled>Outline</${pascal}>
      <${pascal} variant="ghost" disabled>Ghost</${pascal}>
    </div>
  );
}`,
      filename: `${component.slug}-disabled.tsx`,
      preview: <LivePreview component={component} />,
    });
  }

  // 5. Dark mode preview
  examples.push({
    title: "Dark Mode",
    description: "How the component appears in dark mode.",
    code: `// Wrap in a dark container or use the dark class
<div className="dark">
  <${pascal}>Dark mode content</${pascal}>
</div>`,
    filename: `${component.slug}-dark.tsx`,
    preview: (
      <div className="dark bg-[#0b0b10] rounded-xl p-6">
        <LivePreview component={component} />
      </div>
    ),
  });

  // 6. Responsive
  examples.push({
    title: "Responsive",
    description: "The component adapts to different container widths.",
    code: `// The component uses responsive Tailwind classes
// and adapts to its container width.
<div className="w-full max-w-md">
  <${pascal}>Responsive width</${pascal}>
</div>`,
    filename: `${component.slug}-responsive.tsx`,
    preview: (
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full">
          <LivePreview component={component} />
        </div>
        <div className="w-2/3 mx-auto">
          <LivePreview component={component} />
        </div>
        <div className="w-1/3 mx-auto">
          <LivePreview component={component} />
        </div>
      </div>
    ),
  });

  return examples;
}

function toPascalCase(str: string): string {
  return str
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}
