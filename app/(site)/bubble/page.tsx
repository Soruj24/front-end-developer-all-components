"use client";

import { Bubble } from "@/components/_bubble";
import { ComponentPreview } from "@/components/preview";

const variants = ["default", "primary", "secondary", "muted"] as const;
const sizes = ["sm", "md", "lg"] as const;

function UserIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function BotIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function BubblePage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Bubble</h1>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Chat bubble component for displaying messages in a conversation UI.
          Supports different variants, sizes, and optional tails for message threading.
        </p>
      </header>

      <ComponentPreview id="bubble-default">
        <div className="flex flex-col gap-3">
          <Bubble variant="default">
            Hey, how&apos;s the project going?
          </Bubble>
          <Bubble variant="primary">
            It&apos;s going well! Just finished the new components.
          </Bubble>
          <Bubble variant="default">
            Nice! Can you show me a demo?
          </Bubble>
        </div>
      </ComponentPreview>

      <ComponentPreview id="bubble-variants">
        <div className="flex flex-col gap-3">
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-1">
              <p className="text-xs font-medium text-muted-foreground capitalize">{variant}</p>
              <Bubble variant={variant}>
                This is a {variant} bubble message.
              </Bubble>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="bubble-sizes">
        <div className="flex flex-col gap-3">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col gap-1">
              <p className="text-xs font-medium text-muted-foreground capitalize">{size}</p>
              <Bubble size={size}>
                {size === "sm" ? "Short message" : size === "md" ? "Medium length message" : "This is a longer message with more content to demonstrate the large size variant."}
              </Bubble>
            </div>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview id="bubble-with-tail">
        <div className="flex flex-col gap-3">
          <Bubble variant="default" tail>
            Hello! What time is the meeting?
          </Bubble>
          <Bubble variant="primary" tail>
            It&apos;s at 3 PM in the conference room.
          </Bubble>
          <Bubble variant="default" tail>
            Got it, thanks!
          </Bubble>
        </div>
      </ComponentPreview>

      <ComponentPreview id="bubble-chat-layout">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
              <UserIcon />
            </div>
            <Bubble variant="default" tail>
              Hey, did you see the new design mockups?
            </Bubble>
          </div>

          <div className="flex items-start gap-3 flex-row-reverse">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <BotIcon />
            </div>
            <Bubble variant="primary" tail>
              Yes! They look amazing. The new color scheme is perfect.
            </Bubble>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-700">
              <UserIcon />
            </div>
            <Bubble variant="default" tail>
              Should we schedule a review meeting?
            </Bubble>
          </div>

          <div className="flex items-start gap-3 flex-row-reverse">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
              <BotIcon />
            </div>
            <Bubble variant="primary" tail>
              Sure! How about tomorrow at 2 PM?
            </Bubble>
          </div>
        </div>
      </ComponentPreview>

      <ComponentPreview id="bubble-with-icon">
        <div className="flex flex-col gap-3">
          <Bubble variant="default" icon={<UserIcon />}>
            Can you help me with this task?
          </Bubble>
          <Bubble variant="primary" icon={<BotIcon />}>
            Of course! Let me take a look.
          </Bubble>
          <Bubble variant="secondary" icon={<CheckIcon />}>
            Task completed successfully.
          </Bubble>
        </div>
      </ComponentPreview>

      <ComponentPreview id="bubble-status">
        <div className="flex flex-col gap-3">
          <Bubble variant="default">
            <div className="flex flex-col gap-1">
              <span>Meeting scheduled for tomorrow</span>
              <span className="text-xs opacity-70">9:41 AM</span>
            </div>
          </Bubble>
          <Bubble variant="primary">
            <div className="flex flex-col gap-1">
              <span>Project deadline extended to Friday</span>
              <span className="text-xs opacity-70">10:15 AM</span>
            </div>
          </Bubble>
          <Bubble variant="muted">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <span>User is online</span>
            </div>
          </Bubble>
        </div>
      </ComponentPreview>
    </div>
  );
}
