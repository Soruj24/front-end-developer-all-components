import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const sliderDisabled: RegistryEntry = entry({
  id: "slider-disabled",
  title: "Disabled",
  description: "Disabled slider.",
  source: `import { Slider } from "@/components/_slider";

export default function SliderDisabled() {
  return <Slider defaultValue={[50]} disabled />;
}`,
});
