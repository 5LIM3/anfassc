import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHero from "@/components/layout/PageHero";
import { formatNaira } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Travel Packages",
  description: "Official ANFASSC travel packages to AFCON, World Cup qualifiers, and other tournaments. Organised, safe, affordable.",
};

const PACKAGES = [
  { id: "1", title: "CHAN 2025 — Morocco", tournament: "CHAN 2025", destination: "Morocco", departure: "Aug 1, 2025", price: 45000000, includes: ["Return flights (Lagos–Casablanca)", "Hotel (3 nights)", "Match tickets x2", "ANFASSC group transport", "Official itinerary"], spots: 5, status: "open" },
  { id: "2", title: "WCQ — Nigeria vs. Rwanda", tournament: "World Cup Qualifiers", destination: "Kigali, Rwanda", departure: "Sep 5, 2025", price: 30000000, includes: ["Return flights", "Hotel (2 nights)", "Match ticket", "Group coordination"], spots: 12, status: "open" },
];

export default function TravelPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero label="Official Travel" title="Travel with ANFASSC" subtitle="Organised, safe, and affordable trips to support the Super Eagles on the road." />
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto space-y-8">
            {PACKAGES.map((pkg) => (
              <div key={pkg.id} className="bg-white border border-gray-100 rounded overflow-hidden grid grid-cols-1 md:grid-cols-3">
                <div className="bg-green-900 text-white p-8 flex flex-col justify-between">
                  <div>
                    <p className="font-condensed text-gold text-xs uppercase tracking-widest mb-2">{pkg.tournament}</p>
                    <h3 className="font-display text-2xl font-bold">{pkg.title}</h3>
                    <p className="text-green-300 text-sm mt-2">{pkg.destination}</p>
                  </div>
                  <div>
                    <p className="font-condensed text-green-400 text-xs uppercase tracking-widest mb-1">Departure</p>
                    <p className="text-white font-semibold">{pkg.departure}</p>
                  </div>
                </div>
                <div className="md:col-span-2 p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <p className="font-condensed text-xs uppercase tracking-widest text-text-muted mb-1">Package includes</p>
                      <ul className="space-y-1">
                        {pkg.includes.map((inc) => (
                          <li key={inc} className="text-sm text-text-mid flex items-center gap-2">
                            <span className="text-green-600">✓</span>{inc}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-right ml-8">
                      <p className="font-condensed text-xs uppercase tracking-widest text-text-muted mb-1">Price</p>
                      <p className="font-display text-2xl font-bold text-green-700">{formatNaira(pkg.price)}</p>
                      <p className="text-xs text-text-muted">per person</p>
                      <p className="mt-3 text-xs text-green-700 font-semibold">{pkg.spots} spots left</p>
                    </div>
                  </div>
                  <a href="/register" className="inline-block bg-green-700 hover:bg-green-800 text-white font-condensed font-bold text-sm uppercase tracking-widest px-8 py-3 transition-colors">
                    Book This Package
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
