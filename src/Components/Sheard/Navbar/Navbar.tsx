"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faChevronDown,
  faHeadphones,
  faMagnifyingGlass,
  faMicrochip,
  faRightFromBracket,
  faXmark,
  faBoxOpen,
  faGear,
  faUserPlus,
  faPhone,
  faMoon,
  faSun,
  faLocationDot,
  faBagShopping,
  faHeadset,
} from "@fortawesome/free-solid-svg-icons";
import {
  faEnvelope,
  faHeart,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import Logo from "../../../assets/Images/mini-logo.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useAppSelector } from "@/Store/Store";
import useLogout from "@/Features/Auth/Hooks/UseLoguot";
import MobileSidebar from "./MobileSidebar";
import { Category } from "@/Features/Category/Types/Types.Category";
import { getCategories } from "@/Features/Products/Server/ServerProduct.actions";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { logout } = useLogout();
  const [isMune, setisMune] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { isAuthenticated, userInfo } = useAppSelector((state) => state.auth);
  const { numOfCartItems } = useAppSelector((stat) => stat.cart);
  const { products } = useAppSelector((stat) => stat.wishlist);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const wishlist = products.length;

  function toggleMune() {
    setisMune(!isMune);
  }

  useEffect(() => {
    setMounted(true);
    document.title = "LuxeMart. | Premium Store";
  }, []);

  useEffect(() => {
    async function fetchCats() {
      try {
        const data = await getCategories();
        setCategories(data.slice(0, 6));
      } catch (error) {
        console.error("Navbar Categories Error:", error);
      }
    }
    fetchCats();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 dark:bg-[#121212]/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
        <div className="container mx-auto px-4">
          {/* 1. Top Mini Nav */}
          <div className="hidden lg:flex text-[11px] justify-between items-center border-b border-gray-100/50 dark:border-gray-800/50 py-1.5 px-6 text-gray-400 font-bold uppercase tracking-widest">
            <ul className="flex items-center gap-8">
              <li className="flex items-center gap-2 hover:text-green-600 transition-colors">
                <FontAwesomeIcon icon={faPhone} className="text-green-500" />
                <a href="tel:+18001234567">+1 (800) 123-4567</a>
              </li>
              <li className="flex items-center gap-2 hover:text-green-600 transition-colors">
                <FontAwesomeIcon icon={faEnvelope} className="text-green-500" />
                <a href="mailto:ah.osama@303.com">ah.osama@303.com</a>
              </li>
            </ul>
            <div className="flex items-center gap-6">
              <Link
                href="/About"
                className="hover:text-green-600 transition-colors dark:text-gray-400 dark:hover:text-green-500"
              >
                Our Story
              </Link>
              <div className="h-3 w-[1px] bg-gray-200 dark:bg-gray-700"></div>
              {isAuthenticated ? (
                <span className="text-green-600 italic">
                  Welcome, {userInfo?.name?.split(" ")[0]}!
                </span>
              ) : (
                <Link
                  href="/Login"
                  className="hover:text-green-600 transition-colors dark:text-gray-400 dark:hover:text-green-500"
                >
                  Partner Login
                </Link>
              )}
              {/* Desktop Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 text-[#253d4e] dark:text-yellow-400 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
              >
                {mounted && (
                  <FontAwesomeIcon
                    icon={theme === "dark" ? faSun : faMoon}
                    className="text-sm"
                  />
                )}
              </button>
            </div>
          </div>

          {/* 2. Main Nav */}
          <nav className="flex justify-between items-center py-4 px-2 lg:px-6 gap-4">
            <div className="flex items-center gap-8 flex-1">
              <Link href={"/"} className="flex items-center gap-2 shrink-0 group">
                <motion.div whileHover={{ rotate: 10 }}>
                  {/* ده اللوجو اللي جنب التايتل */}
                  <Image src={Logo} alt="LuxeMart" width={42} height={42} />
                </motion.div>
                <span className="text-xl lg:text-2xl font-black text-[#253d4e] dark:text-white tracking-tighter">
                  LuxeMart<span className="text-green-600">.</span>
                </span>
              </Link>

              {/* Search - Hidden on Mobile */}
              <div className="relative hidden lg:block flex-1 max-w-md group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-gray-400 group-focus-within:text-green-600 transition-colors"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2.5 px-12 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-green-500/10 focus:bg-white dark:focus:bg-gray-800 rounded-2xl outline-none text-sm transition-all dark:text-gray-200"
                />
              </div>
            </div>

            {/* Support Section - اللي كان في الصورة التانية وضفناه هنا */}
            <Link href={'/Contact'} className="hidden xl:flex items-center gap-3 border-r pr-6 border-gray-100 dark:border-gray-800">
               <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-950/30 flex items-center justify-center text-green-600">
                  <FontAwesomeIcon icon={faHeadphones} className="text-lg" />
               </div>
               <div className="flex flex-col">
                  <span className="text-[#253d4e] dark:text-white font-bold text-sm leading-none">Support</span>
                  <span className="text-green-600 font-black text-xs">24/7 Help</span>
               </div>
            </Link>

            <ul className="flex items-center gap-2 lg:gap-6">
              <NavActionItem
                href="/Wishlist"
                icon={faHeart}
                label="Wishlist"
                count={wishlist}
              />
              <NavActionItem
                href="/Cart"
                icon={faCartShopping}
                label="Cart"
                count={numOfCartItems}
                highlight
              />

              <li className="relative ml-2">
                <button
                  onClick={() => setIsUserOpen(!isUserOpen)}
                  className="flex items-center gap-2 p-1 lg:pr-3 rounded-full bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-white dark:bg-gray-900 shadow-sm flex items-center justify-center text-green-600 overflow-hidden border border-gray-100 dark:border-gray-700 font-bold">
                    {isAuthenticated ? (
                      userInfo?.name?.[0].toUpperCase()
                    ) : (
                      <FontAwesomeIcon icon={faUser} />
                    )}
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`hidden lg:block text-[9px] text-gray-400 transition-transform ${isUserOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isUserOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsUserOpen(false)}
                      ></div>
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="absolute right-0 mt-4 w-64 bg-white dark:bg-[#1a1a1a] rounded-[2rem] shadow-2xl border border-gray-100 dark:border-gray-800 z-20 overflow-hidden"
                      >
                        {isAuthenticated ? (
                          <div className="flex flex-col">
                            <div className="px-6 py-5 border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                                Account
                              </p>
                              <p className="font-black text-[#253d4e] dark:text-gray-100 truncate text-sm">
                                {userInfo?.name}
                              </p>
                            </div>
                            <ul className="p-3 space-y-1">
                              <DropdownLink
                                href="/Porfile/Addrees"
                                icon={faLocationDot}
                                label="My Addresses"
                                close={() => setIsUserOpen(false)}
                              />
                              <DropdownLink
                                href="/Orders"
                                icon={faBagShopping}
                                label="My Orders"
                                close={() => setIsUserOpen(false)}
                              />
                              <DropdownLink
                                href="/Wishlist"
                                icon={faHeart}
                                label="Wishlist"
                                close={() => setIsUserOpen(false)}
                              />
                              <DropdownLink
                                href="/Porfile/setting"
                                icon={faGear}
                                label="Settings"
                                close={() => setIsUserOpen(false)}
                              />
                              <hr className="my-2 border-gray-50 dark:border-gray-800" />
                              <button
                                onClick={() => {
                                  logout();
                                  setIsUserOpen(false);
                                }}
                                className="w-full flex items-center gap-4 px-4 py-3 text-red-500 font-black text-xs uppercase tracking-tighter hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                              >
                                <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                                Sign Out
                              </button>
                            </ul>
                          </div>
                        ) : (
                          <div className="p-5 flex flex-col gap-3">
                            <p className="text-xs font-bold text-gray-500 text-center">
                              Manage your orders and wishlist
                            </p>
                            <Link
                              href="/Login"
                              onClick={() => setIsUserOpen(false)}
                              className="w-full bg-[#253d4e] dark:bg-green-600 text-white py-3 rounded-xl text-xs font-black text-center shadow-lg active:scale-95 transition-all"
                            >
                              SIGN IN
                            </Link>
                            <Link
                              href="/Signup"
                              onClick={() => setIsUserOpen(false)}
                              className="w-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-3 rounded-xl text-xs font-black text-center border border-gray-100 dark:border-gray-700"
                            >
                              CREATE ACCOUNT
                            </Link>
                          </div>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </li>

              <li className="lg:hidden">
                <button
                  onClick={toggleMune}
                  className="text-[#253d4e] dark:text-white w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <FontAwesomeIcon
                    icon={isMune ? faXmark : faBars}
                    className="text-xl"
                  />
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* 3. Categories Bar - Desktop Only */}
        <nav className="py-2.5 hidden lg:block bg-white/50 dark:bg-[#121212]/50 border-t border-gray-100 dark:border-gray-800">
          <div className="container mx-auto flex items-center justify-between px-6">
            <div className="flex items-center gap-10">
              <div className="relative group">
                <button className="flex items-center gap-3 bg-[#253d4e] dark:bg-green-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">
                  <FontAwesomeIcon icon={faBars} className="text-[10px]" />
                  <span>Browse Categories</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="text-[8px] opacity-50"
                  />
                </button>
                <div className="absolute top-[120%] left-0 z-50 min-w-72 bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-[30px] border border-gray-100 dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all p-3">
                  {categories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/Shop?category=${cat._id}`}
                      className="flex items-center gap-4 px-5 py-3.5 hover:bg-green-50 dark:hover:bg-green-950/20 rounded-2xl transition-all group/item"
                    >
                      <span className="text-gray-700 dark:text-gray-300 font-bold text-sm group-hover/item:text-green-600">
                        {cat.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              <ul className="flex items-center gap-10">
                {["Home", "Shop", "Brands", "Deals", "Categories"].map(
                  (item) => (
                    <li key={item} className="relative group py-2">
                      <Link
                        href={
                          item === "Home"
                            ? "/"
                            : `/${item}`
                        }
                        className="text-[#253d4e] dark:text-gray-200 font-black text-xs uppercase tracking-[2px] hover:text-green-600 transition-colors"
                      >
                        {item}
                      </Link>
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full"></span>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <MobileSidebar
        isMune={isMune}
        toggleMune={toggleMune}
        wishlist={wishlist}
        numOfCartItems={numOfCartItems}
        userInfo={userInfo}
        logout={logout}
        categories={categories}
        theme={theme}
        setTheme={setTheme}
      />
    <div className="h-[50px] lg:h-[190px]"></div>
    </>
  );
}

function NavActionItem({ href, icon, label, count, highlight = false }: any) {
  return (
    <li className="list-none">
      <Link href={href} className="flex flex-col items-center gap-1 group">
        <div className="relative p-2 rounded-xl group-hover:bg-green-50 dark:group-hover:bg-gray-800 transition-all">
          <FontAwesomeIcon
            icon={icon}
            className={`text-xl transition-colors ${highlight ? "text-[#253d4e] dark:text-gray-200" : "text-gray-600 dark:text-gray-400"} group-hover:text-green-600`}
          />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center border-2 border-white dark:border-[#121212] shadow-sm">
              {count}
            </span>
          )}
        </div>
        <span className="hidden sm:block text-[9px] font-black uppercase text-gray-400 group-hover:text-green-600 transition-colors">
          {label}
        </span>
      </Link>
    </li>
  );
}

function DropdownLink({ href, icon, label, close }: any) {
  return (
    <li>
      <Link
        href={href}
        onClick={close}
        className="flex items-center gap-4 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-950/20 hover:text-green-600 rounded-xl transition-all text-xs font-bold uppercase tracking-tighter"
      >
        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
          <FontAwesomeIcon icon={icon} className="text-[12px] opacity-70" />
        </div>
        {label}
      </Link>
    </li>
  );
}