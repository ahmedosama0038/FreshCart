// Brand
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Category
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// Subcategory
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// Product
export interface Product {
  _id: string;
  id: string;
priceAfterDiscount:number
  title: string;
  slug: string;
  description: string;

  price: number;
  quantity: number;
  sold: number;

  imageCover: string;
  images: string[];

  category: Category;
  subcategory: Subcategory[];
  brand: Brand;

  ratingsAverage: number;
  ratingsQuantity: number;

  createdAt: string;
  updatedAt: string;

  __v: number;
}

// API Response
export interface ProductsResponse {
  status: string;
  count: number;
  data: Product[];
}
