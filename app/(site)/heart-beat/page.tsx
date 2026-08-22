"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { HEART_BEAT_SOURCE } from "./heart-beat-source";
import {
  HEART_RATE_MONITOR_EXAMPLE,
  WORKOUT_TRACKER_EXAMPLE,
  HEALTH_DASHBOARD_EXAMPLE,
  ECG_VISUALIZATION_EXAMPLE,
  PATIENT_STATUS_EXAMPLE,
  SLEEP_TRACKER_EXAMPLE,
  CALORIE_BURN_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./heart-beat-examples";
import {
  HeartRateMonitorDemo,
  WorkoutTrackerDemo,
  HealthDashboardDemo,
  EcgVisualizationDemo,
  PatientStatusDemo,
  SleepTrackerDemo,
  CalorieBurnDemo,
  PlaygroundDemo,
} from "./demos";

export default function HeartBeatPage() {
  return (
    <ComponentDocPage
      name="Heart Beat"
      category="Animation"
      description="An animated heartbeat component with pulsing effects for health and wellness displays."
    >
      <PreviewPanel filename="heartbeat-renderer.tsx">
        <HeartRateMonitorDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={HEART_BEAT_SOURCE}
        filename="components/ui/HeartBeat/HeartbeatRenderer.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Interactive heartbeat with workout tracking and calorie burn." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Heart Rate Monitor" description="Live BPM display with history graph and status indicator." code={HEART_RATE_MONITOR_EXAMPLE}>
          <HeartRateMonitorDemo />
        </ExampleBlock>
        <ExampleBlock title="Workout Tracker" description="Fitness session with timer, stats grid, and start/stop controls." code={WORKOUT_TRACKER_EXAMPLE}>
          <WorkoutTrackerDemo />
        </ExampleBlock>
        <ExampleBlock title="Health Dashboard" description="Vital signs overview grid with heart rate, blood pressure, SpO2, and temperature." code={HEALTH_DASHBOARD_EXAMPLE}>
          <HealthDashboardDemo />
        </ExampleBlock>
        <ExampleBlock title="ECG Visualization" description="Heart rhythm waveform display with animated scrolling." code={ECG_VISUALIZATION_EXAMPLE}>
          <EcgVisualizationDemo />
        </ExampleBlock>
        <ExampleBlock title="Patient Status" description="Hospital patient monitoring list with status badges." code={PATIENT_STATUS_EXAMPLE}>
          <PatientStatusDemo />
        </ExampleBlock>
        <ExampleBlock title="Sleep Tracker" description="Sleep quality breakdown with phase visualization." code={SLEEP_TRACKER_EXAMPLE}>
          <SleepTrackerDemo />
        </ExampleBlock>
        <ExampleBlock title="Calorie Burn" description="Exercise calorie tracker with circular progress and activity buttons." code={CALORIE_BURN_EXAMPLE}>
          <CalorieBurnDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
