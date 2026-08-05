import type { CanvasNode } from "../../types/canvas";

interface ExampleConfig {
  title: string;
  description: string;
  code: string;
}

function generateBasicExample(): ExampleConfig {
  return {
    title: "Basic Usage",
    description: "Simple implementation with default props",
    code: `import { DesignedComponent } from "./DesignedComponent";

export default function BasicExample() {
  return (
    <div className="p-8">
      <DesignedComponent />
    </div>
  );
}`,
  };
}

function generateWithPropsExample(nodes: Record<string, CanvasNode>): ExampleConfig {
  const firstNode = Object.values(nodes)[0];
  const props = firstNode
    ? Object.entries(firstNode.props)
        .map(([key, val]) => `  ${key}=${JSON.stringify(val)}`)
        .join("\n")
    : "";

  return {
    title: "With Custom Props",
    description: "Component with custom prop values",
    code: `import { DesignedComponent } from "./DesignedComponent";

export default function PropsExample() {
  return (
    <div className="p-8">
      <DesignedComponent
${props || "  // Add props here"}
      />
    </div>
  );
}`,
  };
}

function generateWithVariantsExample(): ExampleConfig {
  return {
    title: "With Variants",
    description: "Using CVA variants for different styles",
    code: `import { DesignedComponent } from "./DesignedComponent";

export default function VariantsExample() {
  return (
    <div className="flex gap-4 p-8">
      <DesignedComponent variant="primary" />
      <DesignedComponent variant="secondary" />
      <DesignedComponent variant="outline" />
      <DesignedComponent variant="ghost" />
    </div>
  );
}`,
  };
}

function generateWithResponsiveExample(): ExampleConfig {
  return {
    title: "Responsive Design",
    description: "Component with responsive breakpoints",
    code: `import { DesignedComponent } from "./DesignedComponent";

export default function ResponsiveExample() {
  return (
    <div className="p-8">
      <DesignedComponent
        className="w-full md:w-1/2 lg:w-1/3"
      />
    </div>
  );
}`,
  };
}

function generateWithDarkModeExample(): ExampleConfig {
  return {
    title: "Dark Mode",
    description: "Component with dark mode support",
    code: `import { DesignedComponent } from "./DesignedComponent";

export default function DarkModeExample() {
  return (
    <div className="dark p-8 bg-white dark:bg-gray-900">
      <DesignedComponent />
    </div>
  );
}`,
  };
}

function generateStorybookExample(): ExampleConfig {
  return {
    title: "Storybook Story",
    description: "Storybook story for the component",
    code: `import type { Meta, StoryObj } from "@storybook/react";
import { DesignedComponent } from "./DesignedComponent";

const meta: Meta<typeof DesignedComponent> = {
  title: "Components/DesignedComponent",
  component: DesignedComponent,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DesignedComponent>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};`,
  };
}

export function generateExamples(nodes: Record<string, CanvasNode>): ExampleConfig[] {
  return [
    generateBasicExample(),
    generateWithPropsExample(nodes),
    generateWithVariantsExample(),
    generateWithResponsiveExample(),
    generateWithDarkModeExample(),
    generateStorybookExample(),
  ];
}

export function formatExamples(examples: ExampleConfig[]): string {
  const lines: string[] = ["# Usage Examples", ""];

  for (const example of examples) {
    lines.push(`## ${example.title}`);
    lines.push("");
    lines.push(`> ${example.description}`);
    lines.push("");
    lines.push("```tsx");
    lines.push(example.code);
    lines.push("```");
    lines.push("");
  }

  return lines.join("\n");
}
