"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RegisterForm() {
  const router = useRouter();
  const supabase = createClient();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tier, setTier] = useState("standard");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const inputStyle = { width: "100%", padding: "12px 14px", border: "1px solid #e5e5e5", borderRadius: "2px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { display: "block", fontWeight: 700, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "#666", marginBottom: "8px" };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: `${firstName} ${lastName}`.trim(), phone, membership_tier: tier } },
    });

    if (signUpError) { setError(signUpError.message); setLoading(false); return; }

    if (data.session) {
      // Send welcome email (fire-and-forget, don't block navigation)
      fetch("/api/email/welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName: `${firstName} ${lastName}`.trim() }),
      }).catch(() => {});

      router.push("/dashboard");
      router.refresh();
      return;
    }
    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div style={{ textAlign: "center", padding: "2rem 0" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📧</div>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.75rem" }}>Check your email</h3>
        <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.6 }}>
          We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account, then come back and log in.
        </p>
        <Link href="/login" style={{ display: "inline-block", marginTop: "1.5rem", color: "#008751", fontWeight: 600, textDecoration: "none" }}>Go to Login →</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {error && <div style={{ background: "#fee", border: "1px solid #f5a8a8", color: "#c0392b", padding: "10px 14px", borderRadius: "2px", fontSize: "0.85rem" }}>{error}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div>
          <label style={labelStyle}>First Name</label>
          <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Chukwuemeka" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Last Name</label>
          <input required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Okafor" style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Email Address</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Phone Number</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08012345678" style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Membership Tier</label>
        <select value={tier} onChange={(e) => setTier(e.target.value)} style={inputStyle}>
          <option value="standard">Standard — ₦10,000/year</option>
          <option value="premium">Premium — ₦25,000/year</option>
          <option value="vip">VIP — ₦50,000/year</option>
        </select>
      </div>
      <div>
        <label style={labelStyle}>Password</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" style={inputStyle} />
      </div>
      <div>
        <label style={labelStyle}>Confirm Password</label>
        <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
      </div>
      <button type="submit" disabled={loading} style={{ width: "100%", background: loading ? "#005e38" : "#008751", color: "#fff", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "13px", border: "none", borderRadius: "2px", cursor: loading ? "default" : "pointer" }}>
        {loading ? "Creating Account..." : "Create Account"}
      </button>
      <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#666" }}>
        Already a member? <Link href="/login" style={{ color: "#008751", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
      </p>
    </form>
  );
}