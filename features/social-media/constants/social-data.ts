import type {
  User,
  Story,
  FeedPost,
  Comment,
  Notification,
  Message,
  TrendingTopic,
  Poll,
  LiveStream,
  Reel,
  ExploreCategory,
  SavedItem,
  Group,
  SocialEvent,
  SponsoredAd,
  PostInsight,
  AudienceAge,
  ScheduledPost,
  CollaborationRequest,
} from "../types";

const users = {
  alex: { id: 1, name: "Alex Rivera", handle: "@alexriv", avatar: "AR", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face", bio: "Design engineer at Vercel. Building the future of the web.", followers: "24.8K", following: "1,203", posts: "1,847", verified: true, online: true },
  sarah: { id: 2, name: "Sarah Chen", handle: "@sarahchen", avatar: "SC", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face", bio: "Staff engineer @Google. Open source enthusiast.", followers: "18.2K", following: "892", posts: "2,103", verified: true, online: true },
  james: { id: 3, name: "James Wilson", handle: "@jwilson", avatar: "JW", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face", bio: "Indie hacker. Building SaaS products.", followers: "5.6K", following: "445", posts: "892", verified: false, online: false },
  priya: { id: 4, name: "Priya Patel", handle: "@priyap", avatar: "PP", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face", bio: "Product designer. Previously @Figma.", followers: "31.4K", following: "567", posts: "3,201", verified: true, online: true },
  michael: { id: 5, name: "Michael Brown", handle: "@mbrown", avatar: "MB", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face", bio: "DevRel @Stripe. Conference speaker.", followers: "12.1K", following: "734", posts: "1,456", verified: true, online: true },
  emily: { id: 6, name: "Emily Davis", handle: "@emilyd", avatar: "ED", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", bio: "Frontend architect. React & Next.js.", followers: "8.9K", following: "312", posts: "978", verified: false, online: false },
  olivia: { id: 7, name: "Olivia Taylor", handle: "@oliviat", avatar: "OT", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face", bio: "ML engineer. Building AI tools.", followers: "15.7K", following: "423", posts: "1,832", verified: true, online: false },
  daniel: { id: 8, name: "Daniel Kim", handle: "@dankim", avatar: "DK", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face", bio: "CTO @StartupXYZ. Ex-Meta.", followers: "22.3K", following: "678", posts: "2,567", verified: true, online: true },
  lisa: { id: 9, name: "Lisa Wang", handle: "@lisaw", avatar: "LW", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face", bio: "VP Engineering @Notion. Building tools for thought.", followers: "45.2K", following: "312", posts: "4,102", verified: true, online: false },
  ryan: { id: 10, name: "Ryan O'Brien", handle: "@ryanob", avatar: "RO", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face", bio: "Open source maintainer. Rust enthusiast.", followers: "3.4K", following: "567", posts: "654", verified: false, online: true },
  maya: { id: 11, name: "Maya Gupta", handle: "@mayag", avatar: "MG", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face", bio: "Design systems lead @Airbnb.", followers: "28.6K", following: "445", posts: "3,890", verified: true, online: false },
  techdaily: { id: 12, name: "TechDaily", handle: "@techdaily", avatar: "TD", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop&crop=face", bio: "Breaking tech news and analysis.", followers: "156K", following: "89", posts: "12,456", verified: true, online: true },
  john: { id: 13, name: "John Doe", handle: "@johndoe", avatar: "JD", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop&crop=face", bio: "Full-stack developer passionate about UI/UX and open source.", followers: "12.4K", following: "891", posts: "342", verified: true, online: true },
};

export const currentUser = users.john;

export const stories: Story[] = [
  { id: 1, user: users.john, isYou: true },
  { id: 2, user: users.alex },
  { id: 3, user: users.sarah },
  { id: 4, user: users.james },
  { id: 5, user: users.priya },
  { id: 6, user: users.emily },
  { id: 7, user: users.michael },
  { id: 8, user: users.olivia },
];

export const feedPosts: FeedPost[] = [
  { id: 1, user: users.alex, time: "2h ago", content: "Just shipped the new design system! So excited about the component library we've been building. It's going to be a game changer for our team's productivity. #DesignSystems #UI", likes: 342, comments: 28, shares: 15, liked: true },
  { id: 2, user: users.sarah, time: "4h ago", content: "Beautiful morning hike in the mountains. Sometimes you need to disconnect to reconnect with yourself.", likes: 891, comments: 42, shares: 33, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop" },
  { id: 3, user: users.james, time: "6h ago", content: "Can anyone recommend a good book on distributed systems? Looking for something practical, not too theoretical.", likes: 56, comments: 19, shares: 3 },
  { id: 4, user: users.techdaily, time: "8h ago", content: "BREAKING: New JavaScript framework just dropped. It promises zero-config setup, built-in state management, and edge-native deployment. The race never stops! #JavaScript #WebDev", likes: 1247, comments: 203, shares: 589 },
  { id: 5, user: users.priya, time: "12h ago", content: "Just wrapped up a 30-day design challenge. Here's what I learned about consistency, creativity, and the power of daily practice.", likes: 567, comments: 34, shares: 21, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop" },
];

export const comments: Comment[] = [
  { id: 1, user: users.priya, text: "This is so true! I've been saying this for years.", time: "1h ago", likes: 24 },
  { id: 2, user: users.michael, text: "Great perspective. Have you considered the counter-argument though?", time: "45m ago", likes: 12 },
  { id: 3, user: users.emily, text: "Love this! Sharing with my team right now.", time: "20m ago", likes: 8 },
];

export const notifications: Notification[] = [
  { id: 1, user: users.priya, action: "liked your post", time: "12m ago", unread: true },
  { id: 2, user: users.michael, action: "commented: 'Great work!'", time: "34m ago", unread: true },
  { id: 3, user: users.emily, action: "started following you", time: "1h ago", unread: true },
  { id: 4, user: users.olivia, action: "mentioned you in a comment", time: "3h ago", unread: false },
  { id: 5, user: users.daniel, action: "shared your post", time: "5h ago", unread: false },
];

export const messages: Message[] = [
  { id: 1, user: users.priya, preview: "Are you coming to the meetup tonight?", time: "2m ago" },
  { id: 2, user: users.michael, preview: "Thanks for the feedback on the PR!", time: "15m ago" },
  { id: 3, user: users.emily, preview: "Let me check the calendar and get back to you", time: "1h ago" },
  { id: 4, user: users.olivia, preview: "The design looks amazing!", time: "3h ago" },
  { id: 5, user: users.daniel, preview: "Can we schedule a call for tomorrow?", time: "5h ago" },
];

export const trendingTopics: TrendingTopic[] = [
  { tag: "#ReactJs", posts: "142K" },
  { tag: "#WebDev", posts: "89K" },
  { tag: "#AI", posts: "234K" },
  { tag: "#DesignSystems", posts: "45K" },
  { tag: "#OpenSource", posts: "67K" },
  { tag: "#NextJS", posts: "103K" },
  { tag: "#TypeScript", posts: "78K" },
  { tag: "#CyberSecurity", posts: "56K" },
];

export const polls: Poll[] = [
  { id: 1, question: "What's your preferred CSS approach?", options: ["Tailwind CSS", "Styled Components", "CSS Modules", "Vanilla CSS"], votes: [245, 180, 95, 42], total: 562 },
  { id: 2, question: "Remote work vs Office: which do you prefer?", options: ["Remote forever", "Hybrid", "Full office", "No preference"], votes: [412, 298, 87, 53], total: 850 },
];

export const liveStreams: LiveStream[] = [
  { id: 1, user: users.sarah, title: "Live Coding: Building a Real-Time Chat App", viewers: "2.3K", category: "Technology" },
  { id: 2, user: users.alex, title: "Design Review: Critiquing UI submissions", viewers: "891", category: "Design" },
];

export const reels: Reel[] = [
  { id: 1, user: users.alex, likes: "45K", description: "VS Code tips you need to know", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=500&fit=crop" },
  { id: 2, user: users.priya, likes: "32K", description: "CSS art in under 60 seconds", image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=300&h=500&fit=crop" },
  { id: 3, user: users.michael, likes: "89K", description: "Debugging in production be like", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=500&fit=crop" },
  { id: 4, user: users.sarah, likes: "23K", description: "Building a navbar with Framer Motion", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=500&fit=crop" },
  { id: 5, user: users.lisa, likes: "56K", description: "Micro-interaction tutorial", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=500&fit=crop" },
  { id: 6, user: users.daniel, likes: "41K", description: "Responsive grid in 30 seconds", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=500&fit=crop" },
];

export const exploreCategories: ExploreCategory[] = [
  { label: "Design", posts: "1.2M", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" },
  { label: "Photography", posts: "892K", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop" },
  { label: "Travel", posts: "2.1M", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
  { label: "Food", posts: "3.4M", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop" },
  { label: "Music", posts: "1.8M", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop" },
  { label: "Gaming", posts: "2.7M", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop" },
  { label: "Fitness", posts: "954K", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop" },
  { label: "Art", posts: "1.5M", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop" },
];

export const savedItems: SavedItem[] = [
  { title: "CSS Grid Guide", type: "Article", date: "Saved 2 days ago", icon: "article" },
  { title: "React Hooks Cheatsheet", type: "Resource", date: "Saved 5 days ago", icon: "resource" },
  { title: "Design System Tokens", type: "Reference", date: "Saved 1 week ago", icon: "reference" },
  { title: "API Design Best Practices", type: "Article", date: "Saved 2 weeks ago", icon: "article" },
  { title: "Accessibility Checklist", type: "Resource", date: "Saved 3 weeks ago", icon: "resource" },
  { title: "Animation Principles", type: "Reference", date: "Saved 1 month ago", icon: "reference" },
];

export const groups: Group[] = [
  { name: "React Developers", members: "45K", category: "Technology", privacy: "Public", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop" },
  { name: "UI/UX Design Community", members: "32K", category: "Design", privacy: "Public", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop" },
  { name: "Remote Workers Hub", members: "28K", category: "Lifestyle", privacy: "Private", image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=100&h=100&fit=crop" },
  { name: "Open Source Contributors", members: "18K", category: "Technology", privacy: "Public", image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=100&h=100&fit=crop" },
];

export const socialEvents: SocialEvent[] = [
  { title: "React Conf 2026", date: "Aug 15, 2026", attendees: "2.4K", type: "Virtual", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&h=150&fit=crop" },
  { title: "Design Systems Meetup", date: "Aug 22, 2026", attendees: "456", type: "In-Person", image: "https://images.unsplash.com/photo-1558403194-611308249627?w=200&h=150&fit=crop" },
  { title: "Hackathon: AI for Good", date: "Sep 5, 2026", attendees: "1.1K", type: "Hybrid", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&h=150&fit=crop" },
  { title: "TypeScript Deep Dive", date: "Sep 12, 2026", attendees: "789", type: "Virtual", image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=200&h=150&fit=crop" },
];

export const sponsoredAds: SponsoredAd[] = [
  { brand: "CloudTech Pro", tagline: "Scale your infrastructure seamlessly. Get started free.", cta: "Learn More", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop" },
  { brand: "DesignCraft Studio", tagline: "Premium UI kits and templates for modern web apps.", cta: "Shop Now", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop" },
];

export const postInsights: PostInsight[] = [
  { label: "Impressions", value: "12,847", change: "+12.4%", positive: true },
  { label: "Reach", value: "8,342", change: "+8.2%", positive: true },
  { label: "Profile Visits", value: "1,234", change: "+5.1%", positive: true },
  { label: "New Followers", value: "+89", change: "+23.4%", positive: true },
];

export const audienceAges: AudienceAge[] = [
  { range: "18-24", percentage: 34, color: "bg-blue-500" },
  { range: "25-34", percentage: 41, color: "bg-purple-500" },
  { range: "35-44", percentage: 18, color: "bg-green-500" },
  { range: "45+", percentage: 7, color: "bg-amber-500" },
];

export const scheduledPosts: ScheduledPost[] = [
  { day: "Today", time: "3:00 PM", content: "Product launch teaser" },
  { day: "Tomorrow", time: "10:00 AM", content: "Team spotlight: Design" },
  { day: "Wed", time: "12:00 PM", content: "Weekly tech tip video" },
  { day: "Thu", time: "4:30 PM", content: "Case study highlight" },
  { day: "Fri", time: "11:00 AM", content: "Weekend poll" },
];

export const collaborationRequests: CollaborationRequest[] = [
  { user: users.daniel, message: "Would love to collaborate on a design system tutorial series.", time: "2h ago" },
  { user: users.lisa, message: "Let's co-author a blog post about engineering culture.", time: "1d ago" },
];
