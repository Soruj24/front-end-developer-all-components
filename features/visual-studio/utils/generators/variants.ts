import type { CanvasNode } from "../../types/canvas";

interface VariantConfig {
  name: string;
  base: string;
  variants: Record<string, string>;
}

function extractVariantFromNode(node: CanvasNode): VariantConfig | null {
  const variant = node.props.variant as string;
  const size = node.props.size as string;
  if (!variant && !size) return null;

  const config: VariantConfig = {
    name: node.componentName,
    base: "",
    variants: {},
  };

  if (variant) config.variants.variant = variant;
  if (size) config.variants.size = size;

  return config;
}

export function generateVariantSystem(nodes: Record<string, CanvasNode>): string {
  const variantMap = new Map<string, VariantConfig>();

  for (const node of Object.values(nodes)) {
    const config = extractVariantFromNode(node);
    if (config && !variantMap.has(config.name)) {
      variantMap.set(config.name, config);
    }
  }

  if (variantMap.size === 0) return "";

  const lines: string[] = [
    'import { cva, type VariantProps } from "class-variance-authority";',
    "",
    "export const componentVariants = {",
  ];

  for (const [name, config] of variantMap) {
    lines.push(`  ${name}: cva("${config.base}", {`);
    lines.push("    variants: {");

    if (config.variants.variant) {
      lines.push(`      variant: {`);
      lines.push(`        primary: "bg-primary text-primary-foreground",`);
      lines.push(`        secondary: "bg-secondary text-secondary-foreground",`);
      lines.push(`        outline: "border border-input bg-background",`);
      lines.push(`        ghost: "hover:bg-accent hover:text-accent-foreground",`);
      lines.push(`        destructive: "bg-destructive text-destructive-foreground",`);
      lines.push(`      },`);
    }

    if (config.variants.size) {
      lines.push(`      size: {`);
      lines.push(`        sm: "h-8 px-3 text-xs",`);
      lines.push(`        md: "h-10 px-4 text-sm",`);
      lines.push(`        lg: "h-12 px-6 text-base",`);
      lines.push(`      },`);
    }

    lines.push("    },");
    lines.push("    defaultVariants: {");
    if (config.variants.variant) lines.push('      variant: "primary",');
    if (config.variants.size) lines.push('      size: "md",');
    lines.push("    },");
    lines.push("  }),");
  }

  lines.push("};");
  lines.push("");
  lines.push("export type ComponentVariantProps = {");

  for (const name of variantMap.keys()) {
    lines.push(`  ${name}: VariantProps<typeof componentVariants.${name}>;`);
  }

  lines.push("};");

  return lines.join("\n");
}

export function generateVariantDocs(nodes: Record<string, CanvasNode>): string {
  const lines: string[] = ["## Variants", ""];

  for (const node of Object.values(nodes)) {
    if (node.props.variant) {
      lines.push(`### ${node.componentName}`);
      lines.push(`- **Variant:** ${node.props.variant}`);
      if (node.props.size) lines.push(`- **Size:** ${node.props.size}`);
      lines.push("");
    }
  }

  return lines.join("\n");
}
