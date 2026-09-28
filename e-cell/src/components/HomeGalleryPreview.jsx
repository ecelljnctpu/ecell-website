import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight, Play, Pause } from "lucide-react";

export default function HomeGalleryPreview() {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/gallery");
        setItems(res.data || []);
      } catch (err) {
        console.error("Gallery preview fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (!isPlaying || items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, items]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  if (loading || items.length === 0) {
    return null;
  }

  const currentItem = items[currentIndex];
  const currentImage = currentItem?.photoUrl || currentItem?.imageUrl;
  const currentTitle = currentItem?.eventName || currentItem?.title || "E-Summit Moment";

  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 py-16 bg-[#D1BE94]">
      {/* Gallery Section Heading */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold font-cinzel tracking-widest text-[#081220] uppercase drop-shadow-sm">
          GALLERY HIGHLIGHTS
        </h2>
        
        {/* Subtle Star/Divider Line */}
        <div className="flex items-center justify-center my-3 opacity-75">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#081220]"></span>
          <span className="mx-2 text-[#081220] text-xs">✦</span>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#081220]"></span>
        </div>

        <p className="text-sm md:text-base text-slate-800 italic font-serif">
          Glimpses of innovation, passion, and grandeur captured from E-Summit.
        </p>
      </div>

      {/* Frame Container */}
      <div className="relative w-full max-w-6xl mx-auto h-[460px] md:h-[500px] rounded-[28px] overflow-hidden bg-[#070d18] border border-[#0b1626]/20 shadow-2xl">
        
        {/* Background Highlight Image */}
        <img
          src={currentImage}
          alt={currentTitle}
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/1200x600/0b1626/f3ca65?text=Gallery+Highlight";
          }}
        />

        {/* Gradient Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        {/* Center Play / Pause Floating Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#20293d]/80 hover:bg-[#2c3852] text-white flex items-center justify-center backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300 hover:scale-110 z-20"
        >
          {isPlaying ? <Pause size={26} fill="white" /> : <Play size={26} className="ml-1" fill="white" />}
        </button>

        {/* Bottom Controls Bar */}
        <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-10 flex items-end justify-between z-20">
          <div>
            <span className="text-[11px] uppercase tracking-widest font-semibold text-[#f3ca65] bg-[#070d18]/80 px-3.5 py-1 rounded-full border border-[#c5a059]/40">
              MEMORIES
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-cinzel text-white mt-2 drop-shadow-lg">
              {currentTitle}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/gallery"
              className="flex items-center gap-2 text-xs font-cinzel text-[#f3ca65] bg-[#070d18]/90 hover:bg-[#c5a059] hover:text-[#070d18] px-4 py-2.5 rounded-xl border border-[#c5a059]/40 transition-all font-semibold"
            >
              VIEW ALL <ArrowRight size={14} />
            </Link>
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-105"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-105"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}