"use client";
import Link from "next/link";

export default function JoinCTA() {
  return (
    <section id="join" style={{ background: "#008751", padding: "6rem 3rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontFamily: "var(--font-display, 'Playfair Display', serif)", fontSize: "16rem", fontWeight: 900, color: "rgba(0,0,0,0.08)", whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none" }}>ANFASSC</div>
      <div style={{ position: "relative", zIndex: 1, maxWidth: "600px", margin: "0 auto" }}>
        <h2 style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, color: "#fff", marginBottom: "1.5rem", lineHeight: 1.1 }}>
          Join the <em style={{ color: "#D4AF37" }}>Nation&apos;s</em><br />Loudest Family
        </h2>
        <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "rgba(255,255,255,0.85)", maxWidth: "500px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          Become an official ANFASSC member and be part of Nigeria&apos;s most passionate sporting community — with exclusive benefits, travel packages, merchandise discounts, and more.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/register" style={{ display: "inline-block", background: "#D4AF37", color: "#003d24", fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 700, fontSize: "14px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "14px 36px", borderRadius: "2px", textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#F0D060")}
            onMouseLeave={e => (e.currentTarget.style.background = "#D4AF37")}>
            Register Now ›
          </Link>
          <Link href="/membership" style={{ display: "inline-block", background: "transparent", color: "#fff", fontFamily: "var(--font-condensed, 'Barlow Condensed', sans-serif)", fontWeight: 600, fontSize: "14px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "13px 36px", border: "1px solid rgba(255,255,255,0.5)", borderRadius: "2px", textDecoration: "none", transition: "border-color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#D4AF37")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)")}>
            View Membership Tiers
          </Link>
        </div>
      </div>
    </section>
  );
}
