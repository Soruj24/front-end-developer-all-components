import type { CanvasNode } from "../../types/canvas";
import { getComponentDef } from "../../constants/components";

interface ComponentInfo {
  name: string;
  count: number;
  description: string;
  props: string[];
}

function collectComponentInfo(nodes: Record<string, CanvasNode>): ComponentInfo[] {
  const map = new Map<string, ComponentInfo>();

  for (const node of Object.values(nodes)) {
    const def = getComponentDef(node.componentName);
    const existing = map.get(node.componentName);

    if (existing) {
      existing.count++;
    } else {
      map.set(node.componentName, {
        name: node.componentName,
        count: 1,
        description: def?.description ?? "",
        props: Object.keys(node.props),
      });
    }
  }

  return Array.from(map.values());
}

export function generateDocumentation(nodes: Record<string, CanvasNode>): string {
  const components = collectComponentInfo(nodes);
  const totalNodes = Object.keys(nodes).length;

  const lines: string[] = [
    "# DesignedComponent Documentation",
    "",
    "## Overview",
    "",
    `This component was visually designed in the Visual Component Studio.`,
    `It contains ${totalNodes} element(s) using ${components.length} unique component type(s).`,
    "",
    "## Architecture",
    "",
    "- **Type:** React Functional Component",
    "- **Styling:** Tailwind CSS (utility-first)",
    "- **Props:** TypeScript interface with JSDoc annotations",
    "- **Variants:** class-variance-authority (CVA)",
    "",
    "## Components Used",
    "",
  ];

  for (const info of components) {
    lines.push(`### ${info.name} (${info.count}x)`);
    lines.push(`> ${info.description}`);
    lines.push("");
    if (info.props.length > 0) {
      lines.push("**Props:**");
      for (const prop of info.props) {
        lines.push(`- \`${prop}\``);
      }
      lines.push("");
    }
  }

  lines.push("## Props Interface");
  lines.push("");
  lines.push("```typescript");
  lines.push("interface DesignedComponentProps {");
  lines.push("  className?: string;");
  lines.push("  // ... component-specific props");
  lines.push("}");
  lines.push("```");
  lines.push("");

  lines.push("## Usage Examples");
  lines.push("");
  lines.push("### Basic Usage");
  lines.push("```tsx");
  lines.push('import { DesignedComponent } from "./DesignedComponent";');
  lines.push("");
  lines.push("export default function Page() {");
  lines.push("  return <DesignedComponent />;");
  lines.push("}");
  lines.push("```");
  lines.push("");

  lines.push("### With Props");
  lines.push("```tsx");
  lines.push("<DesignedComponent");
  lines.push('  className="custom-class"');
  lines.push("  // Add specific props here");
  lines.push("/>");
  lines.push("```");
  lines.push("");

  lines.push("### With Variants");
  lines.push("```tsx");
  lines.push("// Using CVA variants");
  lines.push("<DesignedComponent variant=\"primary\" size=\"lg\" />");
  lines.push("```");
  lines.push("");

  lines.push("## File Structure");
  lines.push("");
  lines.push("```");
  lines.push("DesignedComponent/");
  lines.push("  index.tsx          # Main component");
  lines.push("  types.ts           # TypeScript interfaces");
  lines.push("  variants.ts        # CVA variant definitions");
  lines.push("  utils.ts           # Helper functions");
  lines.push("  README.md          # This documentation");
  lines.push("```");

  return lines.join("\n");
}
