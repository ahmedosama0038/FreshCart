"use client";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { CartProduct } from "../Types/Type.cart";
import Swal from "sweetalert2";
import {
  removedCartProducts,
  updateCartQuantity,
} from "../Server/Server.actios";
import { toast } from "react-toastify";
import { useAppDaspatch } from "@/Store/Store";
import { removedProduct, setCartInfo } from "../Store/Cart.slice";

export const CartItem = ({ info }: { info: CartProduct }) => {
  const dispatch = useAppDaspatch();
  const { count, price, product, _id } = info;
  const { title, category, imageCover, brand, quantity, id } = product;

  async function handelRemoved() {
    const result = await Swal.fire({
      title:
        '<span class="text-xl font-black text-slate-800">Remove Item?</span>',
      html: `
      <div class="mt-4">
        <div class="w-32 h-32 mx-auto mb-4 bg-gray-50 rounded-3xl p-3 border border-gray-100 shadow-sm">
          <img src="${imageCover}" class="w-full h-full object-contain" />
        </div>
        <p class="text-gray-500 font-medium px-4">
          Are you sure you want to remove <br/>
          <span class="text-green-600 font-black">"${title}"</span>?
        </p>
      </div>
    `,
      showCancelButton: true,
      confirmButtonColor: "#10b981", // الأخضر بتاعك
      cancelButtonColor: "#f3f4f6",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: '<span style="color: #9ca3af">No, Keep it</span>',
      reverseButtons: true,
      customClass: {
        popup: "rounded-[2.5rem] p-8 shadow-2xl border-none",
        confirmButton:
          "rounded-2xl px-8 py-4 font-bold text-lg hover:scale-105 transition-all",
        cancelButton:
          "rounded-2xl px-8 py-4 font-bold text-lg hover:bg-gray-200 transition-all",
      },
    });
    if (result.isConfirmed) {
      try {
        dispatch(removedProduct({ id }));
        const response = removedCartProducts(id);
        toast.success("Removed Item!");
      } catch (error) {
        toast.error("Error Could not remove item");
      }
    }
  }
  const handelUpdate = async (newCount: number) => {
    if (newCount < 1) return;
    const response = await updateCartQuantity(id, newCount);
    dispatch(setCartInfo(response));
  };
  return (
   <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="flex flex-col md:flex-row items-center gap-6 p-6 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-[2rem] shadow-sm mb-4 transition-colors duration-300"
>
  {/* صورة المنتج */}
  <div className="relative w-32 h-32 rounded-2xl bg-gray-50 dark:bg-[#252525] overflow-hidden border dark:border-gray-700">
    <Image
      src={imageCover}
      alt={title}
      fill
      className="object-contain p-2"
    />
  </div>

  {/* بيانات المنتج */}
  <div className="flex-1 space-y-2 text-center md:text-left">
    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 leading-tight">
      {title}
    </h3>
    <span className="inline-block px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-500 rounded-full text-[10px] font-bold">
      {category.name}
    </span>
    <p className="text-xl font-black text-green-600 dark:text-green-500 mt-2">{price} EGP</p>
  </div>

  {/* التحكم في الكمية */}
  <div className="flex items-center gap-4 bg-gray-50 dark:bg-[#252525] p-2 rounded-2xl border dark:border-gray-700">
    <button
      onClick={() => {
        handelUpdate(count - 1);
      }}
      disabled={count < 1}
      className="w-8 h-8 flex items-center justify-center bg-white dark:bg-[#1a1a1a] dark:text-gray-300 rounded-xl shadow-sm hover:text-green-600 dark:hover:text-green-500 transition disabled:opacity-50"
    >
      <Minus size={16} />
    </button>
    
    <span className="font-bold w-6 text-center dark:text-gray-100">{count}</span>
    <button
      onClick={() => {
        handelUpdate(count + 1);
      }}
      disabled={count === quantity}
      className="w-8 h-8 flex items-center justify-center bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition"
    >
      <Plus size={16} />
    </button>
  </div>

  {/* السعر الكلي والحذف */}
  <div className="flex flex-col items-end gap-2">
    <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-tighter">
      Total
    </span>
    <p className="text-lg font-black text-gray-800 dark:text-gray-100">{price * count} EGP</p>
    <button
      onClick={handelRemoved}
      className="w-10 h-10 flex items-center justify-center bg-red-50 dark:bg-red-950/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
    >
      <Trash2 size={18} />
    </button>
  </div>
</motion.div>
  );
};
