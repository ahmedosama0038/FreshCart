import ProductCard from "@/Features/Products/Components/ProductCard";
import getAllProduct from "@/Features/Products/Server/ServerProduct.actions";
import React from "react";

export default async function FeaturesProduct() {

    const response = await getAllProduct()

  return (
    <>
      <section className="py-10 bg-white dark:bg-[#0f0f0f] transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 my-10">
            <div className="h-10 w-2 bg-gradient-to-b from-green-500 to-green-700 dark:from-green-400 dark:to-green-600 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              {" "}
            </div>
            <h2 className="font-black text-4xl text-gray-800 dark:text-white tracking-tight">
              Featured <span className="text-green-600 dark:text-green-500"> Products</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
            {response.data.map((prodct)=> <ProductCard key={prodct.id} info={prodct}/> )
            
            }   
          </div>
        </div>
      </section>
    </>
  );
}
