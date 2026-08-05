import type { CanvasNode } from "../../types/canvas";
import { getComponentDef } from "../../constants/components";

interface PropEntry {
  name: string;
  type: string;
  description: string;
  defaultValue: string;
}

function extractNodeProps(node: CanvasNode): PropEntry[] {
  const def = getComponentDef(node.componentName);
  if (!def) return [];
  const entries: PropEntry[] = [];

  for (const field of def.propFields) {
    const val = node.props[field.id] ?? field.defaultValue;
    let tsType = "string";
    let defaultVal = JSON.stringify(val);

    switch (field.type) {
      case "slider":
      case "number":
        tsType = "number";
        defaultVal = String(val ?? 0);
        break;
      case "boolean":
        tsType = "boolean";
        defaultVal = String(val ?? false);
        break;
      default:
        tsType = "string";
    }
    entries.push({ name: field.id, type: tsType, description: field.label, defaultValue: defaultVal });
  }
  return entries;
}

export function generateTypescriptTypes(nodes: Record<string, CanvasNode>): string {
  const allProps: PropEntry[] = [];
  for (const node of Object.values(nodes)) {
    allProps.push(...extractNodeProps(node));
  }

  const uniqueProps = new Map<string, PropEntry>();
  for (const prop of allProps) {
    if (!uniqueProps.has(prop.name)) uniqueProps.set(prop.name, prop);
  }

  const lines: string[] = [
    "export interface DesignedComponentProps {",
    "  className?: string;",
  ];

  for (const prop of uniqueProps.values()) {
    lines.push(`  /** ${prop.description} */`);
    lines.push(`  ${prop.name}?: ${prop.type};`);
  }

  lines.push("}");
  return lines.join("\n");
}

export function generatePropSchema(nodes: Record<string, CanvasNode>): Record<string, { type: string; description: string }> {
  const schema: Record<string, { type: string; description: string }> = {};
  for (const node of Object.values(nodes)) {
    for (const prop of extractNodeProps(node)) {
      if (!schema[prop.name]) {
        schema[prop.name] = { type: prop.type, description: prop.description };
      }
    }
  }
  return schema;
}
