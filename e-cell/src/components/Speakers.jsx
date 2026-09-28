import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Speakers() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/speakers");
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
    <section id="speakers" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#D1BE94] min-h-screen text-[#0b1626]">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold font-cinzel tracking-widest text-[#081220] uppercase drop-shadow-sm">
          EMINENT SPEAKERS
        </h2>
        <p className="mt-3 text-sm md:text-base text-slate-800 italic font-serif">
          Glimpses of visionaries, industry leaders, and innovators gracing E-Summit.
        </p>
      </div>

      {/* Speakers Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 justify-items-center">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="w-full max-w-[315px] h-[370px] bg-[#071322]/80 rounded-[22px] p-4 flex flex-col items-center justify-between animate-pulse border border-[#c6a45c]/30"
              >
                <div className="w-32 h-32 rounded-full bg-slate-800/80 mt-4" />
                <div className="w-3/4 h-6 bg-slate-800/80 rounded mb-2" />
                <div className="w-1/2 h-3 bg-slate-800/80 rounded mb-6" />
              </div>
            ))}
          </div>
        ) : speakers.length === 0 ? (
          <div className="text-center py-16 text-slate-700 font-serif">
            No speakers announced yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 justify-items-center">
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
                  key={speaker._id}
                  style={{
                    animationDelay: `${index * 130}ms`,
                  }}
                  className="animate-card-load opacity-0 relative w-full max-w-[315px] h-[370px] bg-[#071322] rounded-[22px] p-2 
                             border border-[#c6a45c]/40 cursor-pointer
                             transition-all duration-500 ease-out
                             hover:-translate-y-2.5 hover:scale-[1.02]
                             hover:border-[#e5c378]
                             hover:shadow-[0_20px_45px_rgba(212,175,55,0.35),0_0_25px_rgba(229,195,120,0.3)]
                             group"
                >
                  {/* Outer Inner Golden Border */}
                  <div className="w-full h-full rounded-[16px] border border-[#c6a45c]/70 group-hover:border-[#e5c378] p-3.5 flex flex-col items-center justify-between relative overflow-hidden transition-colors duration-500">
                    
                    {/* Constellation Lines Effect */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none">
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

                    {/* Circular Portrait with Golden Ring */}
                    <div className="mt-2 relative z-10 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full p-[3px] border-2 border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_25px_rgba(229,195,120,0.6)] group-hover:scale-105 bg-gradient-to-b from-[#e5c378] via-[#a88434] to-[#e5c378] transition-all duration-500">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border border-[#071322]">
                          <img
                            src={displayImage}
                            alt={displayName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/400x400/0b1626/f3ca65?text=Speaker";
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Speaker Info Container */}
                    <div className="w-full text-center z-10 flex flex-col items-center mb-1">
                      {/* Name - Increased Font Size */}
                      <h3 className="font-cinzel text-[17px] md:text-[18px] font-bold tracking-[0.16em] text-[#f2e3c6] group-hover:text-white uppercase leading-snug line-clamp-2 min-h-[44px] flex items-center justify-center transition-colors duration-300 px-1">
                        {displayName}
                      </h3>

                      {/* Golden Star Divider */}
                      <div className="flex items-center justify-center w-full my-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <span className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-[#c6a45c] group-hover:to-[#e5c378]"></span>
                        <span className="mx-2 text-[#e5c378] text-[10px] group-hover:rotate-45 transition-transform duration-500">✦</span>
                        <span className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-[#c6a45c] group-hover:to-[#e5c378]"></span>
                      </div>

                      {/* Designation */}
                      <p className="font-cinzel text-[11px] tracking-[0.12em] text-[#c6a45c] group-hover:text-[#f3ca65] uppercase font-medium leading-relaxed line-clamp-2 px-2 transition-colors duration-300">
                        {displayRole}
                      </p>

                      {/* Subtle LinkedIn Link */}
                      {linkedin && (
                        <a
                          href={linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1.5 text-[10px] text-[#e5c378]/70 hover:text-white tracking-widest flex items-center gap-1 uppercase transition-colors"
                        >
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
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