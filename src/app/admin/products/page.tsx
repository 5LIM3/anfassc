"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminProductsPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "jersey",
    stock: "10",
    is_featured: false,
    sizes: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "2px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { display: "block", fontWeight: 700, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "#666", marginBottom: "6px" };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const sizesArray = form.sizes.split(",").map((s) => s.trim()).filter(Boolean);

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sizes: sizesArray }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: `"${form.name}" was added to the shop!` });
        setForm({ name: "", description: "", price: "", category: "jersey", stock: "10", is_featured: false, sizes: "" });
        router.refresh();
      } else {
        setMessage({ type: "error", text: data.error ?? "Something went wrong." });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7", padding: "2rem" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Link href="/admin" style={{ fontSize: "0.85rem", color: "#008751", textDecoration: "none" }}>← Back to Dashboard</Link>

        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, marginTop: "1rem", marginBottom: "2rem" }}>Add New Product</h1>

        {message && (
          <div style={{
            background: message.type === "success" ? "#e8f4ee" : "#fee",
            border: `1px solid ${message.type === "success" ? "#008751" : "#f5a8a8"}`,
            color: message.type === "success" ? "#008751" : "#c0392b",
            padding: "12px 16px", borderRadius: "2px", fontSize: "0.85rem", marginBottom: "1.5rem",
          }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ background: "#fff", border: "1px solid #eee", borderRadius: "4px", padding: "2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={labelStyle}>Product Name</label>
            <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="ANFASSC Training Jacket" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Brief product description..." style={{ ...inputStyle, height: "80px", resize: "vertical" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Price (₦)</label>
              <input required type="number" min="0" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="15000" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Stock Quantity</label>
              <input required type="number" min="0" value={form.stock} onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Category</label>
            <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} style={inputStyle}>
              <option value="jersey">Jersey</option>
              <option value="polo">Polo</option>
              <option value="cap">Cap</option>
              <option value="scarf">Scarf</option>
              <option value="bundle">Bundle</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Sizes (comma-separated, optional)</label>
            <input value={form.sizes} onChange={(e) => setForm((f) => ({ ...f, sizes: e.target.value }))} placeholder="S, M, L, XL, XXL" style={inputStyle} />
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#333" }}>
            <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))} />
            Mark as Featured
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#005e38" : "#008751", color: "#fff",
              fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase",
              padding: "13px", border: "none", borderRadius: "2px", cursor: loading ? "default" : "pointer",
            }}
          >
            {loading ? "Adding..." : "Add Product to Shop"}
          </button>
        </form>
      </div>
    </div>
  );
}