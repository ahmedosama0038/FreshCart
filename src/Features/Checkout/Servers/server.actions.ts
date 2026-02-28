"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { CheckoutSchemaValues } from "../Schema/CheckoutSchema";

export async function CreateCashOrder({
  cartId,
  shippingAddress,
}: {
  cartId: string;
  shippingAddress:CheckoutSchemaValues ;
}) {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication requeired");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
      method: `POST`,
      headers: {
        token,
      },
      data: {
        shippingAddress,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
export async function Checkoutsession({
  cartId,
  shippingAddress,
  url,
}: {
  cartId: string;
  shippingAddress:CheckoutSchemaValues;
  url: string;
}) {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication requeired");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
      method: `POST`,
      headers: {
        token,
      },
      data: {
        shippingAddress,
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
