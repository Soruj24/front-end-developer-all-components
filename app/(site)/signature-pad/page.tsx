"use client";

import { useState, useRef, useEffect } from "react";
import { Eraser, Download, Pen } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SIGNATURE_PAD_SOURCE } from "./signature-pad-source";

const BASIC_CODE = `<SignaturePad width={400} height={150} />`;

const CUSTOM_CODE = `<SignaturePad width={400} height={150} penColor="#2563eb" penWidth={4} />`;

const SAVE_CODE = `<SignaturePad
  width={400}
  height={150}
  onSave={(dataUrl) => console.log(dataUrl)}
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
    <ComponentDocPage
      name="Signature Pad"
      category="Forms"
      description="A canvas-based signature capture component. Draw signatures with customizable pen color, width, and clear/save actions."
    >
      <PreviewPanel filename="signature-pad.tsx">
        <BasicSignatureDemo />
      </PreviewPanel>

      <SourceCodeViewer source={SIGNATURE_PAD_SOURCE} filename="components/ui/SignaturePad/SignaturePad.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Custom Pen" description="Signature with a custom blue pen and thicker stroke." code={CUSTOM_CODE}>
          <CustomPenDemo />
        </ExampleBlock>

        <ExampleBlock title="Clear & Save" description="Signature pad with clear and save actions." code={SAVE_CODE}>
          <ClearButtonDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}