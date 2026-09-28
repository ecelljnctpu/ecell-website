import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Calendar, MapPin, Clock, ArrowLeft, ExternalLink, Sparkles } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  const [event, setEvent] = useState(state?.event || null);
  const [loading, setLoading] = useState(!state?.event);

  useEffect(() => {
    // Agar state me event nahi hai (jaise page refresh karne par), toh backend se fetch karenge
    if (!event && id) {
      const fetchEventDetail = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/events/${id}`);
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

  // Admin dwara di gayi registration link (chahe registrationLink ho ya regLink/url)
  const regLink = event.registrationLink || event.regLink || event.url || "#";

  return (
    <div className="w-full min-h-screen bg-[#070d18] text-white pt-28 pb-24 px-4 sm:px-8 selection:bg-[#c5a059] selection:text-black">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Back Button */}
        <Link to="/events" className="inline-flex items-center gap-2 text-xs font-cinzel text-[#f3ca65] hover:underline tracking-widest">
          <ArrowLeft size={16} /> Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d182b] border border-[#c5a059]/40 text-[#f3ca65] text-xs font-cinzel tracking-widest uppercase">
              <Sparkles size={12} /> {event.category || event.tag || "EVENT"}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-cinzel tracking-tight uppercase text-white" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
              {event.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base font-serif leading-relaxed italic">
              {event.description || "No description available for this event."}
            </p>

            {/* Meta Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-[#0b1626] border border-[#c5a059]/30 rounded-xl p-4 flex items-center gap-3">
                <Calendar className="text-[#f3ca65]" size={20} />
                <div>
                  <p className="text-[10px] text-slate-400 font-cinzel">DATE</p>
                  <p className="text-xs font-bold font-serif">{event.date || "TBA"}</p>
                </div>
              </div>

              <div className="bg-[#0b1626] border border-[#c5a059]/30 rounded-xl p-4 flex items-center gap-3">
                <MapPin className="text-[#f3ca65]" size={20} />
                <div>
                  <p className="text-[10px] text-slate-400 font-cinzel">VENUE</p>
                  <p className="text-xs font-bold font-serif">{event.venue || "On Campus"}</p>
                </div>
              </div>

              <div className="bg-[#0b1626] border border-[#c5a059]/30 rounded-xl p-4 flex items-center gap-3">
                <Clock className="text-[#f3ca65]" size={20} />
                <div>
                  <p className="text-[10px] text-slate-400 font-cinzel">TIME</p>
                  <p className="text-xs font-bold font-serif">{event.time || "09:00 AM"}</p>
                </div>
              </div>
            </div>

            {/* Register CTA Button linked directly to Admin provided Unstop/Google Form URL */}
            <div className="pt-6">
              {regLink && regLink !== "#" ? (
                <a
                  href={regLink.startsWith("http") ? regLink : `https://${regLink}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-[#c5a059] hover:bg-[#d8b167] text-[#070d18] font-cinzel text-xs tracking-[0.25em] font-bold transition-all shadow-xl"
                >
                  REGISTER NOW <ExternalLink size={16} />
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-700 text-slate-400 font-cinzel text-xs tracking-[0.25em] font-bold cursor-not-allowed"
                >
                  REGISTRATION LINK NOT PROVIDED
                </button>
              )}
            </div>
          </div>

          {/* Right Banner Image */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#c5a059]/40 overflow-hidden shadow-2xl bg-[#0b1626] p-2">
              <img
                src={event.bannerUrl || event.image || "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80"}
                alt={event.title}
                className="w-full h-80 sm:h-96 object-cover rounded-xl"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}