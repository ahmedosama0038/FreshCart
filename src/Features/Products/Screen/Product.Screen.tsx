import React from 'react'
import ProductInfo from '../Components/ProductDittels/ProductInfo'
import { getProductId } from '../Server/ServerProduct.actions'
import ProductDetailsTabs from '../Components/ProductDittels/ProductDetailsTabs'
import ProductSidebar from '../Components/ProductSidebar'


export default async function ProductScreen({ProductId }:{ProductId:string}) {
    const response = await getProductId({id :ProductId})
  return (
    <>
    <ProductSidebar/>
      <ProductInfo product={response.data} />
      
      <ProductDetailsTabs product={response.data} />
      
    </>
  )
}
