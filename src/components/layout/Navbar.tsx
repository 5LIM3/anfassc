"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import CartIcon from "@/components/shop/CartIcon";

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

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-gold ${scrolled ? "bg-green-900/98 backdrop-blur-sm" : "bg-green-900"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 no-underline" onClick={() => setMenuOpen(false)}>
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center font-condensed font-black text-[10px] text-green-900 leading-tight text-center">
            ANFASSC
          </div>
          <div>
            <div className="font-condensed font-bold text-white text-sm uppercase tracking-wider leading-none">Authentic NFASSC</div>
            <div className="font-condensed text-gold text-[9px] uppercase tracking-[3px] mt-0.5">Est. 1993 · Lagos</div>
          </div>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="font-condensed font-bold text-xs uppercase tracking-[2px] text-white/80 hover:text-gold transition-colors no-underline">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-5">
          <CartIcon />
          <Link href="/login" className="font-condensed font-bold text-xs uppercase tracking-[2px] text-white/70 hover:text-white transition-colors">
            Login
          </Link>
          <Link
            href="/membership"
            style={{ background: "#D4AF37", color: "#003d24", fontWeight: 700, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", padding: "8px 20px", borderRadius: "2px", textDecoration: "none" }}
          >
            Join Now
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <CartIcon />
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white p-2" aria-label="Toggle menu">
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-green-900 border-t border-green-800 px-6 py-4" style={{ maxHeight: "calc(100vh - 64px)", overflowY: "auto" }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              className="block py-3 font-condensed font-bold text-sm uppercase tracking-widest text-white/80 hover:text-gold border-b border-green-800 transition-colors">
              {link.label}
            </Link>
          ))}
          <Link href="/login" onClick={() => setMenuOpen(false)}
            className="block py-3 font-condensed font-bold text-sm uppercase tracking-widest text-white/80 hover:text-gold border-b border-green-800 transition-colors">
            Login
          </Link>
          <Link href="/membership" onClick={() => setMenuOpen(false)}
            className="block mt-4 bg-gold text-green-900 font-condensed font-bold text-sm uppercase tracking-widest text-center py-3" style={{ borderRadius: "2px" }}>
            Join ANFASSC
          </Link>
        </div>
      )}
    </nav>
  );
}