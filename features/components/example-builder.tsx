import type { RegistryComponent } from "@/features/registry";
import type { Example } from "./ExampleCard";
import { LivePreview } from "./live-preview/LivePreview";

/**
 * Runnable examples. Every snippet imports the component from a relative
 * path (`./<slug>`) so it works next to the copied component file.
 */
export function buildComponentExamples(component: RegistryComponent): Example[] {
  const examples: Example[] = [];
  const pascal = toPascalCase(component.slug);
  const rel = `./${component.slug}`;

  examples.push({
    title: "Basic Usage",
    description: "Renders the component with the same defaults as the live preview.",
    code: `"use client";\n\nimport { ${pascal} } from "${rel}";\n\nexport function ${pascal}Basic() {\n  return <${pascal}>${component.name} content</${pascal}>;\n}`,
    filename: `${component.slug}-basic.tsx`,
    preview: <LivePreview component={component} />,
  });

  if (component.variants.length > 0) {
    const lines = component.variants
      .slice(0, 6)
      .map((v) => `      <${pascal} variant="${v}">${v}</${pascal}>`)
      .join("\n");
    examples.push({
      title: "Variants",
      description: `${component.variants.length} variants: ${component.variants.join(", ")}.`,
      code: `import { ${pascal} } from "${rel}";\n\nexport function ${pascal}Variants() {\n  return (\n    <div className="flex flex-wrap gap-3">\n${lines}\n    </div>\n  );\n}`,
      filename: `${component.slug}-variants.tsx`,
      preview: <LivePreview component={component} />,
    });
  }

  if (["buttons", "inputs"].includes(component.category)) {
    examples.push({
      title: "Sizes",
      description: "Size presets supported by this component.",
      code: `import { ${pascal} } from "${rel}";\n\nexport function ${pascal}Sizes() {\n  return (\n    <div className="flex items-center gap-3">\n      <${pascal} size="sm">Small</${pascal}>\n      <${pascal} size="md">Medium</${pascal}>\n      <${pascal} size="lg">Large</${pascal}>\n    </div>\n  );\n}`,
      filename: `${component.slug}-sizes.tsx`,
      preview: <LivePreview component={component} />,
    });
    examples.push({
      title: "Disabled State",
      description: "Non-interactive state.",
      code: `import { ${pascal} } from "${rel}";\n\nexport function ${pascal}Disabled() {\n  return (\n    <div className="flex flex-wrap gap-3">\n      <${pascal} disabled>Disabled</${pascal}>\n    </div>\n  );\n}`,
      filename: `${component.slug}-disabled.tsx`,
      preview: <LivePreview component={component} />,
    });
  }

  examples.push({
    title: "Dark Mode",
    description: "Render inside a dark container.",
    code: `import { ${pascal} } from "${rel}";\n\nexport function ${pascal}Dark() {\n  return (\n    <div className="dark rounded-xl bg-[#0b0b10] p-6">\n      <${pascal}>Dark mode content</${pascal}>\n    </div>\n  );\n}`,
    filename: `${component.slug}-dark.tsx`,
    preview: (
      <div className="dark bg-[#0b0b10] rounded-xl p-6">
        <LivePreview component={component} />
      </div>
    ),
  });

  examples.push({
    title: "Responsive",
    description: "Adapts to its container width.",
    code: `import { ${pascal} } from "${rel}";\n\nexport function ${pascal}Responsive() {\n  return (\n    <div className="w-full max-w-md">\n      <${pascal}>Responsive width</${pascal}>\n    </div>\n  );\n}`,
    filename: `${component.slug}-responsive.tsx`,
    preview: (
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full">
          <LivePreview component={component} />
        </div>
        <div className="w-2/3 mx-auto">
          <LivePreview component={component} />
        </div>
      </div>
    ),
  });

  return examples;
}

function toPascalCase(slug: string): string {
  return slug
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}
