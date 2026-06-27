"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const inputStyle = { width: "100%", padding: "12px 14px", border: "1px solid #e5e5e5", borderRadius: "2px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message === "Invalid login credentials" ? "Incorrect email or password." : error.message);
      setLoading(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      {error && <div style={{ background: "#fee", border: "1px solid #f5a8a8", color: "#c0392b", padding: "10px 14px", borderRadius: "2px", fontSize: "0.85rem" }}>{error}</div>}
      <div>
        <label style={{ display: "block", fontWeight: 700, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#666", marginBottom: "8px" }}>Email Address</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
      </div>
      <div>
        <label style={{ display: "block", fontWeight: 700, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#666", marginBottom: "8px" }}>Password</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
      </div>
      <button type="submit" disabled={loading} style={{ width: "100%", background: loading ? "#005e38" : "#008751", color: "#fff", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "13px", border: "none", borderRadius: "2px", cursor: loading ? "default" : "pointer" }}>
        {loading ? "Signing In..." : "Sign In"}
      </button>
      <p style={{ textAlign: "center", fontSize: "0.85rem", color: "#666" }}>
        Not a member? <Link href="/register" style={{ color: "#008751", fontWeight: 600, textDecoration: "none" }}>Join ANFASSC</Link>
      </p>
    </form>
  );
}