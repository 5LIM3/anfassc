"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

const FEATURED = {
  tag: "AFCON 2025", date: "January 2025", slug: "anfassc-afcon-morocco-2025",
  title: "ANFASSC Leads Delegation to AFCON Morocco 2025 in Full Force",
  body: "Hundreds of ANFASSC members descended on Moroccan stadiums flying the Nigerian flag high as the Super Eagles competed at the 2025 Africa Cup of Nations. President Prince Abayomi Ogunjimi led the official delegation.",
};

const SIDEBAR = [
  { tag: "Membership", date: "March 2025", slug: "membership-2025", title: "2025 Membership Registration Now Open — New Benefits Announced" },
  { tag: "Shop", date: "February 2025", slug: "jersey-2025", title: "New ANFASSC Official Jersey Collection Available — Order Yours Today" },
  { tag: "Governance", date: "December 2024", slug: "agm-2024", title: "ANFASSC Holds Annual General Meeting — Strategic Plan 2025–2027 Adopted" },
  { tag: "Super Eagles", date: "November 2024", slug: "squad-2025", title: "ANFASSC Congratulates Super Eagles on AFCON Group Stage Qualification" },
];

export default function NewsSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".ns-fade");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add("ns-vis"), i * 80); });
    }, { threshold: 0.1 });
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#F8F5EF", padding: "6rem 3rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="ns-fade" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
          <div style={{ width: "24px", height: "2px", background: "#008751" }} />
          <span style={{ fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 600, fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#008751" }}>Latest Updates</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
          <h2 className="ns-fade" style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0A0A0A", lineHeight: 1.15, margin: 0 }}>News &amp; Announcements</h2>
          <Link href="/news" style={{ fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", color: "#008751", textDecoration: "none", whiteSpace: "nowrap", marginLeft: "2rem" }}>View all →</Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
          {/* Featured */}
          <Link href={`/news/${FEATURED.slug}`} className="ns-fade ns-card" style={{ background: "#fff", border: "1px solid rgba(0,135,81,0.15)", borderRadius: "2px", overflow: "hidden", textDecoration: "none", color: "inherit", display: "block", transition: "transform 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
            <div style={{ background: "#008751", height: "260px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)", fontSize: "6rem", fontWeight: 900, fontStyle: "italic", color: "rgba(255,255,255,0.1)" }}>AFCON</div>
              <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", background: "#D4AF37", color: "#003d24", fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", padding: "5px 12px" }}>{FEATURED.tag}</div>
            </div>
            <div style={{ padding: "2rem" }}>
              <p style={{ fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontSize: "12px", color: "#666", letterSpacing: "1px", marginBottom: "0.75rem" }}>{FEATURED.date}</p>
              <h3 style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)", fontSize: "1.5rem", fontWeight: 700, color: "#0A0A0A", lineHeight: 1.3, marginBottom: "1rem" }}>{FEATURED.title}</h3>
              <p style={{ fontSize: "0.95rem", color: "#666", lineHeight: 1.7, margin: 0 }}>{FEATURED.body}</p>
            </div>
          </Link>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SIDEBAR.map((item) => (
              <Link key={item.slug} href={`/news/${item.slug}`} className="ns-fade" style={{ background: "#fff", border: "1px solid rgba(0,135,81,0.15)", borderBottom: "none", padding: "1.5rem", textDecoration: "none", color: "inherit", display: "block", transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#EDE8DC")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}>
                <div style={{ fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 600, fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#008751", marginBottom: "0.5rem" }}>{item.tag}</div>
                <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#0A0A0A", lineHeight: 1.4, marginBottom: "0.4rem" }}>{item.title}</h4>
                <p style={{ fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontSize: "12px", color: "#666", letterSpacing: "1px", margin: 0 }}>{item.date}</p>
              </Link>
            ))}
            <div style={{ border: "1px solid rgba(0,135,81,0.15)", height: "1px" }} />
          </div>
        </div>
      </div>
      <style>{`.ns-fade { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; } .ns-fade.ns-vis { opacity: 1; transform: translateY(0); }`}</style>
    </section>
  );
}
