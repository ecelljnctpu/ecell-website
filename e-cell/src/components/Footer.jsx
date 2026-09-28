import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D2344] border-t border-[#c5a059]/30 text-white relative z-10 select-none font-serif">
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-10 lg:px-12">
        
        {/* Main 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#c5a059]/25 items-start">
          
          {/* ================= COLUMN 1: Welcome & Email Us Button ================= */}
          <div className="md:col-span-5 space-y-6">
            <p className="text-sm sm:text-base italic text-slate-200 font-serif leading-relaxed">
              E-SUMMIT 2026 welcomes all the enthusiasts who believe that it's all about making the right choices and taking the plunge.
            </p>

            <div>
              <p className="text-[11px] font-cinzel font-bold tracking-[0.2em] text-[#f3ca65] uppercase mb-1">
                LET'S INNOVATE, LET'S TRANSFORM, LET'S break the monotony.
              </p>
            </div>

            <div className="pt-2">
              <a
                href="mailto:ecelljnctpu@gmail.com"
                className="inline-block px-8 py-3 bg-transparent hover:bg-[#c5a059]/15 text-[#f3ca65] border border-[#c5a059] font-cinzel text-xs font-bold tracking-[0.25em] uppercase rounded-[2px] transition-all shadow-[0_0_15px_rgba(197,160,89,0.15)]"
              >
                EMAIL US
              </a>
            </div>
          </div>

          {/* ================= COLUMN 2: Contact For Events (No Numbers) ================= */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <h3 
                className="font-cinzel text-base sm:text-lg font-bold text-[#f3ca65] tracking-wider uppercase pb-2 border-b border-[#c5a059]/40 inline-block"
              >
                Contact For Events
              </h3>
            </div>

            <div className="space-y-4 text-xs tracking-wider">
              <div>
                <p className="font-cinzel font-bold text-slate-200 tracking-[0.18em]">LAKSHYADEEP</p>
              </div>

              <div>
                <p className="font-cinzel font-bold text-slate-200 tracking-[0.18em]">RAJNEESH SAHU</p>
              </div>

              <div className="pt-2">
                <p className="font-cinzel font-bold text-[#f3ca65] tracking-[0.18em] uppercase mb-1">EMAIL :</p>
                <p className="font-cinzel text-slate-300 tracking-[0.15em] lowercase">ecelljnctpu@gmail.com</p>
              </div>
            </div>
          </div>

          {/* ================= COLUMN 3: Social Follow & Admin ================= */}
          <div className="md:col-span-3 space-y-6 flex flex-col items-start md:items-start">
            <div>
              <h3 
                className="font-cinzel text-base sm:text-lg font-bold text-[#f3ca65] tracking-wider uppercase pb-2 border-b border-[#c5a059]/40 inline-block"
              >
                Follow us on :
              </h3>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-4 pt-1">
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/company/ecell-jnctpu/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="w-11 h-11 rounded-full bg-[#09172e] border border-[#c5a059]/50 hover:border-[#f3ca65] text-[#e5b85c] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28"/></svg>
              </a>

              {/* Twitter / X */}
              <a 
                href="https://x.com/Ecelljnctpu" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Twitter"
                className="w-11 h-11 rounded-full bg-[#09172e] border border-[#c5a059]/50 hover:border-[#f3ca65] text-[#e5b85c] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>

              {/* Instagram */}
              <a 
                href="https://www.instagram.com/ecell.jnctpu?stkn=cXh2N2Z3bmVhdzVz" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-[#09172e] border border-[#c5a059]/50 hover:border-[#f3ca65] text-[#e5b85c] hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>

            {/* Secret Admin Portal Link */}
            <div className="pt-2">
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#07152b] border border-[#c5a059]/40 hover:border-[#f3ca65] text-[#e5b85c] text-[10px] font-cinzel tracking-widest transition-all shadow-sm"
              >
                <ShieldCheck size={14} /> ADMIN PORTAL
              </Link>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Bar with JNCT Professional University */}
        <div className="pt-8 text-center text-xs text-slate-400 font-serif">
          <p>© 2026 JNCT Professional University. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}