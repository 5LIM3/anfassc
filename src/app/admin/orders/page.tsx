import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (!profile || !["admin", "super_admin"].includes(profile.role)) redirect("/dashboard");

  const { data: orders } = await supabase
    .from("orders")
    .select("*, profiles(full_name)")
    .order("created_at", { ascending: false });

  const statusColors: Record<string, string> = {
    pending: "#999",
    paid: "#008751",
    processing: "#D4AF37",
    shipped: "#2563eb",
    delivered: "#059669",
    cancelled: "#dc2626",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7", padding: "2rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <Link href="/admin" style={{ fontSize: "0.85rem", color: "#008751", textDecoration: "none" }}>← Back to Dashboard</Link>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, marginTop: "1rem", marginBottom: "2rem" }}>All Orders</h1>

        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "4px", overflow: "hidden" }}>
          {!orders || orders.length === 0 ? (
            <p style={{ padding: "3rem", textAlign: "center", color: "#666" }}>No orders yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ background: "#f5f5f5", textAlign: "left" }}>
                    <th style={{ padding: "12px 16px", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#666" }}>Order ID</th>
                    <th style={{ padding: "12px 16px", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#666" }}>Customer</th>
                    <th style={{ padding: "12px 16px", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#666" }}>Items</th>
                    <th style={{ padding: "12px 16px", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#666" }}>Total</th>
                    <th style={{ padding: "12px 16px", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#666" }}>Status</th>
                    <th style={{ padding: "12px 16px", fontWeight: 700, fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: "#666" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} style={{ borderTop: "1px solid #eee" }}>
                      <td style={{ padding: "12px 16px", fontFamily: "monospace", fontSize: "0.75rem" }}>{order.id.slice(0, 8).toUpperCase()}</td>
                      <td style={{ padding: "12px 16px" }}>{order.profiles?.full_name ?? "—"}</td>
                      <td style={{ padding: "12px 16px" }}>
                        {Array.isArray(order.items) ? order.items.map((i: { product_name: string; quantity: number }) => `${i.product_name} ×${i.quantity}`).join(", ") : "—"}
                      </td>
                      <td style={{ padding: "12px 16px", fontWeight: 700, color: "#008751" }}>₦{(order.total / 100).toLocaleString()}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <form action={`/api/admin/orders/${order.id}`} method="POST" style={{ display: "inline" }}>
                          <select
                            name="status"
                            defaultValue={order.status}
                            data-order-id={order.id}
                            className="status-select"
                            style={{
                              padding: "4px 8px", borderRadius: "2px", fontSize: "11px", fontWeight: 700,
                              textTransform: "uppercase", color: "#fff",
                              background: statusColors[order.status] ?? "#999",
                              border: "none",
                            }}
                          >
                            {Object.keys(statusColors).map((s) => (
                              <option key={s} value={s} style={{ color: "#000", background: "#fff" }}>{s}</option>
                            ))}
                          </select>
                        </form>
                      </td>
                      <td style={{ padding: "12px 16px", color: "#666", whiteSpace: "nowrap" }}>{new Date(order.created_at).toLocaleDateString("en-GB")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.querySelectorAll('.status-select').forEach(function(sel) {
              sel.addEventListener('change', async function() {
                const orderId = this.getAttribute('data-order-id');
                const status = this.value;
                await fetch('/api/admin/orders/' + orderId, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ status }),
                });
                location.reload();
              });
            });
          `,
        }}
      />
    </div>
  );
}