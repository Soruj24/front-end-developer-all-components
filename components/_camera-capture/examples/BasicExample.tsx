"use client";

import { CameraCapture } from "../CameraCapture";

export default function BasicExample() {
  return (
    <div className="flex w-full justify-center py-4">
      <CameraCapture onCapture={(blob) => console.log("captured:", blob)} />
    </div>
  );
}
