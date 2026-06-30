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
    <section ref={ref} className="hero-section" style={{ background: "#003d24", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden", paddingTop: "80px", paddingBottom: "2rem" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,135,81,0.08) 40px, rgba(0,135,81,0.08) 41px)" }} />
      <div className="hero-stripe" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "38%", background: "#008751", clipPath: "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)" }} />
      <div className="hero-stripe-gold" style={{ position: "absolute", right: "38%", top: 0, bottom: 0, width: "4px", background: "#D4AF37", transform: "skewX(-6deg)" }} />

      <div style={{ position: "relative", zIndex: 2, padding: "0 3rem", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <div className="fade-up" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
          <div style={{ width: "40px", height: "1px", background: "#D4AF37" }} />
          <span style={{ fontWeight: 600, fontSize: "12px", letterSpacing: "4px", textTransform: "uppercase", color: "#D4AF37" }}>
            Nigeria&apos;s Official Supporters Club
          </span>
        </div>

        <h1 className="fade-up" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem, 7vw, 6.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: "1.5rem", maxWidth: "700px" }}>
          One Nation,<br />
          One <em style={{ color: "#D4AF37" }}>Voice,</em><br />
          One Club.
        </h1>

        <p className="fade-up" style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(255,255,255,0.7)", maxWidth: "480px", lineHeight: 1.7, marginBottom: "2.5rem" }}>
          For over three decades, ANFASSC has been the heartbeat of Nigerian football — carrying the green-white-green to every stadium across Africa and beyond.
        </p>

        <div className="fade-up" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem" }}>
          <Link href="/membership" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#D4AF37", color: "#003d24", fontWeight: 700, fontSize: "14px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "14px 32px", borderRadius: "2px", textDecoration: "none" }}>
            Become a Member ›
          </Link>
          <Link href="/about" style={{ display: "inline-flex", alignItems: "center", background: "transparent", color: "#fff", fontWeight: 600, fontSize: "14px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "13px 32px", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "2px", textDecoration: "none" }}>
            Our Story
          </Link>
        </div>

        <div className="fade-up hero-badges" style={{ display: "flex", gap: "2rem", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem", flexWrap: "wrap" }}>
          {[
            { num: "30+", label: "Years of Passion" },
            { num: "CAF", label: "Recognised Body" },
            { num: "FIFA", label: "Endorsed" },
            { num: "AFCON", label: "Morocco 2025" },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.6rem", color: "#D4AF37", lineHeight: 1 }}>{item.num}</div>
              <div style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: "4px", whiteSpace: "nowrap" }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .fade-up { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-up.visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 768px) {
          .hero-section > div { padding: 0 1.5rem !important; }
          .hero-stripe, .hero-stripe-gold { display: none; }
          .hero-badges { gap: 1.25rem !important; }
        }
      `}</style>
    </section>
  );
}