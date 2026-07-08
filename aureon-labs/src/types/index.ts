export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline?: string;
  description: string;
  story: string;
  price: number;
  currency: string;
  stripeProductId: string;
  stripePriceId: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  badge?: "NOUVEAU" | "POPULAIRE";
  inStock?: boolean;
  colors?: string[];
  specs: {
    width: string;
    material: string;
    clasp: string;
    type: string;
    brand: string;
    weight: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  helpfulCount: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "shipped" | "delivered";
  stripePaymentIntentId: string;
  shippingAddress: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  stripePriceId: string;
  productName: string;
  quantity: number;
  priceAmount: number;
}

export interface Profile {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  createdAt: string;
}
