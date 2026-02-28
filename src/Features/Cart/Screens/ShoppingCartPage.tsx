"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { CartItem } from "../Components/CartItem";
import { OrderSummary } from "../Components/OrderSummary";
import { EmptyCart } from "../Components/EmptyCart";
import { useAppSelector } from "@/Store/Store";

export default function ShoppingCartPage() {
  const products = useAppSelector((state) => state.cart.products ?? []);
  const totalCartPrice = useAppSelector(
    (state) => state.cart.totalCartPrice
  );
  const numOfCartItems = useAppSelector(
    (state) => state.cart.numOfCartItems
  );

  if (products.length === 0) {
    return <EmptyCart />;
  }

  return (
   <div className="min-h-screen bg-[#fcfcfc] dark:bg-[#0f0f0f] py-10 px-4 md:px-10 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-[2]">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-200 dark:shadow-none">
                <ShoppingBag size={24} />
              </div>
              <Link href="/" className="text-3xl font-black text-gray-800 dark:text-white transition-colors">
                Shopping Cart
              </Link>
            </div>

            {products.map((product) => (
              <CartItem key={product._id} info={product} />
            ))}
          </div>

          <div className="flex-1">
            <OrderSummary
              totalPrice={totalCartPrice}
              itemCount={numOfCartItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
