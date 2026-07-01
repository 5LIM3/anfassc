"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Album {
  id: string;
  title: string;
  event_date: string | null;
  gallery_images: { id: string; url: string; caption: string }[];
}

export default function AdminGalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  const [newAlbumTitle, setNewAlbumTitle] = useState("");
  const [newAlbumDate, setNewAlbumDate] = useState("");
  const [creatingAlbum, setCreatingAlbum] = useState(false);

  const [selectedAlbum, setSelectedAlbum] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function fetchAlbums() {
    setLoading(true);
    const res = await fetch("/api/gallery/albums");
    const data = await res.json();
    if (data.success) setAlbums(data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchAlbums();
  }, []);

  async function handleCreateAlbum(e: React.FormEvent) {
    e.preventDefault();
    setCreatingAlbum(true);
    const res = await fetch("/api/gallery/albums", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newAlbumTitle, event_date: newAlbumDate || null }),
    });
    const data = await res.json();
    if (data.success) {
      setNewAlbumTitle("");
      setNewAlbumDate("");
      setSelectedAlbum(data.data.id);
      await fetchAlbums();
      setMessage({ type: "success", text: `Album "${newAlbumTitle}" created!` });
    } else {
      setMessage({ type: "error", text: data.error ?? "Failed to create album" });
    }
    setCreatingAlbum(false);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !selectedAlbum) {
      setMessage({ type: "error", text: "Choose an album and a photo first." });
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("album_id", selectedAlbum);
    formData.append("caption", caption);

    const res = await fetch("/api/gallery/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (data.success) {
      setMessage({ type: "success", text: "Photo uploaded!" });
      setFile(null);
      setCaption("");
      await fetchAlbums();
    } else {
      setMessage({ type: "error", text: data.error ?? "Upload failed" });
    }
    setUploading(false);
  }

  const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: "2px", fontSize: "0.9rem", outline: "none", boxSizing: "border-box" as const };
  const labelStyle = { display: "block", fontWeight: 700, fontSize: "11px", letterSpacing: "1.5px", textTransform: "uppercase" as const, color: "#666", marginBottom: "6px" };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7", padding: "2rem" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <Link href="/admin" style={{ fontSize: "0.85rem", color: "#008751", textDecoration: "none" }}>← Back to Dashboard</Link>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, marginTop: "1rem", marginBottom: "2rem" }}>Manage Gallery</h1>

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

        {/* Create Album */}
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "4px", padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1rem" }}>1. Create a New Album</h2>
          <form onSubmit={handleCreateAlbum} style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "flex-end" }}>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <label style={labelStyle}>Album Title</label>
              <input required value={newAlbumTitle} onChange={(e) => setNewAlbumTitle(e.target.value)} placeholder="AFCON Morocco 2025" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Event Date</label>
              <input type="date" value={newAlbumDate} onChange={(e) => setNewAlbumDate(e.target.value)} style={inputStyle} />
            </div>
            <button type="submit" disabled={creatingAlbum} style={{ background: "#008751", color: "#fff", fontWeight: 700, fontSize: "12px", textTransform: "uppercase", padding: "10px 20px", border: "none", borderRadius: "2px", cursor: "pointer", whiteSpace: "nowrap" }}>
              {creatingAlbum ? "Creating..." : "Create Album"}
            </button>
          </form>
        </div>

        {/* Upload Photo */}
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "4px", padding: "1.5rem", marginBottom: "2rem" }}>
          <h2 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1rem" }}>2. Upload a Photo</h2>
          <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Choose Album</label>
              <select required value={selectedAlbum} onChange={(e) => setSelectedAlbum(e.target.value)} style={inputStyle}>
                <option value="">Select an album...</option>
                {albums.map((a) => <option key={a.id} value={a.id}>{a.title}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Photo</label>
              <input required type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Caption (optional)</label>
              <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Members at the stadium..." style={inputStyle} />
            </div>
            <button type="submit" disabled={uploading} style={{ background: "#008751", color: "#fff", fontWeight: 700, fontSize: "13px", textTransform: "uppercase", padding: "12px", border: "none", borderRadius: "2px", cursor: "pointer" }}>
              {uploading ? "Uploading..." : "Upload Photo"}
            </button>
          </form>
        </div>

        {/* Existing Albums */}
        <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "4px", padding: "1.5rem" }}>
          <h2 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "1rem" }}>Existing Albums</h2>
          {loading ? (
            <p style={{ color: "#999", fontSize: "0.85rem" }}>Loading...</p>
          ) : albums.length === 0 ? (
            <p style={{ color: "#999", fontSize: "0.85rem" }}>No albums yet. Create one above.</p>
          ) : (
            albums.map((album) => (
              <div key={album.id} style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #eee" }}>
                <p style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                  {album.title} <span style={{ color: "#999", fontWeight: 400 }}>({album.gallery_images?.length ?? 0} photos)</span>
                </p>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {album.gallery_images?.map((img) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={img.id} src={img.url} alt={img.caption} style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "2px" }} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}