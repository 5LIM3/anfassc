import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import AddToCartButton from "@/components/shop/AddToCartButton";

export const metadata: Metadata = {
  title: "Shop",
  description: "Official ANFASSC merchandise — jerseys, polo shirts, caps, scarves, and supporter bundles.",
};

const PRODUCTS = [
  { id: "1", name: "ANFASSC Official Home Jersey 2025", price: 15000, category: "Jersey", badge: "New", badgeColor: "#008751", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: "2", name: "AFCON Morocco 2025 Special Edition Polo", price: 12000, category: "Polo", badge: "Limited", badgeColor: "#D4AF37", badgeTextColor: "#003d24", sizes: ["S", "M", "L", "XL"] },
  { id: "3", name: "ANFASSC Official Supporters Cap", price: 5500, category: "Cap", badge: null, badgeColor: "", sizes: ["One Size"] },
  { id: "4", name: "ANFASSC Membership Welcome Pack", price: 25000, category: "Bundle", badge: "Bundle", badgeColor: "#6030a0", sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: "5", name: "ANFASSC Supporters Scarf", price: 3500, category: "Scarf", badge: null, badgeColor: "", sizes: undefined },
  { id: "6", name: "AFCON 2025 Away Jersey", price: 15000, category: "Jersey", badge: "New", badgeColor: "#008751", sizes: ["S", "M", "L", "XL", "XXL"] },
];

export default function ShopPage() {
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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.75rem" }}>
              {PRODUCTS.map((product) => (
                <div key={product.id} style={{ background: "#fff", border: "1px solid #eee", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "200px", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "3.5rem", fontStyle: "italic", color: "rgba(0,135,81,0.15)", fontWeight: 900 }}>NG</span>
                    {product.badge && (
                      <span style={{
                        position: "absolute", top: "10px", right: "10px",
                        background: product.badgeColor, color: product.badgeTextColor ?? "#fff",
                        fontWeight: 700, fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase",
                        padding: "4px 10px",
                      }}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: "1.25rem" }}>
                    <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#999", marginBottom: "0.4rem" }}>{product.category}</p>
                    <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#0A0A0A", marginBottom: "0.75rem", lineHeight: 1.3 }}>{product.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                      <span style={{ fontWeight: 700, fontSize: "1.05rem", color: "#008751" }}>₦{product.price.toLocaleString()}</span>
                      <AddToCartButton id={product.id} name={product.name} price={product.price} sizes={product.sizes} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}