"use client";

import { Form, FormField, FormMessage } from "@/components/ui/Form";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const FORM_SOURCE = `import { cn } from "@/lib/cn";
import type { FormProps, FormFieldProps, FormLabelProps, FormMessageProps } from "./Form.types";

export function Form({ children, onSubmit, className }: FormProps) {
  return (
    <form onSubmit={onSubmit} className={cn("space-y-4", className)}>
      {children}
    </form>
  );
}

export function FormField({ children, label, error, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
      {error && <FormMessage type="error">{error}</FormMessage>}
    </div>
  );
}

export function FormLabel({ children, required, className }: FormLabelProps) {
  return (
    <label className={cn("text-sm font-medium leading-none", className)}>
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

export function FormMessage({ children, type = "error", className }: FormMessageProps) {
  const colors = { error: "text-red-500", success: "text-green-500", warning: "text-yellow-500" };
  return <p className={cn("text-sm", colors[type], className)}>{children}</p>;
}`;

const INPUT = "flex h-10 w-full rounded-lg border border-black/[.08] bg-white px-3 py-2 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-ring dark:border-white/[.145] dark:bg-zinc-900";

const BASIC = `import { Form, FormField } from "@/components/ui/Form";

<Form onSubmit={handleSubmit}>
  <FormField label="Email"><input type="email" placeholder="you@example.com" /></FormField>
  <FormField label="Password"><input type="password" placeholder="••••••••" /></FormField>
  <button type="submit">Sign In</button>
</Form>`;

const ERROR = `import { Form, FormField } from "@/components/ui/Form";

<Form onSubmit={handleSubmit}>
  <FormField label="Username" error="Username must be at least 3 characters.">
    <input type="text" defaultValue="ab" />
  </FormField>
</Form>`;

const REQUIRED = `import { Form, FormField } from "@/components/ui/Form";

<Form onSubmit={handleSubmit}>
  <FormField label="Email" error="Email is required."><input type="email" placeholder="you@example.com" /></FormField>
  <FormField label="Full Name"><input type="text" placeholder="Jane Doe" /></FormField>
  <button type="submit">Submit</button>
</Form>`;

const SUCCESS = `import { Form, FormField, FormMessage } from "@/components/ui/Form";

<Form>
  <FormField label="Email">
    <input type="email" defaultValue="jane@example.com" />
    <FormMessage type="success">Looks good!</FormMessage>
  </FormField>
</Form>`;

const MULTI = `import { Form, FormField } from "@/components/ui/Form";

<Form onSubmit={handleSubmit}>
  <FormField label="First Name"><input type="text" placeholder="John" /></FormField>
  <FormField label="Last Name"><input type="text" placeholder="Doe" /></FormField>
  <FormField label="Email" error="Email is required."><input type="email" placeholder="john@example.com" /></FormField>
  <FormField label="Bio"><textarea rows={3} placeholder="Tell us about yourself..." /></FormField>
  <button type="submit">Create Account</button>
</Form>`;

const BTN = "rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-foreground dark:text-background";

export default function FormsPage() {
  return (
    <ComponentDocPage
      name="Form"
      category="Forms"
      description="Form components with label, field grouping, and validation message primitives. Compose them to build accessible forms with consistent spacing and error states."
    >
      <PreviewPanel filename="form-demo.tsx">
        <div className="w-full max-w-sm">
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormField label="Email"><input type="email" placeholder="you@example.com" className={INPUT} /></FormField>
            <FormField label="Password"><input type="password" placeholder="••••••••" className={INPUT} /></FormField>
            <button type="submit" className={BTN}>Sign In</button>
          </Form>
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={FORM_SOURCE} filename="Form.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="Simple form with labeled fields and a submit button." code={BASIC}>
          <div className="w-full max-w-sm">
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormField label="Email"><input type="email" placeholder="you@example.com" className={INPUT} /></FormField>
              <FormField label="Password"><input type="password" placeholder="••••••••" className={INPUT} /></FormField>
              <button type="submit" className={BTN}>Sign In</button>
            </Form>
          </div>
        </ExampleBlock>

        <ExampleBlock title="With Error" description="Field displaying a validation error message." code={ERROR}>
          <div className="w-full max-w-sm">
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormField label="Username" error="Username must be at least 3 characters.">
                <input type="text" defaultValue="ab" className={INPUT} />
              </FormField>
            </Form>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Required Fields" description="Fields with an error state on submit." code={REQUIRED}>
          <div className="w-full max-w-sm">
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormField label="Email" error="Email is required."><input type="email" placeholder="you@example.com" className={INPUT} /></FormField>
              <FormField label="Full Name"><input type="text" placeholder="Jane Doe" className={INPUT} /></FormField>
              <button type="submit" className={BTN}>Submit</button>
            </Form>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Success Message" description="Display a success message below a field." code={SUCCESS}>
          <div className="w-full max-w-sm">
            <Form>
              <FormField label="Email">
                <input type="email" defaultValue="jane@example.com" className={INPUT} />
                <FormMessage type="success">Looks good!</FormMessage>
              </FormField>
            </Form>
          </div>
        </ExampleBlock>

        <ExampleBlock title="Multiple Fields" description="A registration-style form with several fields." code={MULTI}>
          <div className="w-full max-w-sm">
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormField label="First Name"><input type="text" placeholder="John" className={INPUT} /></FormField>
              <FormField label="Last Name"><input type="text" placeholder="Doe" className={INPUT} /></FormField>
              <FormField label="Email" error="Email is required."><input type="email" placeholder="john@example.com" className={INPUT} /></FormField>
              <FormField label="Bio"><textarea rows={3} placeholder="Tell us about yourself..." className={`${INPUT} resize-none`} /></FormField>
              <button type="submit" className={BTN}>Create Account</button>
            </Form>
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
