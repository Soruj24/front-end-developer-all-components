"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { EGG_TIMER_SOURCE, INTERACTIVE_EXAMPLE, PRESET_CARDS_EXAMPLE, PROGRESS_EXAMPLE, KITCHEN_EXAMPLE, WORKOUT_EXAMPLE, POMODORO_EXAMPLE, COOKING_EXAMPLE } from "./egg-timer-source";
import {
  EggTimerDemo,
  PresetCardsDemo,
  ProgressBarDemo,
  KitchenTimerDemo,
  WorkoutTimerDemo,
  PomodoroTimerDemo,
  CookingTimerDemo,
} from "./demos";

export default function EggTimerPage() {
  return (
    <ComponentDocPage
      name="Egg Timer"
      category="Feedback"
      description="Egg timer with soft/medium/hard presets, circular progress, countdown animation, and completion feedback."
    >
      <PreviewPanel filename="egg-timer.tsx">
        <EggTimerDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={EGG_TIMER_SOURCE}
        filename="components/ui/EggTimer/EggTimer.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Interactive Timer" description="Basic egg timer with presets and circular progress." code={INTERACTIVE_EXAMPLE}>
          <EggTimerDemo />
        </ExampleBlock>
        <ExampleBlock title="Preset Cards" description="Egg type selection cards with descriptions." code={PRESET_CARDS_EXAMPLE}>
          <PresetCardsDemo />
        </ExampleBlock>
        <ExampleBlock title="Progress Bar" description="Linear progress countdown with time display." code={PROGRESS_EXAMPLE}>
          <ProgressBarDemo />
        </ExampleBlock>
        <ExampleBlock title="Kitchen Timer" description="Multiple concurrent timers for different dishes." code={KITCHEN_EXAMPLE}>
          <KitchenTimerDemo />
        </ExampleBlock>
        <ExampleBlock title="Workout Timer" description="HIIT interval timer with work/rest phases." code={WORKOUT_EXAMPLE}>
          <WorkoutTimerDemo />
        </ExampleBlock>
        <ExampleBlock title="Pomodoro Timer" description="Focus/break timer with session tracking." code={POMODORO_EXAMPLE}>
          <PomodoroTimerDemo />
        </ExampleBlock>
        <ExampleBlock title="Cooking Timer" description="Multiple breakfast items with individual timers." code={COOKING_EXAMPLE}>
          <CookingTimerDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}