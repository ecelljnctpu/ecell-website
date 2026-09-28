import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Calendar } from "lucide-react";

export default function Gallery() {
  const [gallery, setGallery] = useState([]);
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/gallery");
        setGallery(res.data || []);
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Unique event tags automatically generate karein
  const availableTags = useMemo(() => {
    const tags = new Set();
    gallery.forEach((item) => {
      const name = item.eventName || item.title;
      if (name && name.trim()) {
        tags.add(name.trim());
      }
    });
    return ["ALL", ...Array.from(tags)];
  }, [gallery]);

  // Selected tag ke hisaab se filter karein
  const filteredGallery = useMemo(() => {
    if (selectedTag === "ALL") return gallery;
    return gallery.filter(
      (item) => (item.eventName || item.title)?.trim().toLowerCase() === selectedTag.toLowerCase()
    );
  }, [gallery, selectedTag]);

  return (
    <div className="min-h-screen bg-[#d8c39e] text-[#070d18] pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold font-cinzel tracking-wider text-[#0b1626] uppercase">
          E-Summit Gallery
        </h1>
        <p className="mt-3 text-sm md:text-base italic text-slate-700 font-serif">
          Explore every landmark moment, captured across events and dates.
        </p>

        {/* Dynamic Category/Event Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm ${
                selectedTag === tag
                  ? "bg-[#0b1626] text-[#f3ca65] scale-105 shadow-md"
                  : "bg-[#c5b08c] text-[#0b1626] hover:bg-[#bba580]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-20 text-[#0b1626] font-medium">
            Loading gallery moments...
          </div>
        ) : filteredGallery.length === 0 ? (
          <div className="text-center py-20 text-slate-600">
            No gallery photos found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item) => {
              const displayImage = item.photoUrl || item.imageUrl;
              const displayTitle = item.eventName || item.title || "E-Summit Highlight";
              const displayDate = item.date ? new Date(item.date).toLocaleDateString() : "";

              return (
                <div
                  key={item._id}
                  className="bg-[#0b1626] rounded-2xl overflow-hidden border border-[#c5a059]/20 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group"
                >
                  <div className="w-full h-56 bg-slate-900 overflow-hidden relative">
                    <img
                      src={displayImage}
                      alt={displayTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/0b1626/f3ca65?text=Moment";
                      }}
                    />
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-grow bg-[#0b1626]">
                    <h3 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider line-clamp-1">
                      {displayTitle}
                    </h3>
                    {displayDate && (
                      <div className="flex items-center gap-1.5 text-xs text-[#f3ca65] mt-2">
                        <Calendar size={13} />
                        <span>{displayDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}