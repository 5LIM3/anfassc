"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".au-fade");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add("au-visible"), i * 100); } });
    }, { threshold: 0.15 });
    els?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id="about" style={{ background: "#fff", padding: "6rem 3rem" }}>
      <div className="rgrid-2" style={{ maxWidth: "1200px", margin: "0 auto", gap: "5rem", alignItems: "center" }}>

        <div className="au-fade" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px", background: "#D4AF37", borderRadius: "2px", zIndex: 0 }} />
          <div style={{ background: "#008751", aspectRatio: "4/5", borderRadius: "4px", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "8rem", fontStyle: "italic", color: "rgba(255,255,255,0.12)", fontWeight: 900 }}>NG</div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(0,40,20,0.8) 100%)" }} />
            <div style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem", background: "#D4AF37", padding: "1rem 1.5rem", borderRadius: "2px" }}>
              <p style={{ fontWeight: 700, fontSize: "13px", letterSpacing: "1px", textTransform: "uppercase", color: "#003d24", margin: 0 }}>AFCON Morocco 2025</p>
              <span style={{ fontSize: "11px", fontWeight: 400, color: "rgba(0,40,20,0.7)" }}>ANFASSC Official Delegation — Supporting the Super Eagles</span>
            </div>
          </div>
        </div>

        <div>
          <div className="au-fade" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
            <div style={{ width: "24px", height: "2px", background: "#008751" }} />
            <span style={{ fontWeight: 600, fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#008751" }}>Our Story</span>
          </div>

          <h2 className="au-fade" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0A0A0A", lineHeight: 1.15, marginBottom: "1.5rem" }}>
            Nigeria&apos;s Heartbeat<br />in the Stands
          </h2>

          {[
            "Founded over three decades ago, the Authentic Nigeria Football & Allied Sports Supporters Club (ANFASSC) is Nigeria's foremost, officially recognised supporters club — proudly recognised by CAF and endorsed by FIFA.",
            "Under the leadership of Prince Abayomi Ogunjimi, ANFASSC has grown from a passionate Lagos-based collective into the nation's most respected sporting representative body — present at every major tournament and working closely with the NFF, CAF, and FIFA.",
            "From AFCON to World Cup qualifiers, our members travel the continent as proud ambassadors of Nigerian football, embodying the spirit and unity of the nation.",
          ].map((p, i) => (
            <p key={i} className="au-fade" style={{ fontSize: "1.05rem", color: "#2e2e2e", lineHeight: 1.8, marginBottom: "1.25rem" }} dangerouslySetInnerHTML={{ __html: p.replace("Prince Abayomi Ogunjimi", "<strong>Prince Abayomi Ogunjimi</strong>") }} />
          ))}

          <div className="au-fade" style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
            {[
              { abbr: "CAF", full: "Confederation of African Football" },
              { abbr: "FIFA", full: "Global Football Governing Body" },
              { abbr: "NFF", full: "Nigeria Football Federation" },
            ].map((e) => (
              <div key={e.abbr} style={{ display: "flex", alignItems: "center", gap: "10px", background: "#F8F5EF", border: "1px solid rgba(0,135,81,0.15)", padding: "10px 16px", borderRadius: "2px" }}>
                <div style={{ width: "32px", height: "32px", background: "#008751", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "9px", color: "#fff", letterSpacing: "0.5px", textAlign: "center", lineHeight: 1.1, flexShrink: 0 }}>{e.abbr}</div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: 600, color: "#2e2e2e" }}>{e.abbr} {e.abbr === "CAF" ? "Recognised" : e.abbr === "FIFA" ? "Endorsed" : "Partner"}</div>
                  <div style={{ fontSize: "10px", fontWeight: 400, color: "#666" }}>{e.full}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="au-fade" style={{ marginTop: "2rem" }}>
            <Link href="/about" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#008751", color: "#fff", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "12px 28px", borderRadius: "2px", textDecoration: "none" }}>
              Read Our Full Story ›
            </Link>
          </div>
        </div>
      </div>

      <style>{`.au-fade { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; } .au-fade.au-visible { opacity: 1; transform: translateY(0); }`}</style>
    </section>
  );
}