import { stories } from "../constants/social-data";
import { Avatar } from "./Avatar";

export function StoryBar() {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-4">
        {stories.map((story) => (
          <div key={story.id} className="flex shrink-0 flex-col items-center gap-1.5">
            <div className={`rounded-full p-0.5 ${story.isYou ? "" : "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"}`}>
              <div className={`flex h-16 w-16 items-center justify-center rounded-full ${story.isYou ? "bg-zinc-100 dark:bg-zinc-800" : "bg-zinc-800"}`}>
                {story.isYou ? (
                  <div className="relative">
                    <Avatar user={story.user} size="lg" />
                    <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white dark:border-zinc-900">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                  </div>
                ) : (
                  <Avatar user={story.user} size="lg" />
                )}
              </div>
            </div>
            <span className="max-w-[72px] truncate text-center text-xs font-medium text-zinc-500">{story.user.name.split(" ")[0]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
