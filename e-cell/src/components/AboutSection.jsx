import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CounterItem from "./CounterItem";

export default function AboutSection() {
  const containerRef = useRef(null);
  // Jab section screen me 20% andar aayega, tab running animation start hoga
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="py-20 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-[#c5a059] selection:text-white"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ================= LEFT: PARCHMENT SCROLL WITH WOODEN ROLLER ================= */}
        <div className="lg:col-span-7 relative flex">
          {/* Scroll Main Paper */}
          <div 
            className="flex-1 rounded-l-2xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-y border-l border-[#d3ba83]/60 relative z-10 flex flex-col justify-center"
            style={{
              background: "radial-gradient(circle at 40% 40%, #fdf8eb 0%, #f6ecd5 65%, #edd9b4 100%)",
            }}
          >
            {/* Title */}
            <h2 
              className="text-3xl sm:text-5xl font-black text-[#0f1d38] tracking-tight leading-[1.15]"
              style={{ fontFamily: "'Cinzel', Georgia, serif" }}
            >
              The <span className="text-[#c59a3c]">Grandest Stage</span> <br />
              of Entrepreneurship
            </h2>

            {/* Paragraphs with Dropcap */}
            <div className="mt-8 space-y-6 text-[#2d3748] text-sm sm:text-base leading-relaxed font-serif">
              <div>
                <span 
                  className="float-left text-5xl sm:text-6xl font-black text-[#0f1d38] mr-3 leading-none select-none"
                  style={{ fontFamily: "'Cinzel', Georgia, serif" }}
                >
                  E
                </span>
                <p className="pt-1">
                  -Summit '26, <span className="text-[#b38226] font-bold">RenAIssance: Quills To Capital</span>, is the flagship entrepreneurship summit of E-Cell JNCTPU Bhopal, celebrating the rebirth of the entrepreneurial spirit.
                </p>
              </div>

              <p className="text-[#3b4758]">
                Just as the Renaissance turned scholars into visionaries and poets into architects of civilization, we transform ideas into enterprises and dreamers into founders who reshape the world.
              </p>
            </div>
          </div>

          {/* 3D Wooden Roller Pin on Right Edge of Scroll */}
          <div 
            className="w-6 sm:w-8 relative z-20 my-[-6px] rounded-r-md shadow-2xl flex flex-col justify-between border-y border-r border-[#3d200a]"
            style={{
              background: "linear-gradient(90deg, #42230e 0%, #855325 35%, #b97f43 55%, #76451a 80%, #301708 100%)",
              boxShadow: "5px 0 15px rgba(0,0,0,0.35)"
            }}
          >
            <div className="w-full h-3 bg-[#241205] rounded-tr-sm" />
            <div className="w-full h-3 bg-[#241205] rounded-br-sm" />
          </div>
        </div>

        {/* ================= RIGHT: 4 RUNNING NUMBER STAT CARDS ================= */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-5">
          
          {/* Card 1: Fest Reach (Running upto 700,000) */}
          <div className="bg-[#0b172a] border border-[#c5a059]/40 hover:border-[#f3ca65] rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-2xl transition-all duration-300 hover:-translate-y-1.5 min-h-[190px]">
            <div className="text-[#f1cb68] mb-1">
              <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18M4 18h16M4 10h16M12 2L2 7h20L12 2zM6 10v8M10 10v8M14 10v8M18 10v8" />
              </svg>
            </div>
            
            <div>
              <h3 
                className="text-2xl sm:text-3xl font-black text-white tracking-wider font-mono tabular-nums"
                style={{ fontFamily: "'Cinzel', monospace, serif" }}
              >
                <CounterItem value={7000} duration={2400} isInView={isInView} />+
              </h3>
              
              <div className="w-6 h-4 mx-auto my-2 rounded-[2px] bg-[#14233c] border border-[#c5a059]/70 flex items-center justify-center text-[10px] text-[#f7c844]">
                ✦
              </div>

              <p 
                className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#d8b056] uppercase"
                style={{ fontFamily: "'Cinzel', 'Montserrat', sans-serif" }}
              >
                FEST REACH
              </p>
            </div>
          </div>

          {/* Card 2: Attendees (Running upto 3,000) */}
          <div className="bg-[#0b172a] border border-[#c5a059]/40 hover:border-[#f3ca65] rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-2xl transition-all duration-300 hover:-translate-y-1.5 min-h-[190px]">
            <div className="text-[#f1cb68] mb-1">
              <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>

            <div>
              <h3 
                className="text-2xl sm:text-3xl font-black text-white tracking-wider font-mono tabular-nums"
                style={{ fontFamily: "'Cinzel', monospace, serif" }}
              >
                <CounterItem value={3000} duration={2000} isInView={isInView} />+
              </h3>

              <div className="w-6 h-4 mx-auto my-2 rounded-[2px] bg-[#14233c] border border-[#c5a059]/70 flex items-center justify-center text-[10px] text-[#f7c844]">
                ✦
              </div>

              <p 
                className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#d8b056] uppercase"
                style={{ fontFamily: "'Cinzel', 'Montserrat', sans-serif" }}
              >
                ATTENDEES
              </p>
            </div>
          </div>

          {/* Card 3: Registrations (Running upto 5,000) */}
          <div className="bg-[#0b172a] border border-[#c5a059]/40 hover:border-[#f3ca65] rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-2xl transition-all duration-300 hover:-translate-y-1.5 min-h-[190px]">
            <div className="text-[#f1cb68] mb-1">
              <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
              </svg>
            </div>

            <div>
              <h3 
                className="text-2xl sm:text-3xl font-black text-white tracking-wider font-mono tabular-nums"
                style={{ fontFamily: "'Cinzel', monospace, serif" }}
              >
                <CounterItem value={500} duration={2200} isInView={isInView} />+
              </h3>

              <div className="w-6 h-4 mx-auto my-2 rounded-[2px] bg-[#14233c] border border-[#c5a059]/70 flex items-center justify-center text-[10px] text-[#f7c844]">
                ✦
              </div>

              <p 
                className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#d8b056] uppercase"
                style={{ fontFamily: "'Cinzel', 'Montserrat', sans-serif" }}
              >
                REGISTRATIONS
              </p>
            </div>
          </div>

          {/* Card 4: Campus Strength (Running upto 3,500) */}
          <div className="bg-[#0b172a] border border-[#c5a059]/40 hover:border-[#f3ca65] rounded-2xl p-6 flex flex-col items-center justify-between text-center shadow-2xl transition-all duration-300 hover:-translate-y-1.5 min-h-[190px]">
            <div className="text-[#f1cb68] mb-1">
              <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
              </svg>
            </div>

            <div>
              <h3 
                className="text-2xl sm:text-3xl font-black text-white tracking-wider font-mono tabular-nums"
                style={{ fontFamily: "'Cinzel', monospace, serif" }}
              >
                <CounterItem value={3500} duration={2000} isInView={isInView} />+
              </h3>

              <div className="w-6 h-4 mx-auto my-2 rounded-[2px] bg-[#14233c] border border-[#c5a059]/70 flex items-center justify-center text-[10px] text-[#f7c844]">
                ✦
              </div>

              <p 
                className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-[#d8b056] uppercase"
                style={{ fontFamily: "'Cinzel', 'Montserrat', sans-serif" }}
              >
                CAMPUS STRENGTH
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}