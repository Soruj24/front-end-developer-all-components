"use client";

import { useState } from "react";
import { ToggleGroup } from "@/components/ui/ToggleGroup";
import {
  ComponentDocPage,
  PreviewPanel,
  SourceCodeViewer,
  ExampleBlock,
} from "@/components/docs";
import { ToggleGroupItem } from "@/components/_toggle-group";

const TOGGLEGROUP_SOURCE = `"use client";

import { Children, cloneElement, isValidElement, type ReactElement } from "react";
import { cn } from "@/lib/cn";

interface ToggleGroupProps {
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  type?: "single" | "multiple";
  orientation?: "horizontal" | "vertical";
  className?: string;
  children: React.ReactNode;
}

export default function ToggleGroup({
  value,
  onValueChange,
  type = "single",
  orientation = "horizontal",
  className,
  children,
}: ToggleGroupProps) {
  const isSelected = (itemValue: string) => {
    if (type === "single") return value === itemValue;
    return Array.isArray(value) && value.includes(itemValue);
  };

  const handleClick = (itemValue: string) => {
    if (type === "single") {
      onValueChange?.(value === itemValue ? "" : itemValue);
    } else {
      const current = Array.isArray(value) ? value : [];
      onValueChange?.(
        current.includes(itemValue)
          ? current.filter((v) => v !== itemValue)
          : [...current, itemValue]
      );
    }
  };

  return (
    <div
      role="group"
      className={cn(
        "flex",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        const childProps = (child as ReactElement<{ value?: string }>).props;
        if (!childProps.value) return child;
        return cloneElement(child as ReactElement<Record<string, unknown>>, {
          "data-state": isSelected(childProps.value!) ? "on" : "off",
          "aria-pressed": isSelected(childProps.value!),
          onClick: () => handleClick(childProps.value!),
        });
      })}
    </div>
  );
}`;

const SINGLE_CODE = `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";

<ToggleGroup type="single" defaultValue="center">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`;

const MULTIPLE_CODE = `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";

<ToggleGroup type="multiple" defaultValue={["bold"]}>
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
  <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
</ToggleGroup>`;

const ORIENTATION_CODE = `import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";

<ToggleGroup type="single" orientation="vertical" defaultValue="a">
  <ToggleGroupItem value="a">First</ToggleGroupItem>
  <ToggleGroupItem value="b">Second</ToggleGroupItem>
  <ToggleGroupItem value="c">Third</ToggleGroupItem>
</ToggleGroup>`;

const CONTROLLED_CODE = `import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup";

function ControlledToggleGroup() {
  const [value, setValue] = useState("center");

  return (
    <div className="flex flex-col gap-3">
      <ToggleGroup type="single" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="center">Center</ToggleGroupItem>
        <ToggleGroupItem value="right">Right</ToggleGroupItem>
      </ToggleGroup>
      <p className="text-sm text-muted-foreground">Selected: {value || "none"}</p>
    </div>
  );
}`;

export default function ToggleGroupPage() {
  const [value, setValue] = useState("center");

  return (
    <ComponentDocPage
      name="Toggle Group"
      category="Forms"
      description="A set of two-state buttons that can be toggled on or off. Use single-select for exclusive options and multi-select for independent toggles."
    >
      <PreviewPanel filename="toggle-group-demo.tsx">
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </PreviewPanel>

      <SourceCodeViewer
        source={TOGGLEGROUP_SOURCE}
        filename="ToggleGroup.tsx"
        defaultExpanded
      />

      <ExampleBlock title="Single Select" code={SINGLE_CODE}>
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </ExampleBlock>

      <ExampleBlock title="Multiple Select" code={MULTIPLE_CODE}>
        <ToggleGroup type="multiple" defaultValue={["bold"]}>
          <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
          <ToggleGroupItem value="italic">Italic</ToggleGroupItem>
          <ToggleGroupItem value="underline">Underline</ToggleGroupItem>
        </ToggleGroup>
      </ExampleBlock>

      <ExampleBlock title="Orientation" code={ORIENTATION_CODE}>
        <ToggleGroup type="single" orientation="vertical" defaultValue="a">
          <ToggleGroupItem value="a">First</ToggleGroupItem>
          <ToggleGroupItem value="b">Second</ToggleGroupItem>
          <ToggleGroupItem value="c">Third</ToggleGroupItem>
        </ToggleGroup>
      </ExampleBlock>

      <ExampleBlock title="Controlled" code={CONTROLLED_CODE}>
        <div className="flex flex-col gap-3">
          <ToggleGroup type="single" value={value} onValueChange={setValue}>
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
          <p className="text-sm text-muted-foreground">
            Selected: {value || "none"}
          </p>
        </div>
      </ExampleBlock>
    </ComponentDocPage>
  );
}
