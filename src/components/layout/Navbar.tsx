"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Travel", href: "/travel" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-gold ${scrolled ? "bg-green-900/98 backdrop-blur-sm" : "bg-green-900"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center font-condensed font-black text-[10px] text-green-900 leading-tight text-center">
            ANFASSC
          </div>
          <div>
            <div className="font-condensed font-bold text-white text-sm uppercase tracking-wider leading-none">Authentic NFASSC</div>
            <div className="font-condensed text-gold text-[9px] uppercase tracking-[3px] mt-0.5">Est. 1993 · Lagos</div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="font-condensed font-bold text-xs uppercase tracking-[2px] text-white/80 hover:text-gold transition-colors no-underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="font-condensed font-bold text-xs uppercase tracking-[2px] text-white/70 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/membership" style={{ background: "#D4AF37", color: "#003d24", fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", padding: "8px 20px", borderRadius: "2px", textDecoration: "none" }}>
            Join Now
          </Link>
        </div>

        {/* Mobile menu button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2" aria-label="Toggle menu">
          <div className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? "rotate-45 translate-y-1" : ""}`} />
          <div className={`w-5 h-0.5 bg-white mt-1 transition-all ${menuOpen ? "opacity-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-white mt-1 transition-all ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-900 border-t border-green-800 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="block py-3 font-condensed font-bold text-sm uppercase tracking-widest text-white/80 hover:text-gold border-b border-green-800 last:border-0 transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/membership" onClick={() => setMenuOpen(false)}
            className="block mt-4 bg-gold text-green-900 font-condensed font-bold text-sm uppercase tracking-widest text-center py-3">
            Join ANFASSC
          </Link>
        </div>
      )}
    </nav>
  );
}
