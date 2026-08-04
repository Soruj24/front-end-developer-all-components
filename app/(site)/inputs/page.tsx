"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";

const installCommand = `npx component-library@latest add input`;

const usageCode = `import { Input } from "@/components/_input";

<Input label="Email" placeholder="you@example.com" />
<Input label="Password" type="password" error helperText="Required" />`;

function SearchIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-4 w-4 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

const inputBase = "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
const inputBorder = "border-border";

export default function InputsPage() {
  const [textValue, setTextValue] = useState("");
  const [charCount, setCharCount] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [toggled2, setToggled2] = useState(true);
  const [fileName, setFileName] = useState("");

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Inputs</h1>
          <Badge variant="primary">12 variants</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Various input types styled with Tailwind CSS. Each example is
          interactive — use the tabs to inspect source, CLI, installation, and
          dependencies.
        </p>
      </header>

      {/* Installation */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Installation</h2>
        <CodeBlock code={installCommand} filename="Terminal" label="bash" variant="terminal" />
      </section>

      {/* Usage */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Usage</h2>
        <CodeBlock code={usageCode} filename="page.tsx" label="tsx" />
      </section>

      <ComponentPreview id="input-text">
        <input type="text" placeholder="Enter your name" className={`${inputBase} ${inputBorder}`} />
      </ComponentPreview>

      <ComponentPreview id="input-email">
        <input type="email" placeholder="you@example.com" className={`${inputBase} ${inputBorder}`} />
      </ComponentPreview>

      <ComponentPreview id="input-password">
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="••••••••"
            className={`${inputBase} ${inputBorder} w-full pr-10`}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-muted-foreground dark:hover:text-zinc-300"
          >
            {passwordVisible ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            )}
          </button>
        </div>
      </ComponentPreview>

      <ComponentPreview id="input-number">
        <input type="number" placeholder="42" className={`${inputBase} ${inputBorder}`} />
      </ComponentPreview>

      <ComponentPreview id="input-search">
        <input type="search" placeholder="Search..." className={`${inputBase} ${inputBorder}`} />
      </ComponentPreview>

      <ComponentPreview id="input-textarea">
        <textarea rows={3} placeholder="Write something..." className={`${inputBase} ${inputBorder}`} />
      </ComponentPreview>

      <ComponentPreview id="input-select">
        <select aria-label="Pick an option" className={`${inputBase} ${inputBorder}`}>
          <option>Option A</option>
          <option>Option B</option>
          <option>Option C</option>
        </select>
      </ComponentPreview>

      <ComponentPreview id="input-checkbox-radio">
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="rounded border-border" />
            Checkbox
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="radio" className="border-border" />
            Radio A
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" name="radio" className="border-border" />
            Radio B
          </label>
        </div>
      </ComponentPreview>

      <ComponentPreview id="input-leading-icon">
        <div className="flex w-full flex-col gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2"><SearchIcon /></span>
            <input type="text" placeholder="Search..." className={`${inputBase} ${inputBorder} w-full pl-10`} />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2"><MailIcon /></span>
            <input type="email" aria-label="Email address" placeholder="you@example.com" className={`${inputBase} ${inputBorder} w-full pl-10`} />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2"><UserIcon /></span>
            <input type="text" aria-label="Username" placeholder="Username" className={`${inputBase} ${inputBorder} w-full pl-10`} />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="input-suffix">
        <div className="flex w-full flex-col gap-3">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input type="number" placeholder="0.00" className={`${inputBase} ${inputBorder} w-full pl-7`} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/70">USD</span>
          </div>
          <div className="relative">
            <input type="text" placeholder="username" defaultValue="john" className={`${inputBase} ${inputBorder} w-full pr-8`} />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/70">.com</span>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="input-clear">
        <div className="relative w-full">
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder="Type something..."
            className={`${inputBase} ${inputBorder} w-full pr-10`}
          />
          {textValue && (
            <button
              type="button"
              onClick={() => setTextValue("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-muted-foreground dark:hover:text-zinc-300"
            >
              <XIcon />
            </button>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview id="input-char-counter">
        <div className="flex w-full flex-col gap-1.5">
          <div className="relative">
            <textarea
              rows={3}
              maxLength={200}
              value={charCount}
              onChange={(e) => setCharCount(e.target.value)}
              placeholder="Write something..."
              className={`${inputBase} ${inputBorder} w-full resize-none pr-12`}
            />
          </div>
          <p className={`text-right text-xs ${charCount.length >= 180 ? "text-danger" : "text-muted-foreground/70"}`}>
            {charCount.length}/200
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview id="input-disabled">
        <div className="flex w-full flex-col gap-3">
          <input type="text" value="Disabled input" disabled className={`${inputBase} border-black/[.08] bg-muted/40 text-muted-foreground/70 dark:border-white/[.145] dark:bg-zinc-900 dark:text-muted-foreground cursor-not-allowed`} />
          <input type="text" value="Readonly value" readOnly className={`${inputBase} ${inputBorder} bg-muted/40 dark:bg-zinc-900/50`} />
        </div>
      </ComponentPreview>

      <ComponentPreview id="input-helper">
        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <input type="password" placeholder="Create a password" className={`${inputBase} ${inputBorder} w-full`} />
            <p className="text-xs text-muted-foreground">Must be at least 8 characters with a number.</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <input type="email" placeholder="Email" defaultValue="bad-email" className={`${inputBase} border-danger focus:border-danger w-full`} />
            <p className="text-xs text-danger">Please enter a valid email address.</p>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="input-file">
        <div className="flex w-full flex-col gap-2">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-black/[.08] px-4 py-6 text-sm text-muted-foreground transition-colors hover:border-zinc-400 hover:text-muted-foreground dark:border-white/[.145] dark:hover:border-zinc-500 dark:hover:text-zinc-300">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>{fileName || "Choose a file..."}</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            />
          </label>
          {fileName && (
            <p className="text-xs text-success dark:text-green-400">Selected: {fileName}</p>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview id="input-switch">
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={toggled}
              onClick={() => setToggled(!toggled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${toggled ? "bg-zinc-900 dark:bg-muted" : "bg-muted dark:bg-muted"}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggled ? "translate-x-6" : "translate-x-1"}`} />
            </button>
            <span className="text-sm">Notifications</span>
          </label>
          <label className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={toggled2}
              onClick={() => setToggled2(!toggled2)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${toggled2 ? "bg-zinc-900 dark:bg-muted" : "bg-muted dark:bg-muted"}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggled2 ? "translate-x-6" : "translate-x-1"}`} />
            </button>
            <span className="text-sm">Dark Mode</span>
          </label>
          <label className="flex items-center gap-3 opacity-50">
            <button
              type="button"
              role="switch"
              aria-checked={false}
              disabled
              className={`relative inline-flex h-6 w-11 items-center rounded-full bg-muted dark:bg-muted cursor-not-allowed`}
            >
              <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white" />
            </button>
            <span className="text-sm">Disabled</span>
          </label>
        </div>
      </ComponentPreview>

      <ComponentPreview id="input-quantity">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(0, quantity - 1))}
            disabled={quantity <= 0}
            className="flex h-10 w-10 items-center justify-center rounded-l-lg border border-black/[.08] bg-transparent text-muted-foreground hover:bg-black/[.04] disabled:opacity-40 dark:border-white/[.145] dark:text-muted-foreground/70 dark:hover:bg-white/[.06]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
            </svg>
          </button>
          <input
            type="number"
            value={quantity}
            min={0}
            onChange={(e) => setQuantity(Math.max(0, parseInt(e.target.value) || 0))}
            className="h-10 w-16 border-y border-x-0 border-black/[.08] bg-transparent text-center text-sm outline-none dark:border-white/[.145] [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-r-lg border border-black/[.08] bg-transparent text-muted-foreground hover:bg-black/[.04] dark:border-white/[.145] dark:text-muted-foreground/70 dark:hover:bg-white/[.06]"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </ComponentPreview>

      {/* API Reference */}
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
                <td className="px-4 py-3 font-mono text-xs">type</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;text&quot; | &quot;email&quot; | &quot;password&quot; | &quot;number&quot; | &quot;search&quot; | ...</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;text&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">label</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">size</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;</td>
                <td className="px-4 py-3 text-muted-foreground">&quot;md&quot;</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">error</td>
                <td className="px-4 py-3 text-muted-foreground">boolean</td>
                <td className="px-4 py-3 text-muted-foreground">false</td>
                <td className="px-4 py-3">No</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">helperText</td>
                <td className="px-4 py-3 text-muted-foreground">ReactNode</td>
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
