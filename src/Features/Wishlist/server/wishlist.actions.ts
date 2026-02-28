"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { ProductsResponse } from "../types/wishlist.type";

export async function AddproductToWishlist({
  productId,
}: {
  productId: string;
}) {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication requeird");
  }
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
      method: `POST`,
      headers: {
        token,
      },
      data: {
        productId,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function GetLoggedUserWishlist():Promise<ProductsResponse> {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication requeird");
  }
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
      method: `GET`,
      headers: {
        token,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function RemoveProductFromWishlist({productId}:{productId:string}){
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication requeird");
  }
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
      method: `DELETE`,
      headers: {
        token,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
