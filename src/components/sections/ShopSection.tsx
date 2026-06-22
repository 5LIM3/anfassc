"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PRODUCTS = [
  { id: "1", slug: "anfassc-home-jersey-2025", name: "ANFASSC Official Home Jersey 2025", price: "₦15,000", category: "Jersey", badge: "New", badgeBg: "#008751", bg: "#e8f4ee", icon: "⚽" },
  { id: "2", slug: "afcon-morocco-2025-polo", name: "AFCON Morocco 2025 Special Edition Polo", price: "₦12,000", category: "Polo", badge: "Limited", badgeBg: "#D4AF37", badgeColor: "#003d24", bg: "#fdf8e8", icon: "★" },
  { id: "3", slug: "anfassc-supporters-cap", name: "ANFASSC Official Supporters Cap", price: "₦5,500", category: "Cap", badge: null, badgeBg: "", bg: "#eef4ff", icon: "🎩" },
  { id: "4", slug: "anfassc-welcome-pack", name: "ANFASSC Membership Welcome Pack", price: "₦25,000", category: "Bundle", badge: "Bundle", badgeBg: "#6030a0", bg: "#f4eef8", icon: "📦" },
];

export default function ShopSection() {
  const ref = useRef<HTMLElement>(null);
  const [added, setAdded] = useState<string | null>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".sh-fade");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add("sh-vis"), i * 80); });
    }, { threshold: 0.1 });
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#fff", padding: "6rem 3rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div className="sh-fade" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
              <div style={{ width: "24px", height: "2px", background: "#008751" }} />
              <span style={{ fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 600, fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#008751" }}>Official Merchandise</span>
            </div>
            <h2 className="sh-fade" style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0A0A0A", lineHeight: 1.15, margin: 0 }}>Wear Your<br />Nigerian Pride</h2>
          </div>
          <Link href="/shop" style={{ fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#008751", textDecoration: "none", border: "1px solid #008751", padding: "10px 20px", borderRadius: "2px", whiteSpace: "nowrap", transition: "background 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#008751"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#008751"; }}>
            View All Products ›
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          {PRODUCTS.map((p) => (
            <div key={p.id} className="sh-fade" style={{ border: "1px solid rgba(0,135,81,0.12)", borderRadius: "2px", overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ background: p.bg, height: "220px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <span style={{ fontSize: "4rem", opacity: 0.3 }}>{p.icon}</span>
                {p.badge && (
                  <span style={{ position: "absolute", top: "12px", right: "12px", background: p.badgeBg, color: p.badgeColor ?? "#fff", fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase", padding: "4px 10px" }}>{p.badge}</span>
                )}
              </div>
              <div style={{ padding: "1.25rem" }}>
                <p style={{ fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#666", marginBottom: "0.4rem" }}>{p.category}</p>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0A0A0A", marginBottom: "1rem", lineHeight: 1.3 }}>{p.name}</h4>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: "1.1rem", color: "#008751" }}>{p.price}</span>
                  <button onClick={() => { setAdded(p.id); setTimeout(() => setAdded(null), 1500); }}
                    style={{ background: added === p.id ? "#005e38" : "#008751", color: "#fff", fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", padding: "8px 14px", border: "none", cursor: "pointer", transition: "background 0.2s" }}>
                    {added === p.id ? "✓ Added!" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`.sh-fade { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; } .sh-fade.sh-vis { opacity: 1; transform: translateY(0); } @media (max-width: 900px) { .sh-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
    </section>
  );
}
