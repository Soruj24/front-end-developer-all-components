import type { Course, Lesson } from "../types";

export const CATEGORIES = ["All", "Frontend", "Backend", "Data Science", "Design", "DevOps", "Mobile"] as const;

export const COURSES: Course[] = [
  { id: 1, title: "React Mastery: From Zero to Production", instructor: "Sarah Chen", instructorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", students: 2847, rating: 4.8, level: "Intermediate", duration: "12 weeks", lessons: 48, price: "$79.99", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop", category: "Frontend", description: "Master React from fundamentals to advanced patterns. Build real-world projects with hooks, context, and Redux." },
  { id: 2, title: "Python for Data Science", instructor: "James Wilson", instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", students: 3912, rating: 4.7, level: "Beginner", duration: "10 weeks", lessons: 36, price: "$64.99", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop", category: "Data Science", description: "Learn Python, pandas, NumPy, and matplotlib. Analyze real datasets and build predictive models." },
  { id: 3, title: "Advanced TypeScript Patterns", instructor: "Priya Patel", instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", students: 1856, rating: 4.9, level: "Advanced", duration: "8 weeks", lessons: 32, price: "$89.99", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop", category: "Frontend", description: "Deep dive into TypeScript generics, conditional types, and advanced patterns for enterprise applications." },
  { id: 4, title: "UI/UX Design Fundamentals", instructor: "Alex Rivera", instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", students: 4523, rating: 4.6, level: "Beginner", duration: "6 weeks", lessons: 24, price: "$54.99", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop", category: "Design", description: "Learn design principles, Figma, user research, and create stunning interfaces from scratch." },
  { id: 5, title: "Machine Learning Engineering", instructor: "Michael Brown", instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", students: 2134, rating: 4.8, level: "Advanced", duration: "14 weeks", lessons: 56, price: "$99.99", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop", category: "Data Science", description: "Build ML pipelines, deploy models, and master TensorFlow and PyTorch for production systems." },
  { id: 6, title: "DevOps & Cloud Infrastructure", instructor: "Emily Davis", instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", students: 1678, rating: 4.5, level: "Intermediate", duration: "10 weeks", lessons: 40, price: "$74.99", image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&h=400&fit=crop", category: "DevOps", description: "Master Docker, Kubernetes, CI/CD pipelines, and cloud platforms like AWS and GCP." },
];

export const LESSONS: Lesson[] = [
  { id: 1, title: "Introduction to React Components", duration: "14:32", completed: true },
  { id: 2, title: "State Management Fundamentals", duration: "22:15", completed: true },
  { id: 3, title: "Understanding the Virtual DOM", duration: "18:45", completed: true },
  { id: 4, title: "Hooks in Depth", duration: "31:20", completed: false },
  { id: 5, title: "Advanced Patterns & Composition", duration: "27:08", completed: false },
  { id: 6, title: "Testing React Applications", duration: "35:00", completed: false },
];
