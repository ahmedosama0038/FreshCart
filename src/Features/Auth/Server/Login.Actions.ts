"use server";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import LoginFormValues, { LoginScheme } from "../Schemas/Login.Scheme";

export default async function LoginActions(values: LoginFormValues) {
  const vaildatonResult = LoginScheme.safeParse(values);
  if (!vaildatonResult.success) {
    const erorrs: Record<string, string> = {};
    if (vaildatonResult.error) {
      vaildatonResult.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        const message = issue.message;

        if (!erorrs[key]) {
          erorrs[key] = message;
        }
      });
    }
    return {
      success: false,
      message: "vaildatoin erorrs",
      erorrs,
    };
  }
  const { reMepaer, ...requestBody } = values;
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      method: `POST`,
      data: requestBody,
    };
    const { data } = await axios.request(options);
    if (data.message === "success") {
      return {
        success: true,
        message: "Account created successfully ✅",
        data
      };
    }
    return {
      success: false,
      message: "login filed",
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      const erorrMessage = error.response?.data.message;
      if (erorrMessage === "Incorrect email or password") {
        return{
             success: false,
            message:'Incorrect email or password',
            erorrs:{
            password:'Incorrect email or password'
            }
        }
      }
    }
  }
}
