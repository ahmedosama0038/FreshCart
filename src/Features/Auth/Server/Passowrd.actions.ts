"use server"; // تصحيح الكلمة
import axios, { AxiosRequestConfig } from "axios";
export async function ForgotPasswordAction(email: string) {
    console.log("ACTION RECEIVED:", email)
  try {
    
    const cleanEmail = email.trim().toLowerCase();
    
    console.log("Sending request for:", cleanEmail);

    const options: AxiosRequestConfig = {
      url: `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      method: `POST`,
     
      headers: {
        'Content-Type': 'application/json'
      },
      data: { email: cleanEmail },
    };

    const response = await axios.request(options);

    return {
      success: true,
      message: response.data.message 
    };

  } catch (error: any) {
    console.error("API Error Status:", error.response?.status);
    console.error("API Error Data:", error.response?.data);

    return {
      success: false,
  
      message: error.response?.data?.message || "Something went wrong"
    };
  }
}

export async function VerifyResetCode(resetCode: string) {
  try {
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      { 
        resetCode: resetCode.toString() // تأكيد إنه نص
      }
    );
    return { success: true, message: "Code Verified" };
  } catch (error: any) {
    console.log("Error from Server:", error.response?.data); // ده هيقولك الغلط فين بالظبط
    return {
      success: false,
      message: error.response?.data?.message || "Invalid Code"
    };
  }
}

interface rsetProps{
    
    email:string,
    newPassword: string
}
export async function ResetPasswordAction(data: rsetProps) {
  try {
    const response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      {
        email: data.email,
        newPassword: data.newPassword
      }
    );
    return { success: true, token: response.data.token };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to reset password"
    };
  }
}