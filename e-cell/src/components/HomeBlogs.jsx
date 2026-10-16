import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { API_BASE } from "../config";

export default function HomeBlogs() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchTopThree = async () => {
            try {
                const res = await axios.get(`${API_BASE}/api/blogs?limit=3&sort=latest`);
                setBlogs(res.data || []);
            } catch (err) {
                console.error("Home blog fetch error:", err);
            }
        };
        fetchTopThree();
    }, []);

    if (blogs.length === 0) return null;

    return (
        <section className="py-20 px-4 sm:px-8 bg-[#D1BE94]">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0d182b] text-[#f3ca65] text-[10px] font-cinzel tracking-widest">
                            <Sparkles size={12} /> LATEST UPDATES
                        </div>
                        <h2
                            className="text-3xl sm:text-4xl font-black font-cinzel text-[#0f1d38] uppercase mt-2"
                            style={{ fontFamily: "'Cinzel', Georgia, serif" }}
                        >
                            From The Journal
                        </h2>
                    </div>
                    <Link
                        to="/blogs"
                        className="inline-flex items-center gap-2 text-xs font-cinzel font-bold text-[#0d182b] hover:text-[#785b1c] tracking-widest"
                    >
                        VIEW ALL DISPATCHES <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                        <Link
                            key={blog._id}
                            to={`/blog/${blog._id}`}
                            className="group bg-[#0b1626] border border-[#c5a059]/40 hover:border-[#f3ca65] rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all duration-300 hover:-translate-y-2 text-white"
                        >
                            <div className="relative h-44 w-full overflow-hidden bg-black">
                                <img
                                    src={blog.imageUrl}
                                    alt={blog.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2 right-2 bg-[#0d182b]/80 border border-[#c5a059]/50 px-2 py-0.5 rounded text-[9px] font-cinzel text-[#f3ca65]">
                                    JNCTPU
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <span className="text-[10px] text-[#f3ca65] font-cinzel uppercase mb-1">
                                    {blog.category}
                                </span>


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



                                <h3 className="font-cinzel text-base font-bold text-white group-hover:text-[#f3ca65] transition-colors line-clamp-2 mb-2">
                                    {blog.title}
                                </h3>
                                <p className="text-xs text-slate-300 line-clamp-2 mb-4 font-serif">
                                    {blog.excerpt}
                                </p>
                                <div className="mt-auto pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-[#f3ca65]">
                                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1">
                                        <Heart size={12} className="fill-[#f3ca65]" /> {blog.likes || 0}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}