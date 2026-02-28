"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { ChangePasswordValues, SchemaAddressValues, SchemaSettingsValues } from "../Schema/profile.schema";
import { AddressResponse } from "../types/profile.types";
import { revalidatePath } from "next/cache";


export async function AddToaddress(values: SchemaAddressValues) {
  console.log("AddToaddress CALLED", values);

  const cooiestore = await cookies();
  const token = cooiestore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/addresses`,
      method: `POST`,
      headers: {
        token,
      },
      data: values,
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function GetLoggedUserAddresses(): Promise<AddressResponse> {
  const cooiestore = await cookies();
  const token = cooiestore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/addresses`,
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

export async function RemoveFromAddress({ addresId }: { addresId: string }) {
  const cooiestore = await cookies();
  const token = cooiestore.get("token")?.value || null;

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/addresses/${addresId}`,
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

export async function UpdateLoggeduserdata(valus: SchemaSettingsValues) {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication required");
  }
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
      method: `PUT`,
      headers: {
        token,
      },
      data: valus,
    };
    const { data } = await axios.request(options);
    revalidatePath('/', 'layout');
    return data;
  } catch (error) {
    throw error;
  }
}

export async function UpdateLoggeduserpassword(valus: ChangePasswordValues) {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value || null;
  if (!token) {
    throw new Error("Authentication required");
  }
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      method: `PUT`,
      headers: {
        token,
      },
      data: valus,
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    throw error;
  }
}
