export const TYPING_INDICATOR_SOURCE = `"use client";

function TypingIndicator({
  dots = 3,
  color = "#6366f1",
  size = 8,
  gap = 4,
}: {
  dots?: number;
  color?: string;
  size?: number;
  gap?: number;
}) {
  return (
    <div className="flex items-center" style={{ gap }}>
      {Array.from({ length: dots }, (_, i) => (
        <div
          key={i}
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
            animation: \`typing-bounce 1.4s \${i * 0.16}s ease-in-out infinite\`,
          }}
        />
      ))}
      <style>{\`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-\${size}px); opacity: 1; }
        }
      \`}</style>
    </div>
  );
}

export default TypingIndicator;`;