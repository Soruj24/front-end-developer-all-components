export interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorAvatar: string;
  students: number;
  rating: number;
  level: string;
  duration: string;
  lessons: number;
  price: string;
  image: string;
  category: string;
  description: string;
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
}

export interface Quiz {
  id: number;
  title: string;
  questions: number;
  timeLimit: string;
  difficulty: string;
  passRate: number;
}

export interface Resource {
  id: number;
  title: string;
  type: string;
  size: string;
}

export interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export interface ForumPost {
  id: number;
  title: string;
  author: string;
  replies: number;
  time: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  badge: string;
}

export interface Assignment {
  id: number;
  title: string;
  due: string;
  submissions: number;
  status: string;
}

export interface Badge {
  id: number;
  name: string;
  icon: string;
  earned: boolean;
}

export interface Instructor {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  rating: number;
  courses: number;
  students: string;
  experience: string;
}

export interface Announcement {
  title: string;
  description: string;
  date: string;
}
