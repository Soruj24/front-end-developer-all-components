import type { Quiz, Resource, Review, ForumPost, LeaderboardEntry, Assignment, Badge, Instructor, Announcement } from "../types";

export const QUIZZES: Quiz[] = [
  { id: 1, title: "React Basics Quiz", questions: 10, timeLimit: "15 min", difficulty: "Easy", passRate: 78 },
  { id: 2, title: "TypeScript Generics Challenge", questions: 8, timeLimit: "20 min", difficulty: "Hard", passRate: 52 },
  { id: 3, title: "Data Structures Assessment", questions: 12, timeLimit: "25 min", difficulty: "Medium", passRate: 65 },
];

export const RESOURCES: Resource[] = [
  { id: 1, title: "React Cheatsheet PDF", type: "PDF", size: "2.4 MB" },
  { id: 2, title: "Project Starter Templates", type: "ZIP", size: "8.1 MB" },
  { id: 3, title: "Video Transcripts Bundle", type: "DOC", size: "1.3 MB" },
  { id: 4, title: "Practice Exercises Set 1", type: "Code", size: "456 KB" },
  { id: 5, title: "Reference Architecture Guide", type: "PDF", size: "3.7 MB" },
];

export const REVIEWS: Review[] = [
  { id: 1, user: "Alice M.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", rating: 5, text: "Best course I've ever taken. The instructor explains complex topics with ease.", date: "2 weeks ago" },
  { id: 2, user: "Bob K.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", rating: 4, text: "Great content but could use more hands-on projects. Overall excellent value.", date: "1 month ago" },
  { id: 3, user: "Carol D.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", rating: 5, text: "The curriculum is well structured and the assignments are challenging yet rewarding.", date: "3 weeks ago" },
  { id: 4, user: "David L.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", rating: 4, text: "Perfect for intermediate developers looking to level up their skills.", date: "2 months ago" },
];

export const FORUM_POSTS: ForumPost[] = [
  { id: 1, title: "Question about useState hook behavior", author: "NewDev22", replies: 5, time: "2h ago" },
  { id: 2, title: "Best practices for custom hooks?", author: "ReactPro", replies: 12, time: "5h ago" },
  { id: 3, title: "Help with useEffect cleanup", author: "Learner101", replies: 8, time: "1d ago" },
  { id: 4, title: "Performance optimization tips", author: "CodeMaster", replies: 15, time: "2d ago" },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: "TechNinja", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop", points: 4850, badge: "Gold" },
  { rank: 2, name: "CodeWizard", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", points: 4620, badge: "Silver" },
  { rank: 3, name: "ByteMaster", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop", points: 4390, badge: "Bronze" },
  { rank: 4, name: "DevGuru", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", points: 4150, badge: "None" },
  { rank: 5, name: "ScriptKid", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", points: 3980, badge: "None" },
];

export const ASSIGNMENTS: Assignment[] = [
  { id: 1, title: "Build a Todo App", due: "2026-08-10", submissions: 42, status: "Graded" },
  { id: 2, title: "Redux Store Implementation", due: "2026-08-17", submissions: 35, status: "Pending" },
  { id: 3, title: "REST API Integration", due: "2026-08-24", submissions: 28, status: "Open" },
];

export const BADGES: Badge[] = [
  { id: 1, name: "Quick Starter", icon: "🚀", earned: true },
  { id: 2, name: "Perfect Score", icon: "💯", earned: true },
  { id: 3, name: "Streak Master", icon: "🔥", earned: true },
  { id: 4, name: "Helping Hand", icon: "🤝", earned: false },
  { id: 5, name: "Course Complete", icon: "🎓", earned: true },
  { id: 6, name: "Challenge Champ", icon: "🏆", earned: false },
];

export const INSTRUCTOR: Instructor = {
  name: "Sarah Chen",
  title: "Senior Frontend Engineer",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  bio: "Passionate about teaching React, TypeScript, and modern web development. Author of 5 bestselling courses with over 12,000 students worldwide.",
  rating: 4.8,
  courses: 6,
  students: "12.4K",
  experience: "8+ years",
};

export const ANNOUNCEMENT: Announcement = {
  title: "New course materials added!",
  description: "Week 4 lecture slides and practice exercises are now available for download.",
  date: "Aug 5, 2026",
};
