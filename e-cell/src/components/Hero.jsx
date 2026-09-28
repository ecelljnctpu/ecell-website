import React from "react";
import { motion } from "framer-motion";

function CompassRose({ className }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="200" cy="200" r="185" stroke="#b08b42" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="200" cy="200" r="170" stroke="#b08b42" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
      <circle cx="200" cy="200" r="130" stroke="#b08b42" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="200" cy="200" r="70" stroke="#b08b42" strokeWidth="1" strokeOpacity="0.3" />
      
      <polygon points="200,10 215,185 390,200 215,215 200,390 185,215 10,200 185,185" fill="#c5a059" fillOpacity="0.12" stroke="#a0782f" strokeWidth="1.5" strokeOpacity="0.45" />
      <polygon points="200,10 200,200 185,185" fill="#715420" fillOpacity="0.35" />
      <polygon points="200,390 200,200 215,215" fill="#715420" fillOpacity="0.35" />
      <polygon points="10,200 200,200 185,215" fill="#715420" fillOpacity="0.35" />
      <polygon points="390,200 200,200 215,185" fill="#715420" fillOpacity="0.35" />
      
      <line x1="200" y1="5" x2="200" y2="395" stroke="#b08b42" strokeWidth="1" strokeOpacity="0.25" />
      <line x1="5" y1="200" x2="395" y2="200" stroke="#b08b42" strokeWidth="1" strokeOpacity="0.25" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative w-full min-h-[92vh] flex flex-col items-center justify-center px-4 overflow-hidden select-none bg-[#e8dab7]">
      {/* Background Vintage Parchment Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 45%, #f6edd6 0%, #ecdcb6 50%, #d8be8a 85%, #b99a60 100%)",
          opacity: 0.95
        }}
      />

      {/* Aged Paper Texture Noise */}
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20 bg-[radial-gradient(#8f6a2b_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Compass Watermarks */}
      <div className="absolute -top-16 -left-16 w-72 h-72 sm:w-[420px] sm:h-[420px] pointer-events-none opacity-60">
        <CompassRose className="w-full h-full" />
      </div>

      <div className="absolute -bottom-24 -right-20 w-72 h-72 sm:w-[480px] sm:h-[480px] pointer-events-none opacity-50">
        <CompassRose className="w-full h-full" />
      </div>

      {/* Floating Gold Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, y: 15 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.2, 0.2],
              y: [-10, -50],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#f4b41a] blur-[0.5px] shadow-[0_0_8px_#f4b41a]"
          />
        ))}
      </div>

      {/* Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center mt-2">
        
        {/* 🔥 REPLACED: Official 3D Renaissance Bulb Mascot Photo */}
        <motion.div
          initial={{ scale: 0.75, opacity: 0, y: -20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative mb-3 flex flex-col items-center"
        >
          {/* Ambient Warm Golden Glow behind Bulb */}
          <div className="absolute -inset-4 bg-[#f3c859]/35 blur-2xl rounded-full pointer-events-none" />
          
          <img
            src="/Logo_ECELL.png"
            alt="E-Summit Mascot"
            className="w-28 sm:w-36 md:w-40 h-auto object-contain drop-shadow-[0_16px_28px_rgba(139,94,20,0.45)] relative z-10 hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Title: E-Summit 6.0 */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-7xl md:text-8xl font-serif font-black tracking-tight text-[#0a1833] drop-shadow-sm uppercase"
          style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
        >
          {/* E-Summit 6.0 */}
          JNCT PU
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-2 text-[11px] sm:text-xs font-semibold tracking-[0.32em] text-[#7d5f24] uppercase"
          style={{ fontFamily: "'Cinzel', 'Montserrat', serif" }}
        >
          RENAISSANCE: QUILLS TO CAPITAL
        </motion.div>

        {/* Renaissance Diamond Divider */}
        <div className="flex items-center justify-center gap-2 my-3 text-[#ab8235]">
          <span className="w-8 sm:w-12 h-[1px] bg-[#ab8235]/40" />
          <span className="text-[10px]">❖</span>
          <span className="text-[12px]">✦</span>
          <span className="text-[10px]">❖</span>
          <span className="w-8 sm:w-12 h-[1px] bg-[#ab8235]/40" />
        </div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-slate-800 text-xs sm:text-sm italic leading-relaxed font-serif px-2"
        >
          <p>Empowering students to think, build and lead</p>
          <p className="mt-0.5">Ideas gather, take shape, and become empires.</p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5"
        >
          <a
            href="/events"
            className="px-6 sm:px-8 py-3 bg-[#0a1833] hover:bg-[#12244a] text-[#f4ecd8] text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase rounded-[2px] shadow-[0_4px_14px_rgba(10,24,51,0.25)] transition-all"
            style={{ fontFamily: "'Cinzel', 'Montserrat', serif" }}
          >
            EXPLORE CHRONICLE
          </a>

          <a
            href="#speakers"
            className="px-6 sm:px-8 py-3 bg-transparent hover:bg-[#9e762c]/10 text-[#0a1833] border border-[#8f6a27] text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase rounded-[2px] transition-all"
            style={{ fontFamily: "'Cinzel', 'Montserrat', serif" }}
          >
            MEET VISIONARIES
          </a>
        </motion.div>

      </div>
    </section>
  );
}