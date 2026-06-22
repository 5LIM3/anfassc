"use client";
import { useEffect, useRef } from "react";

const MISSIONS = [
  { num: "01", title: "Support & Represent", body: "Travel with, cheer for, and protect the reputation of Nigerian athletes at every tournament — from AFCON to the World Cup." },
  { num: "02", title: "Unite the Nation", body: "Bridge ethnic, regional, and cultural divides through the shared language of sport — rallying millions of Nigerians behind their national teams." },
  { num: "03", title: "Develop Grassroots", body: "Invest in Nigerian sports at the community level, identifying and uplifting emerging talent across all allied sports disciplines." },
  { num: "04", title: "Ambassador Programme", body: "Train and deploy ANFASSC ambassadors who represent Nigeria with dignity and discipline at international football events worldwide." },
  { num: "05", title: "Fan Welfare", body: "Ensure Nigerian fans have safe, affordable, and organised access to international matches — from ticketing to travel coordination." },
  { num: "06", title: "Governance & Integrity", body: "Uphold the values of fair play and ethical conduct, representing the best of Nigerian sportsmanship to the global football community." },
];

export default function MissionSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".ms-fade");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add("ms-vis"), i * 80); });
    }, { threshold: 0.1 });
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: "#003d24", padding: "6rem 3rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "400px", height: "400px", background: "rgba(212,175,55,0.05)", borderRadius: "50%" }} />
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="ms-fade" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
          <div style={{ width: "24px", height: "2px", background: "#D4AF37" }} />
          <span style={{ fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 600, fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#D4AF37" }}>Our Mission</span>
        </div>
        <h2 className="ms-fade" style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: "4rem", maxWidth: "500px" }}>
          Built on Passion.<br />Driven by Purpose.
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px" }}>
          {MISSIONS.map((m) => (
            <div key={m.num} className="ms-fade ms-card" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "2.5rem 2rem", transition: "background 0.3s", cursor: "default" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,175,55,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.04)")}>
              <div style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)", fontSize: "3rem", fontWeight: 900, color: "rgba(212,175,55,0.25)", lineHeight: 1, marginBottom: "1rem" }}>{m.num}</div>
              <div style={{ fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "1px", textTransform: "uppercase", color: "#D4AF37", marginBottom: "0.75rem" }}>{m.title}</div>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: 0 }}>{m.body}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`.ms-fade { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; } .ms-fade.ms-vis { opacity: 1; transform: translateY(0); } @media (max-width: 900px) { #mission-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}
