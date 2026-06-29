"use client";
import { useState } from "react";

const SUBJECTS = ["Membership Enquiry", "Merchandise / Shop", "Travel Package", "Media / Press", "Partnership", "General Enquiry"];

export default function ContactSection() {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", subject: "Membership Enquiry", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, subject: form.subject.toLowerCase().replace(/ \/ /g, "-").replace(/ /g, "-") }),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch { setStatus("error"); }
  };

  const inputStyle = { width: "100%", padding: "10px 14px", border: "1px solid rgba(0,135,81,0.2)", borderRadius: "2px", fontSize: "0.9rem", color: "#0A0A0A", background: "#F8F5EF", outline: "none", boxSizing: "border-box" as const };

  return (
    <section id="contact" style={{ background: "#F8F5EF", padding: "6rem 3rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
          <div style={{ width: "24px", height: "2px", background: "#008751" }} />
          <span style={{ fontWeight: 600, fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#008751" }}>Get In Touch</span>
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#0A0A0A", marginBottom: "3rem", lineHeight: 1.15 }}>Contact ANFASSC</h2>

        <div className="rgrid-2" style={{ gap: "4rem", alignItems: "start" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>Our Headquarters</h3>
            {[
              { label: "Address", value: "96 Ogunlana Drive, Surulere, Lagos, Nigeria" },
              { label: "Email", value: "info@authenticnfassc.org" },
              { label: "Instagram", value: "@authenticnfassc" },
              { label: "Facebook", value: "AuthenticNFASSC" },
              { label: "President", value: "Prince Abayomi Ogunjimi" },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(0,135,81,0.12)" }}>
                <strong style={{ display: "block", fontWeight: 700, fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#666", marginBottom: "4px" }}>{item.label}</strong>
                <p style={{ fontSize: "0.95rem", color: "#0A0A0A", margin: 0 }}>{item.value}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "#fff", border: "1px solid rgba(0,135,81,0.12)", borderRadius: "2px", padding: "2.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem" }}>Send a Message</h3>

            {status === "sent" ? (
              <div style={{ background: "#e8f4ee", border: "1px solid #008751", borderRadius: "2px", padding: "2rem", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✓</div>
                <p style={{ color: "#008751", fontWeight: 600, margin: 0 }}>Message sent! We&apos;ll be in touch soon.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="rgrid-2" style={{ gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#666", marginBottom: "6px" }}>Full Name</label>
                    <input style={inputStyle} placeholder="Chukwuemeka Okafor" value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontWeight: 600, fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#666", marginBottom: "6px" }}>Email</label>
                    <input style={inputStyle} type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#666", marginBottom: "6px" }}>Subject</label>
                  <select style={{ ...inputStyle }} value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}>
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontWeight: 600, fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", color: "#666", marginBottom: "6px" }}>Message</label>
                  <textarea style={{ ...inputStyle, height: "100px", resize: "vertical" }} placeholder="Tell us how we can help..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
                </div>
                <button onClick={handleSubmit} disabled={status === "sending"}
                  style={{ width: "100%", background: status === "sending" ? "#005e38" : "#008751", color: "#fff", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "14px", border: "none", cursor: "pointer", borderRadius: "2px" }}>
                  {status === "sending" ? "Sending..." : "Send Message ›"}
                </button>
                {status === "error" && <p style={{ color: "red", fontSize: "0.85rem", textAlign: "center" }}>Something went wrong. Please try again.</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}