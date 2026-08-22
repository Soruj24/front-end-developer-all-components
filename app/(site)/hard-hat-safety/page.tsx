"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { HARD_HAT_SAFETY_SOURCE, STATUS_EXAMPLE, CHECKIN_EXAMPLE, EQUIPMENT_EXAMPLE, INCIDENT_EXAMPLE, TRAINING_EXAMPLE, SCORE_EXAMPLE, CONTACTS_EXAMPLE, PLAYGROUND_EXAMPLE } from "./hard-hat-safety-source";
import { SafetyStatusDemo, WorkerCheckinDemo, SafetyEquipmentDemo, IncidentTrackerDemo, SafetyTrainingDemo, SiteSafetyScoreDemo, EmergencyContactsDemo, PlaygroundDemo } from "./demos";

export default function HardHatSafetyPage() {
  return (
    <ComponentDocPage
      name="Hard Hat Safety"
      category="Feedback"
      description="A hard hat safety indicator for showing safety status and warnings."
    >
      <PreviewPanel filename="hard-hat-safety.tsx">
        <SafetyStatusDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={HARD_HAT_SAFETY_SOURCE}
        filename="components/ui/HardHatSafety/HardHatSafety.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Combine status, PPE checklist, and safety score in one interactive demo." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Safety Status" description="Different safety zone indicators with toggleable status." code={STATUS_EXAMPLE}>
          <SafetyStatusDemo />
        </ExampleBlock>
        <ExampleBlock title="Worker Check-in" description="PPE compliance check-in form with itemized checklist." code={CHECKIN_EXAMPLE}>
          <WorkerCheckinDemo />
        </ExampleBlock>
        <ExampleBlock title="Safety Equipment" description="Equipment availability tracker with usage progress bars." code={EQUIPMENT_EXAMPLE}>
          <SafetyEquipmentDemo />
        </ExampleBlock>
        <ExampleBlock title="Incident Tracker" description="Safety incident log with severity and resolution status." code={INCIDENT_EXAMPLE}>
          <IncidentTrackerDemo />
        </ExampleBlock>
        <ExampleBlock title="Safety Training" description="Training completion checklist with progress indicator." code={TRAINING_EXAMPLE}>
          <SafetyTrainingDemo />
        </ExampleBlock>
        <ExampleBlock title="Site Safety Score" description="Overall safety metrics with animated circular gauge." code={SCORE_EXAMPLE}>
          <SiteSafetyScoreDemo />
        </ExampleBlock>
        <ExampleBlock title="Emergency Contacts" description="Safety contact list with phone numbers." code={CONTACTS_EXAMPLE}>
          <EmergencyContactsDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
