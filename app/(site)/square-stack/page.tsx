"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { SquareStack, Layers, Copy, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

const installCommand = `npx component-library@latest add square-stack`;
const usageCode = `<SquareStack items={stackItems} orientation="vertical" />`;

interface StackItem {
  id: number;
  name: string;
  color: string;
  visible: boolean;
}

function StackCards() {
  const [items] = useState<StackItem[]>([
    { id: 1, name: "Background", color: "bg-blue-100 border-blue-300", visible: true },
    { id: 2, name: "Image", color: "bg-green-100 border-green-300", visible: true },
    { id: 3, name: "Text Overlay", color: "bg-yellow-100 border-yellow-300", visible: true },
    { id: 4, name: "Button", color: "bg-purple-100 border-purple-300", visible: true },
  ]);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <SquareStack className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Stack Cards</span>
      </div>
      <div className="relative h-32">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`absolute left-1/2 top-1/2 h-20 w-32 -translate-x-1/2 -translate-y-1/2 rounded-md border-2 p-2 text-center text-xs font-medium ${item.color}`}
            style={{
              transform: `translate(-50%, calc(-50% - ${index * 4}px))`,
              zIndex: items.length - index,
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div className="mt-2 text-center text-xs text-muted-foreground">{items.length} layers</div>
    </div>
  );
}

