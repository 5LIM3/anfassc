"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/lib/cart/CartContext";
import { createClient } from "@/lib/supabase/client";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: PaystackConfig) => { openIframe: () => void };
    };
  }
}

interface PaystackConfig {
  key: string;
  email: string;
  amount: number;
  ref: string;
  currency?: string;
  metadata?: Record<string, unknown>;
  callback: (response: { reference: string }) => void;
  onClose: () => void;
}

function loadPaystackScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve();
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v2/inline.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Paystack"));
    document.body.appendChild(script);
  });
}

export default function CartPage() {
  const router = useRouter();
  const supabase = createClient();
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();

  const [address, setAddress] = useState({ full_name: "", address: "", city: "", state: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputStyle = { width: "100%", padding: "10px 12px", border: "1px solid #e5e5e5", borderRadius: "2px", fontSize: "0.85rem", outline: "none", boxSizing: "border-box" as const };

  async function handleCheckout() {
    setError(null);
    if (items.length === 0) return;
    if (!address.full_name || !address.address || !address.city || !address.state || !address.phone) {
      setError("Please fill in your full delivery address.");
      return;
    }
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email) {
      router.push("/login?redirect=/cart");
      return;
    }

    try {
      const initRes = await fetch("/api/shop/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, shipping_address: address }),
      });
      const initData = await initRes.json();

      if (!initData.success) {
        setError(initData.error ?? "Could not start checkout.");
        setLoading(false);
        return;
      }

      const { reference, amount, email, metadata } = initData.data;
      await loadPaystackScript();
      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) {
        setError("Payment is not configured yet.");
        setLoading(false);
        return;
      }

      const handler = window.PaystackPop!.setup({
        key: publicKey,
        email,
        amount,
        ref: reference,
        currency: "NGN",
        metadata,
        callback: (response) => verifyPayment(response.reference),
        onClose: () => setLoading(false),
      });

      handler.openIframe();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  async function verifyPayment(reference: string) {
    try {
      const res = await fetch("/api/shop/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });
      const data = await res.json();

      if (data.success) {
        clearCart();
        router.push("/dashboard?order=success");
        router.refresh();
      } else {
        setError("Payment verification failed. Reference: " + reference);
        setLoading(false);
      }
    } catch {
      setError("Could not verify payment. Reference: " + reference);
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh", padding: "8rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, marginBottom: "2rem" }}>Your Cart</h1>

          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p style={{ color: "#666", marginBottom: "1.5rem" }}>Your cart is empty.</p>
              <Link href="/shop" style={{ display: "inline-block", background: "#008751", color: "#fff", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", padding: "12px 28px", textDecoration: "none", borderRadius: "2px" }}>
                Browse the Shop
              </Link>
            </div>
          ) : (
            <div className="rgrid-2" style={{ gridTemplateColumns: "1.5fr 1fr", gap: "3rem", alignItems: "start" }}>
              <div>
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 0", borderBottom: "1px solid #eee", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.95rem", marginBottom: "0.25rem" }}>{item.name}</p>
                      {item.size && <p style={{ fontSize: "0.8rem", color: "#666" }}>Size: {item.size}</p>}
                      <p style={{ fontSize: "0.85rem", color: "#008751", fontWeight: 700, marginTop: "0.25rem" }}>₦{item.price.toLocaleString()}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)} style={{ width: "26px", height: "26px", border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}>−</button>
                      <span style={{ minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)} style={{ width: "26px", height: "26px", border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}>+</button>
                      <button onClick={() => removeItem(item.id, item.size)} style={{ marginLeft: "10px", color: "#c0392b", background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem" }}>Remove</button>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "1.5rem", fontWeight: 700, fontSize: "1.1rem" }}>
                  <span>Total</span>
                  <span style={{ color: "#008751" }}>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <div style={{ background: "#fff", border: "1px solid #eee", borderRadius: "4px", padding: "1.75rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.25rem" }}>Delivery Details</h3>

                {error && (
                  <div style={{ background: "#fee", border: "1px solid #f5a8a8", color: "#c0392b", padding: "10px 14px", borderRadius: "2px", fontSize: "0.8rem", marginBottom: "1rem" }}>
                    {error}
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <input placeholder="Full Name" value={address.full_name} onChange={(e) => setAddress((a) => ({ ...a, full_name: e.target.value }))} style={inputStyle} />
                  <input placeholder="Delivery Address" value={address.address} onChange={(e) => setAddress((a) => ({ ...a, address: e.target.value }))} style={inputStyle} />
                  <div className="rgrid-2" style={{ gap: "0.75rem" }}>
                    <input placeholder="City" value={address.city} onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))} style={inputStyle} />
                    <input placeholder="State" value={address.state} onChange={(e) => setAddress((a) => ({ ...a, state: e.target.value }))} style={inputStyle} />
                  </div>
                  <input placeholder="Phone Number" value={address.phone} onChange={(e) => setAddress((a) => ({ ...a, phone: e.target.value }))} style={inputStyle} />
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  style={{
                    width: "100%", background: loading ? "#005e38" : "#008751", color: "#fff",
                    fontWeight: 700, fontSize: "13px",
                    letterSpacing: "1.5px", textTransform: "uppercase", padding: "13px",
                    border: "none", borderRadius: "2px", cursor: loading ? "default" : "pointer",
                  }}
                >
                  {loading ? "Processing..." : `Pay ₦${total.toLocaleString()}`}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}