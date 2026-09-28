import React, { useState, useEffect } from "react";
import axios from "axios";
import { Sparkles, ExternalLink } from "lucide-react";
import { API_BASE } from "../config";

export default function Team() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/team`);
        // console.log("Database Team Data:", res.data);
        // Sirf database ka data set hoga, koi dummy fallback nahi
        setTeamMembers(res.data || []);
      } catch (err) {
        console.error("Error fetching team:", err);
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const categories = [
    { label: "ALL", value: "all" },
    { label: "OVERALL COORDINATORS", value: "overall coordinators" },
    { label: "TECHNICAL", value: "technical" },
    { label: "EVENTS & LOGISTICS", value: "events & logistics" },
    { label: "MARKETING & PR", value: "marketing & pr" },
    { label: "DESIGN & MEDIA", value: "design & media" }
  ];

  const filteredTeam = teamMembers.filter((member) => {
    if (activeTab === "all") return true;
    const memberCat = (member.category || member.role || "").toLowerCase().trim();
    return memberCat.includes(activeTab.toLowerCase().trim());
  });

  return (
    <div className="w-full min-h-screen bg-[#D1BE94] text-[#0f1d38] pt-28 pb-24 px-4 sm:px-8 selection:bg-[#c5a059] selection:text-white">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d182b] border border-[#c5a059]/40 text-[#f3ca65] text-xs font-cinzel tracking-[0.2em] shadow-md">
            <Sparkles size={14} /> THE ARCHITECTS OF E-SUMMIT
          </div>
          <h1
            className="text-4xl sm:text-6xl font-black font-cinzel tracking-tight uppercase"
            style={{ fontFamily: "'Cinzel', Georgia, serif" }}
          >
            Meet The Team
          </h1>
          <p className="text-xs sm:text-sm text-slate-800 font-serif max-w-xl mx-auto italic">
            The minds and relentless executors behind RenAIssance: Quills To Capital.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveTab(cat.value)}
              className={`px-5 py-2.5 rounded-xl text-xs font-cinzel tracking-wider uppercase transition-all shadow-md ${activeTab === cat.value
                ? "bg-[#0d182b] text-[#f3ca65] font-bold border border-[#c5a059]"
                : "bg-[#e2d3b2] text-[#0f1d38] border border-[#c5a059]/40 hover:bg-[#d8c59c]"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        {loading ? (
          <div className="text-center py-20 font-cinzel text-xs text-[#0d182b] tracking-widest">
            LOADING TEAM MEMBERS...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredTeam.map((member) => (
              <div
                key={member._id || member.id}
                className="group relative bg-[#0b1626] border border-[#c5a059]/40 hover:border-[#f3ca65] rounded-2xl p-6 flex flex-col items-center text-center shadow-2xl transition-all duration-300 hover:-translate-y-2 text-white overflow-hidden"
              >
                {/* Member Image (Strictly from Database/Admin) */}
                <div className="relative w-32 h-32 rounded-full overflow-hidden mb-5 border-2 border-[#c5a059] shadow-inner group-hover:scale-105 transition-transform duration-300 bg-slate-950 flex items-center justify-center">
                  <img
                    src={
                      member.photoUrl ||
                      member.imageUrl ||
                      member.image ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                    }
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                </div>

                {/* Name */}
                <h3
                  className="font-cinzel text-lg font-bold text-white tracking-wide uppercase mb-1"
                  style={{ fontFamily: "'Cinzel', Georgia, serif" }}
                >
                  {member.name}
                </h3>

                {/* Role */}
                <p className="text-xs text-[#f3ca65] font-cinzel tracking-widest uppercase mb-4">
                  {member.role || member.category}
                </p>

                {/* LinkedIn Link on Hover */}
                <div className="w-full pt-2 border-t border-slate-800">
                  {(member.linkedinUrl || member.linkedin || member.link) ? (
                    <a
                      href={member.linkedinUrl || member.linkedin || member.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[#c5a059]/20 hover:bg-[#c5a059] text-[#f3ca65] hover:text-[#070d18] text-[11px] font-cinzel font-bold tracking-widest transition-all duration-300 opacity-80 group-hover:opacity-100"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                      </svg>
                      CONNECT <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="text-[10px] text-slate-500 font-cinzel tracking-wider">
                      NO LINKEDIN
                    </span>
                  )}
                </div>
              </div>
            ))}

            {filteredTeam.length === 0 && !loading && (
              <div className="col-span-full text-center py-16 text-slate-800 font-cinzel text-xs tracking-wider">
                No team members found in the database. Please add members from the Admin Dashboard.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}