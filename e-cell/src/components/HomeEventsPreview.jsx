import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight, Sparkles } from "lucide-react";

export default function HomeEventsPreview() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Backend se dynamic events fetch karna
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Sirf top 3-4 events home page ke liye
  const topEvents = events.slice(0, 3);

  return (
    <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d182b] border border-[#c5a059]/40 text-[#f3ca65] text-xs font-cinzel tracking-[0.2em]">
          <Sparkles size={13} /> FEATURED CHRONICLES
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-cinzel tracking-tight uppercase text-white" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
          Flagship Events
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-16 font-cinzel text-xs text-[#f3ca65] tracking-widest">
          LOADING EVENTS...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topEvents.map((event) => (
            <div
              key={event._id}
              className="bg-[#0b1626] border border-[#c5a059]/30 hover:border-[#f3ca65] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-950">
                  <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

        {topEvents.length === 0 && (
            <div className="col-span-full text-center py-10 text-[#0D2344] font-cinzel text-xs font-semibold tracking-wider">
              No events added yet by admin.
            </div>
          )}
        </div>
      )}

      <div className="text-center mt-12">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0D2344] hover:bg-[#112038] text-[#f3ca65] border border-[#c5a059] font-cinzel text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-xl hover:-translate-y-1"
        >
          VIEW ALL EVENTS <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}