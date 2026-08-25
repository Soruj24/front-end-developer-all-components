"use client";

import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  ProfileCard,
  VisualPropsEditor,
  profileCardDefaults,
  profileCardSchema,
} from "@/features/props-editor";

const installCommand = `npx component-library@latest add props-editor`;

const usageCode = `import { VisualPropsEditor } from "@/features/props-editor";

<VisualPropsEditor
  schema={schema}
  defaultValues={defaults}
  preview={(values) => <MyComponent values={values} />}
/>`;

export default function PropsEditorPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Visual Props Editor
          </h1>
          <Badge variant="primary">1 example</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Tune any component without writing code. Drag sliders, pick colors,
          upload images, and switch breakpoints — the preview updates instantly.
          Every interaction lands in an undo/redo history and can be saved as a
          preset.
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
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Examples</h2>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-medium text-foreground">Schema-Driven Editor</h3>
            <p className="text-sm text-muted-foreground">A schema-driven props editor with live preview, responsive values, undo/redo, and presets.</p>
          </div>
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
      </section>


    </div>
  );
}
