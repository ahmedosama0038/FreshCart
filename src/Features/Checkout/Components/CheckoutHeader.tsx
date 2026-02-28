import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const CheckoutHeader = () => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 transition-colors duration-300">
    <div>
      <h1 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-2">
        <span className="w-2 h-8 bg-green-600 dark:bg-green-500 rounded-full block shadow-[0_0_15px_rgba(34,197,94,0.3)]"></span>
        Complete Your Order
      </h1>
      <p className="text-gray-400 dark:text-gray-500 font-medium ml-4 mt-1">Review your items and complete your purchase</p>
    </div>
    <Link href={'/Cart'} className="flex items-center gap-2 text-green-600 dark:text-green-500 font-bold hover:gap-3 transition-all">
      <ArrowLeft size={18} /> Back to Cart
    </Link>
  </div>
);