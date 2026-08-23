"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { TARGET_CARD_SOURCE } from "./target-goal-source";
import {
  TARGET_CARD_EXAMPLE,
  GOAL_TRACKER_EXAMPLE,
  PROGRESS_RING_EXAMPLE,
  ACHIEVEMENT_BADGE_EXAMPLE,
  MILESTONE_MARKER_EXAMPLE,
  OBJECTIVE_LIST_EXAMPLE,
  SUCCESS_RATE_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./target-goal-examples";
import {
  TargetCard,
  GoalTracker,
  ProgressRing,
  AchievementBadge,
  MilestoneMarker,
  ObjectiveList,
  SuccessRate,
  PlaygroundDemo,
} from "./demos";

export default function TargetGoalPage() {
  return (
    <ComponentDocPage
      name="Target Goal"
      category="Feedback"
      description="A feedback component for displaying target goals with progress rings, milestones, and achievement celebrations."
    >
      <PreviewPanel filename="target-card.tsx">
        <TargetCard />
      </PreviewPanel>

      <SourceCodeViewer
        source={TARGET_CARD_SOURCE}
        filename="components/ui/TargetGoal/TargetCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all target goal variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Target Card" description="Interactive target and current value inputs with dynamic progress bar." code={TARGET_CARD_EXAMPLE}>
          <TargetCard />
        </ExampleBlock>
        <ExampleBlock title="Goal Tracker" description="Track multiple goals with individual progress bars and targets." code={GOAL_TRACKER_EXAMPLE}>
          <GoalTracker />
        </ExampleBlock>
        <ExampleBlock title="Progress Ring" description="Circular progress ring with range slider control." code={PROGRESS_RING_EXAMPLE}>
          <ProgressRing />
        </ExampleBlock>
        <ExampleBlock title="Achievement Badge" description="Earned badge indicators with toggle state." code={ACHIEVEMENT_BADGE_EXAMPLE}>
          <AchievementBadge />
        </ExampleBlock>
        <ExampleBlock title="Milestone Marker" description="Vertical timeline with completed and pending milestones." code={MILESTONE_MARKER_EXAMPLE}>
          <MilestoneMarker />
        </ExampleBlock>
        <ExampleBlock title="Objective List" description="Checklist with priority badges and completion state." code={OBJECTIVE_LIST_EXAMPLE}>
          <ObjectiveList />
        </ExampleBlock>
        <ExampleBlock title="Success Rate" description="Success rate display with stat cards and increment buttons." code={SUCCESS_RATE_EXAMPLE}>
          <SuccessRate />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
