"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faMoon, faSun, faRightToBracket, faHouse, faBagShopping, 
  faLayerGroup, faHeart, faLocationDot, faGear, faCircleUser,
  faPhone // <--- ضفنا أيقونة السماعة هنا
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../assets/Images/mini-logo.png";
import { ChevronRight, LogOut, X } from "lucide-react";

export default function MobileSidebar({ isMune, toggleMune, wishlist, numOfCartItems, userInfo, logout, theme, setTheme }: any) {
  
  const isLogged = !!userInfo;

  return (
    <AnimatePresence>
      {isMune && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-[#0a0a0a]/60 dark:bg-black/80 backdrop-blur-md z-[999]" 
            onClick={toggleMune} 
          />

          {/* Sidebar Content */}
          <motion.div 
            initial={{ x: "-100%" }} 
            animate={{ x: 0 }} 
            exit={{ x: "-100%" }} 
            transition={{ type: "spring", damping: 25, stiffness: 200 }} 
            className="fixed top-0 left-0 w-[300px] h-full bg-white dark:bg-[#0f0f0f] z-[1000] shadow-2xl overflow-y-auto border-r border-gray-100 dark:border-gray-800 flex flex-col"
          >
            
            {/* Header Section */}
            <div className="p-6 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                   <Image src={Logo} alt="LuxeMart" width={24} height={24} />
                </div>
                <span className="text-xl font-black text-[#0f172a] dark:text-white tracking-tighter">LuxeMart</span>
              </div>
              <button onClick={toggleMune} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all">
                <X size={24} />
              </button>
            </div>

            {/* User Info Section (If Logged In) */}
            {isLogged && (
              <div className="p-6 bg-white dark:bg-[#0f0f0f] border-b border-gray-50 dark:border-gray-800">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-green-100 dark:bg-green-600/20 flex items-center justify-center text-green-600 font-black text-xl border border-green-200 dark:border-green-600/30">
                    {userInfo?.name?.[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Welcome back</span>
                    <span className="text-sm font-black text-[#0f172a] dark:text-white truncate">{userInfo?.name}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Main Links */}
            <div className="p-4 space-y-1">
              <p className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Menu</p>
              <MobileLink href="/" icon={faHouse} label="Home" onClick={toggleMune} />
              <MobileLink href="/Shop" icon={faBagShopping} label="Shop" onClick={toggleMune} />
              <MobileLink href="/Categories" icon={faLayerGroup} label="Categories" onClick={toggleMune} />
              {/* السطر اللي جاي ده هو اللي ضفناه */}
              <MobileLink href="/Contact" icon={faPhone} label="Contact Us" onClick={toggleMune} />
            </div>

            {/* Account Specific Links */}
            <div className="p-4 space-y-1 border-t border-gray-50 dark:border-gray-800">
              <p className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Personal</p>
              <MobileLink href="/Orders" icon={faBagShopping} label="My Orders" onClick={toggleMune} />
              <MobileLink href="/Wishlist" icon={faHeart} label="Wishlist" onClick={toggleMune} badge={wishlist} />
              <MobileLink href="/Porfile/Addrees" icon={faLocationDot} label="My Addresses" onClick={toggleMune} />
              <MobileLink href="/Porfile/setting" icon={faGear} label="Settings" onClick={toggleMune} />
            </div>

            {/* Footer Actions */}
            <div className="mt-auto p-4 space-y-3 bg-gray-50/50 dark:bg-gray-800/10 border-t border-gray-50 dark:border-gray-800">
              <button 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full flex items-center justify-between p-4 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} className={theme === 'dark' ? 'text-yellow-400' : 'text-blue-500'} />
                  <span className="text-xs font-black text-[#0f172a] dark:text-gray-300 uppercase tracking-widest">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
              </button>

              {isLogged ? (
                <button 
                  onClick={() => { logout(); toggleMune(); }} 
                  className="w-full flex items-center justify-center gap-3 p-4 text-red-500 font-black text-xs uppercase tracking-[0.2em] hover:bg-red-50 dark:hover:bg-red-950/20 rounded-2xl transition-all border border-dashed border-red-200 dark:border-red-900/40"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              ) : (
                <Link 
                  href="/Login" 
                  onClick={toggleMune} 
                  className="w-full flex items-center justify-center gap-3 p-4 bg-green-600 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-green-600/20 active:scale-95 transition-all"
                >
                  <FontAwesomeIcon icon={faRightToBracket} /> Sign In Now
                </Link>
              )}
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MobileLink({ href, icon, label, onClick, badge }: any) {
  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className="flex items-center gap-4 px-4 py-3 text-[#0f172a] dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-600/10 rounded-xl transition-all group"
    >
      <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] flex items-center justify-center text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
        <FontAwesomeIcon icon={icon} className="text-[14px]" />
      </div>
      <span className="text-xs font-bold flex-1">{label}</span>
      {badge > 0 && (
        <span className="bg-green-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">{badge}</span>
      )}
      <ChevronRight size={14} className="text-gray-300 dark:text-gray-600" />
    </Link>
  );
}