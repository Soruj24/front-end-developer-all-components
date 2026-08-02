import { TagIcon } from "./icons";

export function ComponentTags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <TagIcon className="h-3.5 w-3.5 text-muted-foreground" />
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
