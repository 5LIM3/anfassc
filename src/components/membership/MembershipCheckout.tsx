"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
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

const TIER_PRICES: Record<string, number> = {
  standard: 10000,
  premium: 25000,
  vip: 50000,
};

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

export default function MembershipCheckout({ tier }: { tier: "standard" | "premium" | "vip" }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setError(null);
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !user.email) {
      router.push(`/register?tier=${tier}`);
      return;
    }

    try {
      const initRes = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const initData = await initRes.json();

      if (!initData.success) {
        setError(initData.error ?? "Could not start payment. Please try again.");
        setLoading(false);
        return;
      }

      const { reference, amount, email, metadata } = initData.data;

      await loadPaystackScript();

      const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) {
        setError("Payment is not configured yet. Please contact support.");
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
        callback: (response) => {
          verifyPayment(response.reference);
        },
        onClose: () => {
          setLoading(false);
        },
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
        router.push("/dashboard?payment=success");
        router.refresh();
      } else {
        setError("Payment verification failed. If you were charged, contact support with reference: " + reference);
        setLoading(false);
      }
    } catch {
      setError("Could not verify payment. Please contact support with reference: " + reference);
      setLoading(false);
    }
  }

  return (
    <div>
      {error && (
        <div style={{ background: "#fee", border: "1px solid #f5a8a8", color: "#c0392b", padding: "10px 14px", borderRadius: "2px", fontSize: "0.8rem", marginBottom: "1rem" }}>
          {error}
        </div>
      )}
      <button
        onClick={handleClick}
        disabled={loading}
        style={{
          width: "100%",
          textAlign: "center",
          fontFamily: "var(--font-condensed)",
          fontWeight: 700,
          fontSize: "13px",
          letterSpacing: "1.5px",
          textTransform: "uppercase",
          padding: "13px",
          border: tier === "premium" ? "none" : "2px solid #008751",
          borderRadius: "2px",
          cursor: loading ? "default" : "pointer",
          background: tier === "premium" ? "#008751" : "transparent",
          color: tier === "premium" ? "#fff" : "#008751",
        }}
      >
        {loading ? "Processing..." : `Pay ₦${TIER_PRICES[tier].toLocaleString()} & Join`}
      </button>
    </div>
  );
}