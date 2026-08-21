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
  return <form onSubmit={onSubmit} className={cn("flex flex-col gap-5", className)}>{children}</form>;
}

export function FormField({ children, label, error, className }: FormFieldProps) {
  return <div className={cn("flex flex-col gap-1.5", className)}>{label && <FormLabel>{label}</FormLabel>}{children}{error && <FormMessage type="error">{error}</FormMessage>}</div>;
}

export function FormLabel({ children, required, className }: FormLabelProps) {
  return <label className={cn("text-sm font-medium text-foreground", className)}>{children}{required && <span className="ml-1 text-destructive">*</span>}</label>;
}

export function FormMessage({ children, type = "error", className }: FormMessageProps) {
  const styles = { error: "text-destructive", success: "text-emerald-600 dark:text-emerald-400", warning: "text-amber-600 dark:text-amber-400" };
  return <p className={cn("flex items-center gap-1.5 text-xs", styles[type], className)}>{children}</p>;
}`;

const inputClass = "flex h-10 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:bg-card";

const inputErrorClass = "flex h-10 w-full rounded-xl border border-destructive bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-200 focus:outline-none focus:border-destructive focus:ring-2 focus:ring-destructive/20 dark:bg-card";

const btnClass = "inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-card active:scale-[0.98]";

const BASIC = `import { Form, FormField } from "@/components/ui/Form";

<Form onSubmit={handleSubmit}>
  <FormField label="Email"><input type="email" placeholder="you@example.com" className="input" /></FormField>
  <FormField label="Password"><input type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" className="input" /></FormField>
  <button type="submit" className="btn">Sign In</button>
</Form>`;

const ERROR = `import { Form, FormField } from "@/components/ui/Form";

<Form onSubmit={handleSubmit}>
  <FormField label="Username" error="Username must be at least 3 characters.">
    <input type="text" defaultValue="ab" className="input input-error" />
  </FormField>
</Form>`;

const REQUIRED = `import { Form, FormField } from "@/components/ui/Form";

<Form onSubmit={handleSubmit}>
  <FormField label="Email" error="Email is required."><input type="email" placeholder="you@example.com" className="input input-error" /></FormField>
  <FormField label="Full Name"><input type="text" placeholder="Jane Doe" className="input" /></FormField>
  <button type="submit" className="btn">Submit</button>
</Form>`;

const SUCCESS = `import { Form, FormField, FormMessage } from "@/components/ui/Form";

<Form>
  <FormField label="Email">
    <input type="email" defaultValue="jane@example.com" className="input" />
    <FormMessage type="success">Looks good!</FormMessage>
  </FormField>
</Form>`;

const WARNING = `import { Form, FormField, FormMessage } from "@/components/ui/Form";

<Form>
  <FormField label="Password">
    <input type="password" placeholder="Enter password" className="input" />
    <FormMessage type="warning">Password is too weak.</FormMessage>
  </FormField>
</Form>`;

const MULTI = `import { Form, FormField } from "@/components/ui/Form";

<Form onSubmit={handleSubmit}>
  <FormField label="First Name"><input type="text" placeholder="John" className="input" /></FormField>
  <FormField label="Last Name"><input type="text" placeholder="Doe" className="input" /></FormField>
  <FormField label="Email" error="Email is required."><input type="email" placeholder="john@example.com" className="input input-error" /></FormField>
  <FormField label="Bio"><textarea rows={3} placeholder="Tell us about yourself..." className="input min-h-[80px]" /></FormField>
  <button type="submit" className="btn">Create Account</button>
</Form>`;

const TEXTAREA = `import { Form, FormField } from "@/components/ui/Form";

<Form onSubmit={handleSubmit}>
  <FormField label="Message"><textarea rows={4} placeholder="Write your message..." className="input min-h-[100px]" /></FormField>
  <button type="submit" className="btn">Send</button>
</Form>`;

const SELECT = `import { Form, FormField } from "@/components/ui/Form";

<Form onSubmit={handleSubmit}>
  <FormField label="Role">
    <select className="input">
      <option>Select a role</option>
      <option>Developer</option>
      <option>Designer</option>
    </select>
  </FormField>
