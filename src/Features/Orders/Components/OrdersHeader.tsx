"use client"
import React, { useEffect, useState } from "react";
import { ShoppingBag, Package } from "lucide-react";
import Link from "next/link";
import { OrderItemCard } from "./OrderItemCard";
import { getUserOrders } from "../Server/order.actions";
import { useAppSelector } from "@/Store/Store";
import { NoOrders } from "./NoOrders"; 
import { Order, OrdersResponse } from "../Types/order,types";
import { OrderSkeleton } from "./OrderSkeleton";
export const OrdersHeader = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const [orders, setOrders] = useState<OrdersResponse | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (userInfo?.id) {
        try {
          const response = await getUserOrders({ id: userInfo.id! });
          setOrders(response); 
        } catch (error) {
          console.error("Failed to fetch orders:", error);
        }
      }
    };
    fetchOrders();
  }, [userInfo?.id]);

  if (!userInfo) return null;

  return (
    <div className="mb-8 py-9 px-8 bg-white dark:bg-[#0f0f0f] min-h-screen transition-colors duration-500">
      <div className="container mx-auto">
        {/* 1. Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[11px] font-bold text-gray-400 dark:text-gray-500 mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-800 dark:text-gray-200">My Orders</span>
        </nav>

        {/* 2. Header Row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#16a34a] dark:bg-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-100 dark:shadow-none ring-4 ring-green-50 dark:ring-white/5 transition-all">
              <Package size={28} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-[#0f172a] dark:text-white tracking-tight">
              My Orders
            </h1>
          </div>

          <Link href="/products" className="flex items-center gap-2 text-[#16a34a] dark:text-green-400 font-bold text-sm hover:underline group">
            <ShoppingBag size={18} className="group-hover:-translate-y-0.5 transition-transform" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* 3. Orders Logic */}
        <div className="space-y-6">
          {orders === null ? (
            <OrderSkeleton />
          ) : orders.length > 0 ? (
            orders.map((order: Order) => (
              <OrderItemCard key={order._id} orderInfo={order} />
            ))
          ) : (
            <NoOrders />
          )}
        </div>
      </div>
    </div>
  );
};