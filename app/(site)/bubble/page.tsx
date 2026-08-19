"use client";

import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";

const BUBBLE_SOURCE = `"use client";

import { cn } from "@/lib/cn";

type BubbleVariant = "sent" | "received";

interface BubbleProps {
  message: string;
  sender?: string;
  timestamp?: string;
  variant?: BubbleVariant;
  avatar?: string;
  className?: string;
}

export function Bubble({
  message,
  sender,
  timestamp,
  variant = "received",
  avatar,
  className,
}: BubbleProps) {
  const isSent = variant === "sent";

  return (
    <div className={cn("flex gap-2", isSent ? "justify-end" : "justify-start", className)}>
      {!isSent && avatar && (
        <img src={avatar} alt={sender ?? "avatar"} className="h-8 w-8 shrink-0 rounded-full object-cover" />
      )}
      <div className="max-w-[75%]">
        {!isSent && sender && (
          <p className="mb-1 text-xs font-medium text-zinc-500">{sender}</p>
        )}
        <div className={cn(
          "rounded-2xl px-4 py-2 text-sm",
          isSent ? "bg-blue-600 text-white" : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
        )}>
          {message}
        </div>
        {timestamp && (
          <p className={cn("mt-1 text-xs text-zinc-400", isSent ? "text-right" : "text-left")}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}`;

const BASIC_SOURCE = `import { Bubble } from "@/components/ui/Bubble";

<Bubble variant="received" message="Hey, how's the project going?" />
<Bubble variant="sent" message="It's going well! Just finished the new components." />
<Bubble variant="received" message="Nice! Can you show me a demo?" />`;

const SENDER_SOURCE = `import { Bubble } from "@/components/ui/Bubble";

<Bubble variant="received" sender="Alice" message="What time is the meeting?" />
<Bubble variant="sent" sender="Bob" message="It's at 3 PM in the conference room." />
<Bubble variant="received" sender="Alice" message="Got it, thanks!" />`;

const AVATAR_SOURCE = `import { Bubble } from "@/components/ui/Bubble";

<Bubble
  variant="received"
  sender="Alice"
  avatar="https://i.pravatar.cc/150?u=alice"
  message="Hey, did you see the new design?"
/>
<Bubble
  variant="sent"
  avatar="https://i.pravatar.cc/150?u=bob"
  message="Yes! They look amazing."
/>`;

const TIMESTAMP_SOURCE = `import { Bubble } from "@/components/ui/Bubble";

<Bubble variant="received" message="Meeting scheduled for tomorrow" timestamp="9:41 AM" />
<Bubble variant="sent" message="Project deadline extended to Friday" timestamp="10:15 AM" />`;

function B({ variant, message, sender, timestamp, avatar }: {
  variant?: "sent" | "received";
  message: string;
  sender?: string;
  timestamp?: string;
  avatar?: string;
}) {
  const isSent = variant === "sent";
  return (
    <div className={`flex gap-2 ${isSent ? "justify-end" : "justify-start"}`}>
      {!isSent && avatar && (
        <img src={avatar} alt={sender ?? "avatar"} className="h-8 w-8 shrink-0 rounded-full object-cover" />
      )}
      <div className="max-w-[75%]">
        {!isSent && sender && (
          <p className="mb-1 text-xs font-medium text-zinc-500">{sender}</p>
        )}
        <div className={`rounded-2xl px-4 py-2 text-sm ${
          isSent ? "bg-blue-600 text-white" : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
        }`}>
          {message}
        </div>
        {timestamp && (
          <p className={`mt-1 text-xs text-zinc-400 ${isSent ? "text-right" : "text-left"}`}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}

export default function BubblePage() {
  return (
    <ComponentDocPage name="Bubble" category="Data Display" description="Chat bubble component for displaying messages in a conversation UI. Supports sent/received variants, sender names, avatars, and timestamps.">
      <PreviewPanel filename="bubble-preview.tsx">
        <div className="flex w-full max-w-md flex-col gap-3">
          <B variant="received" sender="Alice" message="Hey, how's the project going?" />
          <B variant="sent" sender="Bob" message="It's going well! Just finished the new components." />
          <B variant="received" sender="Alice" message="Nice! Can you show me a demo?" />
        </div>
      </PreviewPanel>

      <SourceCodeViewer source={BUBBLE_SOURCE} filename="components/ui/Bubble.tsx" defaultExpanded />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Basic" description="Simple received and sent message bubbles." code={BASIC_SOURCE} filename="basic.tsx">
          <div className="flex w-full max-w-md flex-col gap-3">
            <B variant="received" message="Hey, how's the project going?" />
            <B variant="sent" message="It's going well! Just finished the new components." />
            <B variant="received" message="Nice! Can you show me a demo?" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Sender" description="Messages with sender names displayed above the bubble." code={SENDER_SOURCE} filename="sender.tsx">
          <div className="flex w-full max-w-md flex-col gap-3">
            <B variant="received" sender="Alice" message="What time is the meeting?" />
            <B variant="sent" sender="Bob" message="It's at 3 PM in the conference room." />
            <B variant="received" sender="Alice" message="Got it, thanks!" />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Avatar" description="Avatar images shown alongside received messages." code={AVATAR_SOURCE} filename="avatar.tsx">
          <div className="flex w-full max-w-md flex-col gap-3">
            <B variant="received" sender="Alice" avatar="https://i.pravatar.cc/150?u=alice" message="Hey, did you see the new design?" />
            <B variant="sent" avatar="https://i.pravatar.cc/150?u=bob" message="Yes! They look amazing." />
          </div>
        </ExampleBlock>

        <ExampleBlock title="Timestamp" description="Optional timestamps displayed below each message." code={TIMESTAMP_SOURCE} filename="timestamp.tsx">
          <div className="flex w-full max-w-md flex-col gap-3">
            <B variant="received" message="Meeting scheduled for tomorrow" timestamp="9:41 AM" />
            <B variant="sent" message="Project deadline extended to Friday" timestamp="10:15 AM" />
          </div>
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
