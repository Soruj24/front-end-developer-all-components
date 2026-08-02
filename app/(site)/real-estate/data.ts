const propertyTypes = ["All", "House", "Condo", "Townhouse", "Apartment", "Villa", "Land"];
const listingStatuses = ["All", "For Sale", "For Rent", "Pending", "Sold", "New"];

const properties = [
  { id: 1, title: "Modern Waterfront Villa", address: "42 Ocean Drive, Malibu, CA", price: 4500000, beds: 5, baths: 4, sqft: 4200, type: "Villa", status: "For Sale", featured: true, year: 2023, image: "" },
  { id: 2, title: "Downtown Luxury Condo", address: "1200 Pine St #320, Seattle, WA", price: 875000, beds: 2, baths: 2, sqft: 1250, type: "Condo", status: "For Sale", featured: false, year: 2020, image: "" },
  { id: 3, title: "Charming Family Home", address: "85 Maple Ave, Austin, TX", price: 625000, beds: 4, bedsLabel: "4 Beds", baths: 3, sqft: 2800, type: "House", status: "For Sale", featured: false, year: 2018, image: "" },
  { id: 4, title: "Beachfront Paradise", address: "7 Shoreline Blvd, Miami, FL", price: 3200000, beds: 6, baths: 5, sqft: 5200, type: "House", status: "For Sale", featured: true, year: 2022, image: "" },
  { id: 5, title: "Cozy Studio Apartment", address: "350 Market St #4B, NYC, NY", price: 450000, beds: 1, baths: 1, sqft: 600, type: "Apartment", status: "For Rent", featured: false, year: 2015, image: "" },
  { id: 6, title: "Colonial Revival Estate", address: "200 Elm Street, Greenwich, CT", price: 2850000, beds: 5, baths: 4, sqft: 3800, type: "House", status: "Pending", featured: false, year: 1920, image: "" },
  { id: 7, title: "Modern Townhouse", address: "88 Oak Lane, Denver, CO", price: 725000, beds: 3, baths: 3, sqft: 2100, type: "Townhouse", status: "For Sale", featured: false, year: 2021, image: "" },
  { id: 8, title: "Luxury Penthouse Suite", address: "1 Tower Place #500, Chicago, IL", price: 5200000, beds: 4, baths: 5, sqft: 4800, type: "Condo", status: "For Sale", featured: true, year: 2023, image: "" },
  { id: 9, title: "Ranch Style Home", address: "56 Country Rd, Nashville, TN", price: 549000, beds: 3, baths: 2, sqft: 1800, type: "House", status: "Sold", featured: false, year: 2005, image: "" },
  { id: 10, title: "Vacant Land Parcel", address: "1000 Hillside Dr, Sedona, AZ", price: 250000, beds: 0, baths: 0, sqft: 0, type: "Land", status: "For Sale", featured: false, year: 0, image: "" },
];

const savedHomes = [
  { id: 2, title: "Downtown Luxury Condo", price: 875000, savedDate: "Mar 28, 2026" },
  { id: 7, title: "Modern Townhouse", price: 725000, savedDate: "Mar 25, 2026" },
  { id: 5, title: "Cozy Studio Apartment", price: 450000, savedDate: "Mar 20, 2026" },
];

const recentlyViewed = [
  { id: 2, title: "Downtown Luxury Condo", price: 875000, viewedDate: "2 hours ago" },
  { id: 7, title: "Modern Townhouse", price: 725000, viewedDate: "Yesterday" },
  { id: 9, title: "Ranch Style Home", price: 549000, viewedDate: "2 days ago" },
  { id: 4, title: "Beachfront Paradise", price: 3200000, viewedDate: "3 days ago" },
];

const similarHomes = [
  { id: 11, title: "Mid-Century Modern Home", address: "45 Cedar Lane, Austin, TX", price: 689000, beds: 4, baths: 3, sqft: 2600, type: "House", status: "For Sale" },
  { id: 12, title: "Contemporary Family Home", address: "210 Birch Street, Austin, TX", price: 745000, beds: 5, baths: 3, sqft: 3100, type: "House", status: "For Sale" },
];

