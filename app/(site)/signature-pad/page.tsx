"use client";

import { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { Eraser, Download, Pen } from "lucide-react";

const installCommand = `npx component-library@latest add signature-pad`;

const usageCode = `import { SignaturePad } from "@/components/ui";

<SignaturePad
  onSave={(dataUrl) => console.log(dataUrl)}
  width={400}
  height={200}
/>`;

function useSignatureCanvas(width: number, height: number, penColor: string, penWidth: number) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }, [width, height]);

  const getPos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const ctx = canvasRef.current!.getContext("2d")!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const pos = getPos(e);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const stopDraw = () => setIsDrawing(false);

  const clear = () => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  };

  return { canvasRef, startDraw, draw, stopDraw, clear };
}

function BasicSignatureDemo() {
  const { canvasRef, startDraw, draw, stopDraw, clear } = useSignatureCanvas(400, 150, "#000000", 2);
  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={400}
        height={150}
        className="rounded-lg border border-border cursor-crosshair"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
      />
      <button onClick={clear} className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm font-medium hover:bg-muted/80">
        <Eraser className="h-4 w-4" />Clear
      </button>
    </div>
  );
}

function CustomPenDemo() {
  const { canvasRef, startDraw, draw, stopDraw, clear } = useSignatureCanvas(400, 150, "#2563eb", 4);
  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={400}
        height={150}
        className="rounded-lg border border-border cursor-crosshair"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
      />
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Pen className="h-3 w-3 text-blue-600" />Blue pen, 4px
        </span>
        <button onClick={clear} className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm font-medium hover:bg-muted/80">
          <Eraser className="h-4 w-4" />Clear
        </button>
      </div>
    </div>
  );
}

function ClearButtonDemo() {
  const { canvasRef, startDraw, draw, stopDraw, clear } = useSignatureCanvas(400, 150, "#000000", 2);
  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas
        ref={canvasRef}
        width={400}
        height={150}
        className="rounded-lg border border-border cursor-crosshair"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
      />
      <div className="flex items-center gap-2">
        <button onClick={clear} className="inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm font-medium hover:bg-muted/80">
          <Eraser className="h-4 w-4" />Clear
        </button>
        <button onClick={save} className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Download className="h-4 w-4" />Save
        </button>
        {saved && <span className="text-sm text-green-600">Saved!</span>}
      </div>
    </div>
  );
}

export default function SignaturePadPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Signature Pad</h1>
          <Badge variant="primary">Input</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A canvas-based signature capture component. Draw signatures with customizable pen color, width, and clear/save actions.
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
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Basic Signature</h2>
          <p className="mt-1 text-sm text-muted-foreground">Draw on the canvas and clear when needed.</p>
        </div>
        <ComponentPreview id="signature-pad-basic">
          <BasicSignatureDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Custom Pen</h2>
          <p className="mt-1 text-sm text-muted-foreground">Signature with a custom blue pen and thicker stroke.</p>
        </div>
        <ComponentPreview id="signature-pad-custom">
          <CustomPenDemo />
        </ComponentPreview>
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Clear &amp; Save</h2>
          <p className="mt-1 text-sm text-muted-foreground">Signature pad with clear and save actions.</p>
        </div>
        <ComponentPreview id="signature-pad-save">
          <ClearButtonDemo />
        </ComponentPreview>
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
                <td className="px-4 py-3 font-mono text-xs">width</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">400</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">height</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">200</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">penColor</td>
                <td className="px-4 py-3 text-muted-foreground">string</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;#000000&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">penWidth</td>
                <td className="px-4 py-3 text-muted-foreground">number</td>
                <td className="px-4 py-3 text-muted-foreground">2</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">onSave</td>
                <td className="px-4 py-3 text-muted-foreground">(dataUrl: string) =&gt; void</td>
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
