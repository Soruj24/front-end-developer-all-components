import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const sliderDefault: RegistryEntry = entry({
  id: "slider-default",
  title: "Default",
  description: "Default slider.",
  source: `import { Slider } from "@/components/_slider";

export default function SliderDefault() {
  return <Slider defaultValue={[50]} />;
}`,
});
