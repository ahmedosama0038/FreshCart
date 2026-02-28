"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHeadset, faEnvelope, faGlobe, faPaperPlane, 
  faShieldHalved, faClock, faLocationDot 
} from "@fortawesome/free-solid-svg-icons";



// export const metadata = {
//   title: 'Contact Us', 
// };

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-500 pb-20">
      
      {/* 1. Hero Section - Deep Emerald Gradient */}
      <div className="relative bg-[#0f172a] dark:bg-[#050505] py-32 px-4 overflow-hidden">
        {/* تأثير إضاءة خفي في الخلفية */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-green-500/10 blur-[120px] rounded-full"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 container mx-auto text-center"
        >
          <span className="text-green-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">Get In Touch</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            How Can We <span className="italic text-green-500">Help?</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium">
            Have a question? Our team usually responds in less than 2 hours.
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* 2. Side Cards (Info) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Customer Service Card */}
            <div className="bg-white dark:bg-[#111] p-8 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 dark:border-gray-800 transition-transform hover:-translate-y-2">
              <div className="w-14 h-14 bg-green-600 rounded-2xl flex items-center justify-center text-white text-xl mb-6 shadow-xl shadow-green-500/20">
                <FontAwesomeIcon icon={faHeadset} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter uppercase">Support Line</h3>
              <p className="text-green-600 font-black text-xl tracking-tight">+1 (800) 123-4567</p>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 font-black uppercase tracking-widest mt-4">Active 24/7 Support</p>
            </div>

            {/* Email Card */}
            <div className="bg-white dark:bg-[#111] p-8 rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 dark:border-gray-800">
              <div className="w-14 h-14 bg-gray-900 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-black text-xl mb-6">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tighter uppercase">Direct Email</h3>
              <p className="text-gray-600 dark:text-gray-400 font-bold">support@freshcart.com</p>
            </div>

            {/* Offices Card */}
            <div className="bg-gray-900 dark:bg-[#1a1a1a] p-8 rounded-[2.5rem] text-white">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                <FontAwesomeIcon icon={faGlobe} className="text-green-500" />
                Global Offices
              </h3>
              <div className="space-y-6">
                <div className="border-l-2 border-green-500 pl-4">
                  <p className="font-black text-sm uppercase italic">Cairo, Egypt</p>
                  <p className="text-xs text-gray-400 mt-1">123 Nile Street, Maadi District</p>
                </div>
                <div className="border-l-2 border-gray-700 pl-4">
                  <p className="font-black text-sm uppercase italic">Dubai, UAE</p>
                  <p className="text-xs text-gray-400 mt-1">Business Bay, Opal Tower</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. The Modern Form */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0f0f0f] rounded-[3rem] p-10 md:p-16 shadow-2xl border border-gray-50 dark:border-gray-900">
            <div className="mb-12">
              <h2 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
                Send us a <span className="text-green-600">Message</span>
              </h2>
              <div className="h-1.5 w-16 bg-green-600 rounded-full mt-2"></div>
            </div>
            
            <form className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Your Identity</label>
                <input type="text" placeholder="Full Name" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-transparent focus:border-green-500 dark:text-white outline-none transition-all font-bold" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Contact Email</label>
                <input type="email" placeholder="email@example.com" className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-transparent focus:border-green-500 dark:text-white outline-none transition-all font-bold" />
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Inquiry Type</label>
                <select className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-transparent focus:border-green-500 dark:text-white outline-none transition-all font-bold appearance-none cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Order Support</option>
                  <option>Returns & Refunds</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Message Details</label>
                <textarea rows={5} placeholder="Describe your issue..." className="w-full p-5 rounded-2xl bg-gray-50 dark:bg-[#1a1a1a] border border-transparent focus:border-green-500 dark:text-white outline-none transition-all resize-none font-bold"></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="w-full md:w-auto bg-green-600 text-white px-16 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-green-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-green-500/20 flex items-center justify-center gap-4">
                  <FontAwesomeIcon icon={faPaperPlane} />
                  Dispatch Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 4. Trust Badges - Minimalist Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-12 text-center border-t border-gray-100 dark:border-gray-900 pt-20">
          {[
            { icon: faShieldHalved, title: "Data Privacy", desc: "Encryption enabled" },
            { icon: faClock, title: "Fast Lane", desc: "2-hour response avg." },
            { icon: faLocationDot, title: "Physical Presence", desc: "Local stores nearby" }
          ].map((item, i) => (
            <div key={i} className="group">
              <div className="text-gray-300 dark:text-gray-700 group-hover:text-green-500 transition-colors text-3xl mb-4">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <h4 className="font-black text-gray-900 dark:text-white text-xs uppercase tracking-widest">{item.title}</h4>
              <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}