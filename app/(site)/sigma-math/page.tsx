"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";
import { SIGMA_MATH_SOURCE } from "./sigma-math-source";
import {
  FORMULA_DISPLAY_EXAMPLE,
  MATH_EQUATION_EXAMPLE,
  STATISTICS_CARD_EXAMPLE,
  CALCULATOR_WIDGET_EXAMPLE,
  SUM_NOTATION_EXAMPLE,
  MATH_GRID_EXAMPLE,
  PLAYGROUND_EXAMPLE,
} from "./sigma-math-examples";
import {
  FormulaDisplay,
  MathEquation,
  StatisticsCard,
  CalculatorWidget,
  SumNotation,
  MathGrid,
  PlaygroundDemo,
} from "./demos";

export default function SigmaMathPage() {
  return (
    <ComponentDocPage
      name="Sigma Math"
      category="Mathematics"
      description="Mathematical notation components for rendering formulas, summation/product notation, calculators, and statistical displays."
    >
      <PreviewPanel filename="sigma-math.tsx">
        <FormulaDisplay />
      </PreviewPanel>

      <SourceCodeViewer
        source={SIGMA_MATH_SOURCE}
        filename="components/ui/SigmaMath/FormulaDisplay.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock title="Playground" description="Switch between all sigma math variants." code={PLAYGROUND_EXAMPLE}>
          <PlaygroundDemo />
        </ExampleBlock>
        <ExampleBlock title="Formula Display" description="Serif italic formula with centered label." code={FORMULA_DISPLAY_EXAMPLE}>
          <FormulaDisplay />
        </ExampleBlock>
        <ExampleBlock title="Math Equation" description="Interactive equation with editable operands and live result." code={MATH_EQUATION_EXAMPLE}>
          <MathEquation />
        </ExampleBlock>
        <ExampleBlock title="Statistics Card" description="Mean, max, and min cards with colored icon badges." code={STATISTICS_CARD_EXAMPLE}>
          <StatisticsCard />
        </ExampleBlock>
        <ExampleBlock title="Calculator Widget" description="Full calculator with display, keypad, and clear button." code={CALCULATOR_WIDGET_EXAMPLE}>
          <CalculatorWidget />
        </ExampleBlock>
        <ExampleBlock title="Sum Notation" description="Sigma summation with interactive range slider." code={SUM_NOTATION_EXAMPLE}>
          <SumNotation />
        </ExampleBlock>
        <ExampleBlock title="Math Grid" description="Grid of math operations with colored icon badges." code={MATH_GRID_EXAMPLE}>
          <MathGrid />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}
