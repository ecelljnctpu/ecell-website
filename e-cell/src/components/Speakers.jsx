// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { API_BASE } from "../config";

// export default function Speakers() {
//   const [speakers, setSpeakers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSpeakers = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/api/speakers`);
//         setSpeakers(res.data || []);
//       } catch (err) {
//         console.error("Error fetching speakers:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSpeakers();
//   }, []);

//   return (
//     <section id="speakers" className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-[#D1BE94] text-[#0b1626]">
//       {/* Header Section */}
//       <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
//         <h2 className="text-3xl md:text-5xl font-extrabold font-cinzel tracking-widest text-[#081220] uppercase drop-shadow-sm">
//           EMINENT SPEAKERS
//         </h2>
//         <p className="mt-3 text-sm md:text-base text-slate-800 italic font-serif">
//           Glimpses of visionaries, industry leaders, and innovators gracing E-Summit.
//         </p>
//       </div>

//       {/* Speakers Grid - Expanded Spacious Layout */}
//       <div className="max-w-7xl mx-auto">
//         {loading ? (
//           <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
//             {[1, 2, 3].map((n) => (
//               <div
//                 key={n}
//                 className="w-full max-w-[320px] h-[420px] bg-[#071322]/85 rounded-[22px] p-4 flex flex-col items-center justify-between animate-pulse border border-[#c6a45c]/30"
//               >
//                 <div className="w-32 h-32 rounded-full bg-slate-800/80 mt-4" />
//                 <div className="w-3/4 h-6 bg-slate-800/80 rounded mt-4" />
//                 <div className="w-1/2 h-4 bg-slate-800/80 rounded mb-6" />
//               </div>
//             ))}
//           </div>
//         ) : speakers.length === 0 ? (
//           <div className="text-center py-10 text-sm font-serif text-slate-800">
//             No speakers announced yet.
//           </div>
//         ) : (
//           <div className="flex flex-wrap justify-center gap-7 sm:gap-9">
//             {speakers.map((speaker, index) => {
//               const displayImage =
//                 speaker.photoUrl ||
//                 speaker.imageUrl ||
//                 speaker.photo ||
//                 speaker.image;
//               const displayName = speaker.name || "Speaker Name";
//               const displayRole =
//                 speaker.designation || speaker.role || "Keynote Speaker";
//               const linkedin = speaker.linkedinUrl || speaker.linkedin;

//               return (
//                 <div
//                   key={speaker._id || index}
//                   style={{
//                     animationDelay: `${index * 120}ms`,
//                   }}
//                   className="relative w-full max-w-[320px] min-h-[420px] bg-[#071322] rounded-[22px] p-2
//                              border border-[#c6a45c]/40 cursor-pointer
//                              transition-all duration-400 ease-out
//                              hover:-translate-y-2.5 hover:scale-[1.02]
//                              hover:border-[#e5c378]
//                              hover:shadow-[0_20px_40px_rgba(0,0,0,0.45),0_0_30px_rgba(212,175,55,0.28)]
//                              group"
//                 >
//                   {/* Subtle Background Radial Glow on Hover */}
//                   <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-[#e5c378]/10 via-transparent to-[#e5c378]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

//                   {/* Inner Golden Border Container */}
//                   <div className="w-full h-full rounded-[18px] border border-[#c6a45c]/60 group-hover:border-[#e5c378] p-4 flex flex-col items-center justify-between relative overflow-hidden transition-colors duration-300">
                    
//                     {/* Constellation Lines Effect */}
//                     <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-400 pointer-events-none">
//                       <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//                         <circle cx="18%" cy="25%" r="2" fill="#e5c378" />
//                         <circle cx="82%" cy="20%" r="2" fill="#e5c378" />
//                         <circle cx="88%" cy="50%" r="2.5" fill="#e5c378" />
//                         <circle cx="12%" cy="55%" r="2" fill="#e5c378" />
//                         <line x1="18%" y1="25%" x2="40%" y2="15%" stroke="#e5c378" strokeWidth="0.7" />
//                         <line x1="82%" y1="20%" x2="88%" y2="50%" stroke="#e5c378" strokeWidth="0.7" />
//                         <line x1="12%" y1="55%" x2="35%" y2="65%" stroke="#e5c378" strokeWidth="0.7" />
//                       </svg>
//                     </div>

