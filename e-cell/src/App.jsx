import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import JoinUs from "./pages/JoinUs";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard"
import EventDetail from "./pages/EventDetail";
import EventPage from "./pages/Events";
import Gallery from "./pages/Gallery";

import Team from "./pages/Team";
import Sponsors from "./pages/Sponsors";

export default function App() {
  return (
   <div className="w-full min-h-screen bg-[#D1BE94] text-[#070d18] flex flex-col selection:bg-[#c5a059] selection:text-white">
      {/* Navbar */}
      <Routes>
        {/* ================= PUBLIC ROUTES (Navbar Visible) ================= */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <div className="pt-20"> {/* Navbar ke 80px height ka top padding */}
                <Home />
              </div>
            </>
          }
        />

        <Route path="/team" element={<><Navbar /><div className="pt-20"><Team /></div></>} />
        <Route path="/sponsors" element={<><Navbar /><div className="pt-20"><Sponsors /></div></>} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/gallery" element={<Gallery />} />

        <Route
          path="/join"
          element={
            <>
              <Navbar />
              <div className="pt-20">
                <JoinUs />
              </div>
            </>
          }
        />

        {/* ================= ADMIN ROUTES (No Public Navbar) ================= */}
        {/* 1. Admin Login Screen */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 2. Admin Dashboard (Protected: Sirf login hone par access hoga) */}
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
      <Footer />
    </div>
  );
}






















// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
