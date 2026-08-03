"use client";

import type { ControlProps } from "./types";
import { TextControl } from "./TextControl";
import { NumberControl } from "./NumberControl";
import { BooleanControl } from "./BooleanControl";
import { SelectControl } from "./SelectControl";
import { RadioControl } from "./RadioControl";
import { ColorControl } from "./ColorControl";
import { SliderControl } from "./SliderControl";
import { IconControl } from "./IconControl";
import { ImageControl } from "./ImageControl";
import { BoxControl } from "./BoxControl";
import { ShadowControl } from "./ShadowControl";
import { WidthHeightControl } from "./WidthHeightControl";

/** Renders the correct control for a field type. */
export function ControlSwitch(props: ControlProps) {
  switch (props.field.type) {
    case "text":
      return <TextControl {...props} />;
    case "number":
      return <NumberControl {...props} />;
    case "boolean":
      return <BooleanControl {...props} />;
    case "select":
      return <SelectControl {...props} />;
    case "radio":
      return <RadioControl {...props} />;
    case "color":
      return <ColorControl {...props} />;
    case "slider":
      return <SliderControl {...props} />;
    case "icon":
      return <IconControl {...props} />;
    case "image":
      return <ImageControl {...props} />;
    case "padding":
    case "margin":
    case "borderRadius":
      return <BoxControl {...props} />;
    case "shadow":
      return <ShadowControl {...props} />;
    case "width":
    case "height":
      return <WidthHeightControl {...props} />;
  }
}
