"use client";

import { ComponentPreview } from "@/components/preview";
import {
  ProfileCard,
  VisualPropsEditor,
  profileCardDefaults,
  profileCardSchema,
} from "@/features/props-editor";

export default function PropsEditorPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Visual Props Editor
        </h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Tune any component without writing code. Drag sliders, pick colors,
          upload images, and switch breakpoints — the preview updates instantly.
          Every interaction lands in an undo/redo history and can be saved as a
          preset.
        </p>
      </header>

      <ComponentPreview
        id="props-editor-full"
        description="A schema-driven props editor with live preview, responsive values, undo/redo, and presets."
      >
        <div className="w-full py-6">
          <VisualPropsEditor
            schema={profileCardSchema}
            defaultValues={profileCardDefaults}
            preview={(values) => (
              <div className="flex items-center justify-center">
                <ProfileCard values={values} />
              </div>
            )}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
