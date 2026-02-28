"use server";

import SignupFormValues, { SignupSchema } from "../Schemas/Signup.Scheme";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
export async function SignupAction(values: SignupFormValues) {
  const vaildatonResult = SignupSchema.safeParse(values);

  if (!vaildatonResult.success) {
    const erorrs: Record<string, string> = {};
    if (vaildatonResult.error) {
      vaildatonResult.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        const message = issue.message;

        if (!erorrs[field]) {
          erorrs[field] = message;
        }
      });
    }

    return {
      success: false,
      message: "validatons Erorrs",
      erorrs,
    };
  }

  const { Terms, ...requestBody } = values;
  try {
    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      method: "POST",
      data: requestBody,
    };
    const { data } = await axios.request(options);
    if (data?.message === "success") {
      return {
        success: true,
        message: "account creatad successfly",
        data,
      };
    }
    return {
      success: false,
      message: data.message || "something went worng",
    };
    
  } catch (error) {
    if (error instanceof AxiosError) {
      const erorrMessage = error.response?.data.message
      if(erorrMessage==="Account Already Exists"){
        return{
          success: false,
          message:"Account Exists",
          erorrs:{
            email : "an account with this email Already Exists "
          }
        }

      }
      
    }
  }
}
