"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500 overflow-hidden">
      
      {/* 1. Hero Section - The Big Entrance */}
      <section className="relative py-24 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-6xl md:text-8xl font-black text-green-600 dark:text-green-500 mb-6 tracking-tight">
            Fresh<span className="text-slate-900 dark:text-white">Cart</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Revolutionizing the grocery experience with cutting-edge technology and farm-fresh quality.
          </p>
        </motion.div>
        
        {/* Animated Background Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-0 left-20 w-72 h-72 bg-green-400 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-20 w-72 h-72 bg-blue-500 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>
      </section>

      {/* 2. Founder Section - The Professional Image Component */}
      <section className="container mx-auto py-20 px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          {/* IMAGE CONTAINER */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative group w-full md:w-1/2 max-w-md"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-700 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000" />
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] shadow-2xl">
              <Image 
                src="/WDQX7895.jpeg" // Put your photo in /public/ahmed-osama.jpg
                alt="Ahmed Osama - Lead Developer"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                priority // Critical for LCP (Speed)
              />
            </div>
          </motion.div>

          {/* TEXT CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
              Crafting Digital <span className="text-green-600">Masterpieces</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-loose">
              I am <span className="font-bold text-slate-900 dark:text-white underline decoration-green-500 underline-offset-4">Ahmed Osama</span>, 
              a FRONTEND Developer driven by the passion to build scalable, high-performance web applications. 
              In <strong>FreshCart</strong>, I merged seamless UX with robust Redux logic to deliver a premium shopping experience.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-medium dark:text-white">
                🚀 Next.js 14
              </div>
              <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-medium dark:text-white">
                💎 Redux Toolkit
              </div>
              <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm text-sm font-medium dark:text-white">
                🎨 Tailwind CSS
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Global Stats - Clean & Modern */}
      <section className="bg-white dark:bg-slate-800/50 py-20 border-y border-slate-200 dark:border-slate-800">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'Products Delivered', value: '1.2k+' },
            { label: 'Active Users', value: '850+' },
            { label: 'Page Speed', value: '98/100' },
            { label: 'Happy Clients', value: '100%' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="space-y-2"
            >
              <h3 className="text-4xl font-black text-green-600">{item.value}</h3>
              <p className="text-slate-500 dark:text-slate-400 font-medium tracking-widest text-xs uppercase">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 text-center">
        <p className="text-slate-400 dark:text-slate-600 text-sm font-medium uppercase tracking-widest">
          Designed & Engineered by Ahmed Osama © 2026
        </p>
      </footer>
    </div>
  );
};

export default About;