import { entry } from "../../utils";
import type { RegistryEntry } from "../../types";

export const avatarFallback: RegistryEntry = entry({
    id: "avatar-fallback",
    title: "Fallback on Image Error",
    description: "Shows initials when the image fails to load.",
    source: `import { useState } from "react";

function Avatar({ src, initials, className }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={\`overflow-hidden rounded-full \${className}\`}>
      {!failed ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 font-medium text-white">
          {initials}
        </div>
      )}
    </div>
  );
}

export default function AvatarFallback() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      <Avatar src="https://i.pravatar.cc/150?u=success" initials="AK" className="h-14 w-14" />
      <Avatar src="https://invalid-url.example.com/photo.jpg" initials="AK" className="h-14 w-14" />
      <Avatar src="https://invalid-url.example.com/photo2.jpg" initials="ML" className="h-10 w-10 text-sm" />
      <Avatar src="https://i.pravatar.cc/150?u=jd" initials="JD" className="h-20 w-20 text-2xl" />
    </div>
  );
}`,
  });