//                     {/* Circular Portrait with Golden Ring - Enlarged Size */}
//                     <div className="mt-3 relative z-10 flex items-center justify-center">
//                       <div className="w-32 h-32 rounded-full p-[3px] border border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_24px_rgba(229,195,120,0.65)] group-hover:scale-108 bg-gradient-to-b from-[#e5c378] via-[#a88434] to-[#e5c378] transition-all duration-400">
//                         <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-[#071322]">
//                           <img
//                             src={displayImage}
//                             alt={displayName}
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src =
//                                 "https://placehold.co/400x400/0b1626/f3ca65?text=Speaker";
//                             }}
//                           />
//                         </div>
//                       </div>
//                     </div>

//                     {/* Speaker Info Container */}
//                     <div className="w-full text-center z-10 flex flex-col items-center mt-3 mb-1">
//                       {/* Name */}
//                       <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.14em] text-[#f2e3c6] group-hover:text-white uppercase leading-snug line-clamp-2 min-h-[44px] flex items-center justify-center transition-colors duration-200 px-2">
//                         {displayName}
//                       </h3>

//                       {/* Golden Star Divider */}
//                       <div className="flex items-center justify-center w-full my-2 opacity-80 group-hover:opacity-100 transition-opacity">
//                         <span className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-[#c6a45c] group-hover:to-[#e5c378]"></span>
//                         <span className="mx-2 text-[#e5c378] text-[11px] group-hover:rotate-45 group-hover:scale-125 transition-all duration-300">✦</span>
//                         <span className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-[#c6a45c] group-hover:to-[#e5c378]"></span>
//                       </div>

//                       {/* Designation */}
//                       <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.12em] text-[#c6a45c] group-hover:text-[#f3ca65] uppercase font-semibold leading-relaxed line-clamp-2 px-2 min-h-[34px] flex items-center justify-center transition-colors duration-200">
//                         {displayRole}
//                       </p>

//                       {/* Enhanced LinkedIn Connect Button */}
//                       {linkedin && (
//                         <a
//                           href={linkedin}
//                           target="_blank"
//                           rel="noreferrer"
//                           className="mt-3 px-3.5 py-1 rounded-full text-[10px] tracking-widest text-[#e5c378] border border-[#c6a45c]/50 bg-[#c6a45c]/5 hover:bg-[#c6a45c] hover:text-[#071322] hover:border-[#e5c378] flex items-center gap-1.5 uppercase transition-all duration-300 shadow-sm"
//                         >
//                           <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
//                             <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
//                           </svg>
//                           Connect
//                         </a>
//                       )}
//                     </div>

//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }







import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE } from "../config";

