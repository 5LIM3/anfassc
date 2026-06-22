"use client";
import Link from "next/link";

const CELLS = [
  { label: "AFCON Morocco 2025", text: "AFCON" },
  { label: "Super Eagles", text: "NG" },
  { label: "Our Members", text: "MEMBERS" },
  { label: "Events & Travels", text: "EVENTS" },
  { label: "Lagos Headquarters", text: "LAGOS" },
  { label: "Recognition & Awards", text: "AWARDS" },
];

export default function GalleryStrip() {
  return (
    <Link href="/gallery" style={{ display: "flex", height: "140px", overflow: "hidden", background: "#003d24", textDecoration: "none" }}>
      {CELLS.map((cell, i) => (
        <div key={i} className="gallery-cell" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden", cursor: "pointer", transition: "background 0.3s" }}
          onMouseEnter={e => { (e.currentTarget.style.background = "rgba(212,175,55,0.1)"); (e.currentTarget.querySelector(".gc-label") as HTMLElement)!.style.opacity = "1"; }}
          onMouseLeave={e => { (e.currentTarget.style.background = "transparent"); (e.currentTarget.querySelector(".gc-label") as HTMLElement)!.style.opacity = "0"; }}>
          <span style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)", fontStyle: "italic", fontSize: "1.8rem", color: "rgba(255,255,255,0.07)", fontWeight: 900 }}>{cell.text}</span>
          <div className="gc-label" style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.6)", fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#D4AF37", padding: "6px 8px", textAlign: "center", opacity: 0, transition: "opacity 0.3s" }}>{cell.label}</div>
        </div>
      ))}
    </Link>
  );
}
