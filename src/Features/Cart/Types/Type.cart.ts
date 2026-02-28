// Cart Response
export interface CartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

// Cart Data
export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  totalCartPrice: number;
  __v: number;
}

// Product inside cart
export interface CartProduct {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

// Main Product
export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  ratingsAverage: number;
  category: Category;
  brand: Brand;
  subcategory: SubCategory[];
}

// Category
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Brand
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// SubCategory
export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
