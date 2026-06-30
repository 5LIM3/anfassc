import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminMembersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (!profile || !["admin", "super_admin"].includes(profile.role)) redirect("/dashboard");

  const { data: members } = await supabase
    .from("profiles")
    .select("*, memberships(tier, status, membership_number, expiry_date)")
    .order("created_at", { ascending: false });

  const tierColors: Record<string, string> = {
    standard: "#666",
    premium: "#008751",
    vip: "#D4AF37",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7", padding: "2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Link href="/admin" style={{ fontSize: "0.85rem", color: "#008751", textDecoration: "none" }}>← Back to Dashboard</Link>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, marginTop: "1rem", marginBottom: "2rem" }}>All Members</h1>

        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "4px", overflow: "hidden" }}>
          {!members || members.length === 0 ? (
            <p style={{ padding: "3rem", textAlign: "center", color: "#666" }}>No members yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ background: "#f5f5f5", textAlign: "left" }}>
                    <th style={{ padding: "12px 16px", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#666" }}>Name</th>
                    <th style={{ padding: "12px 16px", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#666" }}>Role</th>
                    <th style={{ padding: "12px 16px", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#666" }}>Phone</th>
                    <th style={{ padding: "12px 16px", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#666" }}>Membership</th>
                    <th style={{ padding: "12px 16px", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#666" }}>Number</th>
                    <th style={{ padding: "12px 16px", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#666" }}>Expires</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((m) => {
                    const membership = Array.isArray(m.memberships) ? m.memberships[0] : m.memberships;
                    return (
                      <tr key={m.id} style={{ borderTop: "1px solid #eee" }}>
                        <td style={{ padding: "12px 16px", fontWeight: 600 }}>{m.full_name}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{
                            fontSize: "10px", fontWeight: 700, textTransform: "uppercase",
                            padding: "3px 8px", borderRadius: "2px",
                            background: m.role === "member" ? "#f0f0f0" : "#D4AF37",
                            color: m.role === "member" ? "#666" : "#003d24",
                          }}>
                            {m.role}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px", color: "#666" }}>{m.phone ?? "—"}</td>
                        <td style={{ padding: "12px 16px" }}>
                          {membership ? (
                            <span style={{
                              fontSize: "11px", fontWeight: 700, textTransform: "uppercase",
                              color: tierColors[membership.tier] ?? "#666",
                            }}>
                              {membership.tier} ({membership.status})
                            </span>
                          ) : (
                            <span style={{ color: "#999", fontSize: "0.8rem" }}>No membership</span>
                          )}
                        </td>
                        <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: "0.75rem", color: "#666" }}>
                          {membership?.membership_number ?? "—"}
                        </td>
                        <td style={{ padding: "12px 16px", color: "#666", whiteSpace: "nowrap" }}>
                          {membership?.expiry_date ? new Date(membership.expiry_date).toLocaleDateString("en-GB") : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}