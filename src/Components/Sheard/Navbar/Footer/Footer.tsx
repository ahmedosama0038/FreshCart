import Image from "next/image";


import Link from "next/link";
import logo from "../../../../assets/Images/mini-logo.png";
import React from "react";

import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-[#0a0a0a] pt-24 pb-12 transition-colors duration-500 border-t border-gray-50 dark:border-gray-900">
      <div className="container mx-auto px-6 lg:px-20">
        {/* --- 1. Newsletter Card --- */}
        <div className="relative mb-24 overflow-hidden rounded-[3rem] bg-[#0f172a] dark:bg-[#1a1a1a] p-8 md:p-16 text-center shadow-2xl">
          {/* دوائر ديكور في الخلفية */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="mb-4 text-3xl md:text-4xl font-black tracking-tighter text-white">
              Join the <span className="text-green-500">Fresh</span> Community
            </h2>
            <p className="mb-10 text-gray-400 font-medium">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>

            <form className="flex w-full flex-col gap-3 sm:flex-row sm:items-center bg-white/5 p-2 rounded-[2rem] border border-white/10 backdrop-blur-md">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-transparent px-6 py-4 text-sm text-white outline-none placeholder:text-gray-500"
              />
              <button className="flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-8 py-4 font-black text-xs uppercase tracking-widest text-white transition-all hover:bg-green-700 active:scale-95 shadow-xl shadow-green-500/20">
                <Send size={16} />
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* --- 2. Features Row --- */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              icon: <Truck className="text-green-500" />,
              title: "Fast Delivery",
              desc: "Across all Egypt within 24h",
            },
            {
              icon: <ShieldCheck className="text-green-500" />,
              title: "Secure Payment",
              desc: "100% protected transactions",
            },
            {
              icon: <RotateCcw className="text-green-500" />,
              title: "Easy Returns",
              desc: "30 days money back guarantee",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-5 p-6 rounded-3xl bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800 transition-transform hover:-translate-y-1"
            >
              <div className="p-3 bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-black text-sm text-[#0f172a] dark:text-white uppercase tracking-tighter">
                  {feature.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-500 font-medium">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- 3. Main Links Section --- */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Logo & About */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <Image src={logo} alt="Logo" width={24} height={24} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-[#0f172a] dark:text-white">
                LuxeMart.
              </span>
            </Link>
            <p className="max-w-xs text-sm font-medium leading-relaxed text-gray-500 dark:text-gray-400">
              Your one-stop destination for fresh groceries, organic produce,
              and household essentials. Delivered with love to your doorstep.
            </p>
            <div className="flex space-x-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-[#111] text-gray-400 hover:bg-green-600 hover:text-white transition-all"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            {
              title: "Shop",
              links: [
                "Fruits & Veggies",
                "Dairy & Eggs",
                "Beverages",
                "Snacks",
              ],
            },
            {
              title: "Company",
              links: ["About Us", "Contact", "Privacy", "Terms"],
            },
            {
              title: "Account",
              links: ["My Profile", "Orders", "Wishlist", "Help"],
            },
          ].map((column) => (
            <div key={column.title}>
              <h4 className="mb-8 text-[11px] font-black uppercase tracking-[0.3em] text-[#0f172a] dark:text-white">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm font-bold text-gray-500 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* --- 4. Bottom Bar --- */}
        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-gray-100 dark:border-gray-800 pt-10 md:flex-row">
          <p className="text-xs font-black uppercase tracking-widest text-gray-400">
            © 2026 <span className="text-green-600">LuxeMart.</span>. Built with
            ❤️ for our community.
          </p>
        
        </div>
      </div>
    </footer>
  );
}
