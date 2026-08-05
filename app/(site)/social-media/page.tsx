import {
  StoryBar,
  ComposePost,
  FeedPostList,
  CommentSection,
  PollSection,
  LiveStreamSection,
  ReelsSection,
  ExploreSection,
  SavedItemsSection,
  ProfileCard,
  NotificationsCard,
  MessagesCard,
  TrendingCard,
  SuggestedUsersCard,
  PostInsightsCard,
  AudienceInsightsCard,
  ContentSchedulerCard,
  CollaborationCard,
} from "@/features/social-media";

export default function SocialMediaPage() {
  return (
    <div className="flex flex-col gap-8 p-4 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">Social</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Connect, share, and discover.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative rounded-full bg-zinc-100 p-2.5 text-zinc-500 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">3</span>
          </button>
          <button className="rounded-full bg-zinc-100 p-2.5 text-zinc-500 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8 xl:flex-row">
        <div className="flex-1 space-y-8">
          <ComposePost />
          <StoryBar />
          <FeedPostList />
          <CommentSection />
          <PollSection />
          <LiveStreamSection />
          <ReelsSection />
          <ExploreSection />
          <SavedItemsSection />
        </div>

        <aside className="w-full space-y-6 xl:w-80">
          <ProfileCard />
          <NotificationsCard />
          <MessagesCard />
          <SuggestedUsersCard />
          <TrendingCard />
          <PostInsightsCard />
          <AudienceInsightsCard />
          <ContentSchedulerCard />
          <CollaborationCard />
        </aside>
      </div>
    </div>
  );
}
