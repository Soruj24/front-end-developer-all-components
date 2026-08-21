"use client";

import { useState } from "react";
import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { TimePicker } from "@/components/ui/TimePicker";
import type { TimeValue } from "@/components/ui/TimePicker";
import { TIME_PICKER_SOURCE } from "./time-picker-source";

const BASIC_CODE = `import { TimePicker } from "@/components/ui/TimePicker";

<TimePicker value={time} onChange={setTime} />`;

const TWELVE_H_CODE = `import { TimePicker } from "@/components/ui/TimePicker";

<TimePicker value={time} onChange={setTime} format="12h" />`;

const SECONDS_CODE = `import { TimePicker } from "@/components/ui/TimePicker";

<TimePicker value={time} onChange={setTime} showSeconds />`;

export default function TimePickerPage() {
  const [time24, setTime24] = useState<TimeValue>({ h: 14, m: 30 });
  const [time12, setTime12] = useState<TimeValue>({ h: 9, m: 15, period: "AM" });
  const [timeSec, setTimeSec] = useState<TimeValue>({ h: 16, m: 45, s: 30 });

  return (
    <ComponentDocPage
      name="Time Picker"
      category="Forms"
      description="A time selection component with spinner controls. Supports 12h/24h formats and optional seconds display with keyboard navigation."
    >
      <PreviewPanel filename="time-picker.tsx">
        <TimePicker value={time24} onChange={setTime24} label="Select time" />
      </PreviewPanel>

      <SourceCodeViewer
        source={TIME_PICKER_SOURCE}
        filename="components/ui/TimePicker/TimePicker.tsx"
        defaultExpanded
      />

      <section className="flex flex-col gap-8">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">Examples</h2>

        <ExampleBlock
          title="12-Hour Format"
          description="12-hour format with AM/PM toggle."
          code={TWELVE_H_CODE}
          filename="12h.tsx"
        >
          <TimePicker
            value={time12}
            onChange={setTime12}
            format="12h"
            label="Select time"
          />
        </ExampleBlock>

        <ExampleBlock
          title="With Seconds"
          description="Time picker with seconds precision."
          code={SECONDS_CODE}
          filename="seconds.tsx"
        >
          <TimePicker
            value={timeSec}
            onChange={setTimeSec}
            showSeconds
            label="Select time"
          />
        </ExampleBlock>

        <ExampleBlock
          title="Disabled"
          description="Disabled state prevents all interaction."
          code={`<TimePicker value={{ h: 10, m: 30 }} onChange={() => {}} disabled />`}
          filename="disabled.tsx"
        >
          <TimePicker
            value={{ h: 10, m: 30 }}
            onChange={() => {}}
            disabled
            label="Disabled picker"
          />
        </ExampleBlock>

        <ExampleBlock
          title="Keyboard Navigation"
          description="Use arrow keys on the digit to increment/decrement. Tab between columns."
          code={`{/* Focus a digit, press ArrowUp or ArrowDown */}`}
          filename="keyboard.tsx"
        >
          <TimePicker
            value={time24}
            onChange={setTime24}
            label="Keyboard accessible"
            helperText="Focus a number and use arrow keys to change values."
          />
        </ExampleBlock>

        <ExampleBlock
          title="With Helper Text"
          description="Add descriptive text below the picker."
          code={`<TimePicker value={time} onChange={setTime} helperText="Office hours: 9 AM - 5 PM" />`}
          filename="helper-text.tsx"
        >
          <TimePicker
            value={time12}
            onChange={setTime12}
            format="12h"
            label="Office hours"
            helperText="Available between 9:00 AM and 5:00 PM"
          />
        </ExampleBlock>

        <ExampleBlock
          title="All Variants"
          description="24h, 12h, and 12h with seconds side by side."
          code={`<TimePicker format="24h" />
<TimePicker format="12h" />
<TimePicker format="12h" showSeconds />`}
          filename="all-variants.tsx"
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">24h</p>
              <TimePicker value={time24} onChange={setTime24} format="24h" />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">12h</p>
              <TimePicker value={time12} onChange={setTime12} format="12h" />
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">12h + Seconds</p>
              <TimePicker value={{ h: 9, m: 15, s: 45, period: "PM" }} onChange={() => {}} format="12h" showSeconds />
            </div>
          </div>
        </ExampleBlock>
      </section>
    </ComponentDocPage>
  );
}
