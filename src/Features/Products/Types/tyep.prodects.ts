export interface ProductResponse {
  results: number;
  metadata: Metadata;
  data: Product[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number; // اختيارية عشان لو في آخر صفحة
}

export interface Product {
  sold: number | string; // لاحظت ان الـ sold طالع عندك برقم علمي ضخم e+305
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
priceAfterDiscount:number
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface singleProductResponse{
    data: Product;
}

