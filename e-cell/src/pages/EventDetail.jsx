import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Calendar, MapPin, Clock, ArrowLeft, ExternalLink, Sparkles } from "lucide-react";
import { API_BASE } from "../config";
import ReactMarkdown from "react-markdown";

export default function EventDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const [event, setEvent] = useState(state?.event || null);
  const [loading, setLoading] = useState(!state?.event);

  useEffect(() => {
    // Agar state me event nahi hai (page refresh par), toh backend se fetch karenge
    if (!event && id) {
      const fetchEventDetail = async () => {
        try {
          const res = await axios.get(`${API_BASE}/api/events/${id}`);
          setEvent(res.data);
        } catch (err) {
          console.error("Error fetching event detail:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchEventDetail();
    } else {
      setLoading(false);
    }
  }, [id, event]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#070d18] text-white flex items-center justify-center pt-28 font-cinzel text-xs tracking-widest text-[#f3ca65]">
        LOADING EVENT DETAILS...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="w-full min-h-screen bg-[#070d18] text-white flex flex-col items-center justify-center pt-28 space-y-4">
        <p className="font-cinzel text-sm text-red-400">Event not found.</p>
        <Link to="/events" className="text-xs font-cinzel text-[#f3ca65] underline">
          Back to Events
        </Link>
      </div>
    );
  }

  // Registration link check
  const regLink = event.registrationLink || event.regLink || event.url || null;

  // Image source fallback chain
  const eventImage =
    event.image ||
    event.imageUrl ||
    event.poster ||
    event.posterUrl ||
    event.bannerUrl ||
    event.banner ||
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="w-full min-h-screen bg-[#070d18] text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 selection:bg-[#c5a059] selection:text-black">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Back Button */}
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-xs font-cinzel text-[#f3ca65] hover:underline tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Events
        </Link>

        {/* Main 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ================= LEFT COLUMN: Title & Large Formatted Description ================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Tag / Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d182b] border border-[#c5a059]/40 text-[#f3ca65] text-xs font-cinzel tracking-widest uppercase">
              <Sparkles size={12} /> {event.category || event.tag || "WORKSHOP / EVENT"}
            </div>

            {/* Event Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#fae8c8] via-[#e5c378] to-[#c5a059] leading-tight">
              {event.title}
            </h1>

            {/* Markdown Description with Bigger Readable Fonts */}
            <div className="event-description text-slate-200 font-serif leading-relaxed pt-2">
              <ReactMarkdown
                components={{
                  h2: (props) => (
                    <h2 className="text-2xl sm:text-3xl font-bold font-cinzel text-[#f3ca65] mt-8 mb-4 border-b border-[#c5a059]/20 pb-2" {...props} />
                  ),
                  h3: (props) => (
                    <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-[#f3ca65] mt-6 mb-3" {...props} />
                  ),
                  strong: (props) => (
                    <strong className="font-bold text-[#fae8c8]" {...props} />
                  ),
                  p: (props) => (
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-4" {...props} />
                  ),
                  ul: (props) => (
                    <ul className="list-disc list-outside space-y-2.5 my-4 pl-6 text-slate-300 text-base sm:text-lg" {...props} />
                  ),
                  li: (props) => (
                    <li className="leading-relaxed pl-1" {...props} />
                  ),
                }}
              >
                {event.description || "No description available for this event."}
              </ReactMarkdown>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Sticky Poster + Meta Cards + Register CTA ================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">

            {/* Poster Card */}
            <div className="rounded-2xl border border-[#c5a059]/40 overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.7)] bg-[#0b1626]">
              <img
                src={eventImage}
                alt={event.title}
                className="w-full h-auto max-h-[550px] object-contain bg-[#070d18] transition-transform duration-300 hover:scale-[1.01]"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>

            {/* Meta Information & CTA Card */}
            <div className="bg-[#0b1626]/90 border border-[#c5a059]/30 rounded-2xl p-5 space-y-4 backdrop-blur-md shadow-xl">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Date Box */}
                <div className="bg-[#0e1c31] border border-[#c5a059]/20 rounded-xl p-3.5 flex items-center gap-3">
                  <Calendar className="text-[#f3ca65] shrink-0" size={20} />
                  <div>
                    <p className="text-[10px] text-slate-400 font-cinzel uppercase tracking-wider">DATE</p>
                    <p className="text-xs sm:text-sm font-semibold text-[#f2e3c6] font-cinzel">
                      {event?.date
                        ? new Date(event.date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Date TBA"}
                    </p>
                  </div>
                </div>

                {/* Venue Box */}
                <div className="bg-[#0e1c31] border border-[#c5a059]/20 rounded-xl p-3.5 flex items-center gap-3">
                  <MapPin className="text-[#f3ca65] shrink-0" size={20} />
                  <div>
                    <p className="text-[10px] text-slate-400 font-cinzel uppercase tracking-wider">VENUE</p>
                    <p className="text-xs sm:text-sm font-semibold text-[#f2e3c6] font-cinzel truncate max-w-[130px]">
                      {event.venue || "JNCT Campus"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Time Box */}
              <div className="bg-[#0e1c31] border border-[#c5a059]/20 rounded-xl p-3.5 flex items-center gap-3">
                <Clock className="text-[#f3ca65] shrink-0" size={20} />
                <div>
                  <p className="text-[10px] text-slate-400 font-cinzel uppercase tracking-wider">TIME</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#f2e3c6] font-cinzel">
                    {event.time || event.timing || event.startTime || "09:00 AM Onwards"}
                  </p>
                </div>
              </div>

              {/* Register Button */}
              <div className="pt-2">
                {regLink ? (
                  <a
                    href={regLink.startsWith("http") ? regLink : `https://${regLink}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#e5c378] to-[#c5a059] hover:brightness-110 active:scale-[0.98] text-[#070d18] font-cinzel text-xs tracking-[0.2em] font-extrabold transition-all shadow-lg"
                  >
                    <span>REGISTER NOW</span>
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-800 text-slate-400 font-cinzel text-xs tracking-[0.2em] font-bold cursor-not-allowed"
                  >
                    REGISTRATIONS CLOSED
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}