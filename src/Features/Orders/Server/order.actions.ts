"use server";

import axios, { AxiosRequestConfig } from "axios";

import { cookies } from "next/headers";
import { OrdersResponse } from "../Types/order,types";

export async function getUserOrders({ id }: { id: string }): Promise<OrdersResponse> {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication requeired");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
      method: `GET`,
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
