import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Backend se aane wala JWT token save karein
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070d18] flex items-center justify-center px-4 selection:bg-[#c5a059] selection:text-black">
      <div className="w-full max-w-md bg-[#0d182b] border border-[#c5a059]/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Top Glow Ornament */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-20 bg-[#f4b41a]/15 blur-2xl pointer-events-none rounded-full" />

        <div className="text-center mb-8 relative z-10">
          <div className="w-12 h-12 rounded-full bg-[#121c33] border border-[#c5a059]/40 flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Lock size={20} className="text-[#f7c844]" />
          </div>
          <h2 className="font-cinzel text-2xl font-bold tracking-[0.15em] text-white">
            ADMIN PORTAL
          </h2>
          <p className="text-xs text-slate-400 mt-1 tracking-wider uppercase font-montserrat">
            E-Cell Management Console
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-lg bg-red-950/40 border border-red-800/80 flex items-center gap-2.5 text-xs text-red-300">
            <ShieldAlert size={16} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-cinzel tracking-wider text-slate-300 mb-1.5">
              OFFICIAL EMAIL
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@college.ac.in"
                className="w-full pl-10 pr-4 py-2.5 bg-[#070d18] border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c5a059] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-cinzel tracking-wider text-slate-300 mb-1.5">
              PASSWORD
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#070d18] border border-slate-700/80 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#c5a059] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-[#c5a059] hover:bg-[#d8b167] disabled:opacity-60 text-[#070d18] font-cinzel font-bold text-xs tracking-[0.2em] rounded-lg transition-all duration-200 shadow-lg shadow-[#c5a059]/15"
          >
            {loading ? "AUTHENTICATING..." : "ENTER DASHBOARD"}
          </button>
        </form>
      </div>
    </div>
  );
}