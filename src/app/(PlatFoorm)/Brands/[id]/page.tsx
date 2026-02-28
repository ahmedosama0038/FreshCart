// src/app/brands/[id]/page.tsx
// شيلنا "use client" خالص عشان نريح دماغنا

import { getBrandProducts, Getspecificbrands } from "@/Features/Brands/Server/Brands.actions";
import ProductCard from "@/Features/Products/Components/ProductCard";
import { Product } from "@/Features/Products/Types/tyep.prodects";
import { Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BrandDetailsPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) return <div className="p-20 text-center text-red-500">Invalid Brand ID</div>;

  try {
   
    const brandResponse = await Getspecificbrands(id);
    const productsResponse = await getBrandProducts(id);

    const brand = brandResponse.data;
    const products = productsResponse.data;
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* الهيدر الأخضر */}
        <div className="bg-[#22c55e] pt-12 pb-20 px-6">
          <div className="container mx-auto">
            <nav className="text-white/80 text-sm mb-4">  {brand.name} 
              <ul className=' flex  G'>
                <li className="text-white/80 text-sm mb-4">
                    <Link  href={'/'}>  Home </Link>
                </li>
                <li className="text-white/80 text-sm mb-4">
                    /
                </li>
                <li className="text-white/80 text-sm mb-4">
                    <Link  href={'/Brands'}>  Brands </Link>
                </li>
              </ul>

            </nav>
            <div className="flex items-center gap-6">
              <div className="bg-white p-4 rounded-2xl w-24 h-24 flex items-center justify-center shadow-lg">
                <Image src={brand.image} alt={brand.name} width={96} height={96} className="object-contain" />
              </div>
              <div className="text-white">
                <h1 className="text-4xl font-black">{brand.name}</h1>
                <p className="mt-2 font-medium opacity-90">Shop {brand.name} products</p>
              </div>
            </div>
          </div>
        </div>

        <main className="container mx-auto px-6 -mt-8">
          {/* فلتر الماركة */}
          <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4 mb-8">
            <span className="text-gray-400 font-bold text-sm">Active Filters:</span>
            <div className="bg-purple-50 text-purple-600 px-4 py-1.5 rounded-full flex items-center gap-2 text-sm font-bold border border-purple-100">
              <Tag size={14} /> {brand.name} <span>×</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-gray-500 font-bold text-lg">
              Showing <span className="text-gray-800">{products.length}</span> products
            </h2>
          </div>

          {/* عرض المنتجات بالكارد بتاعك */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product:Product) => (
                <Link href={`/product/${product._id}`} key={product._id}>
                   <ProductCard info={product} />
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 text-gray-400">
                No products found for this brand.
              </div>
            )}
          </div>
        </main>
      </div>
    );
  } catch (error) {
    return <div className="p-20 text-center font-bold text-gray-500">Error loading data.</div>;
  }
}