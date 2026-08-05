import type { CanvasNode, VisualProps } from "../types/canvas";

function serializeNode(node: CanvasNode): string {
  return JSON.stringify({
    id: node.id,
    type: node.componentName,
    props: node.props,
    visual: node.visual,
    size: node.size,
    responsive: node.responsive,
  }, null, 2);
}

function serializeNodes(nodes: Record<string, CanvasNode>): string {
  return Object.values(nodes).map(serializeNode).join("\n");
}

export function buildSpacingPrompt(nodes: Record<string, CanvasNode>, nodeId?: string): string {
  const target = nodeId ? nodes[nodeId] : null;
  const context = target ? serializeNode(target) : serializeNodes(nodes);

  return `You are a UI spacing expert. Analyze the following component and suggest improved spacing.

Current component:
${context}

Rules:
- Use consistent spacing scale (4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px)
- Ensure visual hierarchy through spacing
- Maintain balance between padding and margin
- Consider component type (buttons need less padding, cards need more)

Respond with JSON array of suggestions:
[{
  "nodeId": "string",
  "title": "string",
  "description": "string",
  "after": { "padding": { "top": number, "right": number, "bottom": number, "left": number } },
  "confidence": 0.0-1.0
}]`;
}

export function buildTypographyPrompt(nodes: Record<string, CanvasNode>, nodeId?: string): string {
  const target = nodeId ? nodes[nodeId] : null;
  const context = target ? serializeNode(target) : serializeNodes(nodes);

  return `You are a typography expert. Analyze the following component and suggest typography improvements.

Current component:
${context}

Rules:
- Use a modular scale (1.25 ratio recommended)
- Ensure sufficient contrast (4.5:1 minimum)
- Limit line length to 45-75 characters
- Use appropriate font weights for hierarchy
- Consider line-height for readability

Respond with JSON array of suggestions:
[{
  "nodeId": "string",
  "title": "string",
  "description": "string",
  "after": { "typography": { "fontSize": number, "fontWeight": string, "lineHeight": number } },
  "confidence": 0.0-1.0
}]`;
}

export function buildAccessibilityPrompt(nodes: Record<string, CanvasNode>, nodeId?: string): string {
  const target = nodeId ? nodes[nodeId] : null;
  const context = target ? serializeNode(target) : serializeNodes(nodes);

  return `You are a WCAG accessibility expert. Analyze the following component for accessibility issues.

Current component:
${context}

Check for:
- Color contrast (4.5:1 for normal text, 3:1 for large text)
- Touch target size (minimum 44x44px)
- Focus states for interactive elements
- Semantic HTML usage
- ARIA labels where needed
- Keyboard navigation support

Respond with JSON array of suggestions:
[{
  "nodeId": "string",
  "title": "string",
  "description": "string",
  "issue": "string describing the problem",
  "severity": "error|warning|info",
  "fix": "string describing the fix",
  "confidence": 0.0-1.0
}]`;
}

export function buildResponsivePrompt(nodes: Record<string, CanvasNode>, nodeId?: string): string {
  const target = nodeId ? nodes[nodeId] : null;
  const context = target ? serializeNode(target) : serializeNodes(nodes);

  return `You are a responsive design expert. Analyze the following component and suggest responsive improvements.

Current component:
${context}

Breakpoints:
- sm: 640px (mobile)
- md: 768px (tablet)
- lg: 1024px (laptop)
- xl: 1280px (desktop)
- 2xl: 1536px (ultra wide)

Respond with JSON array of suggestions:
[{
  "nodeId": "string",
  "title": "string",
  "description": "string",
  "breakpoint": "sm|md|lg|xl|2xl",
  "overrides": { "width": number, "display": string, "padding": {...} },
  "confidence": 0.0-1.0
}]`;
}

export function buildColorPrompt(nodes: Record<string, CanvasNode>, nodeId?: string): string {
  const target = nodeId ? nodes[nodeId] : null;
  const context = target ? serializeNode(target) : serializeNodes(nodes);

  return `You are a color theory expert. Analyze the following component and suggest color improvements.

Current component:
${context}

Rules:
- Use harmonious color combinations
- Ensure sufficient contrast
- Consider color psychology
- Maintain brand consistency
- Use semantic colors (success=green, error=red, etc.)

Respond with JSON array of suggestions:
[{
  "nodeId": "string",
  "title": "string",
  "description": "string",
  "palette": ["color1", "color2", ...],
  "rationale": "string explaining why these colors work",
  "after": { "background": { "color": "string" }, "typography": { "color": "string" } },
  "confidence": 0.0-1.0
}]`;
}

export function buildDarkModePrompt(nodes: Record<string, CanvasNode>, nodeId?: string): string {
  const target = nodeId ? nodes[nodeId] : null;
  const context = target ? serializeNode(target) : serializeNodes(nodes);

  return `You are a dark mode design expert. Generate dark mode styles for the following component.

Current component:
${context}

Rules:
- Use dark backgrounds (#111827, #1f2937, #374151)
- Invert text colors appropriately
- Reduce color saturation slightly
- Maintain sufficient contrast
- Use subtle shadows instead of borders

Respond with JSON array of suggestions:
[{
  "nodeId": "string",
  "title": "string",
  "description": "string",
  "darkOverrides": {
    "background": { "color": "string" },
    "typography": { "color": "string" },
    "border": { "color": "string" }
  },
  "confidence": 0.0-1.0
}]`;
}

export function buildRefactorPrompt(nodes: Record<string, CanvasNode>, nodeId?: string): string {
  const target = nodeId ? nodes[nodeId] : null;
  const context = target ? serializeNode(target) : serializeNodes(nodes);

  return `You are a React/Tailwind code expert. Analyze the following component and suggest code improvements.

Current component:
${context}

Rules:
- Extract repeated patterns into reusable components
- Use proper Tailwind class organization
- Follow React best practices
- Ensure type safety
- Optimize for performance

Respond with JSON array of suggestions:
[{
  "nodeId": "string",
  "title": "string",
  "description": "string",
  "originalCode": "string",
  "refactoredCode": "string",
  "changes": ["change1", "change2"],
  "confidence": 0.0-1.0
}]`;
}

export function buildExplainPrompt(nodes: Record<string, CanvasNode>, nodeId?: string): string {
  const target = nodeId ? nodes[nodeId] : null;
  const context = target ? serializeNode(target) : serializeNodes(nodes);

  return `You are a design systems expert. Explain the design decisions in the following component.

Current component:
${context}

Explain:
- Visual hierarchy
- Spacing system usage
- Typography choices
- Color relationships
- Layout patterns
- Accessibility considerations

Respond with JSON array of explanations:
[{
  "nodeId": "string",
  "title": "string",
  "explanation": "string",
  "principles": ["principle1", "principle2"],
  "confidence": 0.0-1.0
}]`;
}
