"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import {
  Italic,
  Quote,
  BookOpen,
  FileText,
  Scale,
  MessageSquare,
  Image,
  Pen,
} from "lucide-react";

const installCommand = `npx shadcn@latest add italic-text`;

const usageCode = `import { ItalicText } from "@/components/ui/italic-text";

export default function App() {
  return (
    <ItalicText size="md" className="text-gray-700">
      This text is italicized
    </ItalicText>
  );
}`;

function TextStylesDemo() {
  return (
    <ComponentPreview title="Text Style Variations">
      <div className="space-y-4 p-6">
        <p className="text-sm font-light italic text-gray-500">
          Light italic style
        </p>
        <p className="text-base italic text-gray-700">
          Normal italic style
        </p>
        <p className="text-lg font-medium italic text-gray-800">
          Medium italic style
        </p>
        <p className="text-xl font-bold italic text-gray-900">
          Bold italic style
        </p>
      </div>
    </ComponentPreview>
  );
}

function QuoteBlockDemo() {
  return (
    <ComponentPreview title="Italic Quote Display">
      <div className="space-y-4 p-6">
        <div className="border-l-4 border-primary-500 pl-4 py-2">
          <Quote className="h-5 w-5 text-primary-500 mb-2" />
          <p className="text-lg italic text-gray-700">
            &quot;The only way to do great work is to love what you do.&quot;
          </p>
          <p className="text-sm text-gray-500 mt-2">— Steve Jobs</p>
        </div>
      </div>
    </ComponentPreview>
  );
}

function ProductDescriptionDemo() {
  return (
    <ComponentPreview title="E-commerce Product Description">
      <div className="space-y-3 p-6 max-w-md">
        <h3 className="text-lg font-semibold">Premium Wireless Headphones</h3>
        <p className="text-sm text-gray-600">
          Experience <span className="italic font-medium">crystal-clear audio</span> with our latest noise-cancelling technology.
          Designed for <span className="italic">comfort</span> and <span className="italic">durability</span>.
        </p>
        <div className="flex gap-2">
          <Badge variant="secondary">New</Badge>
          <Badge variant="outline">In Stock</Badge>
        </div>
      </div>
    </ComponentPreview>
  );
}

function BlogExcerptDemo() {
  return (
    <ComponentPreview title="Article Preview">
      <div className="space-y-3 p-6 max-w-lg">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <BookOpen className="h-4 w-4" />
          <span>Technology</span>
        </div>
        <h3 className="text-lg font-semibold">The Future of Web Development</h3>
        <p className="text-sm text-gray-600">
          Web development continues to evolve at a <span className="italic">rapid pace</span>.
          From <span className="italic">server components</span> to <span className="italic">edge computing</span>,
          developers have more tools than ever.
        </p>
      </div>
    </ComponentPreview>
  );
}

function LegalTextDemo() {
  return (
    <ComponentPreview title="Terms and Conditions">
      <div className="space-y-3 p-6 max-w-lg">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Scale className="h-4 w-4" />
          <span>Legal</span>
        </div>
        <h3 className="text-lg font-semibold">Terms of Service</h3>
        <p className="text-sm text-gray-600">
          By using this service, you agree to our <span className="italic">terms and conditions</span>.
          The company reserves the right to <span className="italic">modify these terms</span> at any time.
          All disputes shall be resolved in <span className="italic">accordance with applicable law</span>.
        </p>
      </div>
    </ComponentPreview>
  );
}

function TestimonialDemo() {
  return (
    <ComponentPreview title="Customer Review">
      <div className="space-y-3 p-6 max-w-md border rounded-lg">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MessageSquare className="h-4 w-4" />
          <span>Customer Review</span>
        </div>
        <p className="text-sm text-gray-600 italic">
          &quot;This product exceeded all my expectations. <span className="font-medium">Absolutely fantastic</span> quality and
          the customer service was <span className="font-medium">exceptionally helpful</span>.&quot;
        </p>
        <div className="text-sm">
          <span className="font-medium">Sarah M.</span>
          <span className="text-gray-500 ml-2">Verified Buyer</span>
        </div>
      </div>
    </ComponentPreview>
  );
}

function CaptionDemo() {
  return (
    <ComponentPreview title="Image Caption">
      <div className="space-y-2 p-6 max-w-sm">
        <div className="bg-gray-200 h-40 rounded flex items-center justify-center">
          <Image className="h-10 w-10 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500 italic">
          A <span className="font-medium">beautiful sunset</span> over the mountains, captured during our
          latest expedition.
        </p>
      </div>
    </ComponentPreview>
  );
}

export default function ItalicTextPage() {
  return (
    <div className="container max-w-4xl py-10 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Italic className="h-8 w-8 text-primary-500" />
          <h1 className="text-3xl font-bold">Italic Text</h1>
          <Badge>Components</Badge>
        </div>
        <p className="text-gray-600 max-w-2xl">
          Beautifully styled italic text component for emphasis, quotes, and decorative typography.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Examples</h2>
        <TextStylesDemo />
        <QuoteBlockDemo />
        <ProductDescriptionDemo />
        <BlogExcerptDemo />
        <LegalTextDemo />
        <TestimonialDemo />
        <CaptionDemo />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 font-medium">Prop</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Default</th>
                <th className="text-left p-3 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-3 font-mono text-sm">size</td>
                <td className="p-3">string</td>
                <td className="p-3">"md"</td>
                <td className="p-3">The size of the italic text</td>
              </tr>
              <tr className="border-t">
                <td className="p-3 font-mono text-sm">className</td>
                <td className="p-3">string</td>
                <td className="p-3">—</td>
                <td className="p-3">Additional CSS classes to apply</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