const newDevelopments = [
  { name: "Riverfront Towers", location: "Jersey City, NJ", units: 240, startingPrice: 650000, completion: "Q4 2026" },
  { name: "Parkview Estates", location: "Palo Alto, CA", units: 85, startingPrice: 1800000, completion: "Q2 2027" },
  { name: "Harbor Lofts", location: "Boston, MA", units: 120, startingPrice: 525000, completion: "Q1 2027" },
];

const foreclosureListings = [
  { title: "Fixer-Upper Colonial", address: "99 Bank St, Cleveland, OH", price: 145000, beds: 3, baths: 2, sqft: 1600, auctionDate: "Aug 15, 2026" },
  { title: "Foreclosed Ranch Home", address: "77 Valley Rd, Phoenix, AZ", price: 210000, beds: 4, baths: 2, sqft: 2000, auctionDate: "Aug 22, 2026" },
  { title: "Bank-Owned Condo", address: "55 Harbor Dr #6, Tampa, FL", price: 120000, beds: 2, baths: 1, sqft: 900, auctionDate: "Sep 5, 2026" },
];

const priceHistory = [
  { month: "Jan", event: "Listed", date: "Jan 5, 2026", price: 4200000 },
  { month: "Feb", event: "Price Reduced", date: "Feb 15, 2026", price: 4350000 },
  { month: "Mar", event: "Listed", date: "Mar 1, 2026", price: 4100000 },
  { month: "Apr", event: "Price Reduced", date: "Apr 10, 2026", price: 4500000 },
  { month: "May", event: "Listed", date: "May 5, 2026", price: 4600000 },
  { month: "Jun", event: "Sold", date: "Jun 20, 2026", price: 4400000 },
  { month: "Jul", event: "Listed", date: "Jul 3, 2026", price: 4700000 },
  { month: "Aug", event: "Pending", date: "Aug 1, 2026", price: 4550000 },
];

const marketTrends = [
  { year: "2024", medianPrice: 680000, salesVolume: 420, avgDays: 35 },
  { year: "2025", medianPrice: 710000, salesVolume: 510, avgDays: 30 },
  { year: "2026", medianPrice: 725000, salesVolume: 650, avgDays: 28 },
];

const schoolRatings = [
  { name: "Lincoln Elementary", rating: 8, distance: "0.5 mi", type: "Public", grades: "A" },
  { name: "Washington Middle School", rating: 7, distance: "1.2 mi", type: "Public", grades: "B+" },
  { name: "Riverside High School", rating: 9, distance: "2.1 mi", type: "Public", grades: "A" },
  { name: "St. Mary's Academy", rating: 10, distance: "0.8 mi", type: "Private", grades: "A+" },
];

const openHouses = [
  { title: "Modern Waterfront Villa", date: "Aug 15, 2026", time: "1:00 PM - 4:00 PM", address: "42 Ocean Drive, Malibu, CA" },
  { title: "Downtown Luxury Condo", date: "Aug 16, 2026", time: "11:00 AM - 2:00 PM", address: "1200 Pine St #320, Seattle, WA" },
  { title: "Charming Family Home", date: "Aug 17, 2026", time: "10:00 AM - 1:00 PM", address: "85 Maple Ave, Austin, TX" },
];

const agent = {
  name: "Sarah Mitchell",
  title: "Senior Agent",
  company: "Coastal Realty Group",
  phone: "(555) 123-4567",
  email: "sarah@realestate.com",
  specialties: ["Luxury Homes", "Waterfront", "Investment Properties"],
  rating: 4.9,
  reviews: 127,
  listings: 86,
  experience: "12 yrs",
};

const neighborhoodInfo = {
  name: "Malibu Beach Colony",
  description: "Exclusive beachfront community with premium amenities",
  walkScore: 32,
  transitScore: 15,
  bikeScore: 45,
  amenities: ["Beach Access", "Community Pool", "Tennis Courts", "Park"],
  schools: ["Lincoln Elementary", "Malibu High School"],
  medianHomePrice: 4500000,
  avgRent: 8500,
  population: "2,400",
};

export { propertyTypes, listingStatuses, properties, savedHomes, recentlyViewed, similarHomes, newDevelopments, foreclosureListings, priceHistory, marketTrends, schoolRatings, openHouses, agent, neighborhoodInfo };