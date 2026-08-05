import Image from "next/image";
import { feedPosts } from "../constants/social-data";
import { Avatar } from "./Avatar";
import { VerifiedBadge } from "./VerifiedBadge";
import { ActionButton } from "./ActionButton";

export function FeedPostList() {
  return (
    <div className="space-y-6">
      {feedPosts.map((post) => (
        <article key={post.id} className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-3 flex items-center gap-3">
            <Avatar user={post.user} />
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{post.user.name}</span>
                {post.user.verified && <VerifiedBadge />}
              </div>
              <span className="text-xs text-zinc-500">{post.user.handle} · {post.time}</span>
            </div>
            <button className="text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>

          <p className="text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">{post.content}</p>

          {post.image && (
            <div className="relative mt-3 overflow-hidden rounded-lg">
              <Image src={post.image} alt="Post image" width={600} height={350} className="w-full object-cover" />
            </div>
          )}

          <div className="mt-3 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
            <div className="flex items-center gap-4">
              <ActionButton icon="like" count={post.likes} filled={post.liked} />
              <ActionButton icon="comment" count={post.comments} />
              <ActionButton icon="share" count={post.shares} />
            </div>
            <ActionButton icon="bookmark" filled={post.bookmarked} />
          </div>
        </article>
      ))}
    </div>
  );
}
