import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Heart, MessageSquare, Share2, ArrowLeft, Send } from "lucide-react";
import { API_BASE } from "../config";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [postingComment, setPostingComment] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`${API_BASE}/blogs/${id}`);
        setBlog(res.data);
        setLikes(res.data.likes || 0);
      } catch (err) {
        console.error("Failed to load blog detail:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleLike = async () => {
    try {
      const res = await axios.post(`${API_BASE}/blogs/${id}/like`);
      setLikes(res.data.likes);
      setHasLiked(res.data.isLiked);
    } catch (err) {
      console.error("Like failed:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied!");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;
    try {
      setPostingComment(true);
      const res = await axios.post(`${API_BASE}/blogs/${id}/comment`, {
        name: commentName,
        comment: commentText,
      });
      setBlog((prev) => ({ ...prev, comments: res.data.comments }));
      setCommentName("");
      setCommentText("");
    } catch (err) {
      alert("Failed to post comment.");
    } finally {
      setPostingComment(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#D1BE94] flex items-center justify-center font-cinzel text-xs text-[#0f1d38]">
        UNFOLDING ARCHIVE...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#D1BE94] text-center pt-36">
        <h2 className="text-xl font-cinzel text-red-700">ARTICLE NOT FOUND</h2>
        <Link to="/blogs" className="mt-4 inline-block underline font-cinzel text-xs">
          Return to All Dispatches
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#D1BE94] text-[#0f1d38] pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-xs font-cinzel font-bold text-[#0d182b] hover:text-[#c5a059] transition-colors"
        >
          <ArrowLeft size={16} /> BACK TO DISPATCHES
        </Link>

        <div className="relative bg-[#0b1626] border border-[#c5a059]/40 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10 text-white space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <span className="bg-[#c5a059] text-[#070d18] text-[10px] font-cinzel font-bold px-3 py-1 rounded-md uppercase tracking-wider">
              {blog.category}
            </span>
            <span className="text-xs text-[#f3ca65] font-cinzel">
              {new Date(blog.publishDate || blog.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-5xl font-black font-cinzel leading-tight text-white tracking-tight"
            style={{ fontFamily: "'Cinzel', Georgia, serif" }}
          >
            {blog.title}
          </h1>

          <div className="relative rounded-2xl overflow-hidden border-2 border-[#c5a059]/50 shadow-2xl bg-black">
            <img src={blog.imageUrl} alt={blog.title} className="w-full max-h-[450px] object-cover" />
            <div className="absolute bottom-4 right-4 bg-[#0d182b]/90 border border-[#c5a059] px-3 py-1 rounded text-xs font-cinzel text-[#f3ca65] font-bold tracking-widest backdrop-blur-md">
              E-CELL JNCTPU BHOPAL
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-y border-slate-800 text-xs">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all ${
                  hasLiked
                    ? "bg-[#c5a059] text-[#070d18] border-[#c5a059] font-bold"
                    : "border-[#c5a059]/40 text-[#f3ca65] hover:bg-[#c5a059]/20"
                }`}
              >
                <Heart size={16} className={hasLiked ? "fill-[#070d18]" : ""} />
                <span>{likes} Likes</span>
              </button>

              <span className="flex items-center gap-1.5 text-slate-400">
                <MessageSquare size={16} /> {blog.comments?.length || 0} Comments
              </span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c5a059]/40 text-[#f3ca65] hover:bg-[#c5a059] hover:text-[#070d18] transition-all font-cinzel font-bold"
            >
              <Share2 size={14} /> SHARE
            </button>
          </div>

          {/* Formatted Content */}
          <div className="space-y-6 text-slate-200 font-serif leading-relaxed text-base sm:text-lg pt-4">
            {blog.content.split(/\n\s*\n/).map((block, index) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              if (
                trimmed.startsWith("# ") ||
                trimmed.startsWith("## ") ||
                (trimmed.length < 70 && !trimmed.endsWith(".") && !trimmed.includes(",") && !trimmed.includes(":"))
              ) {
                const cleanHeading = trimmed.replace(/^#+\s*/, "");
                return (
                  <h2
                    key={index}
                    className="text-2xl sm:text-4xl font-extrabold font-cinzel text-[#f3ca65] pt-8 pb-3 border-b border-[#c5a059]/30 tracking-tight"
                    style={{ fontFamily: "'Cinzel', Georgia, serif" }}
                  >
                    {cleanHeading}
                  </h2>
                );
              }

              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    className="text-xl sm:text-2xl font-bold font-cinzel text-white pt-6 pb-2"
                    style={{ fontFamily: "'Cinzel', Georgia, serif" }}
                  >
                    {trimmed.replace(/^###\s*/, "")}
                  </h3>
                );
              }

              if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const items = trimmed.split("\n").filter(Boolean);
                return (
                  <ul key={index} className="list-disc pl-6 space-y-2 text-slate-300 my-4">
                    {items.map((item, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {item.replace(/^[-*]\s*/, "")}
                      </li>
                    ))}
                  </ul>
                );
              }

              const parts = trimmed.split(/(\*\*.*?\*\*)/g);
              return (
                <p key={index} className="text-slate-200 leading-8 text-base sm:text-lg font-serif">
                  {parts.map((part, pIdx) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return (
                        <strong key={pIdx} className="font-bold text-white tracking-wide">
                          {part.slice(2, -2)}
                        </strong>
                      );
                    }
                    return part;
                  })}
                </p>
              );
            })}
          </div>

          {/* Author Profile & Contact */}
          <div className="mt-8 p-5 bg-[#070f1a] rounded-2xl border border-[#c5a059]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center font-cinzel font-bold text-[#f3ca65] text-lg">
                {blog.author ? blog.author.charAt(0).toUpperCase() : "E"}
              </div>
              <div>
                <h4 className="font-cinzel font-bold text-sm text-white">
                  Written by: <span className="text-[#f3ca65]">{blog.author || "E-Cell JNCTPU Team"}</span>
                </h4>
                <p className="text-[11px] text-slate-400 font-serif">
                  Published on: {new Date(blog.publishDate || blog.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {blog.authorContact && (
              <a
                href={
                  blog.authorContact.includes("@")
                    ? `mailto:${blog.authorContact}`
                    : blog.authorContact.startsWith("http")
                    ? blog.authorContact
                    : `https://${blog.authorContact}`
                }
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#c5a059]/20 hover:bg-[#c5a059] text-[#f3ca65] hover:text-[#0b1626] text-xs font-cinzel font-bold tracking-wider transition-all border border-[#c5a059]/40"
              >
                CONTACT WRITER ↗
              </a>
            )}
          </div>
        </div>

        {/* Discussion / Comments Section */}
        <div className="bg-[#0b1626] border border-[#c5a059]/40 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-2xl">
          <h2
            className="text-xl font-bold font-cinzel text-[#f3ca65] uppercase"
            style={{ fontFamily: "'Cinzel', Georgia, serif" }}
          >
            Discussion & Thoughts ({blog.comments?.length || 0})
          </h2>

          <form onSubmit={handleCommentSubmit} className="space-y-3 bg-[#070f1a] p-4 rounded-2xl border border-slate-800">
            <input
              type="text"
              placeholder="Your Name (e.g. Rahul Sharma)"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#0b1626] border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#c5a059]"
              required
            />
            <textarea
              rows="3"
              placeholder="Share your perspective or query..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#0b1626] border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#c5a059]"
              required
            />
            <button
              type="submit"
              disabled={postingComment}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#c5a059] text-[#070d18] text-xs font-cinzel font-bold tracking-wider hover:bg-[#f3ca65] transition-all shadow-md"
            >
              <Send size={14} /> {postingComment ? "POSTING..." : "POST COMMENT"}
            </button>
          </form>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {blog.comments && blog.comments.length > 0 ? (
              blog.comments.map((c) => (
                <div key={c._id} className="p-3 bg-[#070f1a]/60 rounded-xl border border-slate-800/80 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-cinzel text-xs font-bold text-[#f3ca65]">{c.name}</span>
                    <span className="text-[10px] text-slate-500">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-serif">{c.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-500 font-serif italic">
                Be the first to share your thoughts on this dispatch.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}