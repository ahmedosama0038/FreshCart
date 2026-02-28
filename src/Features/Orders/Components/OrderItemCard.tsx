"use client";
import React, { useState } from "react";
import { Calendar, Package, ChevronRight, Clock, MapPin } from "lucide-react";
import { Order } from "../Types/order,types";
import {
  faCircleCheck,
  faClock,
  faTruck,
  faCreditCard,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const OrderItemCard = ({ orderInfo }: { orderInfo: Order }) => {
  const [isExpended, setisExpended] = useState(false);

  function getOrderBadges() {
    const status = orderInfo.isDelivered
      ? {
          label: "Delivered",
          icon: faCircleCheck,
          bg: "bg-green-100 dark:bg-green-500/10",
          text: "text-green-600 dark:text-green-400",
        }
      : orderInfo.isPaid
        ? {
            label: "On the way",
            icon: faTruck,
            bg: "bg-blue-100 dark:bg-blue-500/10",
            text: "text-blue-600 dark:text-blue-400",
          }
        : {
            label: "Processing",
            icon: faClock,
            bg: "bg-amber-100 dark:bg-amber-500/10",
            text: "text-amber-600 dark:text-amber-400",
          };

    const payment =
      orderInfo.paymentMethodType === "card"
        ? {
            label: "Card",
            icon: faCreditCard,
            bg: "bg-indigo-100 dark:bg-indigo-500/10",
            text: "text-indigo-600 dark:text-indigo-400",
          }
        : {
            label: "Cash",
            icon: faMoneyBillWave,
            bg: "bg-emerald-100 dark:bg-emerald-500/10",
            text: "text-emerald-600 dark:text-emerald-400",
          };

    return { status, payment };
  }

  const { status, payment } = getOrderBadges();

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl dark:hover:shadow-green-500/5 transition-all duration-300 overflow-hidden group mb-6">
      {/* 1. Header */}
      <div className="p-4 border-b border-gray-50 dark:border-gray-800 flex flex-wrap justify-between items-center gap-4 bg-gray-50/30 dark:bg-black/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white dark:bg-[#252525] rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-700">
            <Package className="text-green-600 dark:text-green-400" size={24} />
          </div>
          <div>
            <h3 className="text-sm font-black text-gray-700 dark:text-gray-200 tracking-tight">
              Order #{orderInfo._id}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <Calendar size={12} className="text-gray-400 dark:text-gray-500" />
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">
                {new Date(orderInfo.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Status + Payment Badges */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${status.bg}`}>
            <FontAwesomeIcon icon={status.icon} className={status.text} />
            <span className={`text-[11px] font-black uppercase ${status.text}`}>
              {status.label}
            </span>
          </div>

          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${payment.bg}`}>
            <FontAwesomeIcon icon={payment.icon} className={payment.text} />
            <span className={`text-[11px] font-black uppercase ${payment.text}`}>
              {payment.label}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Body */}
      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <Clock size={12} /> Items Preview
          </p>

          <div className="flex -space-x-3 overflow-hidden">
            {orderInfo.cartItems?.map((item) => (
              <div
                key={item._id}
                className="relative inline-block w-14 h-14 rounded-2xl border-2 border-white dark:border-gray-900 bg-gray-50 dark:bg-[#252525] shadow-sm overflow-hidden"
              >
                <img
                  src={item.product.imageCover}
                  alt="product"
                  className="w-full h-full object-contain p-2 dark:opacity-80"
                />
              </div>
            ))}

            {orderInfo.cartItems && orderInfo.cartItems.length > 1 && (
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl border-2 border-white dark:border-gray-900 bg-green-600 text-white text-xs font-black shadow-sm">
                +{orderInfo.cartItems.length - 1}
              </div>
            )}
          </div>

          <p className="text-xs font-bold text-gray-600 dark:text-gray-400 italic">
            {orderInfo.cartItems?.length} items in this order
          </p>
        </div>

        {/* Shipping */}
        <div className="bg-gray-50/50 dark:bg-black/20 rounded-[1.5rem] p-4 border border-gray-100/50 dark:border-gray-800">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white dark:bg-[#252525] rounded-lg shadow-sm border dark:border-gray-700">
              <MapPin size={16} className="text-green-600 dark:text-green-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase mb-1">
                Shipping To
              </p>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">
                {orderInfo.shippingAddress?.city},{" "}
                {orderInfo.shippingAddress?.details}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-500 font-medium mt-1">
                Expected Delivery: 2-3 Days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Footer */}
      <div className="p-6 bg-[#0f172a] dark:bg-[#0a0a0a] border-t dark:border-gray-800 flex justify-between items-center text-white">
        <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Total Amount
          </p>
          <p className="text-2xl font-black text-green-400 dark:text-green-500 mt-1">
            {orderInfo.totalOrderPrice}{" "}
            <span className="text-xs text-white/60">EGP</span>
          </p>
        </div>
        <button
          onClick={() => setisExpended(!isExpended)}
          className={`group/btn flex items-center gap-2 bg-white/10 dark:bg-white/5 hover:bg-white/20 text-white px-5 py-3 rounded-xl font-bold text-xs transition-all active:scale-95 border border-white/10 ${
            isExpended ? "bg-green-500 dark:bg-green-600" : ""
          }`}
        >
          {isExpended ? "Hide" : "View Details"}
          <ChevronRight
            size={16}
            className={`transition-transform duration-300 ${isExpended ? "rotate-90" : "group-hover/btn:translate-x-1"}`}
          />
        </button>
      </div>

      {isExpended && (
        <div className="p-4 md:p-8 space-y-8 bg-white/50 dark:bg-black/40 animate-in slide-in-from-top-4 duration-500">
          {/* Order Items Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-gray-800">
              <Package size={18} className="text-green-600 dark:text-green-400" />
              <h4 className="text-xs font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest">
                Order Items
              </h4>
            </div>

            <div className="grid gap-3">
              {orderInfo.cartItems?.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#222] hover:shadow-md dark:hover:border-green-900 transition-all gap-4 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-50 dark:bg-black/20 rounded-2xl p-2 flex-shrink-0 group-hover:scale-105 transition-transform">
                      <img
                        src={item.product.imageCover}
                        alt=""
                        className="w-full h-full object-contain dark:opacity-90"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-black text-gray-800 dark:text-gray-200 line-clamp-1">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-bold mt-1">
                        {item.count} ×{" "}
                        <span className="text-green-600 dark:text-green-400">{item.price} EGP</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-50 dark:border-gray-800">
                    <p className="text-[10px] font-black text-gray-400 uppercase sm:hidden">Total</p>
                    <p className="text-sm font-black text-gray-900 dark:text-white">
                      {item.count * item.price} EGP
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-green-600 dark:text-green-400" />
                <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  Delivery Address
                </h4>
              </div>
              <div className="p-5 rounded-[2rem] bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800 h-full transition-colors">
                <p className="text-sm font-black text-gray-800 dark:text-gray-200 mb-2">
                  {orderInfo.user.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium mb-3">
                  {orderInfo.shippingAddress.city}, {orderInfo.shippingAddress.details}
                </p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-[#252525] rounded-full border border-gray-200 dark:border-gray-700 text-[10px] font-bold text-gray-500 dark:text-gray-400">
                  <span>📞 {orderInfo.shippingAddress.phone}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-amber-500 dark:text-amber-400" />
                <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  Order Summary
                </h4>
              </div>
              <div className="p-6 rounded-[2rem] bg-[#fffbeb] dark:bg-[#201b10] border border-[#fef3c7] dark:border-[#332b12] space-y-4 transition-colors">
                <div className="flex justify-between items-center text-xs font-bold text-amber-900/70 dark:text-amber-200/60">
                  <span>Subtotal</span>
                  <span>{orderInfo.totalOrderPrice} EGP</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-amber-900/70 dark:text-amber-200/60">
                  <span>Shipping</span>
                  <span className="text-green-600 dark:text-green-400 uppercase tracking-tighter">Free</span>
                </div>
                <div className="pt-4 border-t border-amber-200/50 dark:border-amber-900/30 flex justify-between items-center">
                  <span className="text-sm font-black text-amber-950 dark:text-amber-100">Total</span>
                  <span className="text-xl font-black text-amber-950 dark:text-amber-100">
                    {orderInfo.totalOrderPrice} <span className="text-xs">EGP</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Progress */}
      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800">
        <div className="h-full bg-green-500 dark:bg-green-600 w-[35%] rounded-r-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
      </div>
    </div>
  );
};
