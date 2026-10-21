import React from "react";
import ReactMarkdown from "react-markdown";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";

export default function EventDetail({ event }) {
  if (!event) return null;

  return (
    <div className="min-h-screen bg-[#070d18] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT SIDE: Content & Description (7 Cols) ================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Event Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#f9e7b9] via-[#e5c378] to-[#c5a059] leading-tight">
              {event.title}
            </h1>

            {/* Markdown Description with Bigger & Clear Fonts */}
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
                    <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-4 tracking-normal" {...props} />
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


          {/* ================= RIGHT SIDE: Sticky Poster & Action Card (5 Cols) ================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            
            {/* Poster Image with Golden Border Glow */}
            <div className="relative group rounded-2xl overflow-hidden border border-[#c5a059]/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] bg-[#0b1626]">
              <img
                src={event.image || event.poster || "/placeholder-event.jpg"}
                alt={event.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            {/* Meta Information Cards (Date, Venue, Time) */}
            <div className="bg-[#0b1626]/90 border border-[#c5a059]/30 rounded-2xl p-5 space-y-4 backdrop-blur-md shadow-lg">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* Date Box */}
                <div className="bg-[#0e1c31] border border-[#c5a059]/20 rounded-xl p-3.5 flex items-center gap-3">
                  <Calendar className="text-[#f3ca65] shrink-0" size={22} />
                  <div>
                    <p className="text-[11px] text-slate-400 font-cinzel uppercase tracking-wider">Date</p>
                    <p className="text-sm font-semibold text-[#f2e3c6] font-cinzel">
                      {event.date
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
                  <MapPin className="text-[#f3ca65] shrink-0" size={22} />
                  <div>
                    <p className="text-[11px] text-slate-400 font-cinzel uppercase tracking-wider">Venue</p>
                    <p className="text-sm font-semibold text-[#f2e3c6] font-cinzel truncate max-w-[150px]">
                      {event.venue || "JNCT Campus"}
                    </p>
                  </div>
                </div>

              </div>

              {/* Start Time (Agar available ho) */}
              {event.time && (
                <div className="bg-[#0e1c31] border border-[#c5a059]/20 rounded-xl p-3.5 flex items-center gap-3">
                  <Clock className="text-[#f3ca65] shrink-0" size={22} />
                  <div>
                    <p className="text-[11px] text-slate-400 font-cinzel uppercase tracking-wider">Time</p>
                    <p className="text-sm font-semibold text-[#f2e3c6] font-cinzel">
                      {event.time}
                    </p>
                  </div>
                </div>
              )}

              {/* Big Register Now Button */}
              {event.registrationLink ? (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold font-cinzel text-[#0a121e] bg-gradient-to-r from-[#d4af37] via-[#f3ca65] to-[#c5a059] hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_15px_rgba(212,175,55,0.3)] text-base"
                >
                  <span>REGISTER NOW</span>
                  <ExternalLink size={18} />
                </a>
              ) : (
                <button
                  disabled
                  className="w-full mt-2 py-3.5 px-6 rounded-xl font-semibold font-cinzel text-slate-400 bg-slate-800 cursor-not-allowed text-center text-sm"
                >
                  REGISTRATIONS CLOSED
                </button>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}