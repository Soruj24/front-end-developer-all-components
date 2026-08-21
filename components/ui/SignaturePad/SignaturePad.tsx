"use client";

import { forwardRef, useRef, useState, useEffect, useImperativeHandle } from "react";
import { cn } from "@/lib/cn";
import { Eraser, Download, Pen } from "lucide-react";
import type { SignaturePadProps, SignaturePadRef } from "./SignaturePad.types";

function SignaturePad(
  {
    width = 400,
    height = 200,
    penColor = "#000000",
    penWidth = 2,
    className,
    onClear,
    onSave,
    readOnly = false,
    label = "Signature pad",
    placeholder = "Draw your signature above",
  }: SignaturePadProps,
  ref: React.Ref<SignaturePadRef>,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [saved, setSaved] = useState(false);

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
    if (readOnly) return;
    setIsDrawing(true);
    const ctx = canvasRef.current!.getContext("2d")!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || readOnly) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const pos = getPos(e);
    ctx.strokeStyle = penColor;
    ctx.lineWidth = penWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setHasContent(true);
  };

  const stopDraw = () => setIsDrawing(false);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    setHasContent(false);
    onClear?.();
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    onSave?.(dataUrl);
  };

  useImperativeHandle(ref, () => ({
    clear,
    save,
    canvas: () => canvasRef.current!,
  }));

  return (
    <div className="flex flex-col gap-3" role="group" aria-label={label}>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-border/60 bg-background shadow-sm transition-shadow duration-200",
          "focus-within:border-primary/40 focus-within:shadow-md focus-within:shadow-primary/5",
          readOnly && "opacity-60 pointer-events-none",
          className,
        )}
      >
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={cn(
            "block w-full cursor-crosshair",
            readOnly && "cursor-default",
          )}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          aria-label={label}
          role="img"
        />

        {!hasContent && !readOnly && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <span className="text-sm text-muted-foreground/60 select-none">
              {placeholder}
            </span>
          </div>
        )}
      </div>

      {!readOnly && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={clear}
            disabled={!hasContent}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150",
              "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
              "active:scale-[0.98]",
              "disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100",
            )}
          >
            <Eraser className="h-3.5 w-3.5" />
            Clear
          </button>

          <button
            type="button"
            onClick={save}
            disabled={!hasContent}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150",
              "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
              "active:scale-[0.98]",
              "disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100",
            )}
          >
            <Download className="h-3.5 w-3.5" />
            Save
          </button>

          {saved && (
            <span className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              Saved
            </span>
          )}
        </div>
      )}
    </div>
  );
}

const ForwardedSignaturePad = Object.assign(
  forwardRef(SignaturePad),
  { displayName: "SignaturePad" },
);
export default ForwardedSignaturePad;
