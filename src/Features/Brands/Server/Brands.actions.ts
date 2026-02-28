import axios from "axios";

// أكشن الماركة
export async function  GetAllBrands() {
  const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  return data; 
}
export async function Getspecificbrands(id: string) {
  const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
  return data; 
}

// أكشن المنتجات
export async function getBrandProducts(brandId: string) {
  const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`);
  return data; 
}
