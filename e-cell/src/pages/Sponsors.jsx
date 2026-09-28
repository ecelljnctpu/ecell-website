import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import { API_BASE } from "../config";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Live fetch function with timestamp cache-buster
  const fetchSponsors = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/sponsors?t=${Date.now()}`
      );
      setSponsors(res.data || []);
    } catch (err) {
      console.error("Error fetching live sponsors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  // Sponsors category grouping
  const titleSponsors = sponsors.filter((s) => s.tier === "Title Sponsor");
  const platinumSponsors = sponsors.filter(
    (s) => s.tier === "Platinum Sponsor"
  );
  const otherSponsors = sponsors.filter(
    (s) => s.tier !== "Title Sponsor" && s.tier !== "Platinum Sponsor"
  );

  return (
    <div className="min-h-screen bg-[#D1BE94] text-[#0b1626] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold font-cinzel tracking-widest text-[#081220] uppercase drop-shadow-sm">
          OUR VALUED PARTNERS
        </h1>
        <div className="flex items-center justify-center my-3 opacity-75">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#081220]"></span>
          <span className="mx-2 text-[#081220] text-xs">✦</span>
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#081220]"></span>
        </div>
        <p className="mt-2 text-sm md:text-base text-slate-800 italic font-serif">
          Empowering innovation and youth leadership at E-Summit.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="text-center py-20 text-[#081220] font-cinzel tracking-wider">
            LOADING PARTNERS...
          </div>
        ) : sponsors.length === 0 ? (
          <div className="text-center py-12 text-slate-700 font-serif">
            No sponsors active at the moment.
          </div>
        ) : (
          <div className="space-y-16">
            {/* Title Sponsors */}
            {titleSponsors.length > 0 && (
              <div className="text-center">
                <h3 className="text-xs uppercase font-cinzel tracking-widest text-[#5c4a28] font-bold mb-6">
                  — TITLE PARTNER —
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-8">
                  {titleSponsors.map((item) => (
                    <SponsorCard key={item._id} item={item} size="large" />
                  ))}
                </div>
              </div>
            )}

            {/* Platinum Sponsors */}
            {platinumSponsors.length > 0 && (
              <div className="text-center">
                <h3 className="text-xs uppercase font-cinzel tracking-widest text-[#5c4a28] font-bold mb-6">
                  — PLATINUM PARTNERS —
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {platinumSponsors.map((item) => (
                    <SponsorCard key={item._id} item={item} size="medium" />
                  ))}
                </div>
              </div>
            )}

            {/* Other / Associate Sponsors */}
            {otherSponsors.length > 0 && (
              <div className="text-center">
                <h3 className="text-xs uppercase font-cinzel tracking-widest text-[#5c4a28] font-bold mb-6">
                  — ASSOCIATE PARTNERS —
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {otherSponsors.map((item) => (
                    <SponsorCard key={item._id} item={item} size="small" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================
            BECOME A SPONSOR SECTION (RETAINED)
            ========================================= */}
        <div className="mt-24 max-w-4xl mx-auto bg-[#071322] border-2 border-[#c6a45c]/50 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle star graphic accents */}
          <div className="absolute top-4 left-6 text-[#c6a45c] text-xs opacity-50">✦</div>
          <div className="absolute bottom-4 right-6 text-[#c6a45c] text-xs opacity-50">✦</div>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-cinzel tracking-wider text-[#f2e3c6] uppercase">
            BECOME A SPONSOR
          </h2>

          <div className="flex items-center justify-center my-3 opacity-75">
            <span className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-[#c6a45c]"></span>
            <span className="mx-2 text-[#e5c378] text-[10px]">✦</span>
            <span className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-[#c6a45c]"></span>
          </div>

          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-serif leading-relaxed">
            Partner with Central India's largest entrepreneurship conclave. Showcase your brand, connect with top student innovators, leaders, and investors.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:ecelljnctpu@gmail.com?subject=Sponsorship%20Inquiry%20-%20E-Summit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#c6a45c] hover:bg-[#d8b872] text-[#071322] font-cinzel font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-[#c6a45c]/30 hover:-translate-y-0.5"
            >
              <Mail size={16} /> Contact Us to Sponsor
            </a>

            <Link
              to="/#contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0b1a2d] hover:bg-[#10243f] text-[#f2e3c6] border border-[#c6a45c]/40 font-cinzel font-semibold text-xs uppercase tracking-widest rounded-xl transition-all hover:-translate-y-0.5"
            >
              Get Brochure <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Single Sponsor Card Component
function SponsorCard({ item, size }) {
  const logo = item.logoUrl || item.imageUrl || item.logo;
  const isLarge = size === "large";

  return (
    <a
      href={item.websiteUrl || "#"}
      target={item.websiteUrl ? "_blank" : "_self"}
      rel="noreferrer"
      className={`bg-[#071322] border border-[#c6a45c]/40 rounded-2xl p-5 flex flex-col items-center justify-center shadow-xl hover:-translate-y-1.5 hover:border-[#c6a45c] transition-all duration-300 group ${
        isLarge ? "w-72 h-44" : "w-56 h-36"
      }`}
    >
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <img
          src={logo}
          alt={item.name}
          className="max-h-full max-w-full object-contain filter brightness-95 group-hover:brightness-110 group-hover:scale-105 transition-all duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x200/071322/c6a45c?text=Sponsor";
          }}
        />
      </div>
      <span className="text-[11px] font-cinzel tracking-wider text-[#c6a45c] mt-2 opacity-80 group-hover:opacity-100">
        {item.name}
      </span>
    </a>
  );
}