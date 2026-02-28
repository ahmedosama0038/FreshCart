"use server";

import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export async function CreateReview(
  productId: string,
  reviewData: { rating: number; comment: string },
) {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value;

  if (!token) {
    return { success: false, message: "Please login first to add a review" };
  }

  try {
   const options: AxiosRequestConfig = {
      method: "POST",
      url: `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
      headers: {
        token,
        "Content-Type": "application/json",
      },
      data: {
       review: reviewData.comment, // غيرنا comment لـ review
        rating: reviewData.rating,  // اتأكد إنها rating مش ratingsن هنا
      },
    };

    const { data } = await axios.request(options);
    return { success: true, data };
  } catch (error: any) {
    console.error(
      "Error creating review:",
      error.response?.data || error.message,
    );
    return {
     success: false,
      message: error.response?.data?.message || "Failed to add review",
    };
  }
}

export async function GetReviewsForProduct(productId: string) {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",

      url: `https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`,
    };

    const { data } = await axios.request(options);
    return { success: true, data };
  } catch (error: any) {
    console.error(
      "Error creating review:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to add review",
    };
  }
}

export async function GetAllReviews() {
  try {
    const options: AxiosRequestConfig = {
      method: "GET",

      url: `https://ecommerce.routemisr.com/api/v1/reviews`,
    };

    const { data } = await axios.request(options);
    return { success: true, data };
  } catch (error: any) {
    console.error(
      "Error creating review:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to add review",
    };
  }
}

export async function DeleteReview(reviewId: string) {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value;
  if (!token) {
    return { success: false, message: "Please login first to delete a review" };
  }

  try {
    const options: AxiosRequestConfig = {
      method: "DELETE",
      url: `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
      headers: {
        token,
      },
    };
    const { data } = await axios.request(options);
    return { success: true, data };
  } catch (error: any) {
    console.error(
      "Error deleting review:",
      error.response?.data || error.message,
    );
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete review",
    };
  }
}
export async function UpdateReview(reviewId: string, data: { rating: number; review: string }) {
  const cookiestore = await cookies();
  const token = cookiestore.get("token")?.value;

  if (!token) return { success: false, message: "Unauthorized!" };

  try {
    const response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`,
      {
        review: data.review,
        rating: data.rating,
      },
      {
        headers: { token },
      }
    );
    return { success: true, data: response.data };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || "Failed to update review" 
    };
  }
}

// Features/Reviews/server/Reviews.actions.ts
export async function GetFullReviewData(productId: string) {
  try {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`);
    return { success: true, reviews: response.data.data, results: response.data.results };
  } catch (error) {
    return { success: false, reviews: [] };
  }
}