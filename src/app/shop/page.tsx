import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import AddToCartButton from "@/components/shop/AddToCartButton";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Shop",
  description: "Official ANFASSC merchandise — jerseys, polo shirts, caps, scarves, and supporter bundles.",
};

const BADGE_COLORS: Record<string, { bg: string; text?: string }> = {
  jersey: { bg: "#008751" },
  polo: { bg: "#D4AF37", text: "#003d24" },
  bundle: { bg: "#6030a0" },
  cap: { bg: "" },
  scarf: { bg: "" },
  other: { bg: "" },
};

export default async function ShopPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          label="Official Merchandise"
          title="Wear Your Nigerian Pride"
          subtitle="Authentic ANFASSC gear — from the official supporters of the Super Eagles."
        />
        <section style={{ padding: "4rem 1.5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            {!products || products.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666", padding: "3rem 0" }}>
                No products available right now. Check back soon.
              </p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.75rem" }}>
                {products.map((product) => {
                  const badge = BADGE_COLORS[product.category] ?? { bg: "" };
                  const priceNaira = product.price / 100;
                  return (
                    <div key={product.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: "2px", overflow: "hidden" }}>
                      <div style={{ height: "200px", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", fontStyle: "italic", color: "rgba(0,135,81,0.15)", fontWeight: 900 }}>NG</span>
                        {product.is_featured && (
                          <span style={{
                            position: "absolute", top: "10px", right: "10px",
                            background: badge.bg || "#008751", color: badge.text ?? "#fff",
                            fontWeight: 700, fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase",
                            padding: "4px 10px",
                          }}>
                            Featured
                          </span>
                        )}
                      </div>
                      <div style={{ padding: "1.25rem" }}>
                        <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#999", marginBottom: "0.4rem" }}>{product.category}</p>
                        <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#0A0A0A", marginBottom: "0.5rem", lineHeight: 1.3 }}>{product.name}</h3>
                        <p style={{ fontSize: "0.8rem", color: "#666", marginBottom: "0.75rem" }}>
                          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                        </p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                          <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#008751" }}>₦{priceNaira.toLocaleString()}</span>
                          {product.stock > 0 ? (
                            <AddToCartButton
                              id={product.id}
                              name={product.name}
                              price={priceNaira}
                              sizes={product.sizes && product.sizes.length > 0 ? product.sizes : undefined}
                            />
                          ) : (
                            <span style={{ fontSize: "11px", color: "#c0392b", fontWeight: 600 }}>Out of Stock</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}