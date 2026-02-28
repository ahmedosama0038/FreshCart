"use client"
import { CreditCard, Wallet, ShieldCheck } from "lucide-react";
import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { useState } from "react";
type PaymentMethodProo={
    setselcted:(Method : "cash" | 'card') =>void,
selcted: 'cash'| 'card'
}
export const PaymentMethod = ({selcted,setselcted}:PaymentMethodProo  ) => {



  return (
    <>
     <div className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden transition-colors duration-300">
        <div className="bg-green-600 dark:bg-[#064e3b] p-5 text-white flex items-center gap-3 transition-colors">
          <CreditCard size={22} />
          <h2 className="text-lg font-bold">Payment Method</h2>
        </div>
<div className="p-8 space-y-4">

  {/* Cash Option */}
  <div
    onClick={() => setselcted('cash')}
    className={`p-5 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-300
      ${selcted === 'cash'
        ? 'border-2 border-green-500 bg-green-50/30 dark:bg-green-500/10'
        : 'border border-gray-100 dark:border-gray-800'
      }`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors
          ${selcted === 'cash'
            ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
            : 'bg-gray-100 dark:bg-[#252525] text-gray-400'
          }`}
      >
        <Wallet size={24} />
      </div>

      <div>
        <p className={`font-bold transition-colors ${selcted === 'cash' ? 'text-green-600 dark:text-green-500' : 'text-gray-800 dark:text-gray-100'}`}>Cash on Delivery</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Pay when your order arrives at your doorstep
        </p>
      </div>
    </div>

    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all
        ${selcted === 'cash'
          ? 'bg-green-500 border-green-500'
          : 'bg-white dark:bg-transparent border-gray-300 dark:border-gray-600'
        }`}
    >
      {selcted === 'cash' && (
        <div className="w-2 h-2 bg-white rounded-full"></div>
      )}
    </div>
  </div>


  {/* Card Option */}
  <div
    onClick={() => setselcted('card')}
    className={`p-5 rounded-2xl flex items-center justify-between cursor-pointer transition-all duration-300
      ${selcted === 'card'
        ? 'border-2 border-green-500 bg-green-50/30 dark:bg-green-500/10'
        : 'border border-gray-100 dark:border-gray-800'
      }`}
  >
    <div className="flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors
          ${selcted === 'card'
            ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
            : 'bg-gray-100 dark:bg-[#252525] text-gray-400'
          }`}
      >
        <CreditCard size={24} />
        
      </div>

      <div>
        <p className={`font-bold transition-colors ${selcted === 'card' ? 'text-green-600 dark:text-green-500' : 'text-gray-800 dark:text-gray-100'}`}>Pay Online</p>
        <div className="flex items-center gap-2 my-1">
          <FaCcVisa className="text-2xl text-slate-800 dark:text-white" />
          <FaCcMastercard className="text-2xl text-red-500" />
          <FaCcAmex className="text-2xl text-sky-600" />
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          Secure payment with Credit/Debit Card via Stripe
        </p>
      </div>
    </div>

    <div
      className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all
        ${selcted === 'card'
          ? 'bg-green-500 border-green-500'
          : 'bg-white dark:bg-transparent border-gray-300 dark:border-gray-600'
        }`}
    >
      {selcted === 'card' && (
        <div className="w-2 h-2 bg-white rounded-full"></div>
      )}
      
    </div>
    
  </div>

  <div className="flex items-center gap-2 mt-4 text-[11px] text-gray-400 dark:text-gray-500 font-bold justify-center">
    <ShieldCheck size={14} className="text-green-500" />
    Secure & Encrypted Payment
  </div>

</div>

      </div>
    </>
  );
};
