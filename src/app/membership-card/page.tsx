"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/client";

interface MembershipData {
  full_name: string;
  membership_number: string;
  tier: string;
  status: string;
  start_date: string;
  expiry_date: string;
  email: string;
}

export default function MembershipCardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [data, setData] = useState<MembershipData | null>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single();
      const { data: membership } = await supabase.from("memberships").select("*").eq("user_id", user.id).eq("status", "active").single();

      if (!membership) { setLoading(false); return; }

      setData({
        full_name: profile?.full_name ?? "Member",
        membership_number: membership.membership_number,
        tier: membership.tier,
        status: membership.status,
        start_date: membership.start_date,
        expiry_date: membership.expiry_date,
        email: user.email ?? "",
      });
      setLoading(false);
    }
    load();
  }, []);

  async function handleDownload() {
    if (!data) return;
    setDownloading(true);

    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: [85.6, 54] });

    // Background
    doc.setFillColor(0, 61, 36);
    doc.rect(0, 0, 85.6, 54, "F");

    // Gold accent bar
    doc.setFillColor(212, 175, 55);
    doc.rect(0, 0, 85.6, 4, "F");
    doc.rect(0, 50, 85.6, 4, "F");

    // ANFASSC title
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("ANFASSC", 6, 12);

    // Subtitle
    doc.setTextColor(168, 212, 189);
    doc.setFontSize(4.5);
    doc.setFont("helvetica", "normal");
    doc.text("AUTHENTIC NIGERIA FOOTBALL & ALLIED SPORTS SUPPORTERS CLUB", 6, 16);

    // Tier badge
    doc.setFillColor(212, 175, 55);
    doc.roundedRect(62, 7, 18, 6, 1, 1, "F");
    doc.setTextColor(0, 40, 20);
    doc.setFontSize(6);
    doc.setFont("helvetica", "bold");
    doc.text(data.tier.toUpperCase(), 71, 11.5, { align: "center" });

    // Member name
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(data.full_name.toUpperCase(), 6, 28);

    // Membership number
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(6);
    doc.setFont("helvetica", "normal");
    doc.text(data.membership_number, 6, 33);

    // Valid from / Expires labels
    doc.setTextColor(168, 212, 189);
    doc.setFontSize(5);
    doc.text("VALID FROM", 6, 40);
    doc.text("EXPIRES", 45, 40);

    // Valid from / Expires values
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(6.5);
    doc.setFont("helvetica", "bold");
    doc.text(new Date(data.start_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), 6, 45);
    doc.text(new Date(data.expiry_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }), 45, 45);

    // CAF / FIFA endorsed
    doc.setTextColor(168, 212, 189);
    doc.setFontSize(4);
    doc.setFont("helvetica", "normal");
    doc.text("CAF RECOGNISED · FIFA ENDORSED", 6, 49);

    doc.save(`ANFASSC-Card-${data.membership_number}.pdf`);
    setDownloading(false);
  }

  const tierColor: Record<string, string> = {
    standard: "#666",
    premium: "#008751",
    vip: "#D4AF37",
  };

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh", background: "#F8F5EF", padding: "8rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          <a href="/dashboard" style={{ fontSize: "0.85rem", color: "#008751", textDecoration: "none" }}>← Back to Dashboard</a>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, marginTop: "0.75rem", marginBottom: "2rem" }}>Membership Card</h1>

          {loading ? (
            <p style={{ color: "#666" }}>Loading...</p>
          ) : !data ? (
            <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "4px", padding: "2rem", textAlign: "center" }}>
              <p style={{ color: "#666", marginBottom: "1.5rem" }}>No active membership found.</p>
              <a href="/membership" style={{ display: "inline-block", background: "#008751", color: "#fff", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", padding: "12px 28px", textDecoration: "none", borderRadius: "2px" }}>
                Get Membership
              </a>
            </div>
          ) : (
            <div>
              {/* Card Preview */}
              <div style={{ background: "#003d24", borderRadius: "8px", padding: "2rem", marginBottom: "2rem", position: "relative", overflow: "hidden", aspectRatio: "85.6/54" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: "#D4AF37" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "6px", background: "#D4AF37" }} />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#D4AF37", letterSpacing: "2px" }}>ANFASSC</div>
                    <div style={{ fontSize: "9px", color: "#a8d4bd", letterSpacing: "1px", textTransform: "uppercase", marginTop: "2px" }}>Nigeria Football Supporters Club</div>
                  </div>
                  <span style={{ background: "#D4AF37", color: "#003d24", fontWeight: 700, fontSize: "11px", textTransform: "uppercase", padding: "4px 10px", borderRadius: "2px" }}>
                    {data.tier}
                  </span>
                </div>

                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem", letterSpacing: "1px" }}>
                  {data.full_name.toUpperCase()}
                </div>
                <div style={{ fontSize: "11px", color: "#D4AF37", letterSpacing: "2px", marginBottom: "1.5rem" }}>
                  {data.membership_number}
                </div>

                <div style={{ display: "flex", gap: "3rem" }}>
                  <div>
                    <div style={{ fontSize: "9px", color: "#a8d4bd", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Valid From</div>
                    <div style={{ fontSize: "12px", color: "#fff", fontWeight: 600 }}>
                      {new Date(data.start_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "9px", color: "#a8d4bd", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Expires</div>
                    <div style={{ fontSize: "12px", color: "#fff", fontWeight: 600 }}>
                      {new Date(data.expiry_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </div>
                </div>

                <div style={{ position: "absolute", bottom: "14px", right: "16px", fontSize: "8px", color: "#a8d4bd", letterSpacing: "1px" }}>
                  CAF RECOGNISED · FIFA ENDORSED
                </div>
              </div>

              <button
                onClick={handleDownload}
                disabled={downloading}
                style={{
                  width: "100%",
                  background: downloading ? "#005e38" : "#008751",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  padding: "14px",
                  border: "none",
                  borderRadius: "2px",
                  cursor: downloading ? "default" : "pointer",
                }}
              >
                {downloading ? "Generating PDF..." : "⬇ Download Card as PDF"}
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}