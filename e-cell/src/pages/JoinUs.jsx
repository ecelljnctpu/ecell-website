import React, { useState } from "react";
import axios from "axios";
import { Sparkles, CheckCircle2, AlertCircle } from "lucide-react";
import { API_BASE } from "../config";

export default function JoinUs() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    branch: "",
    year: "1st Year",
    domainOfInterest: "Technical",
    aboutECell: "",
    whyJoin: "",
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    try {
      await axios.post(`${API_BASE}/api/join`, formData);
      setStatus({ loading: false, success: true, error: "" });
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        branch: "",
        year: "1st Year",
        domainOfInterest: "Technical",
        aboutECell: "",
        whyJoin: "",
      });
    } catch (err) {
      setStatus({
        loading: false,
        success: false,
        error: err.response?.data?.message || "Failed to submit application. Try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#070d18] py-16 px-4 selection:bg-[#c5a059] selection:text-black">
      <div className="max-w-2xl mx-auto bg-[#0d182b] border border-[#c5a059]/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-24 bg-[#f4b41a]/15 blur-3xl pointer-events-none rounded-full" />

        <div className="text-center mb-8 relative z-10 space-y-2">
          <span className="text-[#f3ca65] font-cinzel text-xs tracking-[0.25em] uppercase font-bold">
            MEMBERSHIP APPLICATION
          </span>
          <h1 className="font-cinzel text-3xl font-bold tracking-wide text-white">
            JOIN THE E-CELL CHAPTER
          </h1>
          <p className="text-xs text-slate-400 font-montserrat">
            Fill in your details below to participate in recruitment evaluations.
          </p>
        </div>

        {status.success && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-950/50 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-3">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span>Application submitted successfully! Our team will contact you shortly.</span>
          </div>
        )}

        {status.error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs flex items-center gap-3">
            <AlertCircle size={18} className="text-red-400 shrink-0" />
            <span>{status.error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-montserrat">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-cinzel text-slate-300 mb-1 tracking-wider">FULL NAME *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Salman Khan"
                className="w-full px-3.5 py-2.5 bg-[#070d18] border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-[#c5a059]"
              />
            </div>
            <div>
              <label className="block font-cinzel text-slate-300 mb-1 tracking-wider">PHONE NUMBER *</label>
              <input
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="+91 9876543210"
                className="w-full px-3.5 py-2.5 bg-[#070d18] border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-[#c5a059]"
              />
            </div>
          </div>

          <div>
            <label className="block font-cinzel text-slate-300 mb-1 tracking-wider">COLLEGE EMAIL *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="student@college.ac.in"
              className="w-full px-3.5 py-2.5 bg-[#070d18] border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-cinzel text-slate-300 mb-1 tracking-wider">BRANCH *</label>
              <input
                type="text"
                required
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                placeholder="CSE / IT / ECE"
                className="w-full px-3.5 py-2.5 bg-[#070d18] border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-[#c5a059]"
              />
            </div>
            <div>
              <label className="block font-cinzel text-slate-300 mb-1 tracking-wider">YEAR *</label>
              <select
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#070d18] border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-[#c5a059]"
              >
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <div>
              <label className="block font-cinzel text-slate-300 mb-1 tracking-wider">DOMAIN *</label>
              <select
                value={formData.domainOfInterest}
                onChange={(e) => setFormData({ ...formData, domainOfInterest: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#070d18] border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-[#c5a059]"
              >
                <option value="Technical">Technical</option>
                <option value="Marketing & PR">Marketing & PR</option>
                <option value="Events & Logistics">Events & Logistics</option>
                <option value="Design & Video">Design & Video</option>
                <option value="Content & Sponsorship">Content & Sponsorship</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-cinzel text-slate-300 mb-1 tracking-wider">WHAT DO YOU KNOW ABOUT E-CELL? *</label>
            <textarea
              rows={3}
              required
              value={formData.aboutECell}
              onChange={(e) => setFormData({ ...formData, aboutECell: e.target.value })}
              placeholder="Share what activities or initiatives you have followed..."
              className="w-full px-3.5 py-2.5 bg-[#070d18] border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <div>
            <label className="block font-cinzel text-slate-300 mb-1 tracking-wider">WHY DO YOU WANT TO JOIN? *</label>
            <textarea
              rows={3}
              required
              value={formData.whyJoin}
              onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
              placeholder="What unique skill or motivation do you bring to the team?"
              className="w-full px-3.5 py-2.5 bg-[#070d18] border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-[#c5a059]"
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className="w-full py-3.5 mt-2 bg-[#c5a059] hover:bg-[#d8b167] disabled:opacity-50 text-[#070d18] font-cinzel font-bold text-xs tracking-[0.2em] rounded-lg transition-all shadow-lg shadow-[#c5a059]/15"
          >
            {status.loading ? "SUBMITTING..." : "SUBMIT APPLICATION"}
          </button>
        </form>
      </div>
    </div>
  );
}