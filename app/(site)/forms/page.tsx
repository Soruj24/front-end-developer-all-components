"use client";

import { useState } from "react";
import { ComponentPreview } from "@/components/preview";

const inputBase =
  "rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-zinc-400 dark:bg-transparent dark:focus:border-zinc-500";
const inputBorder = "border-border";

const plans = [
  { id: "basic", name: "Basic", price: "$9/mo", features: ["1 user", "5GB storage"] },
  { id: "pro", name: "Pro", price: "$29/mo", features: ["10 users", "50GB storage", "Priority support"] },
  { id: "enterprise", name: "Enterprise", price: "$99/mo", features: ["Unlimited", "500GB", "24/7 support"] },
];

const paymentMethods = [
  { id: "visa", label: "Visa **** 4242", icon: "V" },
  { id: "mastercard", label: "Mastercard **** 5555", icon: "M" },
  { id: "paypal", label: "PayPal", icon: "P" },
];

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-zinc-900 dark:bg-muted" : "bg-muted dark:bg-muted"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
      <span className="text-sm">{label}</span>
    </label>
  );
}

export default function FormsPage() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [rating, setRating] = useState(0);
  const [hue, setHue] = useState(50);
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [t1, setT1] = useState(true);
  const [t2, setT2] = useState(false);
  const [t3, setT3] = useState(true);
  const [t4, setT4] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Forms</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          A collection of form patterns — inputs, validation, selects, toggles,
          file uploads, multi-step flows, and more. Use the tabs to switch
          between the live preview, source code, CLI, installation, and
          dependency details for each example.
        </p>
      </header>

      <ComponentPreview id="form-basic-validation">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
          className="flex w-full max-w-lg flex-col gap-5 rounded-xl border border-border p-6 dark:border-border"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="full-name">
              Full Name {submitted && <span className="text-danger">*</span>}
            </label>
            <input
              id="full-name"
              className={`${inputBase} w-full ${submitted ? "border-danger" : inputBorder}`}
              placeholder="Jane Doe"
            />
            {submitted && <p className="text-xs text-danger">Name is required</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="email">Email</label> <input id="email"
              defaultValue="jane@example.com"
              className={`${inputBase} w-full border-success`}
              placeholder="jane@example.com"
            />
            <p className="text-xs text-success">Looks good!</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="bio">Bio</label> <textarea id="bio"
              rows={3}
              className={`${inputBase} w-full resize-none ${submitted ? "border-danger" : inputBorder}`}
              placeholder="Tell us about yourself..."
            />
            {submitted && (
              <p className="text-xs text-danger">Bio must be at least 10 characters</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="role">Role</label> <select id="role" className={`${inputBase} ${inputBorder} w-full`}>
              <option>Developer</option>
              <option>Designer</option>
              <option>PM</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-foreground dark:text-background"
            >
              Submit
            </button>
            <button
              type="reset"
              onClick={() => setSubmitted(false)}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border"
            >
              Reset
            </button>
          </div>
        </form>
      </ComponentPreview>

      <ComponentPreview id="form-input-variants">
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Text Inputs</p>
            <div className="flex flex-col gap-3">
              <input aria-label="Default" className={`${inputBase} ${inputBorder} w-full`} placeholder="Default" />
              <input aria-label="Disabled" className={`${inputBase} ${inputBorder} w-full`} placeholder="Disabled" disabled />
              <input aria-label="Error state" className={`${inputBase} w-full border-danger`} defaultValue="Error state" />
              <input aria-label="Success state" className={`${inputBase} w-full border-success`} defaultValue="Success state" />
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Input Types</p>
            <div className="flex flex-col gap-3">
              <input type="email" aria-label="Email" className={`${inputBase} ${inputBorder} w-full`} placeholder="Email" />
              <input type="password" aria-label="Password" className={`${inputBase} ${inputBorder} w-full`} placeholder="Password" />
              <input type="number" aria-label="Number" className={`${inputBase} ${inputBorder} w-full`} placeholder="Number" />
              <input type="tel" aria-label="Phone" className={`${inputBase} ${inputBorder} w-full`} placeholder="Phone" />
              <input type="url" aria-label="URL" className={`${inputBase} ${inputBorder} w-full`} placeholder="URL" />
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Sizes</p>
            <div className="flex flex-col gap-3">
              <input aria-label="Small (xs)" className="rounded-lg border border-black/[.08] px-2 py-1 text-xs dark:border-white/[.145]" placeholder="Small (xs)" />
              <input aria-label="Default (sm)" className={`${inputBase} ${inputBorder} w-full`} placeholder="Default (sm)" />
              <input aria-label="Large (base)" className="rounded-lg border border-black/[.08] px-4 py-3 text-base dark:border-white/[.145]" placeholder="Large (base)" />
              <input aria-label="XLarge" className="rounded-lg border border-black/[.08] px-5 py-3.5 text-lg dark:border-white/[.145]" placeholder="XLarge" />
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="form-textarea-variants">
        <div className="grid w-full gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Default</p>
            <textarea rows={3} aria-label="Default textarea..." className={`${inputBase} ${inputBorder} w-full resize-none`} placeholder="Default textarea..." />
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">With Label &amp; Hint</p>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" htmlFor="description">Description</label> <textarea id="description" rows={3} className={`${inputBase} ${inputBorder} w-full resize-none`} placeholder="Enter description..." />
              <p className="text-[10px] text-muted-foreground/70">Max 500 characters</p>
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Auto-Resize</p>
            <textarea rows={1} aria-label="Type to expand..." className={`${inputBase} ${inputBorder} w-full resize-none overflow-hidden`} placeholder="Type to expand..." />
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="form-select-choice">
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Standard Select</p>
            <select aria-label="Standard select" className={`${inputBase} ${inputBorder} w-full`}>
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Multi-Select</p>
            <select multiple aria-label="Multi-select options" className={`${inputBase} ${inputBorder} h-24 w-full`}>
              <option>Red</option>
              <option>Blue</option>
              <option>Green</option>
              <option>Yellow</option>
            </select>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Radio Group</p>
            <div className="flex flex-col gap-2">
              {["Option A", "Option B", "Option C"].map((o, i) => (
                <label key={o} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="radio" defaultChecked={i === 0} className="accent-primary dark:accent-zinc-100" />
                  {o}
                </label>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Checkbox Group</p>
            <div className="flex flex-col gap-2">
              {["Feature A", "Feature B", "Feature C"].map((f) => (
                <label key={f} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" defaultChecked={f === "Feature A"} className="accent-primary dark:accent-zinc-100" />
                  {f}
                </label>
              ))}
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="form-toggle-switches">
        <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Individual Toggles</p>
            <div className="flex flex-col gap-3">
              <Toggle checked={t1} onChange={setT1} label="Notifications" />
              <Toggle checked={t2} onChange={setT2} label="Dark Mode" />
              <Toggle checked={t3} onChange={setT3} label="Auto-Save" />
              <Toggle checked={t4} onChange={setT4} label="Sounds" />
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">With Descriptions</p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Newsletter</div>
                  <div className="text-xs text-muted-foreground">Receive weekly updates</div>
                </div>
                <Toggle checked={t1} onChange={setT1} label="" aria-label="Newsletter" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Marketing</div>
                  <div className="text-xs text-muted-foreground">Promotional emails</div>
                </div>
                <Toggle checked={t2} onChange={setT2} label="" aria-label="Marketing" />
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Sizes</p>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3">
                <button type="button" className="relative inline-flex h-5 w-9 items-center rounded-full bg-muted dark:bg-muted">
                  <span className="inline-block h-3.5 w-3.5 translate-x-1 rounded-full bg-white" />
                </button>
                <span className="text-sm">Small</span>
              </label>
              <label className="flex items-center gap-3">
                <button type="button" className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-900 dark:bg-muted">
                  <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white" />
                </button>
                <span className="text-sm">Default</span>
              </label>
              <label className="flex items-center gap-3">
                <button type="button" className="relative inline-flex h-7 w-14 items-center rounded-full bg-zinc-900 dark:bg-muted">
                  <span className="inline-block h-5 w-5 translate-x-7 rounded-full bg-white" />
                </button>
                <span className="text-sm">Large</span>
              </label>
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Colors</p>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-3">
                <button type="button" className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                  <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white" />
                </button>
                <span className="text-sm">Indigo</span>
              </label>
              <label className="flex items-center gap-3">
                <button type="button" className="relative inline-flex h-6 w-11 items-center rounded-full bg-success">
                  <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white" />
                </button>
                <span className="text-sm">Green</span>
              </label>
              <label className="flex items-center gap-3">
                <button type="button" className="relative inline-flex h-6 w-11 items-center rounded-full bg-danger">
                  <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white" />
                </button>
                <span className="text-sm">Red</span>
              </label>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="form-date-time">
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Date Inputs</p>
            <div className="flex flex-col gap-3">
              <input type="date" aria-label="Date" className={`${inputBase} ${inputBorder} w-full`} />
              <input type="datetime-local" aria-label="Date and time" className={`${inputBase} ${inputBorder} w-full`} />
              <input type="month" aria-label="Month" className={`${inputBase} ${inputBorder} w-full`} />
              <input type="week" aria-label="Week" className={`${inputBase} ${inputBorder} w-full`} />
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">Time Inputs</p>
            <div className="flex flex-col gap-3">
              <input type="time" aria-label="Time" className={`${inputBase} ${inputBorder} w-full`} />
              <input
                type="range"
                aria-label="Hue"
                min={0}
                max={100}
                value={hue}
                onChange={(e) => setHue(Number(e.target.value))}
                className="w-full accent-primary dark:accent-zinc-100"
              />
              <div className="flex items-center gap-2 text-sm">
                <span>Value: {hue}</span>
                <div
                  className="h-4 w-4 rounded"
                  style={{ backgroundColor: `hsl(${hue * 3.6}, 70%, 50%)` }}
                />
              </div>
              <input type="color" aria-label="Color" className="h-10 w-full cursor-pointer rounded border border-border p-0.5 dark:border-border" />
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="form-file-upload">
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload a file"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              document.getElementById("fu")?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            if (e.dataTransfer.files?.[0]) setFile(e.dataTransfer.files[0]);
          }}
          className={`flex w-full max-w-lg cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${dragOver ? "border-zinc-900 bg-muted/40 dark:border-border dark:bg-zinc-900" : "border-border hover:border-zinc-400 dark:border-border"}`}
          onClick={() => document.getElementById("fu")?.click()}
        >
          <svg className="h-10 w-10 text-muted-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <div>
            <p className="text-sm font-medium">Drop files here or click to browse</p>
            <p className="text-xs text-muted-foreground">Up to 10MB</p>
          </div>
          {file && (
            <div className="flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-sm dark:bg-muted">
              <span>{file.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setFile(null);
                }}
                className="text-muted-foreground/70 hover:text-muted-foreground"
              >
                &times;
              </button>
            </div>
          )}
          <input id="fu" type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </div>
      </ComponentPreview>

      <ComponentPreview id="form-multi-step">
        <div className="w-full max-w-lg rounded-xl border border-border p-6 dark:border-border">
          <div className="mb-6 flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <button
                  type="button"
                  onClick={() => setStep(s)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${s === step ? "bg-foreground text-background dark:bg-muted dark:text-zinc-900" : s < step ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-muted text-muted-foreground/70 dark:bg-muted"}`}
                >
                  {s < step ? "✓" : s}
                </button>
                {s < 3 && <div className={`h-0.5 w-8 ${s < step ? "bg-green-400" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          {step === 1 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-medium">Account Details</h2>
              <input aria-label="Username" className={`${inputBase} ${inputBorder} w-full`} placeholder="Username" />
              <input aria-label="Email" className={`${inputBase} ${inputBorder} w-full`} placeholder="Email" type="email" />
              <button
                type="button"
                onClick={() => setStep(2)}
                className="self-start rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
              >
                Next
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-medium">Profile</h2>
              <input aria-label="Full name" className={`${inputBase} ${inputBorder} w-full`} placeholder="Full name" />
              <textarea rows={3} aria-label="Bio" className={`${inputBase} ${inputBorder} w-full resize-none`} placeholder="Bio" />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="flex flex-col gap-4">
              <h2 className="font-medium">Preferences</h2>
              <Toggle checked={t1} onChange={setT1} label="Email notifications" />
              <Toggle checked={t3} onChange={setT3} label="Auto-save" />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium dark:border-border"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    alert("Submitted!");
                  }}
                  className="rounded-lg bg-success px-4 py-2 text-sm font-medium text-success-foreground"
                >
                  Complete
                </button>
              </div>
            </div>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview id="form-inline-horizontal">
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-wrap items-end gap-4 rounded-xl border border-border p-4 dark:border-border"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" htmlFor="start">Start</label> <input id="start" type="date" className={`${inputBase} ${inputBorder}`} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium" htmlFor="end">End</label> <input id="end" type="date" className={`${inputBase} ${inputBorder}`} />
            </div>
            <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
              Filter
            </button>
          </form>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-wrap items-end gap-4 rounded-xl border border-border p-4 dark:border-border"
          >
            <div className="flex-1 basis-40">
              <label className="mb-1 block text-xs font-medium" htmlFor="search">Search</label> <input id="search" className={`${inputBase} ${inputBorder} w-full`} placeholder="Search..." />
            </div>
            <select aria-label="Role filter" className={`${inputBase} ${inputBorder}`}>
              <option>Any</option>
              <option>Admin</option>
              <option>User</option>
            </select>
            <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
              Go
            </button>
          </form>
        </div>
      </ComponentPreview>

      <ComponentPreview id="form-address">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-2xl rounded-xl border border-border p-6 dark:border-border"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium" htmlFor="street">Street</label> <input id="street" className={`${inputBase} ${inputBorder} w-full`} placeholder="123 Main St" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="city">City</label> <input id="city" className={`${inputBase} ${inputBorder} w-full`} placeholder="City" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="state">State</label> <select id="state" className={`${inputBase} ${inputBorder} w-full`}>
                <option>NY</option>
                <option>CA</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="zip">ZIP</label> <input id="zip" className={`${inputBase} ${inputBorder} w-full`} placeholder="10001" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="country">Country</label> <select id="country" className={`${inputBase} ${inputBorder} w-full`}>
                <option>US</option>
                <option>CA</option>
              </select>
            </div>
          </div>
          <button type="submit" className="mt-6 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
            Save
          </button>
        </form>
      </ComponentPreview>

      <ComponentPreview id="form-payment">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-lg rounded-xl border border-border p-6 dark:border-border"
        >
          <h2 className="mb-4 font-medium">Payment Method</h2>
          <div className="flex flex-col gap-2">
            {paymentMethods.map((pm) => (
              <label
                key={pm.id}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-sm dark:border-border"
              >
                <input type="radio" name="payment" defaultChecked={pm.id === "visa"} className="accent-primary" />
                <span className="flex h-6 w-8 items-center justify-center rounded bg-muted text-xs font-bold dark:bg-muted">
                  {pm.icon}
                </span>
                {pm.label}
              </label>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="mb-1 block text-sm font-medium" htmlFor="card-number">Card Number</label> <input id="card-number" className={`${inputBase} ${inputBorder} w-full`} placeholder="4242 4242 4242 4242" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="expiry">Expiry</label> <input id="expiry" className={`${inputBase} ${inputBorder} w-full`} placeholder="MM/YY" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="cvc">CVC</label> <input id="cvc" className={`${inputBase} ${inputBorder} w-full`} placeholder="123" />
            </div>
          </div>
          <button type="submit" className="mt-6 w-full rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white">
            Pay $49.00
          </button>
        </form>
      </ComponentPreview>

      <ComponentPreview id="form-plan-selection">
        <div className="grid w-full gap-3 sm:grid-cols-3">
          {plans.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={selectedPlan === p.id}
              onClick={() => setSelectedPlan(p.id)}
              className={`cursor-pointer rounded-xl border p-4 text-left transition-colors focus-visible:ring-ring outline-none focus-visible:ring-2 ${selectedPlan === p.id ? "border-zinc-900 bg-muted/40 dark:border-border dark:bg-zinc-900" : "border-border"}`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{p.name}</div>
                {selectedPlan === p.id && <span className="text-xs text-success">Selected</span>}
              </div>
              <div className="mt-1 text-2xl font-bold">{p.price}</div>
              <ul className="mt-3 space-y-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <svg className="h-3 w-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="form-rating">
        <div className="w-full max-w-sm rounded-xl border border-border p-6 dark:border-border">
          <p className="mb-3 text-sm font-medium">Rate your experience</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRating(r)}
                className={`h-10 w-10 rounded-full text-sm font-medium transition-colors ${r <= rating ? "bg-warning text-warning-foreground" : "bg-muted text-muted-foreground hover:bg-muted dark:text-muted-foreground/70"}`}
              >
                {r}
              </button>
            ))}
          </div>
          {rating > 0 && (
            <div className="mt-4 flex flex-col gap-3">
              <textarea rows={2} aria-label="Tell us more..." className={`${inputBase} ${inputBorder} w-full resize-none`} placeholder="Tell us more..." />
              <button type="button" className="self-start rounded-lg bg-warning px-4 py-2 text-sm font-medium text-warning-foreground">
                Submit
              </button>
            </div>
          )}
        </div>
      </ComponentPreview>

      <ComponentPreview id="form-prefix-suffix">
        <div className="grid w-full gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">With Prefix</p>
            <div className="flex">
              <span className="flex items-center rounded-l-lg border border-r-0 border-border bg-muted px-3 text-sm text-muted-foreground dark:border-border dark:bg-muted">
                $
              </span>
              <input aria-label="Amount" className={`${inputBase} w-full rounded-l-none ${inputBorder}`} placeholder="Amount" />
            </div>
          </div>
          <div className="rounded-xl border border-border p-4 dark:border-border">
            <p className="mb-3 text-sm font-medium">With Suffix</p>
            <div className="flex">
              <input aria-label="Weight" className={`${inputBase} w-full rounded-r-none ${inputBorder}`} placeholder="Weight" />
              <span className="flex items-center rounded-r-lg border border-l-0 border-border bg-muted px-3 text-sm text-muted-foreground dark:border-border dark:bg-muted">
                kg
              </span>
            </div>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="form-search">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-lg rounded-xl border border-border p-6 dark:border-border"
        >
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground/70">S</span>
              <input aria-label="Search projects, files, users..." className={`${inputBase} ${inputBorder} w-full pl-9`} placeholder="Search projects, files, users..." />
            </div>
            <button type="submit" className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white">
              Search
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["All", "Projects", "Files", "Users"].map((f) => (
              <button
                key={f}
                type="button"
                className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted dark:text-muted-foreground/70"
              >
                {f}
              </button>
            ))}
          </div>
        </form>
      </ComponentPreview>

      <ComponentPreview id="form-login">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-sm rounded-xl border border-border p-6 dark:border-border"
        >
          <h2 className="mb-4 text-lg font-semibold">Sign In</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="email-2">Email</label> <input id="email-2" type="email" className={`${inputBase} ${inputBorder} w-full`} placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="password">Password</label> <input id="password" type="password" className={`${inputBase} ${inputBorder} w-full`} placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="accent-primary" />
                Remember me
              </label>
              <button type="button" className="text-primary hover:underline">
                Forgot?
              </button>
            </div>
            <button type="submit" className="w-full rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white">
              Sign In
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Don&apos;t have an account?{" "}
              <button type="button" className="text-primary hover:underline">
                Sign up
              </button>
            </p>
          </div>
        </form>
      </ComponentPreview>

      <ComponentPreview id="form-register">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-full max-w-sm rounded-xl border border-border p-6 dark:border-border"
        >
          <h2 className="mb-4 text-lg font-semibold">Create Account</h2>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="first">First</label> <input id="first" className={`${inputBase} ${inputBorder} w-full`} placeholder="John" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="last">Last</label> <input id="last" className={`${inputBase} ${inputBorder} w-full`} placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="email-3">Email</label> <input id="email-3" className={`${inputBase} ${inputBorder} w-full`} placeholder="john@example.com" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="password-2">Password</label> <input id="password-2" type="password" className={`${inputBase} ${inputBorder} w-full`} placeholder="Min 8 characters" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-zinc-900 py-2 text-sm font-medium text-white">
              Create Account
            </button>
            <p className="text-center text-xs text-muted-foreground">
              By signing up you agree to our{" "}
              <button type="button" className="text-primary hover:underline">
                Terms
              </button>
            </p>
          </div>
        </form>
      </ComponentPreview>

      <ComponentPreview id="form-newsletter">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full flex-col items-center gap-4 rounded-xl border border-border bg-gradient-to-br from-zinc-50 to-white p-8 text-center dark:border-border dark:from-zinc-900 dark:to-black"
        >
          <h2 className="text-xl font-bold">Stay in the loop</h2>
          <p className="max-w-md text-sm text-muted-foreground">
            Get the latest updates, features, and news delivered to your inbox.
          </p>
          <div className="flex w-full max-w-md gap-2">
            <input type="email" aria-label="your@email.com" className={`${inputBase} ${inputBorder} flex-1`} placeholder="your@email.com" />
            <button type="submit" className="rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-muted-foreground/70">No spam. Unsubscribe anytime.</p>
        </form>
      </ComponentPreview>
    </div>
  );
}
