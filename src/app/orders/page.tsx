import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  pending: { bg: "#fff8e1", color: "#f59e0b" },
  paid: { bg: "#e8f4ee", color: "#008751" },
  processing: { bg: "#f3e8ff", color: "#7c3aed" },
  shipped: { bg: "#e0f2fe", color: "#0284c7" },
  delivered: { bg: "#dcfce7", color: "#16a34a" },
  cancelled: { bg: "#fee2e2", color: "#dc2626" },
};

export default async function OrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh", background: "#F8F5EF", padding: "8rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <a href="/dashboard" style={{ fontSize: "0.85rem", color: "#008751", textDecoration: "none" }}>← Back to Dashboard</a>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, marginTop: "0.75rem", marginBottom: "2rem" }}>My Orders</h1>

          {!orders || orders.length === 0 ? (
            <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "4px", padding: "3rem", textAlign: "center" }}>
              <p style={{ color: "#666", marginBottom: "1.5rem" }}>You haven't placed any orders yet.</p>
              <a href="/shop" style={{ display: "inline-block", background: "#008751", color: "#fff", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", padding: "12px 28px", textDecoration: "none", borderRadius: "2px" }}>
                Browse the Shop
              </a>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {orders.map((order) => {
                const statusStyle = STATUS_COLORS[order.status] ?? STATUS_COLORS.pending;
                const items = Array.isArray(order.items) ? order.items : [];
                return (
                  <div key={order.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: "4px", overflow: "hidden" }}>
                    {/* Order header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.5rem", borderBottom: "1px solid #eee", flexWrap: "wrap", gap: "0.5rem" }}>
                      <div>
                        <p style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#999", marginBottom: "2px" }}>
                          #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p style={{ fontSize: "0.85rem", color: "#666" }}>
                          {new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 700, color: "#008751" }}>
                          ₦{(order.total / 100).toLocaleString()}
                        </span>
                        <span style={{
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          fontWeight: 700,
                          fontSize: "11px",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          padding: "4px 10px",
                          borderRadius: "2px",
                        }}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div style={{ padding: "1rem 1.5rem" }}>
                      {items.length > 0 ? (
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          {items.map((item: { product_name: string; quantity: number; size?: string; price: number; image?: string }, i: number) => (
                            <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: i < items.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                                <div style={{ width: "40px", height: "40px", flexShrink: 0, background: "#f5f5f5", borderRadius: "2px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  {item.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={item.image} alt={item.product_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                  ) : (
                                    <span style={{ fontFamily: "var(--font-display)", fontSize: "0.9rem", fontStyle: "italic", color: "rgba(0,135,81,0.2)", fontWeight: 900 }}>NG</span>
                                  )}
                                </div>
                                <div>
                                  <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "#0A0A0A" }}>{item.product_name}</span>
                                  {item.size && <span style={{ fontSize: "0.8rem", color: "#999", marginLeft: "8px" }}>Size: {item.size}</span>}
                                  <span style={{ fontSize: "0.8rem", color: "#666", marginLeft: "8px" }}>× {item.quantity}</span>
                                </div>
                              </div>
                              <span style={{ fontSize: "0.85rem", color: "#008751", fontWeight: 600 }}>
                                ₦{((item.price / 100) * item.quantity).toLocaleString()}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p style={{ color: "#999", fontSize: "0.85rem" }}>No item details available.</p>
                      )}
                    </div>

                    {/* Shipping address */}
                    {order.shipping_address && (
                      <div style={{ padding: "0.75rem 1.5rem", background: "#f9f9f9", borderTop: "1px solid #eee" }}>
                        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#999", marginBottom: "4px" }}>Delivery Address</p>
                        <p style={{ fontSize: "0.85rem", color: "#666" }}>
                          {order.shipping_address.full_name} · {order.shipping_address.address}, {order.shipping_address.city}, {order.shipping_address.state} · {order.shipping_address.phone}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}