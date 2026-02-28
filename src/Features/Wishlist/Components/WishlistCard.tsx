"ues client";
import React from "react";
import { Trash2, ShoppingCart, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Product } from "./../../Products/Types/tyep.prodects";
import { RemoveProductFromWishlist } from "../server/wishlist.actions";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useAppDaspatch } from "@/Store/Store";
import { clearWashlist } from "../store/wishlist.slice";

export const WishlistCard = ({ Info }: { Info: Product }) => {
  const dispatch = useAppDaspatch();
  const handelRemove = async () => {
    const result = await Swal.fire({
      title:
        '<span class="text-xl font-black text-slate-800">Remove Item?</span>',
      html: `
      <div class="mt-4">
        <div class="w-32 h-32 mx-auto mb-4 bg-gray-50 rounded-3xl p-3 border border-gray-100 shadow-sm">
          <img src="${Info.imageCover}" class="w-full h-full object-contain" />
        </div>
        <p class="text-gray-500 font-medium px-4">
          Are you sure you want to remove <br/>
          <span class="text-green-600 font-black">"${Info.title}"</span>?
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
        const res = await RemoveProductFromWishlist({ productId: Info.id });
        if (res.status === "success") {
          dispatch(clearWashlist({ id: Info.id }));
          toast.success(res.message);
        }
      } catch (error) {
        toast.error("Error Could not remove item");
      }
    }
  };
return (
    <div className="group bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-5 mb-5 hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-500 relative overflow-hidden">
      
      {/* تأثير خلفية بسيط عند الهوفر */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* 1. Product Info & Image */}
        <div className="flex items-center gap-6 flex-1 min-w-0 w-full">
          <div className="w-28 h-28 bg-gray-50 dark:bg-[#252525] rounded-[2rem] border border-gray-100 dark:border-gray-800 p-3 flex-shrink-0 group-hover:rotate-3 transition-transform duration-500 relative">
            <Image
              src={Info.imageCover}
              alt={Info.title}
              fill
              className="object-contain p-2"
            />
          </div>

          <div className="min-w-0 space-y-1">
            <h3 className="text-xl font-black text-[#0f172a] dark:text-white truncate leading-tight group-hover:text-green-600 transition-colors">
              {Info.title}
            </h3>
            <div className="flex items-center gap-2">
               <span className="px-2 py-0.5 bg-gray-100 dark:bg-[#252525] text-[10px] font-black text-gray-500 dark:text-gray-400 rounded-md uppercase tracking-widest">
                {Info.category.name}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Price, Status & Actions */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between md:justify-end gap-6 md:gap-10 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-50 dark:border-gray-800">
          
          {/* Price */}
          <div className="text-left md:text-center">
            <p className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase mb-1 tracking-widest">
              Price
            </p>
            <p className="text-2xl font-black text-green-600 dark:text-green-400 whitespace-nowrap tracking-tighter">
              {(Info.priceAfterDiscount || Info.price).toLocaleString()}{" "}
              <span className="text-xs font-bold text-gray-400">EGP</span>
            </p>
          </div>

          {/* Status Badge */}
          <div className="hidden sm:block text-center min-w-[120px]">
            <p className="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase mb-2 tracking-widest">
              Stock Status
            </p>
            <div className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border transition-colors ${
                Info.quantity > 0 
                ? "bg-green-50 dark:bg-green-500/5 border-green-100 dark:border-green-500/20" 
                : "bg-red-50 dark:bg-red-500/5 border-red-100 dark:border-red-500/20"
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${Info.quantity > 0 ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`text-[10px] font-black uppercase tracking-tighter ${
                 Info.quantity > 0 ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
              }`}>
                {Info.quantity > 0 ? `In Stock: ${Info.quantity}` : "Sold Out"}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button 
              disabled={Info.quantity === 0}
              className="group/btn flex items-center gap-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-200 dark:disabled:bg-[#252525] text-white px-8 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-green-500/20 dark:shadow-none whitespace-nowrap"
            >
              <ShoppingCart size={18} className="group-hover/btn:-translate-y-0.5 transition-transform" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handelRemove}
              className="w-14 h-14 flex items-center justify-center rounded-[1.5rem] border border-gray-100 dark:border-gray-800 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-100 transition-all active:scale-90 bg-white dark:bg-[#1a1a1a]"
              title="Remove from wishlist"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
