"use client";
import { motion } from "framer-motion";
import { UserCircle, ShieldCheck, RotateCcw, Truck } from "lucide-react";
import Link from "next/link";

export const OrderSummary = ({
  totalPrice,
  itemCount,
}: {
  totalPrice: number;
  itemCount: number;
}) => {
  const subtotal = totalPrice;
  const freeShippingThreshold = 500;
  const shippingCost =
    subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 100;

  // تكة الصياغة: Math.min عشان الشريط ميزيدش عن 100% و Math.max عشان ميبقاش سالب
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remaining = Math.max(freeShippingThreshold - subtotal, 0);

  return (
   <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-2xl overflow-hidden sticky top-4 max-w-md transition-colors duration-300"
    >
      {/* Header */}
      <div className="bg-[#0f172a] dark:bg-[#000000] p-5 text-white flex justify-between items-center">
        <span className="text-xl font-bold">Order Summary</span>
        <span className="bg-green-500 text-[10px] px-2 py-1 rounded-full uppercase tracking-wider animate-pulse">
          {itemCount} {itemCount === 1 ? "Item" : "Items"}
        </span>
      </div>

      <div className="p-6 space-y-6">
    
        {remaining > 0 && subtotal > 0 ? (
          <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100 dark:border-green-900/20 space-y-3">
            <div className="flex items-center gap-3 text-green-700 dark:text-green-500">
              <Truck size={20} className="animate-bounce" />
              <p className="text-sm font-bold">
                Add <span className="text-lg">{remaining} EGP</span> for free
                shipping
              </p>
            </div>
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
              />
            </div>
          </div>
        ) : subtotal >= freeShippingThreshold ? (
          <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-2xl border border-green-200 dark:border-green-900/30 flex items-center gap-3 text-green-700 dark:text-green-400">
            <ShieldCheck size={20} />
            <p className="text-sm font-bold">You've unlocked FREE shipping!</p>
          </div>
        ) : null}

        {/* الأسعار */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 font-medium">
            <span>Subtotal</span>
            <span className="font-bold text-gray-900 dark:text-gray-100">{subtotal} EGP</span>
          </div>

          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 font-medium">
            <span>Shipping</span>
            {shippingCost === 0 ? (
              <div className="flex gap-2">
                <span className="text-red-400 line-through text-sm">
                  100 EGP
                </span>
                <span className="text-green-600 dark:text-green-500 font-bold">FREE</span>
              </div>
            ) : (
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {shippingCost} EGP
              </span>
            )}
          </div>
        </div>

        <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent my-4" />

        {/* Total - */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-widest">
              Total Amount
            </span>
            <span className="text-3xl font-black text-gray-800 dark:text-white tracking-tight">
              {subtotal + shippingCost}{" "}
              <span className="text-sm font-normal">EGP</span>
            </span>
          </div>
          {shippingCost === 0 && subtotal > 0 && (
            <div className="text-right">
              <span className="block text-[10px] text-green-500 font-bold">
                You Saved 100 EGP
              </span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-4 pt-2">
          <button className="w-full h-14 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-200 dark:shadow-none active:scale-95">
            <UserCircle size={24} />
            <Link href={'/Checkout'}>Secure Checkout</Link>
          </button>
        </div>

        {/* Badges */}
        <div className="pt-6 grid grid-cols-2 gap-4 border-t border-gray-50 dark:border-gray-800">
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 dark:text-gray-500">
            <ShieldCheck size={14} className="text-green-500" /> SECURE PAYMENT
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 dark:text-gray-500">
            <RotateCcw size={14} className="text-green-500" /> EASY RETURNS
          </div>
        </div>
      </div>
    </motion.div>
  );
};
