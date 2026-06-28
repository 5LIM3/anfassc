"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";

interface AddToCartButtonProps {
  id: string;
  name: string;
  price: number;
  sizes?: string[];
}

export default function AddToCartButton({ id, name, price, sizes }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [size, setSize] = useState(sizes?.[0] ?? "");

  function handleAdd() {
    addItem({ id, name, price, size: size || undefined });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {sizes && sizes.length > 0 && (
        <select value={size} onChange={(e) => setSize(e.target.value)} style={{ fontSize: "11px", padding: "8px", border: "1px solid #e5e5e5", borderRadius: "2px" }}>
          {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      )}
      <button
        onClick={handleAdd}
        style={{
          background: added ? "#005e38" : "#008751",
          color: "#fff",
          fontWeight: 700,
          fontSize: "11px",
          letterSpacing: "1px",
          textTransform: "uppercase",
          padding: "8px 14px",
          border: "none",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        {added ? "✓ Added!" : "Add to Cart"}
      </button>
    </div>
  );
}