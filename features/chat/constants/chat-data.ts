import type { User, Message, Conversation, Channel } from "../types/chat";

export const currentUser: User = {
  id: "u1",
  name: "Alex Morgan",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  status: "online",
  role: "Frontend Lead",
};

export const users: User[] = [
  currentUser,
  {
    id: "u2",
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    status: "online",
    role: "Backend Engineer",
  },
  {
    id: "u3",
    name: "Marcus Johnson",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    status: "away",
    role: "DevOps Engineer",
  },
  {
    id: "u4",
    name: "Emily Watson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    status: "online",
    role: "Product Manager",
  },
  {
    id: "u5",
    name: "David Kim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    status: "busy",
    role: "UI/UX Designer",
  },
  {
    id: "u6",
    name: "Lisa Park",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    status: "offline",
    role: "QA Engineer",
  },
  {
    id: "u7",
    name: "James Wright",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    status: "online",
    role: "CTO",
  },
  {
    id: "u8",
    name: "Ana Rodriguez",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    status: "away",
    role: "Data Engineer",
  },
];

const now = new Date();
const h = (hours: number) => new Date(now.getTime() - hours * 3600000).toISOString();
const m = (mins: number) => new Date(now.getTime() - mins * 60000).toISOString();

export const messages: Record<string, Message[]> = {
  c1: [
    { id: "m1", senderId: "u2", content: "Hey Alex, did you see the new design specs for the dashboard?", timestamp: h(3), status: "read" },
    { id: "m2", senderId: "u1", content: "Yeah, just went through them. The new chart components look great.", timestamp: h(2.9), status: "read" },
    { id: "m3", senderId: "u2", content: "I've started working on the API endpoints for the analytics module. Should have a PR up by EOD.", timestamp: h(2.8), status: "read" },
    { id: "m4", senderId: "u1", content: "Nice! I'll pair the frontend once the endpoints are ready. Want to sync at 3pm?", timestamp: h(2.7), status: "read" },
    { id: "m5", senderId: "u2", content: "Sounds good. I'll book a meeting room.", timestamp: h(2.5), status: "read" },
    { id: "m6", senderId: "u1", content: "Also, I noticed the auth middleware needs a token refresh fix. Can you take a look?", timestamp: h(1), status: "read" },
    { id: "m7", senderId: "u2", content: "On it! I'll push a fix today.", timestamp: m(45), status: "delivered" },
    { id: "m8", senderId: "u1", content: "You're the best \u2764", timestamp: m(30), status: "sent" },
  ],
  c2: [
    { id: "m9", senderId: "u4", content: "Team, the sprint retro is moved to Thursday 10am.", timestamp: h(5), status: "read" },
    { id: "m10", senderId: "u3", content: "Works for me. I'll have the infra cost report ready by then.", timestamp: h(4.5), status: "read" },
    { id: "m11", senderId: "u5", content: "Same here. The new component library docs will be done.", timestamp: h(4), status: "read" },
    { id: "m12", senderId: "u1", content: "I'll prepare the frontend velocity metrics.", timestamp: h(3.5), status: "read" },
    { id: "m13", senderId: "u4", content: "Perfect. Also, @Alex can you present the new caching strategy?", timestamp: h(2), status: "read" },
    { id: "m14", senderId: "u1", content: "Sure, I'll put together a quick deck.", timestamp: h(1.5), status: "read" },
  ],
  c3: [
    { id: "m15", senderId: "u7", content: "Great work on the Q2 launch, everyone. Revenue is up 34% from last quarter.", timestamp: h(8), status: "read" },
    { id: "m16", senderId: "u4", content: "That's incredible! The new checkout flow really moved the needle.", timestamp: h(7.5), status: "read" },
    { id: "m17", senderId: "u5", content: "The A/B test results were clear - simplified checkout won by 22%.", timestamp: h(7), status: "read" },
    { id: "m18", senderId: "u1", content: "The performance optimizations helped too. Page load dropped from 3.2s to 1.1s.", timestamp: h(6.5), status: "read" },
    { id: "m19", senderId: "u7", content: "Exactly. Let's keep this momentum going into Q3.", timestamp: h(6), status: "read" },
  ],
  c4: [
    { id: "m20", senderId: "u5", content: "Just finished the mobile responsive mockups for the settings page.", timestamp: h(10), status: "read" },
    { id: "m21", senderId: "u1", content: "These look amazing! The tab navigation on mobile is really clean.", timestamp: h(9), status: "read" },
    { id: "m22", senderId: "u5", content: "Thanks! I kept the Figma file updated with all the specs.", timestamp: h(8.5), status: "read" },
  ],
  c5: [
    { id: "m23", senderId: "u6", content: "Found a regression in the payment flow on Safari. The confirm button is misaligned.", timestamp: h(6), status: "read" },
    { id: "m24", senderId: "u1", content: "Hmm, I'll check the CSS. Might be a flexbox issue.", timestamp: h(5.5), status: "read" },
    { id: "m25", senderId: "u6", content: "It's only on Safari 17. Chrome and Firefox are fine.", timestamp: h(5), status: "read" },
    { id: "m26", senderId: "u1", content: "Got it. Probably a -webkit- prefix issue. I'll fix it now.", timestamp: h(4.5), status: "read" },
  ],
};

