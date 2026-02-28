import ProductScreen from '@/Features/Products/Screen/Product.Screen'
import React from 'react'
type ProductProps={
    params:Promise<{id: string}>
}

export const metadata = {
  title: 'Product Details', 
};
export default async function ProductPage({params}:ProductProps ) {
const { id}=  await params
  return (
    
     <>
     
 
      <ProductScreen ProductId={ id }/>
 
     </>
     
  );
}