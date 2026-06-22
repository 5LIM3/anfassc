// ============================================
// ANFASSC — Global TypeScript Types
// ============================================

// --- User & Auth ---
export type UserRole = "member" | "admin" | "super_admin";

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
}

// --- Membership ---
export type MembershipTier = "standard" | "premium" | "vip";
export type MembershipStatus = "active" | "expired" | "pending" | "suspended";

export interface Membership {
  id: string;
  user_id: string;
  tier: MembershipTier;
  status: MembershipStatus;
  membership_number: string;
  start_date: string;
  expiry_date: string;
  created_at: string;
  user?: User;
}

export const MEMBERSHIP_TIERS: Record<
  MembershipTier,
  { name: string; price: number; benefits: string[] }
> = {
  standard: {
    name: "Standard",
    price: 10000,
    benefits: [
      "Official membership card",
      "ANFASSC jersey discount (10%)",
      "Match day updates",
      "Newsletter",
    ],
  },
  premium: {
    name: "Premium",
    price: 25000,
    benefits: [
      "All Standard benefits",
      "ANFASSC jersey discount (20%)",
      "Priority travel package access",
      "VIP match day experience",
      "Members-only events",
    ],
  },
  vip: {
    name: "VIP",
    price: 50000,
    benefits: [
      "All Premium benefits",
      "Free ANFASSC welcome pack",
      "Personal travel coordination",
      "Meet & greet with officials",
      "Exclusive VIP badge",
      "Direct WhatsApp group access",
    ],
  },
};

// --- Shop / Products ---
export type ProductCategory =
  | "jersey"
  | "polo"
  | "cap"
  | "scarf"
  | "bundle"
  | "other";

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: ProductCategory;
  images: string[];
  stock: number;
  is_featured: boolean;
  sizes?: string[];
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

// --- Orders ---
export type OrderStatus =
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  user_id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paystack_reference: string;
  shipping_address: ShippingAddress;
  created_at: string;
  user?: User;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  size?: string;
}

export interface ShippingAddress {
  full_name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
}

// --- News (from Sanity CMS) ---
export interface NewsPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body: unknown; // Portable Text
  mainImage: SanityImage;
  category: NewsCategory;
  publishedAt: string;
  author: string;
}

export type NewsCategory =
  | "super-eagles"
  | "afcon"
  | "membership"
  | "merchandise"
  | "governance"
  | "travel";

export interface SanityImage {
  asset: { _ref: string; _type: string };
  alt?: string;
}

// --- Gallery ---
export interface GalleryAlbum {
  id: string;
  title: string;
  description?: string;
  cover_image: string;
  images: GalleryImage[];
  event_date: string;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt?: string;
  caption?: string;
}

// --- Travel Packages ---
export type TravelStatus = "open" | "closed" | "sold_out";

export interface TravelPackage {
  id: string;
  title: string;
  description: string;
  tournament: string;
  destination: string;
  departure_date: string;
  return_date: string;
  price: number;
  includes: string[];
  spots_total: number;
  spots_remaining: number;
  status: TravelStatus;
  image: string;
}

// --- Contact ---
export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// --- API Responses ---
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// --- Navigation ---
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
