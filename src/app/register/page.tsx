import type { Metadata } from "next";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Join ANFASSC",
  description: "Register as an ANFASSC member.",
};

export default function RegisterPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#003d24", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem" }}>
      <div style={{ width: "100%", maxWidth: "480px" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "64px", height: "64px", borderRadius: "50%", background: "#D4AF37", color: "#003d24", fontWeight: 900, fontSize: "11px", marginBottom: "1rem" }}>
            ANFASSC
          </div>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff", margin: 0 }}>Join ANFASSC</h1>
          <p style={{ color: "#a8d4bd", marginTop: "0.5rem" }}>Create your member account in minutes.</p>
        </div>
        <div style={{ background: "#fff", borderRadius: "4px", padding: "2rem" }}>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}