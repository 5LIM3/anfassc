"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/client";

export default function ProfilePage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      setEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone")
        .eq("id", user.id)
        .single();

      if (profile) {
        setFullName(profile.full_name ?? "");
        setPhone(profile.phone ?? "");
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone: phone || null })
      .eq("id", user.id);

    if (error) {
      setMessage({ type: "error", text: "Failed to update profile. Please try again." });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully!" });
       router.refresh();
    }
    setSaving(false);
  }

  const inputStyle = { width: "100%", padding: "12px 14px", border: "1px solid #e5e5e5", borderRadius: "2px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { display: "block", fontWeight: 700, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "#666", marginBottom: "8px" };

  if (loading) {
    return (
      <>
        <Navbar />
        <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#666" }}>Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh", background: "#F8F5EF", padding: "8rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          <div style={{ marginBottom: "2rem" }}>
            <a href="/dashboard" style={{ fontSize: "0.85rem", color: "#008751", textDecoration: "none" }}>← Back to Dashboard</a>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, marginTop: "0.75rem" }}>My Profile</h1>
            <p style={{ color: "#666", marginTop: "0.5rem" }}>Update your personal details.</p>
          </div>

          <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "4px", padding: "2rem" }}>
            {message && (
              <div style={{
                background: message.type === "success" ? "#e8f4ee" : "#fee",
                border: `1px solid ${message.type === "success" ? "#008751" : "#f5a8a8"}`,
                color: message.type === "success" ? "#008751" : "#c0392b",
                padding: "12px 16px", borderRadius: "2px", fontSize: "0.85rem", marginBottom: "1.5rem",
              }}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  style={{ ...inputStyle, background: "#f5f5f5", color: "#999", cursor: "not-allowed" }}
                />
                <p style={{ fontSize: "11px", color: "#999", marginTop: "4px" }}>Email cannot be changed here.</p>
              </div>

              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08012345678"
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                style={{
                  background: saving ? "#005e38" : "#008751",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  padding: "13px",
                  border: "none",
                  borderRadius: "2px",
                  cursor: saving ? "default" : "pointer",
                }}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}