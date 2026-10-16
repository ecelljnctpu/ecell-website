import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../config";

export default function Speakers() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/speakers`);
        setSpeakers(res.data || []);
      } catch (err) {
        console.error("Error fetching speakers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSpeakers();
  }, []);

  return (
    <section id="speakers" className="py-12 sm:py-14 px-4 sm:px-6 lg:px-8 bg-[#D1BE94] text-[#0b1626]">
      {/* Header Section - Reduced Margins */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold font-cinzel tracking-widest text-[#081220] uppercase drop-shadow-sm">
          EMINENT SPEAKERS
        </h2>
        <p className="mt-2 text-xs md:text-sm text-slate-800 italic font-serif">
          Glimpses of visionaries, industry leaders, and innovators gracing E-Summit.
        </p>
      </div>

      {/* Speakers Grid - Compact Sizing & Balanced Spacing */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="w-full max-w-[260px] h-[300px] bg-[#071322]/80 rounded-[18px] p-3 flex flex-col items-center justify-between animate-pulse border border-[#c6a45c]/30"
              >
                <div className="w-24 h-24 rounded-full bg-slate-800/80 mt-2" />
                <div className="w-3/4 h-5 bg-slate-800/80 rounded mb-1" />
                <div className="w-1/2 h-3 bg-slate-800/80 rounded mb-4" />
              </div>
            ))}
          </div>
        ) : speakers.length === 0 ? (
          <div className="text-center py-8 text-xs font-serif text-slate-800">
            No speakers announced yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 justify-items-center">
            {speakers.map((speaker, index) => {
              const displayImage =
                speaker.photoUrl ||
                speaker.imageUrl ||
                speaker.photo ||
                speaker.image;
              const displayName = speaker.name || "Speaker Name";
              const displayRole =
                speaker.designation || speaker.role || "Keynote Speaker";
              const linkedin = speaker.linkedinUrl || speaker.linkedin;

              return (
                <div
                  key={speaker._id || index}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                  className="animate-card-load relative w-full max-w-[260px] h-[305px] bg-[#071322] rounded-[18px] p-1.5 
                             border border-[#c6a45c]/40 cursor-pointer
                             transition-all duration-300 ease-out
                             hover:-translate-y-1.5 hover:scale-[1.02]
                             hover:border-[#e5c378]
                             hover:shadow-[0_12px_28px_rgba(212,175,55,0.25)]
                             group"
                >
                  {/* Outer Inner Golden Border */}
                  <div className="w-full h-full rounded-[14px] border border-[#c6a45c]/60 group-hover:border-[#e5c378] p-2.5 flex flex-col items-center justify-between relative overflow-hidden transition-colors duration-300">
                    
                    {/* Constellation Lines Effect */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20%" cy="30%" r="2" fill="#e5c378" />
                        <circle cx="80%" cy="25%" r="1.5" fill="#e5c378" />
                        <circle cx="85%" cy="45%" r="2" fill="#e5c378" />
                        <circle cx="15%" cy="50%" r="1.5" fill="#e5c378" />
                        <line x1="20%" y1="30%" x2="45%" y2="20%" stroke="#e5c378" strokeWidth="0.6" />
                        <line x1="80%" y1="25%" x2="85%" y2="45%" stroke="#e5c378" strokeWidth="0.6" />
                        <line x1="15%" y1="50%" x2="30%" y2="60%" stroke="#e5c378" strokeWidth="0.6" />
                      </svg>
                    </div>

                    {/* Circular Portrait with Golden Ring - Scaled Down */}
                    <div className="mt-1 relative z-10 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full p-[2px] border border-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.25)] group-hover:shadow-[0_0_18px_rgba(229,195,120,0.5)] group-hover:scale-105 bg-gradient-to-b from-[#e5c378] via-[#a88434] to-[#e5c378] transition-all duration-300">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border border-[#071322]">
                          <img
                            src={displayImage}
                            alt={displayName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/300x300/0b1626/f3ca65?text=Speaker";
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Speaker Info Container */}
                    <div className="w-full text-center z-10 flex flex-col items-center mb-0.5">
                      {/* Name */}
                      <h3 className="font-cinzel text-[14px] md:text-[15px] font-bold tracking-[0.12em] text-[#f2e3c6] group-hover:text-white uppercase leading-tight line-clamp-2 min-h-[36px] flex items-center justify-center transition-colors duration-200 px-1">
                        {displayName}
                      </h3>

                      {/* Golden Star Divider */}
                      <div className="flex items-center justify-center w-full my-1 opacity-75 group-hover:opacity-100 transition-opacity">
                        <span className="h-[0.5px] w-8 bg-gradient-to-r from-transparent to-[#c6a45c] group-hover:to-[#e5c378]"></span>
                        <span className="mx-1.5 text-[#e5c378] text-[9px] group-hover:rotate-45 transition-transform duration-300">✦</span>
                        <span className="h-[0.5px] w-8 bg-gradient-to-l from-transparent to-[#c6a45c] group-hover:to-[#e5c378]"></span>
                      </div>

                      {/* Designation */}
                      <p className="font-cinzel text-[10px] tracking-[0.1em] text-[#c6a45c] group-hover:text-[#f3ca65] uppercase font-medium leading-snug line-clamp-1 px-1 transition-colors duration-200">
                        {displayRole}
                      </p>

                      {/* Subtle LinkedIn Link */}
                      {linkedin && (
                        <a
                          href={linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 text-[9px] text-[#e5c378]/80 hover:text-white tracking-wider flex items-center gap-1 uppercase transition-colors"
                        >
                          <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                          </svg>
                          Connect
                        </a>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}