export const conversations: Conversation[] = [
  {
    id: "c1",
    type: "direct",
    name: "Sarah Chen",
    participants: ["u1", "u2"],
    lastMessage: messages.c1[messages.c1.length - 1],
    unreadCount: 0,
  },
  {
    id: "c2",
    type: "group",
    name: "Sprint Planning",
    avatar: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&h=150&fit=crop",
    participants: ["u1", "u3", "u4", "u5"],
    lastMessage: messages.c2[messages.c2.length - 1],
    unreadCount: 2,
  },
  {
    id: "c3",
    type: "channel",
    name: "general",
    description: "Company-wide announcements and updates",
    participants: ["u1", "u2", "u3", "u4", "u5", "u6", "u7", "u8"],
    lastMessage: messages.c3[messages.c3.length - 1],
    unreadCount: 0,
    pinned: true,
  },
  {
    id: "c4",
    type: "direct",
    name: "David Kim",
    participants: ["u1", "u5"],
    lastMessage: messages.c4[messages.c4.length - 1],
    unreadCount: 0,
  },
  {
    id: "c5",
    type: "direct",
    name: "Lisa Park",
    participants: ["u1", "u6"],
    lastMessage: messages.c5[messages.c5.length - 1],
    unreadCount: 1,
  },
  {
    id: "c6",
    type: "group",
    name: "Design System",
    avatar: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=150&fit=crop",
    participants: ["u1", "u5", "u6"],
    lastMessage: { id: "m27", senderId: "u5", content: "The new tokens are ready for review.", timestamp: h(20), status: "read" },
    unreadCount: 0,
  },
  {
    id: "c7",
    type: "channel",
    name: "engineering",
    description: "Technical discussions and code reviews",
    participants: ["u1", "u2", "u3"],
    lastMessage: { id: "m28", senderId: "u2", content: "PR #847 is ready for review.", timestamp: h(2), status: "delivered" },
    unreadCount: 3,
    pinned: true,
  },
  {
    id: "c8",
    type: "direct",
    name: "James Wright",
    participants: ["u1", "u7"],
    lastMessage: { id: "m29", senderId: "u7", content: "Let's discuss the roadmap tomorrow.", timestamp: h(4), status: "read" },
    unreadCount: 0,
  },
];

export const channels: Channel[] = [
  { id: "c3", name: "general", description: "Company-wide announcements", isPrivate: false, memberCount: 48, unreadCount: 0 },
  { id: "c7", name: "engineering", description: "Technical discussions", isPrivate: false, memberCount: 24, unreadCount: 3 },
  { id: "ch1", name: "design", description: "Design reviews and feedback", isPrivate: false, memberCount: 12, unreadCount: 0 },
  { id: "ch2", name: "product", description: "Product strategy and roadmap", isPrivate: false, memberCount: 18, unreadCount: 1 },
  { id: "ch3", name: "random", description: "Water cooler chat", isPrivate: false, memberCount: 42, unreadCount: 0 },
  { id: "ch4", name: "incidents", description: "Production incidents", isPrivate: true, memberCount: 8, unreadCount: 0 },
];

export const quickReactions = ["\u{1F44D}", "\u2764\uFE0F", "\u{1F389}", "\u{1F4AF}", "\u{1F525}", "\u{1F602}"];
