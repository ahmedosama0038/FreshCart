

"use server";
import axios, { AxiosRequestConfig } from "axios";
import { ProductResponse, singleProductResponse } from "../Types/tyep.prodects";

export interface ProductParams {
  keyword?: string;
  category?: string;
  brand?: string;
  sort?: string;
  price?: string;        // الهوك بيبعت دي
  minPrice?: string;
  maxPrice?: string;
  limit?: number;
  page?: number;
}

export default async function getAllProduct(params?: any): Promise<ProductResponse> {
  try {
    // 1. بناء كائن جديد فاضي عشان نبعت فيه اللي محتاجينه بس
    const cleanParams: any = {};

    // 2. فلترة السيرش (لو موجود)
    if (params?.keyword) {
      cleanParams["keyword"] = params.keyword;
    }

    // 3. فلترة السعر (تحويله لرقم لضمان قبول الـ API)
    const maxPrice = params?.price || params?.maxPrice;
    if (maxPrice) {
      cleanParams["price[lte]"] = Number(maxPrice);
    }

    // 4. الكاتيجوري والبراند (لو مش "all")
    if (params?.category && params.category !== "all") {
      cleanParams["category"] = params.category;
    }
    if (params?.brand && params.brand !== "all") {
      cleanParams["brand"] = params.brand;
    }

   
   

    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products`,
      method: `GET`,
      params: cleanParams,
    };

    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
}


export async function getProductId({ id }: { id: string }): Promise<singleProductResponse> {
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: `GET`,
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}



export async function getCategories() {
  const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  return data.data; // بترجع مصفوفة فيها الـ id والـ name
}
// src\Features\Products\Server\ServerProduct.actions.ts

export async function getBrands() {
  try {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    return data.data;
  } catch (error) {
    console.error("Route API is down (Brands):", error);
    return []; // رجع مصفوفة فاضية عشان الموقع ميهنجش
  }
}