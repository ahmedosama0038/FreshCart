"use server";

import axios, { AxiosRequestConfig } from "axios"
import { CategoriesResponse } from "../Types/Types.Category"

export  async function getallCategory():Promise<CategoriesResponse> {
    try {
       const options :AxiosRequestConfig ={
        url:`https://ecommerce.routemisr.com/api/v1/categories`,
        method: `GET`
       } 
       const { data} = await axios.request(options)
       return data

    } catch (error) {
        throw error
    }
}

export  async function Getspecificcategory(id:string) {
    try {
       const options :AxiosRequestConfig ={
        url:`https://ecommerce.routemisr.com/api/v1/categories/${id}`,
        method: `GET`
       } 
       const { data} = await axios.request(options)
       return data.data

    } catch (error) {
        throw error
    }
}

export  async function GetAllSubCategoriesOnCategory(id:string) {
    try {
       const options :AxiosRequestConfig ={
        url:`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`,
        method: `GET`
       } 
       const { data} = await axios.request(options)
       return data.data

    } catch (error) {
        throw error
    }
}

export  async function GetProductsByCategory(id:string) {
    try {
       const options :AxiosRequestConfig ={
        url:`https://ecommerce.routemisr.com/api/v1/products?category[in]=${id}`,
        method: `GET`
       } 
       const { data} = await axios.request(options)
       return data.data

    } catch (error) {
        throw error
    }
}