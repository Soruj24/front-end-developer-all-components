"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { REALTIME_CLOCK_SOURCE, ANALOG_EXAMPLE, DIGITAL_EXAMPLE, WORLD_EXAMPLE, STOPWATCH_EXAMPLE, COUNTDOWN_EXAMPLE, ALARM_EXAMPLE, POMODORO_EXAMPLE } from "./realtime-clock-source";
import { AnalogClock, DigitalClock, WorldClock, Stopwatch, CountdownTimer, AlarmClockDemo, PomodoroTimer } from "./demos";

export default function RealtimeClockPage() {
  return (
    <ComponentDocPage
      name="Realtime Clock"
      category="Data Display"
      description="A live-updating clock component that displays the current time with customizable format and timezone. Includes analog, digital, world, stopwatch, countdown, alarm, and pomodoro variants."
    >
      <PreviewPanel filename="realtime-clock.tsx">
        <AnalogClock />
      </PreviewPanel>

      <SourceCodeViewer
        source={REALTIME_CLOCK_SOURCE}
        filename="components/ui/RealtimeClock/RealtimeClock.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Analog Clock" description="Classic clock face with hour, minute, and second hands." code={ANALOG_EXAMPLE}>
          <AnalogClock />
        </ExampleBlock>
        <ExampleBlock title="Digital Clock" description="Large digital display with 12h/24h toggle and date." code={DIGITAL_EXAMPLE}>
          <DigitalClock />
        </ExampleBlock>
        <ExampleBlock title="World Clock" description="Multiple time zones using IANA timezone identifiers." code={WORLD_EXAMPLE}>
          <WorldClock />
        </ExampleBlock>
        <ExampleBlock title="Stopwatch" description="Precision timing with start, pause, and reset controls." code={STOPWATCH_EXAMPLE}>
          <Stopwatch />
        </ExampleBlock>
        <ExampleBlock title="Countdown Timer" description="Circular progress countdown with reset." code={COUNTDOWN_EXAMPLE}>
          <CountdownTimer />
        </ExampleBlock>
        <ExampleBlock title="Alarm Clock" description="Set an alarm time with an on/off toggle." code={ALARM_EXAMPLE}>
          <AlarmClockDemo />
        </ExampleBlock>
        <ExampleBlock title="Pomodoro Timer" description="Work/break intervals with circular progress." code={POMODORO_EXAMPLE}>
          <PomodoroTimer />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
