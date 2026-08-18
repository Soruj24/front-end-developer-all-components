"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Laptop,
  Monitor,
  Globe,
  Code,
  ShoppingBag,
  FileText,
  Moon,
} from "lucide-react";

const installCommand = `npx shadcn@latest add laptop-mockup`;

const usageCode = `import { LaptopMockup } from "@/components/ui/laptop-mockup";

export default function Page() {
  return (
    <LaptopMockup src="/screenshots/dashboard.png" shadow dark />
  );
}`;

function DashboardPreviewDemo() {
  return (
    <ComponentPreview name="LaptopMockup-Dashboard">
      <div className="relative mx-auto w-full max-w-3xl">
        <div className="rounded-xl border border-zinc-200 bg-zinc-100 p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-1.5 border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="grid grid-cols-4 gap-3 p-4">
            <div className="col-span-3 rounded-lg bg-white p-4 shadow-sm dark:bg-zinc-800">
              <div className="mb-3 flex items-center gap-2">
                <Laptop className="h-4 w-4 text-zinc-500" />
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Dashboard
                </span>
              </div>
              <div className="mb-2 h-2 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="mb-2 h-2 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="h-16 rounded bg-blue-50 dark:bg-blue-950" />
                <div className="h-16 rounded bg-green-50 dark:bg-green-950" />
                <div className="h-16 rounded bg-purple-50 dark:bg-purple-950" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded bg-white shadow-sm dark:bg-zinc-800" />
              <div className="h-12 rounded bg-white shadow-sm dark:bg-zinc-800" />
              <div className="h-12 rounded bg-white shadow-sm dark:bg-zinc-800" />
            </div>
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
}

function LandingPageDemo() {
  return (
    <ComponentPreview name="LaptopMockup-Landing">
      <div className="relative mx-auto w-full max-w-3xl">
        <div className="rounded-xl border border-zinc-200 bg-zinc-100 p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-1.5 border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-zinc-700">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  Acme Inc
                </span>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-10 rounded bg-zinc-300 dark:bg-zinc-600" />
                <div className="h-2 w-10 rounded bg-zinc-300 dark:bg-zinc-600" />
                <div className="h-2 w-10 rounded bg-zinc-300 dark:bg-zinc-600" />
              </div>
            </div>
            <div className="mt-8 text-center">
              <div className="mx-auto mb-3 h-6 w-48 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="mx-auto mb-2 h-2 w-64 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="mx-auto h-2 w-48 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="mt-6 flex justify-center gap-3">
                <div className="h-8 w-24 rounded-md bg-blue-500" />
                <div className="h-8 w-24 rounded-md border border-zinc-300 dark:border-zinc-600" />
              </div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="h-24 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-24 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
              <div className="h-24 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            </div>
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
}

function CodeEditorDemo() {
  return (
    <ComponentPreview name="LaptopMockup-CodeEditor">
      <div className="relative mx-auto w-full max-w-3xl">
        <div className="rounded-xl border border-zinc-200 bg-zinc-100 p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-1.5 border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex">
            <div className="w-10 border-r border-zinc-200 bg-zinc-50 py-2 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mx-auto mb-2 h-3 w-3 rounded bg-zinc-300 dark:bg-zinc-600" />
              <div className="mx-auto mb-2 h-3 w-3 rounded bg-blue-400" />
              <div className="mx-auto mb-2 h-3 w-3 rounded bg-zinc-300 dark:bg-zinc-600" />
              <div className="mx-auto h-3 w-3 rounded bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <div className="w-40 border-r border-zinc-200 bg-zinc-50 p-2 dark:border-zinc-800 dark:bg-zinc-950">
              <div className="mb-1.5 flex items-center gap-1">
                <Code className="h-3 w-3 text-zinc-400" />
                <div className="h-1.5 w-12 rounded bg-zinc-300 dark:bg-zinc-600" />
              </div>
              <div className="ml-4 mb-1 h-1.5 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="ml-4 mb-1 h-1.5 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="ml-4 h-1.5 w-14 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
            <div className="flex-1 bg-white p-3 dark:bg-zinc-900">
              <div className="mb-1 h-1.5 w-8 rounded bg-purple-400" />
              <div className="ml-4 mb-1 h-1.5 w-24 rounded bg-zinc-300 dark:bg-zinc-600" />
              <div className="ml-4 mb-1 h-1.5 w-16 rounded bg-blue-400" />
              <div className="ml-4 mb-1 h-1.5 w-32 rounded bg-zinc-300 dark:bg-zinc-600" />
              <div className="ml-4 mb-1 h-1.5 w-20 rounded bg-green-400" />
              <div className="mb-1 h-1.5 w-6 rounded bg-zinc-300 dark:bg-zinc-600" />
              <div className="ml-4 mb-1 h-1.5 w-28 rounded bg-zinc-300 dark:bg-zinc-600" />
              <div className="ml-4 mb-1 h-1.5 w-12 rounded bg-yellow-400" />
              <div className="h-1.5 w-4 rounded bg-zinc-300 dark:bg-zinc-600" />
            </div>
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
}

function EcommerceStoreDemo() {
  return (
    <ComponentPreview name="LaptopMockup-Ecommerce">
      <div className="relative mx-auto w-full max-w-3xl">
        <div className="rounded-xl border border-zinc-200 bg-zinc-100 p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-1.5 border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-zinc-700">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  ShopWave
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-2 w-12 rounded bg-zinc-300 dark:bg-zinc-600" />
                <div className="h-2 w-12 rounded bg-zinc-300 dark:bg-zinc-600" />
                <div className="relative">
                  <ShoppingBag className="h-4 w-4 text-zinc-500" />
                  <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[6px] text-white">
                    2
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border border-zinc-200 p-2 dark:border-zinc-700">
                  <div className="mb-2 h-20 rounded bg-zinc-100 dark:bg-zinc-800" />
                  <div className="mb-1 h-1.5 w-16 rounded bg-zinc-300 dark:bg-zinc-600" />
                  <div className="mb-1 h-1.5 w-10 rounded bg-zinc-200 dark:bg-zinc-700" />
                  <div className="flex items-center justify-between">
                    <div className="h-2 w-8 rounded bg-green-500" />
                    <div className="h-5 w-12 rounded bg-blue-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
}

function BlogLayoutDemo() {
  return (
    <ComponentPreview name="LaptopMockup-Blog">
      <div className="relative mx-auto w-full max-w-3xl">
        <div className="rounded-xl border border-zinc-200 bg-zinc-100 p-1 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-1.5 border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-3 dark:border-zinc-700">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-500" />
                <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  The Dev Blog
                </span>
              </div>
              <div className="flex gap-3">
                <div className="h-2 w-8 rounded bg-zinc-300 dark:bg-zinc-600" />
                <div className="h-2 w-8 rounded bg-zinc-300 dark:bg-zinc-600" />
                <div className="h-2 w-8 rounded bg-zinc-300 dark:bg-zinc-600" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="col-span-2 space-y-4">
                <div className="h-32 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
                <div className="mb-2 h-3 w-32 rounded bg-zinc-300 dark:bg-zinc-600" />
                <div className="mb-1 h-2 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="mb-1 h-2 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-2 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <div className="mb-1 h-1.5 w-12 rounded bg-zinc-300 dark:bg-zinc-600" />
                  <div className="mb-1 h-1.5 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
                  <div className="h-1.5 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
                </div>
                <div className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-700">
                  <div className="mb-1 h-1.5 w-12 rounded bg-zinc-300 dark:bg-zinc-600" />
                  <div className="mb-1 h-1.5 w-20 rounded bg-zinc-200 dark:bg-zinc-700" />
                  <div className="h-1.5 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
}

function DarkModeDemo() {
  return (
    <ComponentPreview name="LaptopMockup-Dark">
      <div className="relative mx-auto w-full max-w-3xl">
        <div className="rounded-xl border border-zinc-700 bg-zinc-900 p-1 shadow-lg">
          <div className="flex items-center gap-1.5 border-b border-zinc-800 px-3 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Moon className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-semibold text-zinc-100">
                Dark Theme Preview
              </span>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex gap-3">
                <div className="h-20 flex-1 rounded-lg bg-zinc-800 p-3">
                  <div className="mb-2 h-1.5 w-16 rounded bg-zinc-700" />
                  <div className="h-1.5 w-24 rounded bg-purple-500/30" />
                </div>
                <div className="h-20 flex-1 rounded-lg bg-zinc-800 p-3">
                  <div className="mb-2 h-1.5 w-16 rounded bg-zinc-700" />
                  <div className="h-1.5 w-24 rounded bg-blue-500/30" />
                </div>
              </div>
              <div className="h-24 rounded-lg bg-zinc-800 p-3">
                <div className="mb-2 h-1.5 w-20 rounded bg-zinc-700" />
                <div className="mb-1 h-1.5 w-full rounded bg-zinc-700/50" />
                <div className="mb-1 h-1.5 w-3/4 rounded bg-zinc-700/50" />
                <div className="h-1.5 w-1/2 rounded bg-zinc-700/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ComponentPreview>
  );
}

function ResponsiveDemo() {
  return (
    <ComponentPreview name="LaptopMockup-Responsive">
      <div className="flex items-end justify-center gap-4">
        <div className="w-20">
          <div className="rounded-md border border-zinc-200 bg-zinc-100 p-0.5 shadow dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-0.5 border-b border-zinc-200 px-1 py-0.5 dark:border-zinc-800">
              <div className="h-1 w-1 rounded-full bg-red-400" />
              <div className="h-1 w-1 rounded-full bg-yellow-400" />
              <div className="h-1 w-1 rounded-full bg-green-400" />
            </div>
            <div className="space-y-1 p-1">
              <div className="h-1 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-1 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-1 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
          </div>
          <p className="mt-1 text-center text-[8px] text-zinc-500">320px</p>
        </div>
        <div className="w-28">
          <div className="rounded-md border border-zinc-200 bg-zinc-100 p-0.5 shadow dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-0.5 border-b border-zinc-200 px-1 py-0.5 dark:border-zinc-800">
              <div className="h-1 w-1 rounded-full bg-red-400" />
              <div className="h-1 w-1 rounded-full bg-yellow-400" />
              <div className="h-1 w-1 rounded-full bg-green-400" />
            </div>
            <div className="grid grid-cols-2 gap-1 p-1">
              <div className="h-6 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="h-6 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="col-span-2 h-4 rounded bg-zinc-200 dark:bg-zinc-700" />
            </div>
          </div>
          <p className="mt-1 text-center text-[8px] text-zinc-500">768px</p>
        </div>
        <div className="w-44">
          <div className="rounded-lg border border-zinc-200 bg-zinc-100 p-1 shadow dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-1 border-b border-zinc-200 px-2 py-1 dark:border-zinc-800">
              <div className="h-1.5 w-1.5 rounded-full bg-red-400" />
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
            </div>
            <div className="grid grid-cols-3 gap-1 p-1">
              <div className="col-span-2 h-10 rounded bg-zinc-200 dark:bg-zinc-700" />
              <div className="space-y-1">
                <div className="h-4 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-4 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-4 rounded bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>
          </div>
          <p className="mt-1 text-center text-[8px] text-zinc-500">1280px</p>
        </div>
      </div>
    </ComponentPreview>
  );
}

export default function LaptopMockupPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Laptop className="h-8 w-8 text-zinc-700 dark:text-zinc-300" />
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Laptop Mockup
          </h1>
          <Badge variant="secondary">New</Badge>
        </div>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          A realistic laptop frame component to showcase screenshots and
          previews of your applications with optional shadow and dark mode.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Installation
        </h2>
        <CodeBlock code={installCommand} language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Usage
        </h2>
        <CodeBlock code={usageCode} language="tsx" />
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          Examples
        </h2>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Laptop className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
              Dashboard Preview
            </h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            SaaS dashboard preview with sidebar and metrics cards.
          </p>
          <DashboardPreviewDemo />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
              Landing Page
            </h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Marketing website with hero section and feature grid.
          </p>
          <LandingPageDemo />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-purple-500" />
            <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
              Code Editor
            </h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            VS Code-style editor with sidebar and syntax highlighting.
          </p>
          <CodeEditorDemo />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-orange-500" />
            <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
              E-commerce Store
            </h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Online store with product grid and shopping cart.
          </p>
          <EcommerceStoreDemo />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-500" />
            <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
              Blog Layout
            </h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Blog with article content and sidebar widgets.
          </p>
          <BlogLayoutDemo />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Moon className="h-5 w-5 text-violet-500" />
            <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
              Dark Mode
            </h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Dark theme laptop frame for dark mode interfaces.
          </p>
          <DarkModeDemo />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-cyan-500" />
            <h3 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
              Responsive Sizes
            </h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Preview at different screen sizes: mobile, tablet, and desktop.
          </p>
          <ResponsiveDemo />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          API Reference
        </h2>
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                  Prop
                </th>
                <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                  Type
                </th>
                <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                  Default
                </th>
                <th className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                  src
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  string
                </td>
                <td className="px-4 py-3 text-zinc-500">Required</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  Image source URL for the screen content
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                  shadow
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  boolean
                </td>
                <td className="px-4 py-3 text-zinc-500">false</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  Adds a drop shadow to the laptop frame
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                  dark
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  boolean
                </td>
                <td className="px-4 py-3 text-zinc-500">false</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  Renders the laptop frame in dark theme
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                  className
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  string
                </td>
                <td className="px-4 py-3 text-zinc-500">undefined</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  Additional CSS classes to apply
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
