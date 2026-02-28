"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { CartResponse } from "../Types/Type.cart";

export async function getCartId({ productId }: { productId: string }) {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value||null;
  if (!token) {
    throw new Error("Authentication requeired");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/cart`,
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

export async function GetLoggedUser() :Promise<CartResponse>{

    const cookieStoe = await cookies()
    const token = cookieStoe.get('token')?.value||null
    if (!token) {
         throw new Error("Authentication requeired");
        
    }
    try {
        const options: AxiosRequestConfig={
            url:`https://ecommerce.routemisr.com/api/v1/cart`,
            method:`GET`,
            headers:{
                token
            }
        }
        const {data}= await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
    
}

export async function removedCartProducts(productId: string):Promise<CartResponse> {
  const cookieStore= await cookies()
  const token = cookieStore.get('token')?.value||null
  if (!token) {
    throw new Error('Authentication requeired')
    
  }

  try {
    const options : AxiosRequestConfig={
      url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      method: `DELETE`,
      headers:{
        token
      }

    }
    
    const {data}= await axios.request(options)
    return data
  } catch (error) {
    throw error
  }
  
}

export async function updateCartQuantity(productId: string, count:number):Promise<CartResponse> {

  const cookieStore= await cookies()
  const token = cookieStore.get('token')?.value||null
  if (!token) {
    throw new Error('Authentication requeired')
    
  }
  
  try {
    
  const options :AxiosRequestConfig={
    url: `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    method:`PUT`,
    headers:{
 token
    },
    data:{
      count
    }
  }
  const { data}= await axios.request(options)
  return data
  } catch (error) {
    throw error
  }
   
}