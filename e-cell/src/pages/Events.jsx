import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Sparkles, ArrowRight } from "lucide-react";

export default function EventPage() {
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);
      } catch (err) {
        setEvents([
          {
            _id: "1",
            title: "Pitch Perfect 3.0",
            category: "upcoming",
            date: "23 Aug 2026",
            venue: "Hybrid",
            time: "09:00 AM",
            bannerUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
            description: "Got a startup idea? Pitch it live at Pitch Perfect 3.0 — E-Cell's pitching competition.",
            registrationLink: "https://unstop.com"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((ev) => {
    const matchesTab = activeTab === "all" || ev.category?.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="w-full min-h-screen bg-[#070d18] text-white pt-28 pb-24 px-4 sm:px-8 relative z-10 selection:bg-[#c5a059] selection:text-black">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#c5a059]/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d182b] border border-[#c5a059]/45 text-[#f3ca65] text-xs font-cinzel tracking-[0.2em] mb-2">
              <Sparkles size={13} /> E-SUMMIT CHRONICLES
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-cinzel tracking-tight uppercase" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
              All Events
            </h1>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d182b] border border-[#c5a059]/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#f3ca65] font-serif"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-3">
          {["all", "upcoming", "live now", "ended"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-cinzel tracking-wider uppercase transition-all ${
                activeTab === tab
                  ? "bg-[#c5a059] text-[#070d18] font-bold shadow-lg"
                  : "bg-[#0d182b] text-slate-300 border border-[#c5a059]/30 hover:border-[#f3ca65]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-20 font-cinzel text-xs text-[#f3ca65] tracking-widest">
            LOADING EVENTS...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event._id}
                className="bg-[#0b1626] border border-[#c5a059]/30 hover:border-[#f3ca65] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img
                      src={event.bannerUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 right-3 text-[10px] font-cinzel font-bold px-2.5 py-1 rounded bg-[#070d18]/90 border border-[#c5a059]/60 text-[#f3ca65] uppercase">
                      {event.category || "EVENT"}
                    </span>
                  </div>

                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold font-cinzel text-white group-hover:text-[#f3ca65] transition-colors" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
                      {event.title}
                    </h3>

                    <div className="space-y-2 text-xs text-slate-300 font-serif border-t border-slate-800 pt-4">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-[#f3ca65]" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#f3ca65]" />
                        <span>{event.venue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/events/${event._id}`}
                    state={{ event }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#c5a059] hover:bg-[#d8b167] text-[#070d18] font-cinzel text-xs tracking-[0.2em] font-bold transition-all shadow-md"
                  >
                    VIEW DETAILS <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}