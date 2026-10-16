import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import JoinUs from "./pages/JoinUs";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import EventDetail from "./pages/EventDetail";
import EventPage from "./pages/Events";
import Blogs from "./pages/Blogs";
import BlogDetail from "./pages/BlogDetail";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Sponsors from "./pages/Sponsors";

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="w-full min-h-screen bg-[#D1BE94] text-[#070d18] flex flex-col selection:bg-[#c5a059] selection:text-white">
      {/* Sirf Admin routes par Navbar hide hoga, baaki sabhi pages par show hoga */}
      {!isAdminRoute && <Navbar />}

      <div className={!isAdminRoute ? "pt-20 flex-grow" : "flex-grow"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/join" element={<JoinUs />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route
            path="*"
            element={
              <div className="h-screen flex flex-col items-center justify-center text-center p-6">
                <h1 className="font-cinzel text-6xl text-[#e5b85c] font-bold">404</h1>
                <p className="mt-3 text-slate-400">Page not found</p>
                <a
                  href="/"
                  className="mt-6 px-6 py-2.5 border border-[#c59b4c] text-[#e5b85c] font-cinzel text-xs tracking-[0.2em] rounded-[2px]"
                >
                  RETURN HOME
                </a>
              </div>
            }
          />
        </Routes>
      </div>

      {!isAdminRoute && <Footer />}
    </div>
  );
}