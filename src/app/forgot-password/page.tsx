"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?type=recovery&next=/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#003d24", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "64px", height: "64px", borderRadius: "50%", background: "#D4AF37", color: "#003d24", fontWeight: 900, fontSize: "11px", marginBottom: "1rem" }}>
            ANFASSC
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff", margin: 0 }}>Reset Password</h1>
          <p style={{ color: "#a8d4bd", marginTop: "0.5rem" }}>Enter your email to receive a reset link.</p>
        </div>

        <div style={{ background: "#fff", borderRadius: "4px", padding: "2rem" }}>
          {sent ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>📧</div>
              <h3 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.75rem" }}>Check your email</h3>
              <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.6 }}>
                We sent a password reset link to <strong>{email}</strong>. Click it to set a new password.
              </p>
              <Link href="/login" style={{ display: "inline-block", marginTop: "1.5rem", color: "#008751", fontWeight: 600, textDecoration: "none" }}>
                Back to Login →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {error && (
                <div style={{ background: "#fee", border: "1px solid #f5a8a8", color: "#c0392b", padding: "10px 14px", borderRadius: "2px", fontSize: "0.85rem" }}>
                  {error}
                </div>
              )}
              <div>
                <label style={{ display: "block", fontWeight: 700, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#666", marginBottom: "8px" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{ width: "100%", padding: "12px 14px", border: "1px solid #e5e5e5", borderRadius: "2px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ width: "100%", background: loading ? "#005e38" : "#008751", color: "#fff", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "13px", border: "none", borderRadius: "2px", cursor: loading ? "default" : "pointer" }}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#666" }}>
                Remember your password?{" "}
                <Link href="/login" style={{ color: "#008751", fontWeight: 600, textDecoration: "none" }}>Sign in</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}