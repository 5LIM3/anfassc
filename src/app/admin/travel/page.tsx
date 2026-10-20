"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ImageUploader from "@/components/admin/ImageUploader";

export default function AdminTravelPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    tournament: "",
    destination: "",
    departure_date: "",
    return_date: "",
    price: "",
    spots_total: "10",
    includes: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "2px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { display: "block", fontWeight: 700, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "#666", marginBottom: "6px" };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    const includesArray = form.includes.split(",").map((s) => s.trim()).filter(Boolean);

    try {
      const res = await fetch("/api/admin/travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, includes: includesArray, image: images[0] }),
      });
      const data = await res.json();

      if (data.success) {
        setMessage({ type: "success", text: `"${form.title}" was added to Travel Packages!` });
        setForm({ title: "", description: "", tournament: "", destination: "", departure_date: "", return_date: "", price: "", spots_total: "10", includes: "" });
        setImages([]);
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

        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, marginTop: "1rem", marginBottom: "2rem" }}>Add Travel Package</h1>

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
            <label style={labelStyle}>Package Title</label>
            <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="CHAN 2025 — Morocco" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Brief package description..." style={{ ...inputStyle, height: "80px", resize: "vertical" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Tournament</label>
              <input required value={form.tournament} onChange={(e) => setForm((f) => ({ ...f, tournament: e.target.value }))} placeholder="CHAN 2025" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Destination</label>
              <input required value={form.destination} onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))} placeholder="Morocco" style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Departure Date</label>
              <input required type="date" value={form.departure_date} onChange={(e) => setForm((f) => ({ ...f, departure_date: e.target.value }))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Return Date</label>
              <input required type="date" value={form.return_date} onChange={(e) => setForm((f) => ({ ...f, return_date: e.target.value }))} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Price (₦)</label>
              <input required type="number" min="0" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} placeholder="450000" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Total Spots</label>
              <input required type="number" min="1" value={form.spots_total} onChange={(e) => setForm((f) => ({ ...f, spots_total: e.target.value }))} style={inputStyle} />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Includes (comma-separated)</label>
            <input value={form.includes} onChange={(e) => setForm((f) => ({ ...f, includes: e.target.value }))} placeholder="Return flights, Hotel (3 nights), Match tickets x2" style={inputStyle} />
          </div>

          <div>
            <label style={labelStyle}>Package Image (optional)</label>
            <ImageUploader value={images} onChange={setImages} onUploadingChange={setUploading} max={1} folder="anfassc/travel" />
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            style={{
              background: loading || uploading ? "#005e38" : "#008751", color: "#fff",
              fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase",
              padding: "13px", border: "none", borderRadius: "2px", cursor: loading || uploading ? "default" : "pointer",
            }}
          >
            {loading ? "Adding..." : uploading ? "Uploading image..." : "Add Travel Package"}
          </button>
        </form>
      </div>
    </div>
  );
}
