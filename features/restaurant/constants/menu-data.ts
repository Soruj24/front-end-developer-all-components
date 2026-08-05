import type { MenuItem, Drink, Dessert, ChefSpecial, MealDeal } from "../types";

export const CUISINES = ["All", "Italian", "Japanese", "Mexican", "Indian", "American", "Thai"] as const;

export const DIETARY_OPTIONS = ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Halal"] as const;

export const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: "Margherita Pizza", price: 14.99, rating: 4.7, category: "Italian", dietary: ["Vegetarian"], image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&h=400&fit=crop", calories: 850, prepTime: "20 min", popular: true },
  { id: 2, name: "Spaghetti Carbonara", price: 16.99, rating: 4.8, category: "Italian", dietary: [], image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&h=400&fit=crop", calories: 720, prepTime: "25 min", popular: true },
  { id: 3, name: "Sushi Platter", price: 24.99, rating: 4.9, category: "Japanese", dietary: ["Gluten-Free"], image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop", calories: 550, prepTime: "30 min", popular: true },
  { id: 4, name: "Chicken Tikka Masala", price: 18.99, rating: 4.6, category: "Indian", dietary: ["Gluten-Free"], image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop", calories: 680, prepTime: "35 min", popular: false },
  { id: 5, name: "Beef Tacos", price: 12.99, rating: 4.5, category: "Mexican", dietary: [], image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=400&fit=crop", calories: 620, prepTime: "15 min", popular: true },
  { id: 6, name: "Classic Burger", price: 13.99, rating: 4.4, category: "American", dietary: [], image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop", calories: 780, prepTime: "18 min", popular: true },
  { id: 7, name: "Pad Thai", price: 15.99, rating: 4.5, category: "Thai", dietary: ["Vegan"], image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&h=400&fit=crop", calories: 590, prepTime: "22 min", popular: false },
  { id: 8, name: "Caesar Salad", price: 11.99, rating: 4.3, category: "American", dietary: ["Vegetarian", "Keto"], image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&h=400&fit=crop", calories: 350, prepTime: "10 min", popular: false },
  { id: 9, name: "Ramen Bowl", price: 17.99, rating: 4.7, category: "Japanese", dietary: [], image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop", calories: 650, prepTime: "28 min", popular: false },
  { id: 10, name: "Biryani", price: 19.99, rating: 4.8, category: "Indian", dietary: ["Gluten-Free"], image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&h=400&fit=crop", calories: 750, prepTime: "40 min", popular: false },
];

export const DRINKS: Drink[] = [
  { id: 101, name: "Matcha Latte", price: 5.99, type: "Hot", image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=400&fit=crop" },
  { id: 102, name: "Mango Smoothie", price: 6.99, type: "Cold", image: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=400&fit=crop" },
  { id: 103, name: "Espresso", price: 3.99, type: "Hot", image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=400&fit=crop" },
  { id: 104, name: "Fresh Lemonade", price: 4.49, type: "Cold", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop" },
  { id: 105, name: "Iced Coffee", price: 4.99, type: "Cold", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop" },
  { id: 106, name: "Green Tea", price: 3.49, type: "Hot", image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop" },
];

export const DESSERTS: Dessert[] = [
  { id: 201, name: "Tiramisu", price: 8.99, calories: 420, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop" },
  { id: 202, name: "Gelato Trio", price: 7.99, calories: 320, image: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=400&h=400&fit=crop" },
  { id: 203, name: "Chocolate Lava Cake", price: 9.99, calories: 550, image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop" },
  { id: 204, name: "Mochi Ice Cream", price: 6.49, calories: 180, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop" },
];

export const CHEF_SPECIALS: ChefSpecial[] = [
  { id: 301, name: "Lobster Linguine", price: 34.99, description: "Fresh Maine lobster with hand-rolled pasta in a saffron cream sauce", rating: 4.9, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&h=400&fit=crop" },
  { id: 302, name: "Wagyu Steak", price: 49.99, description: "A5 Japanese Wagyu with truffle mashed potatoes and asparagus", rating: 5.0, image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop" },
  { id: 303, name: "Wild Mushroom Risotto", price: 22.99, description: "Arborio rice with porcini, chanterelle, and shiitake mushrooms", rating: 4.8, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop" },
];

export const MEAL_DEALS: MealDeal[] = [
  { id: 401, name: "Lunch Combo", items: "Any main + drink + side", price: 18.99, originalPrice: 25.99, save: "27%", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop" },
  { id: 402, name: "Family Feast", items: "2 pizzas + 4 drinks + 2 desserts", price: 49.99, originalPrice: 69.99, save: "29%", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop" },
  { id: 403, name: "Date Night", items: "2 mains + 2 drinks + 1 dessert", price: 39.99, originalPrice: 54.99, save: "27%", image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop" },
  { id: 404, name: "Party Platter", items: "Serves 6-8 people with variety", price: 89.99, originalPrice: 124.99, save: "28%", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&h=400&fit=crop" },
];
