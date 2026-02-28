import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faArrowRight,
  faLeaf,
  faTruck,
  faTag,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";
const Newsletter = () => {
  return (
    <section className="w-full py-12 px-4 md:px-8 bg-white dark:bg-[#0f0f0f] transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-[#f0f9f4] dark:bg-[#122018] rounded-[32px] p-8 md:p-12 relative overflow-hidden transition-colors duration-500">
        
        {/* Decorative background blur for dark mode */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Left Side: Newsletter Content */}
        <div className="lg:col-span-2 space-y-8 relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200 dark:shadow-none">
              <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
            </div>
            <div>
              <span className="text-green-600 dark:text-green-400 font-bold text-sm uppercase tracking-widest">
                Newsletter
              </span>
              <p className="text-gray-500 dark:text-gray-400 text-sm">50,000+ subscribers</p>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#253d4e] dark:text-white leading-tight transition-colors">
            Get the Freshest Updates <br />
            <span className="text-green-500 dark:text-green-400 italic">Delivered Free</span>
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Weekly recipes, seasonal offers & exclusive member perks.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            <Badge icon={faLeaf} text="Fresh Picks Weekly" />
            <Badge icon={faTruck} text="Free Delivery Codes" />
            <Badge icon={faTag} text="Members-Only Deals" />
          </div>

          {/* Subscribe Form */}
          <div className="max-w-md w-full">
            <div className="flex items-center bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800 rounded-full p-1 shadow-sm focus-within:border-green-400 dark:focus-within:border-green-600 transition-all">
              <div className="pl-5 text-gray-400">
                <FontAwesomeIcon icon={faEnvelope} className="text-sm" />
              </div>

              <input
                type="email"
                placeholder="your@example.com"
                className="flex-1 bg-transparent py-3 px-3 outline-none text-gray-700 dark:text-white text-sm placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />

              <button className="bg-[#3bb77e] dark:bg-green-600 hover:bg-[#29a56c] dark:hover:bg-green-500 text-white px-8 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 whitespace-nowrap active:scale-95 shadow-md shadow-green-200/50 dark:shadow-none">
                Subscribe{" "}
                <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </button>
            </div>

            <p className="mt-3 text-[11px] text-orange-400 dark:text-orange-500 flex items-center gap-1 ml-4 italic font-medium">
              <span className="text-lg leading-none font-bold">✻</span>
              Unsubscribe anytime. No spam, ever.
            </p>
          </div>
        </div>

        {/* Right Side: Mobile App Card */}
        <div className="bg-[#253d4e] dark:bg-[#0a0a0a] border dark:border-gray-800 rounded-[24px] p-8 text-white relative z-10 shadow-2xl overflow-hidden group transition-colors duration-500">
          {/* Background Decoration */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 dark:bg-green-500/10 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors"></div>

          <div className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-6 border border-white/20">
            <span className="mr-2">📱</span> Mobile App
          </div>

          <h3 className="text-2xl font-bold mb-3">Shop Faster on Our App</h3>
          <p className="text-gray-400 dark:text-gray-500 text-sm mb-8 leading-relaxed">
            Get app-exclusive deals & 15% off your first order.
          </p>

          <div className="space-y-4">
            <StoreButton icon={faApple} store="App Store" label="Download on" />
            <StoreButton
              icon={faGooglePlay}
              store="Google Play"
              label="Get it on"
            />
          </div>

          {/* App Rating */}
          <div className="mt-8 pt-8 border-t border-white/10 dark:border-gray-800 flex items-center gap-2">
            <div className="flex text-yellow-400 dark:text-yellow-500 text-[10px] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
            </div>
            <span className="text-xs font-medium dark:text-gray-400">4.9 · 100K+ downloads</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper Components
const Badge = ({ icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-2 bg-white/80 dark:bg-white/5 backdrop-blur-sm border border-green-100 dark:border-green-900/30 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-white dark:hover:bg-white/10 hover:shadow-md dark:hover:border-green-500/50 transition-all cursor-default">
    <FontAwesomeIcon icon={icon} className="text-green-500 dark:text-green-400 text-xs" />
    {text}
  </div>
);

const StoreButton = ({
  icon,
  store,
  label,
}: {
  icon: any;
  store: string;
  label: string;
}) => (
  <button className="w-full flex items-center gap-4 bg-[#0e222f] dark:bg-[#1a1a1a] hover:bg-[#1a3444] dark:hover:bg-[#252525] border border-white/10 dark:border-gray-800 p-3 rounded-xl transition-all hover:-translate-y-1">
    <FontAwesomeIcon icon={icon} className="text-3xl" />
    <div className="text-left leading-none">
      <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1">{label}</p>
      <p className="text-lg font-bold">{store}</p>
    </div>
  </button>
);
export default Newsletter;
