"use client";
import {
  faStar,
  faPlus,
  faMinus,
  faCartShopping,
  faBolt,
  faHeart,
  faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { Product } from "../../Types/tyep.prodects";
import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/image-gallery.css";
import { getCartId, GetLoggedUser } from "@/Features/Cart/Server/Server.actios";
import { toast } from "react-toastify";
import { useAppDaspatch } from "@/Store/Store";
import { setCartInfo } from "@/Features/Cart/Store/Cart.slice";
import { RelatedProducts } from "./RelatedProducts";

export default function ProductInfo({ product }: { product: Product }) {
  
  const [selectedQty, setSelectedQty] = useState(1);
 
const dispatch =useAppDaspatch()
  const addToCart = async () => {
  try {
    const res = await getCartId({ productId: id });

    if (res.status === "success") {
       const resInfo = await GetLoggedUser();
      dispatch(setCartInfo(resInfo))
      toast.success(res.message);
    }
  } catch (error) {
    toast.error("Failed to add product to cart");
  }
};

  const {
    id,
    imageCover,
    images,
    quantity, 
    ratingsAverage,
    ratingsQuantity,
    priceAfterDiscount,
    price,
    title,
    description,
    category,
    createdAt,
    brand,
  } = product;

  
  const currentPrice = priceAfterDiscount || price;
  const onsale = !!priceAfterDiscount && priceAfterDiscount < price;
  const discount = onsale
    ? Math.round(((price - priceAfterDiscount) / price) * 100)
    : 0;
return (
    <section className="py-12 bg-gray-50/50 dark:bg-[#0a0a0a] min-h-screen transition-colors duration-500">
      <div className="container mx-auto px-4 shadow-sm bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] p-6 md:p-12 border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* 1. قسم الصور (Product Gallery) */}
          <div className="lg:w-1/3 aspect-square rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-[#222]">
            <ImageGallery
              items={images.map((imge) => ({
                original: imge,
                thumbnail: imge,
              }))}
              showNav={false}
              showPlayButton={false}
              showFullscreenButton={true}
              renderItem={(item) => (
                <div className="relative aspect-square group">
                   <img src={item.original} alt={title} className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                </div>
              )}
            />
          </div>

          {/* 2. قسم المعلومات (Product Details) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-2/3"
          >
            {/* التصنيف والبراند */}
            <div className="flex items-center gap-2 mb-4">
              <Link
                href={"#"}
                className="px-4 py-1.5 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 rounded-full text-xs font-bold hover:scale-105 transition-all"
              >
                {category.name}
              </Link>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <span className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                {brand.name}
              </span>
            </div>

            {/* العنوان والتقييم */}
            <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-4 leading-tight">
              {title}
            </h1>

            <div className="flex items-center gap-4 mb-8">
              <div className="flex text-sm text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    className={i < Math.floor(ratingsAverage) ? "fill-current" : "text-gray-200 dark:text-gray-800"}
                  />
                ))}
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-medium border-l dark:border-gray-800 pl-4">
                {ratingsAverage} <span className="opacity-60">({ratingsQuantity} reviews)</span>
              </span>
              <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-[10px] font-black uppercase tracking-wider">
                In Stock
              </span>
            </div>

            {/* السعر */}
            <div className="bg-gray-50 dark:bg-[#252525] p-6 rounded-3xl mb-8 flex items-center flex-wrap gap-4 border border-gray-100 dark:border-gray-800">
              <span className="text-4xl font-black text-gray-900 dark:text-white">
                {currentPrice.toLocaleString()} <span className="text-lg font-normal">EGP</span>
              </span>
              {onsale && (
                <div className="flex items-center gap-3">
                  <span className="text-xl text-gray-400 line-through">
                    {price.toLocaleString()} EGP
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-xl text-xs font-black animate-bounce">
                    -{discount}% OFF
                  </span>
                </div>
              )}
            </div>

            {/* الوصف */}
            <div className="mb-8">
              <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
                Product Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl text-base">
                {description}
              </p>
            </div>

            {/* الكمية والسعر الكلي */}
            <div className="flex flex-wrap items-center gap-8 mb-10 bg-white dark:bg-[#1a1a1a] p-2 rounded-3xl">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Quantity</label>
                <div className="flex items-center border-2 border-gray-100 dark:border-gray-800 rounded-2xl p-1 bg-white dark:bg-[#111]">
                  <button
                    onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                    className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all active:scale-90"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <input
                    type="number"
                    value={selectedQty}
                    readOnly
                    className="w-12 text-center font-black text-gray-800 dark:text-white bg-transparent outline-none"
                  />
                  <button
                    onClick={() => setSelectedQty(Math.min(quantity, selectedQty + 1))}
                    className="w-11 h-11 flex items-center justify-center text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all active:scale-90"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>

              <div className="h-14 w-[1px] bg-gray-100 dark:bg-gray-800 hidden md:block"></div>
              
              <div className="space-y-1">
                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Total Price</span>
                <p className="text-3xl font-black text-green-600 dark:text-green-400">
                  {(currentPrice * selectedQty).toLocaleString()} <span className="text-sm">EGP</span>
                </p>
              </div>
            </div>

            {/* أزرار الأكشن */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-8">
              <button onClick={addToCart} className="sm:col-span-2 bg-green-600 dark:bg-green-500 text-white h-16 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-green-700 dark:hover:bg-green-400 transition-all shadow-xl shadow-green-200 dark:shadow-none active:scale-95 group">
                <FontAwesomeIcon icon={faCartShopping} className="group-hover:rotate-12 transition-transform" />
                ADD TO CART
              </button>
              <button className="bg-slate-900 dark:bg-white dark:text-black h-16 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-black transition-all active:scale-95">
                <FontAwesomeIcon icon={faBolt} />
                BUY NOW
              </button>
              <div className="flex gap-2">
                 <button className="flex-1 h-16 border-2 border-gray-100 dark:border-gray-800 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 dark:hover:border-red-900 transition-all active:scale-90">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <button className="flex-1 h-16 border-2 border-gray-100 dark:border-gray-800 rounded-2xl flex items-center justify-center text-gray-400 hover:text-blue-500 hover:border-blue-100 dark:hover:border-blue-900 transition-all active:scale-90">
                  <FontAwesomeIcon icon={faShareNodes} />
                </button>
              </div>
            </div>

            {/* مميزات إضافية */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t dark:border-gray-800">
              {[
                { label: "Free Delivery", icon: "✓", bg: "bg-blue-50 dark:bg-blue-500/10", color: "text-blue-600 dark:text-blue-400" },
                { label: "30 Days Return", icon: "↺", bg: "bg-orange-50 dark:bg-orange-500/10", color: "text-orange-600 dark:text-orange-400" },
                { label: "Secure Payment", icon: "🛡️", bg: "bg-purple-50 dark:bg-purple-500/10", color: "text-purple-600 dark:text-purple-400" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm font-bold text-gray-500 dark:text-gray-400">
                  <div className={`w-10 h-10 ${feature.bg} ${feature.color} rounded-full flex items-center justify-center shrink-0`}>
                    {feature.icon}
                  </div>
                  {feature.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      <RelatedProducts categoryId={category._id} currentProductId={id} />
    </section>
  );
}
