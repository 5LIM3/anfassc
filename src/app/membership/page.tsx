import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import MembershipCheckout from "@/components/membership/MembershipCheckout";

export const metadata: Metadata = {
  title: "Membership",
  description: "Join ANFASSC — Nigeria's official football supporters club.",
};

const TIERS = [
  {
    key: "standard" as const,
    name: "Standard",
    price: 10000,
    benefits: ["Official membership card", "ANFASSC jersey discount (10%)", "Match day updates", "Newsletter"],
  },
  {
    key: "premium" as const,
    name: "Premium",
    price: 25000,
    benefits: ["All Standard benefits", "ANFASSC jersey discount (20%)", "Priority travel package access", "VIP match day experience", "Members-only events"],
    popular: true,
  },
  {
    key: "vip" as const,
    name: "VIP",
    price: 50000,
    benefits: ["All Premium benefits", "Free ANFASSC welcome pack", "Personal travel coordination", "Meet & greet with officials", "Exclusive VIP badge"],
  },
];

export default function MembershipPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Join the Club"
          title="Become an ANFASSC Member"
          subtitle="Choose your tier and be part of Nigeria's loudest, proudest sporting family."
        />
        <section style={{ padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <div className="rgrid-3" style={{ gap: "2rem" }}>
              {TIERS.map((tier) => (
                <div
                  key={tier.key}
                  style={{
                    position: "relative",
                    borderRadius: "4px",
                    border: tier.popular ? "2px solid #008751" : "2px solid #e5e5e5",
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {tier.popular && (
                    <div style={{ position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)", background: "#008751", color: "#fff", fontWeight: 700, fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", padding: "4px 16px", whiteSpace: "nowrap" }}>
                      Most Popular
                    </div>
                  )}
                  <h3 style={{ fontWeight: 700, fontSize: "1.4rem", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "0.5rem" }}>{tier.name}</h3>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 700, color: "#008751", marginBottom: "0.25rem" }}>
                    ₦{tier.price.toLocaleString()}
                  </div>
                  <p style={{ fontSize: "11px", textTransform: "uppercase", color: "#666", marginBottom: "2rem" }}>per year</p>
                  <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem", flex: 1 }}>
                    {tier.benefits.map((b) => (
                      <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "#2e2e2e", marginBottom: "0.75rem" }}>
                        <span style={{ color: "#008751", fontWeight: 700 }}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <MembershipCheckout tier={tier.key} />
                </div>
              ))}
            </div>

            <div style={{ marginTop: "5rem", background: "#003d24", color: "#fff", borderRadius: "4px", padding: "2.5rem", textAlign: "center" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 700, marginBottom: "1rem" }}>Already a member?</h2>
              <p style={{ color: "#a8d4bd", marginBottom: "1.5rem" }}>Log in to view your membership card and manage your account.</p>
              <a href="/login" style={{ display: "inline-block", background: "#D4AF37", color: "#003d24", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "12px 32px", textDecoration: "none", borderRadius: "2px" }}>
                Member Login
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}