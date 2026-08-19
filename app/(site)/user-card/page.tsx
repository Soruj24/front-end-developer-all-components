"use client";

import { ComponentDocPage, PreviewPanel, SourceCodeViewer, ExampleBlock } from "@/components/docs";

const USER_CARD_SOURCE = `"use client";

interface UserCardProps {
  name: string;
  username: string;
  role: string;
  initials: string;
  followers?: string;
  following?: string;
  posts?: string;
}

export function UserCard({
  name,
  username,
  role,
  initials,
  followers = "1.2k",
  following = "340",
  posts = "89",
}: UserCardProps) {
  return (
    <div className="max-w-xs overflow-hidden rounded-lg border bg-card p-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
          {initials}
        </div>
        <h3 className="mt-3 font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">{username}</p>
        <p className="mt-1 text-xs text-muted-foreground">{role}</p>
        <div className="mt-4 flex gap-6 text-center">
          <div>
            <p className="text-sm font-semibold">{followers}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div>
            <p className="text-sm font-semibold">{following}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
          <div>
            <p className="text-sm font-semibold">{posts}</p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
        </div>
      </div>
    </div>
  );
}`;

function UserCardDemo() {
  return (
    <div className="max-w-xs overflow-hidden rounded-lg border bg-card p-6">
      <div className="flex flex-col items-center text-center">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold text-primary">JD</div>
        <h3 className="mt-3 font-medium">John Doe</h3>
        <p className="text-sm text-muted-foreground">@johndoe</p>
        <p className="mt-1 text-xs text-muted-foreground">Product Designer</p>
        <div className="mt-4 flex gap-6 text-center">
          <div><p className="text-sm font-semibold">1.2k</p><p className="text-xs text-muted-foreground">Followers</p></div>
          <div><p className="text-sm font-semibold">340</p><p className="text-xs text-muted-foreground">Following</p></div>
          <div><p className="text-sm font-semibold">89</p><p className="text-xs text-muted-foreground">Posts</p></div>
        </div>
      </div>
    </div>
  );
}

export default function UserCardPage() {
  return (
    <ComponentDocPage
      name="User Card"
      category="Data Display"
      description="A profile card displaying user information with avatar and details."
    >
      <PreviewPanel filename="user-card.tsx">
        <UserCardDemo />
      </PreviewPanel>

      <SourceCodeViewer
        source={USER_CARD_SOURCE}
        filename="components/ui/UserCard/UserCard.tsx"
        defaultExpanded
      />

      <div className="flex flex-col gap-6">
        <ExampleBlock
          title="Profile Card"
          description="User profile card with avatar and stats."
          code={`<UserCard name="John Doe" username="@johndoe" role="Product Designer" initials="JD" />`}
        >
          <UserCardDemo />
        </ExampleBlock>
      </div>
    </ComponentDocPage>
  );
}