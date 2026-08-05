export interface User {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  image: string;
  bio: string;
  followers: string;
  following: string;
  posts: string;
  verified: boolean;
  online: boolean;
  mutual?: number;
}

export interface Story {
  id: number;
  user: User;
  isYou?: boolean;
  viewed?: boolean;
}

export interface FeedPost {
  id: number;
  user: User;
  time: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  bookmarked?: boolean;
  liked?: boolean;
}

export interface Comment {
  id: number;
  user: User;
  text: string;
  time: string;
  likes: number;
}

export interface Notification {
  id: number;
  user: User;
  action: string;
  time: string;
  unread: boolean;
}

export interface Message {
  id: number;
  user: User;
  preview: string;
  time: string;
}

export interface TrendingTopic {
  tag: string;
  posts: string;
}

export interface Poll {
  id: number;
  question: string;
  options: string[];
  votes: number[];
  total: number;
}

export interface LiveStream {
  id: number;
  user: User;
  title: string;
  viewers: string;
  category: string;
}

export interface Reel {
  id: number;
  user: User;
  likes: string;
  description: string;
  image: string;
}

export interface ExploreCategory {
  label: string;
  posts: string;
  image: string;
}

export interface SavedItem {
  title: string;
  type: string;
  date: string;
  icon: string;
}

export interface Group {
  name: string;
  members: string;
  category: string;
  privacy: "Public" | "Private";
  image: string;
}

export interface SocialEvent {
  title: string;
  date: string;
  attendees: string;
  type: "Virtual" | "In-Person" | "Hybrid";
  image: string;
}

export interface SponsoredAd {
  brand: string;
  tagline: string;
  cta: string;
  image: string;
}

export interface PostInsight {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

export interface AudienceAge {
  range: string;
  percentage: number;
  color: string;
}

export interface ScheduledPost {
  day: string;
  time: string;
  content: string;
}

export interface CollaborationRequest {
  user: User;
  message: string;
  time: string;
}
