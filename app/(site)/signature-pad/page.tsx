"use client";

import { useState, useRef } from "react";
import { Pen } from "lucide-react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SignaturePad, type SignaturePadRef } from "@/components/ui/SignaturePad";
import { SIGNATURE_PAD_SOURCE } from "./signature-pad-source";

const CUSTOM_CODE = `import { SignaturePad } from "@/components/ui/SignaturePad";

<SignaturePad
  width={400}
  height={150}
  penColor="#2563eb"
  penWidth={4}
/>`;

const SAVE_CODE = `import { SignaturePad } from "@/components/ui/SignaturePad";

<SignaturePad
  width={400}
  height={150}
  onSave={(dataUrl) => console.log(dataUrl)}
/>`;

const READONLY_CODE = `import { SignaturePad } from "@/components/ui/SignaturePad";

<SignaturePad
  width={400}
  height={150}
  readOnly
/>`;

const REF_CODE = `import { useRef } from "react";
import { SignaturePad, type SignaturePadRef } from "@/components/ui/SignaturePad";

const padRef = useRef<SignaturePadRef>(null);

<SignaturePad ref={padRef} width={400} height={150} />
<button onClick={() => padRef.current?.clear()}>Clear</button>
<button onClick={() => padRef.current?.save()}>Save</button>`;

export default function SignaturePadPage() {
  const [saved, setSaved] = useState(false);
  const padRef = useRef<SignaturePadRef>(null);
  const [refSaved, setRefSaved] = useState(false);

  return (
    <ComponentDocPage
      name="Signature Pad"
      category="Forms"
      description="A canvas-based signature capture component. Draw signatures with customizable pen color, width, and clear/save actions. Supports refs, read-only mode, and accessible markup."
    >
      <PreviewPanel filename="signature-pad.tsx">
        <SignaturePad width={400} height={150} />
      </PreviewPanel>

      <SourceCodeViewer source={SIGNATURE_PAD_SOURCE} filename="components/ui/SignaturePad/SignaturePad.tsx" defaultExpanded />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="Custom Pen"
          description="Signature with a custom blue pen and thicker stroke."
          code={CUSTOM_CODE}
          filename="custom-pen.tsx"
        >
          <div className="flex flex-col gap-3">
            <SignaturePad width={400} height={150} penColor="#2563eb" penWidth={4} />
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Pen className="h-3 w-3 text-blue-600" />
              Blue pen, 4px stroke
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Save Callback"
          description="Signature pad with an onSave callback. Click Save to capture."
          code={SAVE_CODE}
          filename="save-callback.tsx"
        >
          <SignaturePad
            width={400}
            height={150}
            onSave={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
          />
          {saved && (
            <p className="mt-1 text-sm font-medium text-emerald-600">
              Signature saved successfully.
            </p>
          )}
        </ExampleBlock>

        <ExampleBlock
          title="Read Only"
          description="Display a signature without allowing interaction."
          code={READONLY_CODE}
          filename="readonly.tsx"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs text-muted-foreground">This pad is read-only and cannot be drawn on.</p>
            <SignaturePad width={400} height={150} readOnly />
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Ref Access"
          description="Control the signature pad externally via ref methods (clear, save)."
          code={REF_CODE}
          filename="ref-access.tsx"
        >
          <div className="flex flex-col gap-3">
            <SignaturePad ref={padRef} width={400} height={150} onSave={() => { setRefSaved(true); setTimeout(() => setRefSaved(false), 2000); }} />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => padRef.current?.clear()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-150 hover:bg-muted/80 hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
              >
                External Clear
              </button>
              <button
                type="button"
                onClick={() => padRef.current?.save()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-150 hover:bg-primary/90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
              >
                External Save
              </button>
              {refSaved && (
                <span className="text-sm font-medium text-emerald-600">Saved via ref</span>
              )}
            </div>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Sizes"
          description="Adjust canvas dimensions for different layouts."
          code={`<SignaturePad width={320} height={100} />
<SignaturePad width={400} height={150} />
<SignaturePad width={480} height={200} />`}
          filename="sizes.tsx"
        >
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Small (320 &times; 100)</p>
              <SignaturePad width={320} height={100} />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Medium (400 &times; 150)</p>
              <SignaturePad width={400} height={150} />
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium text-muted-foreground">Large (480 &times; 200)</p>
              <SignaturePad width={480} height={200} />
            </div>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
