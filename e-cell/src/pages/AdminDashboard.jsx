import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  Users,
  UserPlus,
  PlusCircle,
  Trash2,
  LogOut,
  Upload,
  Menu,
  Award,
  X,
  Image as ImageIcon,
} from "lucide-react";

const API_BASE = "https://ecell-website-ce9d.onrender.com/api";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("events"); // 'events' | 'team' | 'speakers' | 'gallery' | 'applications'
  const [sidebarOpen, setSidebarOpen] = useState(false); //[cite: 10]

  // Data States
  const [events, setEvents] = useState([]); //[cite: 10]
  const [team, setTeam] = useState([]); //[cite: 10]
  const [speakers, setSpeakers] = useState([]); //[cite: 10]
  const [gallery, setGallery] = useState([]); //[cite: 10]
  const [applications, setApplications] = useState([]); //[cite: 10]
  const [loading, setLoading] = useState(false); //[cite: 10]

  // Form States - Events[cite: 10]
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "upcoming",
    date: "",
    venue: "",
    registrationLink: "",
  }); //[cite: 10]
  const [eventFile, setEventFile] = useState(null); //[cite: 10]

  // Form States - Team[cite: 10]
  const [teamData, setTeamData] = useState({
    name: "",
    role: "",
    sessionYear: "2025-26",
    linkedinUrl: "",
    githubUrl: "",
  }); //[cite: 10]
  const [teamFile, setTeamFile] = useState(null); //[cite: 10]

  // Form States - Speakers
  const [speakerData, setSpeakerData] = useState({
    name: "",
    designation: "",
    linkedinUrl: "",
  });
  const [speakerFile, setSpeakerFile] = useState(null);

  // Form States - Gallery
  const [galleryData, setGalleryData] = useState({
    eventName: "",
    date: "",
  });
  const [galleryFile, setGalleryFile] = useState(null);



  const [sponsors, setSponsors] = useState([]);
  const [newSponsor, setNewSponsor] = useState({
    name: "",
    tier: "Title Sponsor",
    websiteUrl: "",
  });
  const [sponsorLogoFile, setSponsorLogoFile] = useState(null);

  // fetchData function ke andar:
  const fetchSponsors = async () => {
    try {
      const res = await axios.get(`${API_BASE}/sponsors`);
      setSponsors(res.data || []);
    } catch (err) {
      console.error("Sponsors fetch error:", err);
    }
  };


  const token = localStorage.getItem("adminToken"); //[cite: 10]

  const logout = () => {
    localStorage.removeItem("adminToken"); //[cite: 10]
    window.location.href = "/admin/login"; //[cite: 10]
  };

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`, //[cite: 10]
    },
  };

  const fetchData = async () => {
    setLoading(true); //[cite: 10]
    try {
      const [eventsRes, teamRes, speakersRes, galleryRes, appsRes] = await Promise.all([
        axios.get(`${API_BASE}/events`), //[cite: 10]
        axios.get(`${API_BASE}/team`), //[cite: 10]
        axios.get(`${API_BASE}/speakers`),
        axios.get(`${API_BASE}/gallery`),
        axios.get(`${API_BASE}/join/all`, authConfig).catch(() => ({ data: [] })),
      ]);
      setEvents(eventsRes.data || []);
      setTeam(teamRes.data || []);
      setSpeakers(speakersRes.data || []);
      setGallery(galleryRes.data || []);
      setApplications(appsRes.data || []);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        logout(); //[cite: 10]
      }
    } finally {
      setLoading(false); //[cite: 10]
    }
  };

  useEffect(() => {
    fetchData(); //[cite: 10]
  }, []);

  // --- Handlers: Events ---[cite: 10]
  const handleCreateEvent = async (e) => {
    e.preventDefault(); //[cite: 10]
    if (!eventFile) return alert("Please select a banner image"); //[cite: 10]

    const formData = new FormData(); //[cite: 10]
    Object.keys(eventData).forEach((key) => formData.append(key, eventData[key])); //[cite: 10]
    formData.append("banner", eventFile); //[cite: 10]

    try {
    await axios.post(`${API_BASE}/api/events`, formData, {
  headers: {
    ...authConfig.headers,
  },
});
      alert("Event added successfully!"); //[cite: 10]
      setEventData({ title: "", description: "", category: "upcoming", date: "", venue: "", registrationLink: "" }); //[cite: 10]
      setEventFile(null); //[cite: 10]
      fetchData(); //[cite: 10]
    } catch (err) {
      alert(err.response?.data?.message || "Error creating event"); //[cite: 10]
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return; //[cite: 10]
    try {
      await axios.delete(`${API_BASE}/events/${id}`, authConfig); //[cite: 10]
      setEvents(events.filter((item) => item._id !== id)); //[cite: 10]
    } catch (err) {
      alert("Error deleting event"); //[cite: 10]
    }
  };



  const handleAddSponsor = async (e) => {
    e.preventDefault();
    if (!newSponsor.name || !sponsorLogoFile) {
      alert("Please provide sponsor name and logo file");
      return;
    }

    const formData = new FormData();
    formData.append("name", newSponsor.name);
    formData.append("tier", newSponsor.tier);
    formData.append("websiteUrl", newSponsor.websiteUrl);
    formData.append("logo", sponsorLogoFile);

    try {
      await axios.post("http://localhost:5000/api/sponsors", formData);
      alert("Sponsor added successfully!");
      setNewSponsor({ name: "", tier: "Title Sponsor", websiteUrl: "" });
      setSponsorLogoFile(null);
      fetchSponsors();
    } catch (error) {
      alert("Sponsor add karne me error: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteSponsor = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sponsor?")) return;
    try {
      await axios.delete(`${API_BASE}/sponsors/${id}`);
      setSponsors((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };



  // --- Handlers: Team ---[cite: 10]
 const handleCreateTeam = async (e) => {
  e.preventDefault();
  if (!teamFile) return alert("Please select a member photo");

  try {
    const optimizedFile = await compressImage(teamFile);

    const formData = new FormData();
    formData.append("name", teamData.name || "");
    formData.append("role", teamData.role || "Core Team");
    formData.append("sessionYear", teamData.sessionYear || "2024-27");
    formData.append("linkedinUrl", teamData.linkedinUrl || "");
    // Sirf ek key 'photo' append karein:
    formData.append("photo", optimizedFile);

    // DHYAN DEIN: Content-Type header yahan se HATA DIYA gaya hai
    await axios.post(`${API_BASE}/team`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Team member added successfully!");
    setTeamData({ name: "", role: "", sessionYear: "2024-27", linkedinUrl: "" });
    setTeamFile(null);
    fetchData();
  } catch (err) {
    console.error("Team Add Error:", err);
    alert(err.response?.data?.message || "Error adding member");
  }
};

  const handleDeleteTeam = async (id) => {
    if (!confirm("Are you sure?")) return; //[cite: 10]
    try {
      await axios.delete(`${API_BASE}/team/${id}`, authConfig); //[cite: 10]
      setTeam(team.filter((item) => item._id !== id)); //[cite: 10]
    } catch (err) {
      alert("Error deleting member"); //[cite: 10]
    }
  };

  // --- Handlers: Speakers (File Upload via FormData) ---
  const handleCreateSpeaker = async (e) => {
    e.preventDefault();
    if (!speakerFile) return alert("Please select a speaker photo");

    const formData = new FormData(); //[cite: 10]
    formData.append("name", speakerData.name);
    formData.append("designation", speakerData.designation);
    formData.append("linkedinUrl", speakerData.linkedinUrl);
    formData.append("photo", speakerFile); // backend multer accepts 'photo' or 'image'

    try {
      await axios.post(`${API_BASE}/speakers`, formData, {
        headers: { ...authConfig.headers, "Content-Type": "multipart/form-data" }, //[cite: 10]
      });
      alert("Speaker added successfully!"); //[cite: 10]
      setSpeakerData({ name: "", designation: "", linkedinUrl: "" });
      setSpeakerFile(null);
      fetchData(); //[cite: 10]
    } catch (err) {
      alert(err.response?.data?.message || "Error adding speaker"); //[cite: 10]
    }
  };

  const handleDeleteSpeaker = async (id) => {
    if (!confirm("Delete this speaker?")) return;
    try {
      await axios.delete(`${API_BASE}/speakers/${id}`, authConfig);
      setSpeakers(speakers.filter((item) => item._id !== id));
    } catch (err) {
      alert("Error deleting speaker");
    }
  };

  // --- Handlers: Gallery (File Upload via FormData) ---
  const handleCreateGallery = async (e) => {
    e.preventDefault();
    if (!galleryFile) return alert("Please select a gallery image");
    console.log("Selected file object:", galleryFile);

    const formData = new FormData();
    formData.append("eventName", galleryData.eventName);
    formData.append("date", galleryData.date);
    formData.append("photo", galleryFile); // 👈 route upload.single("photo") se match hona chahiye

    try {
      await axios.post(`${API_BASE}/gallery`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Gallery image added!");
      setGalleryData({ eventName: "", date: "" });
      setGalleryFile(null);
      fetchData();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error adding gallery photo");
      console.error("Gallery Error:", err.response?.data || err);
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!confirm("Delete this gallery image?")) return;
    try {
      await axios.delete(`${API_BASE}/gallery/${id}`, authConfig);
      setGallery(gallery.filter((item) => item._id !== id));
    } catch (err) {
      alert("Error deleting gallery photo");
    }
  };

  // --- Handlers: Applications ---[cite: 10]
  const handleDeleteApplication = async (id) => {
    if (!confirm("Delete this application?")) return; //[cite: 10]
    try {
      await axios.delete(`${API_BASE}/join/${id}`, authConfig); //[cite: 10]
      setApplications(applications.filter((item) => item._id !== id)); //[cite: 10]
    } catch (err) {
      alert("Error deleting application"); //[cite: 10]
    }
  };


// Image compression helper function
const compressImage = (file) => {
  return new Promise((resolve) => {
    // Agar file 1MB se choti hai to compress karne ki zaroorat nahi
    if (!file || file.size < 1024 * 1024) {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1000;
        const scaleSize = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * (img.width > MAX_WIDTH ? scaleSize : 1);

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  });
};



  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)} //[cite: 10]
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        <div>
          {/* Logo / Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
                E
              </div>
              <span className="font-bold text-lg tracking-wide text-white">E-Cell Admin</span>
            </div>
            <button className="md:hidden text-slate-400" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <button
              onClick={() => { setActiveTab("events"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "events"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
            >
              <Calendar size={18} /> Manage Events
            </button>

            <button
              onClick={() => { setActiveTab("team"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "team"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
            >
              <Users size={18} /> Core Team
            </button>

            <button
              onClick={() => { setActiveTab("speakers"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "speakers"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
            >
              <UserPlus size={18} /> Manage Speakers
            </button>



            <button
              onClick={() => setActiveTab("sponsors")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === "sponsors" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-slate-800"
                }`}
            >
              <Award size={18} /> Manage Sponsors
            </button>




            <button
              onClick={() => { setActiveTab("gallery"); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "gallery"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
            >
              <ImageIcon size={18} /> Manage Gallery
            </button>

            <button
              onClick={() => { setActiveTab("applications"); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === "applications"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
            >
              <div className="flex items-center gap-3">
                <UserPlus size={18} /> Join Applications
              </div>
              {applications.length > 0 && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700">
                  {applications.length}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-950/30 hover:border-red-900 border border-transparent transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="h-16 px-6 bg-slate-900/60 backdrop-blur-md border-b border-slate-800 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-400" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <h1 className="text-xl font-semibold text-white capitalize">
              {activeTab === "applications" ? "Join E-Cell Submissions" : activeTab} Management
            </h1>
          </div>
          <span className="text-xs px-3 py-1 bg-emerald-950 border border-emerald-800 text-emerald-400 rounded-full font-medium">
            System Live
          </span>
        </header>

        <div className="p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
                <Calendar size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Total Events</p>
                <p className="text-2xl font-bold text-white">{events.length}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-purple-600/10 border border-purple-500/20 text-purple-400 rounded-xl">
                <Users size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Core Members</p>
                <p className="text-2xl font-bold text-white">{team.length}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-amber-600/10 border border-amber-500/20 text-amber-400 rounded-xl">
                <UserPlus size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Speakers</p>
                <p className="text-2xl font-bold text-white">{speakers.length}</p>
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                <ImageIcon size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Gallery Photos</p>
                <p className="text-2xl font-bold text-white">{gallery.length}</p>
              </div>
            </div>
          </div>

          {/* TAB 1: EVENTS */}
          {activeTab === "events" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 h-fit shadow-sm">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <PlusCircle size={18} className="text-indigo-400" /> Create Event
                </h3>
                <form onSubmit={handleCreateEvent} className="space-y-3.5 text-sm">
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. E-Summit '26"
                      value={eventData.title}
                      onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-400 text-xs mb-1">Category</label>
                      <select
                        value={eventData.category}
                        onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="current">Current</option>
                        <option value="past">Past</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs mb-1">Date</label>
                      <input
                        type="date"
                        required
                        value={eventData.date}
                        onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Venue</label>
                    <input
                      type="text"
                      required
                      placeholder="Main Auditorium / Online"
                      value={eventData.venue}
                      onChange={(e) => setEventData({ ...eventData, venue: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Banner Image (File)</label>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setEventFile(e.target.files[0])}
                      className="w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Event details..."
                      value={eventData.description}
                      onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Registration Link (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://unstop.com/..."
                      value={eventData.registrationLink}
                      onChange={(e) => setEventData({ ...eventData, registrationLink: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition shadow-lg shadow-indigo-600/20"
                  >
                    Publish Event
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-base font-semibold text-white">Active Events ({events.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {events.map((item) => (
                    <div
                      key={item._id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between"
                    >
                      <div className="relative h-36 bg-slate-950">
                        <img src={item.bannerUrl} alt={item.title} className="w-full h-full object-cover" />
                        <span
                          className={`absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${item.category === "upcoming"
                            ? "bg-amber-950 text-amber-300 border border-amber-800"
                            : item.category === "current"
                              ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                              : "bg-slate-800 text-slate-300 border border-slate-700"
                            }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-white text-base line-clamp-1">{item.title}</h4>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                          <p className="text-xs text-indigo-400 mt-2 font-medium">📍 {item.venue}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => handleDeleteEvent(item._id)}
                            className="p-1.5 text-red-400 hover:bg-red-950/40 rounded-lg transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {events.length === 0 && (
                    <p className="text-sm text-slate-500 col-span-2 text-center py-10">No events found.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEAM */}
          {activeTab === "team" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 h-fit shadow-sm">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <PlusCircle size={18} className="text-indigo-400" /> Add Team Member
                </h3>
                <form onSubmit={handleCreateTeam} className="space-y-3.5 text-sm">
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={teamData.name}
                      onChange={(e) => setTeamData({ ...teamData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Designation / Role</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. President, Tech Lead"
                      value={teamData.role}
                      onChange={(e) => setTeamData({ ...teamData, role: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Session Year</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2025-26"
                      value={teamData.sessionYear}
                      onChange={(e) => setTeamData({ ...teamData, sessionYear: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Profile Photo (File)</label>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setTeamFile(e.target.files[0])}
                      className="w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                    />
                  </div>

                



                  <div>
                    <label className="block text-slate-400 text-xs mb-1">LinkedIn Profile (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={teamData.linkedinUrl}
                      onChange={(e) => setTeamData({ ...teamData, linkedinUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition shadow-lg shadow-indigo-600/20"
                  >
                    Add Member
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2">
                <h3 className="text-base font-semibold text-white mb-3">Members ({team.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {team.map((member) => (
                    <div
                      key={member._id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center relative group"
                    >
                      <button
                        onClick={() => handleDeleteTeam(member._id)}
                        className="absolute top-2 right-2 p-1.5 text-slate-500 hover:text-red-400 rounded-lg transition"
                      >
                        <Trash2 size={15} />
                      </button>
                      <img
                        src={member.photoUrl}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500/30 mb-3"
                      />
                      <h4 className="font-semibold text-white text-sm">{member.name}</h4>
                      <p className="text-xs text-indigo-400 font-medium">{member.role}</p>
                      <span className="text-[10px] text-slate-500 mt-1">{member.sessionYear}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SPEAKERS (FILE UPLOAD) */}
          {activeTab === "speakers" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 h-fit shadow-sm">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <PlusCircle size={18} className="text-indigo-400" /> Add Speaker
                </h3>
                <form onSubmit={handleCreateSpeaker} className="space-y-3.5 text-sm">
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Speaker Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aman Gupta"
                      value={speakerData.name}
                      onChange={(e) => setSpeakerData({ ...speakerData, name: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Designation / Role</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Co-founder & CMO, boAt"
                      value={speakerData.designation}
                      onChange={(e) => setSpeakerData({ ...speakerData, designation: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Speaker Photo (File)</label>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setSpeakerFile(e.target.files[0])}
                      className="w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1">LinkedIn Profile (Optional)</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/..."
                      value={speakerData.linkedinUrl}
                      onChange={(e) => setSpeakerData({ ...speakerData, linkedinUrl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition shadow-lg shadow-indigo-600/20"
                  >
                    Add Speaker
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2">
                <h3 className="text-base font-semibold text-white mb-3">Active Speakers ({speakers.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {speakers.map((spk) => (
                    <div
                      key={spk._id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center relative group"
                    >
                      <button
                        onClick={() => handleDeleteSpeaker(spk._id)}
                        className="absolute top-2 right-2 p-1.5 text-slate-500 hover:text-red-400 rounded-lg transition"
                      >
                        <Trash2 size={15} />
                      </button>
                      <img
                        src={spk.photoUrl}
                        alt={spk.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-indigo-500/30 mb-3"
                      />
                      <h4 className="font-semibold text-white text-sm">{spk.name}</h4>
                      <p className="text-xs text-indigo-400 font-medium">{spk.designation}</p>
                    </div>
                  ))}
                  {speakers.length === 0 && (
                    <p className="text-sm text-slate-500 col-span-3 text-center py-10">No speakers found.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GALLERY (FILE UPLOAD) */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 h-fit shadow-sm">
                <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
                  <PlusCircle size={18} className="text-indigo-400" /> Upload Gallery Photo
                </h3>
                <form onSubmit={handleCreateGallery} className="space-y-3.5 text-sm">
                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Gallery Photo (File)</label>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setGalleryFile(e.target.files[0])}
                      className="w-full text-xs text-slate-400 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-slate-800 file:text-slate-200 hover:file:bg-slate-700 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Event Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pitch Perfect 3.0"
                      value={galleryData.eventName}
                      onChange={(e) => setGalleryData({ ...galleryData, eventName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Date</label>
                    <input
                      type="date"
                      required
                      value={galleryData.date}
                      onChange={(e) => setGalleryData({ ...galleryData, date: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition shadow-lg shadow-indigo-600/20"
                  >
                    Upload Photo
                  </button>
                </form>
              </div>

              {/* IS CODE SE REPLACE KAREIN */}
              <div className="lg:col-span-2">
                <h3 className="text-base font-semibold text-white mb-3">Gallery Photos ({gallery.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {gallery.map((item) => {
                    const displayImage = item.photoUrl || item.imageUrl;
                    const displayTitle = item.eventName || item.title || "Gallery Item";
                    const displayDate = item.date ? new Date(item.date).toLocaleDateString() : "";

                    return (
                      <div
                        key={item._id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden relative group flex flex-col justify-between"
                      >
                        <button
                          onClick={() => handleDeleteGallery(item._id)}
                          className="absolute top-2 right-2 p-1.5 bg-slate-950/80 text-slate-400 hover:text-red-400 rounded-lg transition z-10"
                        >
                          <Trash2 size={15} />
                        </button>

                        <div className="w-full h-36 bg-slate-950 flex items-center justify-center overflow-hidden">
                          {displayImage ? (
                            <img
                              src={displayImage}
                              alt={displayTitle}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://placehold.co/600x400/0b1626/f3ca65?text=Preview+Error";
                              }}
                            />
                          ) : (
                            <span className="text-xs text-slate-500">No Image</span>
                          )}
                        </div>

                        <div className="p-3">
                          <h4 className="font-semibold text-white text-xs line-clamp-1">{displayTitle}</h4>
                          {displayDate && <span className="text-[10px] text-slate-500">{displayDate}</span>}
                        </div>
                      </div>
                    );
                  })}
                  {gallery.length === 0 && (
                    <p className="text-sm text-slate-500 col-span-3 text-center py-10">No gallery photos found.</p>
                  )}
                </div>
              </div>
            </div>
          )}



          {activeTab === "sponsors" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upload Form */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit">
                <h3 className="text-lg font-bold text-white mb-4">Add New Sponsor</h3>
                <form onSubmit={handleAddSponsor} className="space-y-4">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Sponsor Name</label>
                    <input
                      type="text"
                      required
                      value={newSponsor.name}
                      onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
                      placeholder="e.g. Google / Microsoft"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Tier / Category</label>
                    <select
                      value={newSponsor.tier}
                      onChange={(e) => setNewSponsor({ ...newSponsor, tier: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Title Sponsor">Title Sponsor</option>
                      <option value="Platinum Sponsor">Platinum Sponsor</option>
                      <option value="Gold Sponsor">Gold Sponsor</option>
                      <option value="Silver Sponsor">Silver Sponsor</option>
                      <option value="Associate Partner">Associate Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Website URL (Optional)</label>
                    <input
                      type="url"
                      value={newSponsor.websiteUrl}
                      onChange={(e) => setNewSponsor({ ...newSponsor, websiteUrl: e.target.value })}
                      placeholder="https://sponsor.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Sponsor Logo (Image File)</label>
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={(e) => setSponsorLogoFile(e.target.files[0])}
                      className="w-full text-xs text-slate-400 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:bg-slate-800 file:text-white hover:file:bg-slate-700"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl text-sm transition"
                  >
                    Upload Sponsor
                  </button>
                </form>
              </div>

              {/* Sponsors List Grid */}
              <div className="lg:col-span-2">
                <h3 className="text-base font-semibold text-white mb-3">
                  Active Sponsors ({sponsors.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {sponsors.map((item) => (
                    <div
                      key={item._id}
                      className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-between relative group"
                    >
                      <button
                        onClick={() => handleDeleteSponsor(item._id)}
                        className="absolute top-2 right-2 p-1.5 bg-slate-950/80 text-slate-400 hover:text-red-400 rounded-lg transition"
                      >
                        <Trash2 size={15} />
                      </button>

                      <div className="w-full h-28 bg-slate-950 rounded-xl flex items-center justify-center p-3 overflow-hidden">
                        <img
                          src={item.logoUrl}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain filter hover:brightness-110 transition"
                        />
                      </div>

                      <div className="text-center mt-3 w-full">
                        <h4 className="font-semibold text-white text-sm line-clamp-1">{item.name}</h4>
                        <span className="text-[11px] text-[#f3ca65] block uppercase tracking-wider font-cinzel mt-0.5">
                          {item.tier}
                        </span>
                      </div>
                    </div>
                  ))}
                  {sponsors.length === 0 && (
                    <p className="text-sm text-slate-500 col-span-3 text-center py-10">
                      No sponsors uploaded yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}





          {/* TAB 5: APPLICATIONS */}
          {activeTab === "applications" && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
                <h3 className="font-semibold text-white">Student Registration Forms</h3>
                <span className="text-xs text-slate-400">{applications.length} Received</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-950/60 text-xs uppercase text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-3">Student Name</th>
                      <th className="px-6 py-3">Contact</th>
                      <th className="px-6 py-3">Branch & Year</th>
                      <th className="px-6 py-3">Domain</th>
                      <th className="px-6 py-3">Why Join / Context</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {applications.map((app) => (
                      <tr key={app._id} className="hover:bg-slate-800/30 transition">
                        <td className="px-6 py-4 font-medium text-white">{app.fullName}</td>
                        <td className="px-6 py-4 text-xs">
                          <div>{app.email}</div>
                          <div className="text-slate-400">{app.phoneNumber}</div>
                        </td>
                        <td className="px-6 py-4 text-xs">
                          {app.branch} ({app.year})
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 text-xs rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800">
                            {app.domainOfInterest}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-400 max-w-xs truncate" title={app.whyJoin}>
                          {app.whyJoin}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleDeleteApplication(app._id)}
                            className="p-1.5 text-red-400 hover:bg-red-950/40 rounded-lg transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {applications.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-8 text-slate-500">
                          No student applications found yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}



