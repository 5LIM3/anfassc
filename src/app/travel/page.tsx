import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = {
  title: "Travel Packages",
  description: "Official ANFASSC travel packages to AFCON, World Cup qualifiers, and other tournaments. Organised, safe, affordable.",
};

const PACKAGES = [
  { id: "1", title: "CHAN 2025 — Morocco", tournament: "CHAN 2025", destination: "Morocco", departure: "Aug 1, 2025", price: 450000, includes: ["Return flights (Lagos–Casablanca)", "Hotel (3 nights)", "Match tickets x2", "ANFASSC group transport", "Official itinerary"], spots: 5 },
  { id: "2", title: "WCQ — Nigeria vs. Rwanda", tournament: "World Cup Qualifiers", destination: "Kigali, Rwanda", departure: "Sep 5, 2025", price: 300000, includes: ["Return flights", "Hotel (2 nights)", "Match ticket", "Group coordination"], spots: 12 },
];

export default function TravelPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero label="Official Travel" title="Travel with ANFASSC" subtitle="Organised, safe, and affordable trips to support the Super Eagles on the road." />
        <section style={{ padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "2rem" }}>
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ background: "#003d24", color: "#fff", padding: "1.75rem" }}>
                  <p style={{ fontWeight: 700, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", color: "#D4AF37", marginBottom: "0.5rem" }}>{pkg.tournament}</p>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>{pkg.title}</h3>
                  <p style={{ color: "#a8d4bd", fontSize: "0.9rem", marginTop: "0.5rem" }}>{pkg.destination} · Departs {pkg.departure}</p>
                </div>
                <div style={{ padding: "1.75rem" }}>
                  <p style={{ fontWeight: 700, fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#666", marginBottom: "0.75rem" }}>Package Includes</p>
                  <ul style={{ listStyle: "none", padding: 0, marginBottom: "1.5rem" }}>
                    {pkg.includes.map((inc) => (
                      <li key={inc} style={{ fontSize: "0.9rem", color: "#2e2e2e", display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "0.5rem" }}>
                        <span style={{ color: "#008751" }}>✓</span>{inc}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", paddingTop: "1rem", borderTop: "1px solid #eee" }}>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 700, color: "#008751" }}>₦{pkg.price.toLocaleString()}</div>
                      <p style={{ fontSize: "0.75rem", color: "#666", margin: 0 }}>per person · {pkg.spots} spots left</p>
                    </div>
                    <a href="/register" style={{ background: "#008751", color: "#fff", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "12px 28px", textDecoration: "none", borderRadius: "2px", whiteSpace: "nowrap" }}>
                      Book This Package
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}