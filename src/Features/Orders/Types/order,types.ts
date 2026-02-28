// Shipping Address
export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

// User
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

// Category
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

// Subcategory
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Brand
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Product
export interface Product {
  _id: string;
  id: string;
  title: string;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
}

// Cart Item
export interface CartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

// Order
export interface Order {
  _id: string;
  id: number;
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  user: User;
  cartItems?: CartItem[]; // optional لأن الطلب التاني مفيهوش cartItems
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Orders Response (Array)
export type OrdersResponse = Order[];
