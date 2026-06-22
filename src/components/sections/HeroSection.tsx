"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".fade-up");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ minHeight: "100vh", background: "#003d24", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", paddingTop: "64px" }}>
      {/* Background pattern */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,135,81,0.08) 40px, rgba(0,135,81,0.08) 41px)" }} />
      {/* Green stripe */}
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "38%", background: "#008751", clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" }} />
      {/* Gold line */}
      <div style={{ position: "absolute", right: "38%", top: 0, bottom: 0, width: "4px", background: "#D4AF37", transform: "skewX(-6deg)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, padding: "0 3rem", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
          <div style={{ width: "40px", height: "1px", background: "#D4AF37" }} />
          <span style={{ fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 600, fontSize: "12px", letterSpacing: "4px", textTransform: "uppercase", color: "#D4AF37" }}>
            Nigeria&apos;s Official Supporters Club
          </span>
        </div>

        <h1 className="fade-up" style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)", fontSize: "clamp(3rem, 7vw, 6.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: "1.5rem", maxWidth: "700px" }}>
          One Nation,<br />
          One <em style={{ color: "#D4AF37" }}>Voice,</em><br />
          One Club.
        </h1>

        <p className="fade-up" style={{ fontSize: "1.1rem", fontWeight: 300, color: "rgba(255,255,255,0.7)", maxWidth: "480px", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          For over three decades, ANFASSC has been the heartbeat of Nigerian football — carrying the green-white-green to every stadium across Africa and beyond.
        </p>

        <div className="fade-up" style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/membership" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#D4AF37", color: "#003d24", fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: "14px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "14px 32px", borderRadius: "2px", textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#F0D060")}
            onMouseLeave={e => (e.currentTarget.style.background = "#D4AF37")}>
            Become a Member ›
          </Link>
          <Link href="/about" style={{ display: "inline-flex", alignItems: "center", background: "transparent", color: "#fff", fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 600, fontSize: "14px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "13px 32px", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "2px", textDecoration: "none", transition: "border-color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#D4AF37")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}>
            Our Story
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ position: "absolute", bottom: "3rem", left: "3rem", right: "3rem", display: "flex", gap: "2.5rem", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem", zIndex: 2, flexWrap: "wrap" }}>
        {[
          { num: "30+", label: "Years of Passion" },
          { num: "CAF", label: "Recognised Body" },
          { num: "FIFA", label: "Endorsed" },
          { num: "AFCON", label: "Morocco 2025" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
            {i > 0 && <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.15)" }} />}
            <div>
              <div style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)", fontWeight: 700, fontSize: "2rem", color: "#D4AF37", lineHeight: 1 }}>{item.num}</div>
              <div style={{ fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      <style>{`.fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; } .fade-up.visible { opacity: 1; transform: translateY(0); }`}</style>
    </section>
  );
}
