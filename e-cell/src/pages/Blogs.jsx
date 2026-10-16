import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Sparkles, Heart, MessageSquare, Search, Share2, Flame, Clock } from "lucide-react";
import { API_BASE } from "../config";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOption, setSortOption] = useState("latest");

    const categories = [
        "All",
        "Startup & Innovation",
        "E-Summit Highlights",
        "Case Study",
        "Tech & AI",
        "Founder Stories",
    ];

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${API_BASE}/api/blogs?search=${search}&category=${selectedCategory}&sort=${sortOption}`
            );
            setBlogs(res.data || []);
        } catch (err) {
            console.error("Error fetching blogs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchBlogs();
        }, 300);
        return () => clearTimeout(timer);
    }, [search, selectedCategory, sortOption]);

    const handleShare = async (e, blog) => {
        e.preventDefault();
        const shareUrl = `${window.location.origin}/blog/${blog._id}`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: blog.excerpt,
                    url: shareUrl,
                });
            } catch (err) {
                console.log("Share canceled", err);
            }
        } else {
            navigator.clipboard.writeText(shareUrl);
            alert("Link copied to clipboard!");
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#D1BE94] text-[#0f1d38] pt-28 pb-24 px-4 sm:px-8 selection:bg-[#c5a059] selection:text-white">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d182b] border border-[#c5a059]/40 text-[#f3ca65] text-xs font-cinzel tracking-[0.2em] shadow-md">
                        <Sparkles size={14} /> JNCTPU E-CELL DISPATCHES
                    </div>
                    <h1
                        className="text-4xl sm:text-6xl font-black tracking-tight uppercase"
                        style={{ fontFamily: "'Cinzel', Georgia, serif" }}
                    >
                        Insights & Ideas
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-800 font-serif max-w-xl mx-auto italic">
                        Discover entrepreneurship breakdowns, E-Summit recaps, and innovation trends.
                    </p>
                </div>

                {/* Search & Sort Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0d182b]/95 p-4 rounded-2xl border border-[#c5a059]/40 shadow-xl backdrop-blur-sm">
                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-3 text-[#f3ca65]" size={18} />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#08101e] border border-[#c5a059]/30 rounded-xl text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#f3ca65]"
                        />
                    </div>

                    {/* Quick Sort Tabs */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setSortOption("latest")}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-cinzel tracking-wider uppercase transition-all ${sortOption === "latest"
                                    ? "bg-[#c5a059] text-[#070d18] font-bold shadow-md"
                                    : "text-[#f3ca65] hover:bg-[#c5a059]/20"
                                }`}
                        >
                            <Clock size={14} /> Latest
                        </button>
                        <button
                            onClick={() => setSortOption("trending")}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-cinzel tracking-wider uppercase transition-all ${sortOption === "trending"
                                    ? "bg-[#c5a059] text-[#070d18] font-bold shadow-md"
                                    : "text-[#f3ca65] hover:bg-[#c5a059]/20"
                                }`}
                        >
                            <Flame size={14} /> Trending
                        </button>
                        <button
                            onClick={() => setSortOption("most_liked")}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-cinzel tracking-wider uppercase transition-all ${sortOption === "most_liked"
                                    ? "bg-[#c5a059] text-[#070d18] font-bold shadow-md"
                                    : "text-[#f3ca65] hover:bg-[#c5a059]/20"
                                }`}
                        >
                            <Heart size={14} /> Most Liked
                        </button>
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-cinzel tracking-wider uppercase transition-all shadow-sm ${selectedCategory === cat
                                    ? "bg-[#0d182b] text-[#f3ca65] font-bold border border-[#c5a059]"
                                    : "bg-[#e2d3b2] text-[#0f1d38] border border-[#c5a059]/40 hover:bg-[#d8c59c]"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Blogs Grid */}
                {loading ? (
                    <div className="text-center py-24 font-cinzel text-xs text-[#0d182b] tracking-widest">
                        FETCHING DISPATCHES...
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20 font-cinzel text-xs text-slate-800 tracking-wider">
                        No articles found matching your criteria.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <div
                                key={blog._id}
                                className="group relative bg-[#0b1626] border border-[#c5a059]/40 hover:border-[#f3ca65] rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 hover:-translate-y-2 text-white"
                            >
                                {/* Image Container with Watermark */}
                                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                                    <img
                                        src={blog.imageUrl}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* JNCTPU Watermark Badge */}
                                    <div className="absolute top-3 right-3 bg-[#0d182b]/85 border border-[#c5a059]/60 px-2.5 py-1 rounded-md text-[10px] font-cinzel text-[#f3ca65] font-bold tracking-widest backdrop-blur-md shadow-lg">
                                        JNCTPU BHOPAL
                                    </div>
                                    {/* Category Pill */}
                                    <div className="absolute bottom-3 left-3 bg-[#c5a059] text-[#070d18] text-[10px] font-cinzel font-bold px-3 py-0.5 rounded-md uppercase tracking-wider">
                                        {blog.category}
                                    </div>
                                </div>

                                {/* Body Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="text-[11px] text-[#f3ca65]/80 font-cinzel mb-2 flex items-center justify-between">
                                        <span>{new Date(blog.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                                        <span>By {blog.author}</span>
                                    </div>


                                    <div className="text-[11px] text-[#f3ca65]/80 font-cinzel mb-2 flex items-center justify-between">
                                        <span>
                                            {new Date(blog.publishDate || blog.createdAt).toLocaleDateString("en-IN", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <span className="truncate max-w-[140px] text-right">
                                            By {blog.author}
                                        </span>
                                    </div>




                                    <h3
                                        className="text-lg font-bold font-cinzel text-white group-hover:text-[#f3ca65] transition-colors line-clamp-2 mb-2"
                                        style={{ fontFamily: "'Cinzel', Georgia, serif" }}
                                    >
                                        {blog.title}
                                    </h3>

                                    <p className="text-xs text-slate-300 line-clamp-3 mb-6 font-serif leading-relaxed">
                                        {blog.excerpt}
                                    </p>

                                    {/* Footer Actions */}
                                    <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-xs text-[#f3ca65]">
                                            <span className="flex items-center gap-1.5">
                                                <Heart size={14} className="fill-[#f3ca65]/20 text-[#f3ca65]" />
                                                {blog.likes || 0}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-slate-400">
                                                <MessageSquare size={14} />
                                                {blog.comments?.length || 0}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => handleShare(e, blog)}
                                                className="p-1.5 rounded-lg bg-[#c5a059]/20 hover:bg-[#c5a059] text-[#f3ca65] hover:text-[#0b1626] transition-colors"
                                                title="Share"
                                            >
                                                <Share2 size={14} />
                                            </button>
                                            <Link
                                                to={`/blog/${blog._id}`}
                                                className="px-3 py-1.5 rounded-lg bg-[#c5a059]/20 hover:bg-[#c5a059] text-[#f3ca65] hover:text-[#0b1626] text-xs font-cinzel font-bold tracking-wider transition-colors"
                                            >
                                                READ MORE →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}