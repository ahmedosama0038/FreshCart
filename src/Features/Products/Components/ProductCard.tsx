"use client";

import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faPlus,
  faEye,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { Product } from "../Types/tyep.prodects";
import Link from "next/link";
import { getCartId, GetLoggedUser } from "@/Features/Cart/Server/Server.actios";
import { toast } from "react-toastify";
import { setCartInfo } from "@/Features/Cart/Store/Cart.slice";
import { useAppDaspatch } from "@/Store/Store";
import {
  AddproductToWishlist,
  GetLoggedUserWishlist,
} from "@/Features/Wishlist/server/wishlist.actions";
import { wishlistInfo } from "@/Features/Wishlist/store/wishlist.slice";

const ProductCard = ({ info }: { info: Product }) => {
  const dispatch = useAppDaspatch();
  const {
    id,
    title,
    imageCover,
    category,
    ratingsAverage,
    price,

    ratingsQuantity,
    priceAfterDiscount,
  } = info;
  const onsale = priceAfterDiscount ? priceAfterDiscount < price : false;
  const discount = Math.round(((price - priceAfterDiscount) / price) * 100);

  const handelCart = async () => {
    try {
      const response = await getCartId({ productId: id });
      if (response.status === "success") {
        toast.success(response.message);
        const resInfo = await GetLoggedUser();
        dispatch(setCartInfo(resInfo));
      }
    } catch (error) {
      toast.error("filed to add product to cart");
    }
  };

  const handelWishlist = async () => {
    try {
      const resWishlist = await AddproductToWishlist({ productId: id });
      if (resWishlist.status === "success") {
        toast.success(resWishlist.message);
        const res = await GetLoggedUserWishlist();
        console.log(res);
        dispatch(wishlistInfo(res));
      }
    } catch (error) {
      toast.error("filed to add product to Wishlist");
    }
  };
return (
  <div className="group relative w-full max-w-[280px] bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl dark:hover:shadow-green-500/10 hover:border-green-200 dark:hover:border-green-900/50">
    
    {/* Image Area */}
    <div className="relative aspect-[1/1] bg-[#fdfdfd] dark:bg-[#222] overflow-hidden p-4">
      {/* Discount Badge */}
      {onsale && (
        <span className="absolute top-4 left-4 z-10 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm">
          SAVE {discount}%
        </span>
      )}

      {/* Floating Actions */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 opacity-100 md:opacity-0 md:translate-x-12 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 ease-out">
        <button 
          onClick={handelWishlist} 
          className="w-9 h-9 bg-white/80 dark:bg-black/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-500/20 hover:text-red-500 transition-all shadow-sm cursor-pointer"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        
        <Link 
          href={`/Product/${info._id}`} 
          className="w-9 h-9 bg-white/80 dark:bg-black/50 backdrop-blur-sm border border-gray-100 dark:border-gray-700 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-500/20 hover:text-green-600 transition-all shadow-sm"
        >
          <FontAwesomeIcon icon={faEye} />
        </Link>
      </div>

      {/* Product Image */}
      <div className="relative w-full h-full">
        <Image
          src={imageCover}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-contain transition-transform duration-700 ease-in-out group-hover:scale-110 dark:opacity-90"
        />
      </div>
    </div>

    {/* Content Area */}
    <div className="p-5 space-y-2">
      <div className="flex items-center">
        <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-md">
          {category?.name}
        </span>
      </div>

      <h3 className="text-gray-800 dark:text-gray-100 font-bold text-sm line-clamp-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
        {title}
      </h3>

      {/* Ratings */}
      <div className="flex items-center gap-1.5 pt-0.5">
        <div className="flex text-yellow-400 text-[9px]">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon 
              key={i} 
              icon={faStar} 
              className={i < Math.floor(ratingsAverage) ? "fill-current" : "text-gray-200 dark:text-gray-700"} 
            />
          ))}
        </div>
        <span className="text-gray-400 dark:text-gray-500 text-[10px] font-medium">
          ({ratingsQuantity})
        </span>
      </div>

      {/* Price & Add Button */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          {onsale && (
            <span className="text-gray-400 dark:text-gray-500 line-through text-[10px]">
              {price} EGP
            </span>
          )}
          <span className="text-gray-900 dark:text-white font-black text-base">
            {priceAfterDiscount || price} <span className="text-[10px] font-normal text-gray-500">EGP</span>
          </span>
        </div>

        <button
          onClick={handelCart}
          className="h-10 w-10 bg-gray-900 dark:bg-green-600 text-white rounded-xl flex items-center justify-center hover:bg-[#22c55e] dark:hover:bg-green-500 transition-all duration-300 hover:rotate-90 shadow-lg dark:shadow-green-500/20 active:scale-90"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  </div>
);
};

export default ProductCard;
