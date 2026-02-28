"use client"
import React, { useState } from 'react';

import { OrderSummarySidebar } from '../Components/OrderSummarySidebar';
import { PaymentMethod } from '../Components/PaymentMethod';
import { ShippingForm } from '../Components/ShippingForm';
import { CheckoutHeader } from '../Components/CheckoutHeader';


export default function CheckoutPage() {
    const [selcted, setselcted] = useState <('cash'| 'card')>('cash');
  return (
   <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f0f0f] py-12 px-4 md:px-10 lg:px-20 transition-colors duration-500">
      
      <div className="max-w-7xl mx-auto">
        
        {/* CheckoutHeader*/}
        <CheckoutHeader />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10 items-start">
          
         
          <div className="lg:col-span-8 space-y-8">
            
          
            <section className="transition-all hover:translate-y-[-2px]">
              <ShippingForm selcted={selcted} />
            </section>

         
            <section className="transition-all hover:translate-y-[-2px]">
              <PaymentMethod  selcted={selcted} setselcted={setselcted}   />
            </section>

          </div>

          
          <aside className="lg:col-span-4 lg:sticky lg:top-8">
            
          
            <OrderSummarySidebar />

            
            <div className="mt-6 p-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl flex items-center justify-center gap-2 text-gray-400 dark:text-gray-600 transition-colors">
               <span className="text-[10px] font-bold uppercase tracking-widest">
                 100% Secure Checkout Process
               </span>
            </div>

          </aside>

        </div>
      </div>
    </main>
  );
}