"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";

export default function CartIcon() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" style={{ position: "relative", display: "inline-flex", alignItems: "center", color: "#fff", textDecoration: "none" }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {itemCount > 0 && (
        <span style={{
          position: "absolute", top: "-8px", right: "-8px",
          background: "#D4AF37", color: "#003d24",
          fontWeight: 700, fontSize: "10px",
          borderRadius: "50%", width: "18px", height: "18px",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {itemCount}
        </span>
      )}
    </Link>
  );
}