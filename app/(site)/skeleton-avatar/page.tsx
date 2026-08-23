"use client";

import { useState } from "react";
import { Badge } from "@/components/design-system/Badge";
import { ComponentPreview } from "@/components/preview";
import { CodeBlock } from "@/components/home/CodeBlock";
import { User, Users, Image, CreditCard, List, Table, FileText } from "lucide-react";

const installCommand = "npx ui-add skeleton-avatar";
const usageCode = `import { SkeletonAvatar } from "@/components/ui/skeleton-avatar";

<SkeletonAvatar size="md" variant="circle" />
`;

function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-muted ${className || ""}`} />
  );
}

function AvatarSkeleton() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        {loading ? (
          <>
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </>
        ) : (
          <>
            <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">john@example.com</p>
            </div>
          </>
        )}
      </div>
      <button
        onClick={() => setLoading(!loading)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {loading ? "Load Content" : "Show Skeleton"}
      </button>
    </div>
  );
}

function CardSkeleton() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-w-sm">
      <div className="rounded-xl border bg-card p-4 space-y-4">
        {loading ? (
          <>
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
          </>
        ) : (
          <>
            <div className="h-48 rounded-lg bg-muted flex items-center justify-center">
              <Image className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="font-semibold">Card Title</h3>
            <p className="text-sm text-muted-foreground">
              This is a sample card with loaded content.
            </p>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm">Author Name</span>
            </div>
          </>
        )}
      </div>
      <button
        onClick={() => setLoading(!loading)}
        className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {loading ? "Load Content" : "Show Skeleton"}
      </button>
    </div>
  );
}

function ListSkeleton() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-w-sm">
      <div className="space-y-3">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16 rounded" />
              </div>
            ))
          : [
              { name: "Project Alpha", status: "Active" },
              { name: "Project Beta", status: "Draft" },
              { name: "Project Gamma", status: "Archived" },
              { name: "Project Delta", status: "Active" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <List className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Updated 2 hours ago</p>
                </div>
                <Badge variant={item.status === "Active" ? "default" : "secondary"}>
                  {item.status}
                </Badge>
              </div>
            ))}
      </div>
      <button
        onClick={() => setLoading(!loading)}
        className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {loading ? "Load Content" : "Show Skeleton"}
      </button>
    </div>
  );
}

function TableSkeleton() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full">
      <div className="rounded-xl border overflow-hidden">
        <div className="bg-muted/50 p-3 border-b">
          <div className="flex gap-4">
            {loading ? (
              <>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </>
            ) : (
              <>
                <span className="font-medium w-24">Name</span>
                <span className="font-medium w-32">Email</span>
                <span className="font-medium w-20">Role</span>
                <span className="font-medium w-16">Status</span>
              </>
            )}
          </div>
        </div>
        <div className="divide-y">
          {(loading ? Array.from({ length: 4 }) : [1, 2, 3, 4]).map((_, i) => (
            <div key={i} className="p-3">
              <div className="flex gap-4">
                {loading ? (
                  <>
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </>
                ) : (
                  <>
                    <span className="w-24">User {i + 1}</span>
                    <span className="w-32 text-muted-foreground">user{i + 1}@example.com</span>
                    <span className="w-20">Admin</span>
                    <Badge variant="default" className="w-16 justify-center">Active</Badge>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => setLoading(!loading)}
        className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {loading ? "Load Content" : "Show Skeleton"}
      </button>
    </div>
  );
}

function ProfileSkeleton() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl border bg-card overflow-hidden">
        {loading ? (
          <>
            <Skeleton className="h-32 w-full" />
            <div className="px-6 pb-6">
              <div className="flex flex-col items-center -mt-12">
                <Skeleton className="h-24 w-24 rounded-full border-4 border-card" />
                <Skeleton className="h-5 w-32 mt-4" />
                <Skeleton className="h-4 w-24 mt-2" />
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <Skeleton className="h-5 w-12 mx-auto" />
                    <Skeleton className="h-3 w-16 mx-auto mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/10" />
            <div className="px-6 pb-6">
              <div className="flex flex-col items-center -mt-12">
                <div className="h-24 w-24 rounded-full border-4 border-card bg-primary/20 flex items-center justify-center">
                  <User className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold text-lg">Jane Smith</h3>
                <p className="text-sm text-muted-foreground">@janesmith</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <p className="font-semibold">1.2k</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">348</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">89</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <button
        onClick={() => setLoading(!loading)}
        className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {loading ? "Load Content" : "Show Skeleton"}
      </button>
    </div>
  );
}

function FeedSkeleton() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-w-md space-y-4">
      {(loading ? Array.from({ length: 2 }) : [1, 2]).map((_, i) => (
        <div key={i} className="rounded-xl border bg-card p-4 space-y-3">
          {loading ? (
            <>
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-48 w-full rounded-lg" />
              <div className="flex gap-4">
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-16" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">User Name</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              <p className="text-sm">
                This is a sample post content with some text to demonstrate the feed skeleton.
              </p>
              <div className="h-48 rounded-lg bg-muted flex items-center justify-center">
                <Image className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="flex gap-4">
                <button className="text-sm text-muted-foreground hover:text-foreground">Like</button>
                <button className="text-sm text-muted-foreground hover:text-foreground">Comment</button>
                <button className="text-sm text-muted-foreground hover:text-foreground">Share</button>
              </div>
            </>
          )}
        </div>
      ))}
      <button
        onClick={() => setLoading(!loading)}
        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {loading ? "Load Content" : "Show Skeleton"}
      </button>
    </div>
  );
}

function ContentSkeleton() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full max-w-2xl">
      <div className="rounded-xl border bg-card p-6 space-y-4">
        {loading ? (
          <>
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex items-center gap-4 pt-4">
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-10 w-10 rounded" />
              <Skeleton className="h-10 w-10 rounded" />
            </div>
            <Skeleton className="h-10 w-32 rounded-lg" />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold">Article Title</h2>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <p className="text-muted-foreground">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <button className="h-10 w-10 rounded bg-muted flex items-center justify-center hover:bg-accent">
                <CreditCard className="h-5 w-5" />
              </button>
              <button className="h-10 w-10 rounded bg-muted flex items-center justify-center hover:bg-accent">
                <FileText className="h-5 w-5" />
              </button>
              <button className="h-10 w-10 rounded bg-muted flex items-center justify-center hover:bg-accent">
                <Users className="h-5 w-5" />
              </button>
            </div>
            <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Read More
            </button>
          </>
        )}
      </div>
      <button
        onClick={() => setLoading(!loading)}
        className="mt-4 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {loading ? "Load Content" : "Show Skeleton"}
      </button>
    </div>
  );
}

export default function SkeletonAvatarPage() {
  return (
    <div className="container max-w-4xl py-12 space-y-12">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-4xl font-bold">Skeleton Avatar</h1>
          <Badge variant="secondary">UI Component</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Loading skeleton placeholders for avatars, cards, and content.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Installation</h2>
        <CodeBlock code={installCommand} language="bash" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <CodeBlock code={usageCode} language="tsx" />
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold">Examples</h2>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Avatar Skeleton</h3>
            <ComponentPreview>
              <AvatarSkeleton />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Card Skeleton</h3>
            <ComponentPreview>
              <CardSkeleton />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">List Skeleton</h3>
            <ComponentPreview>
              <ListSkeleton />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Table Skeleton</h3>
            <ComponentPreview>
              <TableSkeleton />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Profile Skeleton</h3>
            <ComponentPreview>
              <ProfileSkeleton />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Feed Skeleton</h3>
            <ComponentPreview>
              <FeedSkeleton />
            </ComponentPreview>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Content Skeleton</h3>
            <ComponentPreview>
              <ContentSkeleton />
            </ComponentPreview>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Prop</th>
                <th className="text-left py-2 font-medium">Type</th>
                <th className="text-left py-2 font-medium">Default</th>
                <th className="text-left py-2 font-medium">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">variant</td>
                <td className="py-2">"circle" | "rectangle" | "text"</td>
                <td className="py-2">"circle"</td>
                <td className="py-2">Shape of the skeleton placeholder</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">size</td>
                <td className="py-2">"sm" | "md" | "lg"</td>
                <td className="py-2">"md"</td>
                <td className="py-2">Size of the skeleton</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">lines</td>
                <td className="py-2">number</td>
                <td className="py-2">3</td>
                <td className="py-2">Number of text lines for text variant</td>
              </tr>
              <tr className="border-b">
                <td className="py-2">animate</td>
                <td className="py-2">boolean</td>
                <td className="py-2">true</td>
                <td className="py-2">Enable pulse animation</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
