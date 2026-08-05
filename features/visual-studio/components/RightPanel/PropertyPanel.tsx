"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useStudio } from "../../context/StudioContext";
import { getComponentDef, type PropFieldDef } from "../../constants/components";
import type { CanvasNode, VisualProps } from "../../types/canvas";
import {
  Section, Row, TextInput, NumberInput, Slider, Select, Toggle, ColorPicker,
  BoxModelEditor, TypographyEditor, BackgroundEditor, BorderEditor,
  EffectsEditor, AnimationEditor, HoverStateEditor, FocusStateEditor,
  DarkModeEditor, LayoutEditor,
} from "./PropertyControls";
import { ResponsiveEditor } from "./ResponsiveEditor";

/* ─── Component-specific fields ─── */

function ComponentFields({ node }: { node: CanvasNode }) {
  const { updateNodeProps } = useStudio();
  const def = getComponentDef(node.componentName);
  if (!def) return null;

  const groups = new Map<string, PropFieldDef[]>();
  for (const field of def.propFields) {
    const arr = groups.get(field.group) ?? [];
    arr.push(field);
    groups.set(field.group, arr);
  }

  const groupLabels: Record<string, string> = {
    content: "Content", style: "Style", state: "State",
    typography: "Typography", spacing: "Spacing", border: "Border",
    layout: "Layout", effects: "Effects",
  };

  return (
    <>
      {Array.from(groups.entries()).map(([group, fields]) => (
        <Section key={group} title={groupLabels[group] ?? group} defaultOpen={group === "content"}>
          {fields.map((field) => (
            <Row key={field.id} label={field.label}>
              <FieldInput field={field} value={node.props[field.id] ?? field.defaultValue}
                onChange={(v) => updateNodeProps(node.id, { [field.id]: v })} />
            </Row>
          ))}
        </Section>
      ))}
    </>
  );
}

function FieldInput({ field, value, onChange }: { field: PropFieldDef; value: unknown; onChange: (v: unknown) => void }) {
  switch (field.type) {
    case "text": return <TextInput value={(value as string) ?? ""} onChange={(v) => onChange(v)} placeholder={field.placeholder} />;
    case "slider": case "number": return <Slider value={(value as number) ?? (field.defaultValue as number)} onChange={(v) => onChange(v)} min={field.min ?? 0} max={field.max ?? 100} step={field.step ?? 1} unit={field.unit ?? ""} />;
    case "select": return <Select value={(value as string) ?? ""} onChange={(v) => onChange(v)} options={field.options ?? []} />;
    case "color": return <ColorPicker value={(value as string) ?? ""} onChange={(v) => onChange(v)} />;
    case "boolean": return <Toggle value={(value as boolean) ?? false} onChange={(v) => onChange(v)} />;
    case "shadow": return <ShadowQuick value={(value as string) ?? "none"} onChange={(v) => onChange(v)} />;
    default: return <TextInput value={String(value ?? "")} onChange={(v) => onChange(v)} />;
  }
}

