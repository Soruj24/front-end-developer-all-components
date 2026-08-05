import type { Restaurant, Review, RecentOrder, OperatingHours } from "../types";

export const RESTAURANTS: Restaurant[] = [
  { id: 501, name: "Bella Napoli", cuisine: "Italian", rating: 4.8, deliveryTime: "25-35 min", distance: "0.8 mi", priceLevel: "$$", image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop", coverImage: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=400&fit=crop", featured: true },
  { id: 502, name: "Sakura Sushi", cuisine: "Japanese", rating: 4.9, deliveryTime: "30-45 min", distance: "1.2 mi", priceLevel: "$$$", image: "https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400&h=300&fit=crop", coverImage: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&h=400&fit=crop", featured: true },
  { id: 503, name: "El Fuego", cuisine: "Mexican", rating: 4.6, deliveryTime: "20-30 min", distance: "0.5 mi", priceLevel: "$", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop", coverImage: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=800&h=400&fit=crop", featured: false },
  { id: 504, name: "Taj Mahal Palace", cuisine: "Indian", rating: 4.7, deliveryTime: "30-40 min", distance: "1.5 mi", priceLevel: "$$", image: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=400&h=300&fit=crop", coverImage: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=400&fit=crop", featured: false },
  { id: 505, name: "Golden Dragon", cuisine: "Thai", rating: 4.5, deliveryTime: "25-35 min", distance: "0.9 mi", priceLevel: "$$", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=300&fit=crop", coverImage: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=400&fit=crop", featured: false },
  { id: 506, name: "Liberty Grill", cuisine: "American", rating: 4.4, deliveryTime: "15-25 min", distance: "0.3 mi", priceLevel: "$", image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&h=300&fit=crop", coverImage: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=400&fit=crop", featured: false },
];

export const REVIEWS: Review[] = [
  { id: 601, user: "Emily R.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", rating: 5, text: "The carbonara was absolutely divine! Perfectly al dente pasta with a silky sauce.", dish: "Spaghetti Carbonara", date: "2 days ago" },
  { id: 602, user: "James K.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", rating: 4, text: "Great sushi platter, very fresh fish. Would have liked more variety though.", dish: "Sushi Platter", date: "1 week ago" },
  { id: 603, user: "Sofia M.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", rating: 5, text: "Best margherita pizza I've had outside of Naples. The crust is perfection.", dish: "Margherita Pizza", date: "3 days ago" },
  { id: 604, user: "Carlos D.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop", rating: 4, text: "Tacos were flavorful and came with amazing salsa. Quick delivery too!", dish: "Beef Tacos", date: "5 days ago" },
];

export const RECENT_ORDERS: RecentOrder[] = [
  { id: 701, items: "Margherita Pizza, Caesar Salad", total: 26.98, status: "Delivered", date: "Yesterday", eta: "" },
  { id: 702, items: "Sushi Platter, Mango Smoothie", total: 31.98, status: "In Transit", date: "Today", eta: "12:45 PM" },
  { id: 703, items: "Classic Burger, Fries, Lemonade", total: 22.47, status: "Preparing", date: "Today", eta: "1:15 PM" },
];

export const OPERATING_HOURS: OperatingHours[] = [
  { day: "Monday - Thursday", hours: "11:00 AM - 10:00 PM" },
  { day: "Friday - Saturday", hours: "11:00 AM - 12:00 AM" },
  { day: "Sunday", hours: "12:00 PM - 9:00 PM" },
];

export const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300&h=300&fit=crop",
  "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&h=300&fit=crop",
];

export const CUISINE_ICONS: Record<string, string> = {
  Italian: "🍝",
  Japanese: "🍣",
  Mexican: "🌮",
  Indian: "🍛",
  American: "🍔",
  Thai: "🍜",
};
