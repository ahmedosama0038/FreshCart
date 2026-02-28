"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
export default function FreshCartSlider() {
  const slides = [
    {
      id: 1,
      title: "Fresh Products Delivered \n to your Door",
      desc: "Get 20% off your first order",
      img: "/home-slider-1.png",
      overlay: "bg-green-700/40 dark:bg-green-900/60",
      btnClass: "bg-green-600 dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600",
    },
    {
      id: 2,
      title: "Elevate Your Style \n With Beauty Care",
      desc: "Up to 50% Off on Makeup Sets",
      img: "/SHOPING.jpg",
      overlay: "bg-pink-700/30 dark:bg-pink-900/50",
      btnClass: "bg-pink-600 dark:bg-pink-700 hover:bg-pink-700 dark:hover:bg-pink-600",
    },
    {
      id: 3,
      title: "Smart Tech for \n a Smarter Life",
      desc: "Explore the Latest Electronics",
      img: "/SALE.jpg",
      overlay: "bg-blue-700/40 dark:bg-blue-900/60",
      btnClass: "bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600",
    },
  ];

  return (
    <section className="relative w-full px-4 pt-6 group max-w-[1400px] mx-auto overflow-hidden bg-white dark:bg-[#0f0f0f] transition-colors duration-500">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        navigation={{ nextEl: ".next-el", prevEl: ".prev-el" }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        className="rounded-3xl overflow-hidden h-[450px] md:h-[550px] shadow-lg dark:shadow-2xl dark:shadow-black/50"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <div
                className="relative w-full h-full bg-cover bg-center flex items-center"
                style={{ backgroundImage: `url(${slide.img})` }}
              >
                {/* Overlay ديناميكي - أغمق في الدارك مود لزيادة التباين */}
                <div className={`absolute inset-0 ${slide.overlay} mix-blend-multiply transition-colors duration-1000`}></div>
                
                {/* Gradient إضافي للدارك مود لضمان قراءة النص */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden dark:block"></div>

                {/* المحتوى */}
                <div className="relative z-10 px-12 md:px-24 text-white max-w-3xl">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      >
                        <motion.h2 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="text-4xl md:text-6xl font-black leading-tight mb-4 whitespace-pre-line drop-shadow-xl"
                        >
                          {slide.title}
                        </motion.h2>
                        
                        <motion.p 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.9 }}
                          transition={{ delay: 0.5 }}
                          className="text-lg md:text-2xl mb-8 font-medium opacity-90 drop-shadow-md"
                        >
                          {slide.desc}
                        </motion.p>

                        <motion.div 
                          className="flex flex-wrap gap-4"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 }}
                        >
                          <button className={`text-white px-10 py-3.5 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${slide.btnClass}`}>
                            Shop Now
                          </button>
                          <button className="bg-white/10 dark:bg-black/20 backdrop-blur-md border-2 border-white/30 dark:border-white/10 text-white px-10 py-3.5 rounded-xl font-bold hover:bg-white hover:text-black transition-all active:scale-95">
                            View Deals
                          </button>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* الأسهم - بستايل نون وأمازون */}
      <button className="prev-el absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 dark:bg-black/30 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-full flex items-center justify-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-green-700 dark:hover:text-green-500">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button className="next-el absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 dark:bg-black/30 backdrop-blur-lg border border-white/30 dark:border-white/10 rounded-full flex items-center justify-center text-white shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-green-700 dark:hover:text-green-500">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>

      {/* Dots */}
      <div className="custom-pagination absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2"></div>

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          @apply bg-white opacity-50 w-2.5 h-2.5 transition-all duration-300;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          @apply opacity-100 w-10 rounded-full bg-white dark:bg-green-500;
        }
      `}</style>
    </section>
  );
}