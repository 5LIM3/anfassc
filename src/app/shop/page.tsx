import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { formatNaira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop",
  description: "Official ANFASSC merchandise — jerseys, polo shirts, caps, scarves, and supporter bundles. Wear your Nigerian pride.",
};

const PRODUCTS = [
  { id: "1", name: "ANFASSC Official Home Jersey 2025", slug: "anfassc-home-jersey-2025", price: 1500000, category: "jersey", badge: "New", badgeColor: "bg-green-700" },
  { id: "2", name: "AFCON Morocco 2025 Special Edition Polo", slug: "afcon-morocco-2025-polo", price: 1200000, category: "polo", badge: "Limited", badgeColor: "bg-amber-500" },
  { id: "3", name: "ANFASSC Official Supporters Cap", slug: "anfassc-supporters-cap", price: 550000, category: "cap", badge: null, badgeColor: "" },
  { id: "4", name: "ANFASSC Membership Welcome Pack", slug: "anfassc-welcome-pack", price: 2500000, category: "bundle", badge: "Bundle", badgeColor: "bg-purple-700" },
  { id: "5", name: "ANFASSC Supporters Scarf", slug: "anfassc-supporters-scarf", price: 350000, category: "scarf", badge: null, badgeColor: "" },
  { id: "6", name: "AFCON 2025 Home Jersey (Away)", slug: "anfassc-away-jersey-2025", price: 1500000, category: "jersey", badge: "New", badgeColor: "bg-green-700" },
];

const CATEGORIES = ["All", "Jersey", "Polo", "Cap", "Scarf", "Bundle"];

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
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-3 flex-wrap mb-12">
              {CATEGORIES.map((cat) => (
                <button key={cat} className="font-condensed font-bold text-sm uppercase tracking-widest px-5 py-2 border border-green-200 hover:bg-green-700 hover:text-white hover:border-green-700 transition-colors rounded-sm">
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="bg-white border border-gray-100 rounded overflow-hidden group hover:-translate-y-1 transition-transform duration-200">
                  <div className="h-56 bg-gray-50 relative flex items-center justify-center">
                    <span className="font-display text-6xl font-bold italic text-green-700/15">NG</span>
                    {product.badge && (
                      <span className={`absolute top-3 right-3 ${product.badgeColor} text-white font-condensed font-bold text-xs uppercase tracking-wider px-3 py-1`}>
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="font-condensed text-xs uppercase tracking-widest text-text-muted mb-1">{product.category}</p>
                    <h3 className="font-body font-semibold text-base text-text-dark leading-snug mb-4">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-condensed font-bold text-xl text-green-700">{formatNaira(product.price)}</span>
                      <a href={`/shop/${product.slug}`} className="bg-green-700 hover:bg-green-800 text-white font-condensed font-bold text-xs uppercase tracking-wider px-4 py-2 transition-colors">
                        View Item
                      </a>
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
