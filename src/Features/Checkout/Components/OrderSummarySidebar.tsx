"use client";
import { useAppSelector } from "@/Store/Store";

import { Package, Truck, RotateCcw, Shield } from "lucide-react";

export const OrderSummarySidebar = () => {

const { products , totalCartPrice, numOfCartItems}= useAppSelector((state)=>state.cart)

  return (
    <>
     <div className="bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-xl sticky top-8 overflow-hidden transition-colors duration-300">
        <div className="bg-[#0f172a] dark:bg-[#000000] p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold">
            <Package size={20} className="text-green-500" />
            Order Summary
          </div>

          <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-green-400">
            {numOfCartItems} items
          </span>
        </div>

        <div className="p-6 max-h-[300px] overflow-y-auto space-y-4 custom-scrollbar dark:scrollbar-track-[#1a1a1a] dark:scrollbar-thumb-gray-700">
          {products.map((pro) => (
            <div key={pro._id} className="flex gap-4 items-center group">
              <div className="w-16 h-16 bg-gray-50 dark:bg-[#252525] rounded-xl border dark:border-gray-700 p-2 shrink-0 transition-colors">
                <img
                  src={pro.product.imageCover}
                  className="w-full h-full object-contain"
                  alt={pro.product.title}
                />
              </div>

              <div className="flex-1">
                <h4 className="text-xs font-bold text-gray-800 dark:text-gray-100 line-clamp-1">
                  {pro.product.title}
                </h4>
                <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold">
                {  pro.count * pro.price } EGP
                </p>
              </div>

              <p className="text-sm font-black text-gray-800 dark:text-white transition-colors">
                {pro.price * pro.count}
              </p>
            </div>
          ))}
        </div>

        <div className="p-8 border-t border-gray-50 dark:border-gray-800 space-y-4 bg-gray-50/50 dark:bg-[#222222]/30">
          <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-gray-400">
            <span>Subtotal</span>
            <span className="text-gray-900 dark:text-white font-black tracking-tighter">
             {totalCartPrice} EGP
            </span>
          </div>

          <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-gray-400">
            <span>Shipping</span>
            <span className="text-green-600 dark:text-green-500 font-black text-xs uppercase">
              Free
            </span>
          </div>

          <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />

          <div className="flex justify-between items-end">
            <span className="text-lg font-black text-gray-800 dark:text-white">Total</span>
            <p className="text-3xl font-black text-green-600 dark:text-green-500 leading-none">
            {totalCartPrice} <span className="text-sm uppercase">Egp</span>
            </p>
          </div>
 
 
     <button    form="checkout-form" type="submit" className="w-full bg-green-600 h-14 rounded-2xl text-white font-black text-lg shadow-lg shadow-green-100 dark:shadow-none hover:bg-green-700 transition-all flex items-center justify-center gap-2 mt-4 active:scale-95">
            Place Order
          </button>
 
          

          <div className="grid grid-cols-3 gap-2 pt-6">
            <div className="flex flex-col items-center text-center gap-1 opacity-50 dark:opacity-80">
              <Shield size={16} className="text-green-600 dark:text-green-500" />
              <span className="text-[8px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                Secure
              </span>
            </div>

            <div className="flex flex-col items-center text-center gap-1 opacity-50 dark:opacity-80">
              <Truck size={16} className="text-green-600 dark:text-green-500" />
              <span className="text-[8px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                Fast Delivery
              </span>
            </div>

            <div className="flex flex-col items-center text-center gap-1 opacity-50 dark:opacity-80">
              <RotateCcw size={16} className="text-green-600 dark:text-green-500" />
              <span className="text-[8px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                Easy Returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
