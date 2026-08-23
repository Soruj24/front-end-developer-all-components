export const ZIGZAG_PATH_V2_SOURCE = `"use client";

function generateZigzag(width: number, height: number, segments: number, amplitude: number): string {
  const segmentWidth = width / segments;
  const midY = height / 2;
  let path = \`M0 \${midY}\`;
  for (let i = 0; i < segments; i++) {
    const x1 = i * segmentWidth + segmentWidth / 2;
    const y1 = i % 2 === 0 ? midY - amplitude : midY + amplitude;
    const x2 = (i + 1) * segmentWidth;
    path += \` L\${x1} \${y1} L\${x2} \${midY}\`;
  }
  return path;
}

export function BasicZigzag() {
  return (
    <svg className="h-8 w-full" viewBox="0 0 400 32" preserveAspectRatio="none">
      <path d={generateZigzag(400, 32, 20, 12)} fill="none" stroke="#18181b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}`;
