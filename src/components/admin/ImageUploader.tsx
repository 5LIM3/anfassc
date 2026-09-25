"use client";

import { useRef, useState } from "react";

type Props = {
  value: string[];
  onChange: (urls: string[]) => void;
  onUploadingChange?: (uploading: boolean) => void;
  max?: number;
  maxSizeMB?: number;
};

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export default function ImageUploader({ value, onChange, onUploadingChange, max = 5, maxSizeMB = 5 }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState(0);
  const [error, setError] = useState<string | null>(null);

  async function uploadOne(file: File): Promise<string> {
    const sigRes = await fetch("/api/admin/cloudinary-signature", { method: "POST" });
    const sig = await sigRes.json();
    if (!sigRes.ok || !sig.success) throw new Error(sig.error ?? "Could not start upload");

    const body = new FormData();
    body.append("file", file);
    body.append("api_key", sig.apiKey);
    body.append("timestamp", String(sig.timestamp));
    body.append("signature", sig.signature);
    body.append("folder", sig.folder);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, { method: "POST", body });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message ?? "Upload failed");
    return data.secure_url as string;
  }

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setError(null);

    const room = Math.max(max - value.length - pending, 0);
    const picked = Array.from(fileList);
    let notice: string | null = picked.length > room ? `Only ${max} images allowed per product.` : null;

    const valid = picked.slice(0, room).filter((f) => {
      if (!ALLOWED.includes(f.type)) {
        notice = `${f.name} must be a JPG, PNG or WebP image.`;
        return false;
      }
      if (f.size > maxSizeMB * 1024 * 1024) {
        notice = `${f.name} is larger than ${maxSizeMB}MB.`;
        return false;
      }
      return true;
    });

    if (valid.length === 0) {
      setError(notice);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    setPending(valid.length);
    onUploadingChange?.(true);

    const results = await Promise.allSettled(valid.map(uploadOne));
    const urls = results
      .filter((r): r is PromiseFulfilledResult<string> => r.status === "fulfilled")
      .map((r) => r.value);
    const failed = results.length - urls.length;

    if (urls.length) onChange([...value, ...urls]);
    setError(failed ? `${failed} upload${failed > 1 ? "s" : ""} failed. Please try again.` : notice);

    setPending(0);
    onUploadingChange?.(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  const remove = (url: string) => onChange(value.filter((u) => u !== url));
  const makeMain = (url: string) => onChange([url, ...value.filter((u) => u !== url)]);

  const tile = { position: "relative" as const, width: "100%", aspectRatio: "1 / 1", borderRadius: "2px", overflow: "hidden" as const, border: "1px solid #ddd", background: "#fafafa" };
  const smallBtn = { flex: 1, background: "#fff", border: "1px solid #ddd", borderRadius: "2px", fontSize: "11px", padding: "4px 0", cursor: "pointer", color: "#333" };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))", gap: "10px" }}>
        {value.map((url, i) => (
          <div key={url}>
            <div style={tile}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Product image ${i + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {i === 0 && (
                <span style={{ position: "absolute", top: 4, left: 4, background: "#008751", color: "#fff", fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "2px" }}>Main</span>
              )}
            </div>
            <div style={{ display: "flex", gap: "4px", marginTop: "4px" }}>
              {i !== 0 && <button type="button" onClick={() => makeMain(url)} style={smallBtn}>Make main</button>}
              <button type="button" onClick={() => remove(url)} style={{ ...smallBtn, color: "#c0392b" }}>Remove</button>
            </div>
          </div>
        ))}

        {Array.from({ length: pending }).map((_, i) => (
          <div key={`pending-${i}`} style={{ ...tile, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", color: "#888" }}>
            Uploading…
          </div>
        ))}

        {value.length + pending < max && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            style={{ ...tile, border: "2px dashed #ccc", background: "#fff", color: "#666", fontSize: "12px", cursor: "pointer" }}
          >
            + Add images
          </button>
        )}
      </div>

      <input ref={inputRef} type="file" accept={ALLOWED.join(",")} multiple style={{ display: "none" }} onChange={(e) => handleFiles(e.target.files)} />

      <p style={{ fontSize: "11px", color: "#888", marginTop: "8px" }}>
        Up to {max} images, {maxSizeMB}MB each (JPG, PNG, WebP). The first image is shown in the shop.
      </p>
      {error && <p role="alert" style={{ fontSize: "12px", color: "#c0392b", marginTop: "4px" }}>{error}</p>}
    </div>
  );
}
