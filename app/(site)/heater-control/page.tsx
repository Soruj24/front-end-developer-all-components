"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { HEATER_CONTROL_SOURCE } from "./heater-control-source";
import {
  THERMOSTAT_EXAMPLE,
  ROOM_TEMPERATURES_EXAMPLE,
  SCHEDULE_TIMER_EXAMPLE,
  ENERGY_USAGE_EXAMPLE,
  QUICK_PRESETS_EXAMPLE,
  HEATING_ZONES_EXAMPLE,
  CLIMATE_HISTORY_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./heater-control-examples";
import {
  ThermostatDemo,
  RoomTemperaturesDemo,
  ScheduleTimerDemo,
  EnergyUsageDemo,
  QuickPresetsDemo,
  HeatingZonesDemo,
  ClimateHistoryDemo,
  PlaygroundDemo,
} from "./demos";

export default function HeaterControlPage() {
  return (
    <ComponentDocPage
      name="Heater Control"
      category="Input"
      description="A heater control input component for temperature regulation and thermostat interfaces."
    >
      <PreviewPanel filename="heater-control.tsx">
        <ThermostatDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={HEATER_CONTROL_SOURCE}
        filename="components/ui/HeaterControl/HeaterControl.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Adjust temperature, switch modes, and apply presets." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Thermostat Control" description="Interactive temperature dial with mode selector and range slider." code={THERMOSTAT_EXAMPLE}>
          <ThermostatDemo />
        </ExampleBlock>
        <ExampleBlock title="Room Temperatures" description="Multi-room temperature display with selectable cards." code={ROOM_TEMPERATURES_EXAMPLE}>
          <RoomTemperaturesDemo />
        </ExampleBlock>
        <ExampleBlock title="Schedule Timer" description="Heating schedule with time slots and active status." code={SCHEDULE_TIMER_EXAMPLE}>
          <ScheduleTimerDemo />
        </ExampleBlock>
        <ExampleBlock title="Energy Usage" description="Power consumption tracker with period selector and bar chart." code={ENERGY_USAGE_EXAMPLE}>
          <EnergyUsageDemo />
        </ExampleBlock>
        <ExampleBlock title="Quick Presets" description="Temperature preset buttons for common settings." code={QUICK_PRESETS_EXAMPLE}>
          <QuickPresetsDemo />
        </ExampleBlock>
        <ExampleBlock title="Heating Zones" description="Zone-based heating control with toggle switches." code={HEATING_ZONES_EXAMPLE}>
          <HeatingZonesDemo />
        </ExampleBlock>
        <ExampleBlock title="Climate History" description="24-hour temperature history bar chart." code={CLIMATE_HISTORY_EXAMPLE}>
          <ClimateHistoryDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
