"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  const inputStyle = { width: "100%", padding: "12px 14px", border: "1px solid #e5e5e5", borderRadius: "2px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { display: "block", fontWeight: 700, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#666", marginBottom: "8px" };

  return (
    <div style={{ minHeight: "100vh", background: "#003d24", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "64px", height: "64px", borderRadius: "50%", background: "#D4AF37", color: "#003d24", fontWeight: 900, fontSize: "11px", marginBottom: "1rem" }}>
            ANFASSC
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff", margin: 0 }}>Set New Password</h1>
          <p style={{ color: "#a8d4bd", marginTop: "0.5rem" }}>Choose a strong new password.</p>
        </div>

        <div style={{ background: "#fff", borderRadius: "4px", padding: "2rem" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {error && (
              <div style={{ background: "#fee", border: "1px solid #f5a8a8", color: "#c0392b", padding: "10px 14px", borderRadius: "2px", fontSize: "0.85rem" }}>
                {error}
              </div>
            )}
            <div>
              <label style={labelStyle}>New Password</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Confirm Password</label>
              <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", background: loading ? "#005e38" : "#008751", color: "#fff", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "13px", border: "none", borderRadius: "2px", cursor: loading ? "default" : "pointer" }}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}