function ShadowQuick({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const presets = ["none", "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl"];
  return (
    <div className="flex flex-wrap gap-1">
      {presets.map((s) => (
        <button key={s} onClick={() => onChange(s)}
          className={cn("rounded border px-1.5 py-0.5 text-[9px] transition-colors",
            value === s ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted")}>
          {s === "none" ? "None" : s.replace("shadow-", "")}
        </button>
      ))}
    </div>
  );
}

/* ─── Visual Property Sections ─── */

function SpacingSection({ node }: { node: CanvasNode }) {
  const { updateNodeVisual } = useStudio();
  const v = node.visual;
  return (
    <Section title="Spacing" defaultOpen={true}>
      <BoxModelEditor label="Padding" value={v.padding}
        onChange={(padding) => updateNodeVisual(node.id, { padding })} />
      <div className="mt-3">
        <BoxModelEditor label="Margin" value={v.margin}
          onChange={(margin) => updateNodeVisual(node.id, { margin })} />
      </div>
    </Section>
  );
}

function LayoutSection({ node }: { node: CanvasNode }) {
  const { updateNodeVisual } = useStudio();
  const v = node.visual;
  return (
    <Section title="Layout" defaultOpen={true}>
      <LayoutEditor value={{ width: v.width, height: v.height, display: v.display, flexDirection: v.flexDirection, gap: v.gap }}
        onChange={(patch) => updateNodeVisual(node.id, patch)} />
    </Section>
  );
}

function BackgroundSection({ node }: { node: CanvasNode }) {
  const { updateNodeVisual } = useStudio();
  return (
    <Section title="Background">
      <BackgroundEditor value={node.visual.background}
        onChange={(patch) => updateNodeVisual(node.id, { background: { ...node.visual.background, ...patch } })} />
    </Section>
  );
}

function BorderSection({ node }: { node: CanvasNode }) {
  const { updateNodeVisual } = useStudio();
  return (
    <Section title="Border">
      <BorderEditor value={node.visual.border}
        onChange={(patch) => updateNodeVisual(node.id, { border: { ...node.visual.border, ...patch } })} />
    </Section>
  );
}

function TypographySection({ node }: { node: CanvasNode }) {
  const { updateNodeVisual } = useStudio();
  return (
    <Section title="Typography">
      <TypographyEditor value={node.visual.typography}
        onChange={(patch) => updateNodeVisual(node.id, { typography: { ...node.visual.typography, ...patch } })} />
    </Section>
  );
}

function EffectsSection({ node }: { node: CanvasNode }) {
  const { updateNodeVisual } = useStudio();
  return (
    <Section title="Effects">
      <EffectsEditor value={node.visual.effects}
        onChange={(patch) => updateNodeVisual(node.id, { effects: { ...node.visual.effects, ...patch } })} />
    </Section>
  );
}

function AnimationSection({ node }: { node: CanvasNode }) {
  const { updateNodeProps } = useStudio();
  return (
    <Section title="Animation" defaultOpen={false}>
      <AnimationEditor value={{ enter: (node.animation?.enter as string) ?? "", exit: (node.animation?.exit as string) ?? "", duration: node.animation?.duration ?? 200, delay: node.animation?.delay ?? 0, easing: (node.animation?.easing as string) ?? "cubic-bezier(0.4, 0, 0.2, 1)" }}
        onChange={(patch) => updateNodeProps(node.id, patch)} />
    </Section>
  );
}

function HoverSection({ node }: { node: CanvasNode }) {
  const { updateNodeVisual } = useStudio();
  return (
    <Section title="Hover" defaultOpen={false}>
      <HoverStateEditor value={node.visual.hover}
        onChange={(patch) => updateNodeVisual(node.id, { hover: { ...node.visual.hover, ...patch } })} />
    </Section>
  );
}

function FocusSection({ node }: { node: CanvasNode }) {
  const { updateNodeVisual } = useStudio();
  return (
    <Section title="Focus" defaultOpen={false}>
      <FocusStateEditor value={node.visual.focus}
        onChange={(patch) => updateNodeVisual(node.id, { focus: { ...node.visual.focus, ...patch } })} />
    </Section>
  );
}

function DarkModeSection({ node }: { node: CanvasNode }) {
  const { updateNodeVisual } = useStudio();
  return (
    <Section title="Dark Mode" defaultOpen={false}>
      <DarkModeEditor value={node.visual.darkMode}
        onChange={(patch) => updateNodeVisual(node.id, { darkMode: { ...node.visual.darkMode, ...patch } })} />
    </Section>
  );
}

function PositionSection({ node }: { node: CanvasNode }) {
  return (
    <Section title="Position & Size" defaultOpen={false}>
      <Row label="X"><span className="text-xs text-foreground tabular-nums">{Math.round(node.position.x)}px</span></Row>
      <Row label="Y"><span className="text-xs text-foreground tabular-nums">{Math.round(node.position.y)}px</span></Row>
      <Row label="W"><span className="text-xs text-foreground tabular-nums">{Math.round(node.size.width)}px</span></Row>
      <Row label="H"><span className="text-xs text-foreground tabular-nums">{Math.round(node.size.height)}px</span></Row>
    </Section>
  );
}

/* ─── Node Header ─── */

function NodeHeader({ node }: { node: CanvasNode }) {
  const { removeNode, duplicateNode, bringForward, sendBackward, lockNode, toggleVisibility, addFavorite } = useStudio();
  const def = getComponentDef(node.componentName);
  return (
    <>
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-foreground truncate">{def?.name ?? node.componentName}</div>
          <div className="text-[10px] text-muted-foreground">{node.id.slice(0, 12)}</div>
        </div>
      </div>
      <div className="flex gap-1 border-b border-border px-4 py-2 flex-wrap">
        <button onClick={() => bringForward(node.id)} title="Bring Forward" className="rounded bg-muted px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted/80">↑</button>
        <button onClick={() => sendBackward(node.id)} title="Send Backward" className="rounded bg-muted px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted/80">↓</button>
        <button onClick={() => lockNode(node.id)} title="Lock" className={cn("rounded px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted/80", node.locked ? "bg-warning/20 text-warning" : "bg-muted")}>🔒</button>
        <button onClick={() => toggleVisibility(node.id)} title="Visibility" className="rounded bg-muted px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted/80">{node.visible ? "👁" : "🚫"}</button>
        <button onClick={() => duplicateNode(node.id)} title="Duplicate" className="rounded bg-muted px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted/80">⧉</button>
        <button onClick={() => addFavorite(node.componentName)} title="Favorite" className="rounded bg-muted px-2 py-1 text-[10px] text-muted-foreground hover:bg-muted/80">♡</button>
        <button onClick={() => removeNode(node.id)} title="Delete" className="rounded bg-danger/10 px-2 py-1 text-[10px] text-danger hover:bg-danger/20">✕</button>
      </div>
    </>
  );
}

/* ─── Tabs ─── */

type PropTab = "component" | "layout" | "style" | "effects" | "states" | "responsive";

const PROP_TABS: Array<{ id: PropTab; label: string }> = [
  { id: "component", label: "Props" },
  { id: "layout", label: "Layout" },
  { id: "style", label: "Style" },
  { id: "effects", label: "Effects" },
  { id: "states", label: "States" },
  { id: "responsive", label: "Responsive" },
];

/* ─── Main Panel ─── */

function NodeProperties({ node }: { node: CanvasNode }) {
  const [tab, setTab] = useState<PropTab>("component");

  return (
    <div className="flex flex-col h-full">
      <NodeHeader node={node} />
      <div className="flex border-b border-border">
        {PROP_TABS.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={cn("flex-1 px-2 py-2 text-[11px] font-medium transition-colors",
              tab === t.id ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground")}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto">
        {tab === "component" && <ComponentFields node={node} />}
        {tab === "layout" && (
          <>
            <LayoutSection node={node} />
            <SpacingSection node={node} />
            <PositionSection node={node} />
          </>
        )}
        {tab === "style" && (
          <>
            <BackgroundSection node={node} />
            <BorderSection node={node} />
            <TypographySection node={node} />
          </>
        )}
        {tab === "effects" && (
          <>
            <EffectsSection node={node} />
            <AnimationSection node={node} />
          </>
        )}
        {tab === "states" && (
          <>
            <HoverSection node={node} />
            <FocusSection node={node} />
            <DarkModeSection node={node} />
          </>
        )}
        {tab === "responsive" && (
          <div className="p-4">
            <ResponsiveEditor nodeId={node.id} />
          </div>
        )}
      </div>
    </div>
  );
}

export function PropertyPanel() {
  const { canvas, panel } = useStudio();
  if (!panel.rightOpen) return null;

  const selectedId = canvas.selection.selectedIds[0];
  const selectedNode = selectedId ? canvas.nodes[selectedId] : null;

  return (
    <div className="flex h-full w-full flex-col border-l border-border bg-card">
      <div className="flex items-center border-b border-border px-4 py-2">
        <span className="text-xs font-semibold text-foreground">
          {selectedNode ? "Properties" : "No Selection"}
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">
        {selectedNode ? (
          <NodeProperties node={selectedNode} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
            <div className="mb-2 text-3xl opacity-30">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto">
                <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <div className="text-sm">Select a component on the canvas to edit its properties</div>
          </div>
        )}
      </div>
    </div>
  );
}
