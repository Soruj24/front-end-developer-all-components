import { Badge } from "@/components/design-system/Badge";
import { CodeBlock } from "@/components/home/CodeBlock";
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
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 p-6 sm:p-10 lg:p-14">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Social
          </h1>
          <Badge variant="primary">14 examples</Badge>
        </div>
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Social media platform with feed, stories, reels, polls, live streams,
          and analytics.
        </p>
      </header>

      {/* Examples */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Examples
        </h2>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">
            Feed & Compose
          </h3>
          <p className="text-sm text-muted-foreground">
            Social feed with post composer, stories bar, and feed posts.
          </p>
          <div className="rounded-lg border border-border bg-background p-6">
            <ComposePost />
            <div className="mt-6">
              <StoryBar />
            </div>
            <div className="mt-6">
              <FeedPostList />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">
            Engagement Features
          </h3>
          <p className="text-sm text-muted-foreground">
            Comments, polls, reels, and live stream sections.
          </p>
          <div className="rounded-lg border border-border bg-background p-6 flex flex-col gap-6">
            <CommentSection />
            <PollSection />
            <ReelsSection />
            <LiveStreamSection />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">
            Sidebar Widgets
          </h3>
          <p className="text-sm text-muted-foreground">
            Profile, notifications, messages, trending, and insights.
          </p>
          <div className="rounded-lg border border-border bg-background p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileCard />
            <NotificationsCard />
            <MessagesCard />
            <TrendingCard />
            <SuggestedUsersCard />
            <PostInsightsCard />
            <AudienceInsightsCard />
            <ContentSchedulerCard />
            <CollaborationCard />
          </div>
        </div>
      </section>
    </div>
  );
}
