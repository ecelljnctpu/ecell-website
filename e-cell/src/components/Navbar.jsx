import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "/#home" },
    { name: "ABOUT", href: "/#about" },
    { name: "EVENTS", href: "/events" },
   
    { name: "SPEAKERS", href: "/#speakers" },
     { name: "GALLERY", href: "/gallery" },
    { name: "TEAM", href: "/team" },
    { name: "SPONSORS", href: "/sponsors" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#112038]/95 backdrop-blur-md border-b border-[#c5a059]/25 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Official E-Cell Bulb Logo + Text */}
        <Link to="/" className="flex items-center gap-3.5 group">
          <div className="relative flex items-center justify-center">
            {/* Ambient Golden Glow Behind Logo */}
            <div className="absolute w-9 h-9 rounded-full bg-[#f4b41a]/25 blur-md group-hover:scale-125 transition-transform duration-300" />
            <img
              src="/Logo_ECELL.png"
              alt="E-Summit Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(247,200,68,0.7)] relative z-10 group-hover:scale-105 transition-transform"
            />
          </div>
          <span 
            className="text-xl sm:text-2xl font-bold tracking-[0.18em] text-white select-none"
            style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
          >
            E-CELL
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{ fontFamily: "'Cinzel', 'Montserrat', sans-serif" }}
              className="text-[12px] font-semibold tracking-[0.22em] text-[#d6deeb] hover:text-[#f3ca65] transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right: Golden Outlined JOIN US Button */}
        <div className="hidden lg:block">
          <Link
            to="/join"
            style={{ fontFamily: "'Cinzel', 'Montserrat', sans-serif" }}
            className="inline-block px-6 py-2.5 text-xs font-bold tracking-[0.2em] text-[#e5b85c] border border-[#c59b4c] hover:bg-[#c59b4c]/15 hover:border-[#f3ca65] hover:text-[#f7d688] transition-all duration-300 rounded-[2px] shadow-[0_0_12px_rgba(197,155,76,0.15)]"
          >
            JOIN US
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#d6deeb] hover:text-[#f3ca65] p-2 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#112038] border-b border-[#c5a059]/20 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                style={{ fontFamily: "'Cinzel', 'Montserrat', sans-serif" }}
                className="text-xs tracking-[0.2em] text-[#d6deeb] hover:text-[#f3ca65] py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <Link
              to="/join"
              onClick={() => setIsOpen(false)}
              style={{ fontFamily: "'Cinzel', 'Montserrat', sans-serif" }}
              className="block w-full text-center py-3 text-xs font-bold tracking-[0.2em] text-[#e5b85c] border border-[#c59b4c] hover:bg-[#c59b4c]/10 rounded-[2px]"
            >
              JOIN US
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}