function LayerPanel() {
  const [layers, setLayers] = useState<StackItem[]>([
    { id: 1, name: "Background", color: "bg-blue-100 border-blue-300", visible: true },
    { id: 2, name: "Header", color: "bg-green-100 border-green-300", visible: true },
    { id: 3, name: "Content", color: "bg-yellow-100 border-yellow-300", visible: true },
    { id: 4, name: "Footer", color: "bg-purple-100 border-purple-300", visible: true },
  ]);

  const toggleVisibility = (id: number) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Layers className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Layer Panel</span>
      </div>
      <div className="space-y-1">
        {[...layers].reverse().map((layer) => (
          <div
            key={layer.id}
            className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted/50 ${
              !layer.visible ? "opacity-50" : ""
            }`}
          >
            <button onClick={() => toggleVisibility(layer.id)}>
              <div className={`h-3 w-3 rounded-sm border ${layer.color}`} />
            </button>
            <span className="flex-1">{layer.name}</span>
            <span className="text-xs text-muted-foreground">
              {layer.visible ? "Visible" : "Hidden"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DuplicateLayer() {
  const [layers, setLayers] = useState([
    { id: 1, name: "Layer 1", count: 1 },
  ]);

  const duplicate = (id: number) => {
    setLayers((prev) => {
      const layer = prev.find((l) => l.id === id);
      if (!layer) return prev;
      const newLayer = {
        id: Date.now(),
        name: `${layer.name} (copy)`,
        count: layer.count + 1,
      };
      const index = prev.findIndex((l) => l.id === id);
      const newLayers = [...prev];
      newLayers.splice(index + 1, 0, newLayer);
      return newLayers;
    });
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Copy className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Duplicate Layer</span>
      </div>
      <div className="space-y-2">
        {layers.map((layer) => (
          <div key={layer.id} className="flex items-center gap-2 rounded-md border px-3 py-2">
            <span className="flex-1 text-sm">{layer.name}</span>
            <button
              onClick={() => duplicate(layer.id)}
              className="rounded-md bg-muted px-2 py-1 text-xs hover:bg-muted/80"
            >
              <Copy className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{layers.length} layer(s)</p>
    </div>
  );
}

function AddLayer() {
  const [layers, setLayers] = useState([
    { id: 1, name: "Background" },
  ]);

  const addLayer = () => {
    setLayers((prev) => [
      ...prev,
      { id: Date.now(), name: `Layer ${prev.length + 1}` },
    ]);
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Plus className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Add Layer</span>
      </div>
      <div className="space-y-2">
        {layers.map((layer) => (
          <div key={layer.id} className="rounded-md border px-3 py-2 text-sm">
            {layer.name}
          </div>
        ))}
      </div>
      <button
        onClick={addLayer}
        className="mt-3 flex w-full items-center justify-center gap-1 rounded-md border border-dashed py-2 text-sm text-muted-foreground hover:bg-muted/50"
      >
        <Plus className="h-4 w-4" />
        Add Layer
      </button>
    </div>
  );
}

function RemoveLayer() {
  const [layers, setLayers] = useState([
    { id: 1, name: "Background" },
    { id: 2, name: "Header" },
    { id: 3, name: "Content" },
  ]);

  const removeLayer = (id: number) => {
    setLayers((prev) => prev.filter((l) => l.id !== id));
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Trash2 className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Remove Layer</span>
      </div>
      <div className="space-y-2">
        {layers.map((layer) => (
          <div key={layer.id} className="flex items-center gap-2 rounded-md border px-3 py-2">
            <span className="flex-1 text-sm">{layer.name}</span>
            <button
              onClick={() => removeLayer(layer.id)}
              className="rounded-md p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      {layers.length === 0 && (
        <p className="mt-2 text-center text-xs text-muted-foreground">No layers</p>
      )}
    </div>
  );
}

function ReorderLayers() {
  const [layers, setLayers] = useState([
    { id: 1, name: "Background", order: 1 },
    { id: 2, name: "Content", order: 2 },
    { id: 3, name: "Overlay", order: 3 },
  ]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newLayers = [...layers];
    [newLayers[index - 1], newLayers[index]] = [newLayers[index], newLayers[index - 1]];
    setLayers(newLayers);
  };

  const moveDown = (index: number) => {
    if (index === layers.length - 1) return;
    const newLayers = [...layers];
    [newLayers[index], newLayers[index + 1]] = [newLayers[index + 1], newLayers[index]];
    setLayers(newLayers);
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <ArrowUp className="h-4 w-4 text-muted-foreground" />
        <ArrowDown className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Reorder Layers</span>
      </div>
      <div className="space-y-1">
        {layers.map((layer, index) => (
          <div key={layer.id} className="flex items-center gap-2 rounded-md border px-3 py-2">
            <span className="text-xs text-muted-foreground w-4">{index + 1}</span>
            <span className="flex-1 text-sm">{layer.name}</span>
            <div className="flex gap-1">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="rounded p-1 hover:bg-muted disabled:opacity-30"
              >
                <ArrowUp className="h-3 w-3" />
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === layers.length - 1}
                className="rounded p-1 hover:bg-muted disabled:opacity-30"
              >
                <ArrowDown className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LayerVisibility() {
  const [layers, setLayers] = useState([
    { id: 1, name: "Background", visible: true },
    { id: 2, name: "Header", visible: true },
    { id: 3, name: "Sidebar", visible: false },
    { id: 4, name: "Content", visible: true },
  ]);

  const toggle = (id: number) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l))
    );
  };

  const toggleAll = () => {
    const allVisible = layers.every((l) => l.visible);
    setLayers((prev) => prev.map((l) => ({ ...l, visible: !allVisible })));
  };

  const visibleCount = layers.filter((l) => l.visible).length;

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Layer Visibility</span>
        </div>
        <button
          onClick={toggleAll}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          {visibleCount === layers.length ? "Hide All" : "Show All"}
        </button>
      </div>
      <div className="space-y-1">
        {layers.map((layer) => (
          <button
            key={layer.id}
            onClick={() => toggle(layer.id)}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted/50 ${
              !layer.visible ? "opacity-50" : ""
            }`}
          >
            <div
              className={`h-3 w-3 rounded-sm border-2 ${
                layer.visible ? "border-primary bg-primary" : "border-muted-foreground"
              }`}
            />
            <span className="flex-1">{layer.name}</span>
            <span className="text-xs text-muted-foreground">
              {layer.visible ? "👁" : "—"}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {visibleCount} of {layers.length} visible
      </p>
    </div>
  );
}

export default function SquareStackPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Square Stack</h1>
          <Badge variant="primary">Layout</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A layout component for stacking square elements in various orientations with drag-and-drop support and visual indicators.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Stack Cards</h2>
        <ComponentPreview component="SquareStackCards" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Layer Panel</h2>
        <ComponentPreview component="SquareStackLayerPanel" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Duplicate Layer</h2>
        <ComponentPreview component="SquareStackDuplicateLayer" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Add Layer</h2>
        <ComponentPreview component="SquareStackAddLayer" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Remove Layer</h2>
        <ComponentPreview component="SquareStackRemoveLayer" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Reorder Layers</h2>
        <ComponentPreview component="SquareStackReorderLayers" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Layer Visibility</h2>
        <ComponentPreview component="SquareStackLayerVisibility" />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">API Reference</h2>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Required</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">items</td>
                <td className="px-4 py-3 text-muted-foreground">StackItem[]</td>
                <td className="px-4 py-3 text-muted-foreground">[]</td>
                <td className="px-4 py-3">Yes</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">orientation</td>
                <td className="px-4 py-3 text-muted-foreground">{'"vertical" | "horizontal"'}</td>
                <td className="px-4 py-3 text-muted-foreground">{'"vertical"'}</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">spacing</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">4</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
