"use client";
import React, { useEffect, useState } from "react";
import { Plus, X, MapPin } from "lucide-react";
import { AddAddressForm } from "../Components/AddAddressForm";
import NoAddresses from "../Components/NoAddresses";
import { GetLoggedUserAddresses } from "../Server/profile.action";
import { Address } from "../types/profile.types";
import { AddressCard } from "../Components/AddressCard";


export default function AddressesContent() {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getUserAddresse = async () => {
    setIsLoading(true);
    try {
      const response = await GetLoggedUserAddresses();
      if (response.status === "success") {
        setAddresses(response.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserAddresse();
  }, []);

  const deleteFromState = (newData: Address[]) => {
    setAddresses(newData);
  };
  return (
    <div className="relative min-h-[500px]">
      {/* 1. Sticky Header - Updated for perfect glassmorphism */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl py-6 mb-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center px-2 transition-all duration-500">
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white tracking-tight">
            Shipping Addresses
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest">
              {addresses.length} Saved Location{addresses.length !== 1 && "s"}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className={`group flex items-center gap-3 px-6 py-3.5 rounded-[1.25rem] font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl ${
            showForm
              ? "bg-red-500 shadow-red-500/20 text-white"
              : "bg-[#22c55e] shadow-green-500/20 text-white hover:bg-green-600"
          }`}
        >
          {showForm ? (
            <>
              <X size={18} className="animate-in spin-in-90 duration-300" />
              <span>Cancel</span>
            </>
          ) : (
            <>
              <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              <span>Add New</span>
            </>
          )}
        </button>
      </div>

      {/* 2. Content Area */}
      <div className="pb-10">
        {showForm ? (
          <div className="animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-500">
             {/* تمرير الـ getUserAddresses أو الـ setState لإغلاق الفورم بعد النجاح */}
            <AddAddressForm onAddSuccess={() => {
                getUserAddresse();
                setShowForm(false);
            }} />
          </div>
        ) : (
          <div className="animate-in fade-in duration-700">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32 gap-6">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-green-500/20 rounded-full"></div>
                    <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <div className="text-center space-y-2">
                    <p className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-widest animate-pulse">
                        Fetching your locations
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Please wait a moment</p>
                </div>
              </div>
            ) : addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 animate-in slide-in-from-bottom-4 duration-500">
                {addresses.map((addr) => (
                  <AddressCard
                    key={addr._id}
                    address={addr}
                    onDeleteSuccess={deleteFromState}
                  />
                ))}
              </div>
            ) : (
              <NoAddresses />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