</Form>`;

export default function FormsPage() {
  return (
    <ComponentDocPage
      name="Form"
      category="Forms"
      description="Form components with label, field grouping, and validation message primitives. Compose them to build accessible forms with consistent spacing, error states, and semantic colors."
    >
      <PreviewPanel filename="form-demo.tsx">
        <div className="w-full max-w-sm">
          <Form onSubmit={(e) => e.preventDefault()}>
            <FormField label="Email">
              <input type="email" placeholder="you@example.com" className={inputClass} />
            </FormField>
            <FormField label="Password">
              <input type="password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" className={inputClass} />
            </FormField>
            <button type="submit" className={btnClass}>Sign In</button>
          </Form>
        </div>
      </PreviewPanel>

      <SourceCodeViewer
        source={FORM_SOURCE}
        filename="components/ui/Form/Form.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <ExampleBlock
          title="Basic"
          description="Simple form with labeled fields and a submit button."
          code={BASIC}
          filename="basic.tsx"
        >
          <div className="w-full max-w-sm">
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormField label="Email">
                <input type="email" placeholder="you@example.com" className={inputClass} />
              </FormField>
              <FormField label="Password">
                <input type="password" placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;" className={inputClass} />
              </FormField>
              <button type="submit" className={btnClass}>Sign In</button>
            </Form>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="With Error"
          description="Field displaying a validation error message."
          code={ERROR}
          filename="error.tsx"
        >
          <div className="w-full max-w-sm">
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormField label="Username" error="Username must be at least 3 characters.">
                <input type="text" defaultValue="ab" className={inputErrorClass} />
              </FormField>
            </Form>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Required Fields"
          description="Fields with an error state on submit."
          code={REQUIRED}
          filename="required.tsx"
        >
          <div className="w-full max-w-sm">
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormField label="Email" error="Email is required.">
                <input type="email" placeholder="you@example.com" className={inputErrorClass} />
              </FormField>
              <FormField label="Full Name">
                <input type="text" placeholder="Jane Doe" className={inputClass} />
              </FormField>
              <button type="submit" className={btnClass}>Submit</button>
            </Form>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Success Message"
          description="Display a success message below a field."
          code={SUCCESS}
          filename="success.tsx"
        >
          <div className="w-full max-w-sm">
            <Form>
              <FormField label="Email">
                <input type="email" defaultValue="jane@example.com" className={inputClass} />
                <FormMessage type="success">Looks good!</FormMessage>
              </FormField>
            </Form>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Warning Message"
          description="Display a warning message below a field."
          code={WARNING}
          filename="warning.tsx"
        >
          <div className="w-full max-w-sm">
            <Form>
              <FormField label="Password">
                <input type="password" placeholder="Enter password" className={inputClass} />
                <FormMessage type="warning">Password is too weak.</FormMessage>
              </FormField>
            </Form>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Multiple Fields"
          description="A registration-style form with several fields."
          code={MULTI}
          filename="multi.tsx"
        >
          <div className="w-full max-w-sm">
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormField label="First Name">
                <input type="text" placeholder="John" className={inputClass} />
              </FormField>
              <FormField label="Last Name">
                <input type="text" placeholder="Doe" className={inputClass} />
              </FormField>
              <FormField label="Email" error="Email is required.">
                <input type="email" placeholder="john@example.com" className={inputErrorClass} />
              </FormField>
              <FormField label="Bio">
                <textarea rows={3} placeholder="Tell us about yourself..." className={`${inputClass} min-h-[80px]`} />
              </FormField>
              <button type="submit" className={btnClass}>Create Account</button>
            </Form>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Textarea"
          description="Form with a textarea field."
          code={TEXTAREA}
          filename="textarea.tsx"
        >
          <div className="w-full max-w-sm">
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormField label="Message">
                <textarea rows={4} placeholder="Write your message..." className={`${inputClass} min-h-[100px]`} />
              </FormField>
              <button type="submit" className={btnClass}>Send</button>
            </Form>
          </div>
        </ExampleBlock>

        <ExampleBlock
          title="Select"
          description="Form with a select dropdown."
          code={SELECT}
          filename="select.tsx"
        >
          <div className="w-full max-w-sm">
            <Form onSubmit={(e) => e.preventDefault()}>
              <FormField label="Role">
                <select className={inputClass}>
                  <option>Select a role</option>
                  <option>Developer</option>
                  <option>Designer</option>
                </select>
              </FormField>
              <button type="submit" className={btnClass}>Submit</button>
            </Form>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
