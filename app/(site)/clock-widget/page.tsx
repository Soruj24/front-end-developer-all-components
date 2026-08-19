"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import {
  CLOCK_WIDGET_SOURCE,
  ANALOG_EXAMPLE,
  DIGITAL_EXAMPLE,
  STOPWATCH_EXAMPLE,
  WORLD_EXAMPLE,
  COUNTDOWN_EXAMPLE,
  POMODORO_EXAMPLE,
  ALARM_EXAMPLE,
} from "./clock-widget-source";
import {
  AnalogClockDemo,
  DigitalClockDemo,
  StopwatchDemo,
  WorldClockDemo,
  CountdownDemo,
  PomodoroDemo,
  AlarmClockDemo,
} from "./demos";

export default function ClockWidgetPage() {
  return (
    <ComponentDocPage
      name="Clock Widget"
      category="Data Display"
      description="Real-time clock widgets including analog, digital, stopwatch, and world clock variants with auto-updating displays."
    >
      <PreviewPanel filename="clock-widget.tsx">
        <AnalogClockDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={CLOCK_WIDGET_SOURCE}
        filename="components/ui/ClockWidget/ClockWidget.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Analog Clock" description="Classic analog clock with moving hands and digital time display." code={ANALOG_EXAMPLE}>
          <AnalogClockDemo />
        </ExampleBlock>
        <ExampleBlock title="Digital Clock" description="Large digital display with 12h/24h format toggle and date." code={DIGITAL_EXAMPLE}>
          <DigitalClockDemo />
        </ExampleBlock>
        <ExampleBlock title="Stopwatch" description="Precision stopwatch with lap tracking and pause/reset controls." code={STOPWATCH_EXAMPLE}>
          <StopwatchDemo />
        </ExampleBlock>
        <ExampleBlock title="World Clock" description="Multiple time zones with color-coded city indicators." code={WORLD_EXAMPLE}>
          <WorldClockDemo />
        </ExampleBlock>
        <ExampleBlock title="Countdown Timer" description="Countdown to a target date with days, hours, minutes, seconds." code={COUNTDOWN_EXAMPLE}>
          <CountdownDemo />
        </ExampleBlock>
        <ExampleBlock title="Pomodoro Timer" description="Focus/break timer with circular progress and session tracking." code={POMODORO_EXAMPLE}>
          <PomodoroDemo />
        </ExampleBlock>
        <ExampleBlock title="Alarm Clock" description="Alarm list with enable/disable toggles and current time." code={ALARM_EXAMPLE}>
          <AlarmClockDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}