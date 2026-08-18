'use client';

import { useState } from 'react';
import { Badge } from '@/components/design-system/Badge';
import { ComponentPreview } from '@/components/preview';
import { CodeBlock } from '@/components/home/CodeBlock';
import {
  ArrowUp,
  ShoppingCart,
  Bell,
  ArrowUpCircle,
  Loader,
  AlertTriangle,
  Rocket,
} from 'lucide-react';

const installCommand = `npm install framer-motion`;

const usageCode = `import { JumpAnimation } from '@/components/ui/jump-animation';

// Bounce a button on click
<JumpAnimation height="medium" loop={false}>
  <Button>Click Me</Button>
</JumpAnimation>

// Continuous bouncing loader dots
<JumpAnimation height="small" loop={true}>
  <div className="flex gap-1">
    <span className="h-2 w-2 rounded-full bg-primary" />
    <span className="h-2 w-2 rounded-full bg-primary" />
    <span className="h-2 w-2 rounded-full bg-primary" />
  </div>
</JumpAnimation>`;

function BounceButtonDemo() {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex items-center justify-center p-8">
      <button
        onClick={() => {
          setClicked(true);
          setTimeout(() => setClicked(false), 500);
        }}
        className={`rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium transition-transform ${clicked ? '-translate-y-2 scale-105' : 'translate-y-0 scale-100'}`}
      >
        Click to Bounce
      </button>
    </div>
  );
}

function NotificationBadgeDemo() {
  const [bounce, setBounce] = useState(false);

  return (
    <div className="flex items-center justify-center p-8">
      <button
        onClick={() => {
          setBounce(true);
          setTimeout(() => setBounce(false), 600);
        }}
        className="relative p-2 rounded-full hover:bg-muted transition-colors"
      >
        <Bell className="h-6 w-6" />
        <span
          className={`absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center ${bounce ? 'animate-bounce' : ''}`}
        >
          3
        </span>
      </button>
    </div>
  );
}

function CartAnimationDemo() {
  const [bouncing, setBouncing] = useState(false);

  return (
    <div className="flex items-center justify-center p-8">
      <button
        onClick={() => {
          setBouncing(true);
          setTimeout(() => setBouncing(false), 500);
        }}
        className="relative rounded-lg border px-4 py-2 flex items-center gap-2 hover:bg-muted transition-colors"
      >
        <ShoppingCart
          className={`h-5 w-5 transition-transform ${bouncing ? '-translate-y-1 scale-110' : ''}`}
        />
        <span className="font-medium">Add to Cart</span>
      </button>
    </div>
  );
}

function ScrollToTopDemo() {
  const [jumping, setJumping] = useState(false);

  return (
    <div className="flex items-center justify-center p-8">
      <button
        onClick={() => {
          setJumping(true);
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setJumping(false);
          }, 400);
        }}
        className={`rounded-full border p-3 hover:bg-muted transition-all ${jumping ? '-translate-y-2 shadow-lg' : ''}`}
      >
        <ArrowUpCircle className="h-6 w-6" />
      </button>
    </div>
  );
}

function LoadingBounceDemo() {
  return (
    <div className="flex items-center justify-center p-8 gap-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-3 w-3 rounded-full bg-primary animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function AlertPopDemo() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <button
        onClick={() => setVisible(true)}
        className="rounded-lg border px-4 py-2 hover:bg-muted transition-colors"
      >
        Show Alert
      </button>
      {visible && (
        <div
          className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 flex items-center gap-3 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-300"
        >
          <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
          <span className="text-sm">This is a jump-in alert!</span>
          <button
            onClick={() => setVisible(false)}
            className="ml-auto text-xs underline"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}

function SpringMotionDemo() {
  const [active, setActive] = useState(false);

  return (
    <div className="flex items-center justify-center p-8">
      <button
        onClick={() => {
          setActive(true);
          setTimeout(() => setActive(false), 700);
        }}
        className="rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium flex items-center gap-2 hover:bg-primary/90 transition-colors"
      >
        <Rocket
          className={`h-4 w-4 transition-all ${active ? '-translate-y-1 rotate-12 scale-110' : ''}`}
        />
        Launch
      </button>
    </div>
  );
}

export default function JumpAnimationPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12 py-12 px-4">
      <header className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Jump Animation</h1>
        <p className="text-lg text-muted-foreground">
          Lightweight jump and bounce animations for interactive UI elements.
        </p>
      </header>

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

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            Bounce Button
            <Badge variant="secondary">Interactive</Badge>
          </h3>
          <ComponentPreview code={BounceButtonDemo.toString()} language="tsx">
            <BounceButtonDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            Notification Badge
            <Badge variant="secondary">Indicator</Badge>
          </h3>
          <ComponentPreview code={NotificationBadgeDemo.toString()} language="tsx">
            <NotificationBadgeDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            Cart Animation
            <Badge variant="secondary">E-commerce</Badge>
          </h3>
          <ComponentPreview code={CartAnimationDemo.toString()} language="tsx">
            <CartAnimationDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            Scroll to Top
            <Badge variant="secondary">Navigation</Badge>
          </h3>
          <ComponentPreview code={ScrollToTopDemo.toString()} language="tsx">
            <ScrollToTopDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            Loading Bounce
            <Badge variant="secondary">Loader</Badge>
          </h3>
          <ComponentPreview code={LoadingBounceDemo.toString()} language="tsx">
            <LoadingBounceDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            Alert Pop
            <Badge variant="secondary">Feedback</Badge>
          </h3>
          <ComponentPreview code={AlertPopDemo.toString()} language="tsx">
            <AlertPopDemo />
          </ComponentPreview>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            Spring Motion
            <Badge variant="secondary">Animation</Badge>
          </h3>
          <ComponentPreview code={SpringMotionDemo.toString()} language="tsx">
            <SpringMotionDemo />
          </ComponentPreview>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left font-medium">Prop</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Default</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">height</td>
                <td className="px-4 py-3">string</td>
                <td className="px-4 py-3">"medium"</td>
                <td className="px-4 py-3">Controls the height of the jump animation</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-mono text-xs">loop</td>
                <td className="px-4 py-3">boolean</td>
                <td className="px-4 py-3">false</td>
                <td className="px-4 py-3">Whether the animation repeats continuously</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs">className</td>
                <td className="px-4 py-3">string</td>
                <td className="px-4 py-3">""</td>
                <td className="px-4 py-3">Additional CSS classes to apply</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
