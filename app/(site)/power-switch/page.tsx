"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { POWER_SWITCH_SOURCE } from "./power-switch-source";
import {
  BASIC_TOGGLE_EXAMPLE,
  SWITCH_STYLE_EXAMPLE,
  WITH_LABEL_EXAMPLE,
  POWER_BUTTON_EXAMPLE,
  LABELED_SWITCHES_EXAMPLE,
  CONTROL_PANEL_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./power-switch-examples";
import {
  BasicToggle,
  SwitchStyle,
  WithLabel,
  PowerButtonStyle,
  LabeledSwitches,
  ControlPanel,
  PlaygroundDemo,
} from "./demos";

export default function PowerSwitchPage() {
  return (
    <ComponentDocPage
      name="Power Switch"
      category="Input"
      description="A power toggle switch component with on/off states, visual feedback, and a classic power button design."
    >
      <PreviewPanel filename="power-switch.tsx">
        <BasicToggle />
      </PreviewPanel>

      <SourceCodeViewer
        source={POWER_SWITCH_SOURCE}
        filename="components/ui/PowerSwitch/BasicToggle.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all power switch variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Basic Toggle" description="Circle power button with on/off states and shadow feedback." code={BASIC_TOGGLE_EXAMPLE}>
          <BasicToggle />
        </ExampleBlock>
        <ExampleBlock title="Switch Style" description="Classic toggle switch with smooth thumb animation." code={SWITCH_STYLE_EXAMPLE}>
          <SwitchStyle />
        </ExampleBlock>
        <ExampleBlock title="With Label" description="Labeled power controls for multiple settings." code={WITH_LABEL_EXAMPLE}>
          <WithLabel />
        </ExampleBlock>
        <ExampleBlock title="Power Button" description="Large power button with glowing ring effect." code={POWER_BUTTON_EXAMPLE}>
          <PowerButtonStyle />
        </ExampleBlock>
        <ExampleBlock title="Labeled Switches" description="Grid of toggleable settings with active state cards." code={LABELED_SWITCHES_EXAMPLE}>
          <LabeledSwitches />
        </ExampleBlock>
        <ExampleBlock title="Control Panel" description="Full control panel with icons and per-item toggles." code={CONTROL_PANEL_EXAMPLE}>
          <ControlPanel />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
