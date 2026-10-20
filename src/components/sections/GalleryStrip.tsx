"use client";
import Link from "next/link";

export interface GalleryStripAlbum {
  id: string;
  label: string;
  image: string | null;
}

// Shown to fill any empty slots until real albums exist in /admin/gallery
const FALLBACK_CELLS: GalleryStripAlbum[] = [
  { id: "f1", label: "AFCON Morocco 2025", image: null },
  { id: "f2", label: "Super Eagles", image: null },
  { id: "f3", label: "Our Members", image: null },
  { id: "f4", label: "Events & Travels", image: null },
  { id: "f5", label: "Lagos Headquarters", image: null },
  { id: "f6", label: "Recognition & Awards", image: null },
];

export default function GalleryStrip({ albums = [] }: { albums?: GalleryStripAlbum[] }) {
  const cells = [...albums, ...FALLBACK_CELLS].slice(0, 6);

  return (
    <Link href="/gallery" style={{ display: "flex", height: "140px", overflow: "hidden", background: "#003d24", textDecoration: "none" }}>
      {cells.map((cell) => (
        <div key={cell.id} className="gallery-cell" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "1px solid rgba(255,255,255,0.05)", position: "relative", overflow: "hidden", cursor: "pointer", transition: "background 0.3s" }}
          onMouseEnter={e => { (e.currentTarget.style.background = "rgba(212,175,55,0.1)"); (e.currentTarget.querySelector(".gc-label") as HTMLElement)!.style.opacity = "1"; }}
          onMouseLeave={e => { (e.currentTarget.style.background = "transparent"); (e.currentTarget.querySelector(".gc-label") as HTMLElement)!.style.opacity = "0"; }}>
          {cell.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cell.image} alt={cell.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
          ) : (
            <span style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)", fontStyle: "italic", fontSize: "1.8rem", color: "rgba(255,255,255,0.07)", fontWeight: 900 }}>{cell.label.split(" ")[0].toUpperCase()}</span>
          )}
          <div className="gc-label" style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(0,0,0,0.6)", fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#D4AF37", padding: "6px 8px", textAlign: "center", opacity: 0, transition: "opacity 0.3s" }}>{cell.label}</div>
        </div>
      ))}
    </Link>
  );
}
