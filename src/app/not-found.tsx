"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGhost } from "@fortawesome/free-solid-svg-icons";



export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);

    // توليد بيانات الجزيئات مرة واحدة فقط عند التحميل في المتصفح
    const generatedParticles = [...Array(20)].map((_, i) => ({
      id: i,
      initialX: Math.random() * 100 + "%",
      initialY: Math.random() * 100 + "%",
      moveY: (Math.random() * -100 - 50) + "px",
      duration: Math.random() * 5 + 3,
    }));
    setParticles(generatedParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // نمنع الريندر تماماً لحد ما نتأكد إننا على الكلاينت عشان الـ Flashlight والـ Randomness
  if (!mounted) return <div className="min-h-screen bg-[#0a0a0a]" />;

  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center cursor-none">
      
      {/* 1. الكشاف (The Flashlight) */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, rgba(34, 197, 94, 0.15), transparent 80%)`
        }}
      />

      {/* 2. الرقم الكبير (خلفية) */}
      <h1 className="absolute text-[25vw] font-black text-white/[0.03] select-none uppercase">
        404
      </h1>

      {/* 3. المحتوى الأساسي */}
      <div className="z-40 text-center px-4">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-green-500 text-8xl mb-6"
        >
          <FontAwesomeIcon icon={faGhost} />
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
          LOST IN THE <span className="text-green-500">DARK?</span>
        </h2>
        
        <p className="text-gray-500 font-bold max-w-md mx-auto mb-10 text-sm md:text-base uppercase tracking-widest leading-relaxed">
          The page you're looking for vanished into the void. <br/>
          Use your flashlight to find the way back.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/" 
            className="group relative inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-full font-black text-sm transition-all hover:bg-green-500 hover:text-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="group-hover:-translate-x-2 transition-transform" />
            BACK TO REALITY
          </Link>
        </motion.div>
      </div>

      {/* 4. جزيئات طايرة (Particles) - تم إصلاح الـ Randomness */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-green-500/20 rounded-full"
          initial={{ x: p.initialX, y: p.initialY, opacity: 0 }}
          animate={{ 
            y: [p.initialY, p.moveY],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: p.duration, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}

      {/* 5. الدائرة اللي بتمشي مع الماوس */}
      <div 
        className="pointer-events-none fixed w-8 h-8 border-2 border-green-500 rounded-full z-50 transition-transform duration-75 ease-out"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)' 
        }}
      />
    </div>
  );
}