export default function Speakers() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // 1. Fetch Speakers Data
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

  // 2. Scroll Trigger Effect (Jaise hi screen par scroll karein, trigger ho)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Ek baar visible ho gaya toh trigger hone ke baad observer disconnect kar do
          observer.disconnect();
        }
      },
      {
        threshold: 0.15, // Jab 15% section screen par dikhe tab trigger ho
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="speakers"
      ref={sectionRef}
      className="py-14 sm:py-18 px-4 sm:px-6 lg:px-8 bg-[#D1BE94] text-[#0b1626] overflow-hidden"
    >
      {/* Header Section - Smooth Fade In from Top */}
      <div
        className={`max-w-4xl mx-auto text-center mb-10 sm:mb-14 transition-all duration-700 ease-out transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        <h2 className="text-3xl md:text-5xl font-extrabold font-cinzel tracking-widest text-[#081220] uppercase drop-shadow-sm">
          EMINENT SPEAKERS
        </h2>
        <p className="mt-3 text-sm md:text-base text-slate-800 italic font-serif">
          Glimpses of visionaries, industry leaders, and innovators gracing E-Summit.
        </p>
      </div>

      {/* Speakers Grid - Scroll Reveal with Staggered Delays */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="w-full max-w-[320px] h-[420px] bg-[#071322]/85 rounded-[22px] p-4 flex flex-col items-center justify-between animate-pulse border border-[#c6a45c]/30"
              >
                <div className="w-32 h-32 rounded-full bg-slate-800/80 mt-4" />
                <div className="w-3/4 h-6 bg-slate-800/80 rounded mt-4" />
                <div className="w-1/2 h-4 bg-slate-800/80 rounded mb-6" />
              </div>
            ))}
          </div>
        ) : speakers.length === 0 ? (
          <div className="text-center py-10 text-sm font-serif text-slate-800">
            No speakers announced yet.
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-7 sm:gap-9">
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
                    // Har card ek ke baad ek float karke upar aayega (Stagger effect)
                    transitionDelay: `${index * 150}ms`,
                  }}
                  className={`relative w-full max-w-[320px] min-h-[420px] bg-[#071322] rounded-[22px] p-2
                             border border-[#c6a45c]/40 cursor-pointer
                             transition-all duration-700 ease-out
                             hover:-translate-y-2.5 hover:scale-[1.02]
                             hover:border-[#e5c378]
                             hover:shadow-[0_20px_40px_rgba(0,0,0,0.45),0_0_30px_rgba(212,175,55,0.28)]
                             group transform ${
                               isVisible
                                 ? "opacity-100 translate-y-0 scale-100"
                                 : "opacity-0 translate-y-16 scale-95"
                             }`}
                >
                  {/* Subtle Background Radial Glow on Hover */}
                  <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-[#e5c378]/10 via-transparent to-[#e5c378]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" />

                  {/* Inner Golden Border Container */}
                  <div className="w-full h-full rounded-[18px] border border-[#c6a45c]/60 group-hover:border-[#e5c378] p-4 flex flex-col items-center justify-between relative overflow-hidden transition-colors duration-300">
                    
                    {/* Constellation Lines Effect */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-400 pointer-events-none">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18%" cy="25%" r="2" fill="#e5c378" />
                        <circle cx="82%" cy="20%" r="2" fill="#e5c378" />
                        <circle cx="88%" cy="50%" r="2.5" fill="#e5c378" />
                        <circle cx="12%" cy="55%" r="2" fill="#e5c378" />
                        <line x1="18%" y1="25%" x2="40%" y2="15%" stroke="#e5c378" strokeWidth="0.7" />
                        <line x1="82%" y1="20%" x2="88%" y2="50%" stroke="#e5c378" strokeWidth="0.7" />
                        <line x1="12%" y1="55%" x2="35%" y2="65%" stroke="#e5c378" strokeWidth="0.7" />
                      </svg>
                    </div>

                    {/* Circular Portrait with Golden Ring */}
                    <div className="mt-3 relative z-10 flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full p-[3px] border border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_24px_rgba(229,195,120,0.65)] group-hover:scale-108 bg-gradient-to-b from-[#e5c378] via-[#a88434] to-[#e5c378] transition-all duration-400">
                        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-[#071322]">
                          <img
                            src={displayImage}
                            alt={displayName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
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
                    <div className="w-full text-center z-10 flex flex-col items-center mt-3 mb-1">
                      {/* Name */}
                      <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.14em] text-[#f2e3c6] group-hover:text-white uppercase leading-snug line-clamp-2 min-h-[44px] flex items-center justify-center transition-colors duration-200 px-2">
                        {displayName}
                      </h3>

                      {/* Golden Star Divider */}
                      <div className="flex items-center justify-center w-full my-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <span className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-[#c6a45c] group-hover:to-[#e5c378]"></span>
                        <span className="mx-2 text-[#e5c378] text-[11px] group-hover:rotate-45 group-hover:scale-125 transition-all duration-300">✦</span>
                        <span className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-[#c6a45c] group-hover:to-[#e5c378]"></span>
                      </div>

                      {/* Designation */}
                      <p className="font-cinzel text-[11px] sm:text-xs tracking-[0.12em] text-[#c6a45c] group-hover:text-[#f3ca65] uppercase font-semibold leading-relaxed line-clamp-2 px-2 min-h-[34px] flex items-center justify-center transition-colors duration-200">
                        {displayRole}
                      </p>

                      {/* LinkedIn Connect Button */}
                      {linkedin && (
                        <a
                          href={linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 px-3.5 py-1 rounded-full text-[10px] tracking-widest text-[#e5c378] border border-[#c6a45c]/50 bg-[#c6a45c]/5 hover:bg-[#c6a45c] hover:text-[#071322] hover:border-[#e5c378] flex items-center gap-1.5 uppercase transition-all duration-300 shadow-sm"
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