export const productsSource = `const products = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 79.99, stock: 45, status: "In Stock", rating: 4.5 },
  { id: 2, name: "Cotton T-Shirt", category: "Clothing", price: 24.99, stock: 120, status: "In Stock", rating: 4.0 },
  { id: 3, name: "Indoor Plant Pot", category: "Home", price: 34.99, stock: 0, status: "Out of Stock", rating: 4.8 },
  { id: 4, name: "Running Shoes", category: "Sports", price: 89.99, stock: 28, status: "In Stock", rating: 4.3 },
  { id: 5, name: "Bluetooth Speaker", category: "Electronics", price: 49.99, stock: 0, status: "Discontinued", rating: 4.2 },
  { id: 6, name: "Denim Jacket", category: "Clothing", price: 119.99, stock: 15, status: "In Stock", rating: 4.6 },
  { id: 7, name: "Cookbook Collection", category: "Books", price: 44.99, stock: 67, status: "In Stock", rating: 4.7 },
  { id: 8, name: "Yoga Mat", category: "Sports", price: 29.99, stock: 200, status: "In Stock", rating: 4.1 },
  { id: 9, name: "Desk Lamp", category: "Home", price: 54.99, stock: 0, status: "Out of Stock", rating: 4.4 },
  { id: 10, name: "Mechanical Keyboard", category: "Electronics", price: 149.99, stock: 33, status: "In Stock", rating: 4.9 },
  { id: 11, name: "Water Bottle", category: "Sports", price: 19.99, stock: 500, status: "In Stock", rating: 4.0 },
  { id: 12, name: "Notebook Set", category: "Books", price: 12.99, stock: 0, status: "Out of Stock", rating: 3.8 },
];`;

export const usersSource = `const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active", lastLogin: "2026-07-28" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active", lastLogin: "2026-07-25" },
  { id: 3, name: "Carol Lee", email: "carol@example.com", role: "Viewer", status: "Inactive", lastLogin: "2026-06-10" },
  { id: 4, name: "David Brown", email: "david@example.com", role: "Editor", status: "Active", lastLogin: "2026-07-29" },
  { id: 5, name: "Eve Davis", email: "eve@example.com", role: "Viewer", status: "Active", lastLogin: "2026-07-27" },
  { id: 6, name: "Frank Wilson", email: "frank@example.com", role: "Admin", status: "Inactive", lastLogin: "2026-05-15" },
  { id: 7, name: "Grace Kim", email: "grace@example.com", role: "Editor", status: "Active", lastLogin: "2026-07-30" },
  { id: 8, name: "Henry Miller", email: "henry@example.com", role: "Viewer", status: "Active", lastLogin: "2026-07-26" },
];`;

export const statusColorsSource = `const statusColors: Record<string, string> = {
  "In Stock": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Out of Stock": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "Discontinued": "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  "Active": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  "Inactive": "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
};`;

export const starSvg = `<svg key={s} className={\`h-3.5 w-3.5 \${s <= Math.floor(p.rating) ? "text-warning" : "text-zinc-200 dark:text-zinc-700"}\`} fill="currentColor" viewBox="0 0 20 20">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>`;

export const starSvgSm = `<svg key={s} className={\`h-3 w-3 \${s <= Math.floor(p.rating) ? "text-warning" : "text-zinc-200 dark:text-zinc-700"}\`} fill="currentColor" viewBox="0 0 20 20">
  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
</svg>`;
